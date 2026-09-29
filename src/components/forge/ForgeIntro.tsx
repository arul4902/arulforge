import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ForgeIntroProps {
  onComplete: () => void;
}

export const ForgeIntro: React.FC<ForgeIntroProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'init' | 'idea' | 'laser' | 'forge' | 'reveal' | 'done'>('init');

  useEffect(() => {
    // Check session storage to see if user has already seen the intro
    const hasSeen = sessionStorage.getItem('arulforge_intro_seen');
    if (hasSeen) {
      onComplete();
      setPhase('done');
      return;
    }

    const t1 = setTimeout(() => setPhase('idea'), 400);
    const t2 = setTimeout(() => setPhase('laser'), 850);
    const t3 = setTimeout(() => setPhase('forge'), 1250);
    const t4 = setTimeout(() => {
      setPhase('reveal');
      sessionStorage.setItem('arulforge_intro_seen', 'true');
    }, 1800);
    const t5 = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 2300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onComplete]);

  if (phase === 'done') return null;

  const handleSkip = () => {
    sessionStorage.setItem('arulforge_intro_seen', 'true');
    setPhase('done');
    onComplete();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#070A12] text-[#F7FAFC]"
          animate={
            phase === 'reveal'
              ? {
                  clipPath: 'polygon(0 0, 100% 0, 100% 0%, 0 0%, 0 100%, 100% 100%, 100% 100%, 0 100%)',
                  opacity: 0,
                  transition: { duration: 0.5, ease: [0.77, 0, 0.175, 1] },
                }
              : { opacity: 1 }
          }
        >
          {/* Subtle background grid flicker */}
          <div className="absolute inset-0 forge-grid-line opacity-20 pointer-events-none" />

          {/* Skip button in top corner */}
          <button
            onClick={handleSkip}
            className="absolute top-6 right-6 font-mono text-xs text-[#8D96A8] hover:text-[#00D4FF] tracking-wider transition-colors z-20 cursor-pointer"
          >
            [ SKIP INTRO ↗ ]
          </button>

          {/* Sequence container */}
          <div className="relative flex flex-col items-center justify-center text-center px-4">
            {/* Status indicator */}
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: phase === 'init' ? 1 : 0.6, y: 0 }}
              className="font-mono text-xs tracking-[0.25em] text-[#00D4FF] mb-6 select-none"
            >
              INITIALIZING FORGE [EST. 2026]
            </motion.p>

            {/* Core Morph Text Container */}
            <div className="relative h-20 min-w-[280px] md:min-w-[420px] flex items-center justify-center">
              {/* Thin Laser Line Traveling Horizontally */}
              {phase === 'laser' && (
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 0.45, ease: 'easeInOut' }}
                  className="absolute h-[2px] w-full bg-[#00D4FF] shadow-[0_0_12px_#00D4FF] z-10"
                />
              )}

              {/* State 1: [ IDEA ] */}
              {(phase === 'init' || phase === 'idea' || phase === 'laser') && (
                <motion.div
                  key="idea"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05, filter: 'blur(4px)' }}
                  className="font-display text-2xl md:text-4xl font-bold tracking-[0.3em] text-[#F7FAFC]"
                >
                  <span className="text-[#00D4FF] mr-2">[</span>
                  IDEA
                  <span className="text-[#00D4FF] ml-2">]</span>
                </motion.div>
              )}

              {/* State 2: [ ARULFORGE ] (assembled from fragments) */}
              {(phase === 'forge' || phase === 'reveal') && (
                <motion.div
                  key="forge"
                  initial={{ opacity: 0, scale: 0.92, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="font-display text-2xl md:text-5xl font-extrabold tracking-[0.2em] text-[#F7FAFC] flex items-center"
                >
                  <span className="text-[#00D4FF] mr-2 text-xl md:text-3xl">[</span>
                  {'ARULFORGE'.split('').map((char, index) => (
                    <motion.span
                      key={index}
                      initial={{ y: (index % 2 === 0 ? -12 : 12), opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.025, duration: 0.25 }}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                  <span className="text-[#00D4FF] ml-2 text-xl md:text-3xl">]</span>
                </motion.div>
              )}
            </div>

            {/* Bottom micro-metadata */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.6 }}
              className="mt-6 flex items-center gap-3 font-mono text-[10px] tracking-widest text-[#8D96A8]"
            >
              <span>SYS_READY</span>
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#00D4FF] animate-ping" />
              <span>DIGITAL_STUDIO</span>
            </motion.div>
          </div>
        </motion.div>
    </AnimatePresence>
  );
};

export default ForgeIntro;
