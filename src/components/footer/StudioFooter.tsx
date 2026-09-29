import React from 'react';
import { brand, socialLinks } from '../../data/forgeConfig';
import { useCursor } from '../../context/CursorContext';
import { ArrowUpRight } from 'lucide-react';

interface StudioFooterProps {
  onOpenEnquiry: () => void;
}

export const StudioFooter: React.FC<StudioFooterProps> = ({ onOpenEnquiry }) => {
  const { setCursor, resetCursor } = useCursor();

  const navLinks = [
    { label: 'WORK', href: '#work' },
    { label: 'CAPABILITIES', href: '#capabilities' },
    { label: 'PROCESS', href: '#process' },
    { label: 'ABOUT', href: '#about' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative pt-24 pb-12 bg-[#05070D] border-t border-white/10 text-[#F7FAFC] overflow-hidden">
      {/* Background ambient pattern */}
      <div className="absolute inset-0 forge-grid-line opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Top Tagline & Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-20 border-b border-white/10">
          {/* Left Column: Slogan & Mission */}
          <div className="md:col-span-6 space-y-4">
            <span className="font-mono text-xs text-[#00D4FF] tracking-[0.25em] uppercase block">
              STUDIO MANIFEST // EST. {brand.established}
            </span>
            <div className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#F7FAFC] leading-none">
              <span>IDEAS IN.</span>
              <br />
              <span className="text-gradient-cyan">EXPERIENCES OUT.</span>
            </div>
            <p className="text-sm text-[#8D96A8] max-w-md pt-2">
              {brand.supportingCopy}
            </p>
          </div>

          {/* Center Column: Navigation */}
          <div className="md:col-span-3 space-y-4">
            <span className="font-mono text-xs text-[#8D96A8] tracking-widest uppercase block">
              INDEX
            </span>
            <ul className="space-y-3 font-mono text-xs">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="hover:text-[#00D4FF] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={onOpenEnquiry}
                  className="text-[#00D4FF] font-bold hover:underline cursor-pointer flex items-center gap-1"
                >
                  <span>START A PROJECT</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>

          {/* Right Column: Social & Founder info */}
          <div className="md:col-span-3 space-y-4">
            <span className="font-mono text-xs text-[#8D96A8] tracking-widest uppercase block">
              CHANNELS
            </span>
            <ul className="space-y-3 font-mono text-xs">
              <li>
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00D4FF] transition-colors flex items-center justify-between group"
                >
                  <span>INSTAGRAM</span>
                  <span className="text-[#8D96A8] group-hover:text-[#00D4FF]">{socialLinks.instagramHandle} ↗</span>
                </a>
              </li>
              <li>
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00D4FF] transition-colors flex items-center justify-between group"
                >
                  <span>GITHUB</span>
                  <span className="text-[#8D96A8] group-hover:text-[#00D4FF]">@arul4902 ↗</span>
                </a>
              </li>
              {socialLinks.linkedin && (
                <li>
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#00D4FF] transition-colors flex items-center justify-between group"
                  >
                    <span>LINKEDIN</span>
                    <span className="text-[#8D96A8] group-hover:text-[#00D4FF]">CONNECT ↗</span>
                  </a>
                </li>
              )}
            </ul>

            <div className="pt-4 border-t border-white/5 font-mono text-[11px] text-[#8D96A8] space-y-1">
              <div className="text-[#F7FAFC] font-semibold">{brand.founderCredit}</div>
              <div>{brand.location}</div>
              <div className="text-[#00D4FF]">{brand.availability}</div>
            </div>
          </div>
        </div>

        {/* Oversized Wordmark: ARULFORGE Edge-to-Edge */}
        <div className="pt-12 pb-8 text-center select-none overflow-hidden">
          <div
            onClick={scrollToTop}
            onMouseEnter={() => setCursor('default')}
            onMouseLeave={resetCursor}
            className="cursor-pointer group inline-block w-full"
            title="Return to top"
          >
            <h1 className="font-display font-black text-[14vw] leading-[0.8] tracking-tighter text-[#101522] group-hover:text-white/10 transition-colors uppercase select-none w-full text-center">
              ARULFORGE
            </h1>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Pulsing Status Dot */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#8D96A8]">
          <div className="flex items-center gap-2">
            <span>© {brand.established} {brand.name}. ALL RIGHTS RESERVED.</span>
          </div>

          <div className="flex items-center gap-2">
            <span>{brand.status}</span>
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default StudioFooter;
