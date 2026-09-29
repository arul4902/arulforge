import React, { useRef, useState } from 'react';
import MaskedHeading from '../common/MaskedHeading';
import FadeIn from '../common/FadeIn';
import {
  Code,
  Lightbulb,
  Sparkles,
  Zap,
  CheckSquare,
} from 'lucide-react';
import { useReducedMotion } from 'framer-motion';

interface PhilosophyItem {
  id: string;
  title: string;
  quote: string;
  icon: React.ReactNode;
}

const philosophyItems: PhilosophyItem[] = [
  {
    id: 'engineering',
    title: 'ENGINEERING MINDSET',
    quote:
      'I think beyond the interface and consider APIs, databases, performance and maintainability.',
    icon: <Code className="w-5 h-5 text-[#BBCCD7]" />,
  },
  {
    id: 'product',
    title: 'PRODUCT THINKING',
    quote:
      'I focus on why a feature exists, not just how to build it. Every line of code should serve the user.',
    icon: <Lightbulb className="w-5 h-5 text-[#BBCCD7]" />,
  },
  {
    id: 'design',
    title: 'DESIGN AWARENESS',
    quote:
      'I care about how the final product looks, feels and communicates to the user.',
    icon: <Sparkles className="w-5 h-5 text-[#BBCCD7]" />,
  },
  {
    id: 'performance',
    title: 'PERFORMANCE',
    quote:
      'Optimizing backend requests, latency and frontend responsiveness to create faster digital experiences.',
    icon: <Zap className="w-5 h-5 text-[#BBCCD7]" />,
  },
  {
    id: 'problem-solving',
    title: 'PROBLEM SOLVING',
    quote:
      'Logical problem-solving backed by experience solving 150+ Data Structures and Algorithms problems.',
    icon: <CheckSquare className="w-5 h-5 text-[#BBCCD7]" />,
  },
];

const TiltCard: React.FC<{ item: PhilosophyItem; index: number }> = ({ item, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    setRotate({ x: -y * 8, y: x * 8 });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1000px',
      }}
      className="h-full"
    >
      <div
        style={{
          transform: isHovered
            ? `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateZ(10px)`
            : 'rotateX(0deg) rotateY(0deg) translateZ(0px)',
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
        className="h-full rounded-[28px] sm:rounded-[36px] border border-[#D7E2EA]/15 bg-[#121212]/70 p-6 sm:p-8 backdrop-blur-md flex flex-col justify-between group hover:border-[#D7E2EA]/40 hover:bg-[#161616] transition-colors duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
      >
        <div>
          <div className="w-12 h-12 rounded-2xl bg-[#1C1C1C] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-[#D7E2EA]/10">
            {item.icon}
          </div>
          <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-[#D7E2EA] mb-4 font-kanit">
            {item.title}
          </h3>
          <p className="text-sm sm:text-base font-light text-[#D7E2EA]/75 leading-relaxed font-kanit">
            "{item.quote}"
          </p>
        </div>

        <div className="pt-6 mt-6 border-t border-[#D7E2EA]/10 flex items-center justify-between">
          <span className="text-xs font-semibold tracking-widest text-[#646973] uppercase">
            0{index + 1}
          </span>
          <div className="w-2 h-2 rounded-full bg-[#646973]/30 group-hover:bg-[#7621B0] transition-colors" />
        </div>
      </div>
    </div>
  );
};

export const PhilosophySection: React.FC = () => {
  return (
    <section
      className="py-24 sm:py-32 px-5 sm:px-8 md:px-16 relative bg-[#0C0C0C] border-t border-[#D7E2EA]/10"
      aria-label="Engineering Philosophy"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Main Statement with Masked Reveal */}
        <div className="max-w-5xl mx-auto text-center mb-16 sm:mb-24">
          <FadeIn delay={0} y={20}>
            <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#B600A8] uppercase block mb-4">
              CORE PHILOSOPHY
            </span>
          </FadeIn>
          <MaskedHeading
            text='"BRIDGING THE GAP BETWEEN ROBUST SOFTWARE ENGINEERING AND PREMIUM DIGITAL DESIGN."'
            as="h2"
            className="font-black uppercase tracking-tight leading-tight text-[clamp(1.75rem,4.5vw,4rem)]"
          />
        </div>

        {/* 5 Philosophy Cards with 3D Physics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {philosophyItems.map((item, index) => (
            <FadeIn
              key={item.id}
              delay={index * 0.08}
              y={30}
              className={index === 4 ? 'md:col-span-2 lg:col-span-1' : ''}
            >
              <TiltCard item={item} index={index} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
