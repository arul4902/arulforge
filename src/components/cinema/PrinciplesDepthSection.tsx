import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const PrinciplesDepthSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Parallax depth speeds for each line of the headline
  const line1Y = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const line2Y = useTransform(scrollYProgress, [0, 1], [0, 0]);
  const line3Y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const principlesList = [
    {
      num: '01',
      title: 'BUILT AROUND YOUR BRAND',
      detail: 'Zero recycled templates. Every layout, typography scale, and interaction system is forged specifically for your audience and brand authority.',
    },
    {
      num: '02',
      title: 'ENGINEERED, NOT JUST DECORATED',
      detail: 'Solid software engineering underneath the visual craft: type-safe architecture, clean HTML semantics, sub-second TTFB, and zero bloated plugins.',
    },
    {
      num: '03',
      title: 'DESIGNED MOBILE-FIRST',
      detail: 'Over 80% of Instagram and social visitors arrive from handheld devices. We engineer fluid, touch-optimized mobile experiences that convert instantly.',
    },
    {
      num: '04',
      title: 'BUILT TO TURN ATTENTION INTO ACTION',
      detail: 'Clear, intentional user journeys engineered to guide visitors smoothly from initial interest toward booking, consultation, and purchase.',
    },
  ];

  return (
    <section ref={containerRef} className="relative py-28 md:py-48 bg-[#040a13] border-t border-[#00D4FF]/20 overflow-hidden select-none">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#00D4FF]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Section Eyebrow */}
        <div className="flex items-center gap-2 font-mono text-xs text-[#00D4FF] tracking-[0.25em] uppercase mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00D4FF]" />
          <span>DIFFERENTIATION // ARCHITECTURAL LAWS</span>
        </div>

        {/* Large Typography moving on 3 Depth Planes */}
        <div className="py-12 md:py-20 flex flex-col justify-center">
          <motion.div style={{ y: line1Y }} className="overflow-hidden">
            <h2 className="section-title-clamp font-display font-black text-white tracking-tighter uppercase leading-[0.92]">
              NOT JUST
            </h2>
          </motion.div>

          <motion.div style={{ y: line2Y }} className="overflow-hidden">
            <h2 className="section-title-clamp font-display font-black text-[#8D96A8] tracking-tighter uppercase leading-[0.92]">
              ANOTHER
            </h2>
          </motion.div>

          <motion.div style={{ y: line3Y }} className="overflow-hidden">
            <h2 className="section-title-clamp font-display font-black text-gradient-cyan tracking-tighter uppercase leading-[0.92]">
              WEBSITE.
            </h2>
          </motion.div>
        </div>

        {/* Four Principles Integrated into the Digital Realm */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {principlesList.map((p, idx) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="p-8 sm:p-10 rounded-3xl bg-[#0A0E27]/80 border border-white/10 hover:border-[#00D4FF]/50 transition-all duration-300 shadow-xl flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                  <span className="font-mono text-xs text-[#00D4FF] font-bold tracking-widest">
                    LAW // {p.num}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-[#00D4FF] transition-colors" />
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-black text-white group-hover:text-[#00D4FF] transition-colors uppercase tracking-tight">
                  {p.title}
                </h3>

                <p className="mt-4 text-sm sm:text-base text-[#8D96A8] leading-relaxed font-normal">
                  {p.detail}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 font-mono text-[10px] text-[#8D96A8] flex justify-between">
                <span>VERIFIED STANDARD</span>
                <span className="text-[#00D4FF]">ARULFORGE</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrinciplesDepthSection;
