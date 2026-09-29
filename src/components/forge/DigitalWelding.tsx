import React, { useState, useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const DigitalWelding: React.FC = () => {
  const [welded, setWelded] = useState(false);
  const [pullProgress, setPullProgress] = useState(0); // 0 to 1
  const triggerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (welded || !triggerRef.current) return;
      const rect = triggerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);
      const threshold = 180;

      if (dist < threshold) {
        const progress = Math.min(1, Math.max(0, (threshold - dist) / threshold));
        setPullProgress(progress);

        if (progress > 0.88 && !welded) {
          setWelded(true);
        }
      } else {
        setPullProgress((p) => Math.max(0, p - 0.1));
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [welded, shouldReduceMotion]);

  const leftOffset = pullProgress * 45;
  const rightOffset = pullProgress * 45;

  return (
    <div
      ref={triggerRef}
      data-forge-tool="welder"
      className="relative my-10 flex flex-col items-center justify-center p-6 select-none cursor-pointer"
    >
      {!welded ? (
        <div className="relative flex items-center justify-center h-16 w-80">
          {/* Fragment A: Left Unconnected Half */}
          <motion.div
            style={{
              x: leftOffset,
            }}
            className="absolute left-6 flex items-center gap-2 px-4 py-2 border-l-2 border-t-2 border-b-2 border-dashed border-[#00F0FF]/50 bg-[#121212]/60 rounded-l-xl text-xs font-mono text-[#00F0FF]/70"
          >
            <span>[WELD_L]</span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-ping" />
          </motion.div>

          {/* Center attraction line */}
          <div className="w-16 h-0.5 border-t border-dotted border-[#00F0FF]/30" />

          {/* Fragment B: Right Unconnected Half */}
          <motion.div
            style={{
              x: -rightOffset,
            }}
            className="absolute right-6 flex items-center gap-2 px-4 py-2 border-r-2 border-t-2 border-b-2 border-dashed border-[#00F0FF]/50 bg-[#121212]/60 rounded-r-xl text-xs font-mono text-[#00F0FF]/70"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-ping" />
            <span>[WELD_R]</span>
          </motion.div>

          {/* Prompt caption */}
          <span className="absolute -bottom-2 font-mono text-[10px] tracking-[0.25em] text-[#646973] uppercase">
            HOVER TO WELD INTERFACE FRAGMENTS
          </span>
        </div>
      ) : (
        /* ASSEMBLED FORGED ELEMENT */
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 20, stiffness: 350 }}
          className="relative group"
        >
          {/* Spark Flash burst */}
          <div className="absolute -inset-2 rounded-full bg-[#00F0FF]/25 blur-lg animate-pulse" />

          <a
            href="#projects"
            className="relative flex items-center gap-3 px-8 py-3.5 rounded-full border-2 border-[#00F0FF] bg-[#0C0C0C] text-[#00F0FF] hover:bg-[#00F0FF] hover:text-[#0C0C0C] transition-all duration-300 font-mono text-xs uppercase tracking-[0.25em] font-bold shadow-[0_0_25px_rgba(0,240,255,0.4)]"
          >
            <span>⚡ COMPONENT FORGED: EXPLORE PRODUCTION →</span>
          </a>
        </motion.div>
      )}
    </div>
  );
};

export default DigitalWelding;
