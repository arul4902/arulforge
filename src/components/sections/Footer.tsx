import React from 'react';
import { ArrowUp, FileText } from 'lucide-react';
import Magnet from '../common/Magnet';

const LinkedInIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const GitHubIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'ABOUT', href: '#about' },
    { label: 'EXPERIENCE', href: '#experience' },
    { label: 'SERVICES', href: '#services' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'CONTACT', href: '#contact' },
  ];

  const socialLinks = [
    {
      label: 'LINKEDIN',
      href: 'https://linkedin.com/',
      icon: <LinkedInIcon />,
    },
    {
      label: 'GITHUB',
      href: 'https://github.com/',
      icon: <GitHubIcon />,
    },
    {
      label: 'RESUME',
      href: '#',
      icon: <FileText className="w-4 h-4" />,
    },
  ];

  return (
    <footer
      className="bg-[#0C0C0C] text-[#D7E2EA] pt-20 pb-12 px-5 sm:px-8 md:px-16 border-t border-[#D7E2EA]/10 relative z-20"
      aria-label="Footer"
    >
      <div className="max-w-[1500px] mx-auto">
        {/* Top Footer Row */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-12 pb-16 border-b border-[#D7E2EA]/10">
          {/* Large Branding and Subtitle */}
          <div className="max-w-md">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#D7E2EA] mb-4 font-kanit">
              ARUL S.
            </h2>
            <p className="text-sm sm:text-base font-light text-[#BBCCD7]/70 leading-relaxed font-kanit">
              Full Stack Developer building scalable web applications and premium digital experiences.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-[#646973] mb-4">
              NAVIGATION
            </h3>
            <div className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm sm:text-base font-medium uppercase tracking-wider text-[#D7E2EA] hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Connect Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-[#646973] mb-4">
              CONNECT
            </h3>
            <div className="flex flex-col gap-2.5">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm sm:text-base font-medium uppercase tracking-wider text-[#D7E2EA] hover:text-white transition-colors"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Back to Top */}
          <div className="flex items-start lg:justify-end">
            <Magnet strength={4} padding={50}>
              <button
                onClick={scrollToTop}
                className="flex items-center gap-2 px-5 py-3 rounded-full border border-[#D7E2EA]/20 bg-[#141414] text-xs font-semibold uppercase tracking-wider text-[#BBCCD7] hover:border-white hover:text-white transition-all cursor-pointer"
                aria-label="Back to Top"
              >
                <span>TOP</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </Magnet>
          </div>
        </div>

        {/* Bottom Footer Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-[#646973] font-kanit">
          <p>© 2026 Arul S. All rights reserved.</p>
          <p className="font-semibold tracking-[0.18em] uppercase text-[#BBCCD7]/60">
            ENGINEERED &amp; DESIGNED WITH PRECISION.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
