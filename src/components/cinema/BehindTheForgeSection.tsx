import React from 'react';
import { brand } from '../../data/brand';
import { socials } from '../../data/socials';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from '../common/BrandIcons';
import { useCursor } from '../../context/CursorContext';

export const BehindTheForgeSection: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();

  return (
    <section id="about" className="relative py-24 md:py-36 bg-[#040a13] border-t border-[#00D4FF]/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        <div className="p-8 sm:p-14 md:p-18 rounded-3xl bg-[#0A0E27]/90 border border-[#00D4FF]/30 flex flex-col md:flex-row md:items-center justify-between gap-10 shadow-[0_0_60px_rgba(0,0,0,0.8)] relative overflow-hidden">
          {/* Subtle cyan glow in background */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#00D4FF]/5 rounded-full blur-3xl pointer-events-none" />

          {/* Left Column: Founder Statement */}
          <div className="max-w-2xl relative z-10">
            <div className="flex items-center gap-2 font-mono text-xs text-[#00D4FF] tracking-[0.25em] uppercase mb-4">
              <ShieldCheck className="w-4 h-4 text-[#00D4FF]" />
              <span>BEHIND THE FORGE</span>
            </div>

            <h3 className="font-display text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">
              {brand.founder}
            </h3>

            <p className="mt-4 text-base sm:text-lg text-[#8D96A8] leading-relaxed font-normal">
              {brand.founderBio}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-xs text-[#8D96A8]">
              <span className="text-[#00D4FF]">SOLO STUDIO MODEL</span>
              <span>//</span>
              <span>DIRECT ACCESS TO THE CRAFTSMAN</span>
              <span>//</span>
              <span>ZERO AGENCY OVERHEAD</span>
            </div>
          </div>

          {/* Right Column: Verified Professional & Code Links */}
          <div className="relative z-10 flex flex-col sm:flex-row md:flex-col items-start gap-4">
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setCursor('default')}
              onMouseLeave={resetCursor}
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-[#070A12] hover:bg-[#101522] text-xs font-mono font-bold tracking-wider text-white border border-[#00D4FF]/40 hover:border-[#00D4FF] transition-all w-full sm:w-auto justify-center group shadow-md"
            >
              <GithubIcon className="w-4 h-4 text-[#00D4FF]" />
              <span>GITHUB PROFILE</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {socials.linkedin && (
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setCursor('default')}
                onMouseLeave={resetCursor}
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-[#070A12] hover:bg-[#101522] text-xs font-mono font-bold tracking-wider text-white border border-[#00D4FF]/40 hover:border-[#00D4FF] transition-all w-full sm:w-auto justify-center group shadow-md"
              >
                <LinkedinIcon className="w-4 h-4 text-[#00D4FF]" />
                <span>LINKEDIN NETWORK</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            )}

            <a
              href={socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setCursor('default')}
              onMouseLeave={resetCursor}
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-[#070A12] hover:bg-[#101522] text-xs font-mono font-bold tracking-wider text-white border border-[#00D4FF]/40 hover:border-[#00D4FF] transition-all w-full sm:w-auto justify-center group shadow-md"
            >
              <InstagramIcon className="w-4 h-4 text-[#00D4FF]" />
              <span>INSTAGRAM // {socials.instagramHandle}</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BehindTheForgeSection;
