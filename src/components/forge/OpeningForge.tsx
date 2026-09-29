import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OpeningForgeProps {
  onComplete: () => void;
}

export const OpeningForge: React.FC<OpeningForgeProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'dot' | 'drawing' | 'snapped' | 'done'>('dot');
  const [distanceDrawn, setDistanceDrawn] = useState(0);
  const [snapped, setSnapped] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<{ x: number; y: number }[]>([]);
  const prevPosRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    // Show blinking point for 700ms, then prompt DRAWING
    const t = setTimeout(() => {
      setPhase('drawing');
    }, 700);

    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const handlePointerMove = (e: PointerEvent | MouseEvent) => {
      if (snapped) return;

      const currentX = e.clientX;
      const currentY = e.clientY;

      if (prevPosRef.current) {
        const dist = Math.hypot(
          currentX - prevPosRef.current.x,
          currentY - prevPosRef.current.y
        );

        setDistanceDrawn((d) => {
          const next = d + dist;
          if (next > 380 && !snapped) {
            triggerSnap();
          }
          return next;
        });

        pointsRef.current.push({ x: currentX, y: currentY });

        // Draw glowing forge construction line
        ctx.strokeStyle = '#00F0FF';
        ctx.shadowColor = '#00F0FF';
        ctx.shadowBlur = 10;
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        ctx.beginPath();
        ctx.moveTo(prevPosRef.current.x, prevPosRef.current.y);
        ctx.lineTo(currentX, currentY);
        ctx.stroke();

        // Spawn tiny construction sparks
        if (Math.random() > 0.6) {
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(
            currentX + (Math.random() - 0.5) * 12,
            currentY + (Math.random() - 0.5) * 12,
            Math.random() * 2 + 1,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }
      }

      prevPosRef.current = { x: currentX, y: currentY };
    };

    const triggerSnap = () => {
      setSnapped(true);
      setPhase('snapped');

      // Clear drawn scribble with spark burst
      setTimeout(() => {
        ctx.clearRect(0, 0, width, height);
      }, 350);

      // Transition to main forge layout
      setTimeout(() => {
        setPhase('done');
        onComplete();
      }, 2200);
    };

    window.addEventListener('pointermove', handlePointerMove);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [snapped, onComplete]);

  if (phase === 'done') return null;

  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.9, ease: [0.87, 0, 0.13, 1] } }}
        className="fixed inset-0 z-[99999] bg-[#070708] flex flex-col items-center justify-center select-none overflow-hidden"
      >
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />

        {/* Phase 1: Tiny blinking point & INITIALIZING FORGE_ */}
        {phase === 'dot' && (
          <div className="flex flex-col items-center gap-4">
            <div className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] shadow-[0_0_15px_#00F0FF] animate-ping" />
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#00F0FF] opacity-90 animate-pulse">
              INITIALIZING FORGE_
            </span>
          </div>
        )}

        {/* Phase 2: User drawing instructions */}
        {phase === 'drawing' && !snapped && (
          <div className="flex flex-col items-center gap-3 pointer-events-none z-20">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
              <span className="font-mono text-xs tracking-[0.35em] uppercase text-[#D7E2EA]/90">
                MOVE CURSOR TO ASSEMBLE
              </span>
            </div>
            {/* Energy calibration bar */}
            <div className="w-48 h-1 bg-[#1A1A1A] rounded-full overflow-hidden border border-[#D7E2EA]/10">
              <div
                style={{ width: `${Math.min(100, (distanceDrawn / 380) * 100)}%` }}
                className="h-full bg-gradient-to-r from-[#00F0FF] to-[#7621B0] transition-all duration-75"
              />
            </div>
          </div>
        )}

        {/* Phase 3: The lines snap together to form ARULFORGE */}
        {phase === 'snapped' && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            className="flex flex-col items-center gap-4 z-30 pointer-events-none"
          >
            {/* Spark flash effect */}
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute w-40 h-40 rounded-full bg-[#00F0FF]/30 blur-2xl"
            />

            <h1 className="font-kanit font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter uppercase text-white drop-shadow-[0_0_40px_rgba(0,240,255,0.6)]">
              ARUL<span className="text-[#00F0FF]">FORGE</span>
            </h1>

            <div className="flex items-center gap-3 text-xs sm:text-sm font-mono tracking-[0.4em] text-[#BBCCD7]/70 uppercase">
              <span>FORGE MANUFACTURED</span>
              <span className="text-[#00F0FF] font-bold">[ONLINE]</span>
            </div>
          </motion.div>
        )}

        {/* Skip button for quick review */}
        <button
          onClick={() => {
            setSnapped(true);
            setPhase('done');
            onComplete();
          }}
          className="absolute bottom-8 right-8 font-mono text-[10px] tracking-[0.25em] text-[#646973] hover:text-[#00F0FF] uppercase transition-colors z-40"
        >
          [SKIP_SEQUENCE]
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default OpeningForge;
