import React, { useEffect, useRef } from 'react';

interface TheForgeCoreProps {
  scrollProgress?: number;
}

export const TheForgeCore: React.FC<TheForgeCoreProps> = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;
    let scrollY = window.scrollY;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Generate fragments for the chaotic structure
    // Target state: structured browser frame at center
    const FRAGMENT_COUNT = 38;
    const fragments: Array<{
      // Chaotic starting offsets
      chaosX: number;
      chaosY: number;
      chaosZ: number;
      chaosRotX: number;
      chaosRotY: number;
      // Target structured offsets (browser frame layout)
      targetX: number;
      targetY: number;
      targetZ: number;
      width: number;
      height: number;
      type: 'frame' | 'line' | 'dot' | 'code' | 'corner';
      text?: string;
    }> = [];

    const CODE_SNIPPETS = ['<forge/>', 'transform()', '0101', 'grid.css', '0x00D4FF', 'async', '<div>'];

    // Browser target dimensions
    const browserW = Math.min(width * 0.72, 680);
    const browserH = Math.min(height * 0.52, 420);
    const halfW = browserW / 2;
    const halfH = browserH / 2;

    for (let i = 0; i < FRAGMENT_COUNT; i++) {
      const chaosRadius = 250 + Math.random() * 260;
      const chaosAngle = (i / FRAGMENT_COUNT) * Math.PI * 2 + (Math.random() - 0.5) * 0.8;
      
      let targetX = 0;
      let targetY = 0;
      let targetZ = 0;
      let type: 'frame' | 'line' | 'dot' | 'code' | 'corner' = 'line';
      let w = 40 + Math.random() * 60;
      let h = 20 + Math.random() * 40;
      let text = undefined;

      // Assign structured roles on the browser window
      if (i < 4) {
        // Corners of browser
        type = 'corner';
        targetX = (i % 2 === 0 ? -halfW : halfW);
        targetY = (i < 2 ? -halfH : halfH);
        w = 18;
        h = 18;
      } else if (i < 7) {
        // Window controls (dots)
        type = 'dot';
        targetX = -halfW + 28 + (i - 4) * 18;
        targetY = -halfH + 18;
        w = 6;
        h = 6;
      } else if (i < 15) {
        // Main window perimeter bars
        type = 'frame';
        const side = i % 4;
        if (side === 0) { targetX = 0; targetY = -halfH; w = browserW; h = 1; }
        else if (side === 1) { targetX = 0; targetY = halfH; w = browserW; h = 1; }
        else if (side === 2) { targetX = -halfW; targetY = 0; w = 1; h = browserH; }
        else { targetX = halfW; targetY = 0; w = 1; h = browserH; }
      } else if (i < 25) {
        // Inner grid lines & address bar
        type = 'line';
        targetX = (Math.random() - 0.5) * (browserW * 0.7);
        targetY = (Math.random() - 0.5) * (browserH * 0.7);
        w = 50 + Math.random() * 120;
        h = 1;
      } else {
        // Code fragments floating
        type = 'code';
        targetX = (Math.random() - 0.5) * (browserW * 0.8);
        targetY = (Math.random() - 0.5) * (browserH * 0.8);
        text = CODE_SNIPPETS[i % CODE_SNIPPETS.length];
      }

      fragments.push({
        chaosX: Math.cos(chaosAngle) * chaosRadius + (Math.random() - 0.5) * 80,
        chaosY: Math.sin(chaosAngle) * (chaosRadius * 0.65) + (Math.random() - 0.5) * 80,
        chaosZ: (Math.random() - 0.5) * 300,
        chaosRotX: (Math.random() - 0.5) * 2,
        chaosRotY: (Math.random() - 0.5) * 2,
        targetX,
        targetY,
        targetZ,
        width: w,
        height: h,
        type,
        text,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.015;

      // Mouse smoothing
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Calculate alignment factor based on hero scroll (0 = top/chaos, 1 = scrolled/aligned)
      const heroHeight = window.innerHeight * 0.9;
      const scrollFactor = Math.min(1, Math.max(0, scrollY / (heroHeight * 0.8)));

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2 + 30;

      // Interactive mouse tilt
      const mouseTiltX = (mouseY - height / 2) * 0.0004;
      const mouseTiltY = (mouseX - width / 2) * 0.0004;

      // Draw faint center aura glow
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        20,
        centerX,
        centerY,
        Math.max(width * 0.4, 300)
      );
      gradient.addColorStop(0, 'rgba(0, 212, 255, 0.09)');
      gradient.addColorStop(0.5, 'rgba(10, 14, 39, 0.05)');
      gradient.addColorStop(1, 'rgba(7, 10, 18, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Render each fragment interpolating from chaos to structured browser
      fragments.forEach((frag) => {
        // Progress: when scrollFactor goes from 0 to 1, fragments pull from chaos to target
        const curX = centerX + (frag.chaosX * (1 - scrollFactor) + frag.targetX * scrollFactor);
        const curY = centerY + (frag.chaosY * (1 - scrollFactor) + frag.targetY * scrollFactor) - (scrollY * 0.15);
        
        // Slight idle breathing rotation
        const idleRot = Math.sin(time + frag.chaosX) * 0.08 * (1 - scrollFactor * 0.9);
        const totalTiltY = mouseTiltY + idleRot;

        // Apply 3D perspective distortion
        const px = curX + (curY - centerY) * totalTiltY;
        const py = curY + (curX - centerX) * mouseTiltX;

        ctx.save();
        ctx.translate(px, py);

        // Alpha scales with alignment and subtle breathing
        const alpha = 0.2 + (scrollFactor * 0.5) + (Math.sin(time * 2 + frag.chaosX * 0.01) * 0.08);

        if (frag.type === 'corner') {
          ctx.strokeStyle = `rgba(0, 212, 255, ${Math.min(1, alpha + 0.3)})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          const s = frag.width / 2;
          ctx.moveTo(-s, -s);
          ctx.lineTo(s, -s);
          ctx.lineTo(s, s);
          ctx.stroke();
        } else if (frag.type === 'dot') {
          ctx.fillStyle = `rgba(0, 212, 255, ${Math.min(1, alpha + 0.4)})`;
          ctx.beginPath();
          ctx.arc(0, 0, frag.width / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (frag.type === 'frame') {
          ctx.strokeStyle = `rgba(0, 212, 255, ${alpha * 0.6})`;
          ctx.lineWidth = 1;
          ctx.strokeRect(-frag.width / 2, -frag.height / 2, frag.width, frag.height);
        } else if (frag.type === 'line') {
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.35})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(-frag.width / 2, 0);
          ctx.lineTo(frag.width / 2, 0);
          ctx.stroke();
        } else if (frag.type === 'code' && frag.text) {
          ctx.font = '10px "JetBrains Mono", monospace';
          ctx.fillStyle = `rgba(0, 212, 255, ${alpha * 0.5})`;
          ctx.fillText(frag.text, -20, 4);
        }

        ctx.restore();
      });

      // Connect near fragments with faint cyber-welding tracer lines when transitioning
      ctx.strokeStyle = `rgba(0, 212, 255, ${0.08 * (1 - scrollFactor * 0.5)})`;
      ctx.lineWidth = 0.5;
      for (let i = 0; i < fragments.length; i += 4) {
        const next = fragments[(i + 3) % fragments.length];
        const p1x = centerX + (fragments[i].chaosX * (1 - scrollFactor) + fragments[i].targetX * scrollFactor);
        const p1y = centerY + (fragments[i].chaosY * (1 - scrollFactor) + fragments[i].targetY * scrollFactor) - (scrollY * 0.15);
        const p2x = centerX + (next.chaosX * (1 - scrollFactor) + next.targetX * scrollFactor);
        const p2y = centerY + (next.chaosY * (1 - scrollFactor) + next.targetY * scrollFactor) - (scrollY * 0.15);

        ctx.beginPath();
        ctx.moveTo(p1x, p1y);
        ctx.lineTo(p2x, p2y);
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 h-full w-full"
      aria-hidden="true"
    />
  );
};

export default TheForgeCore;
