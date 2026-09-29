import React from 'react';
import { brand } from '../../data/brand';
import { socials } from '../../data/socials';
import { useCursor } from '../../context/CursorContext';

export const CinematicFooter: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'WORK', href: '#work' },
    { label: 'CAPABILITIES', href: '#capabilities' },
    { label: 'PROCESS', href: '#process' },
    { label: 'ABOUT', href: '#about' },
  ];

  return (
    <footer className="relative pt-24 pb-12 bg-[#02050b] border-t border-white/10 text-white overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Navigation & Channel Links */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10 pb-16 border-b border-white/10">
          <div>
            <div className="font-mono text-xs text-[#00D4FF] tracking-[0.3em] uppercase mb-2">
              STUDIO MANIFEST // {brand.established}
            </div>
            <div className="font-display text-2xl sm:text-3xl font-black uppercase text-white leading-none">
              IDEAS IN. <br />
              <span className="text-gradient-cyan">EXPERIENCES OUT.</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap gap-8 font-mono text-xs tracking-wider">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[#8D96A8] hover:text-[#00D4FF] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href={socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8D96A8] hover:text-[#00D4FF] transition-colors"
            >
              INSTAGRAM ↗
            </a>
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8D96A8] hover:text-[#00D4FF] transition-colors"
            >
              GITHUB ↗
            </a>
            {socials.linkedin && (
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8D96A8] hover:text-[#00D4FF] transition-colors"
              >
                LINKEDIN ↗
              </a>
            )}
          </div>
        </div>

        {/* Minimal Black Screen with Massive ARULFORGE Wordmark */}
        <div className="pt-16 pb-8 text-center overflow-hidden">
          <div
            onClick={scrollToTop}
            onMouseEnter={() => setCursor('default')}
            onMouseLeave={resetCursor}
            className="cursor-pointer group inline-block w-full"
            title="Return to origin"
          >
            <h1 className="font-display font-black text-[15vw] leading-[0.78] tracking-tighter text-[#0d1424] group-hover:text-white/10 transition-colors uppercase select-none w-full text-center">
              ARULFORGE
            </h1>
          </div>
        </div>

        {/* Founder Attribution & Operational Status Bottom Strip */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#8D96A8]">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-white font-semibold">{brand.founderCredit}</span>
            <span className="text-white/20">//</span>
            <span>{brand.location}</span>
            <span className="text-white/20">//</span>
            <span className="text-[#00D4FF]">{brand.availability}</span>
          </div>

          <div className="flex items-center gap-3">
            <span>© {brand.established} {brand.name}</span>
            <span className="text-white/20">//</span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>ALL SYSTEMS OPERATIONAL</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CinematicFooter;
