type LocalSTTOptions = {
  onStatus: (message: string, progress?: number) => void;
  onTranscript: (text: string) => void;
  shouldCapture: () => boolean;
};

export type LocalSTTController = { stop: () => void };

const TARGET_SAMPLE_RATE = 16_000;
const SILENCE_MS = 900;
const MAX_UTTERANCE_MS = 15_000;
const MIN_UTTERANCE_MS = 320;

let transcriberPromise: Promise<any> | null = null;

const loadTranscriber = (onStatus: LocalSTTOptions['onStatus']) => {
  if (!transcriberPromise) {
    transcriberPromise = import('@huggingface/transformers').then(async ({ env, pipeline }) => {
      env.allowLocalModels = false;
      return pipeline('automatic-speech-recognition', 'Xenova/whisper-tiny.en', {
        device: 'wasm',
        dtype: 'q8',
        progress_callback: (progress: { status?: string; progress?: number }) => {
          if (progress.status !== 'progress' || typeof progress.progress !== 'number') return;
          onStatus('Loading local voice recognition', Math.max(0, Math.min(100, Math.round(progress.progress))));
        },
      });
    }).catch(error => {
      transcriberPromise = null;
      throw error;
    });
  }
  return transcriberPromise;
};

const joinChunks = (chunks: Float32Array[]) => {
  const length = chunks.reduce((total, chunk) => total + chunk.length, 0);
  const joined = new Float32Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    joined.set(chunk, offset);
    offset += chunk.length;
  }
  return joined;
};

const resample = (audio: Float32Array, sourceRate: number) => {
  if (sourceRate === TARGET_SAMPLE_RATE) return audio;
  const ratio = sourceRate / TARGET_SAMPLE_RATE;
  const output = new Float32Array(Math.max(1, Math.round(audio.length / ratio)));
  for (let index = 0; index < output.length; index += 1) {
    const position = index * ratio;
    const left = Math.floor(position);
    const right = Math.min(left + 1, audio.length - 1);
    const mix = position - left;
    output[index] = audio[left] * (1 - mix) + audio[right] * mix;
  }
  return output;
};

const measureLevel = (audio: Float32Array) => {
  let energy = 0;
  let peak = 0;
  for (let index = 0; index < audio.length; index += 1) {
    const value = Math.abs(audio[index]);
    energy += value * value;
    peak = Math.max(peak, value);
  }
  return { rms: Math.sqrt(energy / Math.max(1, audio.length)), peak };
};

export async function startLocalSTT(options: LocalSTTOptions): Promise<LocalSTTController> {
  if (!navigator.mediaDevices?.getUserMedia) throw new Error('Microphone capture is unavailable in this browser');

  options.onStatus('Requesting microphone access');
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: {
      echoCancellation: true,
      noiseSuppression: true,
      autoGainControl: true,
      channelCount: 1,
    },
  });

  const track = stream.getAudioTracks()[0];
  if (!track || track.readyState !== 'live') {
    stream.getTracks().forEach(item => item.stop());
    throw new Error('No active microphone input was found');
  }

  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) {
    stream.getTracks().forEach(item => item.stop());
    throw new Error('Browser audio processing is unavailable');
  }

  let audioContext: AudioContext;
  try {
    audioContext = new AudioContextClass({ sampleRate: TARGET_SAMPLE_RATE });
  } catch {
    audioContext = new AudioContextClass();
  }
  await audioContext.resume();

  let stopped = false;
  let processor: ScriptProcessorNode | null = null;
  let source: MediaStreamAudioSourceNode | null = null;
  let watchdog = 0;
  let framesReceived = 0;
  let transcribing = false;
  let speaking = false;
  let speechStartedAt = 0;
  let lastSpeechAt = 0;
  let noiseFloor = 0.001;
  let speechChunks: Float32Array[] = [];
  let preRoll: Float32Array[] = [];

  const cleanup = () => {
    if (stopped) return;
    stopped = true;
    window.clearTimeout(watchdog);
    if (processor) {
      processor.onaudioprocess = null;
      processor.disconnect();
    }
    source?.disconnect();
    stream.getTracks().forEach(item => item.stop());
    void audioContext.close();
  };

  track.addEventListener('ended', () => {
    if (!stopped) options.onStatus('Microphone disconnected');
    cleanup();
  }, { once: true });

  try {
    options.onStatus('Loading local voice recognition', 0);
    const transcriber = await loadTranscriber(options.onStatus);
    if (stopped) return { stop: cleanup };

    source = audioContext.createMediaStreamSource(stream);
    processor = audioContext.createScriptProcessor(4096, 1, 1);
    source.connect(processor);
    const silentGain = audioContext.createGain();
    silentGain.gain.value = 0;
    processor.connect(silentGain);
    silentGain.connect(audioContext.destination);

    const transcribe = async (chunks: Float32Array[]) => {
      if (transcribing || stopped || chunks.length === 0) return;
      transcribing = true;
      options.onStatus('Understanding your voice');
      try {
        const input = resample(joinChunks(chunks), audioContext.sampleRate);
        const result = await transcriber(input, {
          chunk_length_s: 15,
          stride_length_s: 2,
          return_timestamps: false,
        });
        const text = String(Array.isArray(result) ? result[0]?.text : result?.text || '').trim();
        if (text && !stopped) options.onTranscript(text);
      } finally {
        transcribing = false;
        if (!stopped && options.shouldCapture()) options.onStatus('Local microphone active');
      }
    };

    processor.onaudioprocess = event => {
      if (stopped) return;
      framesReceived += 1;
      const frame = new Float32Array(event.inputBuffer.getChannelData(0));

      if (!options.shouldCapture() || transcribing) {
        speaking = false;
        speechChunks = [];
        preRoll = [];
        return;
      }

      const now = performance.now();
      const { rms, peak } = measureLevel(frame);
      const speechThreshold = Math.max(0.0025, noiseFloor * 2.8);
      const peakThreshold = Math.max(0.014, noiseFloor * 5.5);
      const voiceDetected = rms > speechThreshold || peak > peakThreshold;

      if (!speaking) {
        noiseFloor = Math.max(0.0005, Math.min(0.02, noiseFloor * 0.96 + rms * 0.04));
        preRoll.push(frame);
        while (preRoll.length > 3) preRoll.shift();
      }

      if (voiceDetected) {
        if (!speaking) {
          speaking = true;
          speechStartedAt = now;
          speechChunks = [...preRoll];
          preRoll = [];
          options.onStatus('I can hear you');
        }
        lastSpeechAt = now;
      }

      if (speaking) {
        speechChunks.push(frame);
        const speechLength = now - speechStartedAt;
        const finished = (now - lastSpeechAt >= SILENCE_MS && speechLength >= MIN_UTTERANCE_MS)
          || speechLength >= MAX_UTTERANCE_MS;
        if (finished) {
          const completed = speechChunks;
          speaking = false;
          speechChunks = [];
          preRoll = [];
          void transcribe(completed);
        }
      }
    };

    watchdog = window.setTimeout(() => {
      if (!stopped && framesReceived === 0) options.onStatus('Microphone audio is not reaching AURA');
    }, 2_500);
    options.onStatus('Local microphone active');
    return { stop: cleanup };
  } catch (error) {
    cleanup();
    throw error;
  }
}
