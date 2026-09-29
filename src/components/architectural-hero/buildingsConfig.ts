export interface PhysicalBuildingDef {
  id: string;
  name: string;
  subLabel: string;
  district: 'frontend' | 'bridge' | 'backend' | 'data' | 'ai' | 'deploy' | 'tools';
  categoryLabel: string;
  position: [number, number, number];
  width: number;
  depth: number;
  floors: number;
  floorHeight: number;
  isSpire?: boolean;
  // Exact timeline window for physical construction (in progress % 0-100)
  constructStart: number;
  constructEnd: number;
  floorLabels: string[];
}

export const PHYSICAL_BUILDINGS: PhysicalBuildingDef[] = [
  // ==========================================
  // FRONTEND DISTRICT (20% – 45%)
  // ==========================================
  // 1. HTML (Structure)
  {
    id: 'html',
    name: 'HTML',
    subLabel: 'STRUCTURE',
    district: 'frontend',
    categoryLabel: 'FRONTEND // STRUCTURE',
    position: [-5.6, 0, 2.6],
    width: 1.1,
    depth: 1.1,
    floors: 2,
    floorHeight: 0.42,
    constructStart: 20,
    constructEnd: 26,
    floorLabels: ['STRUCTURE', 'HTML5'],
  },
  // 2. CSS (Visual System)
  {
    id: 'css',
    name: 'CSS',
    subLabel: 'VISUAL SYSTEM',
    district: 'frontend',
    categoryLabel: 'FRONTEND // STYLING',
    position: [-4.0, 0, 2.8],
    width: 1.2,
    depth: 1.2,
    floors: 3,
    floorHeight: 0.44,
    constructStart: 22,
    constructEnd: 28,
    floorLabels: ['LAYOUT', 'ANIMATION', 'CSS3'],
  },
  // 3. JAVASCRIPT (Interaction)
  {
    id: 'javascript',
    name: 'JAVASCRIPT',
    subLabel: 'INTERACTION',
    district: 'frontend',
    categoryLabel: 'FRONTEND // INTERACTION',
    position: [-5.8, 0, 1.0],
    width: 1.3,
    depth: 1.3,
    floors: 4,
    floorHeight: 0.48,
    constructStart: 24,
    constructEnd: 31,
    floorLabels: ['EVENT LOOP', 'DOM', 'ASYNC', 'ES6+'],
  },
  // 4. TYPESCRIPT (Typed Systems)
  {
    id: 'typescript',
    name: 'TYPESCRIPT',
    subLabel: 'TYPED SYSTEMS',
    district: 'frontend',
    categoryLabel: 'FRONTEND // TYPE SAFETY',
    position: [-3.8, 0, 1.1],
    width: 1.4,
    depth: 1.4,
    floors: 4,
    floorHeight: 0.52,
    constructStart: 27,
    constructEnd: 34,
    floorLabels: ['INTERFACES', 'GENERICS', 'TYPE GUARD', 'TYPESCRIPT'],
  },
  // 5. REACT (Component Core) - Major Tower
  {
    id: 'react',
    name: 'REACT',
    subLabel: 'COMPONENT CORE',
    district: 'frontend',
    categoryLabel: 'FRONTEND // CORE ENGINE',
    position: [-5.2, 0, -0.9],
    width: 1.7,
    depth: 1.7,
    floors: 5,
    floorHeight: 0.6,
    isSpire: true,
    constructStart: 30,
    constructEnd: 38,
    floorLabels: ['VDOM', 'HOOKS', 'STATE', 'CONTEXT', 'REACT 19'],
  },
  // 6. NEXT.JS (Hybrid Framework) - Premium Tower
  {
    id: 'nextjs',
    name: 'NEXT.JS',
    subLabel: 'HYBRID FRAMEWORK',
    district: 'frontend',
    categoryLabel: 'FRONTEND // FULLSTACK SSR',
    position: [-3.2, 0, -1.0],
    width: 1.5,
    depth: 1.5,
    floors: 5,
    floorHeight: 0.58,
    constructStart: 33,
    constructEnd: 41,
    floorLabels: ['SSR', 'ISR', 'ROUTING', 'API ROUTES', 'NEXT.JS'],
  },
  // 7. ANGULAR (Enterprise SPA)
  {
    id: 'angular',
    name: 'ANGULAR',
    subLabel: 'ENTERPRISE SPA',
    district: 'frontend',
    categoryLabel: 'FRONTEND // ENTERPRISE',
    position: [-6.0, 0, -2.7],
    width: 1.4,
    depth: 1.4,
    floors: 4,
    floorHeight: 0.52,
    constructStart: 36,
    constructEnd: 43,
    floorLabels: ['MODULES', 'RXJS', 'SERVICES', 'ANGULAR'],
  },
  // 8. TAILWIND CSS (Utility Styling) - Wide Pavilion
  {
    id: 'tailwind',
    name: 'TAILWIND CSS',
    subLabel: 'UTILITY STYLING',
    district: 'frontend',
    categoryLabel: 'FRONTEND // DESIGN TOKENS',
    position: [-3.5, 0, -2.8],
    width: 2.0,
    depth: 1.2,
    floors: 2,
    floorHeight: 0.4,
    constructStart: 38,
    constructEnd: 45,
    floorLabels: ['DESIGN SYSTEM', 'TAILWIND CSS'],
  },

  // ==========================================
  // INTERCHANGE BRIDGE (41% – 49%)
  // ==========================================
  // 9. REST API (Bridge connecting Frontend -> Backend)
  {
    id: 'restapi',
    name: 'REST API',
    subLabel: 'SYSTEM INTERCHANGE',
    district: 'bridge',
    categoryLabel: 'SYSTEM INTERCHANGE // GATEWAY',
    position: [0.0, 0, 0.4],
    width: 2.4,
    depth: 1.2,
    floors: 3,
    floorHeight: 0.46,
    constructStart: 41,
    constructEnd: 49,
    floorLabels: ['ENDPOINTS', 'JSON PROTOCOL', 'REST GATEWAY'],
  },

  // ==========================================
  // BACKEND & DATA DISTRICT (42% – 54%)
  // ==========================================
  // 10. JAVA (Enterprise Core) - Heavy Monolith
  {
    id: 'java',
    name: 'JAVA',
    subLabel: 'ENTERPRISE CORE',
    district: 'backend',
    categoryLabel: 'BACKEND // ENTERPRISE CORE',
    position: [3.5, 0, -1.0],
    width: 1.8,
    depth: 1.8,
    floors: 5,
    floorHeight: 0.62,
    constructStart: 42,
    constructEnd: 50,
    floorLabels: ['JVM', 'OOP', 'MULTITHREAD', 'JAVA 21', 'ENTERPRISE'],
  },
  // 11. SPRING BOOT (Microservices Engine)
  {
    id: 'springboot',
    name: 'SPRING BOOT',
    subLabel: 'MICROSERVICES',
    district: 'backend',
    categoryLabel: 'BACKEND // MICROSERVICES',
    position: [5.4, 0, -0.8],
    width: 1.6,
    depth: 1.6,
    floors: 5,
    floorHeight: 0.58,
    constructStart: 44,
    constructEnd: 52,
    floorLabels: ['SPRING MVC', 'SECURITY', 'SPRING DATA', 'ACTUATOR', 'MICROSERVICES'],
  },
  // 12. MYSQL (Relational Vault)
  {
    id: 'mysql',
    name: 'MYSQL',
    subLabel: 'RELATIONAL VAULT',
    district: 'data',
    categoryLabel: 'DATA CORE // PERSISTENCE',
    position: [4.5, 0, 1.2],
    width: 1.7,
    depth: 1.7,
    floors: 4,
    floorHeight: 0.5,
    constructStart: 47,
    constructEnd: 54,
    floorLabels: ['SCHEMA', 'INDEXING', 'ACID LOGIC', 'MYSQL'],
  },

  // ==========================================
  // AI DISTRICT (50% – 59%)
  // ==========================================
  // 13. GPT API (Distinctive Tall AI Spire Tower)
  {
    id: 'gptapi',
    name: 'GPT API',
    subLabel: 'FOUNDATION MODELS',
    district: 'ai',
    categoryLabel: 'AI DISTRICT // INTELLIGENCE',
    position: [0.0, 0, -2.6],
    width: 1.6,
    depth: 1.6,
    floors: 7,
    floorHeight: 0.65,
    isSpire: true,
    constructStart: 50,
    constructEnd: 57,
    floorLabels: [
      'TOKENIZER',
      'EMBEDDINGS',
      'SYSTEM PROMPT',
      'FUNCTION CALL',
      'GPT-4o',
      'REASONING',
      'AI CORE',
    ],
  },
  // 14. PROMPT ENGINEERING
  {
    id: 'prompteng',
    name: 'PROMPT ENG',
    subLabel: 'CONTEXT DESIGN',
    district: 'ai',
    categoryLabel: 'AI DISTRICT // CONTEXT DESIGN',
    position: [-1.7, 0, -2.2],
    width: 1.2,
    depth: 1.2,
    floors: 3,
    floorHeight: 0.46,
    constructStart: 52,
    constructEnd: 58,
    floorLabels: ['FEW-SHOT', 'COT', 'PROMPT ENG'],
  },
  // 15. AI ASSISTED DEVELOPMENT
  {
    id: 'aidev',
    name: 'AI ASSISTED',
    subLabel: 'INTELLIGENT WORKFLOW',
    district: 'ai',
    categoryLabel: 'AI DISTRICT // WORKFLOW',
    position: [1.7, 0, -2.2],
    width: 1.2,
    depth: 1.2,
    floors: 3,
    floorHeight: 0.46,
    constructStart: 53,
    constructEnd: 59,
    floorLabels: ['CODEGEN', 'AUTOMATION', 'AI DEV'],
  },

  // ==========================================
  // DEPLOYMENT HUB (55% – 62%)
  // ==========================================
  // 16. GITHUB (Version Control & CI/CD)
  {
    id: 'github',
    name: 'GITHUB',
    subLabel: 'VERSION REPO',
    district: 'deploy',
    categoryLabel: 'DEPLOYMENT // VERSION REPO',
    position: [3.2, 0, 3.0],
    width: 1.3,
    depth: 1.3,
    floors: 3,
    floorHeight: 0.45,
    constructStart: 55,
    constructEnd: 60,
    floorLabels: ['GIT WORKFLOW', 'ACTIONS CI/CD', 'GITHUB'],
  },
  // 17. VERCEL (Edge Platform)
  {
    id: 'vercel',
    name: 'VERCEL',
    subLabel: 'EDGE PLATFORM',
    district: 'deploy',
    categoryLabel: 'DEPLOYMENT // EDGE PLATFORM',
    position: [5.0, 0, 3.2],
    width: 1.4,
    depth: 1.4,
    floors: 3,
    floorHeight: 0.48,
    constructStart: 56,
    constructEnd: 61,
    floorLabels: ['EDGE NETWORK', 'SERVERLESS', 'VERCEL'],
  },
  // 18. AWS (Cloud Infrastructure)
  {
    id: 'aws',
    name: 'AWS',
    subLabel: 'CLOUD INFRASTRUCTURE',
    district: 'deploy',
    categoryLabel: 'DEPLOYMENT // CLOUD INFRA',
    position: [5.5, 0, 1.6],
    width: 1.5,
    depth: 1.5,
    floors: 4,
    floorHeight: 0.52,
    constructStart: 57,
    constructEnd: 62,
    floorLabels: ['S3 STORAGE', 'EC2 COMPUTE', 'LAMBDA', 'AWS CLOUD'],
  },
];
