export interface AuraProfile {
  identity: {
    fullName: string;
    preferredName: string;
    pronunciation: string;
    location: string;
    title: string;
    currentRole: string;
  };
  education: {
    degree: string;
    institution: string;
    graduationYear: number;
  };
  professionalIdentities: string[];
  industries: string[];
  summary: string;
  positioning: string;
  principles: string[];
  strengths: string[];
  focusAreas: string[];
  services: string[];
  process: string[];
  skills: {
    design: string[];
    collaboration: string[];
    development: string[];
  };
  experience: Array<{
    company: string;
    period: string;
    role: string;
    publicSummary: string;
  }>;
  availability: {
    status: string;
    interests: string[];
    targetRoles: string[];
    preferredEnvironment: string[];
  };
  contact: {
    email: string;
    linkedIn: string;
  };
  customAnswers: Array<{
    topics: string[];
    answer: string;
    section?: string;
  }>;
  answerBoundaries: string[];
}

/**
 * AURA'S PUBLIC PERSONAL KNOWLEDGE
 *
 * Edit this file whenever your role, availability, skills, positioning, or
 * biography changes. Everything here is shipped to the visitor's browser, so
 * never add confidential project details, private phone numbers, credentials,
 * client secrets, compensation, or information you do not want made public.
 */
export const auraProfile: AuraProfile = {
  identity: {
    fullName: 'Akshayan Mohandass',
    preferredName: 'Akshayan',
    pronunciation: 'Ak-shay-an',
    location: 'India',
    title: 'Product and UX Designer',
    currentRole: 'UX Designer and GTM Strategist at Mondee Tech Pvt Ltd',
  },
  education: {
    degree: 'B.Tech in Artificial Intelligence and Data Science',
    institution: 'Sri Shanmugha Institute of Engineering and Technology',
    graduationYear: 2025,
  },
  professionalIdentities: ['Product Designer', 'UX Designer', 'UI/UX Designer', 'Associate Product Manager', 'Product Strategy', 'GTM Strategy'],
  industries: ['Corporate travel', 'Healthcare', 'Pharmacy operations', 'Education technology', 'Staffing SaaS', 'Mental wellness', 'Experiential technology', 'AI-powered products'],
  summary: 'Akshayan Mohandass is a Product and UX Designer with a background in Artificial Intelligence and Data Science. His work combines user experience, product thinking, technology, and business strategy across SaaS, travel technology, healthcare, pharmacy operations, education, experiential technology, and AI-driven products.',
  positioning: 'He goes beyond interface design, working across problem discovery, UX strategy, product thinking, visual design, prototyping, positioning, and go-to-market storytelling to turn complex ideas into clear and usable products.',
  principles: [
    "I don't start with screens. I start with structure.",
    'Understand who makes decisions, what they need to complete, and where friction exists before designing the interface.',
    'Design intelligence and decision clarity, not merely additional screens.',
  ],
  strengths: [
    'Turning ambiguous product logic into clear workflows',
    'Designing AI-native and enterprise product experiences',
    'Mapping roles, decisions, constraints, and failure points',
    'Connecting product language, interaction behavior, and content',
    'Designing with implementation constraints in mind',
    'Connecting user experience, business value, and technical feasibility',
    'Product positioning, GTM communication, and product storytelling',
  ],
  focusAreas: [
    'AI-native product design',
    'Enterprise UX',
    'Complex operational workflows',
    'UX architecture',
    'Content systems',
    'Design systems',
    'Product strategy and positioning',
    'GTM strategy and product storytelling',
  ],
  services: [
    'Product design',
    'UX architecture',
    'AI UX design',
    'User research',
    'Interaction design',
    'Prototyping',
    'Design systems',
    'Implementation-aware design collaboration',
  ],
  process: [
    'Clarify the people, roles, business objective, constraints, and decisions in the system.',
    'Research the workflow and identify friction, failure points, and evidence.',
    'Model the information architecture, product logic, and end-to-end flow.',
    'Prototype and test the highest-risk assumptions and interactions.',
    'Refine the visual and content system with implementation constraints in view.',
    'Collaborate through delivery and use feedback to improve the product.',
  ],
  skills: {
    design: ['Figma', 'Adobe Illustrator', 'Adobe Photoshop', 'Adobe XD', 'Miro', 'UX Design', 'UI Design', 'Product Design', 'Interaction Design', 'Wireframing', 'Prototyping', 'User Flows', 'Information Architecture', 'Design Systems', 'Responsive Design', 'Visual Design', 'UX Strategy'],
    collaboration: ['Jira', 'Asana', 'Product Thinking', 'Product Strategy', 'Feature Prioritization', 'Product Requirements', 'Competitive Analysis', 'Market Research', 'Product Positioning', 'Product Documentation', 'Cross-functional Collaboration', 'GTM Strategy', 'Brand Strategy', 'Product Storytelling'],
    development: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Astro', 'Tailwind CSS', 'Node.js', 'Electron', 'Flutter', 'SQLite', 'MySQL', 'Three.js', 'Git', 'GitHub', 'n8n', 'Google Cloud', 'Prompt Engineering', 'AI Product Thinking', 'AI Agent Concepts', 'AI-assisted Workflows'],
  },
  experience: [
    {
      company: 'Mondee Tech Pvt Ltd', period: 'November 2025 - 2026', role: 'UX Designer and GTM Strategist',
      publicSummary: 'Works on a confidential NDA-protected enterprise product. Only his role and employment may be acknowledged; product details and internal responsibilities or deliverables cannot be discussed.',
    },
    {
      company: 'Kodecopter', period: 'September 2024 - January 2026', role: 'UI/UX Designer Intern, then UI/UX Trainee, then UX Designer and Junior Product Manager',
      publicSummary: 'Worked across UX and UI design, product planning, requirements, user flows, design systems, documentation, developer coordination, competitive analysis, and product strategy.',
    },
    {
      company: 'Aakam 360 5(I) Pvt Ltd', period: 'October 2023 - September 2024', role: 'UI/UX Designer Intern',
      publicSummary: 'Supported end-to-end flows and frontend implementation for PregTrack, a government-approved pregnancy health product brought from concept to launch.',
    },
    {
      company: 'Bloom Majestic', period: '2022 - 2023', role: 'UI/UX Designer',
      publicSummary: 'Designed calm, emotionally safe mobile experiences for Inniyal, a mental-wellness product.',
    },
  ],
  availability: {
    status: 'Open to relevant product design, UX, UI/UX, associate product management, and junior product management opportunities.',
    interests: ['Product design', 'Product strategy', 'Product management', 'Technology', 'Business thinking', 'AI-native products', 'Complex product systems'],
    targetRoles: ['Product Designer', 'UX Designer', 'UI/UX Designer', 'Associate Product Manager', 'Junior Product Manager'],
    preferredEnvironment: ['Strong leadership', 'Product-focused culture', 'Learning opportunities', 'Career growth', 'Clear management', 'Healthy work-life balance', 'Cross-functional collaboration', 'Ownership opportunities'],
  },
  contact: {
    email: 'akshayanmohandass@gmail.com',
    linkedIn: 'https://www.linkedin.com/in/akshayan-mohandass-',
  },
  // Add new entries here to teach AURA exact answers to common questions.
  // `topics` should contain short phrases visitors are likely to use.
  customAnswers: [
    {
      topics: ['education', 'degree', 'college', 'university', 'artificial intelligence and data science', 'graduated'],
      answer: 'Akshayan completed a B.Tech in Artificial Intelligence and Data Science at Sri Shanmugha Institute of Engineering and Technology in 2025. That background gives him technical context for AI-oriented products, although his professional strength is translating technology into useful product experiences rather than working as an ML researcher.',
      section: 'about',
    },
    {
      topics: ['industries', 'domains', 'sectors', 'industry experience'],
      answer: 'Akshayan has worked across corporate travel, healthcare, pharmacy operations, education technology, staffing SaaS, mental wellness, experiential technology, and AI-powered product contexts.',
      section: 'experience',
    },
    {
      topics: ['what tools', 'design tools', 'tools does he use', 'software does he use'],
      answer: 'Akshayan\'s design toolkit includes Figma, Adobe Illustrator, Photoshop, Adobe XD, and Miro. He uses Jira and Asana for product work, Git and GitHub for development collaboration, and has also worked with n8n, Google Cloud, and AI development tools.',
      section: 'skills',
    },
    {
      topics: ['understand ai', 'ai background', 'ai experience', 'artificial intelligence experience'],
      answer: 'Akshayan has a B.Tech background in Artificial Intelligence and Data Science and experience in AI-oriented product contexts. His strength is translating technical capabilities into understandable product and UX experiences, not positioning himself as an ML researcher. Some recent AI product work is NDA-protected, so AURA will not infer or reveal its internal details.',
      section: 'skills',
    },
    {
      topics: ['only ui', 'just ui', 'ui designer only', 'designer or product manager'],
      answer: 'Akshayan\'s strongest foundation is UX and Product Design, but his work increasingly overlaps with product management and strategy. He has contributed to product planning, requirements, competitive research, positioning, stakeholder communication, and GTM work, so he is best described as a product-focused designer moving toward broader product ownership.',
      section: 'about',
    },
    {
      topics: ['handle feedback', 'respond to feedback', 'design feedback', 'criticism'],
      answer: 'Akshayan treats feedback as evidence to understand, not an instruction to accept blindly. He looks for the underlying usability issue, business requirement, communication problem, or technical constraint, then weighs subjective feedback against product goals, user needs, design principles, evidence, feasibility, and business priorities.',
      section: 'philosophy',
    },
    {
      topics: ['design philosophy', 'philosophy about design', 'good design', 'visual philosophy'],
      answer: 'Akshayan believes design should simplify complexity. He prefers experiences that are clear, intentional, minimal, modern, premium, structured, and easy to understand; every visual element should have a reason to exist, and the result must balance usability, scalability, technical realism, and business goals.',
      section: 'philosophy',
    },
    {
      topics: ['product thinking', 'product philosophy', 'business value', 'technical feasibility'],
      answer: 'Akshayan views a product as the intersection of user experience, business value, and technical feasibility. Before supporting a feature, he asks why it should exist, who needs it, what problem it solves, how people handle that problem today, what competitors do, whether it is feasible, and how it supports the broader product and business.',
      section: 'philosophy',
    },
    {
      topics: ['brand philosophy', 'branding approach', 'logo approach', 'visual identity'],
      answer: 'Akshayan prefers brands built around a defendable idea rather than decoration. He studies the company, intended feeling, category conventions, competitors, and overused visual territory, then looks for a minimal, distinctive concept that remains recognizable at small sizes and can scale into a wider design system.',
      section: 'philosophy',
    },
    {
      topics: ['career direction', 'long term goal', 'future direction', 'career goal'],
      answer: 'Akshayan is growing toward roles that combine product design, product strategy, product management, technology, and business thinking. The goal is not to leave design, but to use design as part of a broader product-thinking skill set and take on greater product ownership.',
      section: 'contact',
    },
    {
      topics: ['what makes akshayan different', 'differentiator', 'traditional ui designer', 'different from other designers'],
      answer: 'Akshayan works across a broader portion of the product lifecycle than a traditional interface-only role. Alongside UX and UI, he has experience with product requirements, competitive research, positioning, brand systems, GTM communication, storytelling, business communication, and technical constraints—letting him consider user experience, business value, and feasibility together.',
      section: 'about',
    },
    {
      topics: ['preferred company', 'company culture', 'work environment', 'kind of company'],
      answer: 'Akshayan values strong leadership, clear management, learning and career growth, healthy work-life balance, a product-focused culture, cross-functional collaboration, and meaningful ownership opportunities.',
      section: 'contact',
    },
    {
      topics: ['pharmavault', 'pharma vault'],
      answer: 'PharmaVault is an offline-first desktop pharmacy POS and inventory-management concept focused on billing, stock, vendors, purchase invoices, OCR-assisted invoice entry, batch and expiry tracking, alerts, returns, reports, barcodes, backups, and profit-and-loss visibility. Its technical context includes Electron, SQLite, Drizzle ORM, optional Python OCR, and Google Drive backup. AURA does not claim unpublished outcomes or metrics.',
      section: 'projects',
    },
    {
      topics: ['pregtrack', 'preg track'],
      answer: 'PregTrack is a pregnancy-tracking mobile application designed to support expecting mothers with week-by-week guidance, baby-growth information, a pregnancy calendar, due-date tracking, hospital information, exercise and food recommendations, and multilingual support. Akshayan contributed UX design, mobile UI, wireframing, prototyping, user flows, and information organization.',
      section: 'projects',
    },
    {
      topics: ['fees and admission', 'admission management', 'fee management'],
      answer: 'The Fees and Admission Management System is an education-technology product for student admission and fee-collection workflows, including fee terms, additional charges, payments, receipt and PDF generation, payment history, and administrative workflows. Its published platform context is Flutter, Node.js, and MySQL.',
      section: 'projects',
    },
    {
      topics: ['partypose', 'party pose', 'riflesso'],
      answer: 'PartyPose, also referenced as Riflesso, is an interactive AR mirror and photography experience exploring how augmented digital interactions can work inside physical event environments.',
      section: 'projects',
    },
    {
      topics: ['wegeni'],
      answer: 'Wegeni is a company website Akshayan designed and delivered as a freelance engagement. The verified knowledge base does not publish deeper project details or outcomes.',
      section: 'projects',
    },
    {
      topics: ['work style', 'collaboration style', 'work with developers', 'work with engineers'],
      answer: 'Akshayan works across product logic, UX, content, and implementation constraints. His technical literacy helps him communicate decisions clearly with engineers and keep designs grounded in what can be delivered.',
      section: 'about',
    },
    {
      topics: ['ideal role', 'looking for next', 'next role'],
      answer: 'Akshayan is best suited to product design roles involving AI-native experiences, enterprise systems, operational complexity, or meaningful design-to-build collaboration.',
      section: 'contact',
    },
  ],
  answerBoundaries: [
    'Use only facts in this public profile and the published project knowledge.',
    'Never invent metrics, education, compensation, client details, or personal information.',
    'Clearly identify confidential or unpublished project information as unavailable.',
    'Distinguish Akshayan\'s individual contribution from team work.',
  ],
};
