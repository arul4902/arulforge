import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Layers, X, Globe, Sparkles } from 'lucide-react';
import { projects } from '../../data/forgeConfig';
import type { Project } from '../../data/forgeConfig';
import { useCursor } from '../../context/CursorContext';

export const SelectedForges: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { setCursor, resetCursor } = useCursor();

  return (
    <section id="work" className="relative py-28 md:py-40 bg-[#070A12] border-t border-white/10">
      {/* Background technical watermarks */}
      <div className="absolute top-12 right-8 font-mono text-[90px] md:text-[140px] font-black text-white/[0.015] pointer-events-none select-none">
        FORGED
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16 md:pb-24 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#00D4FF] tracking-[0.25em] uppercase mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00D4FF]" />
              <span>REAL BUILDS / REAL EXPERIENCES</span>
            </div>
            <h2 className="section-title-clamp font-display font-black text-[#F7FAFC] tracking-tighter uppercase leading-[0.95]">
              SELECTED <br />
              <span className="text-gradient-cyan">FORGES.</span>
            </h2>
          </div>

          <div className="font-mono text-xs text-[#8D96A8] max-w-sm leading-relaxed">
            <span className="text-[#F7FAFC] font-semibold">06 PRODUCTION SITES DEPLOYED.</span>
            <br />
            Every project listed here is a live web build engineered for conversion, performance, and memorable digital presence.
          </div>
        </div>

        {/* Project Sequence Showcase */}
        <div className="space-y-24 md:space-y-36 pt-16">
          {projects.map((project) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative group"
            >
              {/* Top Project Bar: Number, Type, Title */}
              <div className="flex flex-wrap items-end justify-between gap-4 pb-6 border-b border-white/10">
                <div className="flex items-center gap-4 sm:gap-6">
                  <span className="font-mono text-2xl sm:text-3xl font-bold text-[#00D4FF]">
                    {project.number}
                  </span>
                  <div>
                    <span className="font-mono text-[10px] sm:text-xs text-[#8D96A8] tracking-widest block uppercase">
                      {project.type}
                    </span>
                    <h3 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#F7FAFC] group-hover:text-[#00D4FF] transition-colors">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap items-center gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full bg-[#101522] border border-white/10 font-mono text-[11px] text-[#8D96A8]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Main Visual Composition (Large Browser Window) */}
              <div
                className="mt-8 rounded-2xl overflow-hidden border border-white/10 bg-[#0E1322] shadow-[0_20px_50px_rgba(0,0,0,0.6)] group-hover:border-[#00D4FF]/40 transition-all duration-500"
                onMouseEnter={() => setCursor('view')}
                onMouseLeave={resetCursor}
              >
                {/* Browser Top Bar */}
                <div className="px-4 py-3 bg-[#0A0E27] border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    <span className="ml-3 font-mono text-[11px] text-[#8D96A8] truncate max-w-[200px] sm:max-w-md">
                      {project.liveUrl}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="hidden sm:inline-block font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      LIVE ON VERCEL
                    </span>
                  </div>
                </div>

                {/* Image Container with Subtle Parallax Zoom */}
                <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-[#070A12]">
                  <img
                    src={project.image}
                    alt={`${project.title} - Website Screenshot`}
                    loading="lazy"
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                  />

                  {/* Gradient Overlay for Depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070A12] via-transparent to-transparent opacity-60" />

                  {/* Positioning Tag Float on Bottom Left */}
                  <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md p-4 rounded-xl bg-[#070A12]/85 backdrop-blur-md border border-white/10">
                    <p className="font-mono text-xs text-[#00D4FF] font-semibold mb-1">
                      POSITIONING // {project.type}
                    </p>
                    <p className="text-xs sm:text-sm text-[#F7FAFC] font-medium leading-snug">
                      {project.positioning}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Bar Beneath Screenshot */}
              <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-sm text-[#8D96A8] max-w-xl leading-relaxed">
                  {project.description}
                </p>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedProject(project)}
                    onMouseEnter={() => setCursor('default')}
                    onMouseLeave={resetCursor}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#101522] hover:bg-[#161D2E] text-xs font-mono text-[#F7FAFC] border border-white/10 hover:border-white/20 transition-colors cursor-pointer"
                  >
                    <Layers className="w-3.5 h-3.5 text-[#00D4FF]" />
                    <span>SPECIFICATION</span>
                  </button>

                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setCursor('forge')}
                    onMouseLeave={resetCursor}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#00D4FF] hover:bg-white text-[#070A12] text-xs font-mono font-bold tracking-wider transition-colors shadow-[0_0_15px_rgba(0,212,255,0.3)] cursor-pointer"
                  >
                    <span>VIEW LIVE</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Technical Specification Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl rounded-2xl bg-[#0A0E27] border border-white/10 p-6 sm:p-8 text-[#F7FAFC] shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-start justify-between border-b border-white/10 pb-4">
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs text-[#00D4FF]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>FORGE SPECIFICATION // {selectedProject.number}</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[#F7FAFC] mt-1">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1 rounded-lg text-[#8D96A8] hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="py-6 space-y-6">
                <div>
                  <h4 className="font-mono text-xs text-[#8D96A8] tracking-widest uppercase mb-2">
                    PROJECT ARCHITECTURE
                  </h4>
                  <p className="text-sm text-[#F7FAFC] leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                <div>
                  <h4 className="font-mono text-xs text-[#8D96A8] tracking-widest uppercase mb-3">
                    CORE HIGHLIGHTS & DELIVERABLES
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedProject.highlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg bg-[#101522] border border-white/10 text-xs text-[#F7FAFC] flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-mono text-xs text-[#8D96A8] tracking-widest uppercase mb-2">
                    TECHNOLOGY COMPOSITION
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-md bg-[#101522] border border-[#00D4FF]/30 font-mono text-xs text-[#00D4FF]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="font-mono text-xs text-[#8D96A8]">Production deployment verified</span>
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[#00D4FF] text-[#070A12] font-mono text-xs font-bold hover:bg-white transition-colors"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>OPEN LIVE WEBSITE ↗</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default SelectedForges;
