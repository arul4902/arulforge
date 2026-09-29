import React from 'react';
import { motion } from 'framer-motion';
import { processStages } from '../../data/forgeConfig';
import { Globe, Radio } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  return (
    <section id="process" className="relative py-28 md:py-40 bg-[#070A12] border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16 md:pb-24 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#00D4FF] tracking-[0.25em] uppercase mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00D4FF]" />
              <span>THE PRODUCTION LIFECYCLE</span>
            </div>
            <h2 className="section-title-clamp font-display font-black text-[#F7FAFC] tracking-tighter uppercase leading-[0.95]">
              FROM <br />
              <span className="text-gradient-cyan">IDEA TO LIVE.</span>
            </h2>
          </div>

          <p className="font-mono text-xs sm:text-sm text-[#8D96A8] max-w-sm leading-relaxed">
            Four disciplined milestones. Every phase transforms raw intent into an optimized, production-ready digital asset.
          </p>
        </div>

        {/* Four Stages with Signature Forge Line Progression */}
        <div className="relative pt-16">
          {/* Continuous Cyan Forge Line Running Down */}
          <div className="absolute left-6 md:left-1/2 top-16 bottom-16 -translate-x-1/2 w-[2px] bg-white/10 hidden sm:block">
            <motion.div
              className="w-full bg-[#00D4FF] shadow-[0_0_12px_#00D4FF]"
              initial={{ height: '0%' }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            />
          </div>

          <div className="space-y-16 md:space-y-24">
            {processStages.map((stage, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={stage.step}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, delay: idx * 0.1 }}
                  className={`relative flex flex-col sm:flex-row items-start md:items-center gap-8 ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Central Node Visual representing Transformation */}
                  <div className="hidden sm:flex absolute left-6 md:left-1/2 -translate-x-1/2 items-center justify-center z-10">
                    <div className="w-10 h-10 rounded-full bg-[#070A12] border-2 border-[#00D4FF] flex items-center justify-center font-mono text-xs font-bold text-[#00D4FF] shadow-[0_0_15px_rgba(0,212,255,0.4)]">
                      {stage.step}
                    </div>
                  </div>

                  {/* Stage Content Card */}
                  <div className={`w-full sm:w-[calc(50%-40px)] ${isEven ? 'md:text-right' : ''}`}>
                    <div className="p-8 rounded-2xl bg-[#0E1322] border border-white/10 hover:border-[#00D4FF]/40 transition-all duration-300 shadow-xl group">
                      <div className={`flex items-center gap-2 font-mono text-xs text-[#00D4FF] mb-2 ${isEven ? 'md:justify-end' : ''}`}>
                        <span className="sm:hidden font-bold">{stage.step} //</span>
                        <span>{stage.metric}</span>
                      </div>

                      <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-[#F7FAFC] tracking-tight group-hover:text-[#00D4FF] transition-colors">
                        {stage.title}
                      </h3>

                      <p className="mt-3 text-base sm:text-lg font-medium text-[#F7FAFC]/90">
                        &ldquo;{stage.description}&rdquo;
                      </p>

                      <p className="mt-2 text-xs sm:text-sm text-[#8D96A8] leading-relaxed">
                        {stage.detail}
                      </p>

                      {/* Visual Metaphor State corresponding to the stage */}
                      <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                        <span className="font-mono text-[10px] text-[#8D96A8]">METAPHOR STATE:</span>

                        {idx === 0 && (
                          <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#8D96A8]">
                            <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]" />
                            <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                            <span>SCATTERED PARTICLES</span>
                          </div>
                        )}

                        {idx === 1 && (
                          <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#00D4FF]">
                            <span className="h-0.5 w-6 bg-[#00D4FF]" />
                            <span>CONNECTED CHANNELS</span>
                          </div>
                        )}

                        {idx === 2 && (
                          <div className="flex items-center gap-1.5 font-mono text-[10px] text-cyan-300">
                            <span className="h-3 w-3 border border-[#00D4FF] rounded-sm" />
                            <span>STRUCTURED GRID</span>
                          </div>
                        )}

                        {idx === 3 && (
                          <div className="flex items-center gap-2 font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                            <span>● LIVE ON THE WEB</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Empty spacer for the opposite side */}
                  <div className="hidden sm:block w-[calc(50%-40px)]" />
                </motion.div>
              );
            })}
          </div>

          {/* Final Stage Conclusion Banner */}
          <div className="mt-20 pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 bg-[#0A0E27] p-8 rounded-2xl border">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#00D4FF]/20 border border-[#00D4FF] flex items-center justify-center text-[#00D4FF]">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display font-bold text-lg text-[#F7FAFC]">Zero Downtime Edge Deployment</h4>
                <p className="font-mono text-xs text-[#8D96A8]">SSL verified • Edge DNS • Global CDN Cache</p>
              </div>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-emerald-400">
              <Radio className="w-4 h-4 animate-pulse" />
              <span>STATUS: PRODUCTION READY</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
