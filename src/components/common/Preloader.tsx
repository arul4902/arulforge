import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoaded(true);
            setTimeout(onComplete, 800);
          }, 200);
          return 100;
        }
        // Accelerating counter
        const increment = Math.floor(Math.random() * 8) + 3;
        return Math.min(prev + increment, 100);
      });
    }, 35);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          initial={{ y: 0 }}
          exit={{
            y: '-100%',
            transition: {
              duration: 0.9,
              ease: [0.87, 0, 0.13, 1], // cinematic agency curtain lift
            },
          }}
          className="fixed inset-0 z-[9999] flex flex-col justify-between p-8 sm:p-12 md:p-16 bg-[#0C0C0C] text-[#D7E2EA] select-none"
        >
          {/* Top Row: Brand & Status */}
          <div className="flex items-center justify-between text-xs sm:text-sm uppercase tracking-[0.25em] text-[#646973] font-kanit">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#B600A8] animate-ping" />
              ARUL S. — PORTFOLIO
            </span>
            <span>INITIALIZING EXPERIENCE</span>
          </div>

          {/* Center: Massive animated counter */}
          <div className="flex flex-col items-center justify-center my-auto">
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                className="text-[18vw] sm:text-[16vw] md:text-[14vw] font-black leading-none font-kanit hero-heading tracking-tighter"
              >
                {progress < 10 ? `0${progress}` : progress}
                <span className="text-[6vw] font-light text-[#BBCCD7]/40 ml-1 sm:ml-2">
                  %
                </span>
              </motion.div>
            </div>
            <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-[#BBCCD7]/60 font-light mt-2">
              ENGINEER • ARCHITECT • CREATOR
            </p>
          </div>

          {/* Bottom Row: Loading progress line */}
          <div className="w-full">
            <div className="h-0.5 w-full bg-[#222222] rounded-full overflow-hidden">
              <motion.div
                style={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-[#7621B0] via-[#B600A8] to-[#BBCCD7] transition-all duration-75 ease-out"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
