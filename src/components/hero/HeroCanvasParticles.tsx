import React, { useRef, useEffect } from 'react';

interface HeroCanvasParticlesProps {
  isDevMode: boolean;
  mousePos: { x: number; y: number; active: boolean };
}

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  baseAlpha: number;
}

export const HeroCanvasParticles: React.FC<HeroCanvasParticlesProps> = ({
  isDevMode,
  mousePos,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameId = useRef<number>(0);
  const isVisible = useRef<boolean>(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Keep particle density low: 35-45 particles
    const particleCount = Math.min(Math.floor((width * height) / 28000), 40);
    const particles: Particle[] = [];

    const colors = ['#00F0FF', '#7621B0', '#BBCCD7', '#B600A8', '#FFFFFF'];

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const baseAlpha = Math.random() * 0.4 + 0.15;
      particles.push({
        x,
        y,
        originX: x,
        originY: y,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        size: Math.random() * 1.8 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: baseAlpha,
        baseAlpha,
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const render = () => {
      if (!isVisible.current) {
        animFrameId.current = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Mouse position with lerp
      if (mousePos.active) {
        mouseX += (mousePos.x - mouseX) * 0.1;
        mouseY += (mousePos.y - mouseY) * 0.1;
      } else {
        mouseX = -1000;
        mouseY = -1000;
      }

      particles.forEach((p) => {
        // Idle floating drift
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around bounds
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Cursor attraction/repulsion
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.hypot(dx, dy);
        const radius = isDevMode ? 180 : 120;

        if (dist < radius && dist > 0) {
          const force = (1 - dist / radius) * 1.2;
          // Gentle repel
          p.x -= (dx / dist) * force * 1.5;
          p.y -= (dy / dist) * force * 1.5;
          p.alpha = Math.min(1, p.baseAlpha + 0.4);
        } else {
          p.alpha += (p.baseAlpha - p.alpha) * 0.05;
        }

        // Draw particle
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, isDevMode ? p.size * 1.2 : p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = isDevMode ? Math.min(1, p.alpha * 1.4) : p.alpha;
        ctx.shadowBlur = isDevMode ? 8 : 4;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      });

      animFrameId.current = requestAnimationFrame(render);
    };

    // Observer to pause animation when offscreen
    const observer = new IntersectionObserver(([entry]) => {
      isVisible.current = entry.isIntersecting;
    });
    observer.observe(canvas);

    render();

    return () => {
      cancelAnimationFrame(animFrameId.current);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, [isDevMode, mousePos]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none -z-5"
      aria-hidden="true"
    />
  );
};

export default HeroCanvasParticles;
