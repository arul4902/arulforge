import React, { useRef } from 'react';
import MaskedHeading from '../common/MaskedHeading';
import FadeIn from '../common/FadeIn';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

interface ServiceItem {
  number: string;
  name: string;
  description: string;
}

const servicesList: ServiceItem[] = [
  {
    number: '01',
    name: 'FULL STACK DEVELOPMENT',
    description:
      'Building complete web applications with modern frontend interfaces, scalable backend systems, APIs and database integration.',
  },
  {
    number: '02',
    name: 'FRONTEND DEVELOPMENT',
    description:
      'Creating responsive and polished digital experiences using React, Angular, HTML, CSS and modern UI development practices.',
  },
  {
    number: '03',
    name: 'BACKEND & API DEVELOPMENT',
    description:
      'Developing scalable backend services with Spring Boot, REST APIs, optimized database interactions and robust application architecture.',
  },
  {
    number: '04',
    name: 'PREMIUM WEB EXPERIENCES',
    description:
      'Building modern, conversion-focused websites combining strong engineering with premium UI/UX, responsive layouts and smooth interactions.',
  },
  {
    number: '05',
    name: 'AI INTEGRATION',
    description:
      'Integrating AI-powered functionality, prompt engineering and GPT APIs into modern applications to create smarter digital experiences.',
  },
];

interface ServiceRowProps {
  service: ServiceItem;
  index: number;
}

const ServiceRow: React.FC<ServiceRowProps> = ({ service, index }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ['start end', 'end start'],
  });

  // Number moves slightly with scroll (differential parallax)
  const numberX = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [-25, 25]
  );

  return (
    <FadeIn delay={index * 0.08} y={30}>
      <div
        ref={rowRef}
        className="flex flex-col md:flex-row md:items-center justify-between py-10 sm:py-14 md:py-16 border-b border-[#0C0C0C]/15 gap-6 md:gap-12 group hover:bg-[#0C0C0C]/[0.02] transition-colors duration-300"
      >
        {/* Left Number with horizontal scroll translation */}
        <div className="shrink-0 w-32 sm:w-44 md:w-56 overflow-visible">
          <motion.span
            style={{
              x: numberX,
              fontSize: 'clamp(3rem, 10vw, 140px)',
            }}
            className="inline-block font-black leading-none text-[#0C0C0C] font-kanit select-none opacity-80 group-hover:opacity-100 transition-opacity"
          >
            {service.number}
          </motion.span>
        </div>

        {/* Right Content */}
        <div className="flex-1 flex flex-col justify-center">
          <h3
            style={{ fontSize: 'clamp(1.2rem, 2.2vw, 2.1rem)' }}
            className="font-medium uppercase tracking-tight text-[#0C0C0C] mb-3 group-hover:translate-x-2 transition-transform duration-300 font-kanit"
          >
            {service.name}
          </h3>
          <p
            style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
            className="font-light leading-relaxed max-w-2xl text-[#0C0C0C]/60 font-kanit"
          >
            {service.description}
          </p>
        </div>
      </div>
    </FadeIn>
  );
};

export const ServicesSection: React.FC = () => {
  return (
    <section
      id="services"
      className="bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-16 py-20 sm:py-24 md:py-28 relative z-20 shadow-[0_-20px_60px_rgba(0,0,0,0.5)]"
      aria-label="Services Offered"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Masked SERVICES Heading */}
        <div className="text-center mb-16 sm:mb-24">
          <MaskedHeading
            text="SERVICES"
            as="h2"
            isLightSection={true}
            className="font-black uppercase tracking-tight leading-none text-[clamp(3rem,12vw,160px)]"
          />
        </div>

        {/* 5 Service Rows with Parallax Typography */}
        <div className="border-t border-[#0C0C0C]/15">
          {servicesList.map((service, index) => (
            <ServiceRow
              key={service.number}
              service={service}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
