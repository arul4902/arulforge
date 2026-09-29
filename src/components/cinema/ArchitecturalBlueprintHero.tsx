import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ArchitecturalBlueprintScene } from './ArchitecturalBlueprintScene';
import { projects } from '../../data/projects';
import { ArrowUpRight } from 'lucide-react';
import { useCursor } from '../../context/CursorContext';

interface ArchitecturalBlueprintHeroProps {
  onOpenEnquiry: () => void;
}

export const ArchitecturalBlueprintHero: React.FC<ArchitecturalBlueprintHeroProps> = ({
  onOpenEnquiry,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { setCursor, resetCursor } = useCursor();

  // Track scroll across the 500vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setScrollProgress(latest);
  });

  // --- MINIMAL NARRATIVE ANNOTATIONS (80% VISUAL / 20% TEXT) ---
  // Initial prompt (0 - 4%)
  const initialPromptOpacity = useTransform(scrollYProgress, [0.0, 0.03, 0.06], [1, 0.8, 0]);

  // Phase 1: Blueprint lines on table (4% - 12%)
  const blueprintTextOpacity = useTransform(scrollYProgress, [0.04, 0.08, 0.12], [0, 1, 0]);

  // Phase 2: Structural Columns rising (12% - 25%)
  const columnsTextOpacity = useTransform(scrollYProgress, [0.12, 0.18, 0.25], [0, 1, 0]);

  // Phase 3: The City Rises (25% - 45%)
  const cityRisesTextOpacity = useTransform(scrollYProgress, [0.26, 0.35, 0.44], [0, 1, 0]);

  // Phase 4: Tech Stack City (45% - 60%)
  const techStackTextOpacity = useTransform(scrollYProgress, [0.45, 0.52, 0.59], [0, 1, 0]);

  // Phase 5: Project Reveals (60% - 75%)
  const projectActive = scrollProgress >= 0.59 && scrollProgress <= 0.76;
  const currentProject =
    scrollProgress < 0.65
      ? projects.find((p) => p.id === 'hvac-services') || projects[1]
      : scrollProgress < 0.70
      ? projects.find((p) => p.id === 'plumbing-services') || projects[2]
      : projects.find((p) => p.id === 'mock-interview-coach') || projects[0];

  // Phase 6: What We Forge Districts (75% - 85%)
  const whatWeForgeOpacity = useTransform(scrollYProgress, [0.75, 0.80, 0.85], [0, 1, 0]);
  const currentDistrict =
    scrollProgress < 0.77
      ? { title: 'BUSINESS WEBSITES', desc: 'Digital storefronts engineered to turn attention into enquiries.' }
      : scrollProgress < 0.79
      ? { title: 'PREMIUM LANDING PAGES', desc: 'Focused experiences built around one decisive customer action.' }
      : scrollProgress < 0.81
      ? { title: 'CREATIVE WEB EXPERIENCES', desc: 'Motion, interaction and storytelling designed to make brands impossible to ignore.' }
      : scrollProgress < 0.83
      ? { title: 'FULL-STACK APPLICATIONS', desc: 'Frontend, backend, APIs and data engineered as one seamless product.' }
      : { title: 'AI-POWERED EXPERIENCES', desc: 'Intelligent capabilities integrated into practical digital workflows.' };

  // Phase 7: Instagram ➜ Website (85% - 92%)
  const socialTransformOpacity = useTransform(scrollYProgress, [0.85, 0.88, 0.92], [0, 1, 0]);

  // Phase 8: The Complete City & Finale (92% - 100%)
  const finaleOpacity = useTransform(scrollYProgress, [0.91, 0.95, 1.0], [0, 1, 1]);

  return (
    <div ref={containerRef} className="relative h-[500vh] w-full bg-[#02050b]">
      {/* Sticky 100vh Viewport View */}
      <div className="sticky top-0 h-screen w-full overflow-hidden select-none">
        {/* Layer 1: Three.js 3D Architectural Blueprint Scene */}
        <ArchitecturalBlueprintScene scrollProgress={scrollProgress} />

        {/* Layer 2: Subtle Architectural Studio Vignette */}
        <div className="absolute inset-0 pointer-events-none z-10 bg-radial-vignette" />

        {/* Layer 3: Minimal Construction Annotations (Zero Cyberpunk / Zero HUD) */}
        <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 sm:p-12 pointer-events-none">
          {/* Top Edge: Minimal Brand Indicator */}
          <div className="flex items-center justify-between text-xs font-mono tracking-widest text-[#8D96A8]">
            <span className="text-[#AEE4FF]/80">ARULFORGE // ARCHITECTURAL BLUEPRINT</span>
            <span className="hidden sm:inline">CONSTRUCTION: {(scrollProgress * 100).toFixed(0)}%</span>
          </div>

          {/* Central Area: Contextual Architectural Annotations */}
          <div className="relative flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
            {/* INITIAL STATE (0% Scroll): Table is empty with tiny light point */}
            <motion.div
              style={{ opacity: initialPromptOpacity }}
              className="flex flex-col items-center gap-3 transition-opacity"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_12px_#ffffff]" />
              <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-[#AEE4FF] uppercase">
                SCROLL TO FORGE ↓
              </span>
            </motion.div>

            {/* 04% - 12%: THE BLUEPRINT */}
            <motion.div
              style={{ opacity: blueprintTextOpacity }}
              className="absolute flex flex-col items-center"
            >
              <span className="font-mono text-xs tracking-[0.25em] text-[#AEE4FF] uppercase mb-1">
                STEP 01
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-light text-white tracking-tight uppercase">
                THE BLUEPRINT
              </h2>
              <p className="font-mono text-xs text-[#8D96A8] mt-1 tracking-wider">
                Footprints and road axes mapped onto the table.
              </p>
            </motion.div>

            {/* 12% - 25%: FOUNDATIONS */}
            <motion.div
              style={{ opacity: columnsTextOpacity }}
              className="absolute flex flex-col items-center"
            >
              <span className="font-mono text-xs tracking-[0.25em] text-[#AEE4FF] uppercase mb-1">
                STEP 02
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-light text-white tracking-tight uppercase">
                FOUNDATIONS & COLUMNS
              </h2>
              <p className="font-mono text-xs text-[#8D96A8] mt-1 tracking-wider">
                Structural lines physically growing upward from height: 0.
              </p>
            </motion.div>

            {/* 25% - 45%: THE CITY RISES */}
            <motion.div
              style={{ opacity: cityRisesTextOpacity }}
              className="absolute flex flex-col items-center"
            >
              <span className="font-mono text-xs tracking-[0.25em] text-[#AEE4FF] uppercase mb-1">
                STEP 03
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-light text-white tracking-tight uppercase">
                THE DIGITAL CITY RISES
              </h2>
              <p className="font-mono text-xs text-[#8D96A8] mt-1 tracking-wider">
                Floor slabs, walls, and architectural structures assembling across the table.
              </p>
            </motion.div>

            {/* 45% - 60%: TECH STACK CITY */}
            <motion.div
              style={{ opacity: techStackTextOpacity }}
              className="absolute flex flex-col items-center"
            >
              <span className="font-mono text-xs tracking-[0.25em] text-[#AEE4FF] uppercase mb-1">
                FULL-STACK ARCHITECTURE
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-light text-white tracking-tight uppercase">
                ENGINEERED ECOSYSTEM
              </h2>
              <p className="font-mono text-xs text-[#8D96A8] mt-1 tracking-wider">
                Data and energy streams connecting Frontend, Backend, and Data layers.
              </p>
            </motion.div>

            {/* 75% - 85%: WHAT WE FORGE (CAPABILITY DISTRICTS) */}
            <motion.div
              style={{ opacity: whatWeForgeOpacity }}
              className="absolute flex flex-col items-center max-w-xl"
            >
              <span className="font-mono text-xs tracking-[0.25em] text-[#AEE4FF] uppercase mb-1">
                CAPABILITY DISTRICT
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-medium text-white tracking-tight uppercase">
                {currentDistrict.title}
              </h2>
              <p className="font-mono text-xs sm:text-sm text-[#8D96A8] mt-2 tracking-wide leading-relaxed">
                &ldquo;{currentDistrict.desc}&rdquo;
              </p>
            </motion.div>

            {/* 85% - 92%: INSTAGRAM ➜ WEBSITE */}
            <motion.div
              style={{ opacity: socialTransformOpacity }}
              className="absolute flex flex-col items-center max-w-lg"
            >
              <span className="font-mono text-xs tracking-[0.25em] text-[#AEE4FF] uppercase mb-1">
                TRANSFORMATION
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-semibold text-white tracking-tight uppercase leading-snug">
                FROM SOCIAL PRESENCE <br />
                <span className="text-[#AEE4FF]">TO DIGITAL EXPERIENCE.</span>
              </h2>
              <p className="font-mono text-xs text-[#8D96A8] mt-2 tracking-widest uppercase">
                Discovered on social. Remembered on the web.
              </p>
            </motion.div>
          </div>

          {/* Bottom Area: Contextual Interactions & Final Typography */}
          <div className="relative w-full flex flex-col items-center">
            {/* 60% - 75%: PROJECT CARD REVEAL (Interactive VIEW LIVE ↗) */}
            {projectActive && currentProject && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="w-full max-w-md mx-auto p-4 sm:p-5 rounded-lg bg-[#040916]/85 backdrop-blur-md border border-[#AEE4FF]/30 pointer-events-auto flex items-center justify-between gap-4 shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
              >
                <div>
                  <span className="font-mono text-[10px] text-[#AEE4FF] tracking-widest uppercase">
                    BUILDING SHELL OPEN // {currentProject.category}
                  </span>
                  <h3 className="font-display text-base sm:text-lg font-bold text-white uppercase tracking-tight">
                    {currentProject.title}
                  </h3>
                  <div className="flex gap-2 mt-1">
                    {currentProject.tech.map((t) => (
                      <span key={t} className="font-mono text-[10px] text-[#8D96A8]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href={currentProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setCursor('view')}
                  onMouseLeave={resetCursor}
                  className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded bg-[#AEE4FF] text-[#02050b] font-mono text-xs font-bold tracking-wider hover:bg-white transition-colors cursor-pointer"
                >
                  <span>LIVE</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            )}

            {/* 92% - 100%: THE COMPLETE CITY FINALE TYPOGRAPHY & CTA */}
            <motion.div
              style={{ opacity: finaleOpacity }}
              className="w-full flex flex-col items-center text-center pointer-events-auto max-w-3xl mx-auto"
            >
              <span className="font-mono text-xs tracking-[0.3em] text-[#AEE4FF] uppercase mb-2">
                ARULFORGE // THE COMPLETE DIGITAL CITY
              </span>

              <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase leading-tight">
                WE DON&rsquo;T JUST <br />
                <span className="text-white/40">BUILD WEBSITES.</span> <br />
                <span className="text-[#AEE4FF]">WE FORGE EXPERIENCES.</span>
              </h1>

              <p className="text-xs sm:text-sm text-[#8D96A8] max-w-md mt-3 font-normal">
                Independent creative web development studio turning brands, ideas, and businesses into distinctive digital products.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={onOpenEnquiry}
                  onMouseEnter={() => setCursor('forge')}
                  onMouseLeave={resetCursor}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#AEE4FF] text-[#02050b] font-mono text-xs font-black tracking-wider hover:bg-white transition-all shadow-[0_0_25px_rgba(174,228,255,0.4)] cursor-pointer"
                >
                  <span>START A PROJECT</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <a
                  href="#about"
                  className="font-mono text-xs text-[#8D96A8] hover:text-white transition-colors tracking-widest uppercase py-2 px-4"
                >
                  EXPLORE THE STUDIO ↓
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchitecturalBlueprintHero;
