import React, { useRef, useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const LiquidLayoutGrid: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Mouse offset within section
  const [offsets, setOffsets] = useState([
    { x: 0, y: 0, scale: 1 },
    { x: 0, y: 0, scale: 1 },
    { x: 0, y: 0, scale: 1 },
  ]);

  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const cRect = containerRef.current.getBoundingClientRect();

      // Check if mouse is near or inside section
      if (
        e.clientY < cRect.top - 100 ||
        e.clientY > cRect.bottom + 100 ||
        e.clientX < cRect.left - 50 ||
        e.clientX > cRect.right + 50
      ) {
        // Return to neutral
        setOffsets([
          { x: 0, y: 0, scale: 1 },
          { x: 0, y: 0, scale: 1 },
          { x: 0, y: 0, scale: 1 },
        ]);
        return;
      }

      // Calculate repulsion vector for each card
      const newOffsets = cardsRef.current.map((card) => {
        if (!card) return { x: 0, y: 0, scale: 1 };
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const dist = Math.hypot(dx, dy);

        // Within 220px, push away
        const threshold = 220;
        if (dist < threshold) {
          const power = (1 - dist / threshold) * 22; // max 22px push
          const angle = Math.atan2(dy, dx);
          // Push card in opposite direction
          return {
            x: -Math.cos(angle) * power,
            y: -Math.sin(angle) * power,
            scale: Math.max(0.96, 1 - (power / 22) * 0.04), // slight compression
          };
        }

        return { x: 0, y: 0, scale: 1 };
      });

      setOffsets(newOffsets);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [shouldReduceMotion]);

  const items = [
    {
      label: 'TENSILE TOLERANCE',
      desc: 'Boundaries dynamically yield to physical cursor pressure without breaking DOM hierarchy.',
      spec: 'modulus: 4.8 GPa',
    },
    {
      label: 'ELASTIC REBOUND',
      desc: 'Damped spring equilibrium automatically restores planar alignment on cursor departure.',
      spec: 'damping: 30; stiffness: 450',
    },
    {
      label: 'DEFORMATION MATRIX',
      desc: 'Card volume compresses locally to simulate liquid-metal surface displacement.',
      spec: 'displacement: 22px radial',
    },
  ];

  return (
    <div
      ref={containerRef}
      className="my-20 sm:my-28 max-w-[1400px] mx-auto px-5 sm:px-8 select-none"
    >
      <div className="mb-10 text-center">
        <span className="font-mono text-xs tracking-[0.35em] text-[#00F0FF] uppercase block mb-2">
          // LIQUID MATERIAL LAYOUT
        </span>
        <h3 className="font-kanit font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
          THE FLEXIBLE DIGITAL SURFACE
        </h3>
        <p className="font-light text-xs sm:text-sm text-[#BBCCD7]/60 mt-2 max-w-xl mx-auto font-kanit">
          Push your cursor against the cards below. The rigid grid temporarily yields like liquid material.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            ref={(el) => {
              cardsRef.current[idx] = el;
            }}
            animate={{
              x: shouldReduceMotion ? 0 : offsets[idx]?.x || 0,
              y: shouldReduceMotion ? 0 : offsets[idx]?.y || 0,
              scale: shouldReduceMotion ? 1 : offsets[idx]?.scale || 1,
            }}
            transition={{
              type: 'spring',
              stiffness: 350,
              damping: 24,
              mass: 0.8,
            }}
            className="p-8 rounded-[32px] border border-[#00F0FF]/30 bg-[#0C0C12]/90 backdrop-blur-md shadow-[0_0_25px_rgba(0,240,255,0.08)] flex flex-col justify-between h-72 cursor-pointer transition-colors duration-300 hover:border-[#00F0FF]"
          >
            <div className="flex items-center justify-between border-b border-[#00F0FF]/15 pb-4 font-mono text-xs text-[#00F0FF]">
              <span>[SURFACE_0{idx + 1}]</span>
              <span className="text-[10px] text-[#BBCCD7]/60">{item.spec}</span>
            </div>

            <div>
              <h4 className="font-kanit font-black text-2xl uppercase tracking-tight text-white mb-2">
                {item.label}
              </h4>
              <p className="font-light text-xs sm:text-sm text-[#BBCCD7]/80 leading-relaxed font-kanit">
                {item.desc}
              </p>
            </div>

            <div className="font-mono text-[10px] text-[#00F0FF]/80 flex items-center justify-between">
              <span>FLEXIBLE BOUNDARY</span>
              <span>PRESSURE-REACTIVE</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LiquidLayoutGrid;
