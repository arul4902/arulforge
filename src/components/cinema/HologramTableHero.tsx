import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CinematicTableScene } from './CinematicTableScene';
import { brand } from '../../data/brand';
import { projects } from '../../data/projects';
import { useCursor } from '../../context/CursorContext';
import { ArrowDown } from 'lucide-react';

interface HologramTableHeroProps {
  onOpenEnquiry: () => void;
}

export const HologramTableHero: React.FC<HologramTableHeroProps> = ({ onOpenEnquiry }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { setCursor, resetCursor } = useCursor();

  // Track scroll over 400vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth scroll transformations for each phase
  // Phase 1: Idea light pulse & text (0.00 - 0.15)
  const ideaTextOpacity = useTransform(scrollYProgress, [0.0, 0.08, 0.16], [1, 1, 0]);
  const ideaLightScale = useTransform(scrollYProgress, [0.0, 0.1, 0.25], [1, 2.5, 8]);
  const ideaLightGlow = useTransform(scrollYProgress, [0.0, 0.12, 0.25], [0.8, 1, 0.2]);

  // Phase 2: Blueprint lines & floating nodes (0.15 - 0.35)
  const blueprintOpacity = useTransform(scrollYProgress, [0.12, 0.2, 0.35, 0.45], [0, 1, 1, 0.4]);
  const blueprintGridScale = useTransform(scrollYProgress, [0.12, 0.35], [0.4, 1]);
  const understandTextOpacity = useTransform(scrollYProgress, [0.16, 0.22, 0.3, 0.36], [0, 1, 1, 0]);

  // Phase 3: Digital City Rising (0.35 - 0.65)
  const cityTranslateY = useTransform(scrollYProgress, [0.3, 0.55], [120, 0]);
  const cityScaleY = useTransform(scrollYProgress, [0.3, 0.55], [0.1, 1]);
  const cityOpacity = useTransform(scrollYProgress, [0.3, 0.4, 0.85, 0.95], [0, 1, 1, 0]);
  const experiencesTextOpacity = useTransform(scrollYProgress, [0.35, 0.42, 0.55, 0.62], [0, 1, 1, 0]);

  // Phase 4: Vertical Scanning Beam (0.60 - 0.85)
  const scanBeamY = useTransform(scrollYProgress, [0.6, 0.82], ['0%', '100%']);
  const scanBeamOpacity = useTransform(scrollYProgress, [0.58, 0.62, 0.82, 0.86], [0, 1, 1, 0]);

  // Phase 5: Browser Window Separation & Zoom into Digital World (0.80 - 1.00)
  const browserScale = useTransform(scrollYProgress, [0.78, 0.92, 1.0], [0.65, 1.05, 3.2]);
  const browserOpacity = useTransform(scrollYProgress, [0.75, 0.82, 0.96, 1.0], [0, 1, 1, 0]);
  const browserTranslateY = useTransform(scrollYProgress, [0.78, 0.92, 1.0], [40, 0, -60]);
  const studioDarken = useTransform(scrollYProgress, [0.78, 0.94], [0, 0.95]);
  const finaleTextOpacity = useTransform(scrollYProgress, [0.84, 0.9, 0.96], [0, 1, 0]);

  // Background camera subtle push
  const cameraZoom = useTransform(scrollYProgress, [0, 0.8], [1, 1.15]);

  const handleScrollDown = () => {
    window.scrollTo({ top: window.innerHeight * 4.2, behavior: 'smooth' });
  };

  const floatingNodes = ['AUDIENCE', 'BRAND', 'GOAL', 'CONTENT', 'EXPERIENCE'];
  const engineeringLabels = ['DESIGN', 'DEVELOPMENT', 'INTERACTION', 'PERFORMANCE', 'RESPONSIVE', 'DEPLOYMENT'];

  return (
    <div ref={containerRef} className="relative h-[400vh] w-full bg-[#02050b]">
      {/* Sticky 100vh Viewport View */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between select-none">
        {/* Layer 1: Photorealistic Conference Room Studio Scene with Man at Table */}
        <motion.div
          className="absolute inset-0 z-0 origin-center pointer-events-none"
          style={{ scale: cameraZoom }}
        >
          <CinematicTableScene scrollProgress={scrollYProgress} />
        </motion.div>

        {/* Layer 2: Studio Darkening Curtain as Browser Expands in Phase 5 */}
        <motion.div
          className="absolute inset-0 bg-[#040a13] pointer-events-none z-10"
          style={{ opacity: studioDarken }}
        />

        {/* Layer 3: Depth Typography BEHIND the Holographic Objects */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-6 text-center">
          {/* Phase 1 Text: EVERYTHING STARTS WITH AN IDEA */}
          <motion.div
            style={{ opacity: ideaTextOpacity }}
            className="absolute flex flex-col items-center text-center"
          >
            <span className="font-mono text-xs sm:text-sm tracking-[0.35em] text-[#00D4FF] mb-2 uppercase">
              PHASE 01 // GENESIS
            </span>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight uppercase leading-none drop-shadow-[0_0_35px_rgba(0,212,255,0.4)]">
              EVERYTHING <br />
              <span className="text-gradient-cyan">STARTS WITH AN IDEA.</span>
            </h2>
          </motion.div>

          {/* Phase 2 Text: UNDERSTAND BEFORE WE BUILD */}
          <motion.div
            style={{ opacity: understandTextOpacity }}
            className="absolute flex flex-col items-center text-center max-w-3xl"
          >
            <span className="font-mono text-xs sm:text-sm tracking-[0.35em] text-[#00D4FF] mb-2 uppercase">
              PHASE 02 // ARCHITECTURE
            </span>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight uppercase leading-none">
              UNDERSTAND <br />
              <span className="text-gradient-cyan">BEFORE WE BUILD.</span>
            </h2>
          </motion.div>

          {/* Phase 3 Text: WE DON'T JUST BUILD WEBSITES. WE FORGE EXPERIENCES. */}
          <motion.div
            style={{ opacity: experiencesTextOpacity }}
            className="absolute flex flex-col items-center text-center max-w-4xl"
          >
            <span className="font-mono text-xs sm:text-sm tracking-[0.35em] text-[#00D4FF] mb-3 uppercase">
              PHASE 03 // DIGITAL WORLD EMERGENCE
            </span>
            <h2 className="hero-title-clamp font-display font-black text-white tracking-tight uppercase leading-[0.92]">
              <span className="block text-white/50">WE DON&rsquo;T JUST BUILD WEBSITES.</span>
              <span className="block text-gradient-cyan">WE FORGE EXPERIENCES.</span>
            </h2>
          </motion.div>

          {/* Phase 5 Text: IDEA. FORGED. ARULFORGE */}
          <motion.div
            style={{ opacity: finaleTextOpacity }}
            className="absolute flex flex-col items-center text-center"
          >
            <span className="font-mono text-xs text-[#00D4FF] tracking-[0.3em] uppercase mb-2">
              DEPLOYED WORLDWIDE
            </span>
            <h2 className="font-display text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tight uppercase leading-none">
              IDEA. FORGED.
            </h2>
            <p className="font-mono text-xs sm:text-sm text-[#8D96A8] mt-3 tracking-widest uppercase">
              ARULFORGE // DIGITAL EXPERIENCE / ONLINE. <span className="text-emerald-400">● LIVE</span>
            </p>
          </motion.div>
        </div>

        {/* Layer 4: Interactive Holographic Projection Plane over the Table */}
        <div className="absolute inset-0 z-30 pointer-events-none flex flex-col items-center justify-center">
          {/* Phase 1: Pinpoint Cyan Light Pulsing in Center of Table */}
          <motion.div
            style={{ scale: ideaLightScale, opacity: ideaLightGlow }}
            className="absolute top-[64%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
          >
            <div className="w-3 h-3 rounded-full bg-[#00D4FF] shadow-[0_0_25px_#00D4FF,0_0_60px_#7df9ff]" />
            <div className="absolute w-12 h-12 rounded-full border border-[#00D4FF]/40 animate-ping" />
            <div className="absolute w-28 h-8 rounded-[100%] border border-[#00D4FF]/30 rotate-12" />
          </motion.div>

          {/* Phase 2: Table Blueprint Grid & Floating Technical Nodes */}
          <motion.div
            style={{ opacity: blueprintOpacity, scale: blueprintGridScale }}
            className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-5xl h-[320px]"
          >
            {/* Holographic Isometric Table Grid */}
            <div className="relative w-full h-full border border-[#00D4FF]/30 bg-gradient-to-b from-[#00D4FF]/10 to-transparent [transform:perspective(800px)_rotateX(62deg)] shadow-[0_0_50px_rgba(0,212,255,0.15)]">
              {/* Internal grid lines */}
              <div className="absolute inset-0 forge-grid-line opacity-40" />

              {/* Glowing Coordinate Crosshairs */}
              <div className="absolute top-2 left-2 font-mono text-[9px] text-[#00D4FF]">GRID_ORIGIN [0,0,0]</div>
              <div className="absolute bottom-2 right-2 font-mono text-[9px] text-[#00D4FF]">SURFACE_CALIBRATED // 2026</div>

              {/* Concentric Sonar Pulse */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-[#00D4FF]/40 animate-pulse" />
            </div>

            {/* Floating Technical Node Labels */}
            <div className="absolute inset-0 flex items-center justify-around pointer-events-none">
              {floatingNodes.map((label, idx) => (
                <div
                  key={label}
                  className="px-3 py-1.5 rounded bg-[#0A0E27]/90 border border-[#00D4FF] text-[#00D4FF] font-mono text-[10px] tracking-widest shadow-[0_0_15px_rgba(0,212,255,0.3)] animate-pulse"
                  style={{ animationDelay: `${idx * 0.25}s` }}
                >
                  [ {label} ]
                </div>
              ))}
            </div>
          </motion.div>

          {/* Phase 3 & 4: THE DIGITAL CITY RISING FROM THE TABLE */}
          <motion.div
            style={{
              opacity: cityOpacity,
              translateY: cityTranslateY,
              scaleY: cityScaleY,
            }}
            className="absolute top-[44%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl px-4 flex items-end justify-center gap-3 sm:gap-6"
          >
            {/* Hologram Building 1: Mobile Interface Wireframe */}
            <div className="w-24 sm:w-36 h-48 sm:h-72 rounded-t-xl border border-[#00D4FF]/60 bg-[#0A0E27]/70 backdrop-blur-sm p-2 flex flex-col justify-between shadow-[0_0_30px_rgba(0,212,255,0.2)]">
              <div className="flex justify-between items-center pb-1 border-b border-[#00D4FF]/30">
                <span className="font-mono text-[8px] text-[#00D4FF]">MOBILE_UI</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]" />
              </div>
              <div className="space-y-1.5 my-auto">
                <div className="h-10 rounded bg-[#00D4FF]/20 border border-[#00D4FF]/40" />
                <div className="h-3 w-3/4 rounded bg-white/10" />
                <div className="h-3 w-1/2 rounded bg-white/10" />
              </div>
              <div className="font-mono text-[8px] text-[#8D96A8]">RESPONSIVE_CORE</div>
            </div>

            {/* Hologram Building 2: Central Tower / Browser Window (AI Mock Interview Coach / Real Project) */}
            <div className="relative w-56 sm:w-96 h-64 sm:h-96 rounded-t-2xl border-2 border-[#00D4FF] bg-[#070A12]/85 backdrop-blur-md overflow-hidden shadow-[0_0_50px_rgba(0,212,255,0.35)] flex flex-col">
              {/* Window Header */}
              <div className="px-3 py-1.5 bg-[#0A0E27] border-b border-[#00D4FF]/40 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-white/30" />
                  <span className="w-2 h-2 rounded-full bg-white/30" />
                  <span className="w-2 h-2 rounded-full bg-white/30" />
                </div>
                <span className="font-mono text-[9px] text-[#00D4FF]">https://arulforge.site/city</span>
                <span className="font-mono text-[8px] text-emerald-400">ONLINE</span>
              </div>

              {/* Window Content: Scanning Beam effect & Real Project screenshot preview */}
              <div className="relative flex-1 bg-[#040813] overflow-hidden">
                <img
                  src={projects[0].image}
                  alt="Real Project Preview"
                  className="w-full h-full object-cover object-top opacity-75"
                />

                {/* Laser Scanning Beam Traveling Vertically */}
                <motion.div
                  style={{ top: scanBeamY, opacity: scanBeamOpacity }}
                  className="absolute left-0 right-0 h-[2px] bg-white shadow-[0_0_15px_#00D4FF,0_0_30px_#ffffff] z-20 flex items-center justify-end pr-2"
                >
                  <span className="font-mono text-[8px] text-[#00D4FF] bg-[#070A12] px-1 rounded border border-[#00D4FF]">
                    SCAN // RENDERING_LIVE
                  </span>
                </motion.div>
              </div>

              {/* Tower Base Footing */}
              <div className="p-2 bg-[#0A0E27] border-t border-[#00D4FF]/30 flex justify-between font-mono text-[8px] text-[#8D96A8]">
                <span>TOWER_01 // AI_COACH</span>
                <span className="text-[#00D4FF]">STRUCTURE_VERIFIED</span>
              </div>
            </div>

            {/* Hologram Building 3: Architectural Monolith (HVAC Services) */}
            <div className="w-32 sm:w-52 h-56 sm:h-80 rounded-t-xl border border-[#00D4FF]/70 bg-[#0A0E27]/75 backdrop-blur-sm overflow-hidden flex flex-col justify-between shadow-[0_0_35px_rgba(0,212,255,0.25)]">
              <div className="p-2 border-b border-[#00D4FF]/30 font-mono text-[8px] text-[#00D4FF] flex justify-between">
                <span>STRUCTURE_02</span>
                <span>HVAC_SERVICES</span>
              </div>
              <img
                src={projects[1].image}
                alt="HVAC Preview"
                className="w-full h-36 object-cover object-top opacity-60"
              />
              <div className="p-2 border-t border-[#00D4FF]/20 font-mono text-[8px] text-[#8D96A8]">
                BUSINESS_CONVERSION
              </div>
            </div>

            {/* Hologram Building 4: Editorial Code Block */}
            <div className="hidden sm:flex w-36 h-60 rounded-t-xl border border-[#00D4FF]/50 bg-[#0A0E27]/60 p-3 flex-col justify-between font-mono text-[9px] text-[#00D4FF]/70">
              <div className="border-b border-[#00D4FF]/20 pb-1 text-[#00D4FF]">API_ROUTES</div>
              <div className="space-y-1 text-[8px] text-[#8D96A8]">
                <div>const forge = async() =&gt; &#123;</div>
                <div className="pl-2">design: 100,</div>
                <div className="pl-2">performance: 99,</div>
                <div>&#125;;</div>
              </div>
              <div className="text-emerald-400 text-[8px]">COMPILED</div>
            </div>
          </motion.div>

          {/* Phase 4 Scanning Beam Engineering Labels Bar */}
          <motion.div
            style={{ opacity: scanBeamOpacity }}
            className="absolute bottom-16 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4 flex flex-wrap justify-center gap-3"
          >
            {engineeringLabels.map((lbl) => (
              <span
                key={lbl}
                className="px-2.5 py-1 rounded bg-[#0A0E27] border border-[#00D4FF] text-[#00D4FF] font-mono text-[9px] tracking-wider shadow-[0_0_12px_rgba(0,212,255,0.25)]"
              >
                ● {lbl}
              </span>
            ))}
          </motion.div>

          {/* Phase 5: Browser Window Separates, Floats to Camera & We Pass Through */}
          <motion.div
            style={{
              scale: browserScale,
              opacity: browserOpacity,
              translateY: browserTranslateY,
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-4xl rounded-2xl border-2 border-[#00D4FF] bg-[#070A12] shadow-[0_0_100px_rgba(0,212,255,0.55)] overflow-hidden flex flex-col z-50 pointer-events-auto"
          >
            {/* Browser Top Bar */}
            <div className="px-4 py-3 bg-[#0A0E27] border-b border-[#00D4FF]/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <div className="ml-4 px-3 py-1 rounded-md bg-[#101522] border border-[#00D4FF]/40 font-mono text-xs text-[#00D4FF] flex items-center gap-2">
                  <span className="text-emerald-400">🔒</span>
                  <span>https://arulforge.com</span>
                </div>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs text-[#00D4FF]">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <span>ALL SYSTEMS OPERATIONAL</span>
              </div>
            </div>

            {/* Browser Body Interior: The Digital Gateway to the Portfolio */}
            <div className="p-8 sm:p-14 bg-gradient-to-b from-[#070A12] to-[#040813] text-center space-y-6">
              <span className="font-mono text-xs text-[#00D4FF] tracking-[0.3em] uppercase block">
                [ PORTAL ACTIVE // ENTERING THE FORGED REALM ]
              </span>
              <h3 className="font-display text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">
                WELCOME TO <br />
                <span className="text-gradient-cyan">ARULFORGE.</span>
              </h3>
              <p className="text-sm sm:text-base text-[#8D96A8] max-w-xl mx-auto">
                Scroll down to fly through the completed project city, inspect real client architectures, and commission your next digital presence.
              </p>
              <div className="pt-4 flex justify-center gap-4">
                <button
                  onClick={handleScrollDown}
                  className="px-6 py-3 rounded-full bg-[#00D4FF] text-[#070A12] font-mono text-xs font-bold flex items-center gap-2 hover:bg-white transition-colors"
                >
                  <span>PASS THROUGH GATEWAY</span>
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Top Floating Studio Header & Brand Mark */}
        <div className="relative z-40 max-w-7xl mx-auto w-full px-5 sm:px-8 pt-6 flex items-center justify-between font-mono text-xs">
          <div className="flex items-center gap-3">
            <span className="font-display font-black text-xl text-white tracking-tight">
              {brand.name}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#00D4FF] shadow-[0_0_8px_#00D4FF]" />
            <span className="hidden sm:inline-block text-[#8D96A8] tracking-widest pl-2 border-l border-white/10">
              CINEMATIC HOLOGRAPHIC STUDIO
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenEnquiry}
              onMouseEnter={() => setCursor('forge')}
              onMouseLeave={resetCursor}
              className="px-4 py-2 rounded-full bg-[#00D4FF] text-[#070A12] font-mono text-xs font-bold tracking-wider hover:bg-white transition-colors shadow-[0_0_20px_rgba(0,212,255,0.35)] cursor-pointer"
            >
              START A PROJECT ↗
            </button>
          </div>
        </div>

        {/* Bottom Hero HUD Instructions & Scroll Progress Meter */}
        <div className="relative z-40 max-w-7xl mx-auto w-full px-5 sm:px-8 pb-6 flex items-center justify-between font-mono text-[11px] text-[#8D96A8] border-t border-white/10 pt-4">
          <div className="flex items-center gap-3 text-[#00D4FF]">
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            <span>SCROLL DOWN = CONSTRUCT // SCROLL UP = REVERSE</span>
          </div>

          <div className="hidden sm:flex items-center gap-4">
            <span>400VH CONTINUOUS SEQUENCE</span>
            <span className="text-white/20">//</span>
            <span>{brand.location}</span>
          </div>

          <div className="flex items-center gap-2">
            <span>STATUS:</span>
            <span className="text-emerald-400 font-bold">● HOLOGRAPHIC CORE ARMED</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HologramTableHero;
