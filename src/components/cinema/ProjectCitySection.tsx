import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { projects } from '../../data/projects';
import type { ProjectItem } from '../../data/projects';
import { ExternalLink, Layers, X, Globe, Sparkles } from 'lucide-react';
import { useCursor } from '../../context/CursorContext';

export const ProjectCitySection: React.FC = () => {
  const [activeSpec, setActiveSpec] = useState<ProjectItem | null>(null);
  const { setCursor, resetCursor } = useCursor();

  return (
    <section id="work" className="relative pt-16 pb-28 md:pt-20 md:pb-48 bg-[#040a13] border-t border-[#00D4FF]/30 overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
      {/* Background Holographic Coordinate Grid & Ambience */}
      <div className="absolute inset-0 forge-grid-line opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#00D4FF]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Section Header: THE PROJECT CITY */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-20 border-b border-[#00D4FF]/20">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#00D4FF] tracking-[0.25em] uppercase mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00D4FF] shadow-[0_0_8px_#00D4FF]" />
              <span>THE PROJECT CITY // REAL DIGITAL BUILDS</span>
            </div>
            <h2 className="section-title-clamp font-display font-black text-white tracking-tighter uppercase leading-[0.94]">
              SELECTED <br />
              <span className="text-gradient-cyan">FORGES.</span>
            </h2>
          </div>

          <div className="font-mono text-xs sm:text-sm text-[#8D96A8] max-w-md leading-relaxed">
            <span className="text-white font-semibold block mb-1">REAL BUILDS. REAL EXPERIENCES.</span>
            Each website below is constructed as an architectural holographic structure. Scroll through the digital city to deconstruct wireframes and explore live production builds.
          </div>
        </div>

        {/* The Holographic City Structures Sequence */}
        <div className="space-y-32 md:space-y-48 pt-20">
          {projects.map((project) => {
            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="relative group"
              >
                {/* Holographic Structure Metadata Bar */}
                <div className="flex flex-wrap items-end justify-between gap-4 pb-6 border-b border-white/10">
                  <div className="flex items-baseline gap-4 sm:gap-6">
                    <span className="font-mono text-3xl sm:text-4xl font-black text-[#00D4FF]">
                      {project.number}
                    </span>
                    <div>
                      <div className="flex items-center gap-2 font-mono text-[10px] sm:text-xs text-[#00D4FF] tracking-widest uppercase">
                        <span>[ {project.structureType} ]</span>
                        <span className="text-white/20">//</span>
                        <span className="text-[#8D96A8]">{project.category}</span>
                      </div>
                      <h3 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-white group-hover:text-[#00D4FF] transition-colors mt-1 uppercase">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  {/* Technology Metadata Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded bg-[#0A0E27] border border-[#00D4FF]/30 font-mono text-xs text-[#00D4FF]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* The Holographic Architectural Frame with Integrated Interface */}
                <div
                  className="mt-8 relative rounded-3xl overflow-hidden border border-[#00D4FF]/40 bg-[#070A12] shadow-[0_25px_60px_rgba(0,0,0,0.8)] group-hover:border-[#00D4FF] group-hover:shadow-[0_0_50px_rgba(0,212,255,0.25)] transition-all duration-500"
                  onMouseEnter={() => setCursor('view')}
                  onMouseLeave={resetCursor}
                >
                  {/* Top Architectural Blueprint Header */}
                  <div className="px-5 py-3.5 bg-[#0A0E27] border-b border-[#00D4FF]/30 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#00D4FF]/40" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#00D4FF]/40" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#00D4FF]/40" />
                      </div>
                      <span className="text-[#8D96A8] truncate max-w-xs sm:max-w-md">
                        {project.liveUrl}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                        ● VERIFIED PRODUCTION
                      </span>
                    </div>
                  </div>

                  {/* Visual Interface & Wireframe Separation */}
                  <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-[#040813]">
                    {/* Real Website Screenshot */}
                    <img
                      src={project.image}
                      alt={`${project.title} Interface`}
                      loading="lazy"
                      className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />

                    {/* Gradient Depth Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#040a13] via-transparent to-transparent opacity-70" />

                    {/* Floating Wireframe Corner Accents */}
                    <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#00D4FF] pointer-events-none" />
                    <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#00D4FF] pointer-events-none" />
                    <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#00D4FF] pointer-events-none" />
                    <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#00D4FF] pointer-events-none" />

                    {/* Bottom Left Positioning HUD Card */}
                    <div className="absolute bottom-6 left-6 right-6 sm:right-auto sm:max-w-lg p-5 rounded-2xl bg-[#040a13]/90 backdrop-blur-md border border-[#00D4FF]/40 shadow-xl">
                      <span className="font-mono text-[10px] text-[#00D4FF] tracking-widest uppercase block mb-1">
                        POSITIONING INTENT // {project.structureArchetype}
                      </span>
                      <p className="text-xs sm:text-sm text-white font-medium leading-relaxed">
                        {project.positioning}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Triggers & Narrative Specs */}
                <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <p className="text-sm text-[#8D96A8] max-w-2xl leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex items-center gap-4 flex-shrink-0">
                    <button
                      onClick={() => setActiveSpec(project)}
                      onMouseEnter={() => setCursor('default')}
                      onMouseLeave={resetCursor}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0A0E27] hover:bg-[#101522] text-xs font-mono text-white border border-white/10 hover:border-[#00D4FF]/40 transition-colors cursor-pointer"
                    >
                      <Layers className="w-4 h-4 text-[#00D4FF]" />
                      <span>BLUEPRINT SPECS</span>
                    </button>

                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => setCursor('forge')}
                      onMouseLeave={resetCursor}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00D4FF] text-[#040a13] text-xs font-mono font-black tracking-wider hover:bg-white transition-colors shadow-[0_0_20px_rgba(0,212,255,0.4)] cursor-pointer"
                    >
                      <span>VIEW LIVE ↗</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Blueprint Specification Modal */}
      {activeSpec && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative w-full max-w-2xl rounded-3xl bg-[#0A0E27] border border-[#00D4FF] p-6 sm:p-8 text-white shadow-[0_0_80px_rgba(0,212,255,0.3)] max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <span className="font-mono text-xs text-[#00D4FF] tracking-widest uppercase">
                  STRUCTURE SPECIFICATION // {activeSpec.structureArchetype}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-black text-white mt-1">
                  {activeSpec.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveSpec(null)}
                className="p-1 rounded-lg text-[#8D96A8] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-6 space-y-6">
              <div>
                <h4 className="font-mono text-xs text-[#8D96A8] tracking-widest uppercase mb-2">
                  ARCHITECTURAL SUMMARY
                </h4>
                <p className="text-sm text-[#F7FAFC] leading-relaxed">
                  {activeSpec.description}
                </p>
              </div>

              <div>
                <h4 className="font-mono text-xs text-[#8D96A8] tracking-widest uppercase mb-3">
                  CORE HOLOGRAPHIC SUBSYSTEMS
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeSpec.hologramSpecs.map((spec, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-[#040813] border border-[#00D4FF]/30 text-xs text-white flex items-center gap-2.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#00D4FF]" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-mono text-xs text-[#8D96A8] tracking-widest uppercase mb-2">
                  TECHNOLOGY DEPLOYED
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeSpec.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded bg-[#040813] border border-[#00D4FF] font-mono text-xs text-[#00D4FF]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="font-mono text-xs text-[#8D96A8]">Production deployment verified</span>
              <a
                href={activeSpec.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#00D4FF] text-[#040a13] font-mono text-xs font-bold hover:bg-white transition-colors"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>OPEN LIVE SITE ↗</span>
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default ProjectCitySection;
