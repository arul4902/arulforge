import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Globe, CheckCircle2 } from 'lucide-react';
import { InstagramIcon } from '../common/BrandIcons';
import { useCursor } from '../../context/CursorContext';

export const ManifestoSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const { setCursor, resetCursor } = useCursor();

  const transformationSteps = [
    {
      step: '01',
      title: 'PROFILE AVATAR → BRAND IDENTITY',
      socialDetail: 'Small 150px circle locked inside an app grid.',
      webDetail: 'Distinctive, vector SVG brand identity with custom typography.',
    },
    {
      step: '02',
      title: 'BIO TEXT → CONVERSION HERO',
      socialDetail: '150-character limit with one clickable bio link.',
      webDetail: 'Full editorial headline, value proposition, and interactive proof.',
    },
    {
      step: '03',
      title: 'STORY HIGHLIGHTS → STRUCTURED SERVICES',
      socialDetail: 'Ephemeral circles buried behind profile tabs.',
      webDetail: 'Clear service capabilities, scope breakdown, and transparent offerings.',
    },
    {
      step: '04',
      title: 'GRID POSTS → CLIENT CASE STUDIES',
      socialDetail: 'Compresses photos into tiny 1:1 squares with algorithm decay.',
      webDetail: 'Full-bleed project showcases, live interactive links, and tech specs.',
    },
    {
      step: '05',
      title: 'DM INBOX → PRE-QUALIFIED LEADS',
      socialDetail: 'Messy chat inbox filled with lost enquiries & price hagglers.',
      webDetail: 'Structured 3-step project builder with WhatsApp & direct scoping.',
    },
  ];

  return (
    <section id="manifesto" className="relative py-28 md:py-40 bg-[#070A12] border-t border-white/10 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#00D4FF]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Editorial Eyebrow */}
        <div className="flex items-center gap-2 font-mono text-xs text-[#00D4FF] tracking-[0.25em] uppercase mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00D4FF]" />
          <span>BRAND MANIFESTO // THE SOCIAL CEILING</span>
        </div>

        {/* Oversized Scrolling Statement */}
        <div className="max-w-5xl mb-24 md:mb-32">
          <h2 className="section-title-clamp font-display font-black text-[#F7FAFC] tracking-tighter uppercase leading-[0.98]">
            <motion.span
              initial={{ opacity: 0.2, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.8 }}
              transition={{ duration: 0.6 }}
              className="block"
            >
              YOUR BUSINESS
            </motion.span>
            <motion.span
              initial={{ opacity: 0.2, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.8 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="block text-[#8D96A8]"
            >
              SHOULDN'T LIVE ONLY
            </motion.span>
            <motion.span
              initial={{ opacity: 0.2, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.8 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="block"
            >
              INSIDE AN
            </motion.span>
            <motion.span
              initial={{ opacity: 0.2, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.8 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="block text-gradient-cyan"
            >
              INSTAGRAM PROFILE.
            </motion.span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-8 text-lg sm:text-xl md:text-2xl text-[#8D96A8] font-normal leading-relaxed max-w-3xl"
          >
            ArulForge turns social presence into a{' '}
            <span className="text-[#F7FAFC] font-semibold underline decoration-[#00D4FF] decoration-2 underline-offset-4">
              digital experience your customers can explore, trust and remember
            </span>.
          </motion.p>
        </div>

        {/* INSTAGRAM → WEBSITE TRANSFORMATION SHOWCASE */}
        <div className="rounded-2xl border border-white/10 bg-[#0A0E27]/50 backdrop-blur-xl p-6 sm:p-10 lg:p-12 relative overflow-hidden">
          {/* Section banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
            <div>
              <span className="font-mono text-xs text-[#00D4FF] tracking-widest block mb-1">
                TRANSFORMATION BLUEPRINT
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#F7FAFC]">
                FROM &ldquo;JUST FOLLOW US&rdquo; TO &ldquo;EXPLORE OUR BRAND.&rdquo;
              </h3>
            </div>
            <div className="font-mono text-xs text-[#8D96A8] tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#00D4FF]" />
              <span>STEP {activeStep + 1} OF 5</span>
            </div>
          </div>

          {/* Interactive Step Switcher */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-10">
            {transformationSteps.map((step, idx) => (
              <button
                key={step.step}
                onClick={() => setActiveStep(idx)}
                onMouseEnter={() => setCursor('default')}
                onMouseLeave={resetCursor}
                className={`py-3 px-3 text-left rounded-lg font-mono text-xs transition-all duration-200 cursor-pointer ${
                  activeStep === idx
                    ? 'bg-[#00D4FF] text-[#070A12] font-bold shadow-[0_0_15px_rgba(0,212,255,0.3)]'
                    : 'bg-[#101522] text-[#8D96A8] hover:text-[#F7FAFC] border border-white/5'
                }`}
              >
                <div className="opacity-70 text-[10px] mb-1">STAGE {step.step}</div>
                <div className="truncate font-semibold">{step.title.split('→')[0]}</div>
              </button>
            ))}
          </div>

          {/* Split Screen Transformation Visual */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* LEFT: Stylized Social Profile Abstraction */}
            <div className="relative rounded-xl border border-white/10 bg-[#0E1322] p-6 flex flex-col justify-between overflow-hidden group">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center p-0.5">
                    <InstagramIcon className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="font-mono text-xs font-bold text-[#F7FAFC]">@yourbrand.studio</span>
                </div>
                <span className="font-mono text-[10px] text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                  CONSTRAINED
                </span>
              </div>

              {/* Profile Card Anatomy */}
              <div className="py-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div
                    className={`h-16 w-16 rounded-full flex-shrink-0 flex items-center justify-center font-display font-black text-lg transition-all duration-300 ${
                      activeStep === 0
                        ? 'ring-2 ring-[#00D4FF] ring-offset-2 ring-offset-[#0E1322] bg-[#161D2E] text-[#00D4FF]'
                        : 'bg-white/10 text-white/50'
                    }`}
                  >
                    YB
                  </div>
                  <div className="space-y-1">
                    <div className="h-4 w-32 bg-white/20 rounded" />
                    <div className="font-mono text-xs text-[#8D96A8]">
                      3,840 followers • 218 following
                    </div>
                  </div>
                </div>

                <div
                  className={`p-3 rounded-lg text-xs leading-relaxed transition-all duration-300 ${
                    activeStep === 1
                      ? 'bg-[#00D4FF]/10 border border-[#00D4FF]/30 text-[#F7FAFC]'
                      : 'bg-white/5 text-[#8D96A8]'
                  }`}
                >
                  <p className="font-medium">⚡ Premium Artisan Woodcraft</p>
                  <p className="text-[11px] text-[#8D96A8]">DM for custom quotes • Shipping nationwide • Link below</p>
                </div>

                {/* Highlights circles */}
                <div className="flex items-center gap-3 pt-2 overflow-hidden">
                  {['Custom', 'Portfolio', 'Reviews', 'Order'].map((item, i) => (
                    <div
                      key={item}
                      className={`flex flex-col items-center gap-1 transition-opacity duration-300 ${
                        activeStep === 2 ? 'opacity-100 scale-105' : 'opacity-40'
                      }`}
                    >
                      <div className="w-11 h-11 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-[10px] font-mono text-[#F7FAFC]">
                        0{i + 1}
                      </div>
                      <span className="text-[9px] font-mono text-[#8D96A8]">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Grid Post representations */}
                <div
                  className={`grid grid-cols-3 gap-2 pt-2 transition-all duration-300 ${
                    activeStep === 3 ? 'opacity-100 ring-1 ring-[#00D4FF]/40 rounded-lg p-1' : 'opacity-40'
                  }`}
                >
                  {[1, 2, 3, 4, 5, 6].map((post) => (
                    <div
                      key={post}
                      className="aspect-square rounded bg-[#161D2E] border border-white/5 flex items-center justify-center text-[10px] font-mono text-[#8D96A8]"
                    >
                      IMG_{post}
                    </div>
                  ))}
                </div>

                {/* Social CTA Button */}
                <div
                  className={`w-full py-2.5 rounded-lg text-center font-mono text-xs font-bold transition-all duration-300 ${
                    activeStep === 4
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      : 'bg-white/10 text-white/50'
                  }`}
                >
                  MESSAGE / DM US
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 font-mono text-xs text-[#8D96A8]">
                Current Limit: <span className="text-[#F7FAFC]">{transformationSteps[activeStep].socialDetail}</span>
              </div>
            </div>

            {/* RIGHT: High-Tech Browser Canvas (ArulForge Result) */}
            <div className="relative rounded-xl border border-[#00D4FF]/30 bg-[#070A12] p-6 flex flex-col justify-between shadow-[0_0_35px_rgba(0,212,255,0.12)]">
              {/* Browser chrome header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                  <div className="ml-3 px-3 py-1 rounded bg-[#101522] border border-white/10 font-mono text-[10px] text-[#00D4FF] flex items-center gap-2">
                    <Globe className="w-3 h-3 text-[#00D4FF]" />
                    <span>https://yourbrand.com</span>
                  </div>
                </div>
                <span className="font-mono text-[10px] text-[#00D4FF] bg-[#00D4FF]/10 px-2 py-0.5 rounded border border-[#00D4FF]/30">
                  FORGED ENGINE
                </span>
              </div>

              {/* Dynamic Web Interface Representation */}
              <div className="py-6 space-y-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-display font-black text-xl text-[#F7FAFC]">YOURBRAND</span>
                        <span className="h-1.5 w-1.5 rounded-full bg-[#00D4FF]" />
                      </div>
                      <span className="font-mono text-[10px] text-[#8D96A8] tracking-widest">[PROPRIETARY ASSET]</span>
                    </div>

                    <div className="p-4 rounded-xl bg-[#101522] border border-white/10 space-y-2">
                      <div className="flex items-center gap-2 font-mono text-[10px] text-[#00D4FF]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>TRANSFORMATION UNLOCKED:</span>
                      </div>
                      <h4 className="font-display text-lg font-bold text-[#F7FAFC]">
                        {transformationSteps[activeStep].title.split('→')[1]}
                      </h4>
                      <p className="text-xs text-[#8D96A8] leading-relaxed">
                        {transformationSteps[activeStep].webDetail}
                      </p>
                    </div>

                    {/* Interactive Mock Components corresponding to the active step */}
                    {activeStep === 0 && (
                      <div className="p-4 rounded-xl bg-gradient-to-r from-[#101522] to-[#161D2E] border border-[#00D4FF]/30 flex items-center justify-between">
                        <div>
                          <div className="font-display font-bold text-sm text-[#F7FAFC]">Bespoke Vector Emblem</div>
                          <div className="font-mono text-[10px] text-[#8D96A8]">Zero blur • Scalable to 4K displays</div>
                        </div>
                        <div className="h-10 w-10 rounded-lg bg-[#00D4FF]/20 border border-[#00D4FF] flex items-center justify-center font-mono font-bold text-[#00D4FF]">
                          YB
                        </div>
                      </div>
                    )}

                    {activeStep === 1 && (
                      <div className="p-4 rounded-xl bg-[#101522] border border-white/10 space-y-2">
                        <div className="font-mono text-[10px] text-[#00D4FF]">HERO VALUE STATEMENT</div>
                        <div className="font-display text-base font-bold text-[#F7FAFC]">
                          &ldquo;Architectural Timber & Bespoke Joinery Built to Endure Generations.&rdquo;
                        </div>
                        <div className="flex gap-2 pt-1">
                          <span className="px-2 py-0.5 rounded bg-white/5 font-mono text-[10px] text-[#8D96A8]">99.8% Lighthouse Speed</span>
                          <span className="px-2 py-0.5 rounded bg-white/5 font-mono text-[10px] text-[#8D96A8]">Clear ROI Pathway</span>
                        </div>
                      </div>
                    )}

                    {activeStep === 2 && (
                      <div className="grid grid-cols-2 gap-3">
                        {['Custom Timber Furniture', 'Commercial Architecture', 'Interior Fitouts', 'Consultation'].map((service, i) => (
                          <div key={service} className="p-3 rounded-lg bg-[#101522] border border-white/10">
                            <span className="font-mono text-[9px] text-[#00D4FF] block">0{i + 1}</span>
                            <span className="font-display text-xs font-semibold text-[#F7FAFC]">{service}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeStep === 3 && (
                      <div className="grid grid-cols-2 gap-3">
                        <div className="h-24 rounded-lg bg-[#161D2E] border border-white/10 p-2 flex flex-col justify-end">
                          <span className="font-mono text-[9px] text-[#00D4FF]">CASE STUDY 01</span>
                          <span className="font-display text-xs font-bold text-[#F7FAFC]">The Penthouse Suite</span>
                        </div>
                        <div className="h-24 rounded-lg bg-[#161D2E] border border-white/10 p-2 flex flex-col justify-end">
                          <span className="font-mono text-[9px] text-[#00D4FF]">CASE STUDY 02</span>
                          <span className="font-display text-xs font-bold text-[#F7FAFC]">Kyoto Tea Pavilion</span>
                        </div>
                      </div>
                    )}

                    {activeStep === 4 && (
                      <div className="p-4 rounded-xl bg-gradient-to-br from-[#00D4FF]/20 to-transparent border border-[#00D4FF] flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-[#00D4FF]">INSTANT PROJECT BUILDER</span>
                          <span className="font-mono text-[10px] text-[#8D96A8]">WhatsApp / Direct Sync</span>
                        </div>
                        <div className="h-9 rounded-lg bg-[#00D4FF] text-[#070A12] font-mono text-xs font-bold flex items-center justify-center gap-2">
                          <span>REQUEST CUSTOM ESTIMATE</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs">
                <span className="text-[#8D96A8]">ArulForge Studio Standard:</span>
                <span className="text-[#00D4FF] font-semibold">100% OWNED INFRASTRUCTURE</span>
              </div>
            </div>
          </div>

          {/* Bottom Hard-Hitting Principle Banner */}
          <div className="mt-10 pt-8 border-t border-white/10 text-center flex flex-col items-center">
            <p className="font-mono text-xs sm:text-sm tracking-[0.2em] text-[#8D96A8] uppercase">
              INSTAGRAM GETS YOU DISCOVERED.
            </p>
            <p className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold text-[#F7FAFC] tracking-tight mt-1">
              YOUR WEBSITE MAKES YOU REMEMBERED.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManifestoSection;
