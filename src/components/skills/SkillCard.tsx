import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface SkillCardProps {
  name: string;
  category: string;
  icon?: React.ReactNode;
  index: number;
}

export const SkillCard: React.FC<SkillCardProps> = ({
  name,
  category,
  icon,
  index,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.18;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.18;
    setMousePos({ x, y });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.03,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="relative"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isHovered
            ? `translate3d(${mousePos.x}px, ${mousePos.y}px, 0) scale(1.04)`
            : 'translate3d(0, 0, 0) scale(1)',
          transition: isHovered
            ? 'transform 0.15s ease-out'
            : 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
        className={`group relative flex items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-[#D7E2EA]/12 bg-[#121212]/80 backdrop-blur-md cursor-default select-none overflow-hidden transition-colors duration-300 hover:border-[#D7E2EA]/40 hover:bg-[#181818] ${
          isHovered ? 'shadow-[0_0_25px_rgba(118,33,176,0.25)]' : ''
        }`}
      >
        {/* Soft radial glow on hover */}
        <div
          className={`absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#7621B0]/15 via-transparent to-[#B600A8]/15 opacity-0 blur-lg transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : ''
          }`}
        />

        <div className="relative z-10 flex items-center gap-3">
          {icon && (
            <div className="w-8 h-8 rounded-xl bg-[#1D1D1D] flex items-center justify-center text-[#BBCCD7] group-hover:text-white transition-colors">
              {icon}
            </div>
          )}
          <div>
            <h4
              style={{
                transform: isHovered ? 'translateX(3px)' : 'translateX(0)',
                transition: 'transform 0.25s ease',
              }}
              className="text-base sm:text-lg font-semibold tracking-tight text-[#D7E2EA] group-hover:text-white"
            >
              {name}
            </h4>
            <span className="text-[10px] sm:text-xs font-light uppercase tracking-wider text-[#646973] group-hover:text-[#BBCCD7]/70 transition-colors">
              {category}
            </span>
          </div>
        </div>

        {/* Subtle status indicator dot */}
        <div className="relative z-10 w-2 h-2 rounded-full bg-[#646973]/40 group-hover:bg-[#B600A8] group-hover:shadow-[0_0_8px_#B600A8] transition-all duration-300" />
      </div>
    </motion.div>
  );
};

export default SkillCard;
