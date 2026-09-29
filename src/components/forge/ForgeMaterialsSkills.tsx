import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface MaterialItem {
  id: string;
  name: string;
  discipline: string;
  description: string;
  physicalBehavior: string;
  specs: string[];
}

const materials: MaterialItem[] = [
  {
    id: 'structure',
    name: 'STRUCTURE',
    discipline: 'FRONTEND ARCHITECTURE',
    description:
      'Rigid structural scaffolding engineered for resilient rendering, semantic HTML, and deterministic layout integrity.',
    physicalBehavior: 'Rigid blueprint grid with zero tolerance deviation.',
    specs: ['React', 'Angular', 'TypeScript', 'Semantic DOM'],
  },
  {
    id: 'systems',
    name: 'SYSTEMS',
    discipline: 'BACKEND & SERVICES',
    description:
      'High-throughput data pipelines and transactional endpoints built for concurrency, resilience, and microservice scale.',
    physicalBehavior: 'Interconnected conduits carrying live data currents.',
    specs: ['Java', 'Spring Boot', 'REST APIs', 'MySQL'],
  },
  {
    id: 'behaviour',
    name: 'BEHAVIOUR',
    discipline: 'MOTION & INTERACTION',
    description:
      'Kinetic response algorithms giving digital surfaces physical weight, spring tension, and tactile feedback.',
    physicalBehavior: 'Elastic damping and responsive velocity inertia.',
    specs: ['GSAP', 'Lenis', 'Physics Lerp', 'Interactive RAF'],
  },
  {
    id: 'form',
    name: 'FORM',
    discipline: 'DESIGN & ERGONOMICS',
    description:
      'Flexible geometric surfaces, optical balance, and intentional contrast crafted for visual hierarchy and clarity.',
    physicalBehavior: 'Deformable geometry adapting to viewport pressure.',
    specs: ['Fluid Clamp', 'Oversized Typography', 'Color Theory'],
  },
  {
    id: 'delivery',
    name: 'DELIVERY',
    discipline: 'INFRASTRUCTURE & SCALE',
    description:
      'Automated deployment pipelines and cloud orchestration ensuring continuous uptime and low-latency delivery.',
    physicalBehavior: 'Coordinate telemetry snapping into production lock.',
    specs: ['AWS EC2', 'AWS S3', 'Git / GitHub', 'Postman'],
  },
];

export const ForgeMaterialsSkills: React.FC = () => {
  const [activeMaterial, setActiveMaterial] = useState<string>('structure');
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="skills"
      className="py-24 sm:py-36 px-5 sm:px-8 md:px-16 relative bg-[#0A0A0C] border-t border-[#D7E2EA]/10 select-none"
      aria-label="Forge Raw Materials & Capabilities"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-16 sm:mb-24">
          <span className="font-mono text-xs sm:text-sm tracking-[0.35em] text-[#00F0FF] uppercase block mb-3">
            // FORGE RAW MATERIALS
          </span>
          <h2 className="font-kanit font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-white">
            MATERIALS OF THE FORGE
          </h2>
          <p className="font-light text-sm sm:text-base text-[#BBCCD7]/60 max-w-2xl mx-auto mt-4 font-kanit">
            We do not use generic logos. Every engineering capability functions as an abstract physical material inside our manufacturing pipeline.
          </p>
        </div>

        {/* 5 Material Plates */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {materials.map((mat, idx) => (
            <motion.div
              key={mat.id}
              onMouseEnter={() => setActiveMaterial(mat.id)}
              whileHover={{ y: shouldReduceMotion ? 0 : -6 }}
              className={`p-6 sm:p-8 rounded-[32px] border transition-all duration-500 relative flex flex-col justify-between overflow-hidden cursor-pointer ${
                activeMaterial === mat.id
                  ? 'border-[#00F0FF] bg-[#121216] shadow-[0_0_30px_rgba(0,240,255,0.18)]'
                  : 'border-[#D7E2EA]/15 bg-[#0E0E12] hover:border-[#D7E2EA]/30'
              }`}
            >
              {/* Material Serial Tag */}
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#D7E2EA]/10 font-mono text-xs">
                <span className="text-2xl font-black text-[#D7E2EA]/30 font-kanit">
                  0{idx + 1}
                </span>
                <span className="px-3 py-1 rounded-full border border-[#00F0FF]/30 bg-[#00F0FF]/10 text-[#00F0FF] text-[10px] tracking-widest font-bold">
                  [{mat.discipline}]
                </span>
              </div>

              <div>
                <h3 className="font-kanit font-black text-2xl sm:text-3xl text-white uppercase tracking-tight mb-3">
                  {mat.name}
                </h3>
                <p className="text-xs sm:text-sm font-light text-[#BBCCD7]/80 leading-relaxed mb-6 font-kanit">
                  {mat.description}
                </p>
              </div>

              {/* Physical Behavior Annotation */}
              <div className="pt-4 border-t border-[#D7E2EA]/10">
                <span className="font-mono text-[10px] text-[#00F0FF] uppercase tracking-wider block mb-2">
                  // PHYSICAL BEHAVIOR:
                </span>
                <p className="font-mono text-xs text-[#D7E2EA]/90 italic mb-4">
                  "{mat.physicalBehavior}"
                </p>

                {/* Tech specifications */}
                <div className="flex flex-wrap gap-1.5">
                  {mat.specs.map((s, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 rounded-md bg-[#18181F] text-[11px] font-mono text-[#BBCCD7]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ForgeMaterialsSkills;
