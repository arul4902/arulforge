import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

export const BreakTheGrid: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [glitchState, setGlitchState] = useState<'idle' | 'breaking' | 'fixing' | 'fixed'>('idle');

  useEffect(() => {
    if (isInView && glitchState === 'idle') {
      // 1. Break the grid
      setGlitchState('breaking');

      // 2. Automated tool catches it after 550ms
      const t1 = setTimeout(() => {
        setGlitchState('fixing');
      }, 550);

      // 3. Snaps back to perfect alignment
      const t2 = setTimeout(() => {
        setGlitchState('fixed');
      }, 1050);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [isInView, glitchState]);

  return (
    <div
      ref={containerRef}
      className="relative my-20 sm:my-28 max-w-5xl mx-auto px-6 select-none overflow-hidden"
    >
      <div className="p-8 sm:p-12 rounded-[32px] border border-[#D7E2EA]/15 bg-[#0D0D10]/80 backdrop-blur-md relative">
        {/* Technical Calibration status header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#D7E2EA]/10 font-mono text-xs">
          <span className="text-[#646973] uppercase tracking-widest">// GRID INTEGRITY MONITOR</span>
          <span
            className={`font-bold transition-colors ${
              glitchState === 'breaking'
                ? 'text-red-400 animate-pulse'
                : glitchState === 'fixing'
                ? 'text-amber-400'
                : 'text-emerald-400'
            }`}
          >
            {glitchState === 'breaking'
              ? '[ALERT: ALIGNMENT LOSS]'
              : glitchState === 'fixing'
              ? '[CALIBRATING...]'
              : '[STATUS: NOMINAL — FIXED]'}
          </span>
        </div>

        {/* The malfunctioning element that slides and tilts */}
        <motion.div
          animate={{
            x: glitchState === 'breaking' ? 48 : glitchState === 'fixing' ? 12 : 0,
            y: glitchState === 'breaking' ? 16 : 0,
            rotate: glitchState === 'breaking' ? 3.5 : 0,
            skewX: glitchState === 'breaking' ? -8 : 0,
          }}
          transition={{
            type: 'spring',
            damping: glitchState === 'fixed' ? 25 : 15,
            stiffness: glitchState === 'fixed' ? 400 : 200,
          }}
          className="relative"
        >
          <h4 className="font-kanit font-black text-2xl sm:text-4xl uppercase tracking-tight text-[#D7E2EA]">
            THE FACTORY CALIBRATES EVERY PIXEL.
          </h4>
          <p className="font-light text-sm sm:text-base text-[#BBCCD7]/70 mt-2 max-w-2xl font-kanit">
            Zero layout drift. Every structural tolerance is accounted for before code is stamped for production.
          </p>
        </motion.div>

        {/* Escaping line that drifts out of bounds during glitch */}
        <motion.div
          animate={{
            scaleX: glitchState === 'breaking' ? 1.4 : 1,
            x: glitchState === 'breaking' ? 60 : 0,
            backgroundColor: glitchState === 'breaking' ? '#FF0055' : '#00F0FF',
          }}
          transition={{ duration: 0.4 }}
          className="h-0.5 w-full bg-[#00F0FF] mt-6"
        />

        {/* The automated micro-tool that appears to snap the element back */}
        {glitchState === 'fixing' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, x: 100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-1/2 right-12 -translate-y-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00F0FF] text-[#0C0C0C] font-mono text-xs font-black shadow-[0_0_20px_#00F0FF]"
          >
            <span>⌖ RE-ALIGNING</span>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BreakTheGrid;
