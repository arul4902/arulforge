import React from 'react';
import { motion } from 'framer-motion';
import { principles } from '../../data/forgeConfig';

export const WhyArulForgeSection: React.FC = () => {
  return (
    <section className="relative py-28 md:py-40 bg-[#070A12] border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Eyebrow */}
        <div className="flex items-center gap-2 font-mono text-xs text-[#00D4FF] tracking-[0.25em] uppercase mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00D4FF]" />
          <span>ENGINEERING INTEGRITY // DIFFERENTIATION</span>
        </div>

        {/* Huge Heroic Statement */}
        <div className="mb-20 md:mb-28">
          <h2 className="section-title-clamp font-display font-black text-[#F7FAFC] tracking-tighter uppercase leading-[0.92]">
            NOT JUST <br />
            <span className="text-gradient-cyan">ANOTHER WEBSITE.</span>
          </h2>
          <p className="mt-6 text-base sm:text-xl text-[#8D96A8] max-w-2xl font-normal leading-relaxed">
            The web is flooded with interchangeable templates, bloated site builders, and sluggish code. ArulForge is founded on an opposite philosophy.
          </p>
        </div>

        {/* Four Principles Surrounding the Philosophy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative p-8 md:p-10 rounded-2xl bg-[#0E1322] border border-white/10 hover:border-[#00D4FF]/40 transition-all duration-300 group shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                  <span className="font-mono text-xs text-[#00D4FF] tracking-widest font-bold">
                    PRINCIPLE // {principle.id}
                  </span>
                  <span className="h-2 w-2 rounded-full bg-white/20 group-hover:bg-[#00D4FF] group-hover:shadow-[0_0_8px_#00D4FF] transition-all" />
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#F7FAFC] tracking-tight group-hover:text-[#00D4FF] transition-colors uppercase">
                  {principle.title}
                </h3>

                <p className="mt-3 font-mono text-xs sm:text-sm text-[#00D4FF] font-semibold">
                  &ldquo;{principle.subtitle}&rdquo;
                </p>

                <p className="mt-4 text-sm sm:text-base text-[#8D96A8] leading-relaxed font-normal">
                  {principle.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[10px] text-[#8D96A8]">
                <span>ARULFORGE CORE LAW</span>
                <span className="text-[#F7FAFC]">VERIFIED</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyArulForgeSection;
