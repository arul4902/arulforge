import React, { useEffect, useState, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface ScrollCompressionProps {
  children: React.ReactNode;
}

export const ScrollCompression: React.FC<ScrollCompressionProps> = ({ children }) => {
  const shouldReduceMotion = useReducedMotion();
  const [compressionScaleY, setCompressionScaleY] = useState(1);
  const lastScrollY = useRef(0);
  const lastTime = useRef(performance.now());
  const velocityRef = useRef(0);

  useEffect(() => {
    if (shouldReduceMotion) return;

    let animId: number;

    const handleScroll = () => {
      const now = performance.now();
      const currentScrollY = window.scrollY;
      const dt = Math.max(16, now - lastTime.current);
      const dy = currentScrollY - lastScrollY.current;

      const instantVelocity = Math.abs(dy / dt); // pixels per ms
      velocityRef.current = instantVelocity;

      lastScrollY.current = currentScrollY;
      lastTime.current = now;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Smooth physics decay
    const updatePhysics = () => {
      // Decay velocity towards 0
      velocityRef.current *= 0.88;

      // Target scaleY: compression max ~2% (0.98 to 1.0)
      const targetScale = Math.max(0.982, 1 - velocityRef.current * 0.008);

      setCompressionScaleY((prev) => prev + (targetScale - prev) * 0.15);

      animId = requestAnimationFrame(updatePhysics);
    };

    animId = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animId);
    };
  }, [shouldReduceMotion]);

  return (
    <motion.div
      style={{
        transform: shouldReduceMotion ? 'none' : `scaleY(${compressionScaleY})`,
        transformOrigin: '50% 50%',
        willChange: 'transform',
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

export default ScrollCompression;
