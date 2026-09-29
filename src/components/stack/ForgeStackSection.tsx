import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { forgeStack } from '../../data/forgeConfig';
import type { TechItem } from '../../data/forgeConfig';
import { useCursor } from '../../context/CursorContext';
import { Cpu, Terminal, Database, Sparkles, Cloud, Wrench } from 'lucide-react';

export const ForgeStackSection: React.FC = () => {
  const [activeItem, setActiveItem] = useState<TechItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const { setCursor, resetCursor } = useCursor();

  const categories = [
    { key: 'ALL', label: 'ALL TOOLS', icon: Terminal },
    { key: 'FRONTEND', label: 'FRONTEND', icon: Cpu },
    { key: 'BACKEND', label: 'BACKEND', icon: Terminal },
    { key: 'DATA', label: 'DATA', icon: Database },
    { key: 'AI', label: 'AI SYSTEMS', icon: Sparkles },
    { key: 'CLOUD', label: 'CLOUD & DEPLOY', icon: Cloud },
    { key: 'WORKFLOW', label: 'WORKFLOW', icon: Wrench },
  ];

  // Infinite marquee items list duplicated for smooth loop
  const marqueeItems = [...forgeStack, ...forgeStack];

  const filteredItems = activeCategory === 'ALL'
    ? forgeStack
    : forgeStack.filter((item) => item.category === activeCategory);

  return (
    <section id="stack" className="relative py-28 md:py-40 bg-[#070A12] border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#00D4FF] tracking-[0.25em] uppercase mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00D4FF]" />
              <span>PRODUCTION ARSENAL // TOOLING</span>
            </div>
            <h2 className="section-title-clamp font-display font-black text-[#F7FAFC] tracking-tighter uppercase leading-[0.95]">
              THE <br />
              <span className="text-gradient-cyan">FORGE STACK.</span>
            </h2>
          </div>

          <p className="font-mono text-xs sm:text-sm text-[#8D96A8] max-w-md leading-relaxed">
            &ldquo;Tools change. Craft doesn&rsquo;t. These are some of the technologies currently inside the forge.&rdquo;
          </p>
        </div>
      </div>

      {/* INFINITE DRAGGABLE HORIZONTAL TECHNOLOGY BELT */}
      <div className="my-16 relative">
        {/* Left & Right Fade Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#070A12] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#070A12] to-transparent z-10 pointer-events-none" />

        <div
          className="overflow-x-auto scrollbar-none py-6 cursor-grab active:cursor-grabbing select-none"
          onMouseEnter={() => setCursor('drag')}
          onMouseLeave={resetCursor}
        >
          <motion.div
            className="flex items-center gap-8 md:gap-12 whitespace-nowrap px-8 w-max"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              repeat: Infinity,
              ease: 'linear',
              duration: 35,
            }}
          >
            {marqueeItems.map((tech, index) => {
              const isHovered = activeItem?.name === tech.name;
              const hasActive = activeItem !== null;

              return (
                <div
                  key={`${tech.name}-${index}`}
                  onMouseEnter={() => setActiveItem(tech)}
                  onMouseLeave={() => setActiveItem(null)}
                  className={`flex items-center gap-4 transition-all duration-300 ${
                    hasActive && !isHovered ? 'opacity-30 blur-[0.5px]' : 'opacity-100'
                  }`}
                >
                  <span
                    className={`font-display text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight transition-colors duration-200 ${
                      isHovered ? 'text-[#00D4FF] scale-105' : 'text-[#F7FAFC]'
                    }`}
                  >
                    {tech.name}
                  </span>

                  {/* Category metadata badge */}
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#101522] border border-white/10 text-[#8D96A8] tracking-widest uppercase">
                    [ {tech.category} / {tech.role} ]
                  </span>

                  <span className="text-[#00D4FF]/40 text-xl font-bold select-none">—</span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* CATEGORIZED SPECIFICATION MATRIX */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mt-12">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-6 border-b border-white/10">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                onMouseEnter={() => setCursor('default')}
                onMouseLeave={resetCursor}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs tracking-wider transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-[#00D4FF] text-[#070A12] font-bold shadow-[0_0_15px_rgba(0,212,255,0.3)]'
                    : 'bg-[#101522] text-[#8D96A8] hover:text-[#F7FAFC] border border-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Structured Grid Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.name}
              onMouseEnter={() => {
                setActiveItem(item);
                setCursor('default');
              }}
              onMouseLeave={() => {
                setActiveItem(null);
                resetCursor();
              }}
              className="p-5 rounded-xl bg-[#0E1322] border border-white/10 hover:border-[#00D4FF]/40 transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <span className="font-mono text-[9px] text-[#00D4FF] tracking-widest uppercase block mb-1">
                  {item.category}
                </span>
                <h4 className="font-display text-lg sm:text-xl font-bold text-[#F7FAFC] group-hover:text-[#00D4FF] transition-colors">
                  {item.name}
                </h4>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 font-mono text-[11px] text-[#8D96A8]">
                {item.role}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ForgeStackSection;
