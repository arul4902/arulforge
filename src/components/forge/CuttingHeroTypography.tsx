import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const lines = ['I BUILD', 'WHAT SHOULD', 'EXIST NEXT.'];

interface SliceLineProps {
  line: string;
  index: number;
}

const SliceLine: React.FC<SliceLineProps> = ({ line, index }) => {
  const [isCut, setIsCut] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handlePointerEnter = () => {
    if (!shouldReduceMotion) setIsCut(true);
  };

  const handlePointerLeave = () => {
    setIsCut(false);
  };

  return (
    <div
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      data-forge-tool="cutter"
      className="relative select-none cursor-pointer group py-1 sm:py-2"
    >
      {/* Top Slice */}
      <motion.div
        animate={{
          y: isCut ? -5 : 0,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 400 }}
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 50.5%, 0 50.5%)',
        }}
        className="font-kanit font-black text-[10vw] sm:text-[9.5vw] md:text-[8.5vw] lg:text-[7.5vw] leading-[0.9] uppercase tracking-tighter hero-heading"
      >
        {line}
      </motion.div>

      {/* Bottom Slice */}
      <motion.div
        animate={{
          y: isCut ? 5 : 0,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 400 }}
        style={{
          clipPath: 'polygon(0 49.5%, 100% 49.5%, 100% 100%, 0 100%)',
        }}
        className="absolute inset-0 font-kanit font-black text-[10vw] sm:text-[9.5vw] md:text-[8.5vw] lg:text-[7.5vw] leading-[0.9] uppercase tracking-tighter hero-heading pointer-events-none"
      >
        {line}
      </motion.div>

      {/* Incision Laser Seam inside the cut */}
      <motion.div
        animate={{
          opacity: isCut ? 1 : 0,
          scaleX: isCut ? 1 : 0.4,
        }}
        transition={{ duration: 0.2 }}
        className="absolute top-1/2 left-0 right-0 h-[1.5px] bg-[#00F0FF] shadow-[0_0_15px_#00F0FF] pointer-events-none z-10 -translate-y-1/2"
      />

      {/* Micro technical stamp */}
      <div className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 font-mono text-[9px] text-[#00F0FF]/50 tracking-widest opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
        [SEAM_0{index + 1}]
      </div>
    </div>
  );
};

export const CuttingHeroTypography: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center w-full max-w-5xl mx-auto px-4 z-10 relative">
      <div className="font-mono text-[11px] sm:text-xs tracking-[0.3em] uppercase text-[#00F0FF]/70 mb-3 sm:mb-4 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
        FORGE SPECIFICATION // MANIFESTO
      </div>

      <div className="flex flex-col items-center">
        {lines.map((line, idx) => (
          <SliceLine key={line} line={line} index={idx} />
        ))}
      </div>
    </div>
  );
};

export default CuttingHeroTypography;
