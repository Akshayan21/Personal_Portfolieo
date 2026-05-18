export interface Project {
  slug: string;
  title: string;
  type: string;
  company: string;
  year: string;
  duration: string;
  role: string;
  team: string;
  tools: string[];
  tags: string[];
  accent: string;
  accentDark: string;
  desc: string;
  overview: string;
  problem: string;
  painPoints: string[];
  researchMethods: { label: string; desc: string }[];
  insights: string[];
  processSteps: { num: string; title: string; desc: string }[];
  screens: { title: string; desc: string }[];
  decisions: { decision: string; rationale: string }[];
  outcomes: { metric: string; label: string }[];
  learnings: { worked: string[]; improve: string[] };
}

export const projects: Project[] = [
  {
    slug: "paydart",
    title: "PayDart",
    type: "FinTech Workflow",
    company: "Personal Project",
    year: "2024",
    duration: "12 Weeks",
    role: "Product Designer & Frontend Developer",
    team: "Solo",
    tools: ["Figma", "FigJam", "Flutter"],
    tags: ["Flutter", "Provider", "Admin UI"],
    accent: "#FDC800",
    accentDark: "#c49a00",
    desc: "A scalable financial workflow system built with Flutter + Provider. Features role-based authority, real-time reporting, and automated late-fee logic.",
    overview: "Designed an end-to-end fees management system that eliminated manual billing processes for enterprise travel operations — reducing processing overhead by 40% and enabling real-time financial oversight across multiple authority tiers.",
    problem: "Finance teams were managing fee calculations, late payments, and billing approvals through fragmented spreadsheets and manual email threads. The lack of a unified system caused delays, errors, and zero visibility into outstanding obligations.",
    painPoints: [
      "No centralised view of pending fees across departments",
      "Manual late-fee calculations prone to human error",
      "Role-based approval chains handled entirely over email",
    ],
    researchMethods: [
      { label: "Stakeholder Interviews", desc: "5 sessions with finance managers and approvers" },
      { label: "Workflow Shadowing", desc: "Observed existing spreadsheet-based process end-to-end" },
      { label: "Competitive Audit", desc: "Reviewed 4 enterprise billing tools for pattern benchmarks" },
      { label: "Jobs-to-be-Done", desc: "Mapped primary user goals against system friction points" },
    ],
    insights: [
      "Approvers spent 60% of their time chasing status — not making decisions",
      "Late-fee logic was recalculated manually on every invoice cycle",
      "No single source of truth for who had approved what and when",
    ],
    processSteps: [
      { num: "01", title: "Discover", desc: "Stakeholder interviews, workflow shadowing, pain-point mapping" },
      { num: "02", title: "Define",   desc: "Problem framing, user flows, authority matrix, role hierarchy" },
      { num: "03", title: "Design",   desc: "Wireframes → high-fidelity in Figma, prototype and review cycles" },
      { num: "04", title: "Deliver",  desc: "Dev handoff with annotated specs, implementation support" },
    ],
    screens: [
      { title: "Dashboard Overview",     desc: "Unified view of all pending fees, overdue items, and approval queues sorted by priority and role." },
      { title: "Fee Calculation Engine", desc: "Rule-based configuration panel for setting late-fee logic, billing cycles, and exception handling." },
      { title: "Approval Workflow",      desc: "Multi-level approval interface with inline context, audit trail, and one-tap decisions." },
    ],
    decisions: [
      { decision: "Role-based dashboard fragments over a single view", rationale: "Finance managers and approvers have entirely different mental models — splitting views reduced cognitive load and decision fatigue." },
      { decision: "Inline late-fee preview before submission",         rationale: "Testing revealed users didn't trust automated calculations — showing the formula in context built confidence and reduced rejection rates." },
    ],
    outcomes: [
      { metric: "40%",  label: "Reduction in manual processing time" },
      { metric: "100%", label: "Design & delivery ownership" },
      { metric: "3×",   label: "Faster approval cycle vs. prior email flow" },
    ],
    learnings: {
      worked:  ["Early authority-matrix mapping prevented scope creep mid-design", "Shadowing sessions surfaced non-obvious friction invisible in interviews"],
      improve: ["Would run usability tests earlier before high-fidelity", "Need better tooling for documenting complex business rule logic in handoff"],
    },
  },

  {
    slug: "miraee-booking-engine",
    title: "Miraee Booking Engine",
    type: "Enterprise Travel",
    company: "Mondee / Miraee",
    year: "2026",
    duration: "12 Weeks",
    role: "Lead Product Designer",
    team: "1 Designer · 3 Engineers · 1 PM · 1 BA",
    tools: ["Figma", "FigJam", "FullStory"],
    tags: ["Figma", "Design Systems", "UX Research"],
    accent: "#432DD7",
    accentDark: "#2e1fb5",
    desc: "End-to-end corporate booking flow reducing multi-step friction into a unified, intent-first interface for global enterprise teams.",
    overview: "Redesigned the core booking experience for a corporate travel platform used by 300+ enterprise users — consolidating a fragmented 7-step flow into a streamlined intent-first interface that shipped in 3 sprint cycles.",
    problem: "The existing booking flow required users to navigate 7 separate screens to complete a single trip request. Drop-off data showed 58% of users abandoned mid-flow, and support tickets cited confusion around approval requirements and policy constraints.",
    painPoints: [
      "7-step flow with no progress visibility or contextual guidance",
      "Policy warnings appeared post-submission — too late to be useful",
      "Approval requirements were hidden until the final confirmation step",
    ],
    researchMethods: [
      { label: "Session Recordings",    desc: "Analysed 40+ FullStory sessions to map abandonment points" },
      { label: "User Interviews",       desc: "8 interviews with corporate travel coordinators and frequent travellers" },
      { label: "Heuristic Evaluation",  desc: "Audited existing flow against Nielsen's 10 usability heuristics" },
      { label: "Tree Testing",          desc: "Validated new IA with 15 participants before design began" },
    ],
    insights: [
      "Users wanted to know policy compliance status before investing time in a booking",
      "Travel coordinators book on behalf of others — the flow assumed self-booking only",
      "Progress indicators reduced perceived effort significantly in prototype testing",
    ],
    processSteps: [
      { num: "01", title: "Discover", desc: "Session recordings, drop-off analysis, stakeholder alignment" },
      { num: "02", title: "Define",   desc: "Journey mapping, persona refinement, IA restructure" },
      { num: "03", title: "Design",   desc: "Intent-first flow redesign, component system, interactive prototype" },
      { num: "04", title: "Deliver",  desc: "Phased handoff, UAT support, post-launch monitoring" },
    ],
    screens: [
      { title: "Intent-First Search",     desc: "Single-input search with real-time policy compliance check before users commit to a booking path." },
      { title: "Unified Booking Summary", desc: "Collapsed multi-screen form into a scrollable single-page layout with persistent policy context." },
      { title: "Approval Context Panel",  desc: "Inline approval requirement display showing who needs to approve and estimated turnaround time." },
    ],
    decisions: [
      { decision: "Policy check at the search step, not confirmation", rationale: "Moving the policy gate earlier eliminated the frustration of investing 10 minutes in a booking only to learn it violated policy." },
      { decision: "Single-page scrollable form over step-by-step wizard", rationale: "Tree testing showed users preferred seeing the full scope of a task upfront — the wizard created artificial anxiety about unknown future steps." },
    ],
    outcomes: [
      { metric: "3",    label: "Sprint cycles from brief to ship" },
      { metric: "300+", label: "Enterprise users on launch" },
      { metric: "58%",  label: "Previous mid-flow abandonment rate addressed" },
    ],
    learnings: {
      worked:  ["Bringing policy logic into the search step was the single highest-impact change", "Proxy-booking use case discovery reshaped the entire IA before wireframes started"],
      improve: ["Would have run tree tests even earlier — before any wireframe work", "Needed a dedicated empty-state and error design pass before handoff"],
    },
  },

  {
    slug: "inniyal-wellness-app",
    title: "Inniyal Wellness App",
    type: "Health & Wellness",
    company: "Bloom Majestic",
    year: "2022",
    duration: "10 Weeks",
    role: "UI/UX Designer",
    team: "1 Designer · 2 Engineers",
    tools: ["Figma", "Maze", "Principle"],
    tags: ["Mobile UX", "Accessibility", "Prototyping"],
    accent: "#D97706",
    accentDark: "#b45309",
    desc: "Mobile application focused on mental wellness. Designed with strict cognitive load constraints and an emotional-first visual approach.",
    overview: "Designed the end-to-end mobile experience for a mental wellness app targeting urban professionals — prioritising calm, uncluttered interactions and emotional-first design patterns to reduce cognitive friction at vulnerable moments.",
    problem: "Existing mental wellness apps were visually overwhelming, gamification-heavy, and designed for engagement metrics rather than genuine wellbeing. Users in stressed states found most apps added to their cognitive load rather than reducing it.",
    painPoints: [
      "Competing notifications and streaks created anxiety rather than calm",
      "Onboarding flows were 12+ steps long — too demanding for distressed users",
      "Dark patterns pushed premium upsells at emotionally sensitive moments",
    ],
    researchMethods: [
      { label: "Diary Studies",          desc: "7-day diary with 6 participants tracking app usage during stress events" },
      { label: "Competitive Analysis",   desc: "Benchmarked 6 wellness apps across cognitive load and accessibility criteria" },
      { label: "Prototype Testing",      desc: "3 rounds of Maze tests focusing on task completion under simulated stress" },
      { label: "Accessibility Audit",    desc: "WCAG AA compliance review with focus on contrast and touch target sizing" },
    ],
    insights: [
      "Users wanted to feel met where they were — not pushed toward goals during hard moments",
      "Minimal input at entry was critical — every extra tap caused drop-off in stressed states",
      "Colour temperature and typography weight significantly affected perceived calm",
    ],
    processSteps: [
      { num: "01", title: "Discover", desc: "Diary studies, competitive benchmarking, emotional journey mapping" },
      { num: "02", title: "Define",   desc: "Cognitive load principles, emotional design framework, accessibility baseline" },
      { num: "03", title: "Design",   desc: "Low-fi sketches → Figma components → Principle micro-interactions" },
      { num: "04", title: "Deliver",  desc: "Annotated specs with motion guidelines, accessibility notes, dev handoff" },
    ],
    screens: [
      { title: "Calm Entry State",     desc: "Single-question check-in on open — no goals, no streaks, just a low-friction emotional pulse." },
      { title: "Guided Session Flow",  desc: "Distraction-free session interface with soft transitions and no competing UI elements." },
      { title: "Reflection Journal",   desc: "Minimal text entry space with calming visual rhythm and optional prompts — no character counts." },
    ],
    decisions: [
      { decision: "No gamification elements whatsoever", rationale: "Diary study data showed streaks and badges actively increased anxiety for users who missed days — the opposite of the product's purpose." },
      { decision: "Single-question onboarding vs. full profile setup", rationale: "Reducing entry from 12 steps to 1 question increased completion rate significantly in Maze testing, without sacrificing personalisation quality." },
    ],
    outcomes: [
      { metric: "4.8★", label: "App Store rating on launch" },
      { metric: "1",    label: "Question onboarding (down from 12 steps)" },
      { metric: "WCAG", label: "AA accessibility compliance met" },
    ],
    learnings: {
      worked:  ["Diary studies were far more revealing than interviews for understanding in-the-moment behaviour", "Constraining the visual palette early forced creative solutions instead of decorative ones"],
      improve: ["Would test with clinical psychologist input earlier in the process", "Micro-interaction specs needed more detail — several were re-interpreted during implementation"],
    },
  },

  {
    slug: "kodeengine-interface",
    title: "KodeEngine Interface",
    type: "AI Architecture Tools",
    company: "Kodecopter",
    year: "2024",
    duration: "6 Weeks",
    role: "Product Designer",
    team: "1 Designer · 4 Engineers",
    tools: ["Figma", "FigJam", "Storybook"],
    tags: ["SaaS", "Data Viz", "AI UX"],
    accent: "#16A34A",
    accentDark: "#15803d",
    desc: "SaaS platform interface for a generative AI tool that scaffolds full-stack architectures. Designed the node-based visualizer.",
    overview: "Designed the primary interface for an AI-powered code architecture generator — including the node-based visualizer that maps generated project structures and the configuration panel that shapes AI output.",
    problem: "Developers using the early prototype couldn't understand what the AI was generating or why. The output was a raw file tree with no spatial context — making it impossible to evaluate the architecture before committing to generation.",
    painPoints: [
      "No visual representation of how generated modules related to each other",
      "Configuration inputs had no real-time feedback on how settings affected output",
      "Zero progressive disclosure — all options shown at once overwhelmed new users",
    ],
    researchMethods: [
      { label: "Developer Interviews",   desc: "6 sessions with full-stack developers who regularly scaffold new projects" },
      { label: "Mental Model Mapping",   desc: "Card sorting to understand how developers think about project architecture" },
      { label: "Wizard of Oz Testing",   desc: "Simulated AI responses to test node visualizer comprehension before build" },
      { label: "Heuristic Evaluation",   desc: "Benchmarked against Linear, Vercel, and GitHub Copilot for AI UX patterns" },
    ],
    insights: [
      "Developers trust AI output more when they can see the reasoning, not just the result",
      "Progressive disclosure was critical — expert mode vs. guided mode split was expected",
      "Node-based visualisation was familiar from tools like Figma's component graph",
    ],
    processSteps: [
      { num: "01", title: "Discover", desc: "Developer interviews, mental model research, AI UX pattern benchmarking" },
      { num: "02", title: "Define",   desc: "User flow mapping, information architecture, trust-building framework for AI output" },
      { num: "03", title: "Design",   desc: "Node visualiser explorations, configuration panel iterations, interactive prototype" },
      { num: "04", title: "Deliver",  desc: "Component specs for Storybook, interaction notes, handoff with engineer pairing" },
    ],
    screens: [
      { title: "Node Visualiser",       desc: "Interactive graph view of the generated architecture with colour-coded module types and relationship edges." },
      { title: "Configuration Panel",   desc: "Side-panel with real-time architecture preview updates as configuration inputs change." },
      { title: "Generation History",    desc: "Version timeline showing previous generations with diff view for comparing architectural decisions." },
    ],
    decisions: [
      { decision: "Node graph over file tree for primary output display", rationale: "File trees show hierarchy but not relationships. Developer interviews revealed architecture comprehension requires seeing how modules communicate — not just how they are nested." },
      { decision: "Real-time preview over generate-and-review cycle", rationale: "Wizard of Oz tests showed developers made better configuration decisions when they could see live impact — reducing regeneration cycles significantly." },
    ],
    outcomes: [
      { metric: "4",  label: "Products shipped in 12 months at Kodecopter" },
      { metric: "0→1", label: "Full zero-to-launch execution" },
      { metric: "100%", label: "Design ownership across the product" },
    ],
    learnings: {
      worked:  ["Wizard of Oz testing saved weeks of engineering time by validating the visualiser concept before build", "Mental model research before wireframes meant the node metaphor needed zero explanation in testing"],
      improve: ["Would build a richer component library earlier — handoff had too many one-off edge cases", "AI UX needs specific trust-signalling patterns not covered by standard heuristics — need a dedicated framework"],
    },
  },

  {
    slug: "pregtrack-app",
    title: "PregTrack App",
    type: "Health Tech",
    company: "Aakam 360",
    year: "2023",
    duration: "14 Weeks",
    role: "UI/UX Intern",
    team: "1 Designer · 2 Engineers · 1 Doctor Consultant",
    tools: ["FlutterFlow", "Figma", "Miro"],
    tags: ["FlutterFlow", "UI Design", "MSME"],
    accent: "#FDC800",
    accentDark: "#c49a00",
    desc: "Government-approved MSME product for pregnancy tracking. Focused on creating simple, stress-free user flows for expectant mothers.",
    overview: "Designed and supported frontend implementation for a government-approved MSME pregnancy tracking app — focused on creating calm, accessible experiences for expectant mothers with varying digital literacy levels.",
    problem: "Expectant mothers in tier-2 and tier-3 cities lacked accessible, trustworthy digital tools for pregnancy tracking. Existing apps were complex, English-only, and not designed for users with low digital literacy or unreliable internet connections.",
    painPoints: [
      "Complex medical terminology used without plain-language alternatives",
      "No offline support for users with intermittent connectivity",
      "Small touch targets and dense layouts difficult for users with physical discomfort",
    ],
    researchMethods: [
      { label: "Field Interviews",       desc: "Spoke with 10 expectant mothers and 3 ASHA workers in target demographic" },
      { label: "Digital Literacy Audit", desc: "Assessed smartphone proficiency across target user group" },
      { label: "Medical Review",         desc: "Partnered with doctor consultant to validate content accuracy and safety" },
      { label: "Accessibility Testing",  desc: "Tested with users across age and literacy levels with think-aloud protocol" },
    ],
    insights: [
      "Trust in the app came from visual association with government and medical authority",
      "Plain-language equivalents for medical terms were non-negotiable for the target demographic",
      "Weekly milestone summaries were more meaningful than daily data tracking",
    ],
    processSteps: [
      { num: "01", title: "Discover", desc: "Field interviews, digital literacy assessment, medical content review" },
      { num: "02", title: "Define",   desc: "Accessibility framework, content guidelines, offline-first architecture planning" },
      { num: "03", title: "Design",   desc: "Low-fidelity flows, FlutterFlow implementation, iterative accessibility testing" },
      { num: "04", title: "Deliver",  desc: "MSME certification documentation support, launch, post-launch monitoring" },
    ],
    screens: [
      { title: "Weekly Milestone View",  desc: "Visual week-by-week pregnancy journey with plain-language descriptions and baby size comparisons." },
      { title: "Symptom Tracker",        desc: "Large-touch-target input system for tracking symptoms with colour-coded severity indicators." },
      { title: "Appointment Reminders",  desc: "Simple calendar view with doctor appointment tracking and government-issued health checklist integration." },
    ],
    decisions: [
      { decision: "Weekly milestones over daily tracking", rationale: "Field interviews showed daily tracking created anxiety — weekly summaries felt celebratory and were better aligned with how users mentally tracked their pregnancy." },
      { decision: "Iconographic medical content over text-heavy cards", rationale: "Literacy variance in the target demographic meant visual communication had to carry meaning independently of text — every concept was designed icon-first." },
    ],
    outcomes: [
      { metric: "MSME", label: "Government certified and launched" },
      { metric: "1st",  label: "Shipped product — full cross-functional execution" },
      { metric: "100%", label: "Accessibility benchmarks met for target demographic" },
    ],
    learnings: {
      worked:  ["Field interviews fundamentally changed the design direction — remote research would have missed critical context", "Medical consultant partnership early prevented content errors that would have required full redesigns later"],
      improve: ["Would have pushed for a proper pilot launch with 50 users before full release", "FlutterFlow constraints limited some interaction patterns — would advocate for custom Flutter build earlier"],
    },
  },

  {
    slug: "design-system-zero",
    title: "Design System Zero",
    type: "UI Infrastructure",
    company: "Kodecopter",
    year: "2024",
    duration: "Ongoing",
    role: "Design Systems Lead",
    team: "1 Designer · Cross-functional team",
    tools: ["Figma", "Figma Tokens", "Storybook"],
    tags: ["Figma", "Tokens", "Guidelines"],
    accent: "#432DD7",
    accentDark: "#2e1fb5",
    desc: "A comprehensive internal design system built from scratch, ensuring perfect consistency across 4 different platforms and products.",
    overview: "Built a comprehensive design system from scratch to unify visual language and interaction patterns across 4 separate products — reducing design decision overhead and enabling faster, more consistent delivery across the entire team.",
    problem: "With 4 products being built simultaneously, the team was reinventing components on every project. No shared tokens, inconsistent spacing systems, and divergent component behaviour across platforms was creating debt and slowing velocity.",
    painPoints: [
      "Components duplicated across 4 products with slight but breaking inconsistencies",
      "No shared colour tokens — hex values hardcoded directly into component files",
      "New team members had no reference for spacing, typography, or interaction patterns",
    ],
    researchMethods: [
      { label: "Component Audit",      desc: "Catalogued all existing components across 4 products to find duplication and divergence" },
      { label: "Team Interviews",      desc: "Spoke with all 4 engineers to understand handoff pain points and token expectations" },
      { label: "Systems Benchmarking", desc: "Reviewed Material Design, Atlassian, and Carbon systems for governance models" },
      { label: "Usage Analysis",       desc: "Mapped component frequency and context of use across all 4 products" },
    ],
    insights: [
      "Tokens were the highest-leverage intervention — fixing them fixed 60% of inconsistencies",
      "Engineers needed component API documentation, not just visual specs",
      "Governance mattered as much as the system itself — adoption required process change",
    ],
    processSteps: [
      { num: "01", title: "Audit",    desc: "Full component inventory across all 4 products, duplication mapping" },
      { num: "02", title: "Tokens",   desc: "Colour, spacing, typography, and shadow token system design" },
      { num: "03", title: "Build",    desc: "Core component library in Figma with variants, states, and dark mode" },
      { num: "04", title: "Govern",   desc: "Contribution guidelines, versioning, Storybook integration, team training" },
    ],
    screens: [
      { title: "Token Architecture",   desc: "3-tier token system (global → semantic → component) with full dark mode support and platform-specific overrides." },
      { title: "Component Library",    desc: "Core component set with all states, variants, and responsive behaviour documented in Figma." },
      { title: "Documentation Portal", desc: "Usage guidelines, do/don't examples, and copy-paste code snippets for every component." },
    ],
    decisions: [
      { decision: "3-tier token architecture over flat token list", rationale: "Flat token lists become unmaintainable at scale. Separating global, semantic, and component tokens allows theming and platform overrides without breaking the foundation." },
      { decision: "Figma-first with Storybook parity over code-first", rationale: "Team velocity was in design — building the source of truth in Figma first allowed the system to be used immediately while engineering integration caught up." },
    ],
    outcomes: [
      { metric: "4",    label: "Products unified under one system" },
      { metric: "60%",  label: "Reduction in component inconsistencies after token adoption" },
      { metric: "100%", label: "New components now built against the system" },
    ],
    learnings: {
      worked:  ["Token-first approach meant visual consistency improvements were systemic, not manual", "Engineer interviews before building meant the handoff format was exactly what they needed"],
      improve: ["Would establish governance process before starting the build — adoption friction came from missing process, not missing components", "Versioning strategy needed more thought upfront"],
    },
  },

  {
    slug: "executive-dashboards",
    title: "Executive Dashboards",
    type: "Financial Intelligence",
    company: "Kodecopter / FIN AI",
    year: "2024",
    duration: "6 Weeks",
    role: "Product Designer",
    team: "1 Designer · 2 Engineers · 1 Data Analyst",
    tools: ["Figma", "FigJam", "Looker"],
    tags: ["Dashboards", "Analytics", "UX"],
    accent: "#D97706",
    accentDark: "#b45309",
    desc: "High-level financial summaries that allow executives to drill down into operational expenses with zero cognitive overhead.",
    overview: "Designed an executive financial intelligence dashboard that transforms raw financial data into decision-ready summaries — allowing C-suite users to monitor operational spending and drill into anomalies without requiring analyst mediation.",
    problem: "Executives were requesting weekly manual reports from analysts to understand operational expenses. The process took 3-4 hours of analyst time per report, and by the time data reached decision-makers it was already 48 hours stale.",
    painPoints: [
      "Financial data required analyst mediation to be interpretable by executives",
      "No anomaly detection — executives only learned about issues in retrospective reports",
      "Drill-down from summary to detail required switching between 3 separate tools",
    ],
    researchMethods: [
      { label: "Executive Shadowing",  desc: "Observed 4 executives during their weekly financial review process" },
      { label: "Analyst Interviews",   desc: "Mapped the full report generation workflow and identified automation opportunities" },
      { label: "Dashboard Audit",      desc: "Evaluated existing Looker dashboards against executive decision-making needs" },
      { label: "Card Sorting",         desc: "Determined which metrics belonged at summary level vs. drill-down level" },
    ],
    insights: [
      "Executives needed exception-based views — they only wanted to see what required attention",
      "Drill-down needed to feel like zooming in, not navigating away",
      "Context collapse was the biggest issue — summary metrics had no path to the underlying cause",
    ],
    processSteps: [
      { num: "01", title: "Discover", desc: "Executive shadowing, analyst workflow mapping, anomaly detection research" },
      { num: "02", title: "Define",   desc: "Metric hierarchy, drill-down architecture, exception logic framework" },
      { num: "03", title: "Design",   desc: "Summary view, contextual drill-down panels, anomaly flagging system" },
      { num: "04", title: "Deliver",  desc: "Figma specs, data binding annotations, analyst handoff for report migration" },
    ],
    screens: [
      { title: "Executive Summary View", desc: "Single-screen overview of key financial metrics with automated anomaly flagging and period-over-period variance." },
      { title: "Contextual Drill-Down",  desc: "Slide-in detail panel that expands summary metrics without full navigation — preserving executive context." },
      { title: "Anomaly Alert System",   desc: "Proactive deviation detection with threshold configuration and one-tap investigation flow." },
    ],
    decisions: [
      { decision: "Slide-in panel drill-down over page navigation", rationale: "Executives lose context when navigating to a new page — the slide-in pattern keeps the summary visible while exploring detail, matching the mental model of zooming in rather than switching views." },
      { decision: "Exception-first layout over complete data display", rationale: "Shadowing revealed executives skimmed dashboards looking for what was wrong — designing around exceptions reduced time-to-insight from minutes to seconds." },
    ],
    outcomes: [
      { metric: "3–4h", label: "Analyst reporting time eliminated per cycle" },
      { metric: "48h",  label: "Data staleness removed — now real-time" },
      { metric: "1",    label: "Unified tool replacing 3 separate systems" },
    ],
    learnings: {
      worked:  ["Executive shadowing was irreplaceable — no interview could have revealed the actual decision-making workflow", "Exception-first framing was validated immediately in first prototype review"],
      improve: ["Would involve data engineering earlier — some visualisations required architecture changes that delayed delivery", "Need a dedicated empty-state pass for dashboards — zero-data states were an afterthought"],
    },
  },

  {
    slug: "creator-suite",
    title: "Creator Suite",
    type: "Productivity",
    company: "Kodecopter",
    year: "2024",
    duration: "10 Weeks",
    role: "Product Designer",
    team: "1 Designer · 3 Engineers",
    tools: ["Figma", "FigJam", "Liveblocks"],
    tags: ["Web App", "Collaboration", "UI"],
    accent: "#16A34A",
    accentDark: "#15803d",
    desc: "A unified canvas combining writing, planning, and task management into a single multiplayer environment.",
    overview: "Designed a unified multiplayer canvas that brings writing, planning, and task management into a single shared environment — eliminating the context switching that fragments creative team workflows across multiple productivity tools.",
    problem: "Creative teams were operating across Notion, Linear, and Figma simultaneously — with no shared context between them. Work kickoffs happened in docs, became tasks in Linear, and referenced designs in Figma, with no single space where all three lived together.",
    painPoints: [
      "Context fragmentation across 3+ tools during a single project workflow",
      "No shared visibility between writers, planners, and designers in real time",
      "Multiplayer editing in existing tools was bolted-on, not designed-in",
    ],
    researchMethods: [
      { label: "Workflow Diary",        desc: "5 creative teams tracked their tool usage across a 2-week project sprint" },
      { label: "Context Switch Audit",  desc: "Counted tool transitions per hour of creative work — averaged 11 switches/hour" },
      { label: "Competitor Deep Dive",  desc: "Detailed UX teardown of Notion, Linear, Coda, and Craft for multiplayer patterns" },
      { label: "Jobs-to-be-Done",       desc: "Mapped the 5 core jobs creative teams needed one unified tool to perform" },
    ],
    insights: [
      "The problem wasn't features — it was spatial fragmentation of context",
      "Real-time collaboration failed when presence indicators were passive — teams needed active shared focus",
      "Task creation from within a document (not navigating away) was the most requested pattern",
    ],
    processSteps: [
      { num: "01", title: "Discover", desc: "Workflow diary research, context-switch audit, competitive teardowns" },
      { num: "02", title: "Define",   desc: "Core jobs mapping, canvas architecture, multiplayer interaction model" },
      { num: "03", title: "Design",   desc: "Canvas explorations, block system design, presence and collaboration UI" },
      { num: "04", title: "Deliver",  desc: "Component library, Liveblocks integration specs, interaction documentation" },
    ],
    screens: [
      { title: "Unified Canvas",         desc: "Block-based canvas where writing, task creation, and planning exist in the same spatial context." },
      { title: "Multiplayer Presence",   desc: "Real-time cursor presence with follow-mode and shared focus indicators designed to reduce coordination overhead." },
      { title: "Inline Task Creation",   desc: "Task creation directly from text — highlight, convert, assign — without navigating away from the writing context." },
    ],
    decisions: [
      { decision: "Block-based canvas over tab-based navigation", rationale: "Tab-based organisation recreates the fragmentation problem in miniature. A spatial canvas lets all content types coexist without artificial hierarchy." },
      { decision: "Follow-mode over passive cursor presence", rationale: "Passive cursors show where people are but don't help coordination. Follow-mode allows intentional shared focus — teams found it significantly reduced the need for screen-sharing calls in testing." },
    ],
    outcomes: [
      { metric: "11",   label: "Average tool switches per hour in current workflow (the problem)" },
      { metric: "0→1",  label: "Full product design from concept to prototype" },
      { metric: "3",    label: "Core tool categories unified into one canvas" },
    ],
    learnings: {
      worked:  ["Workflow diary research gave quantitative backing to a problem that was previously just qualitative frustration", "Block system architecture decisions made early gave engineering a stable foundation"],
      improve: ["Canvas interactions are significantly harder to prototype in Figma — would use Framer or ProtoPie for the final prototype round", "Multiplayer edge cases (merge conflicts, permission states) needed a full separate design pass"],
    },
  },

  {
    slug: "neobrutalist-portfolio",
    title: "NeoBrutal Portfolio",
    type: "Web Experience",
    company: "Personal",
    year: "2025",
    duration: "4 Weeks",
    role: "Designer & Developer",
    team: "Solo",
    tools: ["Astro", "Figma", "Three.js"],
    tags: ["Astro", "Vanilla CSS", "Motion"],
    accent: "#FDC800",
    accentDark: "#c49a00",
    desc: "This highly interactive, performance-focused personal site utilising brutalist typography and modern CSS grid interactions.",
    overview: "Designed and built this portfolio from scratch — using Astro for performance, Three.js for a scroll-driven 3D background, and a strict Neobrutalism design system to create a distinctive, memorable experience that stands out from template-based portfolios.",
    problem: "Most designer portfolios either use off-the-shelf templates (indistinguishable from each other) or prioritise visual novelty over usability. The challenge was creating something genuinely distinctive while still communicating clearly and loading fast.",
    painPoints: [
      "Template portfolios fail to demonstrate actual design thinking and craft",
      "Visually experimental sites often sacrifice performance and accessibility",
      "Personal sites become stale quickly when content updates require code changes",
    ],
    researchMethods: [
      { label: "Portfolio Audit",       desc: "Reviewed 30+ designer portfolios to identify common patterns and differentiation opportunities" },
      { label: "Recruiter Interviews",  desc: "Spoke with 3 hiring managers about what they look for in a design portfolio in under 60 seconds" },
      { label: "Design System Research",desc: "Deep-dived into Neobrutalism principles and their application in web interfaces" },
      { label: "Performance Benchmarks",desc: "Set Lighthouse score targets before building — performance was a design constraint, not an afterthought" },
    ],
    insights: [
      "Recruiters scan portfolios in 20–30 seconds before deciding to read further — hierarchy and scannability matter more than detail",
      "A portfolio's design IS the work sample — every decision is being evaluated",
      "Three.js backgrounds are common but rarely purposeful — the scroll-driven narrative was the differentiator",
    ],
    processSteps: [
      { num: "01", title: "Research", desc: "Portfolio audit, recruiter interviews, performance constraints definition" },
      { num: "02", title: "Design",   desc: "Design system creation, layout explorations, Three.js scene planning" },
      { num: "03", title: "Build",    desc: "Astro implementation, Three.js integration, animation system, scroll reveal" },
      { num: "04", title: "Refine",   desc: "Performance optimisation, accessibility review, content finalisation" },
    ],
    screens: [
      { title: "Hero Section",          desc: "Two-column split with crossfade portrait, role tags, and stat strip — all above the fold." },
      { title: "Case Study Grid",       desc: "9-card project grid with browser-chrome mockup windows and type-led design." },
      { title: "Three.js Background",   desc: "Scroll-driven 3D scene where camera travels through 6 geometry groups corresponding to each section." },
    ],
    decisions: [
      { decision: "Neobrutalism design system over minimal/Swiss design", rationale: "Recruiter interviews showed memorable portfolios got callbacks — Neobrutalism's hard shadows, bold type, and zero border-radius created instant visual distinctiveness without compromising readability." },
      { decision: "Scroll-driven 3D narrative over static background", rationale: "A static Three.js canvas is decoration. Tying the camera's Z-axis travel to page sections makes the background purposeful — it reinforces the scroll narrative rather than competing with it." },
    ],
    outcomes: [
      { metric: "100%", label: "Designed and built solo" },
      { metric: "6",    label: "Three.js scene groups tied to page sections" },
      { metric: "0",    label: "Third-party UI component dependencies" },
    ],
    learnings: {
      worked:  ["Setting performance as a design constraint from day one prevented late-stage compromises", "Building the design system before any components saved significant refactor time"],
      improve: ["Three.js geometry palette should align more closely with the design system accent colours", "Content update workflow needs improvement — editing copy still requires code changes"],
    },
  },
  {
    slug: "famconnect",
    title: "FamConnect",
    type: "Community Super App",
    company: "Kodecopter",
    year: "2024",
    duration: "14 Weeks",
    role: "Product Designer",
    team: "1 Designer · 4 Engineers · 1 PM",
    tools: ["Figma", "FigJam", "Maze"],
    tags: ["Mobile", "Community", "Social"],
    accent: "#432DD7",
    accentDark: "#2e1fb5",
    desc: "A unified community platform connecting families, housing societies, schools, and colleges — letting people manage relationships, share updates, and organise events across all their communities in one place.",
    overview: "Designed a super app that unifies fragmented community communication — family networks, housing societies, and institutional alumni — into a single platform. Users can manage family relationships, coordinate housing society matters, and stay connected with school and college alumni, all without switching between WhatsApp groups, Facebook pages, or scattered contact lists.",
    problem: "People belong to multiple communities simultaneously — family, housing society, school alumni, college batch — but manage each through a different combination of WhatsApp groups, Facebook pages, phone contacts, and email threads. There was no single trusted space where all communities could coexist with appropriate privacy, access control, and event management.",
    painPoints: [
      "Family event invitations sent across multiple platforms with no unified RSVP tracking",
      "Housing society communication scattered across WhatsApp groups with no admin accountability",
      "School and college alumni had no verified, institution-exclusive network — open Facebook groups mixed alumni with strangers",
    ],
    researchMethods: [
      { label: "User Interviews",       desc: "12 sessions across family admins, housing society secretaries, and alumni coordinators" },
      { label: "Competitive Audit",     desc: "Deep UX teardown of WhatsApp, Nextdoor, Facebook Groups, and NearMe for community patterns" },
      { label: "Survey",                desc: "48-response survey on communication fragmentation pain across community types" },
      { label: "Card Sorting",          desc: "Mapped how users mentally group community types and expected access boundaries" },
    ],
    insights: [
      "Users distinguish sharply between communities — family content should never appear in housing society feeds",
      "Alumni trust in a network depends entirely on verified institutional membership — open access kills credibility",
      "Event invitation and RSVP was the most requested unified feature across all community types",
    ],
    processSteps: [
      { num: "01", title: "Discover", desc: "Multi-community user interviews, competitive audit, communication pattern mapping" },
      { num: "02", title: "Define",   desc: "User personas per community type, IA for multi-community structure, role and permission hierarchy" },
      { num: "03", title: "Design",   desc: "Community hub flows, family tree manager, alumni verification system, event invitation flow" },
      { num: "04", title: "Deliver",  desc: "Annotated Figma handoff, prototype, component library, and edge case documentation" },
    ],
    screens: [
      { title: "Community Hub",        desc: "Unified home feed with contextual switching between Family, Housing, and Alumni communities — each with its own visual identity and access boundary." },
      { title: "Family Manager",       desc: "Family tree view with relationship tagging, member invitations, and a dedicated event board for functions, celebrations, and gatherings." },
      { title: "Alumni Network",       desc: "Institution-verified member directory accessible only to verified alumni — current students excluded. Batch-based organisation with event board for reunions and drives." },
    ],
    decisions: [
      { decision: "Unified feed with community context tags over separate app sections per community", rationale: "Research showed users in 3+ communities felt burdened by navigation — a unified feed with clear community labels reduced switching friction while maintaining content separation." },
      { decision: "Alumni-only access with institutional verification — no current students",          rationale: "Card sorting revealed alumni place high value on exclusivity. Including current students degraded perceived trust and authenticity of the network. Verification became the core trust signal." },
    ],
    outcomes: [
      { metric: "4",    label: "Community types unified in one platform" },
      { metric: "0→1",  label: "Full product design from research to prototype" },
      { metric: "100%", label: "Role-based access — no cross-community data leakage" },
    ],
    learnings: {
      worked:  ["Multi-persona research upfront prevented designing a one-size-fits-all feed that would have served no community well", "Alumni verification as the trust anchor was validated in the very first prototype session"],
      improve: ["Would have mapped notification architecture earlier — multi-community apps have complex notification logic that affected several design decisions late in the process", "Housing society admin flows needed a dedicated design sprint — they were underserved in the first version"],
    },
  },

  {
    slug: "ops-360",
    title: "Ops 360",
    type: "College Operations Platform",
    company: "Kodecopter",
    year: "2024",
    duration: "12 Weeks",
    role: "Product Designer",
    team: "1 Designer · 3 Engineers · 1 PM",
    tools: ["Figma", "FigJam", "Maze"],
    tags: ["EdTech", "Operations", "B2B"],
    accent: "#16A34A",
    accentDark: "#15803d",
    desc: "An end-to-end college operations platform covering admissions management, staff scheduling, and a student-facing meeting booking system for doubt clearing and management interactions.",
    overview: "Designed a unified operations platform for colleges that brings together admissions tracking, staff availability management, and student meeting scheduling into a single system. Students can book doubt-clearing sessions with faculty and request meetings with management — eliminating the chaos of walk-ins, phone calls, and disconnected email threads.",
    problem: "College operations were fragmented across manual processes — admissions handled through paper forms and phone follow-ups, doubt-clearing sessions booked informally through WhatsApp or physical notice boards, and management meetings requested through intermediaries with no visibility into availability or status. Staff had no unified view of their schedules, and students had no way to know if their requests were acknowledged.",
    painPoints: [
      "Students had no way to book or track meeting requests with staff or management — everything was walk-in or informal messaging",
      "Admissions process had zero status visibility for applicants, leading to repeated follow-up calls to the admin office",
      "Staff schedules were managed individually with no shared view — double-bookings and missed sessions were common",
    ],
    researchMethods: [
      { label: "Stakeholder Interviews",  desc: "Separate sessions with students, teaching staff, admin staff, and management — 14 interviews total" },
      { label: "Process Shadowing",       desc: "Observed existing admissions workflow and walk-in doubt session management end-to-end" },
      { label: "Competitive Audit",       desc: "Reviewed college ERP systems and scheduling tools for role-based availability patterns" },
      { label: "Usability Testing",       desc: "3 rounds of Maze tests on the booking flow with student participants" },
    ],
    insights: [
      "Students didn't want to feel like they were bothering staff — a structured booking system removed the social friction of asking for time",
      "Management needed visibility into meeting request volume and type to allocate time efficiently — not just a calendar",
      "Admissions applicants' anxiety spiked at the silence between submission and response — a status tracker was more valuable than faster processing",
    ],
    processSteps: [
      { num: "01", title: "Discover", desc: "Multi-role interviews, process shadowing, pain mapping across student, staff, and management perspectives" },
      { num: "02", title: "Define",   desc: "Role hierarchy mapping, user flows per persona, availability and booking logic architecture" },
      { num: "03", title: "Design",   desc: "Admissions tracker, staff availability calendar, student booking flow, management dashboard" },
      { num: "04", title: "Deliver",  desc: "Annotated Figma specs, Maze prototype, edge case documentation, handoff with engineer pairing" },
    ],
    screens: [
      { title: "Student Booking Portal",    desc: "Clean booking interface where students select a staff member, view real-time availability, and book doubt-clearing or management sessions with a reason and optional message." },
      { title: "Staff Schedule Dashboard",  desc: "Unified calendar view for faculty showing all booked sessions, pending requests, and their availability windows — with one-tap confirm or reschedule." },
      { title: "Admissions Tracker",        desc: "Status-driven admissions pipeline for applicants showing exactly where their application stands — submitted, under review, document required, or accepted." },
    ],
    decisions: [
      { decision: "Reason-required booking over open scheduling", rationale: "Testing showed staff were more likely to accept and prepare for sessions when students provided a reason upfront. It also reduced frivolous bookings and helped management prioritise request types." },
      { decision: "Status-first admissions view over document checklist", rationale: "Research revealed applicants' primary anxiety was not knowing where they stood — not knowing what to submit next. A clear status indicator addressed this before the checklist did." },
    ],
    outcomes: [
      { metric: "3",    label: "User roles served — student, staff, management" },
      { metric: "0→1",  label: "End-to-end design from research to handoff" },
      { metric: "100%", label: "College operations unified in one platform" },
    ],
    learnings: {
      worked:  ["Separate interviews per role prevented designing a single flow that would have frustrated all three user types", "Reason-required booking was initially resisted by the team but validated immediately in usability testing"],
      improve: ["Would have pushed for a notification system design pass earlier — booking confirmations and reminders were added late and felt bolted-on", "Management dashboard needed more time — it was the last designed and the least tested"],
    },
  },

  {
    slug: "staffezee",
    title: "Staffezee",
    type: "B2B SaaS / IT Staffing",
    company: "Kodecopter",
    year: "2024",
    duration: "16 Weeks",
    role: "Designer · PM · Dev Contributor",
    team: "1 Designer-PM · 3 Engineers",
    tools: ["Figma", "FigJam", "React.js"],
    tags: ["SaaS", "B2B", "UK Market"],
    accent: "#432DD7",
    accentDark: "#2e1fb5",
    desc: "A bench sales management platform built for UK IT staffing agencies — streamlining consultant tracking, submission pipelines, interview scheduling, and placement management in one unified workspace.",
    overview: "Designed, product-managed, and contributed to the development of Staffezee — a bench sales management SaaS built specifically for the UK IT staffing industry. The platform replaces fragmented spreadsheets and generic CRMs with a purpose-built workspace that handles the full bench sales lifecycle: from consultant availability tracking through submission, interview, and placement.",
    problem: "UK IT staffing agencies were running their bench sales operations across a patchwork of spreadsheets, generic CRMs, and email threads — none of which were designed for the specific workflows of bench sales. Recruiters had no unified view of consultant availability, submission status, and interview pipelines, leading to duplicate submissions, missed follow-ups, and zero visibility into placement conversion across the team.",
    painPoints: [
      "No single view of bench — consultants, their skills, visa status, and availability were tracked across multiple spreadsheets per recruiter",
      "Duplicate submissions — multiple recruiters unknowingly submitting the same consultant to the same requirement with no deduplication safeguard",
      "Interview and follow-up tracking done through email reminders with no structured pipeline — feedback and next steps were routinely lost",
    ],
    researchMethods: [
      { label: "Recruiter Interviews",    desc: "8 sessions with bench sales recruiters and team leads at UK IT staffing agencies" },
      { label: "Workflow Shadowing",      desc: "Observed a full bench sales day — from morning hotlist preparation to end-of-day submission tracking" },
      { label: "Tool Audit",              desc: "Mapped existing spreadsheet structures and CRM configurations to understand current mental models" },
      { label: "Competitive Analysis",    desc: "Evaluated Bullhorn, Vincere, and JobDiva for gaps specific to bench sales workflows in the UK market" },
    ],
    insights: [
      "Bench sales recruiters think in terms of consultant status, not job pipeline — the product needed to be consultant-first, not requirement-first",
      "Deduplication was the single most requested feature — duplicate submissions damage agency reputation with clients and waste relationship capital",
      "UK-specific compliance fields (Right to Work, IR35 status, visa type) were non-negotiable and absent from most generic tools",
    ],
    processSteps: [
      { num: "01", title: "Discover", desc: "Recruiter interviews, workflow shadowing, tool audit, UK compliance requirement mapping" },
      { num: "02", title: "Define",   desc: "Bench sales lifecycle mapping, data model design, role hierarchy for team lead vs recruiter views" },
      { num: "03", title: "Design",   desc: "Consultant hub, submission pipeline, interview tracker, hotlist builder — Figma to interactive prototype" },
      { num: "04", title: "Build",    desc: "PM and dev contribution alongside engineering — feature prioritisation, sprint planning, QA, and launch" },
    ],
    screens: [
      { title: "Consultant Hub",        desc: "Central view of all bench consultants with status tags (Available, Submitted, Interviewing, Placed), availability dates, skills, visa type, and IR35 classification — filterable and searchable." },
      { title: "Submission Pipeline",   desc: "Kanban-style pipeline tracking each consultant's submissions from sent → acknowledged → interview → offer → placed, with duplicate detection flagging conflicts in real time." },
      { title: "Hotlist Builder",       desc: "Curated consultant shortlist tool for generating client-ready availability emails — select consultants, preview the formatted output, and send directly from the platform." },
    ],
    decisions: [
      { decision: "Consultant-first data model over requirement-first", rationale: "Shadowing sessions revealed bench recruiters' mental model starts with 'who do I have available?' not 'what jobs are open?'. Structuring the product around consultant status rather than job pipeline matched their natural workflow and reduced cognitive overhead." },
      { decision: "Real-time duplicate submission detection over post-hoc reporting", rationale: "Duplicate submissions damage client relationships and were the most common complaint in recruiter interviews. Flagging conflicts at submission time — before the email is sent — was the only intervention that actually prevented the problem rather than just documenting it." },
    ],
    outcomes: [
      { metric: "UK",   label: "IT staffing market — live product with real agency users" },
      { metric: "3×",   label: "Roles held — Designer, PM, and Dev contributor" },
      { metric: "0→1",  label: "Full product from concept to shipped SaaS" },
    ],
    learnings: {
      worked:  ["Workflow shadowing was the highest-leverage research activity — one day of observation revealed workflow details that 8 interviews hadn't surfaced", "Wearing the PM hat alongside design gave me direct control over scope and prevented feature creep that had derailed earlier sprints"],
      improve: ["Would separate design and PM responsibilities earlier as the product scaled — context switching between roadmap decisions and interaction design slowed both down", "UK compliance fields (IR35, Right to Work) needed a dedicated legal/domain expert review pass — requirements changed mid-build when edge cases emerged"],
    },
  },

  {
    slug: "pharmavault",
    title: "PharmaVault",
    type: "Health Tech",
    company: "Placeholder — To Be Updated",
    year: "2024",
    duration: "Placeholder",
    role: "Product Designer",
    team: "Placeholder",
    tools: ["Figma", "FigJam"],
    tags: ["Pharma", "Healthcare", "B2B"],
    accent: "#D97706",
    accentDark: "#b45309",
    desc: "A pharmaceutical management platform designed to streamline inventory, prescription tracking, and compliance workflows for pharmacies and healthcare organisations.",
    overview: "Placeholder — case study content to be updated with real project details.",
    problem: "Placeholder — describe the core pharmaceutical management problem this product was built to solve.",
    painPoints: [
      "Placeholder — key pain point 01",
      "Placeholder — key pain point 02",
      "Placeholder — key pain point 03",
    ],
    researchMethods: [
      { label: "Contextual Inquiry",    desc: "Placeholder — describe research method and scope" },
      { label: "Expert Interviews",     desc: "Placeholder — describe research method and scope" },
      { label: "Regulatory Review",     desc: "Placeholder — describe research method and scope" },
      { label: "Usability Testing",     desc: "Placeholder — describe research method and scope" },
    ],
    insights: [
      "Placeholder — key insight from research 01",
      "Placeholder — key insight from research 02",
      "Placeholder — key insight from research 03",
    ],
    processSteps: [
      { num: "01", title: "Discover", desc: "Placeholder — discovery phase activities" },
      { num: "02", title: "Define",   desc: "Placeholder — define phase activities" },
      { num: "03", title: "Design",   desc: "Placeholder — design phase activities" },
      { num: "04", title: "Deliver",  desc: "Placeholder — delivery phase activities" },
    ],
    screens: [
      { title: "Placeholder Screen 01", desc: "Placeholder — describe this key screen and what design decision it represents." },
      { title: "Placeholder Screen 02", desc: "Placeholder — describe this key screen and what design decision it represents." },
      { title: "Placeholder Screen 03", desc: "Placeholder — describe this key screen and what design decision it represents." },
    ],
    decisions: [
      { decision: "Placeholder — design decision 01", rationale: "Placeholder — explain the rationale behind this decision and what research or testing informed it." },
      { decision: "Placeholder — design decision 02", rationale: "Placeholder — explain the rationale behind this decision and what research or testing informed it." },
    ],
    outcomes: [
      { metric: "TBD", label: "Placeholder outcome metric 01" },
      { metric: "TBD", label: "Placeholder outcome metric 02" },
      { metric: "TBD", label: "Placeholder outcome metric 03" },
    ],
    learnings: {
      worked:  ["Placeholder — what worked well on this project", "Placeholder — second learning from the project"],
      improve: ["Placeholder — what you would do differently", "Placeholder — second area for improvement"],
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}
