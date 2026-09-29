import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { capabilities } from '../../data/forgeConfig';
import { useCursor } from '../../context/CursorContext';
import { ArrowUpRight, Plus, Minus } from 'lucide-react';

export const CapabilitiesSection: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [expandedMobileIdx, setExpandedMobileIdx] = useState<number | null>(null);
  const { setCursor, resetCursor } = useCursor();

  return (
    <section id="capabilities" className="relative py-28 md:py-40 bg-[#070A12] border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16 md:pb-24 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#00D4FF] tracking-[0.25em] uppercase mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00D4FF]" />
              <span>CAPABILITY MATRIX // CORE DISCIPLINES</span>
            </div>
            <h2 className="section-title-clamp font-display font-black text-[#F7FAFC] tracking-tighter uppercase leading-[0.95]">
              WHAT <br />
              <span className="text-gradient-cyan">WE FORGE.</span>
            </h2>
          </div>

          <p className="font-mono text-xs text-[#8D96A8] max-w-sm leading-relaxed">
            Zero generic templates. Every capability represents a dedicated engineering and visual craft pipeline custom-tailored to commercial objectives.
          </p>
        </div>

        {/* Five Huge Interactive Rows */}
        <div className="divide-y divide-white/10">
          {capabilities.map((item, idx) => {
            const isHovered = hoveredIdx === idx;
            const isExpanded = expandedMobileIdx === idx;

            return (
              <div
                key={item.number}
                className="relative py-8 md:py-14 transition-colors duration-300 group cursor-pointer"
                onMouseEnter={() => {
                  setHoveredIdx(idx);
                  setCursor('explore');
                }}
                onMouseLeave={() => {
                  setHoveredIdx(null);
                  resetCursor();
                }}
                onClick={() => setExpandedMobileIdx(isExpanded ? null : idx)}
              >
                {/* Background glow strip on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-[#00D4FF]/5 via-transparent to-transparent transition-opacity duration-300 pointer-events-none ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                  {/* Left: Number + Title */}
                  <div className="flex items-baseline gap-6 md:gap-10 transition-transform duration-300 group-hover:translate-x-4">
                    <span
                      className={`font-mono text-xl md:text-3xl font-bold transition-all duration-300 inline-block ${
                        isHovered ? 'text-[#00D4FF] rotate-6 scale-110' : 'text-[#8D96A8]'
                      }`}
                    >
                      {item.number}
                    </span>

                    <div>
                      <h3 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#F7FAFC] group-hover:text-[#00D4FF] transition-colors uppercase">
                        {item.title}
                      </h3>
                      <p className="text-sm md:text-base text-[#8D96A8] mt-2 font-normal max-w-xl group-hover:text-[#F7FAFC]/90 transition-colors">
                        &ldquo;{item.tagline}&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* Right Desktop: Tags & Arrow */}
                  <div className="hidden md:flex items-center gap-6">
                    <div className="flex flex-wrap gap-2 justify-end max-w-xs">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded bg-[#101522] border border-white/10 font-mono text-[10px] text-[#8D96A8]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div
                      className={`w-12 h-12 rounded-full border border-white/20 flex items-center justify-center transition-all duration-300 ${
                        isHovered
                          ? 'bg-[#00D4FF] text-[#070A12] border-[#00D4FF] translate-x-1 shadow-[0_0_15px_rgba(0,212,255,0.4)]'
                          : 'text-[#8D96A8] bg-transparent'
                      }`}
                    >
                      <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />
                    </div>
                  </div>

                  {/* Mobile toggle indicator */}
                  <div className="md:hidden flex items-center justify-between pt-2 border-t border-white/5">
                    <span className="font-mono text-[10px] text-[#00D4FF]">DETAILS</span>
                    {isExpanded ? <Minus className="w-4 h-4 text-[#00D4FF]" /> : <Plus className="w-4 h-4 text-[#8D96A8]" />}
                  </div>
                </div>

                {/* Mobile Expanded Details Drawer */}
                <AnimatePresence>
                  {(isExpanded || isHovered) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden pt-4 md:pt-6"
                    >
                      <p className="text-xs sm:text-sm text-[#8D96A8] leading-relaxed max-w-3xl">
                        {item.description}
                      </p>
                      <div className="flex md:hidden flex-wrap gap-2 mt-3">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded bg-[#101522] border border-white/10 font-mono text-[9px] text-[#00D4FF]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Cyan Bottom Growing Line on Hover */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#00D4FF] shadow-[0_0_8px_#00D4FF] transition-all duration-500 origin-left ${
                    isHovered ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
