import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useCursor } from '../../context/CursorContext';

export const ForgeCursor: React.FC = () => {
  const { cursorType, customText } = useCursor();
  const [isTouch, setIsTouch] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  // Motion values for smooth spring movement
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Dot follows tightly
  const dotX = useSpring(mouseX, { stiffness: 900, damping: 50 });
  const dotY = useSpring(mouseY, { stiffness: 900, damping: 50 });

  // Outer ring / badge has deliberate spring lag
  const ringX = useSpring(mouseX, { stiffness: 350, damping: 28 });
  const ringY = useSpring(mouseY, { stiffness: 350, damping: 28 });

  useEffect(() => {
    // Check if device is touch or fine pointer
    const checkTouch = () => {
      const isCoarse = window.matchMedia('(hover: none) or (pointer: coarse)').matches;
      setIsTouch(isCoarse);
      if (!isCoarse) {
        document.documentElement.classList.add('custom-cursor-active');
      } else {
        document.documentElement.classList.remove('custom-cursor-active');
      }
    };

    checkTouch();
    window.addEventListener('resize', checkTouch);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', checkTouch);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, [isVisible, mouseX, mouseY]);

  // Disable completely on touch devices
  if (isTouch || cursorType === 'hidden') return null;

  const isExpanded = cursorType !== 'default';

  const getLabel = () => {
    if (customText) return customText;
    switch (cursorType) {
      case 'view':
        return 'VIEW ↗';
      case 'forge':
        return 'FORGE ↗';
      case 'drag':
        return 'DRAG ↔';
      case 'explore':
        return 'EXPLORE ↗';
      default:
        return '';
    }
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Center Cyan Dot */}
      <motion.div
        className="fixed top-0 left-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00D4FF] shadow-[0_0_8px_#00D4FF]"
        style={{
          x: dotX,
          y: dotY,
          opacity: isVisible && !isExpanded ? 1 : 0,
        }}
      />

      {/* Outer Ring / Interactive Badge */}
      <motion.div
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-colors duration-200 ${
          isExpanded
            ? 'bg-[#00D4FF] text-[#070A12] shadow-[0_0_30px_rgba(0,212,255,0.4)]'
            : 'border border-[#00D4FF]/40 bg-transparent'
        }`}
        style={{
          x: ringX,
          y: ringY,
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          width: isExpanded ? 84 : 32,
          height: isExpanded ? 84 : 32,
          scale: isVisible ? 1 : 0.5,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        {isExpanded && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="font-mono text-[11px] font-bold tracking-wider select-none text-center px-1 uppercase"
          >
            {getLabel()}
          </motion.span>
        )}
      </motion.div>
    </div>
  );
};

export default ForgeCursor;
