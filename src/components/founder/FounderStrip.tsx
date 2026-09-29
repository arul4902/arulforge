import React from 'react';
import { brand, socialLinks } from '../../data/forgeConfig';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/BrandIcons';
import { useCursor } from '../../context/CursorContext';

export const FounderStrip: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();

  return (
    <section id="about" className="relative py-20 md:py-28 bg-[#070A12] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="p-8 sm:p-12 md:p-16 rounded-3xl bg-[#0E1322] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-10 relative overflow-hidden">
          {/* Subtle cyber background line */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#00D4FF]/5 rounded-full blur-3xl pointer-events-none" />

          {/* Left Column: Subtle Trust & Bio */}
          <div className="max-w-2xl relative z-10">
            <div className="flex items-center gap-2 font-mono text-xs text-[#00D4FF] tracking-[0.25em] uppercase mb-4">
              <ShieldCheck className="w-4 h-4 text-[#00D4FF]" />
              <span>BEHIND THE FORGE // FOUNDER CREDIT</span>
            </div>

            <h3 className="font-display text-3xl sm:text-5xl font-black text-[#F7FAFC] tracking-tight uppercase">
              {brand.founder}
            </h3>

            <p className="mt-4 text-base sm:text-lg text-[#8D96A8] leading-relaxed font-normal">
              {brand.founderBio}
            </p>

            <div className="mt-6 flex items-center gap-3 font-mono text-xs text-[#8D96A8]">
              <span className="text-[#00D4FF]">SOLO STUDIO MODEL</span>
              <span>//</span>
              <span>DIRECT ACCESS TO THE BUILDER</span>
              <span>//</span>
              <span>ZERO AGENCY OVERHEAD</span>
            </div>
          </div>

          {/* Right Column: Social & Verification Links */}
          <div className="relative z-10 flex flex-col sm:flex-row md:flex-col items-start gap-4">
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setCursor('default')}
              onMouseLeave={resetCursor}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-[#101522] hover:bg-[#161D2E] text-xs font-mono font-bold tracking-wider text-[#F7FAFC] border border-white/10 hover:border-[#00D4FF]/50 transition-all w-full sm:w-auto justify-center group"
            >
              <GithubIcon className="w-4 h-4 text-[#00D4FF]" />
              <span>GITHUB PROFILE</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {socialLinks.linkedin && (
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setCursor('default')}
                onMouseLeave={resetCursor}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-[#101522] hover:bg-[#161D2E] text-xs font-mono font-bold tracking-wider text-[#F7FAFC] border border-white/10 hover:border-[#00D4FF]/50 transition-all w-full sm:w-auto justify-center group"
              >
                <LinkedinIcon className="w-4 h-4 text-[#00D4FF]" />
                <span>LINKEDIN NETWORK</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderStrip;
