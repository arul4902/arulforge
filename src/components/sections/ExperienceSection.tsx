import React, { useRef } from 'react';
import SectionHeading from '../common/SectionHeading';
import ExperienceCard, { type ExperienceItem } from '../experience/ExperienceCard';
import { motion, useScroll, useSpring } from 'framer-motion';

const experiences: ExperienceItem[] = [
  {
    id: 'cognizant',
    number: '01',
    role: 'PROGRAMMER ANALYST INTERN',
    company: 'Cognizant',
    location: 'Coimbatore',
    description:
      'Worked on full-stack application development with Java, Spring Boot, Angular and SQL, contributing to scalable frontend-backend systems and practical enterprise development.',
    points: [
      'REST API integration',
      'Backend development',
      'Database operations',
      'Frontend-backend communication',
      'Debugging',
      'Performance optimization',
      'Feature development',
    ],
    side: 'left',
  },
  {
    id: 'redmind',
    number: '02',
    role: 'BACKEND DEVELOPER INTERN',
    company: 'Redmind Technologies',
    location: 'Remote',
    period: 'June 2024 – July 2024',
    description:
      'Built scalable backend services using Spring Boot and REST APIs while focusing on database efficiency and application performance.',
    points: [
      'Built scalable Spring Boot services',
      'Reduced API latency by 20%',
      'Designed REST APIs',
      'Optimized database queries',
      'Collaborated with frontend teams',
    ],
    side: 'right',
  },
];

export const ExperienceSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.3'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      id="experience"
      className="py-24 sm:py-32 px-5 sm:px-8 md:px-16 relative bg-[#0C0C0C]"
      aria-label="Professional Experience"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="EXPERIENCE"
          subtitle="JOURNEY & IMPACT"
          align="center"
        />

        {/* Timeline Container */}
        <div ref={containerRef} className="relative mt-16 sm:mt-24">
          {/* Vertical Timeline Line */}
          {/* Base background line */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-[#D7E2EA]/10 hidden md:block" />
          {/* Mobile line */}
          <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-[#D7E2EA]/10 md:hidden" />

          {/* Progressive filling line */}
          <motion.div
            style={{ scaleY, transformOrigin: 'top' }}
            className="absolute left-6 md:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-gradient-to-b from-[#7621B0] via-[#B600A8] to-[#BBCCD7] hidden md:block"
          />
          <motion.div
            style={{ scaleY, transformOrigin: 'top' }}
            className="absolute left-4 top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#7621B0] via-[#B600A8] to-[#BBCCD7] md:hidden"
          />

          {/* Experience Cards */}
          <div className="space-y-12 sm:space-y-16 md:space-y-24">
            {experiences.map((item, index) => (
              <div key={item.id} className="relative flex flex-col md:flex-row items-center">
                {/* Center Timeline Node Indicator (Desktop) */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-[#B600A8] bg-[#0C0C0C] z-20 items-center justify-center shadow-[0_0_12px_#B600A8]">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>

                <ExperienceCard item={item} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
