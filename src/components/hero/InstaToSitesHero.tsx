import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDown, Sparkles } from 'lucide-react';
import { useCursor } from '../../context/CursorContext';

interface InstaToSitesHeroProps {
  onOpenEnquiry?: () => void;
}

export const InstaToSitesHero: React.FC<InstaToSitesHeroProps> = ({ onOpenEnquiry }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { setCursor, resetCursor } = useCursor();

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

    // Particle system flowing between Instagram (left) and Website (right)
    const PARTICLE_COUNT = 140;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      life: number;
      maxLife: number;
      color: string;
      curveY: number;
    }> = [];

    const initParticle = (p: (typeof particles)[0], startProgress = 0) => {
      // Source: left Instagram phone area
      const isMobile = width < 768;
      const leftCenterX = isMobile ? width * 0.5 : width * 0.24;
      const leftCenterY = isMobile ? height * 0.35 : height * 0.52;

      p.x = leftCenterX + (Math.random() - 0.5) * (isMobile ? 180 : 220);
      p.y = leftCenterY + (Math.random() - 0.5) * (isMobile ? 180 : 300);
      p.size = 1 + Math.random() * 2.8;
      p.life = startProgress;
      p.maxLife = 1.0;
      p.vx = 0.8 + Math.random() * 1.5;
      p.vy = (Math.random() - 0.5) * 0.6;
      p.curveY = (Math.random() - 0.5) * (height * 0.25);
      p.alpha = 0.3 + Math.random() * 0.7;
      p.color = Math.random() > 0.3 ? '#7df9ff' : '#ffffff';
    };

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = {
        x: 0,
        y: 0,
        vx: 1,
        vy: 0,
        size: 2,
        alpha: 0.5,
        life: Math.random(),
        maxLife: 1.0,
        color: '#7df9ff',
        curveY: 0,
      };
      initParticle(p, Math.random());
      particles.push(p);
    }

    const LOOP_DURATION = 13000; // 13-second seamless loop
    const startTime = performance.now();

    const render = (now: number) => {
      const elapsed = now - startTime;
      const loopTime = elapsed % LOOP_DURATION;
      const progress = loopTime / LOOP_DURATION; // 0.0 to 1.0

      // Base background: Dark navy #040a13
      ctx.fillStyle = '#040a13';
      ctx.fillRect(0, 0, width, height);

      // Radial dark atmosphere glow in center
      const centerGlow = ctx.createRadialGradient(
        width * 0.5,
        height * 0.5,
        20,
        width * 0.5,
        height * 0.5,
        Math.max(width * 0.55, 400)
      );
      centerGlow.addColorStop(0, 'rgba(125, 249, 255, 0.07)');
      centerGlow.addColorStop(0.5, 'rgba(4, 10, 19, 0.4)');
      centerGlow.addColorStop(1, 'rgba(4, 10, 19, 1)');
      ctx.fillStyle = centerGlow;
      ctx.fillRect(0, 0, width, height);

      // Background technical grid lines
      ctx.strokeStyle = 'rgba(125, 249, 255, 0.04)';
      ctx.lineWidth = 1;
      const gridSize = 48;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Smooth phase envelopes over 13s cycle
      // Phase 1 (0.0 - 0.35): Left Instagram active & pulsing
      // Phase 2 (0.25 - 0.75): Particle transfer & morphing
      // Phase 3 (0.50 - 0.95): Right Website materialized & glowing
      // Phase 4 (0.85 - 1.0): Seamless cycle reset
      const isMobile = width < 900;

      // Coordinates setup
      const leftX = isMobile ? width * 0.5 - 140 : width * 0.12;
      const leftY = isMobile ? height * 0.28 : height * 0.38;
      const phoneW = isMobile ? 280 : 310;
      const phoneH = isMobile ? 420 : 460;

      const rightX = isMobile ? width * 0.5 - 160 : width * 0.52;
      const rightY = isMobile ? height * 0.62 : height * 0.34;
      const browserW = isMobile ? 320 : Math.min(width * 0.38, 560);
      const browserH = isMobile ? 260 : 490;

      // Left Instagram pulse: peak early, dissolves middle, returns end
      const instaAlpha = 0.5 + Math.sin(progress * Math.PI * 2) * 0.2 + 0.2;
      // Right Website alpha: builds up, stays bright, smooth loop
      const siteAlpha = 0.4 + Math.sin((progress - 0.25) * Math.PI * 2) * 0.35 + 0.25;

      // ==========================================
      // 1. LEFT: GLOWING CYAN WIREFRAME INSTAGRAM
      // ==========================================
      ctx.save();
      ctx.strokeStyle = `rgba(125, 249, 255, ${Math.min(1, Math.max(0.2, instaAlpha))})`;
      ctx.shadowColor = '#7df9ff';
      ctx.shadowBlur = 12 * instaAlpha;
      ctx.lineWidth = 1.5;

      // Outer Phone Outline
      ctx.strokeRect(leftX, leftY, phoneW, phoneH);

      // Top Phone Speaker / Camera Notch
      ctx.beginPath();
      ctx.arc(leftX + phoneW / 2, leftY + 14, 3, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeRect(leftX + phoneW / 2 - 24, leftY + 12, 48, 4);

      // App Header: Profile Avatar Circle + Stats
      const avatarX = leftX + 44;
      const avatarY = leftY + 54;
      ctx.beginPath();
      ctx.arc(avatarX, avatarY, 20, 0, Math.PI * 2);
      ctx.stroke();

      // Profile avatar concentric pulse
      ctx.beginPath();
      const pulseR = 20 + Math.sin(elapsed * 0.004) * 4;
      ctx.arc(avatarX, avatarY, pulseR, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(125, 249, 255, ${0.3 * instaAlpha})`;
      ctx.stroke();
      ctx.strokeStyle = `rgba(125, 249, 255, ${Math.min(1, Math.max(0.2, instaAlpha))})`;

      // Profile handle text
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillStyle = '#7df9ff';
      ctx.fillText('@arulforge', leftX + 78, leftY + 44);

      // Stat Counters (Wireframe boxes)
      const statW = 34;
      const statH = 14;
      for (let s = 0; s < 3; s++) {
        ctx.strokeRect(leftX + 80 + s * 42, leftY + 52, statW, statH);
      }

      // Bio lines (wireframe bars)
      ctx.strokeRect(leftX + 24, leftY + 90, phoneW - 48, 6);
      ctx.strokeRect(leftX + 24, leftY + 102, phoneW - 84, 6);
      ctx.strokeRect(leftX + 24, leftY + 114, phoneW - 120, 6);

      // Story highlights (4 small circles)
      for (let c = 0; c < 4; c++) {
        ctx.beginPath();
        ctx.arc(leftX + 38 + c * 64, leftY + 142, 13, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Tab switcher bar
      ctx.strokeRect(leftX + 16, leftY + 168, phoneW - 32, 18);

      // 3x3 Post Grid (Wireframe cells)
      const gridStartX = leftX + 16;
      const gridStartY = leftY + 196;
      const cellGap = 8;
      const cellW = (phoneW - 32 - cellGap * 2) / 3;
      const cellH = cellW;

      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          const cx = gridStartX + col * (cellW + cellGap);
          const cy = gridStartY + row * (cellH + cellGap);
          const cellIndex = row * 3 + col;

          // Dissolve wave effect moving from left to right as cycle progresses
          const cellDissolve = Math.sin(progress * Math.PI * 2 + cellIndex * 0.4);

          ctx.strokeRect(cx, cy, cellW, cellH);

          // Diagonal wireframe cross inside each post
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + cellW, cy + cellH);
          ctx.moveTo(cx + cellW, cy);
          ctx.lineTo(cx, cy + cellH);
          ctx.strokeStyle = `rgba(125, 249, 255, ${0.35 + cellDissolve * 0.25})`;
          ctx.stroke();
          ctx.strokeStyle = `rgba(125, 249, 255, ${Math.min(1, Math.max(0.2, instaAlpha))})`;
        }
      }

      // Vertical Laser Scanner line moving down Instagram feed
      const scanLineY = leftY + (phoneH * ((progress * 1.8) % 1));
      ctx.beginPath();
      ctx.moveTo(leftX, scanLineY);
      ctx.lineTo(leftX + phoneW, scanLineY);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.restore();

      // ==========================================
      // 2. RIGHT: WIREFRAME WEBSITE LAYOUT
      // ==========================================
      ctx.save();
      ctx.strokeStyle = `rgba(125, 249, 255, ${Math.min(1, Math.max(0.25, siteAlpha))})`;
      ctx.shadowColor = '#7df9ff';
      ctx.shadowBlur = 14 * siteAlpha;
      ctx.lineWidth = 1.5;

      // Outer Browser Window Frame
      ctx.strokeRect(rightX, rightY, browserW, browserH);

      // Browser Window Header / Chrome
      ctx.strokeRect(rightX, rightY, browserW, 36);

      // Window Action Controls: 3 dots (red, yellow, green in cyan wireframe)
      for (let d = 0; d < 3; d++) {
        ctx.beginPath();
        ctx.arc(rightX + 18 + d * 14, rightY + 18, 3.5, 0, Math.PI * 2);
        ctx.stroke();
      }

      // URL Pill Bar containing "https://arulforge.site"
      const urlBoxW = Math.min(browserW - 130, 240);
      const urlBoxX = rightX + 66;
      ctx.strokeRect(urlBoxX, rightY + 9, urlBoxW, 18);
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillStyle = '#7df9ff';
      ctx.fillText('https://arulforge.site', urlBoxX + 12, rightY + 22);

      // Live status pill on right of address bar
      ctx.strokeRect(rightX + browserW - 52, rightY + 9, 38, 18);
      ctx.font = '8px "JetBrains Mono", monospace';
      ctx.fillText('LIVE ●', rightX + browserW - 46, rightY + 21);

      // Website Navbar within the viewport
      const innerY = rightY + 36;
      ctx.strokeRect(rightX, innerY, browserW, 34);
      ctx.font = 'bold 11px "Orbitron", sans-serif';
      ctx.fillText('ARULFORGE', rightX + 18, innerY + 22);

      // Nav Links (Wireframe items)
      if (!isMobile) {
        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.fillText('WORK', rightX + browserW - 170, innerY + 21);
        ctx.fillText('SERVICES', rightX + browserW - 120, innerY + 21);
        ctx.fillText('FORGE ↗', rightX + browserW - 54, innerY + 21);
      }

      // Website Hero Section
      const siteHeroY = innerY + 46;
      // Large Hero Headline Wireframe Bars
      ctx.strokeRect(rightX + 24, siteHeroY, Math.min(browserW - 48, 360), 22);
      ctx.strokeRect(rightX + 24, siteHeroY + 28, Math.min(browserW - 120, 260), 16);
      ctx.strokeRect(rightX + 24, siteHeroY + 50, Math.min(browserW - 180, 200), 8);

      // Primary CTA Button Outline
      const ctaBtnW = 120;
      const ctaBtnH = 26;
      const ctaBtnY = siteHeroY + 68;
      ctx.strokeRect(rightX + 24, ctaBtnY, ctaBtnW, ctaBtnH);
      ctx.font = 'bold 9px "JetBrains Mono", monospace';
      ctx.fillText('START FORGE ↗', rightX + 34, ctaBtnY + 17);

      // 3 Website Feature / Project Cards
      const cardY = ctaBtnY + 40;
      const cardH = Math.max(70, (browserH - (cardY - rightY) - 50));
      const cardGap = 12;
      const numCards = isMobile ? 2 : 3;
      const cardW = (browserW - 48 - (numCards - 1) * cardGap) / numCards;

      for (let c = 0; c < numCards; c++) {
        const cx = rightX + 24 + c * (cardW + cardGap);
        ctx.strokeRect(cx, cardY, cardW, cardH);

        // Internal thumbnail box inside card
        ctx.strokeRect(cx + 8, cardY + 8, cardW - 16, cardH * 0.42);

        // Text lines inside card
        ctx.strokeRect(cx + 8, cardY + cardH * 0.58, cardW - 28, 6);
        ctx.strokeRect(cx + 8, cardY + cardH * 0.74, cardW - 44, 5);
      }

      // Website Footer Bar
      const siteFooterY = rightY + browserH - 32;
      ctx.strokeRect(rightX, siteFooterY, browserW, 32);
      ctx.font = '8px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(125, 249, 255, 0.7)';
      ctx.fillText('© 2026 ARULFORGE // INSTA ➜ SITES', rightX + 16, siteFooterY + 20);
      ctx.fillText('DEPLOYED', rightX + browserW - 68, siteFooterY + 20);

      ctx.restore();

      // ==========================================
      // 3. PARTICLES FLOWING BETWEEN THEM (Left ➜ Right)
      // ==========================================
      ctx.save();
      const targetCenterX = isMobile ? width * 0.5 : rightX + browserW * 0.35;
      const targetCenterY = isMobile ? height * 0.7 : rightY + browserH * 0.45;

      particles.forEach((p, idx) => {
        p.life += 0.007 * p.vx;
        if (p.life > p.maxLife) {
          initParticle(p, 0);
        }

        // Interpolate position from left to right with smooth S-curve
        const t = p.life;
        const startX = isMobile ? width * 0.5 - 100 : leftX + phoneW * 0.8;
        const startY = isMobile ? leftY + phoneH * 0.7 : leftY + phoneH * 0.45;

        // Bezier arching flight path
        const currentX = startX + (targetCenterX - startX) * t;
        const arch = Math.sin(t * Math.PI) * p.curveY;
        const currentY = startY + (targetCenterY - startY) * t + arch;

        // Alpha peaks mid-flight and pulses with loop
        const alpha = Math.sin(t * Math.PI) * p.alpha;

        ctx.globalAlpha = Math.max(0.08, alpha);
        ctx.fillStyle = p.color;
        ctx.shadowColor = '#7df9ff';
        ctx.shadowBlur = p.size * 3;
        ctx.beginPath();
        ctx.arc(currentX, currentY, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;

        // Connect adjacent particles with subtle cyber filament lines
        if (idx % 6 === 0 && idx + 1 < particles.length) {
          const next = particles[idx + 1];
          const nextX = startX + (targetCenterX - startX) * next.life;
          const nextY = startY + (targetCenterY - startY) * next.life + Math.sin(next.life * Math.PI) * next.curveY;
          const dist = Math.hypot(currentX - nextX, currentY - nextY);

          if (dist < 80) {
            ctx.strokeStyle = `rgba(125, 249, 255, ${0.18 * (1 - dist / 80)})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(currentX, currentY);
            ctx.lineTo(nextX, nextY);
            ctx.stroke();
          }
        }
      });
      ctx.restore();

      // ==========================================
      // 4. SCANLINE OVERLAY
      // ==========================================
      ctx.save();
      ctx.fillStyle = 'rgba(0, 0, 0, 0.16)';
      for (let y = 0; y < height; y += 4) {
        ctx.fillRect(0, y, width, 1.5);
      }

      // Moving CRT Scanline Sweep
      const sweepY = (elapsed * 0.08) % (height + 100);
      const sweepGradient = ctx.createLinearGradient(0, sweepY - 50, 0, sweepY);
      sweepGradient.addColorStop(0, 'rgba(125, 249, 255, 0)');
      sweepGradient.addColorStop(0.5, 'rgba(125, 249, 255, 0.04)');
      sweepGradient.addColorStop(1, 'rgba(125, 249, 255, 0.1)');
      ctx.fillStyle = sweepGradient;
      ctx.fillRect(0, sweepY - 50, width, 50);

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleScrollToWork = () => {
    const el = document.querySelector('#work') || document.querySelector('#manifesto');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between pt-24 pb-8 px-5 sm:px-8 bg-[#040a13] overflow-hidden select-none z-10">
      {/* Background Interactive 13s Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0 h-full w-full"
        aria-hidden="true"
      />

      {/* Top HUD Telemetry Status */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between font-mono text-[11px] text-[#7df9ff]/70 tracking-[0.2em] uppercase border-b border-[#7df9ff]/15 pb-4">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-[#7df9ff] shadow-[0_0_8px_#7df9ff] animate-pulse" />
          <span>TRANSFORMATION CORE // 13S LOOP</span>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <span className="text-white/40">SYSTEM:</span>
          <span className="text-[#7df9ff]">INSTA ➜ WEBSITES</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#7df9ff]">HOST: ARULFORGE.SITE</span>
        </div>
      </div>

      {/* Center Hero Content with Orbitron Font */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-12 flex flex-col items-center text-center">
        {/* Glowing Tagline Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#040a13]/80 border border-[#7df9ff]/40 text-[#7df9ff] shadow-[0_0_20px_rgba(125,249,255,0.25)] mb-6 backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#7df9ff]" />
          <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.25em] uppercase">
            Insta ➜ Sites
          </span>
        </motion.div>

        {/* Brand Title: ARULFORGE with Orbitron Font */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1
            style={{ fontFamily: '"Orbitron", sans-serif' }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-white uppercase drop-shadow-[0_0_40px_rgba(125,249,255,0.55)]"
          >
            ARULFORGE
          </h1>
        </motion.div>

        {/* Supporting Copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="mt-6 text-base sm:text-lg md:text-xl text-[#8D96A8] max-w-2xl mx-auto font-normal leading-relaxed"
        >
          We transform constrained social profiles into{' '}
          <span className="text-[#7df9ff] font-semibold">high-conversion, custom-engineered websites</span> that make brands unforgettable.
        </motion.p>

        {/* Action Triggers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={onOpenEnquiry}
            onMouseEnter={() => setCursor('forge')}
            onMouseLeave={resetCursor}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#7df9ff] text-[#040a13] font-mono text-xs sm:text-sm font-black tracking-wider hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(125,249,255,0.45)] cursor-pointer group"
          >
            <span>START A PROJECT</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>

          <button
            onClick={handleScrollToWork}
            onMouseEnter={() => setCursor('default')}
            onMouseLeave={resetCursor}
            className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-[#040a13]/80 hover:bg-[#101522] text-[#F7FAFC] font-mono text-xs sm:text-sm font-medium tracking-wider border border-[#7df9ff]/30 hover:border-[#7df9ff]/70 transition-all duration-200 cursor-pointer group backdrop-blur-sm"
          >
            <span>EXPLORE SITES</span>
            <ArrowDown className="w-4 h-4 text-[#7df9ff] transition-transform duration-200 group-hover:translate-y-1" />
          </button>
        </motion.div>
      </div>

      {/* Bottom Telemetry Ticker */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-4 border-t border-[#7df9ff]/15 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#8D96A8]">
        <div className="flex items-center gap-4 text-[11px] text-[#7df9ff]">
          <span>SOURCE: INSTAGRAM WIREFRAME</span>
          <span>➜</span>
          <span>TARGET: ARULFORGE.SITE</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-[#8D96A8]">
          <span>PARTICLE RATE: 140/SEC</span>
          <span className="text-white/20">//</span>
          <span className="text-[#7df9ff]">SEAMLESS LOOP: 13.00s</span>
        </div>
      </div>
    </section>
  );
};

export default InstaToSitesHero;
