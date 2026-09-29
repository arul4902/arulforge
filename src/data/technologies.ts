export interface TechNode {
  id: string;
  name: string;
  cluster: 'FRONTEND' | 'BACKEND' | 'DATA' | 'AI' | 'CLOUD' | 'WORKFLOW';
  role: string;
  connectedTo: string[];
  xPos: number; // 0-100 percentage in constellation
  yPos: number; // 0-100 percentage in constellation
}

export const technologyNodes: TechNode[] = [
  // FRONTEND CLUSTER
  { id: 'react', name: 'React', cluster: 'FRONTEND', role: 'Component Framework', connectedTo: ['nextjs', 'typescript', 'tailwind'], xPos: 24, yPos: 32 },
  { id: 'nextjs', name: 'Next.js', cluster: 'FRONTEND', role: 'SSR & Static Architecture', connectedTo: ['react', 'vercel', 'typescript'], xPos: 36, yPos: 20 },
  { id: 'typescript', name: 'TypeScript', cluster: 'FRONTEND', role: 'Type Integrity', connectedTo: ['react', 'nextjs', 'angular', 'rest'], xPos: 32, yPos: 46 },
  { id: 'tailwind', name: 'Tailwind CSS', cluster: 'FRONTEND', role: 'Design Tokens & UI', connectedTo: ['react', 'nextjs', 'css'], xPos: 14, yPos: 40 },
  { id: 'angular', name: 'Angular', cluster: 'FRONTEND', role: 'Structured Client Platform', connectedTo: ['typescript', 'rest'], xPos: 18, yPos: 60 },
  { id: 'javascript', name: 'JavaScript', cluster: 'FRONTEND', role: 'Core Web Engine', connectedTo: ['typescript', 'html', 'css'], xPos: 26, yPos: 68 },
  { id: 'html', name: 'HTML5', cluster: 'FRONTEND', role: 'Semantic Foundation', connectedTo: ['javascript', 'css'], xPos: 12, yPos: 74 },
  { id: 'css', name: 'CSS3 / Motion', cluster: 'FRONTEND', role: 'Spatial Stylings', connectedTo: ['tailwind', 'html'], xPos: 22, yPos: 84 },

  // BACKEND CLUSTER
  { id: 'java', name: 'Java', cluster: 'BACKEND', role: 'Enterprise Computing', connectedTo: ['springboot', 'intellij'], xPos: 62, yPos: 28 },
  { id: 'springboot', name: 'Spring Boot', cluster: 'BACKEND', role: 'Production REST Microservices', connectedTo: ['java', 'rest', 'mysql', 'aws'], xPos: 72, yPos: 38 },
  { id: 'rest', name: 'REST APIs', cluster: 'BACKEND', role: 'Contract Interoperability', connectedTo: ['springboot', 'postman', 'react', 'nextjs'], xPos: 54, yPos: 48 },

  // DATA CLUSTER
  { id: 'mysql', name: 'MySQL', cluster: 'DATA', role: 'Relational Schema & ACID', connectedTo: ['springboot', 'aws'], xPos: 84, yPos: 50 },

  // AI CLUSTER
  { id: 'gpt', name: 'GPT API Integration', cluster: 'AI', role: 'Model Orchestration', connectedTo: ['prompt', 'ai-assist', 'nextjs'], xPos: 48, yPos: 18 },
  { id: 'prompt', name: 'Prompt Engineering', cluster: 'AI', role: 'Context Optimization', connectedTo: ['gpt', 'ai-assist'], xPos: 58, yPos: 12 },
  { id: 'ai-assist', name: 'AI-assisted Development', cluster: 'AI', role: 'Rapid Prototyping', connectedTo: ['gpt', 'vscode'], xPos: 42, yPos: 34 },

  // CLOUD & DEPLOYMENT CLUSTER
  { id: 'vercel', name: 'Vercel', cluster: 'CLOUD', role: 'Global Edge Runtime', connectedTo: ['nextjs', 'github'], xPos: 50, yPos: 68 },
  { id: 'aws', name: 'AWS', cluster: 'CLOUD', role: 'Cloud Infrastructure', connectedTo: ['springboot', 'mysql'], xPos: 76, yPos: 66 },
  { id: 'github', name: 'GitHub', cluster: 'CLOUD', role: 'CI/CD & Source Sync', connectedTo: ['git', 'vercel'], xPos: 64, yPos: 76 },

  // WORKFLOW CLUSTER
  { id: 'git', name: 'Git', cluster: 'WORKFLOW', role: 'Distributed Version Control', connectedTo: ['github', 'vscode'], xPos: 72, yPos: 88 },
  { id: 'postman', name: 'Postman', cluster: 'WORKFLOW', role: 'API Contract Testing', connectedTo: ['rest'], xPos: 44, yPos: 86 },
  { id: 'vscode', name: 'VS Code', cluster: 'WORKFLOW', role: 'Primary Development Suite', connectedTo: ['git', 'typescript'], xPos: 34, yPos: 92 },
  { id: 'intellij', name: 'IntelliJ IDEA', cluster: 'WORKFLOW', role: 'Backend IDE Suite', connectedTo: ['java', 'springboot'], xPos: 88, yPos: 32 },
];
