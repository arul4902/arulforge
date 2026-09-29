import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useCursor } from '../../context/CursorContext';

interface CinematicVideoHeroProps {
  onOpenEnquiry?: () => void;
}

export const CinematicVideoHero: React.FC<CinematicVideoHeroProps> = ({ onOpenEnquiry }) => {
  const heroRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [duration, setDuration] = useState<number>(0);
  const [isVideoReady, setIsVideoReady] = useState<boolean>(false);
  const { setCursor, resetCursor } = useCursor();

  // Persistent references for smooth, jitter-free scrubbing loop
  const targetTimeRef = useRef<number>(0);
  const smoothTimeRef = useRef<number>(0);

  // Single source of scroll tracking across the 500vh container
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end end'],
  });

  // Calculate targetTime on scroll changes:
  // 0% -> 85% scroll maps to 0% -> 100% of video duration.
  // 85% -> 100% scroll holds the completed final frame (100% duration).
  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    if (!videoRef.current) return;
    const dur = videoRef.current.duration;
    if (!Number.isFinite(dur) || dur <= 0) return;

    const constructionProgress = Math.min(progress / 0.85, 1);
    targetTimeRef.current = constructionProgress * dur;
  });

  // Persistent requestAnimationFrame loop: smooth lerp with 0.12 factor
  useEffect(() => {
    let raf: number;

    const update = () => {
      const video = videoRef.current;
      if (video && Number.isFinite(video.duration) && video.duration > 0) {
        const target = targetTimeRef.current;

        // Smooth lerp towards targetTime
        smoothTimeRef.current += (target - smoothTimeRef.current) * 0.12;

        // Only update currentTime when difference is meaningful (prevents seek jitter/shaking)
        if (Math.abs(video.currentTime - smoothTimeRef.current) > 0.015) {
          video.currentTime = smoothTimeRef.current;
        }
      }

      raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update);

    return () => cancelAnimationFrame(raf);
  }, [duration]);

  // Initial video configuration on load
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure video never autoplays normally
    video.pause();

    const handleLoadedMetadata = () => {
      if (video.duration && Number.isFinite(video.duration)) {
        setDuration(video.duration);
        setIsVideoReady(true);
        video.pause();
        video.currentTime = 0;
        targetTimeRef.current = 0;
        smoothTimeRef.current = 0;
      }
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('canplay', handleLoadedMetadata);

    if (video.readyState >= 1 && video.duration) {
      handleLoadedMetadata();
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('canplay', handleLoadedMetadata);
    };
  }, []);

  // --- CONTENT TIMELINE ANIMATIONS ---
  // 0–15%: Initial cue (fades by 15%)
  const cueOpacity = useTransform(scrollYProgress, [0.0, 0.06, 0.15], [1, 0.8, 0]);

  // 15–35%: Frontend District
  const frontendOpacity = useTransform(scrollYProgress, [0.15, 0.22, 0.30, 0.35], [0, 1, 1, 0]);

  // 35–50%: Backend District
  const backendOpacity = useTransform(scrollYProgress, [0.35, 0.40, 0.47, 0.50], [0, 1, 1, 0]);

  // 50–62%: Data District
  const dataOpacity = useTransform(scrollYProgress, [0.50, 0.54, 0.59, 0.62], [0, 1, 1, 0]);

  // 62–74%: AI District
  const aiOpacity = useTransform(scrollYProgress, [0.62, 0.66, 0.71, 0.74], [0, 1, 1, 0]);

  // 74–85%: Deployment District
  const deployOpacity = useTransform(scrollYProgress, [0.74, 0.78, 0.82, 0.85], [0, 1, 1, 0]);

  // 85–100%: Subtle Darkening Overlay (0 -> 0.25) so video remains fully visible
  const overlayDarken = useTransform(scrollYProgress, [0.85, 0.95], [0, 0.25]);

  // 85–100%: Final Completed City Typography
  const finaleOpacity = useTransform(scrollYProgress, [0.85, 0.90, 1.0], [0, 1, 1]);

  return (
    <section ref={heroRef} className="relative h-[500vh] bg-black">
      {/* 
        STICKY VIEWPORT:
        The video lives inside this single container for the entire 500vh sequence.
        It NEVER unmounts, never fades out, and never disappears into a black screen.
      */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black select-none">
        {/* Full-Screen Video Container */}
        <div className="relative w-full h-full overflow-hidden">
          <video
            ref={videoRef}
            src="/videos/arulforge-forge.mp4"
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover scale-[1.09] origin-center pointer-events-none transform-gpu transition-opacity duration-700"
            style={{ opacity: isVideoReady ? 1 : 0.85 }}
          />

          {/* Watermark crop & edge gradient to ensure zero watermark bleed */}
          <div className="absolute bottom-0 right-0 w-52 h-32 bg-gradient-to-tl from-black via-black/80 to-transparent pointer-events-none z-10" />

          {/* Soft atmospheric film vignette */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.45) 85%, rgba(0,0,0,0.85) 100%)',
            }}
          />

          {/* 85%–100% Subtle Darkening Overlay (Max 0.25) — Video NEVER fades out */}
          <motion.div
            style={{ opacity: overlayDarken }}
            className="absolute inset-0 bg-black pointer-events-none z-15"
          />
        </div>

        {/* ======================================================== */}
        {/* CONTENT TIMELINE OVERLAYS (80% Visual / 20% Subtle Text) */}
        {/* ======================================================== */}
        <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-6 sm:p-12">
          {/* Top Header Stamp */}
          <div className="flex items-center justify-between text-xs font-mono tracking-widest text-[#8D96A8]">
            <span className="text-[#AEE4FF]/80">ARULFORGE // CINEMATIC FORGE</span>
            <span className="hidden sm:inline">HOLOGRAPHIC BLUEPRINT</span>
          </div>

          {/* 0%–15%: Initial Cue at the Empty Table */}
          <motion.div
            style={{ opacity: cueOpacity }}
            className="absolute inset-x-0 bottom-12 flex flex-col items-center justify-center text-center"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_12px_#ffffff] mb-2 animate-pulse" />
            <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-[#AEE4FF] uppercase">
              SCROLL TO FORGE ↓
            </span>
          </motion.div>

          {/* 15%–35%: FRONTEND DISTRICT */}
          <motion.div
            style={{ opacity: frontendOpacity }}
            className="absolute left-6 sm:left-14 bottom-20 sm:bottom-28 max-w-sm"
          >
            <div className="px-4 py-3 rounded-lg bg-black/60 backdrop-blur-md border border-[#00D4FF]/25 shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
              <span className="font-mono text-[10px] tracking-[0.25em] text-[#00D4FF] uppercase block mb-1">
                DISTRICT 01 // ARCHITECTURE
              </span>
              <h3 className="font-display text-lg sm:text-xl font-bold text-white uppercase tracking-tight">
                FRONTEND
              </h3>
              <p className="font-mono text-xs text-[#8D96A8] mt-1 space-x-2">
                <span>React</span> • <span>Next.js</span> • <span>TypeScript</span> • <span>Tailwind CSS</span>
              </p>
            </div>
          </motion.div>

          {/* 35%–50%: BACKEND DISTRICT */}
          <motion.div
            style={{ opacity: backendOpacity }}
            className="absolute right-6 sm:right-14 bottom-20 sm:bottom-28 max-w-sm text-right"
          >
            <div className="px-4 py-3 rounded-lg bg-black/60 backdrop-blur-md border border-[#00D4FF]/25 shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
              <span className="font-mono text-[10px] tracking-[0.25em] text-[#00D4FF] uppercase block mb-1">
                DISTRICT 02 // ENGINE
              </span>
              <h3 className="font-display text-lg sm:text-xl font-bold text-white uppercase tracking-tight">
                BACKEND
              </h3>
              <p className="font-mono text-xs text-[#8D96A8] mt-1 space-x-2">
                <span>Java</span> • <span>Spring Boot</span> • <span>REST APIs</span>
              </p>
            </div>
          </motion.div>

          {/* 50%–62%: DATA DISTRICT */}
          <motion.div
            style={{ opacity: dataOpacity }}
            className="absolute left-6 sm:left-14 bottom-20 sm:bottom-28 max-w-sm"
          >
            <div className="px-4 py-3 rounded-lg bg-black/60 backdrop-blur-md border border-[#00D4FF]/25 shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
              <span className="font-mono text-[10px] tracking-[0.25em] text-[#00D4FF] uppercase block mb-1">
                DISTRICT 03 // PERSISTENCE
              </span>
              <h3 className="font-display text-lg sm:text-xl font-bold text-white uppercase tracking-tight">
                DATA
              </h3>
              <p className="font-mono text-xs text-[#8D96A8] mt-1">
                <span>MySQL Relational Architecture</span>
              </p>
            </div>
          </motion.div>

          {/* 62%–74%: AI DISTRICT */}
          <motion.div
            style={{ opacity: aiOpacity }}
            className="absolute right-6 sm:right-14 bottom-20 sm:bottom-28 max-w-sm text-right"
          >
            <div className="px-4 py-3 rounded-lg bg-black/60 backdrop-blur-md border border-[#00D4FF]/25 shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
              <span className="font-mono text-[10px] tracking-[0.25em] text-[#00D4FF] uppercase block mb-1">
                DISTRICT 04 // INTELLIGENCE
              </span>
              <h3 className="font-display text-lg sm:text-xl font-bold text-white uppercase tracking-tight">
                AI
              </h3>
              <p className="font-mono text-xs text-[#8D96A8] mt-1 space-x-2">
                <span>GPT API</span> • <span>Prompt Engineering</span> • <span>AI-Assisted Development</span>
              </p>
            </div>
          </motion.div>

          {/* 74%–85%: DEPLOYMENT DISTRICT */}
          <motion.div
            style={{ opacity: deployOpacity }}
            className="absolute left-6 sm:left-14 bottom-20 sm:bottom-28 max-w-sm"
          >
            <div className="px-4 py-3 rounded-lg bg-black/60 backdrop-blur-md border border-[#00D4FF]/25 shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
              <span className="font-mono text-[10px] tracking-[0.25em] text-[#00D4FF] uppercase block mb-1">
                DISTRICT 05 // INFRASTRUCTURE
              </span>
              <h3 className="font-display text-lg sm:text-xl font-bold text-white uppercase tracking-tight">
                DEPLOYMENT
              </h3>
              <p className="font-mono text-xs text-[#8D96A8] mt-1 space-x-2">
                <span>Vercel</span> • <span>AWS</span> • <span>GitHub</span>
              </p>
            </div>
          </motion.div>

          {/* 85%–100%: FINAL MESSAGE OVER THE FULLY COMPLETED CITY */}
          <motion.div
            style={{ opacity: finaleOpacity }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
          >
            <div className="max-w-2xl mx-auto flex flex-col items-center">
              <span className="font-mono text-xs tracking-[0.35em] text-[#00D4FF] uppercase mb-3">
                ARULFORGE / DIGITAL STUDIO
              </span>

              <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight uppercase leading-[0.95]">
                IDEA. <br />
                <span className="text-[#AEE4FF]">FORGED.</span>
              </h1>

              <h2 className="font-display text-lg sm:text-2xl font-bold text-white/90 uppercase tracking-tight mt-4">
                WE FORGE DIGITAL EXPERIENCES.
              </h2>

              <p className="font-mono text-xs text-[#8D96A8] max-w-md mt-3 tracking-wide">
                Independent creative studio transforming businesses and ideas into distinctive digital products.
              </p>

              {onOpenEnquiry && (
                <div className="mt-8 pointer-events-auto flex items-center gap-4">
                  <button
                    onClick={onOpenEnquiry}
                    onMouseEnter={() => setCursor('forge')}
                    onMouseLeave={resetCursor}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#00D4FF] text-[#02050b] font-mono text-xs font-black tracking-wider hover:bg-white transition-all shadow-[0_0_30px_rgba(0,212,255,0.4)] cursor-pointer"
                  >
                    <span>START A PROJECT</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <a
                    href="#work"
                    className="font-mono text-xs text-[#8D96A8] hover:text-white transition-colors tracking-widest uppercase px-4 py-2"
                  >
                    SELECTED WORK ↓
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CinematicVideoHero;
