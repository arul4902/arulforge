import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface MobileStickyCtaProps {
  onOpenEnquiry: () => void;
}

export const MobileStickyCta: React.FC<MobileStickyCtaProps> = ({ onOpenEnquiry }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;

      // Show after scrolling past hero (approx 450px)
      // Hide near bottom footer (last 600px)
      const isPastHero = scrollY > 450;
      const isNearBottom = scrollY + winHeight > docHeight - 550;

      setIsVisible(isPastHero && !isNearBottom);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.9 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 right-5 z-40 md:hidden"
        >
          <button
            onClick={onOpenEnquiry}
            className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#00D4FF] text-[#070A12] font-mono text-xs font-black tracking-wider shadow-[0_4px_20px_rgba(0,212,255,0.4)] border border-white/20 active:scale-95 transition-transform"
          >
            <span>START A PROJECT</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileStickyCta;
