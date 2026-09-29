import React, { useEffect, useState, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState<
    'default' | 'pointer' | 'view' | 'explore' | 'drag'
  >('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Detect touch device
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    setIsTouchDevice(isTouch);
    if (isTouch || shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Inspect target element for cursor type
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        const type = cursorTarget.getAttribute('data-cursor') as any;
        setCursorType(type || 'pointer');
      } else if (
        target.closest('a, button, input, textarea, select, [role="button"]')
      ) {
        setCursorType('pointer');
      } else {
        setCursorType('default');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [shouldReduceMotion]);

  if (isTouchDevice || shouldReduceMotion) return null;

  const isLargeBadge = cursorType === 'view' || cursorType === 'explore' || cursorType === 'drag';

  return (
    <div
      ref={cursorRef}
      className="fixed inset-0 pointer-events-none z-[9990] overflow-hidden"
      aria-hidden="true"
    >
      {/* Central Cursor Dot */}
      <motion.div
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          opacity: isVisible && cursorType === 'default' ? 1 : 0,
        }}
        transition={{ type: 'spring', damping: 40, stiffness: 600, mass: 0.1 }}
        className="w-2 h-2 rounded-full bg-white fixed top-0 left-0"
      />

      {/* Outer Follower / View & Explore Badge */}
      <motion.div
        animate={{
          x: isLargeBadge
            ? mousePosition.x - 44
            : cursorType === 'pointer'
            ? mousePosition.x - 24
            : mousePosition.x - 18,
          y: isLargeBadge
            ? mousePosition.y - 44
            : cursorType === 'pointer'
            ? mousePosition.y - 24
            : mousePosition.y - 18,
          width: isLargeBadge ? 88 : cursorType === 'pointer' ? 48 : 36,
          height: isLargeBadge ? 88 : cursorType === 'pointer' ? 48 : 36,
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.5,
          backgroundColor:
            cursorType === 'explore'
              ? 'rgba(0, 240, 255, 0.88)'
              : cursorType === 'view'
              ? 'rgba(182, 0, 168, 0.88)'
              : cursorType === 'drag'
              ? 'rgba(118, 33, 176, 0.88)'
              : cursorType === 'pointer'
              ? 'rgba(215, 226, 234, 0.15)'
              : 'rgba(215, 226, 234, 0.05)',
          borderColor:
            isLargeBadge
              ? '#FFFFFF'
              : cursorType === 'pointer'
              ? 'rgba(255, 255, 255, 0.5)'
              : 'rgba(215, 226, 234, 0.25)',
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 300,
          mass: 0.2,
        }}
        className={`fixed top-0 left-0 rounded-full border flex items-center justify-center backdrop-blur-sm pointer-events-none ${
          cursorType === 'explore'
            ? 'shadow-[0_0_25px_rgba(0,240,255,0.5)]'
            : cursorType === 'view'
            ? 'shadow-[0_0_25px_rgba(182,0,168,0.5)]'
            : 'shadow-[0_0_15px_rgba(0,0,0,0.3)]'
        }`}
      >
        {cursorType === 'explore' && (
          <span className="text-[11px] font-black uppercase tracking-widest text-[#0C0C0C] select-none">
            EXPLORE
          </span>
        )}
        {cursorType === 'view' && (
          <span className="text-[11px] font-black uppercase tracking-widest text-white select-none">
            VIEW
          </span>
        )}
        {cursorType === 'drag' && (
          <span className="text-[11px] font-black uppercase tracking-widest text-white select-none">
            DRAG
          </span>
        )}
      </motion.div>
    </div>
  );
};

export default CustomCursor;
