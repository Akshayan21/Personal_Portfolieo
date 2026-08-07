import type { MLCEngine } from '@mlc-ai/web-llm';
import type { Project } from '../data/projects';
import { startLocalSTT } from './aura-local-stt';
import './aura-pet';
import './aura-reactive';
import './aura-panel-drag';

const MODEL_ID = 'Qwen2.5-1.5B-Instruct-q4f16_1-MLC';

const PORTFOLIO_CONTEXT = `
You are AURA, the portfolio intelligence for Akshayan Mohandass. You are not Akshayan. Speak as a perceptive, concise male digital representative: composed, direct, warm, slightly futuristic, never theatrical. Answer the visitor's actual question first. Use natural language, not bullet lists, unless asked. Keep most answers to 2-4 sentences and under 90 words because they will be spoken.

Never invent facts, metrics, education, compensation, private contact details, or confidential work. If information is absent, say so plainly and suggest asking Akshayan directly.

AKSHAYAN
Akshayan Mohandass is a product designer and systems thinker based in India. He works at the intersection of AI orchestration, enterprise UX, complex operational workflows, content systems, and implementation-aware design. His principle is: "I don't start with screens. I start with structure." He is open to full-time roles.

EXPERIENCE
- Mondee, 2026-present: UX Designer and Content Strategist on a confidential AI-native enterprise product. Details are not public.
- Kodecopter, 2024-2025: Product Designer. Shipped four products involving AI tooling, financial dashboards, design systems, product architecture, and 0-to-1 ownership.
- Aakam 360, 2023-2024: UI/UX Intern. Helped bring PregTrack, a government-approved pregnancy health product, from concept to launch and supported frontend implementation.
- Bloom Majestic, 2022-2023: UI/UX Designer. Designed Inniyal, a mental-wellness mobile experience focused on clarity, emotional safety, and low cognitive load.

PROJECTS
- Staffezee: B2B SaaS for UK IT staffing agencies. Akshayan worked across design, product management, and development. Consultant-first operating model, availability, submission pipeline, real-time duplicate detection, interviews, and UK compliance. Strongest systems-thinking example.
- PregTrack: pregnancy health experience designed around trust, clarity, sensitive needs, real constraints, and implementation.
- FamConnect: one platform for family, housing-society, and verified-alumni communities. Role-aware access maintains distinct trust boundaries.
- Ops 360: college operations platform connecting admissions, staff availability, and student meeting booking across student, staff, and management roles.
- PharmaVault: incomplete case study. Do not claim unpublished outcomes.

CAPABILITIES
Design: Figma, UX architecture, AI UX, design systems, user research, interaction design, wireframing, prototyping.
Product collaboration: Jira, Asana, Linear, Notion, Confluence, Miro, FigJam, Slack.
Development literacy: Flutter, React, Node.js, TypeScript, Astro, Tailwind CSS, MySQL, Git. This helps him design feasible systems and collaborate with engineers; do not describe him as a specialist software engineer.

FIT
Akshayan is strongest when a team needs to turn ambiguous product logic into clear workflows: AI-native products, enterprise tools, operational systems, 0-to-1 products, and cross-functional design-to-build work.
`;

const fallbackKnowledge = [
  { terms: ['hire', 'fit', 'strength', 'value'], answer: 'Akshayan is strongest when the product is complex before it is visual. He turns ambiguous logic into clear workflows, understands implementation constraints, and works especially well on AI-native and operational products.', section: 'experience' },
  { terms: ['ai', 'artificial intelligence'], answer: 'Akshayan designs AI-native product experiences with an emphasis on clear behavior, useful guidance, and decision clarity.', section: 'experience' },
  { terms: ['process', 'approach', 'method'], answer: 'He begins by mapping who decides, what they need to complete, where friction appears, and which constraints are real. Screens come after the structure is understood.', section: 'philosophy' },
  { terms: ['staffezee', 'systems thinking', 'staffing'], answer: 'Staffezee is his strongest systems-thinking example: a consultant-first operating model connecting availability, submissions, duplicate prevention, interviews, and UK compliance.', section: 'projects' },
  { terms: ['pregtrack', 'pregnancy', 'health'], answer: 'PregTrack is a government-approved pregnancy health product. Akshayan helped take it from concept to launch, designing for clarity and trust while supporting frontend implementation.', section: 'projects' },
  { terms: ['famconnect', 'family', 'alumni', 'community'], answer: 'FamConnect unifies several community types while preserving distinct trust boundaries through role-aware access.', section: 'projects' },
  { terms: ['ops 360', 'college', 'admission'], answer: 'Ops 360 connects college admissions, staff availability, and student meeting booking across student, staff, and management roles.', section: 'projects' },
  { terms: ['skill', 'figma', 'technical', 'code', 'developer'], answer: 'Akshayan combines UX architecture, AI UX, research, interaction design, and design systems with implementation literacy across React, TypeScript, Astro, Flutter, Node, and Tailwind.', section: 'skills' },
  { terms: ['experience', 'career', 'worked', 'company'], answer: 'His experience spans Mondee, Kodecopter, Aakam 360, and Bloom Majestic across AI-native enterprise products, B2B platforms, health technology, and emotionally sensitive mobile experiences.', section: 'experience' },
  { terms: ['available', 'job', 'role', 'contact', 'email'], answer: 'Akshayan is open to full-time product design roles, especially in AI-native, enterprise, and operational products. You can reach him through the contact section.', section: 'contact' },
  { terms: ['who', 'about', 'akshayan'], answer: 'Akshayan Mohandass is a product designer and systems thinker based in India. He designs where AI behaviour, enterprise workflows, content, and implementation meet.', section: 'about' },
];
const readSelectedProjects = (): Project[] => {
  const node = document.getElementById('aura-project-knowledge');
  if (!node?.textContent) return [];
  try { return JSON.parse(node.textContent) as Project[]; }
  catch { return []; }
};
const selectedProjects = readSelectedProjects();

const publicProjectSummary = (project: Project) => {
  if (project.slug === 'pharmavault') {
    return `${project.title} (${project.type}, ${project.year}) is an incomplete case study about pharmaceutical inventory, prescription tracking, and compliance workflows. Detailed research, decisions, and outcomes are not yet published; never infer them.`;
  }
  return `${project.title} (${project.type}, ${project.company}, ${project.year}). Role: ${project.role}. ${project.desc} Outcomes: ${project.outcomes.map(item => `${item.metric} ${item.label}`).join('; ')}.`;
};

const detailedProjectKnowledge = (project: Project) => {
  if (project.slug === 'pharmavault') return publicProjectSummary(project);
  return [
    `${project.title} | ${project.type} | ${project.company} | ${project.year} | ${project.duration}`,
    `Role and team: ${project.role}; ${project.team}. Tools: ${project.tools.join(', ')}.`,
    `Overview: ${project.overview}`,
    `Problem: ${project.problem}`,
    `Pain points: ${project.painPoints.join(' | ')}`,
    `Research: ${project.researchMethods.map(item => `${item.label}: ${item.desc}`).join(' | ')}`,
    `Insights: ${project.insights.join(' | ')}`,
    `Process: ${project.processSteps.map(item => `${item.title}: ${item.desc}`).join(' | ')}`,
    `Solutions: ${project.screens.map(item => `${item.title}: ${item.desc}`).join(' | ')}`,
    `Decisions: ${project.decisions.map(item => `${item.decision} BECAUSE ${item.rationale}`).join(' | ')}`,
    `Outcomes: ${project.outcomes.map(item => `${item.metric} ${item.label}`).join(' | ')}`,
    `Reflection - worked: ${project.learnings.worked.join(' | ')}. Improve: ${project.learnings.improve.join(' | ')}.`,
  ].join('\n');
};

const projectRelevance = (project: Project, question: string) => {
  const query = question.toLowerCase();
  const title = project.title.toLowerCase();
  let score = query.includes(title) || query.includes(project.slug) ? 20 : 0;
  const terms = [project.type, project.company, ...project.tags, ...project.tools]
    .join(' ')
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(term => term.length > 3);
  for (const term of new Set(terms)) if (query.includes(term)) score += 2;
  for (const titleTerm of title.split(/\s+/)) if (titleTerm.length > 3 && query.includes(titleTerm)) score += 5;
  return score;
};

const getProjectKnowledge = (question: string) => {
  const comparisonQuestion = /compare|versus|\bvs\b|difference|strongest|best|across|pattern|trade-?off|which project/i.test(question);
  const currentSlug = typeof window === 'undefined' ? '' : window.location.pathname.match(/\/projects\/([^/]+)/)?.[1] || '';
  const ranked = selectedProjects
    .map(project => ({ project, score: projectRelevance(project, question) + (project.slug === currentSlug ? 8 : 0) }))
    .sort((a, b) => b.score - a.score);
  const relevant = ranked.filter(item => item.score > 0);

  if (comparisonQuestion) {
    const explicitProjects = relevant.filter(item => item.score >= 8).slice(0, 2);
    if (explicitProjects.length === 2) {
      return `RELEVANT PROJECT EVIDENCE\n${explicitProjects.map(item => detailedProjectKnowledge(item.project)).join('\n\n---\n\n')}`;
    }
    return `SELECTED WORKS OVERVIEW\n${selectedProjects.map(publicProjectSummary).join('\n')}`;
  }

  const target = relevant[0]?.project || selectedProjects.find(project => project.slug === currentSlug);
  if (target) return `RELEVANT PROJECT EVIDENCE\n${detailedProjectKnowledge(target)}`;
  return `SELECTED WORKS OVERVIEW\n${selectedProjects.map(publicProjectSummary).join('\n')}`;
};

const PROJECT_REASONING_RULES = `
PROJECT ANSWERING RULES
Treat the supplied project evidence as the source of truth. Explain causal links: user or business problem -> evidence or insight -> design decision -> outcome. For comparisons, identify meaningful similarities, differences, constraints, and trade-offs rather than declaring a winner without criteria. Distinguish Akshayan's individual role from team work. Challenge weak premises politely. Never convert an addressed problem into a claimed post-launch result. Never invent metrics, methods, screens, client details, or confidential information. If evidence is incomplete, state exactly what is unknown. Keep spoken answers concise, but allow up to 150 words for genuinely complex project questions. End with one useful follow-up angle only when it adds value.
`;

let engine: MLCEngine | null = null;
let enginePromise: Promise<MLCEngine> | null = null;
let currentAudio: HTMLAudioElement | null = null;
const history: Array<{ role: 'user' | 'assistant'; content: string }> = [];

const projectFallbackAnswer = (question: string) => {
  const currentSlug = typeof window === 'undefined' ? '' : window.location.pathname.match(/\/projects\/([^/]+)/)?.[1] || '';
  const ranked = selectedProjects
    .map(project => ({ project, score: projectRelevance(project, question) + (project.slug === currentSlug ? 8 : 0) }))
    .sort((a, b) => b.score - a.score);
  const relevant = ranked.filter(item => item.score > 0);
  const wantsComparison = /compare|versus|\bvs\b|difference|trade-?off|which project/i.test(question);

  if (wantsComparison && relevant.length >= 2) {
    const [first, second] = relevant.map(item => item.project);
    if (![first.slug, second.slug].includes('pharmavault')) {
      return {
        answer: `${first.title} focused on ${first.problem} Its key choice was ${first.decisions[0].decision.toLowerCase()}. ${second.title}, by contrast, focused on ${second.problem} Its key choice was ${second.decisions[0].decision.toLowerCase()}. The meaningful difference is the constraint: ${first.title} optimized for ${first.insights[0].toLowerCase()}, while ${second.title} optimized for ${second.insights[0].toLowerCase()}.`,
        section: 'projects',
      };
    }
  }

  const target = relevant[0]?.project || selectedProjects.find(project => project.slug === currentSlug);
  if (target) {
    if (target.slug === 'pharmavault') {
      return { answer: publicProjectSummary(target), section: 'projects' };
    }
    return {
      answer: `${target.overview} The central problem was ${target.problem} One important decision was ${target.decisions[0].decision.toLowerCase()}, because ${target.decisions[0].rationale.toLowerCase()} The published evidence includes ${target.outcomes.map(item => `${item.metric} ${item.label}`).join(' and ')}.`,
      section: 'projects',
    };
  }

  if (/project|case stud|research|design decision|trade-?off|outcome/i.test(question)) {
    return {
      answer: 'The portfolio shows different kinds of systems thinking: Staffezee restructures UK staffing around consultant availability, PayDart makes financial authority and automation visible, PregTrack reduces medical and digital complexity, and FamConnect preserves trust boundaries across community types. Ask me to compare any two, defend a design decision, or trace research evidence to an outcome.',
      section: 'projects',
    };
  }
  return null;
};
const fallbackAnswer = (question: string) => {
  const projectAnswer = projectFallbackAnswer(question);
  if (projectAnswer) return projectAnswer;
  const query = question.toLowerCase();
  let best = fallbackKnowledge[0];
  let score = -1;
  for (const entry of fallbackKnowledge) {
    const next = entry.terms.reduce((total, term) => total + (query.includes(term) ? (term.includes(' ') ? 4 : 2) : 0), 0);
    if (next > score) { score = next; best = entry; }
  }
  return score > 0 ? best : {
    answer: "That detail isn't in Akshayan's published portfolio. Ask me about his projects, process, experience, AI work, technical skills, availability, or fit for your team.",
  };
};

function initAura() {
  const root = document.querySelector<HTMLElement>('.aura');
  if (!root || root.dataset.intelligentReady === 'true') return;
  root.dataset.intelligentReady = 'true';
  const orb = root.querySelector<HTMLButtonElement>('.aura-orb')!;
  const panel = root.querySelector<HTMLElement>('.aura-panel')!;
  const form = root.querySelector<HTMLFormElement>('.aura-input')!;
  const input = root.querySelector<HTMLInputElement>('input')!;
  const message = root.querySelector<HTMLElement>('.aura-message')!;
  const voiceButton = root.querySelector<HTMLButtonElement>('.voice')!;
  let recognition: any = null;
  let listening = false;
  let voiceMode = false;
  let speaking = false;
  let processingVoice = false;
  let awakeUntil = 0;
  let speechStartedAt = 0;
  let lastTranscript = '';
  let lastTranscriptAt = 0;
  let restartTimer = 0;
  let recognitionRetryDelay = 450;
  let recognitionErrorCount = 0;
  let microphoneReady = false;
  let localSTT: { stop: () => void } | null = null;
  let localSTTStarting = false;
  let preferLocalSTT = false;
  let speechGeneration = 0;
  let followUpTimer = 0;
  let brainProgressVisible = false;

  const setVoiceLabel = (text: string) => {
    const label = voiceButton.querySelector('b');
    if (label) label.textContent = text;
  };

  const ensureMicrophoneAccess = async () => {
    if (microphoneReady || !navigator.mediaDevices?.getUserMedia) return;
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
        channelCount: 1,
      },
    });
    stream.getTracks().forEach(track => track.stop());
    microphoneReady = true;
  };
  const resumeRecognition = (delay = 450) => {
    window.clearTimeout(restartTimer);
    if (!voiceMode || listening || speaking || processingVoice || localSTT || localSTTStarting || !recognition) return;
    restartTimer = window.setTimeout(() => {
      if (!voiceMode || listening || speaking || processingVoice || localSTT || localSTTStarting) return;
      try { recognition.start(); }
      catch {
        recognitionRetryDelay = Math.min(recognitionRetryDelay * 2, 8_000);
        resumeRecognition(recognitionRetryDelay);
      }
    }, delay);
  };

  const setStatus = (text: string, state = 'thinking') => {
    message.textContent = text;
    root.dataset.auraState = state;
  };

  const withDeadline = <T>(task: Promise<T>, milliseconds: number) => Promise.race([
    task,
    new Promise<T>((_, reject) => window.setTimeout(() => reject(new Error('AURA_DEADLINE')), milliseconds)),
  ]);

  const clearFollowUp = () => {
    window.clearTimeout(followUpTimer);
    followUpTimer = 0;
  };

  const scheduleFollowUp = () => {
    clearFollowUp();
    followUpTimer = window.setTimeout(() => {
      followUpTimer = 0;
      if (!root.classList.contains('is-open') || processingVoice || speaking) return;
      const followUp = 'Do you have any other questions?';
      message.textContent = followUp;
      processingVoice = true;
      browserSpeak(followUp);
    }, 30_000);
  };

  const stopLocalVoice = () => {
    localSTT?.stop();
    localSTT = null;
    localSTTStarting = false;
  };

  const handleLocalTranscript = (rawTranscript: string) => {
    if (!voiceMode || processingVoice || speaking) return;
    const normalized = rawTranscript.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
    const wakeMatch = normalized.match(/^(?:hey\s+)?(?:aura|ora)\b\s*(.*)$/i);
    const hasWakeWord = Boolean(wakeMatch);
    const transcript = (wakeMatch?.[1] || rawTranscript).trim();
    const cleanTranscript = transcript.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
    const hallucination = /^(?:thank you|thanks for watching|subscribe|you|bye|music)$/i.test(cleanTranscript);
    const fillerOnly = /^(?:um+|uh+|hmm+|ah+|oh+|hey|okay|ok|yeah|yes|no)$/i.test(cleanTranscript);
    const duplicate = cleanTranscript === lastTranscript && Date.now() - lastTranscriptAt < 5_000;
    const needsWakeWord = Date.now() > awakeUntil && !hasWakeWord;
    if (!cleanTranscript || cleanTranscript.length < 3 || hallucination || fillerOnly || duplicate || needsWakeWord) {
      if (needsWakeWord && cleanTranscript) message.textContent = 'Say "Aura" before your question when voice mode has been idle.';
      return;
    }
    lastTranscript = cleanTranscript;
    lastTranscriptAt = Date.now();
    processingVoice = true;
    message.textContent = transcript;
    void ask(transcript);
  };

  const startLocalVoice = async () => {
    if (localSTT || localSTTStarting || !voiceMode) return;
    preferLocalSTT = true;
    sessionStorage.setItem('aura-prefer-local-stt', 'true');
    localSTTStarting = true;
    try { recognition?.abort(); } catch { /* Native recognition may already be closed. */ }
    setVoiceLabel('LOADING LOCAL VOICE');
    try {
      localSTT = await startLocalSTT({
        shouldCapture: () => voiceMode && !processingVoice && !speaking,
        onTranscript: handleLocalTranscript,
        onStatus: (status, progress) => {
          if (!voiceMode) return;
          if (typeof progress === 'number') {
            setStatus(`${status} - ${progress}% - first visit only`, 'thinking');
            setVoiceLabel(`LOCAL VOICE ${progress}%`);
          } else if (status === 'I can hear you') {
            clearFollowUp();
            awakeUntil = Date.now() + 30_000;
            setStatus('I can hear you...', 'listening');
            setVoiceLabel('HEARING YOU - TAP TO END');
          } else if (status === 'Understanding your voice') {
            setStatus('Understanding your voice...', 'thinking');
            setVoiceLabel('TRANSCRIBING LOCALLY');
          } else if (status === 'Local microphone active') {
            awakeUntil = Date.now() + 30_000;
            setStatus('Local microphone active - speak now.', 'listening');
            setVoiceLabel('LOCAL MIC ACTIVE - TAP TO END');
          } else if (status === 'Microphone audio is not reaching AURA' || status === 'Microphone disconnected') {
            setStatus(status + '. Check the selected input device in browser settings.', 'thinking');
            setVoiceLabel('CHECK MICROPHONE INPUT');
          } else {
            setStatus(status, 'thinking');
          }
        },
      });
      if (!voiceMode) stopLocalVoice();
    } catch (error) {
      console.error('[AURA local voice]', error);
      root.dataset.voiceError = error instanceof Error ? error.message : 'Local voice failed';
      preferLocalSTT = false;
      voiceMode = false;
      processingVoice = false;
      speaking = false;
      root.dataset.auraState = 'idle';
      sessionStorage.setItem('aura-prefer-local-stt', 'native');
      setVoiceLabel('LOCAL VOICE FAILED - TRY AGAIN');
      message.textContent = 'Local voice recognition could not load. Check the connection once so its model can be cached, or type your question.';
    } finally {
      localSTTStarting = false;
    }
  };
  const setOpen = (open: boolean) => {
    panel.setAttribute('aria-hidden', String(!open));
    orb.setAttribute('aria-expanded', String(open));
    root.classList.toggle('is-open', open);
    if (open) setTimeout(() => input.focus(), 300);
  };

  const loadBrain = async () => {
    if (engine) return engine;
    if (!('gpu' in navigator)) throw new Error('WebGPU unavailable');
    if (!enginePromise) {
      enginePromise = import('@mlc-ai/web-llm')
        .then(({ CreateMLCEngine }) => CreateMLCEngine(MODEL_ID, {
          initProgressCallback: progress => {
            const value = Math.round((progress.progress || 0) * 100);
            if (brainProgressVisible) setStatus(`Loading local intelligence · ${value}% · first visit only`);
          },
        }))
        .then(value => (engine = value));
    }
    return enginePromise;
  };

  const prepareSpeech = (text: string) => text
    .replace(/\bAkshayan\b/g, 'Ak-shay-an')
    .replace(/\bAURA\b/g, 'Ora')
    .replace(/\bAI\b/g, 'A.I.')
    .replace(/\bUX\b/g, 'U X')
    .replace(/\bB2B\b/g, 'B to B')
    .replace(/\bSaaS\b/g, 'sass')
    .replace(/\b0-to-1\b/g, 'zero to one')
    .replace(/AI-native/gi, 'A.I. native');

  const browserSpeak = (text: string, onDone?: () => void) => {
    if (!('speechSynthesis' in window)) {
      processingVoice = false;
      speaking = false;
      resumeRecognition();
      onDone?.();
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(prepareSpeech(text));
    const voices = window.speechSynthesis.getVoices();
    utterance.voice = voices.find(v => /ryan|daniel|google uk english male/i.test(v.name)) || voices.find(v => /^en/i.test(v.lang)) || null;
    utterance.rate = 1;
    utterance.pitch = .84;
    utterance.onstart = () => { speaking = true; root.dataset.auraState = 'speaking'; };
    let finished = false;
    const finishSpeaking = () => {
      if (finished) return;
      finished = true;
      speaking = false;
      processingVoice = false;
      awakeUntil = Date.now() + 20_000;
      root.dataset.auraState = 'idle';
      resumeRecognition();
      onDone?.();
    };
    utterance.onend = finishSpeaking;
    utterance.onerror = finishSpeaking;
    window.speechSynthesis.speak(utterance);
  };

  const neuralSpeak = async (text: string) => {
    clearFollowUp();
    message.textContent = text;
    browserSpeak(text, scheduleFollowUp);
  };

  const ask = async (question: string) => {
    clearFollowUp();
    const requestGeneration = ++speechGeneration;
    currentAudio?.pause();
    window.speechSynthesis?.cancel();
    speaking = false;
    processingVoice = true;
    if (listening) {
      try { recognition?.abort(); } catch { /* Already stopping. */ }
    }
    setStatus("Reasoning locally from Akshayan's portfolio...");
    const fallback = fallbackAnswer(question);
    let response = fallback.answer;
    brainProgressVisible = true;
    try {
      const completion = await withDeadline((async () => {
        const brain = await loadBrain();
        return brain.chat.completions.create({
          messages: [
            { role: 'system', content: [PORTFOLIO_CONTEXT, getProjectKnowledge(question), PROJECT_REASONING_RULES].join('\n\n') },
            ...history.slice(-6),
            { role: 'user', content: question },
          ],
          temperature: 0.55,
          top_p: 0.85,
          max_tokens: 180,
        });
      })(), 12_000);
      const generated = completion.choices[0]?.message?.content?.trim();
      if (generated) response = generated;
    } catch {
      response = fallback.answer;
    } finally {
      brainProgressVisible = false;
    }
    if (requestGeneration !== speechGeneration) return;
    history.push({ role: 'user', content: question }, { role: 'assistant', content: response });
    message.textContent = response;
    if ('section' in fallback && fallback.section) {
      document.getElementById(fallback.section)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    await neuralSpeak(response);
  };

  orb.addEventListener('click', () => setOpen(!root.classList.contains('is-open')));
  root.querySelector('.aura-close')?.addEventListener('click', () => {
    clearFollowUp();
    speechGeneration += 1;
    currentAudio?.pause();
    window.speechSynthesis?.cancel();
    speaking = false;
    processingVoice = false;
    setOpen(false);
  });
  input.addEventListener('input', clearFollowUp);
  form.addEventListener('submit', event => {
    event.preventDefault();
    const question = input.value.trim();
    if (question) { input.value = ''; void ask(question); }
  });
  root.querySelectorAll<HTMLButtonElement>('.prompts button').forEach(button =>
    button.addEventListener('click', () => void ask(button.textContent || ''))
  );

  const toggleVoiceMode = async () => {
    clearFollowUp();
    if (voiceMode) {
      voiceMode = false;
      window.clearTimeout(restartTimer);
      stopLocalVoice();
      try { recognition?.abort(); } catch { /* Already stopped. */ }
      setVoiceLabel(preferLocalSTT ? 'START LOCAL VOICE' : 'START VOICE MODE');
      if (!speaking && !processingVoice) setStatus('Voice mode off. You can still type a question.', 'idle');
      return;
    }

    currentAudio?.pause();
    window.speechSynthesis?.cancel();
    speaking = false;
    processingVoice = false;
    voiceMode = true;
    setStatus('Connecting to microphone...', 'thinking');
    setVoiceLabel('CONNECTING TO MIC');
    try {
      if (voiceMode && preferLocalSTT) await startLocalVoice();
      else {
        await ensureMicrophoneAccess();
        if (voiceMode && recognition) resumeRecognition(0);
        else if (voiceMode) {
          preferLocalSTT = true;
          await startLocalVoice();
        }
      }
    } catch (error) {
      voiceMode = false;
      const name = error instanceof DOMException ? error.name : '';
      if (name === 'NotFoundError') {
        setVoiceLabel('NO MICROPHONE FOUND');
        message.textContent = 'No microphone was detected. Connect one, then try voice mode again.';
      } else if (name === 'NotReadableError') {
        setVoiceLabel('MICROPHONE IS BUSY');
        message.textContent = 'Another application may be using the microphone. Close it, then try again.';
      } else {
        setVoiceLabel('ALLOW MICROPHONE ACCESS');
        message.textContent = 'Microphone access was not allowed. Enable it in the address-bar site permissions, then try again.';
      }
      root.dataset.auraState = 'idle';
    }
  };
  voiceButton.addEventListener('click', toggleVoiceMode);
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  if (!SpeechRecognition) {
    if (!navigator.mediaDevices?.getUserMedia) {
      voiceButton.disabled = true;
      setVoiceLabel('MIC UNAVAILABLE - TYPE YOUR QUESTION');
    } else {
      voiceButton.disabled = true;
      setVoiceLabel('VOICE UNAVAILABLE - TYPE YOUR QUESTION');
    }
  } else {
    recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 3;
    setVoiceLabel('START VOICE MODE');

    const domainTerms = [
      'Akshayan Mohandass', 'AURA', 'Mondee', 'Kodecopter', 'Aakam 360',
      'Bloom Majestic', 'Staffezee', 'PregTrack', 'FamConnect', 'Ops 360',
      'PharmaVault', 'product designer', 'systems thinking', 'Figma', 'Astro', 'Flutter',
    ];
    const SpeechRecognitionPhrase = (window as any).SpeechRecognitionPhrase;
    if (SpeechRecognitionPhrase && 'phrases' in recognition) {
      try {
        recognition.phrases = domainTerms.map(term => new SpeechRecognitionPhrase(term, 5));
      } catch { /* Contextual biasing is experimental and may not be accepted. */ }
    }

    recognition.onstart = () => {
      listening = true;
      delete root.dataset.voiceError;
      if (!processingVoice && !speaking) setStatus('Microphone active - speak now.', 'listening');
      setVoiceLabel('MIC ACTIVE - TAP TO END');
    };
    recognition.onaudiostart = () => {
      if (!processingVoice && !speaking) setVoiceLabel('LISTENING - TAP TO END');
    };
    recognition.onspeechstart = () => {
      clearFollowUp();
      speechStartedAt = performance.now();
      if (!processingVoice && !speaking) {
        message.textContent = 'I can hear you...';
        setVoiceLabel('HEARING YOU - TAP TO END');
      }
    };
    recognition.onresult = (event: any) => {
      let interim = '';
      let finalResult: any = null;
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) finalResult = result;
        else interim += result[0]?.transcript || '';
      }
      if (interim.trim() && !processingVoice) message.textContent = interim.trim();
      if (!finalResult || processingVoice || speaking) return;
      recognitionErrorCount = 0;
      recognitionRetryDelay = 450;

      let best = finalResult[0];
      let bestScore = -1;
      for (let i = 0; i < finalResult.length; i++) {
        const alternative = finalResult[i];
        const value = String(alternative.transcript || '').toLowerCase();
        const domainBoost = domainTerms.some(term => value.includes(term.toLowerCase())) ? 0.12 : 0;
        const score = (alternative.confidence || 0.5) + domainBoost;
        if (score > bestScore) { best = alternative; bestScore = score; }
      }

      const rawTranscript = String(best?.transcript || '').trim();
      const confidence = Number(best?.confidence || 0);
      const speechDuration = speechStartedAt ? performance.now() - speechStartedAt : 1_000;
      speechStartedAt = 0;
      const normalized = rawTranscript.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
      const wakeMatch = normalized.match(/^(?:hey\s+)?(?:aura|ora)\b\s*(.*)$/i);
      const hasWakeWord = Boolean(wakeMatch);
      const transcript = (wakeMatch?.[1] || rawTranscript).trim();
      const cleanTranscript = transcript.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
      const words = cleanTranscript.split(/\s+/).filter(Boolean);
      const allowedSingleWords = new Set(['hello', 'hi', 'skills', 'experience', 'projects', 'contact', 'staffezee', 'pregtrack', 'famconnect']);
      const fillerOnly = /^(?:um+|uh+|hmm+|ah+|oh+|hey|okay|ok|yeah|yes|no)$/i.test(cleanTranscript);
      const duplicate = cleanTranscript === lastTranscript && Date.now() - lastTranscriptAt < 5_000;
      const weakSignal = ((confidence > 0 && confidence < 0.28) || speechDuration < 180) && !hasWakeWord;
      const tooShort = cleanTranscript.length < 3 || (words.length === 1 && !allowedSingleWords.has(words[0]));
      const needsWakeWord = Date.now() > awakeUntil && !hasWakeWord;

      if (!cleanTranscript || fillerOnly || duplicate || weakSignal || tooShort || needsWakeWord) {
        if (needsWakeWord && rawTranscript) {
          message.textContent = 'Say "Aura" before your question when voice mode has been idle.';
        }
        return;
      }

      lastTranscript = cleanTranscript;
      lastTranscriptAt = Date.now();
      processingVoice = true;
      try { recognition.abort(); } catch { /* Already stopping. */ }
      void ask(transcript);
    };
    recognition.onerror = (event: any) => {
      root.dataset.voiceError = String(event.error || 'unknown');
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        voiceMode = false;
        setVoiceLabel('MIC BLOCKED - TYPE YOUR QUESTION');
        message.textContent = 'Microphone permission is blocked. Allow it in the browser, then turn voice mode on.';
        return;
      }
      if (event.error === 'audio-capture') {
        voiceMode = false;
        setVoiceLabel('MIC UNAVAILABLE - TYPE YOUR QUESTION');
        message.textContent = 'AURA cannot access a microphone. Check that it is connected and not being used exclusively by another app.';
        return;
      }
      if (event.error === 'no-speech' || event.error === 'aborted') return;
      if (event.error === 'network') {
        voiceMode = false;
        setVoiceLabel('VOICE OFFLINE - TYPE YOUR QUESTION');
        message.textContent = 'Browser voice recognition is unavailable. You can still type your question.';
        return;
      }

      recognitionErrorCount += 1;
      recognitionRetryDelay = 1_200;
      setVoiceLabel('VOICE SERVICE RETRYING');
      if (recognitionErrorCount >= 3) {
        voiceMode = false;
        setVoiceLabel('VOICE UNAVAILABLE - TYPE YOUR QUESTION');
        message.textContent = 'Voice recognition is unavailable right now. You can still type your question.';
      }
    };
    recognition.onend = () => {
      listening = false;
      if (root.dataset.auraState === 'listening') root.dataset.auraState = 'idle';
      if (voiceMode) {
        setVoiceLabel(recognitionErrorCount > 0 ? 'VOICE SERVICE RETRYING' : 'VOICE MODE ON - TAP TO END');
        resumeRecognition(recognitionRetryDelay);
      } else {
        setVoiceLabel('START VOICE MODE');
      }
    };

  }
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initAura);
else initAura();
