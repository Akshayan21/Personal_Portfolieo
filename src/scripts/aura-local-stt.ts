type LocalSTTOptions = {
  onStatus: (message: string, progress?: number) => void;
  onTranscript: (text: string) => void;
  shouldCapture: () => boolean;
};
export type LocalSTTController = { stop: () => void };
export async function startLocalSTT(options: LocalSTTOptions): Promise<LocalSTTController> {
  options.onStatus('Local offline voice recognition is disabled for this production build.');
  throw new Error('Local offline voice recognition is unavailable');
}
