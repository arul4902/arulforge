import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period?: string;
  description: string;
  points: string[];
  number: string;
  side: 'left' | 'right';
}

interface ExperienceCardProps {
  item: ExperienceItem;
  index: number;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ item, index }) => {
  const shouldReduceMotion = useReducedMotion();
  const isRight = item.side === 'right';

  return (
    <motion.article
      initial={{
        opacity: 0,
        x: shouldReduceMotion ? 0 : isRight ? 40 : -40,
        filter: shouldReduceMotion ? 'none' : 'blur(8px)',
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
      }}
      viewport={{ once: true, margin: '-40px', amount: 0.15 }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={`w-full md:w-[46%] group relative rounded-[28px] sm:rounded-[36px] border border-[#D7E2EA]/15 bg-[#121212]/90 p-6 sm:p-8 md:p-10 backdrop-blur-xl transition-all duration-500 hover:border-[#D7E2EA]/40 hover:bg-[#161616] ${
        isRight ? 'md:ml-auto' : 'md:mr-auto'
      }`}
    >
      {/* Glow highlight */}
      <div className="absolute -inset-0.5 rounded-[30px] sm:rounded-[38px] bg-gradient-to-br from-[#7621B0]/20 via-transparent to-[#B600A8]/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />

      {/* Number and Role badge */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <span className="text-4xl sm:text-5xl font-black text-[#D7E2EA]/20 font-kanit">
          {item.number}
        </span>
        <div className="flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-[#D7E2EA]/15 bg-[#1C1C1C] text-[11px] sm:text-xs font-medium uppercase tracking-wider text-[#BBCCD7]">
          <Briefcase className="w-3 h-3 text-[#B600A8]" />
          <span>{item.company}</span>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-tight text-[#D7E2EA] mb-2 font-kanit">
        {item.role}
      </h3>

      {/* Meta tags */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-[#BBCCD7]/70 mb-5">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-[#646973]" />
          <span>{item.location}</span>
        </div>
        {item.period && (
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#646973]" />
            <span>{item.period}</span>
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-sm sm:text-base font-light text-[#D7E2EA]/80 leading-relaxed mb-6 font-kanit">
        {item.description}
      </p>

      {/* Key highlights / points */}
      <div className="space-y-2.5 pt-4 border-t border-[#D7E2EA]/10">
        <h4 className="text-xs font-semibold uppercase tracking-widest text-[#BBCCD7]/50 mb-3">
          Key Contributions
        </h4>
        <ul className="space-y-2">
          {item.points.map((pt, pIdx) => (
            <li key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#D7E2EA]/90 font-light">
              <CheckCircle2 className="w-4 h-4 text-[#7621B0] mt-0.5 shrink-0" />
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
};

export default ExperienceCard;
