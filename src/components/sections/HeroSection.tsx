import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import ForgeMachineGrid from '../forge/ForgeMachineGrid';
import CuttingHeroTypography from '../forge/CuttingHeroTypography';
import DigitalWelding from '../forge/DigitalWelding';
import HeroInteractivePortrait from '../hero/HeroInteractivePortrait';
import ContactButton from '../common/ContactButton';
import { Menu, X } from 'lucide-react';

interface HeroSectionProps {
  hasLoaded?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ hasLoaded = true }) => {
  const shouldReduceMotion = useReducedMotion();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('ABOUT');
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'ABOUT', href: '#about' },
    { label: 'EXPERIENCE', href: '#experience' },
    { label: 'SERVICES', href: '#services' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'SKILLS', href: '#skills' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <header
      ref={heroRef}
      className="min-h-screen flex flex-col justify-between relative overflow-x-clip bg-[#0C0C0C]"
    >
      {/* INVISIBLE DIGITAL MACHINE GRID (Replaces generic particle background) */}
      <ForgeMachineGrid />

      {/* FLOATING COMPACT GLASS PILL NAVBAR */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 sm:p-6 pointer-events-none">
        <motion.nav
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
          className={`pointer-events-auto transition-all duration-500 ease-out flex items-center justify-between ${
            scrolled
              ? 'px-5 py-2.5 sm:px-7 sm:py-3 rounded-full bg-[#121212]/85 border border-[#00F0FF]/30 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.8)] max-w-2xl w-full'
              : 'px-6 py-4 sm:px-10 sm:py-6 rounded-none bg-transparent border-transparent w-full max-w-[1600px]'
          }`}
          aria-label="Main Navigation"
        >
          {/* Logo Branding: ARULFORGE */}
          <a
            href="#"
            className="flex items-center gap-2 group"
          >
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF] animate-pulse" />
            <span className="text-base sm:text-lg lg:text-[1.3rem] font-black uppercase tracking-widest text-[#D7E2EA] font-kanit group-hover:text-white transition-colors">
              ARUL<span className="text-[#00F0FF]">FORGE</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setActiveLink(link.label)}
                className={`relative text-xs sm:text-sm lg:text-[1.05rem] font-medium uppercase tracking-wider transition-all duration-300 hover:text-white ${
                  activeLink === link.label ? 'text-white' : 'text-[#D7E2EA]/75'
                }`}
              >
                <span>{link.label}</span>
                {activeLink === link.label && (
                  <motion.div
                    layoutId="navPill"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#00F0FF] rounded-full shadow-[0_0_8px_#00F0FF]"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#D7E2EA] p-1.5 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </motion.nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
            className="pointer-events-auto md:hidden absolute top-20 left-4 right-4 bg-[#141414]/95 backdrop-blur-2xl border border-[#00F0FF]/30 rounded-3xl p-6 shadow-2xl flex flex-col gap-4"
          >
            {navLinks.map((link, idx) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 + 0.1 }}
                onClick={() => {
                  setActiveLink(link.label);
                  setMobileMenuOpen(false);
                }}
                className="text-base font-semibold uppercase tracking-wider text-[#D7E2EA] hover:text-[#00F0FF] py-1 flex items-center justify-between font-mono"
              >
                <span>{link.label}</span>
                <span className="text-xs text-[#00F0FF]">0{idx + 1}</span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </div>

      {/* CENTER HERO AREA: The Cutting Typography + Arul's Portrait */}
      <div className="relative flex-1 flex flex-col justify-center items-center pt-28 sm:pt-32 md:pt-36 pb-12 sm:pb-16 z-10">
        {/* CUTTING HERO TYPOGRAPHY: Slices on Cursor Traversal */}
        <CuttingHeroTypography />

        {/* 3D CURSOR-TRACKING PORTRAIT OF ARUL */}
        <div className="w-[260px] sm:w-[340px] md:w-[420px] lg:w-[460px] mt-6 sm:mt-8 pointer-events-auto">
          <HeroInteractivePortrait />
        </div>

        {/* DIGITAL WELDING INTERACTION: Disconnected fragments magnetically pull together */}
        <DigitalWelding />
      </div>

      {/* BOTTOM HERO CONTENT: Left descriptor + Right CTA */}
      <div className="relative z-20 px-6 md:px-12 pb-8 sm:pb-12 max-w-[1600px] w-full mx-auto flex items-end justify-between gap-6">
        {/* Left technical descriptor */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
          animate={hasLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.65, ease: [0.25, 1, 0.5, 1] }}
          className="max-w-[180px] sm:max-w-[240px] md:max-w-[300px]"
        >
          <div className="font-mono text-[10px] sm:text-xs text-[#00F0FF] uppercase tracking-widest mb-1">
            // FORGE ARCHITECTURE
          </div>
          <p
            style={{ fontSize: 'clamp(0.75rem, 1.3vw, 1.4rem)' }}
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug font-kanit"
          >
            ARUL S. — FULL STACK DEVELOPER MANUFACTURING RESILIENT WEB PLATFORMS
          </p>
        </motion.div>

        {/* Right Contact Button */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30, scale: 0.95 }}
          animate={hasLoaded ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{
            duration: 0.9,
            delay: 0.85,
            ease: [0.34, 1.56, 0.64, 1],
          }}
        >
          <ContactButton text="COMMISSION FORGE" href="#contact" />
        </motion.div>
      </div>
    </header>
  );
};

export default HeroSection;
