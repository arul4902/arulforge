import React from 'react';
import FadeIn from '../common/FadeIn';
import AnimatedText from '../common/AnimatedText';
import ContactButton from '../common/ContactButton';
import { motion, useReducedMotion } from 'framer-motion';

export const AboutSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const exactAboutText =
    "I'm Arul S, a Full Stack Developer focused on building scalable web applications and premium digital experiences. I combine strong software engineering with thoughtful design, working across frontend interfaces, backend systems, REST APIs, databases and AI-powered experiences. I enjoy turning ideas into functional, polished products that are built to perform.";

  const pillars = ['ENGINEER.', 'ARCHITECT.', 'CREATOR.'];

  return (
    <section
      id="about"
      className="min-h-screen flex flex-col justify-center items-center px-5 sm:px-8 md:px-16 py-24 sm:py-32 relative bg-[#0C0C0C]"
      aria-label="About Arul S."
    >
      <div className="max-w-4xl mx-auto w-full flex flex-col items-center text-center">
        {/* Massive Gradient Heading */}
        <FadeIn delay={0} y={40} className="w-full mb-12 sm:mb-16">
          <h2
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
            className="hero-heading font-black uppercase leading-none tracking-tight text-center select-none"
          >
            ABOUT ME
          </h2>
        </FadeIn>

        {/* Character-by-character scroll reveal text */}
        <div className="mb-14 sm:mb-18 w-full flex justify-center">
          <AnimatedText
            text={exactAboutText}
            offset={['start 0.8', 'end 0.2']}
            className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[720px] text-[clamp(1rem,2vw,1.35rem)] font-kanit"
          />
        </div>

        {/* ENGINEER. ARCHITECT. CREATOR. with subtle staggered entrance */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 md:gap-8 mb-14 select-none">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar}
              initial={{
                opacity: 0,
                y: shouldReduceMotion ? 0 : 25,
                scale: 0.95,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{
                duration: 0.6,
                delay: idx * 0.15,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="px-4 py-2 sm:px-6 sm:py-2.5 rounded-full border border-[#D7E2EA]/20 bg-[#161616] text-[#D7E2EA] font-bold text-xs sm:text-sm md:text-base tracking-[0.2em] uppercase backdrop-blur-md"
            >
              <span className="text-[#B600A8] mr-1.5">•</span>
              {pillar}
            </motion.div>
          ))}
        </div>

        {/* Contact Me Button */}
        <FadeIn delay={0.3} y={20}>
          <ContactButton text="CONTACT ME" href="#contact" />
        </FadeIn>
      </div>
    </section>
  );
};

export default AboutSection;
