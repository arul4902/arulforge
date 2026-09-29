import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Radio, Sparkles } from 'lucide-react';

export const ContinuousForgeLineProcess: React.FC = () => {
  const stages = [
    {
      step: '01',
      title: 'ANALYZE',
      quote: 'Understand the business, audience, goals and direction.',
      detail: 'Deep discovery into your audience, market differentiation, conversion bottlenecks, and high-impact visual tone.',
      lineState: 'FRAGMENTED PARTICLES',
      visualBadge: 'SCATTERED ➜ INGESTION',
    },
    {
      step: '02',
      title: 'FORGE',
      quote: 'Transform strategy into interface, interaction and code.',
      detail: 'Assembling custom typography, fluid responsive layout grids, motion physics, and clean modular React/TypeScript code.',
      lineState: 'CONNECTED CIRCUITS',
      visualBadge: 'CIRCUIT FUSION',
    },
    {
      step: '03',
      title: 'REFINE',
      quote: 'Perfect responsiveness, performance and details.',
      detail: 'Rigorous stress-testing across screen resolutions (320px to 4K), sub-second page speed optimization, and frictionless CTA pathways.',
      lineState: 'STRUCTURED GEOMETRY',
      visualBadge: 'ISOMETRIC GRID',
    },
    {
      step: '04',
      title: 'DEPLOY',
      quote: 'Ship a production-ready experience to the web.',
      detail: 'Edge CDN distribution, custom domain mapping, SSL certificate activation, and global DNS performance verification.',
      lineState: 'BROWSER WINDOW OUTLINE',
      visualBadge: '● LIVE ON THE WEB',
    },
  ];

  return (
    <section id="process" className="relative py-28 md:py-48 bg-[#040a13] border-t border-[#00D4FF]/20 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 forge-grid-line opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16 md:pb-24 border-b border-[#00D4FF]/20">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#00D4FF] tracking-[0.25em] uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#00D4FF]" />
              <span>THE CONTINUOUS FORGE LINE // PROCESS</span>
            </div>
            <h2 className="section-title-clamp font-display font-black text-white tracking-tighter uppercase leading-[0.94]">
              HOW AN IDEA <br />
              <span className="text-gradient-cyan">BECOMES REAL.</span>
            </h2>
          </div>

          <p className="font-mono text-xs sm:text-sm text-[#8D96A8] max-w-md leading-relaxed">
            The same cyan blueprint line originating from the hero table travels down through each stage, transitioning from scattered particles into a live, production-deployed browser.
          </p>
        </div>

        {/* Four Stages Connected by the One Continuous Cyan Forge Line */}
        <div className="relative pt-20">
          {/* THE CONTINUOUS CYAN FORGE LINE TRACK */}
          <div className="absolute left-6 md:left-1/2 top-20 bottom-24 -translate-x-1/2 w-[3px] bg-white/10 hidden sm:block">
            <motion.div
              initial={{ height: '0%' }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 1.8, ease: 'easeInOut' }}
              className="w-full bg-[#00D4FF] shadow-[0_0_15px_#00D4FF,0_0_30px_#7df9ff]"
            />
          </div>

          <div className="space-y-20 md:space-y-32">
            {stages.map((stage, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={stage.step}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.75, delay: idx * 0.1 }}
                  className={`relative flex flex-col sm:flex-row items-start md:items-center gap-8 ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Central Node Badge */}
                  <div className="hidden sm:flex absolute left-6 md:left-1/2 -translate-x-1/2 items-center justify-center z-20">
                    <div className="w-12 h-12 rounded-full bg-[#040a13] border-2 border-[#00D4FF] flex items-center justify-center font-mono text-sm font-black text-[#00D4FF] shadow-[0_0_20px_#00D4FF]">
                      {stage.step}
                    </div>
                  </div>

                  {/* Stage Card */}
                  <div className={`w-full sm:w-[calc(50%-48px)] ${isEven ? 'md:text-right' : ''}`}>
                    <div className="p-8 sm:p-10 rounded-3xl bg-[#0A0E27]/90 border border-[#00D4FF]/30 hover:border-[#00D4FF] transition-all duration-300 shadow-[0_15px_40px_rgba(0,0,0,0.6)] group">
                      <div className={`flex items-center gap-2 font-mono text-xs text-[#00D4FF] mb-2 ${isEven ? 'md:justify-end' : ''}`}>
                        <span className="sm:hidden font-bold">{stage.step} //</span>
                        <span>{stage.visualBadge}</span>
                      </div>

                      <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white group-hover:text-[#00D4FF] transition-colors uppercase tracking-tight">
                        {stage.title}
                      </h3>

                      <p className="mt-3 text-base sm:text-lg font-medium text-white/90 leading-snug">
                        &ldquo;{stage.quote}&rdquo;
                      </p>

                      <p className="mt-2 text-xs sm:text-sm text-[#8D96A8] leading-relaxed">
                        {stage.detail}
                      </p>

                      {/* Forge Line Status Morphing Indicator */}
                      <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs">
                        <span className="text-[#8D96A8] text-[10px]">LINE METAPHOR:</span>

                        {idx === 0 && (
                          <span className="text-[#00D4FF] flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-ping" />
                            <span>{stage.lineState}</span>
                          </span>
                        )}

                        {idx === 1 && (
                          <span className="text-[#00D4FF] flex items-center gap-1.5">
                            <span className="w-6 h-0.5 bg-[#00D4FF]" />
                            <span>{stage.lineState}</span>
                          </span>
                        )}

                        {idx === 2 && (
                          <span className="text-[#00D4FF] flex items-center gap-1.5">
                            <span className="w-3.5 h-3.5 border border-[#00D4FF]" />
                            <span>{stage.lineState}</span>
                          </span>
                        )}

                        {idx === 3 && (
                          <span className="text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span>● LIVE BROWSER</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden sm:block w-[calc(50%-48px)]" />
                </motion.div>
              );
            })}
          </div>

          {/* Final Deployment Live Node */}
          <div className="mt-24 p-8 sm:p-10 rounded-3xl bg-[#0A0E27] border-2 border-[#00D4FF] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_0_50px_rgba(0,212,255,0.25)]">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#00D4FF]/20 border border-[#00D4FF] flex items-center justify-center text-[#00D4FF] shadow-[0_0_20px_#00D4FF]">
                <Globe className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-display font-black text-xl text-white">Full Production Infrastructure</h4>
                <p className="font-mono text-xs text-[#8D96A8]">High-Speed Edge CDN • SSL Encrypted • Zero Downtime</p>
              </div>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/30">
              <Radio className="w-4 h-4 animate-pulse" />
              <span>ALL SYSTEMS OPERATIONAL</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContinuousForgeLineProcess;
