import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

interface UIFoldDividerProps {
  label?: string;
}

export const UIFoldDivider: React.FC<UIFoldDividerProps> = ({
  label = 'SECTION_BOUNDARY // CONTINUOUS_FORGE',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Corner fold physics
  // As scroll reaches center, the top-right corner subtly lifts (-14 deg rotateX/Y)
  const foldLift = useTransform(scrollYProgress, [0.15, 0.5, 0.85], [0, -18, 0]);
  const foldShadow = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 0.7, 0]);

  return (
    <div
      ref={containerRef}
      style={{ perspective: 1200 }}
      className="relative w-full max-w-[1500px] mx-auto py-10 px-5 sm:px-8 select-none overflow-hidden"
    >
      <motion.div
        style={{
          rotateX: shouldReduceMotion ? 0 : foldLift,
          transformOrigin: 'top left',
          willChange: 'transform',
        }}
        className="relative rounded-3xl border border-[#00F0FF]/30 bg-gradient-to-r from-[#0C0C10] via-[#101018] to-[#0A0A0E] p-6 sm:p-8 shadow-2xl"
      >
        {/* Subtle cyan fold light revealed behind lifted corner */}
        <motion.div
          style={{ opacity: shouldReduceMotion ? 0.2 : foldShadow }}
          className="absolute -top-4 -right-4 w-32 h-32 rounded-full bg-[#00F0FF]/25 blur-xl pointer-events-none"
        />

        {/* Technical boundary demarcation */}
        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-2 text-[#00F0FF]">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
            <span className="font-bold tracking-widest uppercase">[{label}]</span>
          </div>

          <div className="flex items-center gap-3 text-[#646973] text-[11px]">
            <span>SHEET TENSILE INTERFACE</span>
            <span className="text-[#00F0FF]">[FOLDS ON TRAVERSAL]</span>
          </div>
        </div>

        {/* Diagonal incision guideline across divider */}
        <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-[#00F0FF]/40 to-transparent mt-4" />
      </motion.div>
    </div>
  );
};

export default UIFoldDivider;
