import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import LiveProjectButton from '../common/LiveProjectButton';
import type { ProjectData } from '../projects/ProjectCard';

interface ProjectManufacturingProps {
  project: ProjectData;
  index?: number;
}

export const ProjectManufacturing: React.FC<ProjectManufacturingProps> = ({
  project,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // X-Ray mouse coordinates inside card
  const [xrayPos, setXrayPos] = useState({ x: 0, y: 0, isHovering: false });

  // Manufacturing progress driven by scroll
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'center center'],
  });

  // Assembly transforms
  const screenshotOpacity = useTransform(scrollYProgress, [0.35, 0.75], [0.15, 1]);
  const colorSaturation = useTransform(scrollYProgress, [0.4, 0.85], [0, 100]);
  const dimensionsScale = useTransform(scrollYProgress, [0.1, 0.6], [0.96, 1]);

  const [assemblyState, setAssemblyState] = useState<'RAW' | 'ASSEMBLING' | 'DEPLOYED'>('RAW');

  scrollYProgress.on('change', (v) => {
    if (v < 0.35) setAssemblyState('RAW');
    else if (v < 0.72) setAssemblyState('ASSEMBLING');
    else setAssemblyState('DEPLOYED');
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setXrayPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isHovering: true,
    });
  };

  const handleMouseLeave = () => {
    setXrayPos((p) => ({ ...p, isHovering: false }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-forge-tool="expander"
      className="relative mb-20 sm:mb-28 max-w-[1400px] mx-auto select-none"
    >
      <motion.article
        style={{
          scale: shouldReduceMotion ? 1 : dimensionsScale,
        }}
        className="relative rounded-[32px] sm:rounded-[48px] md:rounded-[56px] border-2 border-[#D7E2EA]/20 bg-[#0A0A0C] p-5 sm:p-8 md:p-10 shadow-2xl overflow-hidden transition-colors duration-500 hover:border-[#00F0FF]/40"
      >
        {/* Top Technical Metadata Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-[#D7E2EA]/15 font-mono text-xs">
          <div className="flex items-center gap-4">
            <span className="text-3xl sm:text-4xl font-black font-kanit text-[#BBCCD7]">
              {project.number}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[#00F0FF]">// SPEC:</span>
              <span className="uppercase text-[#D7E2EA] font-bold">{project.category}</span>
            </div>
          </div>

          {/* MANUFACTURING STATUS STAMP */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#D7E2EA]/20 bg-[#141416]">
            <span
              className={`w-2 h-2 rounded-full ${
                assemblyState === 'DEPLOYED'
                  ? 'bg-emerald-400 shadow-[0_0_8px_#34D399]'
                  : assemblyState === 'ASSEMBLING'
                  ? 'bg-[#00F0FF] animate-pulse shadow-[0_0_8px_#00F0FF]'
                  : 'bg-amber-400'
              }`}
            />
            <span className="font-mono text-[11px] tracking-wider uppercase">
              {assemblyState === 'DEPLOYED'
                ? 'DEPLOYED [OK]'
                : assemblyState === 'ASSEMBLING'
                ? 'ASSEMBLING...'
                : 'RAW MATERIAL'}
            </span>
          </div>
        </div>

        {/* Project Title and Tags */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#D7E2EA] font-kanit">
            {project.title}
          </h3>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full border border-[#00F0FF]/25 bg-[#00F0FF]/[0.06] text-[#00F0FF] font-mono text-[11px] uppercase tracking-wider"
                >
                  {t}
                </span>
              ))}
            </div>

            {project.liveUrl ? (
              <LiveProjectButton href={project.liveUrl} label="LIVE PROJECT" />
            ) : project.githubUrl ? (
              <LiveProjectButton href={project.githubUrl} label="VIEW CODE" />
            ) : null}
          </div>
        </div>

        <p className="text-xs sm:text-sm md:text-base font-light text-[#D7E2EA]/80 max-w-4xl mb-8 font-kanit">
          {project.description}
        </p>

        {/* THE VISUAL MANUFACTURING & X-RAY CANVAS */}
        <div className="relative h-[340px] sm:h-[440px] md:h-[500px] lg:h-[540px] rounded-[28px] sm:rounded-[40px] overflow-hidden border border-[#D7E2EA]/20 bg-[#08080A] group cursor-crosshair">
          {/* BASE LAYER: Finished Polished Website Screenshot */}
          <motion.div
            style={{
              opacity: shouldReduceMotion ? 1 : screenshotOpacity,
              filter: shouldReduceMotion
                ? 'none'
                : `saturate(${colorSaturation.get()}%)`,
            }}
            className="w-full h-full"
          >
            <img
              src={project.mainScreenshot}
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
          </motion.div>

          {/* X-RAY OVERLAY: Hidden Architectural Blueprint revealed inside cursor circle */}
          <div
            style={{
              clipPath:
                xrayPos.isHovering && !shouldReduceMotion
                  ? `circle(110px at ${xrayPos.x}px ${xrayPos.y}px)`
                  : 'circle(0px at 0 0)',
              WebkitClipPath:
                xrayPos.isHovering && !shouldReduceMotion
                  ? `circle(110px at ${xrayPos.x}px ${xrayPos.y}px)`
                  : 'circle(0px at 0 0)',
              transition: 'clip-path 0.05s ease-out',
            }}
            className="absolute inset-0 p-6 flex flex-col justify-between font-mono text-xs text-[#00F0FF] select-none bg-[#050B14]/95 pointer-events-none z-20"
          >
            {/* Blueprint Grid Overlay */}
            <div
              className="absolute inset-0 opacity-40 pointer-events-none"
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgba(0,240,255,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,240,255,0.3) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />

            {/* Wireframe simulated box boundaries */}
            <div className="relative z-10 flex justify-between items-start">
              <div className="p-3 border border-dashed border-[#00F0FF] rounded-xl bg-[#00F0FF]/15 backdrop-blur-sm">
                <span className="font-bold text-white">&lt;ArchitectureModule /&gt;</span>
                <p className="text-[10px] text-[#BBCCD7]">DOM: shadowRoot (closed)</p>
                <p className="text-[10px] text-[#00F0FF]">lat: 12.8ms | fps: 60</p>
              </div>
              <div className="p-3 border border-dashed border-[#00F0FF] rounded-xl bg-[#00F0FF]/15 backdrop-blur-sm">
                <span className="text-[#00F0FF]">[API ROUTE: /{project.number}]</span>
                <p className="text-[10px] text-emerald-400">status: 200 OK (verified)</p>
              </div>
            </div>

            <div className="relative z-10 flex justify-between items-end">
              <div className="p-3 border border-dashed border-[#00F0FF] rounded-xl bg-[#00F0FF]/15 backdrop-blur-sm">
                <span className="text-white font-bold">&lt;LayoutMesh /&gt;</span>
                <p className="text-[10px] text-[#BBCCD7]">grid-template: 12 col auto;</p>
              </div>
              <div className="font-mono text-[11px] text-[#0C0C0C] font-bold bg-[#00F0FF] px-3 py-1 rounded-full shadow-[0_0_15px_#00F0FF]">
                X-RAY SCANNER // INTERNAL SPEC
              </div>
            </div>
          </div>

          {/* X-Ray circular lens ring tracking cursor */}
          {xrayPos.isHovering && !shouldReduceMotion && (
            <div
              style={{
                transform: `translate3d(${xrayPos.x - 110}px, ${xrayPos.y - 110}px, 0)`,
                width: 220,
                height: 220,
              }}
              className="absolute top-0 left-0 rounded-full border-2 border-[#00F0FF] pointer-events-none z-30 shadow-[0_0_35px_rgba(0,240,255,0.7)] flex items-center justify-center transition-transform duration-75"
            >
              <div className="px-2.5 py-0.5 rounded-full bg-[#00F0FF] text-[#0C0C0C] font-mono text-[9px] font-black uppercase tracking-widest -mt-24 shadow-md">
                X-RAY LENS
              </div>
            </div>
          )}

          {/* Mobile X-Ray hint */}
          <div className="absolute bottom-3 right-3 font-mono text-[10px] text-[#00F0FF] bg-[#0C0C0C]/80 px-2.5 py-1 rounded-full border border-[#00F0FF]/30 lg:hidden">
            [HOVER / TAP TO X-RAY]
          </div>
        </div>
      </motion.article>
    </div>
  );
};

export default ProjectManufacturing;
