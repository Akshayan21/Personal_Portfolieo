import type { MLCEngine } from '@mlc-ai/web-llm';
import type { KokoroTTS } from 'kokoro-js';
import type { AuraProfile } from '../data/aura-profile';
import type { Project } from '../data/projects';
import { startLocalSTT } from './aura-local-stt';

const MODEL_ID = 'Qwen2.5-1.5B-Instruct-q4f16_1-MLC';

const readAuraProfile = (): AuraProfile | null => {
  const node = document.getElementById('aura-profile-knowledge');
  if (!node?.textContent) return null;
  try { return JSON.parse(node.textContent) as AuraProfile; }
  catch { return null; }
};
const auraProfile = readAuraProfile();
const AURA_PROFILE_CONTEXT = auraProfile
  ? `PUBLIC PERSONAL PROFILE (source of truth)\n${JSON.stringify(auraProfile)}`
  : '';

const PORTFOLIO_CONTEXT = `
You are AURA, the portfolio intelligence for Akshayan Mohandass. You are not Akshayan. Speak as a perceptive, concise male digital representative: composed, direct, warm, slightly futuristic, never theatrical. Answer the visitor's actual question first. Use natural language, not bullet lists, unless asked. Keep most answers to 2-4 sentences and under 90 words because they will be spoken.

Never invent facts, metrics, education, compensation, private contact details, or confidential work. If information is absent, say so plainly and suggest asking Akshayan directly.

AKSHAYAN
Akshayan Mohandass is a Product and UX Designer based in India with a B.Tech in Artificial Intelligence and Data Science. He works across UX, product thinking, business strategy, GTM communication, technology, and implementation-aware design. His principle is: "I don't start with screens. I start with structure."

EXPERIENCE
- Mondee Tech, November 2025-2026: UX Designer and GTM Strategist. Miraee is protected by NDA; disclose no product or internal-work details.
- Kodecopter, September 2024-January 2026: progressed from UI/UX Designer Intern to UI/UX Trainee to UX Designer and Junior Product Manager.
- Aakam 360 5(I), October 2023-September 2024: UI/UX Designer Intern. Worked on PregTrack and supported mobile UX, wireframing, prototyping, and product flows.
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
  { terms: ['hire', 'hiring', 'fit', 'strength', 'strong', 'value', 'unique', 'different', 'choose', 'suitable', 'contribute', 'good designer', 'best at'], answer: 'Akshayan is strongest when the product is complex before it is visual. He turns ambiguous logic into clear workflows, understands implementation constraints, and works especially well on AI-native and operational products.', section: 'experience' },
  { terms: ['ai', 'artificial intelligence', 'agent', 'agents', 'llm', 'automation', 'generative', 'intelligent product'], answer: 'Akshayan designs AI-native product experiences with an emphasis on understandable behaviour, useful guidance, human control, and decision clarity. His work treats AI as part of the product structure rather than a decorative feature.', section: 'experience' },
  { terms: ['process', 'approach', 'method', 'workflow', 'research', 'decision', 'decide', 'problem solving', 'discovery', 'design thinking', 'how does he design'], answer: 'He begins by mapping who decides, what they need to complete, where friction appears, and which constraints are real. Research and system structure guide the flow; screens come after the underlying decisions are understood.', section: 'philosophy' },
  { terms: ['staffezee', 'systems thinking', 'staffing', 'consultant', 'recruiter'], answer: 'Staffezee is his strongest systems-thinking example: a consultant-first operating model connecting availability, submissions, duplicate prevention, interviews, and UK compliance.', section: 'projects' },
  { terms: ['pregtrack', 'preg track', 'pregnancy', 'maternal', 'health'], answer: 'PregTrack is a government-approved pregnancy health product. Akshayan helped take it from concept to launch, designing for clarity and trust while supporting frontend implementation.', section: 'projects' },
  { terms: ['famconnect', 'fam connect', 'family', 'alumni', 'community'], answer: 'FamConnect unifies several community types while preserving distinct trust boundaries through role-aware access.', section: 'projects' },
  { terms: ['ops 360', 'ops360', 'college', 'admission', 'student booking'], answer: 'Ops 360 connects college admissions, staff availability, and student meeting booking across student, staff, and management roles.', section: 'projects' },
  { terms: ['skill', 'skills', 'figma', 'technical', 'code', 'developer', 'technology', 'tech stack', 'tools', 'frontend', 'programming', 'implementation'], answer: 'Akshayan combines UX architecture, AI UX, research, interaction design, and design systems with implementation literacy across React, TypeScript, Astro, Flutter, Node, and Tailwind.', section: 'skills' },
  { terms: ['experience', 'career', 'worked', 'company', 'companies', 'previous', 'background', 'journey', 'resume', 'cv', 'employment'], answer: 'His experience spans Mondee, Kodecopter, Aakam 360, and Bloom Majestic across AI-native enterprise products, B2B platforms, health technology, and emotionally sensitive mobile experiences.', section: 'experience' },
  { terms: ['available', 'availability', 'job', 'opening', 'contact', 'email', 'reach', 'interview', 'opportunity', 'freelance', 'full time', 'full-time'], answer: 'Akshayan is open to full-time product design roles, especially in AI-native, enterprise, and operational products. You can reach him through the contact section.', section: 'contact' },
  { terms: ['who is akshayan', 'about him', 'introduce', 'introduction', 'tell me about him', 'profile'], answer: 'Akshayan Mohandass is a product designer and systems thinker based in India. He designs where AI behaviour, enterprise workflows, content, and implementation meet.', section: 'about' },
];
const readSelectedProjects = (): Project[] => {
  const node = document.getElementById('aura-project-knowledge');
  if (!node?.textContent) return [];
  try { return JSON.parse(node.textContent) as Project[]; }
  catch { return []; }
};
const selectedProjects = readSelectedProjects();

const hasDetailedEvidence = (project: Project) => Boolean(
  project.decisions.length && project.insights.length && project.outcomes.length,
);

const publicProjectSummary = (project: Project) => {
  if (project.slug === 'miraee-booking-engine') {
    return `${project.title} is confidential AI-native enterprise travel work at Mondee. Akshayan's public role covers product experience and content strategy, but project research, decisions, metrics, and client details are not available for public discussion.`;
  }
  if (project.slug === 'pharmavault') {
    return `${project.title} (${project.type}, ${project.year}) is an incomplete case study about pharmaceutical inventory, prescription tracking, and compliance workflows. Detailed research, decisions, and outcomes are not yet published; never infer them.`;
  }
  const outcomes = project.outcomes.length
    ? ` Outcomes: ${project.outcomes.map(item => `${item.metric} ${item.label}`).join('; ')}.`
    : '';
  return `${project.title} (${project.type}, ${project.company}, ${project.year}). Role: ${project.role}. ${project.desc}${outcomes}`;
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

const genericProjectTerms = new Set(['design', 'designer', 'product', 'system', 'systems', 'interface', 'application', 'platform', 'tool', 'tools', 'figma', 'mobile', 'website']);

const projectRelevance = (project: Project, question: string) => {
  const query = question.toLowerCase();
  const queryTerms = new Set(query.split(/[^a-z0-9]+/).filter(Boolean));
  const title = project.title.toLowerCase();
  let score = query.includes(title) || query.includes(project.slug) ? 20 : 0;
  const terms = [project.type, project.company, ...project.tags, ...project.tools]
    .join(' ')
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(term => term.length > 3 && !genericProjectTerms.has(term));
  for (const term of new Set(terms)) if (queryTerms.has(term)) score += 2;
  for (const titleTerm of title.split(/\s+/)) if (titleTerm.length > 3 && !genericProjectTerms.has(titleTerm) && queryTerms.has(titleTerm)) score += 5;
  return score;
};

const getProjectKnowledge = (question: string) => {
  const comparisonQuestion = /compare|versus|\bvs\b|difference|strongest|best|across|pattern|trade-?off|which project/i.test(question);
  const currentSlug = typeof window === 'undefined' ? '' : window.location.pathname.match(/\/projects\/([^/]+)/)?.[1] || '';
  const ranked = selectedProjects
    .map(project => ({ project, score: projectRelevance(project, question) + (project.slug === currentSlug ? 8 : 0) }))
    .sort((a, b) => b.score - a.score);
  const relevant = ranked.filter(item => item.score >= 4);

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
let currentAudioUrl = '';
let naturalVoice: KokoroTTS | null = null;
let naturalVoicePromise: Promise<KokoroTTS> | null = null;
const history: Array<{ role: 'user' | 'assistant'; content: string }> = [];

const projectFallbackAnswer = (question: string) => {
  const currentSlug = typeof window === 'undefined' ? '' : window.location.pathname.match(/\/projects\/([^/]+)/)?.[1] || '';
  const ranked = selectedProjects
    .map(project => ({ project, score: projectRelevance(project, question) + (project.slug === currentSlug ? 8 : 0) }))
    .sort((a, b) => b.score - a.score);
  const relevant = ranked.filter(item => item.score >= 4);
  const wantsComparison = /compare|versus|\bvs\b|difference|trade-?off|which project/i.test(question);

  if (wantsComparison && relevant.length >= 2) {
    const [first, second] = relevant.map(item => item.project);
    if (hasDetailedEvidence(first) && hasDetailedEvidence(second)) {
      return {
        answer: `${first.title} focused on ${first.problem} Its key choice was ${first.decisions[0].decision.toLowerCase()}. ${second.title}, by contrast, focused on ${second.problem} Its key choice was ${second.decisions[0].decision.toLowerCase()}. The meaningful difference is the constraint: ${first.title} optimized for ${first.insights[0].toLowerCase()}, while ${second.title} optimized for ${second.insights[0].toLowerCase()}.`,
        section: 'projects',
      };
    }
  }

  const target = relevant[0]?.project || selectedProjects.find(project => project.slug === currentSlug);
  if (target) {
    if (!hasDetailedEvidence(target)) {
      return { answer: publicProjectSummary(target), section: 'projects' };
    }

    const query = question.toLowerCase();
    const sentence = (value: string) => /[.!?]$/.test(value.trim()) ? value.trim() : `${value.trim()}.`;
    const answer = (value: string) => ({ answer: value, section: 'projects' });

    if (/\b(?:role|contribution|responsibility|responsibilities|team|ownership|what did (?:he|akshayan) do)\b/i.test(query)) {
      return answer(`${target.title}: Akshayan's published role was ${target.role}. The team was ${target.team}. ${sentence(target.desc)}`);
    }
    if (/\b(?:research|interview|testing|test|method|evidence|insight|learned from users|user feedback)\b/i.test(query)) {
      const methods = target.researchMethods.slice(0, 3).map(item => `${item.label}: ${item.desc}`).join('; ');
      const insights = target.insights.slice(0, 2).map(sentence).join(' ');
      return answer(`${target.title} used ${methods}. The strongest published insights were: ${insights}`);
    }
    if (/\b(?:problem|challenge|pain point|friction|issue|constraint|why was it needed)\b/i.test(query)) {
      const pains = target.painPoints.slice(0, 2).map(sentence).join(' ');
      return answer(`${sentence(target.problem)} The main observed friction was: ${pains}`);
    }
    if (/\b(?:decision|rationale|trade-?off|choice|chosen|choose|why did|why was|why is|why choose|reason behind)\b/i.test(query)) {
      const decisions = target.decisions.slice(0, 2)
        .map(item => `${sentence(item.decision)} This was chosen because ${sentence(item.rationale.toLowerCase())}`)
        .join(' ');
      return answer(`${target.title}'s published design reasoning: ${decisions}`);
    }
    if (/\b(?:outcomes?|results?|impact|metrics?|improve|improvements?|success|performance)\b/i.test(query)) {
      return answer(`${target.title}'s published outcomes are ${target.outcomes.map(item => `${item.metric} ${item.label}`).join('; ')}. These are the portfolio's stated results; AURA does not infer additional impact.`);
    }
    if (/\b(?:tool|tools|technology|tech stack|software|built with|figma|flutter|react)\b/i.test(query)) {
      return answer(`${target.title} lists these tools: ${target.tools.join(', ')}. Akshayan's role was ${target.role}.`);
    }
    if (/\b(?:process|steps|approach|workflow|how did|how was)\b/i.test(query)) {
      const steps = target.processSteps.map(item => `${item.title}: ${item.desc}`).join('; ');
      return answer(`${target.title}'s published process was ${steps}.`);
    }
    if (/\b(?:solution|feature|screen|interface|flow|designed|design solution)\b/i.test(query)) {
      const screens = target.screens.slice(0, 3).map(item => `${item.title}: ${item.desc}`).join('; ');
      return answer(`${target.title}'s key published solutions were ${screens}.`);
    }
    if (/\b(?:learning|reflection|worked well|do differently|improve next|lesson)\b/i.test(query)) {
      const worked = target.learnings.worked.slice(0, 2).map(sentence).join(' ');
      const improve = target.learnings.improve.slice(0, 2).map(sentence).join(' ');
      return answer(`What worked in ${target.title}: ${worked} What Akshayan would improve: ${improve}`);
    }

    return answer(`${sentence(target.overview)} The central problem was ${sentence(target.problem)} One published decision was ${target.decisions[0].decision.toLowerCase()}, because ${sentence(target.decisions[0].rationale.toLowerCase())} The stated outcomes are ${target.outcomes.map(item => `${item.metric} ${item.label}`).join('; ')}.`);
  }

  if (/project|case stud|research|design decision|trade-?off|outcome/i.test(question)) {
    return {
      answer: 'The portfolio shows different kinds of systems thinking: Staffezee restructures UK staffing around consultant availability, PayDart makes financial authority and automation visible, PregTrack reduces medical and digital complexity, and FamConnect preserves trust boundaries across community types. Ask me to compare any two, defend a design decision, or trace research evidence to an outcome.',
      section: 'projects',
    };
  }
  return null;
};
const normalizeQuestion = (value: string) => value
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const recognizedTermCorrections: Array<[RegExp, string]> = [
  [/\b(?:staff easy|staff e z|staff zee)\b/gi, 'Staffezee'],
  [/\b(?:preg track|preg tract)\b/gi, 'PregTrack'],
  [/\b(?:farm connect|fam connect)\b/gi, 'FamConnect'],
  [/\b(?:pay dart|paid art|pay dot)\b/gi, 'PayDart'],
  [/\b(?:code engine|coat engine|kode engine)\b/gi, 'KodeEngine'],
  [/\bops three sixty\b/gi, 'Ops 360'],
  [/\b(?:pharma vault|farmer vault)\b/gi, 'PharmaVault'],
  [/\b(?:mirror booking|mira booking|my ray booking)\b/gi, 'Miraee Booking Engine'],
];

const correctRecognizedQuestion = (value: string) => recognizedTermCorrections
  .reduce((result, [pattern, replacement]) => result.replace(pattern, replacement), value)
  .trim();

const personalProfileAnswer = (question: string) => {
  if (!auraProfile) return null;
  const query = normalizeQuestion(question);
  const { identity, skills, experience, availability, contact } = auraProfile;

  const customAnswer = auraProfile.customAnswers
    .map(entry => ({
      entry,
      score: entry.topics.reduce((score, topic) => score + (query.includes(normalizeQuestion(topic)) ? topic.length : 0), 0),
    }))
    .sort((first, second) => second.score - first.score)[0];
  if (customAnswer?.score > 0) {
    return { answer: customAnswer.entry.answer, section: customAnswer.entry.section };
  }

  if (/\b(?:who is akshayan|who is he|tell me about (?:akshayan|him)|introduce (?:akshayan|him)|what does (?:akshayan|he) do|about akshayan)\b/i.test(query)) {
    return { answer: `${auraProfile.summary} ${auraProfile.positioning}`, section: 'about' };
  }
  if (/\b(?:current role|current job|currently work|working now|where does (?:he|akshayan) work|what company|mondee)\b/i.test(query)) {
    return { answer: `${identity.fullName} currently works as ${identity.currentRole}. His work there involves Miraee, which is protected by NDA, so AURA can acknowledge his role and employment but cannot discuss internal responsibilities, deliverables, product details, or strategy.`, section: 'experience' };
  }
  if (/\b(?:where is (?:he|akshayan)|where (?:does he|does akshayan) live|based|location|country)\b/i.test(query)) {
    return { answer: `${identity.fullName} is based in ${identity.location}.`, section: 'about' };
  }
  if (/\b(?:skills|skill set|tools|technology|tech stack|technical|software|figma|development)\b/i.test(query)) {
    return {
      answer: `His design skills include ${skills.design.join(', ')}. His collaboration tools include ${skills.collaboration.join(', ')}, and his implementation literacy includes ${skills.development.join(', ')}. He uses that technical depth to design feasible systems, not to present himself as a specialist software engineer.`,
      section: 'skills',
    };
  }
  if (/\b(?:service|services|offer|help (?:with|a team)|consulting|consultant|freelance|what can he do)\b/i.test(query)) {
    return { answer: `Akshayan can help with ${auraProfile.services.join(', ')}. His strongest fit is work involving ${auraProfile.focusAreas.join(', ')}.`, section: 'skills' };
  }
  if (/\b(?:available|availability|open to|looking for|full time|fulltime|hire|hiring|opportunity)\b/i.test(query)) {
    return { answer: `${availability.status} He is especially interested in ${availability.interests.join(', ')}.`, section: 'contact' };
  }
  if (/\b(?:contact|email|reach|linkedin|message|talk to him)\b/i.test(query)) {
    return { answer: `You can contact Akshayan at ${contact.email}, use the contact form on this portfolio, or connect through LinkedIn.`, section: 'contact' };
  }
  if (/\b(?:process|approach|method|how does he design|design thinking|workflow)\b/i.test(query)) {
    return { answer: `Akshayan's process starts with structure: ${auraProfile.process.slice(0, 4).join(' Then, ')} His guiding principle is, “${auraProfile.principles[0]}”`, section: 'philosophy' };
  }
  if (/\b(?:experience|career|work history|worked before|companies|background|journey|resume|cv)\b/i.test(query)) {
    const timeline = experience.map(item => `${item.company}, ${item.period}, as ${item.role}: ${item.publicSummary}`).join(' ');
    return { answer: timeline, section: 'experience' };
  }
  if (/\b(?:strength|strengths|good at|best at|unique|different|why choose|why hire|fit for)\b/i.test(query)) {
    return { answer: `${auraProfile.positioning} His core strengths are ${auraProfile.strengths.join(', ')}.`, section: 'experience' };
  }
  return null;
};

const fallbackAnswer = (question: string) => {
  const normalized = normalizeQuestion(question);
  const isGreeting = /^(?:(?:hi|hello|hey)(?:\s+(?:aura|ora|there))?(?:\s+how are you)?|good (?:morning|afternoon|evening))$/i.test(normalized);
  if (isGreeting) {
    return {
      answer: "Hello! I'm AURA, Akshayan's interactive portfolio guide. I can explain his projects, research, design decisions, process, experience, technical skills, AI work, and fit for a team. Ask me about a specific project, compare his work, or ask what makes his approach different.",
    };
  }
  if (/\bmiraee\b/i.test(normalized)) {
    return {
      answer: "Miraee is a confidential project covered under NDA, so I can't disclose details about the product, features, users, strategy, research, design decisions, architecture, brand work, internal deliverables, or technical implementation. I can discuss Akshayan's public projects and transferable product, UX, strategy, and technical skills instead.",
      section: 'experience',
    };
  }
  const previousQuestion = [...history].reverse().find(item => item.role === 'user')?.content || '';
  const isFollowUp = /^(?:and|also|but|why|how|what about|tell me more|explain|can you elaborate)\b/i.test(normalized);
  const namesProject = selectedProjects.some(project => projectRelevance(project, question) >= 4);
  const contextualQuestion = isFollowUp && previousQuestion && !namesProject ? `${previousQuestion} ${question}` : question;

  const profileAnswer = personalProfileAnswer(contextualQuestion);
  if (profileAnswer?.section === 'projects') return profileAnswer;
  const projectAnswer = projectFallbackAnswer(contextualQuestion);
  if (projectAnswer) return projectAnswer;
  if (profileAnswer) return profileAnswer;

  let best = fallbackKnowledge[0];
  let score = 0;
  for (const entry of fallbackKnowledge) {
    const next = entry.terms.reduce((total, term) => {
      const normalizedTerm = normalizeQuestion(term);
      if (!normalizedTerm || !normalized.includes(normalizedTerm)) return total;
      return total + (normalizedTerm.includes(' ') ? 5 : Math.min(4, normalizedTerm.length / 2));
    }, 0);
    if (next > score) { score = next; best = entry; }
  }
  if (score > 0) return best;

  if (/\b(?:salary|compensation|age|birthday|home address|phone number|personal life|married)\b/i.test(normalized)) {
    return {
      answer: "That personal detail isn't part of Akshayan's published portfolio. You can ask him directly through the contact section.",
      section: 'contact',
    };
  }

  return {
    answer: "Across Akshayan's published work, the consistent pattern is that he maps roles, decisions, constraints, and failure points before designing screens. He then turns that structure into implementable workflows, visible in projects such as Staffezee, PayDart, PregTrack, FamConnect, and his AI-native enterprise work. Ask about a specific project or decision and I can go deeper.",
    section: 'projects',
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
  let resumeVoiceOnOpen = false;
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
      void neuralSpeak(followUp, false);
    }, 30_000);
  };

  const stopLocalVoice = () => {
    localSTT?.stop();
    localSTT = null;
    localSTTStarting = false;
  };

  const handleLocalTranscript = (rawTranscript: string) => {
    if (!voiceMode || processingVoice || speaking) return;
    const correctedTranscript = correctRecognizedQuestion(rawTranscript);
    const normalized = correctedTranscript.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
    const wakeMatch = normalized.match(/^(?:hey\s+)?(?:aura|ora)\b\s*(.*)$/i);
    const transcript = (wakeMatch?.[1] || correctedTranscript).trim();
    const cleanTranscript = transcript.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
    const hallucination = /^(?:thank you|thanks for watching|subscribe|you|bye|music)$/i.test(cleanTranscript);
    const fillerOnly = /^(?:um+|uh+|hmm+|ah+|oh+|okay|ok|yeah|yes|no)$/i.test(cleanTranscript);
    const duplicate = cleanTranscript === lastTranscript && Date.now() - lastTranscriptAt < 5_000;
    if (!cleanTranscript || cleanTranscript.length < 3 || hallucination || fillerOnly || duplicate) return;
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
      sessionStorage.setItem('aura-prefer-local-stt', 'native');
      if (voiceMode && recognition) {
        setVoiceLabel('USING BROWSER VOICE');
        message.textContent = 'Local voice could not load. Switching to browser voice recognition...';
        resumeRecognition(250);
      } else {
        voiceMode = false;
        processingVoice = false;
        speaking = false;
        root.dataset.auraState = 'idle';
        setVoiceLabel('LOCAL VOICE FAILED - TRY AGAIN');
        message.textContent = 'Local voice recognition could not load. Check the connection once so its model can be cached, or type your question.';
      }
    } finally {
      localSTTStarting = false;
    }
  };
  const setOpen = (open: boolean) => {
    panel.setAttribute('aria-hidden', String(!open));
    orb.setAttribute('aria-expanded', String(open));
    root.classList.toggle('is-open', open);
    if (open) {
      setTimeout(() => input.focus(), 300);
      // Begin the one-time neural voice download as soon as AURA opens so the
      // first spoken answer spends as little time waiting as possible.
      if (!naturalVoice) void loadNaturalVoice().catch(() => { /* Browser speech remains available. */ });
      if (resumeVoiceOnOpen) {
        resumeVoiceOnOpen = false;
        window.setTimeout(() => {
          if (root.classList.contains('is-open') && !voiceMode) void toggleVoiceMode();
        }, 0);
      }
    }
  };

  const loadBrain = async () => {
    if (engine) return engine;
    if (!('gpu' in navigator)) throw new Error('WebGPU unavailable');
    if (!enginePromise) {
      enginePromise = import('@mlc-ai/web-llm')
        .then(({ CreateMLCEngine }) => CreateMLCEngine(MODEL_ID, {
          initProgressCallback: progress => {
            const value = Math.round((progress.progress || 0) * 100);
            if (brainProgressVisible) setStatus(`Loading local intelligence - ${value}% - first visit only`);
          },
        }))
        .then(value => (engine = value));
    }
    return enginePromise;
  };

  const loadNaturalVoice = async () => {
    if (naturalVoice) return naturalVoice;
    if (!naturalVoicePromise) {
      naturalVoicePromise = import('kokoro-js')
        .then(async ({ KokoroTTS }) => {
          const model = 'onnx-community/Kokoro-82M-v1.0-ONNX';
          if ('gpu' in navigator) {
            try {
              return await KokoroTTS.from_pretrained(model, { dtype: 'q8', device: 'webgpu' });
            } catch (error) {
              console.warn('[AURA natural voice] WebGPU unavailable; using WASM.', error);
            }
          }
          return KokoroTTS.from_pretrained(model, { dtype: 'q8', device: 'wasm' });
        })
        .then(voice => (naturalVoice = voice))
        .catch(error => {
          naturalVoicePromise = null;
          throw error;
        });
    }
    return naturalVoicePromise;
  };

  const stopCurrentAudio = () => {
    currentAudio?.pause();
    currentAudio = null;
    if (currentAudioUrl) URL.revokeObjectURL(currentAudioUrl);
    currentAudioUrl = '';
  };

  const prepareSpeech = (text: string) => text
    .replace(/\bAkshayan\b/g, 'Ak-shay-an')
    .replace(/\bAURA\b/g, 'Ora')
    .replace(/\bAI\b/g, 'A.I.')
    .replace(/\bUX\b/g, 'U X')
    .replace(/\bB2B\b/g, 'B to B')
    .replace(/\bSaaS\b/g, 'sass')
    .replace(/\b0-to-1\b/g, 'zero to one')
    .replace(/AI-native/gi, 'A.I. native')
    .replace(/\s*[|;]\s*/g, '. ')
    .replace(/\s+[â€”â€“]\s+/g, ', ')
    .replace(/\s+/g, ' ')
    .trim();

  const chooseNaturalMaleVoice = (voices: SpeechSynthesisVoice[]) => {
    const score = (voice: SpeechSynthesisVoice) => {
      if (!/^en(?:-|_)/i.test(voice.lang)) return -1_000;
      const name = voice.name.toLowerCase();
      let value = 10;
      if (/natural|neural|online|premium|enhanced/.test(name)) value += 90;
      if (/prabhat|guy|ryan|christopher|david|mark|daniel|george|lewis|male/.test(name)) value += 65;
      if (/google uk english male/.test(name)) value += 80;
      if (/zira|hazel|susan|heera|swara|sonia|aria|jenny|samantha|female/.test(name)) value -= 100;
      if (/^en-in/i.test(voice.lang)) value += 18;
      if (!voice.localService) value += 8;
      return value;
    };
    return [...voices].sort((first, second) => score(second) - score(first))[0] || null;
  };

  const browserSpeak = (text: string, onDone?: () => void) => {
    if (!root.classList.contains('is-open')) {
      processingVoice = false;
      speaking = false;
      root.dataset.auraState = 'idle';
      onDone?.();
      return;
    }
    if (!('speechSynthesis' in window)) {
      processingVoice = false;
      speaking = false;
      resumeRecognition();
      onDone?.();
      return;
    }
    window.speechSynthesis.cancel();
    const utteranceGeneration = speechGeneration;
    const utterance = new SpeechSynthesisUtterance(prepareSpeech(text));
    utterance.voice = chooseNaturalMaleVoice(window.speechSynthesis.getVoices());
    utterance.rate = 1.06;
    utterance.pitch = .98;
    utterance.volume = 1;
    utterance.onstart = () => {
      if (utteranceGeneration !== speechGeneration || !root.classList.contains('is-open')) {
        window.speechSynthesis.cancel();
        return;
      }
      speaking = true;
      root.dataset.auraState = 'speaking';
    };
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

  async function neuralSpeak(text: string, shouldScheduleFollowUp = true) {
    clearFollowUp();
    message.textContent = text;
    const utteranceGeneration = speechGeneration;

    try {
      // Never hold a response while the large voice model downloads. The best
      // installed system voice speaks immediately; Kokoro takes over once warm.
      if (!naturalVoice) {
        void loadNaturalVoice().catch(() => { /* Browser speech remains available. */ });
        browserSpeak(text, shouldScheduleFollowUp ? scheduleFollowUp : undefined);
        return;
      }
      const voice = naturalVoice;
      if (utteranceGeneration !== speechGeneration || !root!.classList.contains('is-open')) return;

      speaking = true;
      root!.dataset.auraState = 'speaking';
      if (voiceMode) setVoiceLabel('AURA IS SPEAKING');

      const audioStream = voice.stream(prepareSpeech(text), {
        voice: 'am_michael',
        speed: 1.04,
      });
      const iterator = audioStream[Symbol.asyncIterator]();
      // If this device cannot synthesize the first sentence quickly, switch to
      // immediate system speech instead of leaving the visitor in silence.
      let nextChunk = await withDeadline(iterator.next(), 2_200);
      while (!nextChunk.done) {
        const chunk = nextChunk.value;
        if (utteranceGeneration !== speechGeneration || !root!.classList.contains('is-open')) return;
        stopCurrentAudio();
        currentAudioUrl = URL.createObjectURL(chunk.audio.toBlob());
        const audio = new Audio(currentAudioUrl);
        currentAudio = audio;
        await new Promise<void>((resolve, reject) => {
          audio.onended = () => resolve();
          audio.onerror = () => reject(new Error('Natural voice playback failed'));
          audio.play().catch(reject);
        });
        nextChunk = await iterator.next();
      }

      if (utteranceGeneration !== speechGeneration || !root!.classList.contains('is-open')) return;
      stopCurrentAudio();
      speaking = false;
      processingVoice = false;
      awakeUntil = Date.now() + 20_000;
      root!.dataset.auraState = 'idle';
      resumeRecognition();
      if (shouldScheduleFollowUp) scheduleFollowUp();
    } catch (error) {
      stopCurrentAudio();
      if (utteranceGeneration !== speechGeneration || !root!.classList.contains('is-open')) return;
      console.warn('[AURA natural voice] Falling back to browser speech.', error);
      browserSpeak(text, shouldScheduleFollowUp ? scheduleFollowUp : undefined);
    }
  }

  const ask = async (question: string) => {
    clearFollowUp();
    const requestGeneration = ++speechGeneration;
    stopCurrentAudio();
    window.speechSynthesis?.cancel();
    speaking = false;
    processingVoice = true;
    if (listening) {
      try { recognition?.abort(); } catch { /* Already stopping. */ }
    }
    setStatus("Reasoning locally from Akshayan's portfolio...");
    let fallback: { answer: string; section?: string };
    try {
      fallback = fallbackAnswer(question);
    } catch (error) {
      console.error('[AURA question routing]', error);
      fallback = {
        answer: "Akshayan is a product designer and systems thinker focused on AI-native products, enterprise workflows, and implementation-aware design. Ask about a specific project, role, or design decision and I can explain it.",
        section: 'about',
      };
    }
    let response = fallback.answer;

    // Do not make the visitor wait for the large local model on its first load.
    // Start it in the background and use the verified answer router immediately;
    // later questions use the model once it is ready.
    const needsGenerativeSynthesis = /\b(?:compare|versus|vs|across|pattern|critique|evaluate|recommend|what would|how would|trade-?off between)\b/i.test(question);
    if (!engine) {
      brainProgressVisible = false;
      void loadBrain().catch(() => { /* Verified fallback remains available. */ });
    } else if (needsGenerativeSynthesis) {
      brainProgressVisible = true;
      try {
        const completion = await withDeadline(engine.chat.completions.create({
          messages: [
            { role: 'system', content: [PORTFOLIO_CONTEXT, AURA_PROFILE_CONTEXT, getProjectKnowledge(question), PROJECT_REASONING_RULES].filter(Boolean).join('\n\n') },
            ...history.slice(-6),
            { role: 'user', content: question },
          ],
          temperature: 0.3,
          top_p: 0.75,
          max_tokens: 160,
        }), 7_000);
        const generated = completion.choices[0]?.message?.content?.trim();
        if (generated) response = generated;
      } catch {
        response = fallback.answer;
      } finally {
        brainProgressVisible = false;
      }
    }
    if (requestGeneration !== speechGeneration) return;
    history.push({ role: 'user', content: question }, { role: 'assistant', content: response });
    message.textContent = response;
    if ('section' in fallback && fallback.section) {
      document.getElementById(fallback.section)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    await neuralSpeak(response);
  };

  let petDragging = false;
  let suppressPetClick = false;
  let playTimer = 0;
  let playResetTimer = 0;
  let activePointerId: number | null = null;
  let pointerStartX = 0;
  let pointerStartY = 0;
  let petOriginX = 0;
  let petOriginY = 0;
  let petWidth = 0;
  let petHeight = 0;

  const setPetHint = (text: string) => {
    const hint = root.querySelector<HTMLElement>('.pet-hint');
    if (hint) hint.textContent = text;
  };

  const playWithAura = () => {
    if (root.classList.contains('is-open')) return;
    window.clearTimeout(playResetTimer);
    root.dataset.petMode = 'play';
    setPetHint('NICE MOVE. AGAIN?');
    playResetTimer = window.setTimeout(() => {
      delete root.dataset.petMode;
      setPetHint('DRAG ME OR ASK ME');
    }, 1800);
  };

  const restorePetPosition = () => {
    try {
      const saved = sessionStorage.getItem('aura-pet-position');
      if (!saved) return;
      const { x, y } = JSON.parse(saved);
      if (Number.isFinite(x) && Number.isFinite(y)) {
        root.style.left = `${x}px`;
        root.style.top = `${y}px`;
        root.style.right = 'auto';
        root.style.bottom = 'auto';
      }
    } catch { /* Position persistence is optional. */ }
  };

  const finishPetInteraction = () => {
    if (activePointerId === null) return;
    window.clearTimeout(playTimer);
    try { orb.releasePointerCapture(activePointerId); } catch { /* Capture may already be released. */ }
    activePointerId = null;
    if (!petDragging) return;
    suppressPetClick = true;
    const current = root.getBoundingClientRect();
    try {
      sessionStorage.setItem('aura-pet-position', JSON.stringify({
        x: Math.round(current.left),
        y: Math.round(current.top),
      }));
    } catch { /* Position persistence is optional. */ }
    window.setTimeout(() => { suppressPetClick = false; }, 80);
  };

  restorePetPosition();
  orb.addEventListener('dragstart', event => event.preventDefault());
  orb.addEventListener('pointerdown', (event) => {
    if (root.classList.contains('is-open') || event.button !== 0) return;
    event.preventDefault();
    activePointerId = event.pointerId;
    pointerStartX = event.clientX;
    pointerStartY = event.clientY;
    const rect = orb.getBoundingClientRect();
    petOriginX = rect.left;
    petOriginY = rect.top;
    petWidth = rect.width;
    petHeight = rect.height;
    petDragging = false;
    window.clearTimeout(playTimer);
    playTimer = window.setTimeout(() => {
      if (!petDragging && activePointerId === event.pointerId) {
        suppressPetClick = true;
        playWithAura();
      }
    }, 650);
    orb.setPointerCapture(event.pointerId);
  });

  orb.addEventListener('pointermove', (event) => {
    if (event.pointerId !== activePointerId) return;
    const dx = event.clientX - pointerStartX;
    const dy = event.clientY - pointerStartY;
    if (!petDragging && Math.abs(dx) + Math.abs(dy) < 5) return;
    event.preventDefault();
    petDragging = true;
    window.clearTimeout(playTimer);
    const maxX = Math.max(8, window.innerWidth - petWidth - 8);
    const maxY = Math.max(8, window.innerHeight - petHeight - 8);
    const nextX = Math.min(maxX, Math.max(8, petOriginX + dx));
    const nextY = Math.min(maxY, Math.max(8, petOriginY + dy));
    root.style.left = `${nextX}px`;
    root.style.top = `${nextY}px`;
    root.style.right = 'auto';
    root.style.bottom = 'auto';
  });

  orb.addEventListener('pointerup', finishPetInteraction);
  orb.addEventListener('pointercancel', finishPetInteraction);

  orb.addEventListener('click', (event) => {
    if (suppressPetClick) {
      event.preventDefault();
      event.stopPropagation();
      suppressPetClick = false;
      return;
    }
    setOpen(!root.classList.contains('is-open'));
  });
  root.querySelector('.aura-close')?.addEventListener('click', () => {
    clearFollowUp();
    speechGeneration += 1;
    resumeVoiceOnOpen = voiceMode;
    voiceMode = false;
    window.clearTimeout(restartTimer);
    stopLocalVoice();
    try { recognition?.abort(); } catch { /* Recognition may already be closed. */ }
    stopCurrentAudio();
    window.speechSynthesis?.cancel();
    speaking = false;
    processingVoice = false;
    root.dataset.auraState = 'idle';
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

    stopCurrentAudio();
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
      setVoiceLabel('START LOCAL VOICE');
    }
  } else {
    recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 3;
    setVoiceLabel(preferLocalSTT ? 'START LOCAL VOICE' : 'START VOICE MODE');

    const domainTerms = [
      'Akshayan Mohandass', 'AURA', 'Mondee', 'Kodecopter', 'Aakam 360',
      'Bloom Majestic', 'Staffezee', 'PregTrack', 'FamConnect', 'Ops 360',
      'PharmaVault', 'product designer', 'systems thinking', 'Figma', 'Astro', 'Flutter',
    ];
    // Chrome may expose the experimental `phrases` property and still reject
    // it with `phrases-not-supported` when recognition starts.

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
      if (!voiceMode || !root.classList.contains('is-open')) return;
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

      const rawTranscript = correctRecognizedQuestion(String(best?.transcript || '').trim());
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
      const fillerOnly = /^(?:um+|uh+|hmm+|ah+|oh+|okay|ok|yeah|yes|no)$/i.test(cleanTranscript);
      const duplicate = cleanTranscript === lastTranscript && Date.now() - lastTranscriptAt < 5_000;
      const weakSignal = ((confidence > 0 && confidence < 0.28) || speechDuration < 180) && !hasWakeWord;
      const tooShort = cleanTranscript.length < 3 || (words.length === 1 && !allowedSingleWords.has(words[0]));

      // Voice mode was explicitly activated by the visitor, so any meaningful
      // final transcript is a question. The optional "Aura" prefix is still
      // stripped, but it is never required before submitting the transcript.
      if (!cleanTranscript || fillerOnly || duplicate || weakSignal || tooShort) return;

      lastTranscript = cleanTranscript;
      lastTranscriptAt = Date.now();
      processingVoice = true;
      try { recognition.abort(); } catch { /* Already stopping. */ }
      void ask(transcript);
    };
    recognition.onerror = (event: any) => {
      root.dataset.voiceError = String(event.error || 'unknown');
      if (event.error === 'phrases-not-supported') {
        try { recognition.phrases = []; } catch { /* Property may be read-only. */ }
        recognitionErrorCount = 0;
        recognitionRetryDelay = 250;
        resumeRecognition(recognitionRetryDelay);
        return;
      }
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
        if (typeof navigator.mediaDevices?.getUserMedia === 'function' && !localSTT && !localSTTStarting) {
          preferLocalSTT = true;
          setVoiceLabel('SWITCHING TO LOCAL VOICE');
          message.textContent = 'Browser voice is unavailable. Switching to local recognition...';
          void startLocalVoice();
        } else {
          voiceMode = false;
          setVoiceLabel('VOICE OFFLINE - TYPE YOUR QUESTION');
          message.textContent = 'Voice recognition is unavailable. You can still type your question.';
        }
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

  const warmNaturalVoice = () => {
    if (!naturalVoice) void loadNaturalVoice().catch(() => { /* Browser speech remains available. */ });
  };
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(warmNaturalVoice, { timeout: 4_000 });
  } else {
    setTimeout(warmNaturalVoice, 1_500);
  }
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initAura);
else initAura();
