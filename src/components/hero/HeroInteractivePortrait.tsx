import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

interface HeroInteractivePortraitProps {
  onDevModeChange?: (active: boolean) => void;
  onFirstInteraction?: () => void;
}

// Clean Forge Precision Portrait Specification

export const HeroInteractivePortrait: React.FC<HeroInteractivePortraitProps> = ({
  onDevModeChange,
  onFirstInteraction,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const portraitBoxRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // 3D Tilt states (lerped via RAF for smooth damping)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, tx: 0, ty: 0, scale: 1 });
  const [spotlight, setSpotlight] = useState({ x: 260, y: 300, opacity: 0 });
  const [lensPos, setLensPos] = useState({ x: 260, y: 300, isHovering: false });
  const [isDevMode, setIsDevMode] = useState(false);

  const targetTilt = useRef({ rx: 0, ry: 0, tx: 0, ty: 0, scale: 1 });
  const targetSpotlight = useRef({ x: 260, y: 300, opacity: 0 });
  const targetLens = useRef({ x: 260, y: 300, isHovering: false });
  const hasTriggeredFirstRef = useRef(false);

  // Parallax layer depths
  const [layerOffsets, setLayerOffsets] = useState({
    layer1: { x: 0, y: 0 }, // bg glow
    layer2: { x: 0, y: 0 }, // grid pattern
    layer4: { x: 0, y: 0 }, // code symbols
    layer5: { x: 0, y: 0 }, // tech badges
  });
  const targetLayers = useRef({
    l1: { x: 0, y: 0 },
    l2: { x: 0, y: 0 },
    l4: { x: 0, y: 0 },
    l5: { x: 0, y: 0 },
  });

  // Portrait -> About scroll transformation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Portrait scales down and translates seamlessly into the narrative flow
  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 0.84]);
  const scrollYOffset = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.95, 1], [1, 0.9, 0.8]);

  // Animation loop with requestAnimationFrame for 60fps buttery physics
  useEffect(() => {
    if (shouldReduceMotion) return;

    let animId: number;

    const updatePhysics = () => {
      // Lerp tilt
      setTilt((prev) => ({
        rx: prev.rx + (targetTilt.current.rx - prev.rx) * 0.08,
        ry: prev.ry + (targetTilt.current.ry - prev.ry) * 0.08,
        tx: prev.tx + (targetTilt.current.tx - prev.tx) * 0.08,
        ty: prev.ty + (targetTilt.current.ty - prev.ty) * 0.08,
        scale: prev.scale + (targetTilt.current.scale - prev.scale) * 0.08,
      }));

      // Lerp spotlight
      setSpotlight((prev) => ({
        x: prev.x + (targetSpotlight.current.x - prev.x) * 0.09,
        y: prev.y + (targetSpotlight.current.y - prev.y) * 0.09,
        opacity: prev.opacity + (targetSpotlight.current.opacity - prev.opacity) * 0.07,
      }));

      // Lerp lens
      setLensPos((prev) => ({
        x: prev.x + (targetLens.current.x - prev.x) * 0.12,
        y: prev.y + (targetLens.current.y - prev.y) * 0.12,
        isHovering: targetLens.current.isHovering,
      }));

      // Lerp multi-layer parallax
      setLayerOffsets((prev) => ({
        layer1: {
          x: prev.layer1.x + (targetLayers.current.l1.x - prev.layer1.x) * 0.05,
          y: prev.layer1.y + (targetLayers.current.l1.y - prev.layer1.y) * 0.05,
        },
        layer2: {
          x: prev.layer2.x + (targetLayers.current.l2.x - prev.layer2.x) * 0.06,
          y: prev.layer2.y + (targetLayers.current.l2.y - prev.layer2.y) * 0.06,
        },
        layer4: {
          x: prev.layer4.x + (targetLayers.current.l4.x - prev.layer4.x) * 0.09,
          y: prev.layer4.y + (targetLayers.current.l4.y - prev.layer4.y) * 0.09,
        },
        layer5: {
          x: prev.layer5.x + (targetLayers.current.l5.x - prev.layer5.x) * 0.12,
          y: prev.layer5.y + (targetLayers.current.l5.y - prev.layer5.y) * 0.12,
        },
      }));

      animId = requestAnimationFrame(updatePhysics);
    };

    animId = requestAnimationFrame(updatePhysics);

    return () => cancelAnimationFrame(animId);
  }, [shouldReduceMotion]);

  // Global mouse move listener relative to portrait center
  useEffect(() => {
    // Only desktop mouse interactions
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch || shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!portraitBoxRef.current) return;
      const rect = portraitBoxRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.hypot(deltaX, deltaY);

      // Activation threshold around portrait (~380px)
      const activationDistance = Math.max(rect.width, rect.height) * 0.85;

      // Check Developer Mode activation
      const devModeActive = distance < activationDistance;
      if (devModeActive !== isDevMode) {
        setIsDevMode(devModeActive);
        onDevModeChange?.(devModeActive);
      }

      // Trigger first meaningful interaction headline reaction
      if (devModeActive && !hasTriggeredFirstRef.current) {
        hasTriggeredFirstRef.current = true;
        onFirstInteraction?.();
      }

      // Normalized coordinates (-1 to +1)
      const normX = Math.max(-1, Math.min(1, deltaX / (window.innerWidth * 0.5)));
      const normY = Math.max(-1, Math.min(1, deltaY / (window.innerHeight * 0.5)));

      // 3D Tilt calculations: rotateX, rotateY max 6-8 deg, translate max 12px
      targetTilt.current = {
        rx: -normY * 7.5,
        ry: normX * 7.5,
        tx: normX * 12,
        ty: normY * 12,
        scale: devModeActive ? 1.025 : 1,
      };

      // Multi-layer parallax offsets at different speeds
      targetLayers.current = {
        l1: { x: normX * 10, y: normY * 10 }, // layer 1: 0.02
        l2: { x: normX * 18, y: normY * 18 }, // layer 2: 0.04
        l4: { x: normX * 36, y: normY * 36 }, // layer 4: 0.09
        l5: { x: normX * 52, y: normY * 52 }, // layer 5: 0.13
      };

      // Spotlight coordinates relative to portrait
      const localX = e.clientX - rect.left;
      const localY = e.clientY - rect.top;

      const spotOpacity = Math.max(0, 1 - distance / (activationDistance * 1.2)) * 0.55;
      targetSpotlight.current = {
        x: localX,
        y: localY,
        opacity: spotOpacity,
      };

      // Interactive Glass lens: only active when directly hovering portrait rect
      const insideRect =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      targetLens.current = {
        x: localX,
        y: localY,
        isHovering: insideRect,
      };
    };

    const handleMouseLeave = () => {
      targetTilt.current = { rx: 0, ry: 0, tx: 0, ty: 0, scale: 1 };
      targetSpotlight.current = { x: 260, y: 300, opacity: 0 };
      targetLens.current = { x: 260, y: 300, isHovering: false };
      targetLayers.current = {
        l1: { x: 0, y: 0 },
        l2: { x: 0, y: 0 },
        l4: { x: 0, y: 0 },
        l5: { x: 0, y: 0 },
      };
      setIsDevMode(false);
      onDevModeChange?.(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isDevMode, onDevModeChange, onFirstInteraction, shouldReduceMotion]);

  return (
    <div
      ref={containerRef}
      className="relative w-full flex justify-center items-center select-none"
    >
      {/* LAYER 1 — Background Glow (speed 0.02) */}
      <div
        style={{
          transform: `translate3d(${layerOffsets.layer1.x}px, ${layerOffsets.layer1.y}px, 0)`,
          willChange: 'transform',
        }}
        className="absolute -inset-10 -z-30 pointer-events-none flex items-center justify-center transition-opacity duration-700"
      >
        <div
          className={`w-[450px] sm:w-[550px] md:w-[650px] h-[450px] sm:h-[550px] md:h-[650px] rounded-full blur-[90px] transition-all duration-700 ${
            isDevMode
              ? 'bg-gradient-to-tr from-[#00F0FF]/30 via-[#7621B0]/30 to-[#B600A8]/20 scale-105'
              : 'bg-gradient-to-tr from-[#7621B0]/20 via-[#B600A8]/15 to-transparent scale-95'
          }`}
        />
      </div>

      {/* LAYER 2 — Subtle Abstract Blueprint/Grid Pattern (speed 0.04) */}
      <div
        style={{
          transform: `translate3d(${layerOffsets.layer2.x}px, ${layerOffsets.layer2.y}px, 0)`,
          willChange: 'transform',
        }}
        className="absolute w-[360px] sm:w-[480px] md:w-[600px] h-[480px] sm:h-[580px] md:h-[700px] -z-20 pointer-events-none border border-[#D7E2EA]/[0.06] rounded-[50px] overflow-hidden"
      >
        <div
          className="w-full h-full opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0, 240, 255, 0.25) 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      {/* LAYER 3 — 3D Cursor-Tracking Portrait with Perspective */}
      <motion.div
        style={{
          scale: shouldReduceMotion ? 1 : scrollScale,
          y: shouldReduceMotion ? 0 : scrollYOffset,
          opacity: shouldReduceMotion ? 1 : scrollOpacity,
          perspective: 1100,
        }}
        className="relative z-10 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[500px]"
      >
        <div
          ref={portraitBoxRef}
          data-cursor="explore"
          style={{
            transform: shouldReduceMotion
              ? 'none'
              : `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translate3d(${tilt.tx}px, ${tilt.ty}px, 0) scale(${tilt.scale})`,
            transformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
          className="relative rounded-3xl overflow-hidden cursor-pointer group"
        >
          {/* CURSOR SPOTLIGHT (Soft cyan/blue radial light reacting to visitor) */}
          <div
            style={{
              background: `radial-gradient(circle 260px at ${spotlight.x}px ${spotlight.y}px, rgba(0, 240, 255, ${
                spotlight.opacity * 0.75
              }), rgba(0, 128, 255, ${spotlight.opacity * 0.35}), transparent 75%)`,
              opacity: spotlight.opacity > 0.02 ? 1 : 0,
              willChange: 'background, opacity',
            }}
            className="absolute inset-0 pointer-events-none z-20 mix-blend-screen transition-opacity duration-300"
          />

          {/* INTERACTIVE GLASS LENS (Direct portrait hover effect) */}
          {lensPos.isHovering && !shouldReduceMotion && (
            <div
              style={{
                transform: `translate3d(${lensPos.x - 55}px, ${lensPos.y - 55}px, 0)`,
                width: 110,
                height: 110,
              }}
              className="absolute top-0 left-0 rounded-full border border-[#00F0FF]/40 bg-[#00F0FF]/[0.04] backdrop-contrast-125 backdrop-brightness-110 pointer-events-none z-30 shadow-[0_0_20px_rgba(0,240,255,0.25)] flex items-center justify-center transition-transform duration-75"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
            </div>
          )}

          {/* Genuine Professional Developer Portrait */}
          <img
            src="/arul_portrait.jpg"
            alt="Arul S. — Full Stack Developer"
            className="w-full h-auto object-cover max-h-[68vh] sm:max-h-[75vh] md:max-h-[80vh] drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)] transition-all duration-500"
            loading="eager"
          />

          {/* Subtle rim glow overlay on developer mode */}
          <div
            className={`absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-500 [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)] ${
              isDevMode ? 'opacity-40 shadow-[inset_0_0_30px_#00F0FF]' : 'opacity-0'
            }`}
          />
        </div>
      </motion.div>

      {/* LAYER 4 — FORGE TELEMETRY CALIBRATION OVERLAY */}
      <div
        style={{
          transform: `translate3d(${layerOffsets.layer4.x}px, ${layerOffsets.layer4.y}px, 0)`,
          willChange: 'transform',
        }}
        className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-4"
        aria-hidden="true"
      >
        <div className="flex justify-between items-center text-[10px] font-mono text-[#00F0FF]/60 select-none">
          <span>// PORTRAIT_PLATE_01</span>
          <span>LAT: 37.77 // CALIBRATED</span>
        </div>
        <div className="flex justify-between items-center text-[10px] font-mono text-[#00F0FF]/60 select-none">
          <span>ARUL S. // FULL STACK</span>
          <span className="text-[#00F0FF]">SCAN WITH LENS</span>
        </div>
      </div>
    </div>
  );
};

export default HeroInteractivePortrait;
