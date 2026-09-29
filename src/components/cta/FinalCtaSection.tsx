import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { InstagramIcon } from '../common/BrandIcons';
import { socialLinks } from '../../data/forgeConfig';
import { useCursor } from '../../context/CursorContext';

interface FinalCtaSectionProps {
  onOpenEnquiry: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onOpenEnquiry }) => {
  const [isDistorting, setIsDistorting] = useState(false);
  const { setCursor, resetCursor } = useCursor();

  return (
    <section className="relative py-32 md:py-48 bg-[#070A12] border-t border-white/10 overflow-hidden">
      {/* Background cyan radiant glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#00D4FF]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 text-center relative z-10">
        {/* Small metadata text */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2 font-mono text-xs sm:text-sm text-[#00D4FF] tracking-[0.3em] uppercase mb-6"
        >
          <Sparkles className="w-4 h-4" />
          <span>HAVE AN IDEA?</span>
        </motion.div>

        {/* Huge Typography with metallic/liquid distortion on "FORGE" */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="select-none"
        >
          <h2 className="hero-title-clamp font-display font-black text-[#F7FAFC] tracking-tighter uppercase leading-[0.9]">
            <span className="block text-gradient-white">LET&rsquo;S</span>
            <span
              onMouseEnter={() => {
                setIsDistorting(true);
                setCursor('forge');
              }}
              onMouseLeave={() => {
                setIsDistorting(false);
                resetCursor();
              }}
              className={`inline-block transition-all duration-300 cursor-pointer ${
                isDistorting
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-white to-[#00D4FF] filter drop-shadow-[0_0_35px_rgba(0,212,255,0.7)] scale-105'
                  : 'text-gradient-cyan'
              }`}
            >
              FORGE IT.
            </span>
          </h2>
        </motion.div>

        {/* Supporting Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-8 text-lg sm:text-xl md:text-2xl text-[#8D96A8] max-w-2xl mx-auto font-normal leading-relaxed"
        >
          &ldquo;Your next digital presence shouldn&rsquo;t look like everyone else&rsquo;s.&rdquo;
        </motion.p>

        {/* Action Triggers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          {/* Primary CTA: START A PROJECT */}
          <button
            onClick={onOpenEnquiry}
            onMouseEnter={() => setCursor('forge')}
            onMouseLeave={resetCursor}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-[#00D4FF] text-[#070A12] font-mono text-sm font-black tracking-wider hover:bg-white transition-all duration-300 shadow-[0_0_35px_rgba(0,212,255,0.4)] cursor-pointer group"
          >
            <span>START A PROJECT</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>

          {/* Secondary CTA: DM ON INSTAGRAM */}
          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setCursor('default')}
            onMouseLeave={resetCursor}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-5 rounded-full bg-[#101522] hover:bg-[#161D2E] text-[#F7FAFC] font-mono text-sm font-bold tracking-wider border border-white/10 hover:border-[#00D4FF]/40 transition-all duration-300 cursor-pointer group"
          >
            <InstagramIcon className="w-4 h-4 text-[#00D4FF]" />
            <span>DM ON INSTAGRAM ↗</span>
          </a>
        </motion.div>

        {/* Small Notice */}
        <div className="mt-8 font-mono text-xs text-[#8D96A8] tracking-widest uppercase">
          INSTAGRAM: <span className="text-[#00D4FF]">{socialLinks.instagramHandle}</span> • DIRECT BUILDER ENQUIRIES WELCOME
        </div>
      </div>
    </section>
  );
};

export default FinalCtaSection;
