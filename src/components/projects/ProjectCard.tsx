import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import LiveProjectButton from '../common/LiveProjectButton';

export interface ProjectData {
  number: string;
  title: string;
  category: string;
  tech: string[];
  description: string;
  liveUrl?: string;
  githubUrl?: string;
  mainScreenshot: string;
  detailScreenshots: [string, string];
}

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  totalCards: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  totalCards,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Scale calculation: targetScale = 1 - (totalCards - 1 - index) * 0.03
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  // Card top offset
  const stickyTop = 80 + index * 24;

  const imageRevealVariants = {
    hidden: {
      clipPath: shouldReduceMotion
        ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
        : 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
      scale: shouldReduceMotion ? 1 : 1.1,
    },
    visible: {
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      scale: 1,
      transition: {
        duration: 1.1,
        ease: [0.25, 1, 0.5, 1] as const,
      },
    },
  };

  return (
    <div
      ref={containerRef}
      className="min-h-[92vh] sm:min-h-screen flex items-start justify-center relative mb-8 sm:mb-12"
    >
      <motion.article
        style={{
          scale: shouldReduceMotion ? 1 : scale,
          top: `${stickyTop}px`,
        }}
        className="sticky w-full max-w-[1400px] rounded-[32px] sm:rounded-[48px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.85)] z-10 transition-shadow duration-500 overflow-hidden"
      >
        {/* Header row: Project Number, Category, Title, Tags, Live Button */}
        <div
          data-project-preview={project.mainScreenshot}
          className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6 mb-6 sm:mb-8 pb-5 sm:pb-6 border-b border-[#D7E2EA]/15 group/header cursor-pointer"
        >
          <div className="flex items-baseline gap-4 sm:gap-6">
            <span className="text-4xl sm:text-5xl md:text-6xl font-black text-[#BBCCD7] font-kanit">
              {project.number}
            </span>
            <div>
              <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#B600A8] uppercase block mb-1">
                {project.category}
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#D7E2EA] font-kanit leading-none">
                {project.title}
              </h3>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 justify-between lg:justify-end">
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {project.tech.map((t, tIdx) => (
                <span
                  key={tIdx}
                  className="px-3 py-1 rounded-full border border-[#D7E2EA]/20 bg-[#161616] text-[11px] sm:text-xs font-medium text-[#BBCCD7] uppercase tracking-wider"
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

        {/* Description summary */}
        <p className="text-xs sm:text-sm md:text-base font-light text-[#D7E2EA]/85 leading-relaxed max-w-4xl mb-6 font-kanit">
          {project.description}
        </p>

        {/* Asymmetric Screenshot Grid:
            Desktop: Left 40% two stacked, Right 60% one large
            Mobile/Tablet: Responsive stacked / 2-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 md:gap-5 h-[340px] sm:h-[420px] md:h-[460px] lg:h-[490px]">
          {/* Left: 40% two stacked screenshots (5 cols in 12-col grid = 41.6%) */}
          <div className="hidden lg:grid grid-rows-2 gap-3 sm:gap-4 md:gap-5 lg:col-span-5 h-full">
            <motion.div
              variants={imageRevealVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-20px' }}
              data-cursor="view"
              className="relative overflow-hidden rounded-[24px] sm:rounded-[36px] md:rounded-[42px] border border-[#D7E2EA]/20 group bg-[#161616] cursor-pointer"
            >
              <img
                src={project.detailScreenshots[0]}
                alt={`${project.title} detailed view 1`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
            </motion.div>
            <motion.div
              variants={imageRevealVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-20px' }}
              data-cursor="view"
              className="relative overflow-hidden rounded-[24px] sm:rounded-[36px] md:rounded-[42px] border border-[#D7E2EA]/20 group bg-[#161616] cursor-pointer"
            >
              <img
                src={project.detailScreenshots[1]}
                alt={`${project.title} detailed view 2`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
            </motion.div>
          </div>

          {/* Right: 60% one large screenshot (7 cols in 12-col grid = 58.3%) */}
          <motion.div
            variants={imageRevealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-20px' }}
            data-cursor="view"
            className="col-span-1 lg:col-span-7 h-full relative overflow-hidden rounded-[28px] sm:rounded-[40px] md:rounded-[50px] border border-[#D7E2EA]/20 group bg-[#161616] cursor-pointer"
          >
            <img
              src={project.mainScreenshot}
              alt={`${project.title} main screenshot`}
              loading="lazy"
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
          </motion.div>

          {/* Mobile sub-shots: visible on smaller screens */}
          <div className="grid grid-cols-2 gap-2 lg:hidden">
            <div
              data-cursor="view"
              className="h-28 sm:h-36 relative overflow-hidden rounded-2xl border border-[#D7E2EA]/15"
            >
              <img
                src={project.detailScreenshots[0]}
                alt={`${project.title} detail`}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              data-cursor="view"
              className="h-28 sm:h-36 relative overflow-hidden rounded-2xl border border-[#D7E2EA]/15"
            >
              <img
                src={project.detailScreenshots[1]}
                alt={`${project.title} detail`}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
};

export default ProjectCard;
