export interface Project {
  id: string;
  number: string;
  title: string;
  type: string;
  tech: string[];
  liveUrl: string;
  image: string;
  positioning: string;
  description: string;
  highlights: string[];
}

export interface Capability {
  number: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
}

export interface TechItem {
  name: string;
  category: 'FRONTEND' | 'BACKEND' | 'DATA' | 'AI' | 'CLOUD' | 'WORKFLOW';
  role: string;
}

export interface ProcessStage {
  step: string;
  title: string;
  description: string;
  metric: string;
  detail: string;
}

export const brand = {
  name: "ARULFORGE",
  wordmark: "ARULFORGE",
  founder: "Arul S.",
  tagline: "Ideas enter. Digital experiences are forged.",
  corePositioning: "WE FORGE DIGITAL EXPERIENCES THAT MAKE BRANDS IMPOSSIBLE TO IGNORE.",
  supportingCopy: "Strategy, design and development — forged into high-performance websites built to turn attention into action.",
  instagramShort: "From Instagram presence to digital presence.",
  founderCredit: "Founded & forged by Arul S.",
  founderBio: "Developer and digital builder behind ArulForge — combining software engineering, UI/UX thinking and creative development to build distinctive web experiences.",
  location: "TAMIL NADU, INDIA",
  availability: "AVAILABLE WORLDWIDE",
  established: "2026",
  status: "ALL SYSTEMS OPERATIONAL",
};

export const socialLinks = {
  instagram: "https://instagram.com/arulforge",
  instagramHandle: "@arulforge",
  github: "https://github.com/arul4902",
  linkedin: "https://linkedin.com/",
  whatsappDirect: "https://wa.me/?text=Hi%20ArulForge%2C%20I%20have%20a%20project%20in%20mind",
  email: "contact@arulforge.com",
};

export const projects: Project[] = [
  {
    id: "mock-interview-coach",
    number: "01",
    title: "AI MOCK INTERVIEW COACH",
    type: "AI WEB APPLICATION",
    tech: ["React", "REST APIs", "OpenAI GPT"],
    liveUrl: "https://ai-mock-interview-coach.vercel.app/",
    image: "/projects/mock_interview_1.jpg",
    positioning: "Real-time AI voice & text simulation with structured performance diagnostics.",
    description: "An intelligent assessment platform that simulates high-stakes behavioral and technical interviews, delivering automated rubrics and actionable feedback loops.",
    highlights: ["OpenAI GPT prompt engineering", "Adaptive question pipeline", "Real-time response scoring"]
  },
  {
    id: "hvac-services",
    number: "02",
    title: "HVAC SERVICES",
    type: "BUSINESS WEBSITE",
    tech: ["Next.js", "Tailwind CSS"],
    liveUrl: "https://hvac-website-rho.vercel.app/",
    image: "/projects/hvac_1.jpg",
    positioning: "Service-business website focused on professional presentation and customer enquiries.",
    description: "High-performance digital storefront engineered for a commercial climate solutions firm, transforming local search traffic into pre-qualified quote requests.",
    highlights: ["Emergency service dispatch CTA", "Instant quote estimator", "Local SEO architecture"]
  },
  {
    id: "plumbing-services",
    number: "03",
    title: "PLUMBING SERVICES",
    type: "BUSINESS WEBSITE",
    tech: ["Next.js", "Tailwind CSS", "JavaScript"],
    liveUrl: "https://plumbing-website-mauve.vercel.app/",
    image: "/projects/plumbing_1.jpg",
    positioning: "Frictionless service-booking interface built around urgent customer intent.",
    description: "Built for instant credibility during emergency plumbing needs, featuring high-speed mobile loading, one-tap calling, and verified service credentials.",
    highlights: ["One-tap dispatch trigger", "Rapid mobile page speed", "Transparent pricing presentation"]
  },
  {
    id: "summit-roofing",
    number: "04",
    title: "SUMMIT ROOFING SOLUTIONS",
    type: "BUSINESS WEBSITE",
    tech: ["Next.js", "Tailwind CSS"],
    liveUrl: "https://roofing-website-delta.vercel.app/",
    image: "/projects/roofing_1.jpg",
    positioning: "Industrial contracting website showcasing commercial craftsmanship and trust-driven lead capture.",
    description: "Structured presentation for residential and commercial roofing installations, featuring high-resolution craftsmanship showcases and instant inspection booking.",
    highlights: ["Material warranty explorer", "Commercial project gallery", "Direct inspection booking flow"]
  },
  {
    id: "the-black-trendz",
    number: "05",
    title: "THE BLACK TRENDZ",
    type: "WEB EXPERIENCE",
    tech: ["React", "JavaScript", "Tailwind CSS"],
    liveUrl: "https://black-trendz.vercel.app/",
    image: "/projects/black_trendz_1.jpg",
    positioning: "High-contrast streetwear and apparel showcase highlighting brand attitude and visual rhythm.",
    description: "A dark, editorial e-commerce showcase featuring micro-interactions, bold visual hierarchy, and tactile product previews engineered for apparel drops.",
    highlights: ["Drop-based collection UI", "Tactile hover interactions", "High-contrast typography"]
  },
  {
    id: "basil-town",
    number: "06",
    title: "BASIL TOWN",
    type: "WEB PROJECT",
    tech: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://basil-town.vercel.app/",
    image: "/projects/basil_town_1.jpg",
    positioning: "Culinary and hospitality brand presentation emphasizing culinary storytelling and ambiance.",
    description: "A sensory-driven digital presence for an artisanal dining establishment, integrating interactive menu curation, reservation hooks, and spatial warmth.",
    highlights: ["Atmospheric photography layout", "Interactive menu curation", "Seamless table reservations"]
  }
];

export const capabilities: Capability[] = [
  {
    number: "01",
    title: "BUSINESS WEBSITES",
    tagline: "Digital storefronts built to turn visitors into enquiries.",
    description: "Fast, authoritative company websites that establish market credibility, convey specialized value, and guide serious prospects directly toward quotation and booking.",
    tags: ["High Conversion", "SEO Groundwork", "Local & Global Markets", "Lead Pipelines"]
  },
  {
    number: "02",
    title: "PREMIUM LANDING PAGES",
    tagline: "Focused experiences designed around one clear action.",
    description: "Zero-distraction conversion machines tailored for product launches, ad campaigns, creator offerings, and specific commercial initiatives.",
    tags: ["Campaign ROI", "Direct Response", "A/B Readiness", "Sub-second LCP"]
  },
  {
    number: "03",
    title: "CREATIVE WEB EXPERIENCES",
    tagline: "Interaction, motion and storytelling that make brands memorable.",
    description: "Custom digital stages featuring fluid scroll interactions, kinetic typography, and bespoke interactive moments that cement brand recall in competitive industries.",
    tags: ["Kinetic Typography", "Spatial Interaction", "Custom Shaders", "Brand Distinctiveness"]
  },
  {
    number: "04",
    title: "FULL-STACK APPLICATIONS",
    tagline: "Frontend, backend, APIs and data working as one product.",
    description: "Robust software architecture coupling resilient backends (Spring Boot, Node, REST) with responsive, stateful web frontends that scale under load.",
    tags: ["RESTful APIs", "Relational Schemas", "Auth & State", "Performance Tuning"]
  },
  {
    number: "05",
    title: "AI-POWERED EXPERIENCES",
    tagline: "Smart functionality integrated into useful digital products.",
    description: "Intelligent features using large language models, dynamic conversational agents, algorithmic data pipelines, and custom prompt orchestration.",
    tags: ["LLM Orchestration", "Dynamic Responses", "Context Ingestion", "AI Workflows"]
  }
];

export const forgeStack: TechItem[] = [
  // FRONTEND
  { name: "React", category: "FRONTEND", role: "Component Architecture" },
  { name: "Next.js", category: "FRONTEND", role: "SSR & Static Pipelines" },
  { name: "TypeScript", category: "FRONTEND", role: "Type-Safe Runtime" },
  { name: "Tailwind CSS", category: "FRONTEND", role: "Design Token Systems" },
  { name: "Angular", category: "FRONTEND", role: "Enterprise Client Systems" },
  { name: "JavaScript", category: "FRONTEND", role: "Core Web Standard" },
  { name: "HTML", category: "FRONTEND", role: "Semantic Structure" },
  { name: "CSS", category: "FRONTEND", role: "Spatial Layouts" },

  // BACKEND
  { name: "Java", category: "BACKEND", role: "Enterprise Computing" },
  { name: "Spring Boot", category: "BACKEND", role: "Production REST Services" },
  { name: "REST APIs", category: "BACKEND", role: "Contract Interoperability" },

  // DATA
  { name: "MySQL", category: "DATA", role: "Relational Persistence" },

  // AI
  { name: "GPT API Integration", category: "AI", role: "Model Orchestration" },
  { name: "Prompt Engineering", category: "AI", role: "Context Optimization" },
  { name: "AI-assisted Development", category: "AI", role: "Rapid Prototyping" },

  // CLOUD / DEPLOYMENT
  { name: "AWS", category: "CLOUD", role: "Cloud Infrastructure" },
  { name: "Vercel", category: "CLOUD", role: "Edge Global Delivery" },
  { name: "GitHub", category: "CLOUD", role: "CI/CD & Source Sync" },

  // WORKFLOW
  { name: "Git", category: "WORKFLOW", role: "Version Control" },
  { name: "Postman", category: "WORKFLOW", role: "API Verification" },
  { name: "VS Code", category: "WORKFLOW", role: "Studio Dev Environment" },
  { name: "IntelliJ IDEA", category: "WORKFLOW", role: "Backend IDE" },
];

export const processStages: ProcessStage[] = [
  {
    step: "01",
    title: "ANALYZE",
    description: "Understand the business, audience, goal and visual direction.",
    metric: "PHASE 01 // SCOPING",
    detail: "Deconstruct your audience's discovery habits, competitive benchmarks, and critical conversion triggers."
  },
  {
    step: "02",
    title: "FORGE",
    description: "Turn strategy into interface, interaction and code.",
    metric: "PHASE 02 // ASSEMBLY",
    detail: "Craft high-fidelity layouts, custom motion physics, and clean, modular component structures."
  },
  {
    step: "03",
    title: "REFINE",
    description: "Polish responsiveness, performance, details and conversion paths.",
    metric: "PHASE 03 // HARDENING",
    detail: "Rigorous testing across screen resolutions, optimizing Core Web Vitals, and removing all points of user friction."
  },
  {
    step: "04",
    title: "DEPLOY",
    description: "Ship a fast, production-ready experience to the web.",
    metric: "PHASE 04 // LIVE",
    detail: "Pushing to edge CDN infrastructure with SSL, domain routing, and analytics verification."
  }
];

export const principles = [
  {
    id: "01",
    title: "BUILT AROUND YOUR BRAND",
    subtitle: "No copy-paste template identity.",
    description: "Every layout, animation, and typography decision is forged to match your unique brand authority, not a repurposed theme."
  },
  {
    id: "02",
    title: "MOBILE FIRST",
    subtitle: "Designed for where most customers actually discover businesses.",
    description: "Over 75% of your Instagram or social audience visits from mobile devices. We engineer thumb-friendly, instant-loading handheld experiences."
  },
  {
    id: "03",
    title: "ENGINEERED, NOT JUST DECORATED",
    subtitle: "Strong development underneath the visual experience.",
    description: "Sensible software engineering beneath the surface: type safety, clean semantics, fast TTFB, and zero bloat."
  },
  {
    id: "04",
    title: "BUILT TO CONVERT",
    subtitle: "Clear pathways from visitor → interest → enquiry.",
    description: "We don't build art projects for our own portfolio; we build digital assets that prompt visitors to send a message, book a call, or buy."
  }
];
