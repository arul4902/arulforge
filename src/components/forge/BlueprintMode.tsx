import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BlueprintModeProps {
  active: boolean;
  onDeactivate: () => void;
}

export const BlueprintMode: React.FC<BlueprintModeProps> = ({ active, onDeactivate }) => {
  const [countdown, setCountdown] = useState(2.5);

  useEffect(() => {
    if (!active) return;
    setCountdown(2.5);

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 0.1) {
          clearInterval(interval);
          onDeactivate();
          return 0;
        }
        return Math.max(0, +(prev - 0.1).toFixed(1));
      });
    }, 100);

    return () => clearInterval(interval);
  }, [active, onDeactivate]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[99999] pointer-events-none select-none bg-[#050B14]/85 text-[#00F0FF] font-mono"
        >
          {/* Cyan Technical Blueprint Grid */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(0, 240, 255, 0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 240, 255, 0.25) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />

          {/* Blueprint Telemetry HUD */}
          <div className="absolute top-8 left-8 flex flex-col gap-1 text-xs">
            <span className="font-bold text-sm">// BLUEPRINT MODE ACTIVATED</span>
            <span className="text-[#BBCCD7]">SYSTEM: ARULFORGE ARCHITECTURE v2.6</span>
            <span className="text-[#00F0FF]">COORDINATES: [X: 1920, Y: 1080, Z: 100]</span>
            <span className="text-emerald-400">TELEMETRY: ALL MATRICES NOMINAL</span>
          </div>

          <div className="absolute top-8 right-8 text-right font-mono text-xs">
            <span className="text-amber-400 font-bold block">
              DIAGNOSTIC TIMER: {countdown}s
            </span>
            <span className="text-[#BBCCD7]/60 block text-[10px]">
              SNAP TO PRODUCTION ON EXPIRATION
            </span>
          </div>

          {/* Construction Guidelines across screen */}
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#00F0FF]/50 border-t border-dashed border-[#00F0FF]" />
          <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-[#00F0FF]/50 border-l border-dashed border-[#00F0FF]" />

          {/* Dimension badges */}
          <div className="absolute top-1/2 left-1/4 -translate-y-6 px-2 py-0.5 border border-[#00F0FF] bg-[#050B14] text-[10px]">
            W: 50.00%
          </div>
          <div className="absolute top-1/4 left-1/2 translate-x-4 px-2 py-0.5 border border-[#00F0FF] bg-[#050B14] text-[10px]">
            H: 25.00%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BlueprintMode;
