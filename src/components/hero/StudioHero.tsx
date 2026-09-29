import React from 'react';
import { motion } from 'framer-motion';
import { TheForgeCore } from './TheForgeCore';
import { useCursor } from '../../context/CursorContext';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { brand } from '../../data/forgeConfig';

interface StudioHeroProps {
  onOpenEnquiry: () => void;
}

export const StudioHero: React.FC<StudioHeroProps> = ({ onOpenEnquiry }) => {
  const { setCursor, resetCursor } = useCursor();

  const handleScrollExplore = () => {
    const target = document.querySelector('#manifesto') || document.querySelector('#work');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const statusItems = ['DESIGN', 'DEVELOPMENT', 'INTERACTION', 'DEPLOYMENT'];

  return (
    <section className="relative min-h-[96vh] md:min-h-screen flex flex-col justify-between pt-28 pb-10 px-5 sm:px-8 max-w-7xl mx-auto w-full z-10 overflow-hidden">
      {/* Interactive Metaphor: The Forge Core (Chaos -> Structure -> Website) */}
      <TheForgeCore />

      {/* Top Editorial Metadata */}
      <div className="relative z-10 pt-4 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-[#8D96A8] tracking-[0.2em] uppercase border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#00D4FF] shadow-[0_0_8px_#00D4FF]" />
          <span>INDEPENDENT DIGITAL STUDIO</span>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <span>{brand.location}</span>
          <span className="text-white/20">//</span>
          <span className="text-[#00D4FF]">{brand.availability}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>EST. {brand.established}</span>
        </div>
      </div>

      {/* Center Giant Hero Typography Composition */}
      <div className="relative z-10 my-auto py-12 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="select-none"
        >
          <h1 className="hero-title-clamp font-display font-extrabold text-[#F7FAFC] tracking-tighter uppercase leading-[0.92]">
            <span className="block text-gradient-white">WE FORGE</span>
            <span className="block text-[#F7FAFC]">DIGITAL</span>
            <span className="block text-gradient-cyan">EXPERIENCES.</span>
          </h1>
        </motion.div>

        {/* Supporting Copy & CTAs */}
        <div className="mt-8 md:mt-12 flex flex-col lg:flex-row lg:items-end justify-between gap-8 max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="text-base sm:text-lg md:text-xl text-[#8D96A8] max-w-xl font-normal leading-relaxed"
          >
            Independent creative web studio turning businesses, brands and ideas into{' '}
            <span className="text-[#F7FAFC] font-medium">fast, distinctive digital experiences</span>.
          </motion.p>

          {/* Action Triggers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="flex flex-wrap items-center gap-4"
          >
            <button
              onClick={onOpenEnquiry}
              onMouseEnter={() => setCursor('forge')}
              onMouseLeave={resetCursor}
              className="relative inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#00D4FF] text-[#070A12] font-mono text-xs sm:text-sm font-bold tracking-wider hover:bg-white transition-all duration-300 shadow-[0_0_25px_rgba(0,212,255,0.35)] cursor-pointer group"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>

            <button
              onClick={handleScrollExplore}
              onMouseEnter={() => setCursor('default')}
              onMouseLeave={resetCursor}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#101522]/80 hover:bg-[#161D2E] text-[#F7FAFC] font-mono text-xs sm:text-sm font-medium tracking-wider border border-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer group"
            >
              <span>EXPLORE THE FORGE</span>
              <ArrowDown className="w-4 h-4 text-[#00D4FF] transition-transform duration-200 group-hover:translate-y-1" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Bottom Status Ticker */}
      <div className="relative z-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#8D96A8]">
        <div className="flex items-center gap-6 overflow-x-auto py-1 scrollbar-none">
          {statusItems.map((status, index) => (
            <div key={status} className="flex items-center gap-2 flex-shrink-0">
              <span className="text-[#00D4FF] text-[10px]">0{index + 1}</span>
              <span className="font-semibold text-[#F7FAFC] tracking-wider">{status}</span>
              {index < statusItems.length - 1 && <span className="text-white/20 ml-4">•</span>}
            </div>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2 text-[11px] tracking-widest text-[#8D96A8]">
          <span>STATUS:</span>
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[#F7FAFC]">OPERATIONAL</span>
        </div>
      </div>
    </section>
  );
};

export default StudioHero;
