import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

export const AboutDeconstruction: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Deconstruction physics based on scroll progress
  // 0.0 -> Assembled, 0.4-0.6 -> Deconstructed (disassembled), 0.9 -> Reassembled
  const topBorderY = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, -55, 0]);
  const bottomBorderY = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 55, 0]);
  const leftBracketX = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, -65, 0]);
  const rightBracketX = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 65, 0]);
  const innerRevealScale = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0.94, 1.02, 1]);
  const innerRevealOpacity = useTransform(scrollYProgress, [0.2, 0.45], [0.3, 1]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="min-h-screen py-24 sm:py-36 px-5 sm:px-8 md:px-16 relative bg-[#0C0C0C] flex items-center justify-center select-none"
      aria-label="About the Software Engineer"
    >
      <div className="max-w-5xl mx-auto w-full relative">
        {/* DISASSEMBLING PHYSICAL BRACKETS */}
        {/* Top Border Bar */}
        <motion.div
          style={{ y: shouldReduceMotion ? 0 : topBorderY }}
          className="w-full h-1 bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent mb-6 shadow-[0_0_15px_#00F0FF]"
        />

        <div className="relative flex flex-col md:flex-row items-center gap-10 p-6 sm:p-12">
          {/* Left Bracket */}
          <motion.div
            style={{ x: shouldReduceMotion ? 0 : leftBracketX }}
            className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-[#00F0FF]/50 rounded-full hidden md:block"
          />

          {/* Right Bracket */}
          <motion.div
            style={{ x: shouldReduceMotion ? 0 : rightBracketX }}
            className="absolute right-0 top-1/4 bottom-1/4 w-1 bg-[#00F0FF]/50 rounded-full hidden md:block"
          />

          {/* Core Content Revealed Inside the Disassembled Aperture */}
          <motion.div
            style={{
              scale: shouldReduceMotion ? 1 : innerRevealScale,
              opacity: shouldReduceMotion ? 1 : innerRevealOpacity,
            }}
            className="flex-1 flex flex-col items-center text-center"
          >
            {/* The Visual Message */}
            <div className="font-mono text-xs sm:text-sm tracking-[0.4em] uppercase text-[#00F0FF] font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
              LOOK BEYOND THE INTERFACE.
            </div>

            <h2 className="font-kanit font-black text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white mb-6">
              ENGINEERED FROM SYSTEM CORE TO CLIENT SURFACE
            </h2>

            <p className="font-kanit text-[#D7E2EA] font-normal text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mb-8">
              I'm Arul S, a Full Stack Developer focused on building scalable web applications and
              premium digital experiences. I combine strong software engineering with thoughtful
              design, working across frontend interfaces, backend systems, REST APIs, databases
              and AI-powered experiences. I enjoy turning ideas into functional, polished products
              that are built to perform.
            </p>

            {/* Forge Disciplines */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 font-mono text-xs text-[#00F0FF]">
              <span className="px-4 py-2 rounded-full border border-[#00F0FF]/30 bg-[#00F0FF]/[0.06]">
                [JAVA &amp; SPRING BOOT]
              </span>
              <span className="px-4 py-2 rounded-full border border-[#00F0FF]/30 bg-[#00F0FF]/[0.06]">
                [REACT &amp; ANGULAR]
              </span>
              <span className="px-4 py-2 rounded-full border border-[#00F0FF]/30 bg-[#00F0FF]/[0.06]">
                [REST APIS &amp; MYSQL]
              </span>
              <span className="px-4 py-2 rounded-full border border-[#00F0FF]/30 bg-[#00F0FF]/[0.06]">
                [AI INTEGRATION]
              </span>
            </div>
          </motion.div>
        </div>

        {/* Bottom Border Bar */}
        <motion.div
          style={{ y: shouldReduceMotion ? 0 : bottomBorderY }}
          className="w-full h-1 bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent mt-6 shadow-[0_0_15px_#00F0FF]"
        />
      </div>
    </section>
  );
};

export default AboutDeconstruction;
