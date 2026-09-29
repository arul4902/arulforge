import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Maximize2, ArrowLeft, Cpu, Terminal, Layers } from 'lucide-react';

export const TheImpossibleWindow: React.FC = () => {
  const [isInside, setIsInside] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative my-24 sm:my-32 max-w-[1400px] mx-auto px-5 sm:px-8 select-none">
      <div className="text-center mb-8">
        <span className="font-mono text-xs tracking-[0.35em] text-[#00F0FF] uppercase block mb-2">
          // SPATIAL PORTAL // IMPOSSIBLE WINDOW
        </span>
        <h3 className="font-kanit font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
          THE HYPER-DIMENSIONAL VIEWPORT
        </h3>
        <p className="font-light text-xs sm:text-sm text-[#BBCCD7]/60 mt-2 font-kanit">
          Click the card to traverse through the surface layer into the engine interior.
        </p>
      </div>

      {/* The Floating Card Container */}
      <motion.div
        data-forge-tool="expander"
        whileHover={{ y: shouldReduceMotion ? 0 : -6 }}
        onClick={() => setIsInside(true)}
        className="relative h-[380px] sm:h-[480px] rounded-[36px] border-2 border-[#00F0FF]/40 bg-[#0A0A0E] overflow-hidden cursor-pointer group shadow-[0_0_40px_rgba(0,240,255,0.15)] flex flex-col justify-between p-6 sm:p-10"
      >
        {/* Top Window Bar */}
        <div className="flex items-center justify-between border-b border-[#00F0FF]/20 pb-4 font-mono text-xs z-10">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] animate-pulse" />
            <span className="text-[#00F0FF] font-bold">[WINDOW: SPATIAL_ROOM_01]</span>
          </div>
          <div className="flex items-center gap-2 text-[#BBCCD7]/70 group-hover:text-[#00F0FF] transition-colors">
            <Maximize2 className="w-4 h-4" />
            <span className="text-[10px] tracking-widest uppercase">CLICK TO ENTER INTERIOR</span>
          </div>
        </div>

        {/* Ambient Grid Graphic in Normal Mode */}
        <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-60 transition-opacity duration-700">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                'radial-gradient(circle at center, rgba(0,240,255,0.2) 0%, transparent 70%), linear-gradient(to right, rgba(0,240,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,240,255,0.1) 1px, transparent 1px)',
              backgroundSize: '100% 100%, 30px 30px, 30px 30px',
            }}
          />
        </div>

        {/* Window Center Content */}
        <div className="relative z-10 max-w-xl">
          <span className="font-mono text-xs text-[#00F0FF] tracking-widest uppercase block mb-1">
            EXPLORE INTERNAL COMPONENT MATRIX
          </span>
          <h4 className="font-kanit font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
            DEEP ARCHITECTURE RUNTIME
          </h4>
          <p className="font-light text-sm text-[#BBCCD7]/80 mt-3 font-kanit">
            Transcend flat visual representations. Step directly into the underlying state machines, event pipelines, and compilation layers.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="flex items-center justify-between z-10 pt-4 border-t border-[#00F0FF]/20 font-mono text-[11px] text-[#BBCCD7]/60">
          <span>COORDINATES: [LAT: 37.7749, LON: -122.4194]</span>
          <span className="text-[#00F0FF] font-bold">[PENETRATE SURFACE →]</span>
        </div>
      </motion.div>

      {/* THE SPATIAL FLY-THROUGH INTERIOR MODAL */}
      <AnimatePresence>
        {isInside && (
          <motion.div
            initial={{ scale: 0.15, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.2, opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[99990] bg-[#04060A] text-[#D7E2EA] flex flex-col p-6 sm:p-12 overflow-y-auto select-none"
          >
            {/* Ambient Interior Matrix Grid */}
            <div
              className="absolute inset-0 opacity-25 pointer-events-none"
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgba(0,240,255,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,240,255,0.2) 1px, transparent 1px)',
                backgroundSize: '48px 48px',
              }}
            />

            {/* Navigation Header with Reverse Return Button */}
            <div className="relative z-20 flex items-center justify-between border-b border-[#00F0FF]/30 pb-6 mb-8 font-mono text-xs">
              <button
                onClick={() => setIsInside(false)}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#00F0FF] text-[#00F0FF] bg-[#00F0FF]/10 hover:bg-[#00F0FF] hover:text-[#0C0C0C] transition-all cursor-pointer font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(0,240,255,0.3)]"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>EXIT INTERIOR // RETURN TO FORGE</span>
              </button>

              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-emerald-400 font-bold">[LIVE KERNEL ROOM]</span>
              </div>
            </div>

            {/* Interior Schematic Room Content */}
            <div className="relative z-10 max-w-6xl mx-auto w-full space-y-10 my-auto">
              <div className="space-y-3">
                <span className="font-mono text-xs tracking-[0.35em] text-[#00F0FF] uppercase">
                  SPATIAL ROOM 01: REALTIME ENGINE TELEMETRY
                </span>
                <h2 className="font-kanit font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tighter text-white">
                  INSIDE THE MANUFACTURED CORE
                </h2>
                <p className="font-light text-base sm:text-lg text-[#BBCCD7]/80 max-w-3xl font-kanit">
                  You are now standing inside the compiled architecture of Arul's engineering system.
                  Every module operates with strict decoupling, zero layout thrashing, and low-latency client-server synchronization.
                </p>
              </div>

              {/* 3 Interior Telemetry Panels */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
                <div className="p-6 rounded-2xl border border-[#00F0FF]/30 bg-[#090D14]/80 backdrop-blur-md space-y-4">
                  <div className="flex items-center gap-2 text-[#00F0FF]">
                    <Cpu className="w-5 h-5" />
                    <span className="font-bold tracking-wider">[RUNTIME DISPATCH]</span>
                  </div>
                  <p className="text-[#BBCCD7]/70 leading-relaxed font-kanit text-sm">
                    Micro-frontend isolation with event-driven state hydration. Zero memory leaks across multi-page lifecycle.
                  </p>
                  <div className="pt-2 border-t border-[#00F0FF]/15 text-[11px] text-emerald-400">
                    STATUS: 60 FPS DETERMINISTIC
                  </div>
                </div>

                <div className="p-6 rounded-2xl border border-[#00F0FF]/30 bg-[#090D14]/80 backdrop-blur-md space-y-4">
                  <div className="flex items-center gap-2 text-[#00F0FF]">
                    <Terminal className="w-5 h-5" />
                    <span className="font-bold tracking-wider">[REST &amp; SOCKET API]</span>
                  </div>
                  <p className="text-[#BBCCD7]/70 leading-relaxed font-kanit text-sm">
                    Spring Boot REST controllers handling transactional payloads with indexed MySQL query caching.
                  </p>
                  <div className="pt-2 border-t border-[#00F0FF]/15 text-[11px] text-emerald-400">
                    THROUGHPUT: &lt; 45MS P99
                  </div>
                </div>

                <div className="p-6 rounded-2xl border border-[#00F0FF]/30 bg-[#090D14]/80 backdrop-blur-md space-y-4">
                  <div className="flex items-center gap-2 text-[#00F0FF]">
                    <Layers className="w-5 h-5" />
                    <span className="font-bold tracking-wider">[PHYSICS ACCELERATOR]</span>
                  </div>
                  <p className="text-[#BBCCD7]/70 leading-relaxed font-kanit text-sm">
                    Hardware-accelerated CSS transforms and RAF inertia loops for tactile material responses.
                  </p>
                  <div className="pt-2 border-t border-[#00F0FF]/15 text-[11px] text-emerald-400">
                    GPU MEMORY: 18.4 MB OPTIMIZED
                  </div>
                </div>
              </div>
            </div>

            {/* Interior Bottom Bar */}
            <div className="relative z-10 pt-6 mt-8 border-t border-[#00F0FF]/20 flex items-center justify-between font-mono text-[10px] text-[#646973]">
              <span>ARULFORGE // INTERNAL SPATIAL MATRIX</span>
              <span className="text-[#00F0FF]">[CLICK 'EXIT INTERIOR' TO STEP BACK OUT]</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TheImpossibleWindow;
