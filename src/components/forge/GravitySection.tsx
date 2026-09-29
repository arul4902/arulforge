import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

export const GravitySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Gravity distortion:
  // 0.0 - 0.2: Normal
  // 0.2 - 0.5: Sideways gravity pulls right (heading drifts +40px, cards lean 5 deg)
  // 0.5 - 0.8: Gravity restores, elements snap back into place
  const headingDriftX = useTransform(scrollYProgress, [0.15, 0.4, 0.65], [0, 48, 0]);
  const headingTilt = useTransform(scrollYProgress, [0.15, 0.4, 0.65], [0, 3.5, 0]);
  const card1Tilt = useTransform(scrollYProgress, [0.15, 0.42, 0.7], [0, 4.8, 0]);
  const card1DriftX = useTransform(scrollYProgress, [0.15, 0.42, 0.7], [0, 32, 0]);
  const card2Tilt = useTransform(scrollYProgress, [0.18, 0.45, 0.72], [0, -3.5, 0]);
  const card2DriftX = useTransform(scrollYProgress, [0.18, 0.45, 0.72], [0, -24, 0]);

  return (
    <div
      ref={containerRef}
      className="my-24 sm:my-36 max-w-[1400px] mx-auto px-5 sm:px-8 select-none"
    >
      {/* Drifting Header with Sideways Gravity */}
      <motion.div
        style={{
          x: shouldReduceMotion ? 0 : headingDriftX,
          rotate: shouldReduceMotion ? 0 : headingTilt,
        }}
        className="mb-12"
      >
        <div className="flex items-center gap-2 font-mono text-xs text-[#00F0FF] uppercase tracking-[0.35em] mb-2">
          <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
          // GRAVITATIONAL DRIFT FIELD
        </div>
        <h3 className="font-kanit font-black text-3xl sm:text-5xl md:text-6xl uppercase tracking-tighter text-white">
          CODE WITH PHYSICAL MOMENTUM
        </h3>
        <p className="font-light text-sm sm:text-base text-[#BBCCD7]/70 mt-3 max-w-2xl font-kanit">
          In our digital workshop, interfaces possess genuine mass. Observe how elements temporarily lean as lateral gravity shifts before snapping firmly into production grid alignment.
        </p>
      </motion.div>

      {/* Leaning & Snapping Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          style={{
            x: shouldReduceMotion ? 0 : card1DriftX,
            rotate: shouldReduceMotion ? 0 : card1Tilt,
          }}
          className="p-8 sm:p-10 rounded-[36px] border border-[#00F0FF]/30 bg-[#0B0D12]/90 backdrop-blur-md shadow-2xl space-y-4"
        >
          <div className="flex items-center justify-between font-mono text-xs border-b border-[#00F0FF]/15 pb-4 text-[#00F0FF]">
            <span>[LATERAL INERTIA: +4.8°]</span>
            <span className="text-emerald-400 font-bold">CALIBRATING</span>
          </div>
          <h4 className="font-kanit font-black text-2xl sm:text-3xl uppercase text-white">
            WEIGHTED DATA PIPELINES
          </h4>
          <p className="font-light text-sm text-[#BBCCD7]/80 leading-relaxed font-kanit">
            Backend microservices built with Spring Boot and MySQL designed to handle high transaction volumes without losing structural integrity or performance under load.
          </p>
          <div className="pt-3 font-mono text-[11px] text-[#646973]">
            MASS ESTIMATE: 1.42 kN // LATERALLY STABILIZED
          </div>
        </motion.div>

        <motion.div
          style={{
            x: shouldReduceMotion ? 0 : card2DriftX,
            rotate: shouldReduceMotion ? 0 : card2Tilt,
          }}
          className="p-8 sm:p-10 rounded-[36px] border border-[#D7E2EA]/20 bg-[#0B0D12]/90 backdrop-blur-md shadow-2xl space-y-4"
        >
          <div className="flex items-center justify-between font-mono text-xs border-b border-[#D7E2EA]/15 pb-4 text-[#BBCCD7]">
            <span>[LATERAL INERTIA: -3.5°]</span>
            <span className="text-[#00F0FF] font-bold">COMPENSATING</span>
          </div>
          <h4 className="font-kanit font-black text-2xl sm:text-3xl uppercase text-white">
            CLIENT SURFACE KINEMATICS
          </h4>
          <p className="font-light text-sm text-[#BBCCD7]/80 leading-relaxed font-kanit">
            Frontend interfaces engineered in React, Angular, and TypeScript with deterministic layout boundaries that absorb interaction stress smoothly.
          </p>
          <div className="pt-3 font-mono text-[11px] text-[#646973]">
            SPRING EQUILIBRIUM: NOMINAL // 0.00° RESTORED ON LOCK
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GravitySection;
