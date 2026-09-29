import React from 'react';
import SectionHeading from '../common/SectionHeading';
import SkillCard from '../skills/SkillCard';
import {
  Code2,
  Layout,
  Server,
  Database,
  Cpu,
  Cloud,
  Layers,
  Wrench,
} from 'lucide-react';

interface SkillGroup {
  category: string;
  icon: React.ReactNode;
  skills: string[];
}

const skillGroups: SkillGroup[] = [
  {
    category: 'LANGUAGES',
    icon: <Code2 className="w-4 h-4 text-[#BBCCD7]" />,
    skills: ['Java', 'JavaScript'],
  },
  {
    category: 'FRONTEND',
    icon: <Layout className="w-4 h-4 text-[#BBCCD7]" />,
    skills: ['React', 'Angular', 'HTML', 'CSS'],
  },
  {
    category: 'BACKEND',
    icon: <Server className="w-4 h-4 text-[#BBCCD7]" />,
    skills: ['Spring Boot', 'REST APIs'],
  },
  {
    category: 'DATABASE',
    icon: <Database className="w-4 h-4 text-[#BBCCD7]" />,
    skills: ['MySQL'],
  },
  {
    category: 'AI INTEGRATION',
    icon: <Cpu className="w-4 h-4 text-[#BBCCD7]" />,
    skills: ['Prompt Engineering', 'GPT API Integration'],
  },
  {
    category: 'CLOUD',
    icon: <Cloud className="w-4 h-4 text-[#BBCCD7]" />,
    skills: ['AWS EC2', 'AWS S3'],
  },
  {
    category: 'CORE CONCEPTS',
    icon: <Layers className="w-4 h-4 text-[#BBCCD7]" />,
    skills: [
      'Data Structures & Algorithms',
      'Object-Oriented Programming',
      'DBMS',
      'API Design',
    ],
  },
  {
    category: 'DEVELOPMENT TOOLS',
    icon: <Wrench className="w-4 h-4 text-[#BBCCD7]" />,
    skills: ['Git', 'GitHub', 'Postman', 'IntelliJ IDEA', 'VS Code'],
  },
];

export const SkillsSection: React.FC = () => {
  let globalIndex = 0;

  return (
    <section
      id="skills"
      className="py-24 sm:py-32 px-5 sm:px-8 md:px-16 relative bg-[#0C0C0C]"
      aria-label="Technical Arsenal & Skills"
    >
      <div className="max-w-[1400px] mx-auto">
        <SectionHeading
          title="TECHNICAL ARSENAL"
          subtitle="CAPABILITIES & STACK"
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-16 sm:mt-20">
          {skillGroups.map((group) => (
            <div
              key={group.category}
              className="p-5 sm:p-6 rounded-[28px] border border-[#D7E2EA]/10 bg-[#101010]/60 backdrop-blur-md flex flex-col justify-between"
            >
              {/* Category Header */}
              <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-[#D7E2EA]/10">
                <div className="p-1.5 rounded-lg bg-[#1C1C1C]">
                  {group.icon}
                </div>
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#BBCCD7]">
                  {group.category}
                </h3>
              </div>

              {/* Skill Pills */}
              <div className="flex flex-col gap-2.5 flex-1">
                {group.skills.map((skill) => {
                  const currentIndex = globalIndex++;
                  return (
                    <SkillCard
                      key={skill}
                      name={skill}
                      category={group.category}
                      index={currentIndex}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
