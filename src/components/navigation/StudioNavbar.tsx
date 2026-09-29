import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { brand, socialLinks } from '../../data/forgeConfig';
import { useCursor } from '../../context/CursorContext';
import { ArrowUpRight, Menu, X } from 'lucide-react';

interface StudioNavbarProps {
  onOpenEnquiry: () => void;
}

export const StudioNavbar: React.FC<StudioNavbarProps> = ({ onOpenEnquiry }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'WORK', href: '#work' },
    { label: 'CAPABILITIES', href: '#capabilities' },
    { label: 'PROCESS', href: '#process' },
    { label: 'ABOUT', href: '#about' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-3 bg-[#070A12]/85 backdrop-blur-md border-b border-white/10' : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* Left: Brand Logo / Wordmark */}
          <a
            href="#"
            className="flex items-center gap-2 group"
            onMouseEnter={() => setCursor('forge')}
            onMouseLeave={resetCursor}
          >
            <span className="font-display font-black text-xl tracking-tight text-[#F7FAFC] group-hover:text-[#00D4FF] transition-colors">
              {brand.name}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#00D4FF] group-hover:scale-150 transition-transform shadow-[0_0_8px_#00D4FF]" />
            <span className="hidden sm:inline-block font-mono text-[9px] text-[#8D96A8] tracking-widest pl-1 border-l border-white/10">
              STUDIO
            </span>
          </a>

          {/* Center Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 bg-[#101522]/70 px-6 py-2 rounded-full border border-white/10 backdrop-blur-sm">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="relative font-mono text-xs font-semibold tracking-wider text-[#8D96A8] hover:text-[#F7FAFC] transition-colors py-1 group"
                onMouseEnter={() => setCursor('default')}
                onMouseLeave={resetCursor}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#00D4FF] transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={onOpenEnquiry}
              onMouseEnter={() => setCursor('forge')}
              onMouseLeave={resetCursor}
              className="relative inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-transparent hover:bg-[#00D4FF]/10 text-xs font-mono font-bold tracking-wider text-[#F7FAFC] hover:text-[#00D4FF] border border-white/20 hover:border-[#00D4FF]/60 transition-all duration-200 shadow-sm cursor-pointer group"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center gap-2 text-xs font-mono tracking-widest text-[#F7FAFC] p-2 hover:text-[#00D4FF] transition-colors"
            aria-label="Toggle navigation menu"
          >
            <span>{mobileMenuOpen ? 'CLOSE' : 'MENU'}</span>
            {mobileMenuOpen ? <X className="w-4 h-4 text-[#00D4FF]" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Navigation Experience */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at 90% 40px)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 90% 40px)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 90% 40px)' }}
            transition={{ duration: 0.45, ease: [0.77, 0, 0.175, 1] }}
            className="fixed inset-0 z-40 bg-[#070A12] text-[#F7FAFC] flex flex-col justify-between p-8 pt-28 md:hidden"
          >
            {/* Top metadata */}
            <div className="font-mono text-[10px] tracking-widest text-[#8D96A8] flex justify-between border-b border-white/10 pb-4">
              <span>{brand.name} [NAVIGATION]</span>
              <span>AVAILABLE WORLDWIDE</span>
            </div>

            {/* Navigation links staggered */}
            <nav className="flex flex-col gap-6 my-auto">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.08, duration: 0.3 }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#F7FAFC] hover:text-[#00D4FF] transition-colors flex items-center justify-between"
                  >
                    <span>{link.label}</span>
                    <span className="font-mono text-xs text-[#8D96A8] font-normal">0{idx + 1}</span>
                  </a>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45, duration: 0.3 }}
                className="pt-4"
              >
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenEnquiry();
                  }}
                  className="w-full py-4 rounded-xl bg-[#00D4FF] text-[#070A12] font-mono text-sm font-bold tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,212,255,0.3)]"
                >
                  <span>START A PROJECT</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </motion.div>
            </nav>

            {/* Mobile Footer with Social Links */}
            <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
              <span className="font-mono text-[10px] text-[#8D96A8] tracking-widest">CONNECT WITH FORGE</span>
              <div className="flex items-center gap-6 font-mono text-xs">
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00D4FF] transition-colors"
                >
                  INSTAGRAM ↗
                </a>
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00D4FF] transition-colors"
                >
                  GITHUB ↗
                </a>
                {socialLinks.linkedin && (
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#00D4FF] transition-colors"
                  >
                    LINKEDIN ↗
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StudioNavbar;
