export interface CapabilityLayer {
  number: string;
  title: string;
  tagline: string;
  description: string;
  layerSpec: string;
  blueprintAnnotations: string[];
}

export const capabilities: CapabilityLayer[] = [
  {
    number: "01",
    title: "BUSINESS WEBSITES",
    tagline: "Digital storefronts designed to turn visitors into enquiries.",
    description: "Fast, authoritative company websites that establish market credibility, convey specialized value, and guide serious prospects directly toward quotation and booking.",
    layerSpec: "LAYER_01 // COMMERCIAL COMMERCE & SERVICES",
    blueprintAnnotations: ["Conversion Funnels", "Local & Global SEO", "Lead Pipe Routing", "Sub-second LCP"]
  },
  {
    number: "02",
    title: "PREMIUM LANDING PAGES",
    tagline: "Focused experiences built around one clear action.",
    description: "Zero-distraction conversion machines tailored for product launches, ad campaigns, creator offerings, and specific commercial initiatives.",
    layerSpec: "LAYER_02 // HIGH-IMPACT DIRECT RESPONSE",
    blueprintAnnotations: ["Single-Action Focus", "Campaign Acceleration", "A/B Readiness", "Instant Visual Hook"]
  },
  {
    number: "03",
    title: "CREATIVE WEB EXPERIENCES",
    tagline: "Motion, interaction and storytelling designed to make brands memorable.",
    description: "Custom digital stages featuring fluid scroll interactions, kinetic typography, and bespoke interactive moments that cement brand recall in competitive industries.",
    layerSpec: "LAYER_03 // SPATIAL & KINETIC CRAFT",
    blueprintAnnotations: ["Holographic Shaders", "Scroll Choreography", "Kinetic Typography", "Immersive Physics"]
  },
  {
    number: "04",
    title: "FULL-STACK APPLICATIONS",
    tagline: "Frontend, backend, APIs and data engineered as one product.",
    description: "Robust software architecture coupling resilient backends (Spring Boot, Node, REST) with responsive, stateful web frontends that scale under load.",
    layerSpec: "LAYER_04 // RESILIENT SOFTWARE PIPELINE",
    blueprintAnnotations: ["Type-Safe Contracts", "Relational Persistence", "State Orchestration", "Microservices"]
  },
  {
    number: "05",
    title: "AI-POWERED EXPERIENCES",
    tagline: "Intelligent functionality integrated into useful digital products.",
    description: "Intelligent features using large language models, dynamic conversational agents, algorithmic data pipelines, and custom prompt orchestration.",
    layerSpec: "LAYER_05 // ADAPTIVE NEURAL ENGINES",
    blueprintAnnotations: ["LLM Integration", "Automated Rubrics", "Context Injection", "Voice / Chat Agents"]
  }
];
