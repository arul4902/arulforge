import React, { useRef, useEffect, useState } from 'react';
import type { MotionValue } from 'framer-motion';

interface CinematicTableSceneProps {
  scrollProgress?: number | MotionValue<number>;
  pulseAlpha?: number;
}

export const CinematicTableScene: React.FC<CinematicTableSceneProps> = ({ scrollProgress = 0 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [currentProgress, setCurrentProgress] = useState<number>(
    typeof scrollProgress === 'number' ? scrollProgress : 0
  );

  // Sync scroll progress if it's a MotionValue
  useEffect(() => {
    if (typeof scrollProgress === 'object' && 'on' in scrollProgress) {
      const unsubscribe = (scrollProgress as MotionValue<number>).on('change', (v) => {
        setCurrentProgress(v);
      });
      return () => unsubscribe();
    } else if (typeof scrollProgress === 'number') {
      setCurrentProgress(scrollProgress);
    }
  }, [scrollProgress]);

  // Live Canvas Overlay for Dynamic Holographic Lighting, Particles & Volumetric Sweep
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Floating Hologram Particles rising from the table
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      life: number;
      maxLife: number;
    }

    const particles: Particle[] = Array.from({ length: 45 }, () => ({
      x: width * 0.3 + Math.random() * (width * 0.4),
      y: height * 0.55 + Math.random() * (height * 0.3),
      vx: (Math.random() - 0.5) * 0.4,
      vy: -(Math.random() * 0.8 + 0.3),
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.7 + 0.2,
      life: 0,
      maxLife: Math.random() * 120 + 80,
    }));

    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      const tableHorizonY = height * 0.56;
      const blueLightIntensity = Math.min(1, Math.max(0.1, currentProgress * 1.6));

      // 1. Volumetric Light Ray Sweep (Subtle dynamic ambient beam)
      const beamGrad = ctx.createRadialGradient(
        width * 0.5,
        tableHorizonY + 40,
        10,
        width * 0.5,
        tableHorizonY - height * 0.35,
        width * 0.45
      );
      beamGrad.addColorStop(0, `rgba(0, 212, 255, ${0.16 * blueLightIntensity})`);
      beamGrad.addColorStop(0.35, `rgba(125, 249, 255, ${0.08 * blueLightIntensity})`);
      beamGrad.addColorStop(0.7, `rgba(215, 248, 255, ${0.03 * blueLightIntensity})`);
      beamGrad.addColorStop(1, 'rgba(0, 212, 255, 0)');

      ctx.save();
      ctx.fillStyle = beamGrad;
      ctx.beginPath();
      ctx.moveTo(width * 0.5, tableHorizonY + 30);
      ctx.lineTo(width * 0.15, tableHorizonY - height * 0.45);
      ctx.lineTo(width * 0.85, tableHorizonY - height * 0.45);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // 2. Cyan Table Horizon Glow line
      ctx.save();
      ctx.strokeStyle = `rgba(0, 212, 255, ${0.45 + Math.sin(frame * 0.04) * 0.15})`;
      ctx.lineWidth = 2;
      ctx.shadowColor = '#00D4FF';
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.moveTo(width * 0.2, tableHorizonY);
      ctx.lineTo(width * 0.8, tableHorizonY);
      ctx.stroke();
      ctx.restore();

      // 3. Dynamic Rising Holographic Particles
      ctx.save();
      particles.forEach((p) => {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;

        // Reset if expired
        if (p.life > p.maxLife || p.y < height * 0.2) {
          p.x = width * 0.3 + Math.random() * (width * 0.4);
          p.y = tableHorizonY + Math.random() * (height * 0.25);
          p.life = 0;
          p.alpha = Math.random() * 0.7 + 0.2;
        }

        const currentAlpha = p.alpha * (1 - p.life / p.maxLife) * blueLightIntensity;
        ctx.fillStyle = `rgba(125, 249, 255, ${currentAlpha})`;
        ctx.shadowColor = '#00D4FF';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();

      // 4. Subtle 35mm film grain flicker
      ctx.fillStyle = 'rgba(255, 255, 255, 0.012)';
      for (let g = 0; g < 30; g++) {
        const gx = Math.random() * width;
        const gy = Math.random() * height;
        ctx.fillRect(gx, gy, 1.2, 1.2);
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [currentProgress]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none bg-[#03060f]">
      {/* 
        Layer 1: 4K Master Cinematic Scene 
        Photorealistic Man (Arul S.) in blue shirt leaning over conference table surrounded by onlookers.
        Translucent white wireframe hologram of buildings and city blocks rising from table surface,
        glowing faint blue-white edges, volumetric light, subtle scanline glow, dark warm ambient 
        background, 35mm film look, dramatic low-angle perspective, Tamil cinema color grade.
      */}
      <img
        src="/cinematic_hero_scene.svg"
        alt="ArulForge cinematic holographic blueprint table scene"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        loading="eager"
        decoding="async"
      />

      {/* Layer 2: Live HTML5 Canvas Overlay for real-time 60fps dynamic volumetric beam and particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* Layer 3: Subtle Cinematic Vignette & Edge Bleed */}
      <div 
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(3,6,15,0) 45%, rgba(2,4,10,0.65) 85%, rgba(2,4,10,0.92) 100%)',
        }}
      />
    </div>
  );
};

export default CinematicTableScene;
