import React, { useEffect, useState, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const FloatingProjectPreview: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [activeImg, setActiveImg] = useState<string | null>(null);
  const [pos, setPos] = useState({ x: -500, y: -500 });
  const [rotation, setRotation] = useState(0);

  const prevMouseX = useRef(0);
  const isTouchDevice = useRef(false);

  useEffect(() => {
    isTouchDevice.current = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice.current || shouldReduceMotion) return;

    let targetX = -500;
    let targetY = -500;
    let currentX = -500;
    let currentY = -500;
    let animId: number;

    const updatePosition = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      setPos({ x: currentX, y: currentY });

      animId = requestAnimationFrame(updatePosition);
    };
    animId = requestAnimationFrame(updatePosition);

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX + 30; // slightly offset from cursor
      targetY = e.clientY - 120;

      // Calculate velocity for subtle rotation (-6 to +6 deg)
      const velocity = e.clientX - prevMouseX.current;
      prevMouseX.current = e.clientX;
      const rot = Math.max(-6, Math.min(6, velocity * 0.3));
      setRotation(rot);

      // Check if hovering an element with data-project-preview
      const target = (e.target as HTMLElement).closest('[data-project-preview]');
      if (target) {
        const imgUrl = target.getAttribute('data-project-preview');
        setActiveImg(imgUrl);
      } else {
        setActiveImg(null);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [shouldReduceMotion]);

  if (isTouchDevice.current || shouldReduceMotion || !activeImg) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: activeImg ? 1 : 0,
        scale: activeImg ? 1 : 0.8,
      }}
      transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0) rotate(${rotation}deg)`,
        willChange: 'transform',
      }}
      className="fixed top-0 left-0 pointer-events-none z-[9980] w-[320px] h-[190px] rounded-2xl overflow-hidden border border-[#D7E2EA]/30 bg-[#161616] shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
      aria-hidden="true"
    >
      <img
        src={activeImg}
        alt="Project Preview"
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
    </motion.div>
  );
};

export default FloatingProjectPreview;
