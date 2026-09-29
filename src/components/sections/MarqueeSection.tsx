import React, { useRef, useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';

interface MarqueeTile {
  title: string;
  category: string;
  image?: string;
  gradient?: string;
  accentColor?: string;
}

const row1Items: MarqueeTile[] = [
  {
    title: 'FULL STACK DEVELOPMENT',
    category: 'Architecture',
    image: '/projects/farm2factory_1.jpg',
  },
  {
    title: 'REACT',
    category: 'Frontend Library',
    image: '/projects/mock_interview_1.jpg',
  },
  {
    title: 'ANGULAR',
    category: 'Enterprise UI',
    image: '/projects/detail_code.jpg',
  },
  {
    title: 'SPRING BOOT',
    category: 'Backend Microservices',
    image: '/projects/detail_code.jpg',
  },
  {
    title: 'REST APIs',
    category: 'API Design & Testing',
    image: '/projects/detail_analytics.jpg',
  },
  {
    title: 'MYSQL',
    category: 'Relational Database',
    image: '/projects/farm2factory_1.jpg',
  },
  {
    title: 'JAVA',
    category: 'Core Language',
    image: '/projects/detail_code.jpg',
  },
  {
    title: 'JAVASCRIPT',
    category: 'Modern ES6+ / TS',
    image: '/projects/black_trendz_1.jpg',
  },
  {
    title: 'AI INTEGRATION',
    category: 'GenAI & LLM Services',
    image: '/projects/mock_interview_1.jpg',
  },
  {
    title: 'GPT APIs',
    category: 'Prompt Engineering',
    image: '/projects/detail_analytics.jpg',
  },
];

const row2Items: MarqueeTile[] = [
  {
    title: 'AWS CLOUD',
    category: 'EC2 & S3 Infrastructure',
    image: '/projects/farm2factory_1.jpg',
  },
  {
    title: 'WEB APPLICATIONS',
    category: 'Scalable Systems',
    image: '/projects/black_trendz_1.jpg',
  },
  {
    title: 'BUSINESS WEBSITES',
    category: 'Conversion-Focused',
    image: '/projects/hvac_1.jpg',
  },
  {
    title: 'UI/UX DESIGN',
    category: 'Creative Aesthetic',
    image: '/projects/basil_town_1.jpg',
  },
  {
    title: 'PERFORMANCE',
    category: 'Latency & Core Vitals',
    image: '/projects/detail_analytics.jpg',
  },
  {
    title: 'SYSTEM ARCHITECTURE',
    category: 'Reliability & Scale',
    image: '/projects/plumbing_1.jpg',
  },
  {
    title: 'GITHUB',
    category: 'Version Control & CI',
    image: '/projects/detail_code.jpg',
  },
  {
    title: 'POSTMAN',
    category: 'API Validation',
    image: '/projects/roofing_1.jpg',
  },
  {
    title: 'RESPONSIVE DESIGN',
    category: 'Mobile First',
    image: '/projects/detail_mobile.jpg',
  },
  {
    title: 'CREATIVE DEVELOPMENT',
    category: 'Awwwards-Tier Polish',
    image: '/projects/mock_interview_1.jpg',
  },
];

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const sectionTop = rect.top + window.scrollY;
            // Calculate scroll offset: (window.scrollY - sectionTop + window.innerHeight) * 0.3
            const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
            setScrollOffset(offset);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [shouldReduceMotion]);

  // Triple array for infinite seamless scrolling
  const tripledRow1 = [...row1Items, ...row1Items, ...row1Items];
  const tripledRow2 = [...row2Items, ...row2Items, ...row2Items];

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] pt-24 sm:pt-28 md:pt-32 pb-10 overflow-hidden relative"
      aria-label="Developer Visual Marquee"
    >
      <div className="space-y-4 sm:space-y-6">
        {/* ROW 1: moves RIGHT based on scroll */}
        <div
          style={{
            transform: shouldReduceMotion
              ? 'none'
              : `translate3d(${-1200 + scrollOffset}px, 0, 0)`,
            willChange: 'transform',
          }}
          className="flex gap-3 sm:gap-4 items-center transition-transform duration-75 ease-out"
        >
          {tripledRow1.map((item, idx) => (
            <div
              key={`r1-${idx}`}
              className="w-[280px] h-[180px] sm:w-[350px] sm:h-[225px] md:w-[420px] md:h-[270px] shrink-0 rounded-2xl relative overflow-hidden group border border-[#D7E2EA]/15 bg-[#141414] select-none"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent p-5 sm:p-6 flex flex-col justify-end">
                <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-[#BBCCD7]/70 uppercase mb-1">
                  {item.category}
                </span>
                <h4 className="text-base sm:text-lg md:text-xl font-black uppercase text-[#D7E2EA] tracking-tight font-kanit">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

        {/* ROW 2: moves LEFT based on scroll */}
        <div
          style={{
            transform: shouldReduceMotion
              ? 'none'
              : `translate3d(${-200 - scrollOffset}px, 0, 0)`,
            willChange: 'transform',
          }}
          className="flex gap-3 sm:gap-4 items-center transition-transform duration-75 ease-out"
        >
          {tripledRow2.map((item, idx) => (
            <div
              key={`r2-${idx}`}
              className="w-[280px] h-[180px] sm:w-[350px] sm:h-[225px] md:w-[420px] md:h-[270px] shrink-0 rounded-2xl relative overflow-hidden group border border-[#D7E2EA]/15 bg-[#141414] select-none"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent p-5 sm:p-6 flex flex-col justify-end">
                <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-[#BBCCD7]/70 uppercase mb-1">
                  {item.category}
                </span>
                <h4 className="text-base sm:text-lg md:text-xl font-black uppercase text-[#D7E2EA] tracking-tight font-kanit">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarqueeSection;
