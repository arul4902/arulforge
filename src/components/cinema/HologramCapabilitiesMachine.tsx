import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { capabilities } from '../../data/capabilities';
import { useCursor } from '../../context/CursorContext';
import { Layers, ArrowUpRight, Cpu } from 'lucide-react';

export const HologramCapabilitiesMachine: React.FC = () => {
  const [activeLayerIndex, setActiveLayerIndex] = useState<number>(0);
  const { setCursor, resetCursor } = useCursor();

  const activeCapability = capabilities[activeLayerIndex];

  return (
    <section id="capabilities" className="relative py-28 md:py-48 bg-[#040a13] border-t border-[#00D4FF]/20 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00D4FF]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16 md:pb-24 border-b border-[#00D4FF]/20">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#00D4FF] tracking-[0.25em] uppercase mb-4">
              <Cpu className="w-3.5 h-3.5 text-[#00D4FF]" />
              <span>HOLOGRAPHIC BLUEPRINT MACHINE // 5 ACTIVE LAYERS</span>
            </div>
            <h2 className="section-title-clamp font-display font-black text-white tracking-tighter uppercase leading-[0.94]">
              WHAT <br />
              <span className="text-gradient-cyan">WE FORGE.</span>
            </h2>
          </div>

          <p className="font-mono text-xs sm:text-sm text-[#8D96A8] max-w-md leading-relaxed">
            Every layer represents a calibrated software and visual engineering discipline. Inactive layers remain wireframe; the active layer illuminates in full blueprint fidelity.
          </p>
        </div>

        {/* The Giant Holographic Machine Stage */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Layer Selector Stack (The Blueprint Machine Controls) */}
          <div className="lg:col-span-5 space-y-3">
            <span className="font-mono text-[10px] text-[#00D4FF] tracking-widest uppercase block mb-2">
              SELECT HOLOGRAPHIC LAYER:
            </span>

            {capabilities.map((layer, idx) => {
              const isActive = activeLayerIndex === idx;

              return (
                <button
                  key={layer.number}
                  onClick={() => setActiveLayerIndex(idx)}
                  onMouseEnter={() => setCursor('explore')}
                  onMouseLeave={resetCursor}
                  className={`w-full p-4 sm:p-5 rounded-2xl text-left border transition-all duration-300 flex items-center justify-between cursor-pointer group ${
                    isActive
                      ? 'bg-[#0A0E27] border-[#00D4FF] shadow-[0_0_30px_rgba(0,212,255,0.3)] translate-x-2'
                      : 'bg-[#070A12]/80 border-white/10 hover:border-[#00D4FF]/40 text-[#8D96A8]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`font-mono text-lg sm:text-xl font-bold transition-colors ${
                        isActive ? 'text-[#00D4FF]' : 'text-white/40'
                      }`}
                    >
                      {layer.number}
                    </span>
                    <div>
                      <div className="font-mono text-[9px] text-[#8D96A8] uppercase tracking-wider">
                        {layer.layerSpec.split('//')[0]}
                      </div>
                      <div
                        className={`font-display text-base sm:text-lg font-bold tracking-tight transition-colors ${
                          isActive ? 'text-white' : 'text-[#8D96A8] group-hover:text-white'
                        }`}
                      >
                        {layer.title}
                      </div>
                    </div>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                      isActive
                        ? 'bg-[#00D4FF] border-[#00D4FF] text-[#040a13]'
                        : 'border-white/10 text-white/30 group-hover:border-white/30'
                    }`}
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: The 3D Hologram Projection Core (Active vs Inactive Layers) */}
          <div className="lg:col-span-7 relative">
            <div className="relative w-full rounded-3xl border-2 border-[#00D4FF] bg-[#0A0E27]/90 backdrop-blur-xl p-6 sm:p-10 shadow-[0_0_60px_rgba(0,212,255,0.25)] overflow-hidden">
              {/* Internal Holographic Grid Texture */}
              <div className="absolute inset-0 forge-grid-line opacity-25 pointer-events-none" />

              {/* Machine Header Telemetry */}
              <div className="relative z-10 flex items-center justify-between pb-6 border-b border-[#00D4FF]/30 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#00D4FF]" />
                  <span className="text-[#00D4FF] font-bold">
                    {activeCapability.layerSpec}
                  </span>
                </div>
                <span className="text-emerald-400 text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  FOCAL BEAM LOCKED
                </span>
              </div>

              {/* Active Layer Dynamic Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCapability.number}
                  initial={{ opacity: 0, rotateY: -8, scale: 0.96 }}
                  animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                  exit={{ opacity: 0, rotateY: 8, scale: 0.96 }}
                  transition={{ duration: 0.35 }}
                  className="py-8 space-y-6 relative z-10"
                >
                  <div>
                    <span className="font-mono text-xs text-[#00D4FF] tracking-widest uppercase block mb-1">
                      DISCIPLINE MATRIX // {activeCapability.number}
                    </span>
                    <h3 className="font-display text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
                      {activeCapability.title}
                    </h3>
                    <p className="mt-3 font-mono text-sm sm:text-base text-[#00D4FF] font-medium">
                      &ldquo;{activeCapability.tagline}&rdquo;
                    </p>
                  </div>

                  <p className="text-sm sm:text-base text-[#8D96A8] leading-relaxed font-normal">
                    {activeCapability.description}
                  </p>

                  {/* Technical Blueprint Annotations */}
                  <div className="pt-4 border-t border-white/10 space-y-3">
                    <span className="font-mono text-[10px] text-[#8D96A8] tracking-widest uppercase block">
                      TECHNICAL BLUEPRINT ANNOTATIONS:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeCapability.blueprintAnnotations.map((anno) => (
                        <div
                          key={anno}
                          className="p-3 rounded-xl bg-[#040813] border border-[#00D4FF]/40 text-xs text-white font-mono flex items-center gap-2 shadow-[0_0_12px_rgba(0,212,255,0.15)]"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]" />
                          <span>{anno}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Bottom Machine Footer */}
              <div className="relative z-10 pt-6 border-t border-[#00D4FF]/30 flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-[#8D96A8]">
                <span>ARCHITECTURE: MODULAR REACT / TS</span>
                <span className="text-[#00D4FF]">ARULFORGE CORE ENGINE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HologramCapabilitiesMachine;
