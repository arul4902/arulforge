import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArchitecturalCanvas, type SceneHandles } from './ArchitecturalCanvas';
import { PHYSICAL_BUILDINGS } from './buildingsConfig';
import { projects } from '../../data/projects';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { getCameraState } from './CameraPath';

gsap.registerPlugin(ScrollTrigger);

interface ArchitecturalHeroProps {
  onOpenEnquiry?: () => void;
}

export const ArchitecturalHero: React.FC<ArchitecturalHeroProps> = ({ onOpenEnquiry }) => {
  const heroRef = useRef<HTMLElement | null>(null);
  const sceneHandlesRef = useRef<SceneHandles | null>(null);
  const currentProgressRef = useRef(0);
  const lastProjectIdxRef = useRef(-1);

  // DIRECT DOM REFS — ZERO REACT RE-RENDERS ON SCROLL (Performance Rule #1)
  const initialCueRef = useRef<HTMLDivElement | null>(null);
  const blueprintCueRef = useRef<HTMLDivElement | null>(null);
  const foundationsCueRef = useRef<HTMLDivElement | null>(null);
  const constructionCueRef = useRef<HTMLDivElement | null>(null);

  const districtContainerRef = useRef<HTMLDivElement | null>(null);
  const districtNumRef = useRef<HTMLSpanElement | null>(null);
  const districtTitleRef = useRef<HTMLHeadingElement | null>(null);
  const districtDescRef = useRef<HTMLParagraphElement | null>(null);

  const cityHoldRef = useRef<HTMLDivElement | null>(null);
  const diveCueRef = useRef<HTMLDivElement | null>(null);
  const pipelinesCueRef = useRef<HTMLDivElement | null>(null);

  const projectDockRef = useRef<HTMLDivElement | null>(null);
  const projectHeaderRef = useRef<HTMLSpanElement | null>(null);
  const projectTitleRef = useRef<HTMLHeadingElement | null>(null);
  const projectDescRef = useRef<HTMLParagraphElement | null>(null);
  const projectTechContainerRef = useRef<HTMLDivElement | null>(null);
  const projectLinkRef = useRef<HTMLAnchorElement | null>(null);

  const finaleRef = useRef<HTMLDivElement | null>(null);
  const debugOverlayRef = useRef<HTMLDivElement | null>(null);

  const updateTelemetryHUD = (p: number) => {
    if (!debugOverlayRef.current || !sceneHandlesRef.current) return;
    const camState = getCameraState(p);
    const telem = sceneHandlesRef.current.getTelemetry();
    debugOverlayRef.current.innerHTML = `
      <span>PROGRESS: <strong>${p.toFixed(3)}</strong></span>
      <span class="text-[#8D96A8]">|</span>
      <span class="text-white font-bold">${camState.phase}</span>
      <span class="text-[#8D96A8]">|</span>
      <span>FPS: <strong class="${telem.fps >= 50 ? 'text-green-400' : 'text-amber-400'}">${telem.fps}</strong></span>
      <span class="text-[#8D96A8]">|</span>
      <span>CALLS: <strong>${telem.calls}</strong></span>
      <span class="text-[#8D96A8]">|</span>
      <span>TRIS: <strong>${telem.triangles.toLocaleString()}</strong></span>
      <span class="text-[#8D96A8]">|</span>
      <span>GEOM: ${telem.geometries}</span>
      <span class="text-[#8D96A8]">|</span>
      <span>TEX: ${telem.textures}</span>
    `;
  };

  useEffect(() => {
    // Lightweight interval to keep telemetry diagnostics live even when idle
    const interval = setInterval(() => {
      updateTelemetryHUD(currentProgressRef.current);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const initGSAPTimeline = (handles: SceneHandles) => {
    if (!heroRef.current) return;

    ScrollTrigger.getAll().forEach((t) => t.kill());

    // MASTER GSAP TIMELINE:
    // Anchored at exactly 100 duration to match 0.000 to 1.000 scroll progress 1:1!
    // scrub: 0.6 ensures immediate responsive coupling without lag (Rule #28)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          currentProgressRef.current = p;

          // 1. Direct Three.js camera & underground lighting
          handles.setScrollProgress(p);

          // 2. 0% - 8%: Empty Table cue
          if (initialCueRef.current) {
            const show = p < 0.08;
            initialCueRef.current.style.opacity = show ? '1' : '0';
            initialCueRef.current.style.pointerEvents = show ? 'auto' : 'none';
          }

          // 3. 8% - 15%: Blueprint drawing cue
          if (blueprintCueRef.current) {
            const show = p >= 0.08 && p < 0.15;
            blueprintCueRef.current.style.opacity = show ? '1' : '0';
          }

          // 4. 15% - 20%: Foundations cue
          if (foundationsCueRef.current) {
            const show = p >= 0.15 && p < 0.20;
            foundationsCueRef.current.style.opacity = show ? '1' : '0';
          }

          // 5. 20% - 62%: Physical construction cue
          if (constructionCueRef.current) {
            const show = p >= 0.20 && p < 0.62;
            constructionCueRef.current.style.opacity = show ? '1' : '0';
          }

          // 6. 20% - 62%: Dynamic district markers
          if (districtContainerRef.current) {
            let district: { num: string; title: string; desc: string } | null = null;

            if (p >= 0.20 && p < 0.28) {
              district = {
                num: 'DISTRICT 01 // FRONTEND FOUNDATION',
                title: 'HTML & CSS',
                desc: 'Semantic Structure & Visual Systems',
              };
            } else if (p >= 0.28 && p < 0.35) {
              district = {
                num: 'DISTRICT 01 // LOGIC & TYPES',
                title: 'JAVASCRIPT & TYPESCRIPT',
                desc: 'Event-Driven Systems & Strict Type Safety',
              };
            } else if (p >= 0.35 && p < 0.41) {
              district = {
                num: 'DISTRICT 01 // COMPONENT ARCHITECTURE',
                title: 'REACT, NEXT.JS & TAILWIND',
                desc: 'Virtual DOM, Server-Side Rendering & Design Tokens',
              };
            } else if (p >= 0.41 && p < 0.49) {
              district = {
                num: 'SYSTEM INTERCHANGE // GATEWAY',
                title: 'REST API BRIDGE',
                desc: 'Interchange Structure Connecting Frontend to Backend Services',
              };
            } else if (p >= 0.49 && p < 0.54) {
              district = {
                num: 'DISTRICT 02 // ENGINE & PERSISTENCE',
                title: 'JAVA, SPRING BOOT & MYSQL',
                desc: 'Enterprise Microservices & Relational Data Vault',
              };
            } else if (p >= 0.54 && p < 0.59) {
              district = {
                num: 'DISTRICT 03 // INTELLIGENCE',
                title: 'AI & LLM ARCHITECTURE',
                desc: 'GPT-4o, Prompt Engineering & Autonomous Workflows',
              };
            } else if (p >= 0.59 && p < 0.62) {
              district = {
                num: 'DISTRICT 04 // DEPLOYMENT HUB',
                title: 'CLOUD & EDGE DEPLOYMENT',
                desc: 'GitHub CI/CD, Vercel Serverless & AWS Cloud Infrastructure',
              };
            }

            if (district) {
              districtContainerRef.current.style.opacity = '1';
              if (districtNumRef.current) districtNumRef.current.textContent = district.num;
              if (districtTitleRef.current) districtTitleRef.current.textContent = district.title;
              if (districtDescRef.current) districtDescRef.current.textContent = district.desc;
            } else {
              districtContainerRef.current.style.opacity = '0';
            }
          }

          // 7. 62% - 70%: Complete city hold
          if (cityHoldRef.current) {
            const show = p >= 0.62 && p < 0.70;
            cityHoldRef.current.style.opacity = show ? '1' : '0';
          }

          // 8. 70% - 78%: Camera descends below table cue
          if (diveCueRef.current) {
            const show = p >= 0.70 && p < 0.78;
            diveCueRef.current.style.opacity = show ? '1' : '0';
          }

          // 9. 78% - 88%: Pipelines reveal cue
          if (pipelinesCueRef.current) {
            const show = p >= 0.78 && p < 0.88;
            pipelinesCueRef.current.style.opacity = show ? '1' : '0';
          }

          // 10. 88% - 100%: Real Project Station Docks
          if (projectDockRef.current) {
            let projIdx = -1;
            if (p >= 0.88 && p < 0.90) projIdx = 0;
            else if (p >= 0.90 && p < 0.92) projIdx = 1;
            else if (p >= 0.92 && p < 0.94) projIdx = 2;
            else if (p >= 0.94 && p < 0.96) projIdx = 3;
            else if (p >= 0.96 && p < 0.98) projIdx = 4;
            else if (p >= 0.98 && p <= 1.00) projIdx = 5;

            if (projIdx >= 0) {
              projectDockRef.current.style.opacity = '1';
              projectDockRef.current.style.pointerEvents = 'auto';

              if (lastProjectIdxRef.current !== projIdx) {
                lastProjectIdxRef.current = projIdx;
                const pr = projects[projIdx];
                if (pr) {
                  if (projectHeaderRef.current) {
                    projectHeaderRef.current.textContent = `PROJECT STATION ${pr.number} // ${pr.category}`;
                  }
                  if (projectTitleRef.current) {
                    projectTitleRef.current.textContent = pr.title;
                  }
                  if (projectDescRef.current) {
                    projectDescRef.current.textContent = pr.positioning;
                  }
                  if (projectTechContainerRef.current) {
                    projectTechContainerRef.current.innerHTML = pr.tech
                      .map(
                        (t) =>
                          `<span class="font-mono text-[10px] px-2 py-0.5 rounded bg-[#0a1c30] border border-[#00d4ff]/25 text-[#AEE4FF]">${t}</span>`
                      )
                      .join('');
                  }
                  if (projectLinkRef.current) {
                    projectLinkRef.current.href = pr.liveUrl;
                  }
                }
              }
            } else {
              projectDockRef.current.style.opacity = '0';
              projectDockRef.current.style.pointerEvents = 'none';
              lastProjectIdxRef.current = -1;
            }
          }

          // 11. 97% - 100%: Finale CTAs
          if (finaleRef.current) {
            const show = p >= 0.97;
            finaleRef.current.style.opacity = show ? '1' : '0';
            finaleRef.current.style.pointerEvents = show ? 'auto' : 'none';
          }

          // 12. Update Diagnostics HUD
          updateTelemetryHUD(p);
        },
      },
    });

    // ==========================================
    // PHASE 1: EMPTY TABLE (0% → 8%)
    // ==========================================
    tl.to(
      {},
      {
        duration: 8,
        onUpdate: function () {
          const prog = this.progress();
          if (prog > 0.7) {
            handles.blueprintFloor.setSparkOpacity(1 - (prog - 0.7) / 0.3);
          } else {
            handles.blueprintFloor.setSparkOpacity(1);
          }
        },
      },
      0
    );

    // ==========================================
    // PHASE 2: BLUEPRINT DRAWS (8% → 15%)
    // ==========================================
    tl.to(
      {},
      {
        duration: 7,
        ease: 'none',
        onUpdate: function () {
          handles.blueprintFloor.setLineProgress(this.progress());
        },
      },
      8
    );

    // ==========================================
    // PHASE 2.5: FOUNDATIONS RISE (15% → 20%)
    // ==========================================
    // All 18 foundation slabs expand upward and illuminate their footprints
    PHYSICAL_BUILDINGS.forEach((bData, idx) => {
      const bHandle = handles.buildings[bData.id];
      if (!bHandle) return;

      const fStart = 15 + (idx / PHYSICAL_BUILDINGS.length) * 3.5;
      tl.fromTo(
        bHandle.foundationMesh.scale,
        { y: 0.001 },
        { y: 1, duration: 1.2, ease: 'power2.out' },
        fStart
      );
      tl.to(bHandle.foundationMesh.material, { opacity: 0.95, duration: 1.0 }, fStart);
      tl.to(bHandle.foundationEdges.material, { opacity: 0.95, duration: 1.0 }, fStart);
    });

    // ==========================================
    // PHASE 3: TECHNOLOGY BUILDINGS RISE (20% → 62%)
    // ==========================================
    // Floor-by-floor visible construction of all 18 technology buildings with overlapping timelines!
    PHYSICAL_BUILDINGS.forEach((bData) => {
      const bHandle = handles.buildings[bData.id];
      if (!bHandle) return;

      const { constructStart, constructEnd, floors } = bData;
      const totalDuration = constructEnd - constructStart;
      const durationPerFloor = totalDuration / floors;

      for (let f = 0; f < floors; f++) {
        const floorTime = constructStart + f * durationPerFloor;

        // Columns grow upward
        if (bHandle.columnGroups[f]) {
          tl.fromTo(
            bHandle.columnGroups[f].scale,
            { y: 0.0001 },
            { y: 1, duration: durationPerFloor * 0.72, ease: 'power1.out' },
            floorTime
          );
        }

        // Floor slab expands horizontally
        if (bHandle.slabGroups[f]) {
          const sGroup = bHandle.slabGroups[f];
          const slabMesh = sGroup.children[0] as THREE.Mesh;
          tl.fromTo(
            sGroup.scale,
            { x: 0.001, z: 0.001 },
            { x: 1, z: 1, duration: durationPerFloor * 0.55, ease: 'power2.out' },
            floorTime + durationPerFloor * 0.28
          );
          if (slabMesh && slabMesh.material) {
            tl.to(
              slabMesh.material,
              { opacity: 0.85, duration: durationPerFloor * 0.45 },
              floorTime + durationPerFloor * 0.28
            );
          }
        }

        // Facade glass panel fades in
        if (bHandle.facadeMeshes[f]) {
          tl.to(
            bHandle.facadeMeshes[f].material,
            { opacity: 0.16, duration: durationPerFloor * 0.5 },
            floorTime + durationPerFloor * 0.35
          );
        }

        // Floor tech label appears on facade when building reaches ~70%
        if (bHandle.floorSigns[f]) {
          const signObj = bHandle.floorSigns[f];
          tl.to(
            {},
            {
              duration: durationPerFloor * 0.45,
              onUpdate: function () {
                signObj.setOpacity(this.progress());
              },
            },
            floorTime + durationPerFloor * 0.4
          );
        }
      }

      // Roof crown / spire forms at the end of building construction
      if (bHandle.roofGroup) {
        tl.fromTo(
          bHandle.roofGroup.scale,
          { x: 0.001, y: 0.001, z: 0.001 },
          { x: 1, y: 1, z: 1, duration: 1.4, ease: 'back.out(1.4)' },
          constructEnd - 1.2
        );
      }
    });

    // ==========================================
    // PHASE 4: COMPLETE CITY / CONNECTIONS (62% → 70%)
    // ==========================================
    // Data pathways illuminate connecting Frontend -> Bridge -> Backend -> MySQL, AI & Deployment
    tl.to(handles.dataPathways.lineMaterial, { opacity: 0.9, duration: 3 }, 62);
    tl.to(handles.dataPathways.pulseMaterial, { opacity: 1, duration: 3 }, 62);

    // Glowing city illumination
    PHYSICAL_BUILDINGS.forEach((b) => {
      const bHandle = handles.buildings[b.id];
      if (bHandle && bHandle.glowMesh) {
        tl.to(
          bHandle.glowMesh.material,
          { opacity: 0.22, duration: 3.5, ease: 'power2.out' },
          62
        );
      }
    });

    // ANCHOR TWEEN: Guarantees timeline length is EXACTLY 100 duration (Rule #2 & #28)
    tl.to({}, { duration: 0.001 }, 100);
  };

  const handleSceneReady = (handles: SceneHandles) => {
    sceneHandlesRef.current = handles;
    initGSAPTimeline(handles);
  };

  const handleProjectSelect = (project: { liveUrl?: string }) => {
    if (project.liveUrl) {
      window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleResetToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section ref={heroRef} className="relative h-[800vh] bg-[#05070a]">
      {/* 
        STICKY VIEWPORT:
        Fixed for the entire 800vh construction journey.
        The Canvas remains permanently mounted, rendering ONE UNBROKEN WORLD.
      */}
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#05070a] select-none">
        {/* 1. THREE.JS 3D CANVAS */}
        <ArchitecturalCanvas
          onSceneReady={handleSceneReady}
          onProjectSelect={handleProjectSelect}
        />

        {/* 2. SUBTLE ARCHITECTURAL VIGNETTE */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              'radial-gradient(ellipse at 50% 50%, rgba(5,7,10,0) 45%, rgba(5,7,10,0.55) 80%, rgba(5,7,10,0.92) 100%)',
          }}
        />

        {/* 3. MINIMAL HEADER */}
        <header className="absolute top-0 inset-x-0 z-30 flex items-center justify-between px-6 sm:px-12 py-6 pointer-events-none">
          <div className="flex items-center gap-3">
            <span className="font-display font-black text-sm sm:text-base tracking-[0.25em] text-white uppercase">
              ARULFORGE
            </span>
            <span className="hidden sm:inline font-mono text-[10px] text-[#AEE4FF]/60 tracking-widest uppercase">
              // PHYSICAL 3D PORTFOLIO
            </span>
          </div>

          <div className="pointer-events-auto">
            <button
              onClick={onOpenEnquiry}
              className="font-mono text-xs text-[#AEE4FF] hover:text-white transition-colors tracking-widest uppercase px-3 py-1.5 rounded border border-[#AEE4FF]/30 hover:border-white cursor-pointer bg-[#05070a]/50 backdrop-blur-sm"
            >
              ENQUIRE ↗
            </button>
          </div>
        </header>

        {/* 4. PHASE 1: EMPTY TABLE CUE (0% → 8%) */}
        <div
          ref={initialCueRef}
          className="absolute inset-x-0 bottom-12 z-20 flex flex-col items-center justify-center text-center transition-opacity duration-300 opacity-100"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_12px_#ffffff] mb-2 animate-pulse" />
          <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-[#AEE4FF] uppercase">
            SCROLL TO FORGE ↓
          </span>
        </div>

        {/* 5. PHASE 2: BLUEPRINT DRAWS CUE (8% → 15%) */}
        <div
          ref={blueprintCueRef}
          className="absolute inset-x-0 top-1/4 z-20 flex flex-col items-center justify-center pointer-events-none text-center transition-opacity duration-500 opacity-0"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] text-[#00d4ff] uppercase mb-1">
            PHASE 02 // BLUEPRINT SYSTEM
          </span>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-wider uppercase">
            EVERYTHING STARTS WITH AN IDEA.
          </h2>
          <p className="font-mono text-xs text-[#8D96A8] mt-1">
            Urban blueprint, building footprints and zones forming across table...
          </p>
        </div>

        {/* 6. PHASE 2.5: FOUNDATIONS FORMING CUE (15% → 20%) */}
        <div
          ref={foundationsCueRef}
          className="absolute inset-x-0 top-1/4 z-20 flex flex-col items-center justify-center pointer-events-none text-center transition-opacity duration-500 opacity-0"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] text-[#00d4ff] uppercase mb-1">
            PHASE 02.5 // FOUNDATIONS GRID
          </span>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-wider uppercase">
            STRUCTURAL FOUNDATIONS ANCHORING
          </h2>
          <p className="font-mono text-xs text-[#8D96A8] mt-1">
            18 Technology foundation slabs rising across the table surface...
          </p>
        </div>

        {/* 7. PHASE 3: BUILDINGS CONSTRUCT CUE (20% → 62%) */}
        <div
          ref={constructionCueRef}
          className="absolute left-6 sm:left-14 top-24 z-20 pointer-events-none max-w-sm transition-opacity duration-500 opacity-0"
        >
          <span className="font-mono text-[10px] tracking-[0.25em] text-[#00d4ff] uppercase block mb-1">
            PHASE 03 // PHYSICAL CONSTRUCTION
          </span>
          <h2 className="font-display text-lg sm:text-xl font-bold text-white uppercase tracking-tight">
            SCROLL TO BUILD THE PORTFOLIO
          </h2>
          <p className="font-mono text-xs text-[#8D96A8] mt-1">
            18 Technology Buildings • Columns → Slabs → Glass Facades
          </p>
        </div>

        {/* 8. DYNAMIC DISTRICT BADGES (20% → 62%) */}
        <div
          ref={districtContainerRef}
          className="absolute left-6 sm:left-14 bottom-16 sm:bottom-24 z-20 pointer-events-none max-w-sm transition-all duration-300 opacity-0"
        >
          <div className="px-4 py-3 rounded-lg bg-[#05070a]/85 backdrop-blur-md border border-[#00d4ff]/30">
            <span
              ref={districtNumRef}
              className="font-mono text-[10px] tracking-[0.25em] text-[#00d4ff] uppercase block mb-1"
            >
              DISTRICT 01 // FRONTEND FOUNDATION
            </span>
            <h3
              ref={districtTitleRef}
              className="font-display text-lg font-bold text-white uppercase tracking-tight"
            >
              HTML & CSS
            </h3>
            <p
              ref={districtDescRef}
              className="font-mono text-xs text-[#8D96A8] mt-1"
            >
              Semantic Blueprint & Visual System
            </p>
          </div>
        </div>

        {/* 9. PHASE 4: COMPLETE CITY HOLD (62% → 70%) */}
        <div
          ref={cityHoldRef}
          className="absolute top-20 sm:top-24 inset-x-0 z-20 flex flex-col items-center justify-center text-center p-6 pointer-events-none transition-opacity duration-500 opacity-0"
        >
          <span className="font-mono text-xs tracking-[0.35em] text-[#00d4ff] uppercase mb-2">
            ARULFORGE // DIGITAL CITY COMPLETE
          </span>
          <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-tight">
            WE FORGE DIGITAL EXPERIENCES.
          </h1>
          <p className="font-mono text-xs text-[#8D96A8] mt-2">
            All 18 technology nodes interconnected across the table. A pulse descends...
          </p>
        </div>

        {/* 10. PHASE 5: CAMERA DESCENDS BELOW TABLE CUE (70% → 78%) */}
        <div
          ref={diveCueRef}
          className="absolute right-6 sm:right-14 top-24 z-20 pointer-events-none max-w-sm text-right transition-opacity duration-500 opacity-0"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] text-[#00d4ff] uppercase block mb-1">
            PHASE 05 // GO BELOW THE TABLE
          </span>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-white uppercase tracking-tight">
            UNDER-TABLE INFRASTRUCTURE
          </h2>
          <p className="font-mono text-xs text-[#8D96A8] mt-1">
            Building foundations penetrating downward into negative Y engineering space...
          </p>
        </div>

        {/* 11. PHASE 6: PIPELINES REVEAL CUE (78% → 88%) */}
        <div
          ref={pipelinesCueRef}
          className="absolute left-6 sm:left-14 top-24 z-20 pointer-events-none max-w-sm transition-opacity duration-500 opacity-0"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] text-[#00d4ff] uppercase block mb-1">
            PHASE 06 // PIPELINE WORLD
          </span>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-white uppercase tracking-tight">
            THE ENGINEERING BENEATH THE WORK
          </h2>
          <p className="font-mono text-xs text-[#8D96A8] mt-1">
            Frontend → REST API → Spring Boot → MySQL → Deployment
          </p>
        </div>

        {/* 12. PHASE 7: REAL PROJECT STATION DOCK CARD (88% → 100%) */}
        <div
          ref={projectDockRef}
          className="absolute right-6 sm:right-14 bottom-16 sm:bottom-24 z-20 max-w-sm w-full transition-all duration-300 opacity-0 pointer-events-none"
        >
          <div className="p-5 rounded-xl bg-[#060e1a]/92 backdrop-blur-md border border-[#00d4ff]/40 shadow-[0_0_35px_rgba(0,212,255,0.18)]">
            <div className="flex items-center justify-between mb-2">
              <span
                ref={projectHeaderRef}
                className="font-mono text-[10px] tracking-[0.25em] text-[#00d4ff] uppercase"
              >
                PROJECT STATION 01 // AI
              </span>
              <span className="inline-block w-2 h-2 rounded-full bg-[#00d4ff] shadow-[0_0_8px_#00d4ff] animate-ping" />
            </div>

            <h3
              ref={projectTitleRef}
              className="font-display text-lg sm:text-xl font-black text-white uppercase tracking-tight"
            >
              AI MOCK INTERVIEW COACH
            </h3>

            <p
              ref={projectDescRef}
              className="font-sans text-xs text-[#AEE4FF]/85 mt-1 line-clamp-2"
            >
              Automated technical interviewing platform
            </p>

            <div ref={projectTechContainerRef} className="flex flex-wrap gap-1.5 mt-3" />

            <div className="mt-4 pt-3 border-t border-[#00d4ff]/20 flex items-center justify-between">
              <span className="font-mono text-[10px] text-[#8D96A8] uppercase">
                PIPELINE CONVERGENCE NODE
              </span>
              <a
                ref={projectLinkRef}
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#00d4ff] hover:text-white transition-colors uppercase tracking-wider pointer-events-auto"
              >
                <span>VIEW LIVE</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* 13. FINALE OVERVIEW & CTAs (97% → 100%) */}
        <div
          ref={finaleRef}
          className="absolute top-14 sm:top-20 inset-x-0 z-20 flex flex-col items-center justify-center text-center p-6 pointer-events-none transition-opacity duration-700 opacity-0"
        >
          <span className="font-mono text-xs tracking-[0.35em] text-[#8DDFFF] uppercase mb-2">
            ARULFORGE // FULL ARCHITECTURE COMPLETE
          </span>

          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase leading-tight">
            DIGITAL EXPERIENCES, ENGINEERED.
          </h1>

          <p className="font-mono text-xs sm:text-sm text-[#AEE4FF] uppercase tracking-wider mt-2">
            18 TECHNOLOGIES ABOVE THE TABLE • REAL PROJECTS IN THE PIPELINES
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-4 pointer-events-auto">
            {onOpenEnquiry && (
              <button
                onClick={onOpenEnquiry}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#E8FAFF] text-[#05070a] font-mono text-xs font-black tracking-wider hover:bg-white transition-all shadow-[0_0_25px_rgba(232,250,255,0.4)] cursor-pointer"
              >
                <span>START A PROJECT</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={handleResetToTop}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#081321]/80 backdrop-blur-md border border-[#8DDFFF]/30 text-[#AEE4FF] font-mono text-xs font-bold tracking-wider hover:text-white hover:border-white transition-all cursor-pointer"
            >
              <span>EXPLORE THE FORGE ↗</span>
            </button>
          </div>
        </div>

        {/* 14. REAL-TIME TELEMETRY & DIAGNOSTICS HUD */}
        <div
          ref={debugOverlayRef}
          className="fixed bottom-3 right-3 z-50 font-mono text-[10px] px-3 py-1.5 bg-black/85 border border-[#8DDFFF]/30 text-[#AEE4FF] rounded pointer-events-none shadow-lg flex items-center gap-2.5 backdrop-blur-sm"
        >
          <span>INITIALIZING TELEMETRY...</span>
        </div>
      </div>
    </section>
  );
};

export default ArchitecturalHero;
