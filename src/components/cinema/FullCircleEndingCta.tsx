import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CinematicTableScene } from './CinematicTableScene';
import { socials } from '../../data/socials';
import { ArrowUpRight, ArrowLeft, ArrowRight, X, Send, Copy, Sparkles } from 'lucide-react';
import { InstagramIcon } from '../common/BrandIcons';
import { useCursor } from '../../context/CursorContext';

export const FullCircleEndingCta: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [projectType, setProjectType] = useState('BUSINESS WEBSITE');
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    instagram: '',
    description: '',
    email: '',
    whatsapp: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const { setCursor, resetCursor } = useCursor();

  const options = [
    'BUSINESS WEBSITE',
    'LANDING PAGE',
    'CREATIVE EXPERIENCE',
    'WEB APPLICATION',
    'OTHER',
  ];

  const buildSummary = () => {
    return (
      `*ARULFORGE // COMMAND TRANSMISSION*\n` +
      `------------------------------------\n` +
      `Scope: ${projectType}\n` +
      `Name: ${formData.name || 'Anonymous'}\n` +
      `Brand: ${formData.brand || 'Unspecified'}\n` +
      `Instagram: ${formData.instagram || 'None'}\n` +
      `Brief: ${formData.description || 'None'}\n` +
      `Email: ${formData.email || 'None'}\n` +
      `WhatsApp: ${formData.whatsapp || 'None'}`
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleOpenWhatsApp = () => {
    const text = encodeURIComponent(buildSummary());
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(buildSummary());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="relative min-h-screen py-32 md:py-48 bg-[#02050b] border-t border-[#00D4FF]/30 overflow-hidden flex flex-col justify-center items-center select-none">
      {/* Background Cinematic Table Scene with Complete Glowing City Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-65 z-0">
        <CinematicTableScene scrollProgress={1.0} />
      </div>

      {/* Holographic Bloom Aura in Center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#00D4FF]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 text-center">
        {/* Full-Circle Realization Metadata */}
        <div className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm text-[#00D4FF] tracking-[0.3em] uppercase mb-8 px-4 py-1.5 rounded-full bg-[#0A0E27]/80 border border-[#00D4FF]/40 shadow-[0_0_20px_rgba(0,212,255,0.2)]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>FULL-CIRCLE COMPLETION // THE TABLE AT TWILIGHT</span>
        </div>

        {/* Narrative Progression Headline */}
        <div className="space-y-2">
          <h3 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-[#8D96A8] tracking-tight uppercase">
            YOUR IDEA
          </h3>
          <h2 className="hero-title-clamp font-display font-black text-white tracking-tighter uppercase leading-[0.9]">
            COULD BE <span className="text-gradient-cyan">NEXT.</span>
          </h2>
          <div className="pt-4 font-display text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight">
            LET&rsquo;S FORGE IT.
          </div>
        </div>

        {/* Supporting Copy */}
        <p className="mt-8 text-base sm:text-xl text-[#8D96A8] max-w-2xl mx-auto font-normal leading-relaxed">
          The digital city you just explored began as a blueprint on this table. Let&rsquo;s turn your vision into an unforgettable digital reality.
        </p>

        {/* Primary and Secondary CTA Triggers */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5">
          <button
            onClick={() => setModalOpen(true)}
            onMouseEnter={() => setCursor('forge')}
            onMouseLeave={resetCursor}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-[#00D4FF] text-[#040a13] font-mono text-sm font-black tracking-wider hover:bg-white transition-all duration-300 shadow-[0_0_40px_rgba(0,212,255,0.45)] cursor-pointer group"
          >
            <span>START A PROJECT</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>

          <a
            href={socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setCursor('default')}
            onMouseLeave={resetCursor}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-5 rounded-full bg-[#0A0E27] hover:bg-[#101522] text-white font-mono text-sm font-bold tracking-wider border border-white/10 hover:border-[#00D4FF]/50 transition-all duration-300 cursor-pointer group"
          >
            <InstagramIcon className="w-4 h-4 text-[#00D4FF]" />
            <span>DM {socials.instagramHandle} ↗</span>
          </a>
        </div>
      </div>

      {/* FULLSCREEN HOLOGRAPHIC COMMAND INTERFACE (MODAL) */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 30 }}
              className="relative w-full max-w-3xl rounded-3xl bg-[#0A0E27] border-2 border-[#00D4FF] shadow-[0_0_80px_rgba(0,212,255,0.35)] p-6 sm:p-10 text-white max-h-[92vh] overflow-y-auto"
            >
              {/* Command Interface Header */}
              <div className="flex items-center justify-between pb-6 border-b border-[#00D4FF]/30">
                <div className="flex items-center gap-3">
                  <span className="font-display font-black text-xl text-[#00D4FF]">ARULFORGE</span>
                  <span className="font-mono text-xs text-[#8D96A8] tracking-widest pl-2 border-l border-white/10">
                    HOLOGRAPHIC COMMAND INTERFACE
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-[#00D4FF]">STEP 0{step} / 04</span>
                  <button
                    onClick={() => {
                      setModalOpen(false);
                      setSubmitted(false);
                    }}
                    className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-[#8D96A8] hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Form Content */}
              <div className="py-8">
                {!submitted ? (
                  <div>
                    {/* STEP 1: WHAT ARE WE FORGING? */}
                    {step === 1 && (
                      <div className="space-y-6">
                        <div>
                          <span className="font-mono text-xs text-[#00D4FF] tracking-widest uppercase block mb-1">
                            COMMAND 01 // SCOPING
                          </span>
                          <h3 className="font-display text-2xl sm:text-4xl font-black text-white">
                            WHAT ARE WE FORGING?
                          </h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                          {options.map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => setProjectType(opt)}
                              className={`p-5 rounded-2xl text-left border font-mono text-xs font-bold tracking-wider transition-all cursor-pointer ${
                                projectType === opt
                                  ? 'bg-[#00D4FF]/15 border-[#00D4FF] text-[#00D4FF] shadow-[0_0_20px_rgba(0,212,255,0.25)]'
                                  : 'bg-[#070A12] border-white/10 text-[#8D96A8] hover:border-white/30'
                              }`}
                            >
                              [ {opt} ]
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* STEP 2: YOUR BRAND */}
                    {step === 2 && (
                      <div className="space-y-6">
                        <div>
                          <span className="font-mono text-xs text-[#00D4FF] tracking-widest uppercase block mb-1">
                            COMMAND 02 // IDENTITY
                          </span>
                          <h3 className="font-display text-2xl sm:text-4xl font-black text-white">
                            YOUR BRAND.
                          </h3>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="font-mono text-xs text-[#8D96A8] block mb-2">NAME *</label>
                            <input
                              type="text"
                              required
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              placeholder="Alex / Sarah"
                              className="w-full px-4 py-3.5 rounded-xl bg-[#070A12] border border-white/10 focus:border-[#00D4FF] focus:outline-none font-mono text-sm text-white"
                            />
                          </div>

                          <div>
                            <label className="font-mono text-xs text-[#8D96A8] block mb-2">BUSINESS / BRAND *</label>
                            <input
                              type="text"
                              required
                              value={formData.brand}
                              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                              placeholder="Acme Studio / Brand Co."
                              className="w-full px-4 py-3.5 rounded-xl bg-[#070A12] border border-white/10 focus:border-[#00D4FF] focus:outline-none font-mono text-sm text-white"
                            />
                          </div>

                          <div>
                            <label className="font-mono text-xs text-[#8D96A8] block mb-2">INSTAGRAM HANDLE</label>
                            <input
                              type="text"
                              value={formData.instagram}
                              onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                              placeholder="@brand"
                              className="w-full px-4 py-3.5 rounded-xl bg-[#070A12] border border-white/10 focus:border-[#00D4FF] focus:outline-none font-mono text-sm text-white"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 3: THE IDEA */}
                    {step === 3 && (
                      <div className="space-y-6">
                        <div>
                          <span className="font-mono text-xs text-[#00D4FF] tracking-widest uppercase block mb-1">
                            COMMAND 03 // ARCHITECTURE
                          </span>
                          <h3 className="font-display text-2xl sm:text-4xl font-black text-white">
                            THE IDEA.
                          </h3>
                        </div>

                        <div>
                          <label className="font-mono text-xs text-[#8D96A8] block mb-2">PROJECT DESCRIPTION *</label>
                          <textarea
                            rows={4}
                            required
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Describe your vision, target audience, and what action you want visitors to take..."
                            className="w-full px-4 py-3.5 rounded-xl bg-[#070A12] border border-white/10 focus:border-[#00D4FF] focus:outline-none font-mono text-sm text-white resize-none"
                          />
                        </div>
                      </div>
                    )}

                    {/* STEP 4: CONTACT */}
                    {step === 4 && (
                      <div className="space-y-6">
                        <div>
                          <span className="font-mono text-xs text-[#00D4FF] tracking-widest uppercase block mb-1">
                            COMMAND 04 // TRANSMISSION
                          </span>
                          <h3 className="font-display text-2xl sm:text-4xl font-black text-white">
                            HOW SHOULD WE REACH YOU?
                          </h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="font-mono text-xs text-[#8D96A8] block mb-2">EMAIL ADDRESS *</label>
                            <input
                              type="email"
                              required
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              placeholder="alex@brand.com"
                              className="w-full px-4 py-3.5 rounded-xl bg-[#070A12] border border-white/10 focus:border-[#00D4FF] focus:outline-none font-mono text-sm text-white"
                            />
                          </div>

                          <div>
                            <label className="font-mono text-xs text-[#8D96A8] block mb-2">WHATSAPP NUMBER</label>
                            <input
                              type="tel"
                              value={formData.whatsapp}
                              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                              placeholder="+91 98765 43210"
                              className="w-full px-4 py-3.5 rounded-xl bg-[#070A12] border border-white/10 focus:border-[#00D4FF] focus:outline-none font-mono text-sm text-white"
                            />
                          </div>
                        </div>

                        <div className="p-4 rounded-xl bg-[#070A12] border border-[#00D4FF]/30 font-mono text-xs text-[#8D96A8]">
                          Scope: <span className="text-white">{projectType}</span> • Brand: <span className="text-white">{formData.brand || 'Unspecified'}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Success Transmission Screen */
                  <div className="text-center py-8 space-y-6">
                    <div className="w-16 h-16 rounded-full bg-[#00D4FF]/20 border-2 border-[#00D4FF] text-[#00D4FF] mx-auto flex items-center justify-center shadow-[0_0_35px_#00D4FF]">
                      <Sparkles className="w-8 h-8" />
                    </div>

                    <div>
                      <h4 className="font-display text-3xl font-black text-white uppercase">
                        TRANSMISSION LOGGED.
                      </h4>
                      <p className="text-sm text-[#8D96A8] max-w-md mx-auto mt-2">
                        Your project blueprint has been received by ArulForge. We will review your specifications and establish communication within 24 hours.
                      </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 pt-4">
                      <button
                        onClick={handleOpenWhatsApp}
                        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#00D4FF] text-[#040a13] font-mono text-xs font-bold hover:bg-white transition-colors"
                      >
                        <Send className="w-4 h-4" />
                        <span>TRANSMIT VIA WHATSAPP NOW ↗</span>
                      </button>

                      <button
                        onClick={handleCopy}
                        className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-[#070A12] text-white font-mono text-xs border border-white/10 hover:border-white/20 transition-colors"
                      >
                        <Copy className="w-4 h-4 text-[#00D4FF]" />
                        <span>{copied ? 'COPIED TO CLIPBOARD!' : 'COPY BRIEF SUMMARY'}</span>
                      </button>
                    </div>

                    <div className="pt-6 border-t border-white/10">
                      <a
                        href={socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-mono text-[#00D4FF] hover:underline"
                      >
                        <InstagramIcon className="w-4 h-4" />
                        <span>Prefer Instagram? DM @arulforge ↗</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Controls Footer */}
              {!submitted && (
                <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    {step > 1 && (
                      <button
                        type="button"
                        onClick={() => setStep(step - 1)}
                        className="inline-flex items-center gap-2 font-mono text-xs text-[#8D96A8] hover:text-white transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>BACK</span>
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
                    <a
                      href={socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-[#8D96A8] hover:text-[#00D4FF] transition-colors"
                    >
                      PREFER INSTAGRAM? DM {socials.instagramHandle} ↗
                    </a>

                    {step < 4 ? (
                      <button
                        type="button"
                        onClick={() => setStep(step + 1)}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#00D4FF] text-[#040a13] font-mono text-xs font-bold hover:bg-white transition-colors"
                      >
                        <span>NEXT</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#00D4FF] text-[#040a13] font-mono text-xs font-black tracking-wider hover:bg-white transition-all shadow-[0_0_25px_#00D4FF]"
                      >
                        <span>SEND TO THE FORGE →</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FullCircleEndingCta;
