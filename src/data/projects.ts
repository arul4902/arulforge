export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  structureType: string;
  structureArchetype: string;
  category: string;
  tech: string[];
  liveUrl: string;
  image: string;
  positioning: string;
  description: string;
  hologramSpecs: string[];
}

export const projects: ProjectItem[] = [
  {
    id: "mock-interview-coach",
    number: "01",
    title: "AI MOCK INTERVIEW COACH",
    structureType: "FUTURISTIC CENTRAL DATA STRUCTURE",
    structureArchetype: "CORE DATA SPIRE",
    category: "AI WEB APPLICATION",
    tech: ["React", "REST APIs", "OpenAI GPT"],
    liveUrl: "https://ai-mock-interview-coach.vercel.app/",
    image: "/projects/mock_interview_1.jpg",
    positioning: "Real-time AI voice & text simulation with structured performance diagnostics.",
    description: "An intelligent assessment platform that simulates high-stakes behavioral and technical interviews, delivering automated rubrics and actionable feedback loops.",
    hologramSpecs: ["GPT Model Pipeline", "Dynamic Audio Feedback", "Real-Time Rubric Matrix"]
  },
  {
    id: "hvac-services",
    number: "02",
    title: "HVAC SERVICES",
    structureType: "ARCHITECTURAL TOWER",
    structureArchetype: "VENTILATION PYLON",
    category: "BUSINESS WEBSITE",
    tech: ["Next.js", "Tailwind CSS"],
    liveUrl: "https://hvac-website-rho.vercel.app/",
    image: "/projects/hvac_1.jpg",
    positioning: "Service-business website focused on professional presentation and customer enquiries.",
    description: "High-performance digital storefront engineered for a commercial climate solutions firm, transforming local search traffic into pre-qualified quote requests.",
    hologramSpecs: ["Emergency Dispatch CTA", "Instant Quote Estimator", "Local SEO Groundwork"]
  },
  {
    id: "plumbing-services",
    number: "03",
    title: "PLUMBING SERVICES",
    structureType: "HORIZONTAL INDUSTRIAL STRUCTURE",
    structureArchetype: "FLUID CONDUIT COMPLEX",
    category: "BUSINESS WEBSITE",
    tech: ["Next.js", "Tailwind CSS", "JavaScript"],
    liveUrl: "https://plumbing-website-mauve.vercel.app/",
    image: "/projects/plumbing_1.jpg",
    positioning: "Frictionless service-booking interface built around urgent customer intent.",
    description: "Built for instant credibility during emergency plumbing needs, featuring high-speed mobile loading, one-tap calling, and verified service credentials.",
    hologramSpecs: ["Instant Dial Trigger", "Mobile Performance Core", "Transparent Pricing Tiers"]
  },
  {
    id: "summit-roofing",
    number: "04",
    title: "SUMMIT ROOFING SOLUTIONS",
    structureType: "ANGULAR MONOLITH",
    structureArchetype: "TRIANGULATED ROOF CANOPY",
    category: "BUSINESS WEBSITE",
    tech: ["Next.js", "Tailwind CSS"],
    liveUrl: "https://roofing-website-delta.vercel.app/",
    image: "/projects/roofing_1.jpg",
    positioning: "Industrial contracting website showcasing commercial craftsmanship and trust-driven lead capture.",
    description: "Structured presentation for residential and commercial roofing installations, featuring high-resolution craftsmanship showcases and instant inspection booking.",
    hologramSpecs: ["Warranty Verification", "Project Portfolio Engine", "Direct Inspection Workflow"]
  },
  {
    id: "the-black-trendz",
    number: "05",
    title: "THE BLACK TRENDZ",
    structureType: "FASHION / EDITORIAL STRUCTURE",
    structureArchetype: "MONOCHROME PAVILION",
    category: "WEB EXPERIENCE",
    tech: ["React", "JavaScript", "Tailwind CSS"],
    liveUrl: "https://black-trendz.vercel.app/",
    image: "/projects/black_trendz_1.jpg",
    positioning: "High-contrast streetwear and apparel showcase highlighting brand attitude and visual rhythm.",
    description: "A dark, editorial e-commerce showcase featuring micro-interactions, bold visual hierarchy, and tactile product previews engineered for apparel drops.",
    hologramSpecs: ["Drop-Based Release System", "Tactile Micro-Interactions", "Monochrome Grid Engine"]
  },
  {
    id: "basil-town",
    number: "06",
    title: "BASIL TOWN",
    structureType: "CULINARY & HOSPITALITY STRUCTURE",
    structureArchetype: "ATRIUM RESTAURANT PAVILION",
    category: "WEB PROJECT",
    tech: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://basil-town.vercel.app/",
    image: "/projects/basil_town_1.jpg",
    positioning: "Culinary and hospitality brand presentation emphasizing culinary storytelling and ambiance.",
    description: "A sensory-driven digital presence for an artisanal dining establishment, integrating interactive menu curation, reservation hooks, and spatial warmth.",
    hologramSpecs: ["Artisanal Menu Navigator", "Direct Table Reservation", "Warm Ambient Storytelling"]
  }
];
