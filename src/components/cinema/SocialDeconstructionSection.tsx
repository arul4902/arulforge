import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle2, Globe, Sparkles } from 'lucide-react';
import { InstagramIcon } from '../common/BrandIcons';

export const SocialDeconstructionSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Scroll tracking through this section (250vh scroll length)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Transformation physics
  // 0.0 - 0.2: Profile intact on social card
  // 0.2 - 0.6: Physical break apart & floating across space
  // 0.6 - 1.0: Reconnect into full website architecture

  // Avatar to Logo
  const avatarX = useTransform(scrollYProgress, [0.15, 0.65], [0, 240]);
  const avatarY = useTransform(scrollYProgress, [0.15, 0.65], [0, -60]);
  const avatarScale = useTransform(scrollYProgress, [0.15, 0.65], [1, 1.4]);

  // Bio to Hero Copy
  const bioX = useTransform(scrollYProgress, [0.2, 0.7], [0, 180]);
  const bioY = useTransform(scrollYProgress, [0.2, 0.7], [0, 40]);

  // Highlights to Services
  const highlightsX = useTransform(scrollYProgress, [0.25, 0.75], [0, 120]);
  const highlightsY = useTransform(scrollYProgress, [0.25, 0.75], [0, 100]);

  // Posts to Gallery
  const postsScale = useTransform(scrollYProgress, [0.3, 0.8], [1, 1.25]);
  const postsX = useTransform(scrollYProgress, [0.3, 0.8], [0, 80]);

  // DM to Website CTA
  const dmX = useTransform(scrollYProgress, [0.35, 0.85], [0, 160]);
  const dmScale = useTransform(scrollYProgress, [0.35, 0.85], [1, 1.15]);

  // Dissolve social frame and assemble website frame
  const socialCardOpacity = useTransform(scrollYProgress, [0.1, 0.35, 0.65], [1, 0.9, 0.1]);
  const websiteCardOpacity = useTransform(scrollYProgress, [0.45, 0.75], [0, 1]);
  const connectionLineScale = useTransform(scrollYProgress, [0.25, 0.65], [0, 1]);

  return (
    <div ref={containerRef} className="relative h-[250vh] bg-[#040a13] border-t border-[#00D4FF]/20 select-none">
      {/* Sticky 100vh Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-12 px-5 sm:px-8">
        {/* Section Header */}
        <div className="max-w-7xl mx-auto w-full relative z-20">
          <div className="flex items-center gap-2 font-mono text-xs text-[#00D4FF] tracking-[0.25em] uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TRANSFORMATION METAPHOR // DECONSTRUCTION</span>
          </div>

          <h2 className="section-title-clamp font-display font-black text-white tracking-tighter uppercase leading-[0.94] max-w-4xl">
            YOUR BUSINESS <br />
            <span className="text-[#8D96A8]">DESERVES MORE</span> <br />
            <span className="text-gradient-cyan">THAN A PROFILE.</span>
          </h2>
        </div>

        {/* Center Stage: The Social Profile Physically Breaking Apart and Re-Assembling */}
        <div className="relative z-10 max-w-7xl mx-auto w-full my-auto flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12">
          {/* LEFT: Deconstructing Social Profile Frame */}
          <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#070A12]/80 backdrop-blur-md p-6 overflow-hidden shadow-2xl">
            {/* Background fade layer */}
            <motion.div
              style={{ opacity: socialCardOpacity }}
              className="absolute inset-0 bg-[#0E1322]/80 pointer-events-none"
            />

            {/* Profile Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center p-0.5">
                  <InstagramIcon className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="font-mono text-xs font-bold text-white">@yourbusiness.co</span>
              </div>
              <span className="font-mono text-[9px] text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                LOCKED TO APP
              </span>
            </div>

            {/* Profile Avatar Component (Breaks apart) */}
            <div className="py-4 flex items-center gap-4 relative z-10">
              <motion.div
                style={{ x: avatarX, y: avatarY, scale: avatarScale }}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#0A0E27] border-2 border-[#00D4FF] flex items-center justify-center font-display font-black text-lg text-white shadow-[0_0_20px_rgba(0,212,255,0.4)] flex-shrink-0"
              >
                YB
              </motion.div>
              <div className="space-y-1">
                <div className="font-display font-bold text-sm text-white">Your Business Studio</div>
                <div className="font-mono text-xs text-[#8D96A8]">3,480 followers • 120 following</div>
              </div>
            </div>

            {/* Bio Copy Component (Breaks apart) */}
            <motion.div
              style={{ x: bioX, y: bioY }}
              className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-[#8D96A8] leading-relaxed relative z-10"
            >
              <p className="text-white font-medium">Crafting bespoke architectural spaces.</p>
              <p className="text-[11px] text-[#8D96A8]">DM for custom quote • Serving worldwide • Link below</p>
            </motion.div>

            {/* Story Highlights (Breaks apart) */}
            <motion.div
              style={{ x: highlightsX, y: highlightsY }}
              className="flex gap-3 py-3 relative z-10"
            >
              {['Services', 'Work', 'Reviews', 'Book'].map((item) => (
                <div key={item} className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full border border-[#00D4FF]/40 bg-[#0A0E27] flex items-center justify-center font-mono text-[9px] text-[#00D4FF]">
                    {item[0]}
                  </div>
                  <span className="font-mono text-[8px] text-[#8D96A8]">{item}</span>
                </div>
              ))}
            </motion.div>

            {/* Post Grid (Breaks apart) */}
            <motion.div
              style={{ scale: postsScale, x: postsX }}
              className="grid grid-cols-3 gap-2 pt-2 relative z-10"
            >
              {[1, 2, 3, 4, 5, 6].map((p) => (
                <div
                  key={p}
                  className="aspect-square rounded-lg bg-[#0A0E27] border border-[#00D4FF]/20 flex items-center justify-center font-mono text-[9px] text-[#00D4FF]"
                >
                  POST_{p}
                </div>
              ))}
            </motion.div>

            {/* DM CTA Button (Breaks apart) */}
            <motion.div
              style={{ x: dmX, scale: dmScale }}
              className="mt-4 pt-2 relative z-10"
            >
              <div className="w-full py-2.5 rounded-xl bg-[#00D4FF]/20 border border-[#00D4FF] text-center font-mono text-xs font-bold text-[#00D4FF]">
                MESSAGE / DM ON APP
              </div>
            </motion.div>
          </div>

          {/* Central Holographic Laser Vector Connecting Left ➜ Right */}
          <div className="hidden lg:flex flex-col items-center justify-center px-4">
            <motion.div
              style={{ scaleX: connectionLineScale }}
              className="w-32 h-[2px] bg-[#00D4FF] shadow-[0_0_12px_#00D4FF] origin-left"
            />
            <span className="font-mono text-[9px] text-[#00D4FF] mt-2 tracking-widest uppercase">
              TRANSFORMING
            </span>
          </div>

          {/* RIGHT: Reconnected Assembled Website Structure */}
          <motion.div
            style={{ opacity: websiteCardOpacity }}
            className="w-full max-w-lg rounded-3xl border-2 border-[#00D4FF] bg-[#040813] shadow-[0_0_50px_rgba(0,212,255,0.25)] p-6 sm:p-8 flex flex-col justify-between"
          >
            {/* Website Chrome */}
            <div className="flex items-center justify-between pb-4 border-b border-[#00D4FF]/30">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <div className="ml-3 px-3 py-1 rounded bg-[#0A0E27] border border-[#00D4FF]/30 font-mono text-[10px] text-[#00D4FF] flex items-center gap-1.5">
                  <Globe className="w-3 h-3 text-[#00D4FF]" />
                  <span>https://yourbrand.com</span>
                </div>
              </div>
              <span className="font-mono text-[9px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                100% OWNED ASSET
              </span>
            </div>

            {/* Fully Assembled Website Canvas */}
            <div className="py-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-display font-black text-xl text-white">YOURBRAND</span>
                  <span className="h-2 w-2 rounded-full bg-[#00D4FF]" />
                </div>
                <div className="font-mono text-xs text-[#8D96A8] flex gap-3">
                  <span>WORK</span>
                  <span>SERVICES</span>
                  <span className="text-[#00D4FF]">ENQUIRE ↗</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0A0E27] border border-white/10 space-y-2">
                <span className="font-mono text-[9px] text-[#00D4FF] tracking-widest uppercase block">
                  HERO VALUE STATEMENT
                </span>
                <h4 className="font-display text-lg font-bold text-white leading-snug">
                  &ldquo;Bespoke Architectural Spaces Built to Outlast Generations.&rdquo;
                </h4>
                <p className="text-xs text-[#8D96A8]">
                  From initial sketch to full construction. Turn your vision into tangible physical reality.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-[#0A0E27] border border-white/10">
                  <span className="font-mono text-[8px] text-[#00D4FF]">01 // SERVICE</span>
                  <div className="font-display font-bold text-xs text-white mt-0.5">Commercial Design</div>
                </div>
                <div className="p-3 rounded-xl bg-[#0A0E27] border border-white/10">
                  <span className="font-mono text-[8px] text-[#00D4FF]">02 // SERVICE</span>
                  <div className="font-display font-bold text-xs text-white mt-0.5">Private Residences</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#00D4FF] text-[#040a13] font-mono text-xs font-black flex items-center justify-between">
                <span>REQUEST CUSTOM PROJECT PROPOSAL</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-[#8D96A8]">
              <span>CONVERSION EFFICIENCY: +340%</span>
              <span className="text-[#00D4FF]">ARULFORGE SYSTEM</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom Narrative Banner */}
        <div className="max-w-7xl mx-auto w-full pt-6 border-t border-[#00D4FF]/20 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs relative z-20">
          <div className="text-center sm:text-left">
            <span className="text-[#00D4FF] tracking-widest block uppercase">
              FROM SOCIAL PRESENCE TO DIGITAL EXPERIENCE.
            </span>
            <span className="text-white font-bold text-sm tracking-tight">
              DISCOVERED ON SOCIAL. REMEMBERED ON THE WEB.
            </span>
          </div>

          <div className="flex items-center gap-2 text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>TRANSFORMATION PROTOCOL READY</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialDeconstructionSection;
