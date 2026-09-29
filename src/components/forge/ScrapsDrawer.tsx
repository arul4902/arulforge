import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ScrapsDrawerProps {
  onTriggerBlueprint?: () => void;
}

interface ScrapPiece {
  id: string;
  label: string;
  type: string;
  initialX: number;
  initialY: number;
  content: string;
  isSecretKey?: boolean;
}

const initialScraps: ScrapPiece[] = [
  {
    id: 's1',
    label: '[REJECTED_BUTTON_v0.2]',
    type: 'button',
    initialX: -40,
    initialY: -60,
    content: 'DESTRUCTIVE_DEPLOY()',
  },
  {
    id: 's2',
    label: '[DISCARDED_GRID_04]',
    type: 'grid',
    initialX: 80,
    initialY: -100,
    content: 'columns: 17; gap: -4px;',
  },
  {
    id: 's3',
    label: '[KEY: CALIBRATION_CORE]',
    type: 'secret',
    initialX: 30,
    initialY: 40,
    content: '⌖ 42.08_LOCK',
    isSecretKey: true,
  },
  {
    id: 's4',
    label: '[EXPERIMENTAL_TYPE]',
    type: 'typo',
    initialX: -100,
    initialY: 90,
    content: 'ARUL//FORGE_PROTOTYPE',
  },
];

export const ScrapsDrawer: React.FC<ScrapsDrawerProps> = ({ onTriggerBlueprint }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [unlockedSecret, setUnlockedSecret] = useState(false);

  const handleDragEnd = (_: any, info: any, piece: ScrapPiece) => {
    // If the secret calibration piece is dragged toward the target receptor slot
    if (piece.isSecretKey && !unlockedSecret) {
      if (Math.abs(info.point.x - (window.innerWidth - 120)) < 100 && Math.abs(info.point.y - 180) < 100) {
        setUnlockedSecret(true);
        onTriggerBlueprint?.();
      }
    }
  };

  return (
    <>
      {/* Floating Scraps trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-50 px-3.5 py-1.5 rounded-full border border-[#00F0FF]/40 bg-[#0C0C0C]/90 text-[#00F0FF] font-mono text-[11px] tracking-widest uppercase hover:bg-[#00F0FF] hover:text-[#0C0C0C] transition-colors shadow-[0_0_15px_rgba(0,240,255,0.25)] flex items-center gap-2 cursor-pointer"
        aria-label="Open Digital Scraps Area"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-ping" />
        <span>[SCRAPS_]</span>
      </button>

      {/* The Digital Scrap Floating Canvas / Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-4 sm:inset-12 md:inset-20 z-[9990] bg-[#07070A]/95 border-2 border-[#00F0FF]/40 rounded-[32px] p-6 sm:p-10 backdrop-blur-2xl shadow-[0_0_80px_rgba(0,0,0,0.95)] flex flex-col justify-between overflow-hidden select-none"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#00F0FF]/20 pb-4 font-mono text-xs">
              <div className="flex items-center gap-3">
                <span className="text-[#00F0FF] font-bold">// DIGITAL SCRAP WORKBENCH</span>
                <span className="text-[#646973]">DRAG ABANDONED FRAGMENTS</span>
              </div>

              {/* Secret Receptor Slot */}
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-lg border border-dashed border-[#00F0FF]/40 text-[10px] text-[#00F0FF]">
                  <span>[RECEPTOR SLOT]</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-[#BBCCD7] hover:text-[#00F0FF]"
                >
                  [CLOSE_]
                </button>
              </div>
            </div>

            {/* Draggable Scrap Field */}
            <div className="relative flex-1 flex items-center justify-center">
              {initialScraps.map((scrap) => (
                <motion.div
                  key={scrap.id}
                  drag
                  dragConstraints={{ left: -300, right: 300, top: -180, bottom: 180 }}
                  whileDrag={{ scale: 1.08, zIndex: 50 }}
                  onDragEnd={(e, info) => handleDragEnd(e, info, scrap)}
                  initial={{ x: scrap.initialX, y: scrap.initialY }}
                  className={`absolute p-4 rounded-2xl border cursor-grab active:cursor-grabbing ${
                    scrap.isSecretKey
                      ? 'border-[#00F0FF] bg-[#00F0FF]/15 text-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.3)]'
                      : 'border-[#D7E2EA]/20 bg-[#16161C] text-[#BBCCD7]'
                  }`}
                >
                  <span className="font-mono text-[9px] uppercase tracking-wider block opacity-60 mb-1">
                    {scrap.label}
                  </span>
                  <span className="font-mono text-xs font-bold block">{scrap.content}</span>
                </motion.div>
              ))}
            </div>

            {/* Footer Notice */}
            <div className="border-t border-[#00F0FF]/20 pt-4 font-mono text-[10px] text-[#646973] flex justify-between">
              <span>UNFINISHED EXPERIMENTS / ARCHIVED SPECIFICATIONS</span>
              <span className="text-[#00F0FF]">[DRAG KEY TO RECEPTOR TO UNLOCK BLUEPRINT]</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ScrapsDrawer;
