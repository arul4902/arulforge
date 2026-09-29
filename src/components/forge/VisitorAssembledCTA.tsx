import React, { useRef, useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';

export const VisitorAssembledCTA: React.FC = () => {
  const [assembled, setAssembled] = useState(false);
  const [proximity, setProximity] = useState(0); // 0 to 1
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const ctaBoxRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setAssembled(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (assembled || !ctaBoxRef.current) return;
      const rect = ctaBoxRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);
      const threshold = 220;

      if (dist < threshold) {
        const prox = Math.min(1, Math.max(0, (threshold - dist) / threshold));
        setProximity(prox);

        if (prox > 0.82) {
          setAssembled(true);
        }
      } else {
        setProximity((p) => Math.max(0, p - 0.08));
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [assembled, shouldReduceMotion]);

  const cornerOffset = (1 - (assembled ? 1 : proximity)) * 24;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="py-28 sm:py-40 px-5 sm:px-8 md:px-16 relative bg-[#070709] select-none text-center"
      aria-label="Forge Collaboration"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Minimal Heroic Heading */}
        <div className="mb-14 sm:mb-20">
          <p className="font-mono text-xs sm:text-sm tracking-[0.35em] text-[#00F0FF] uppercase mb-4">
            // FINAL STAGE: YOUR TURN
          </p>
          <h2 className="font-kanit font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tighter text-white leading-none mb-3">
            YOU'VE SEEN HOW I BUILD.
          </h2>
          <h2 className="font-kanit font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tighter text-[#00F0FF] leading-none">
            NOW LET'S BUILD YOURS.
          </h2>
        </div>

        {/* UNFINISHED RECTANGULAR INTERFACE ASSEMBLED BY VISITOR CURSOR */}
        <div
          ref={ctaBoxRef}
          data-forge-tool="welder"
          className="relative flex flex-col items-center justify-center p-8 sm:p-12 cursor-pointer group"
        >
          {/* Assembling Frame Container */}
          <div
            onClick={() => setShowModal(true)}
            className={`relative w-72 sm:w-96 h-20 rounded-2xl flex items-center justify-center transition-all duration-500 ${
              assembled
                ? 'border-2 border-[#00F0FF] bg-[#00F0FF]/10 shadow-[0_0_35px_rgba(0,240,255,0.4)]'
                : 'border border-dashed border-[#D7E2EA]/30 bg-[#121216]/50'
            }`}
          >
            {/* 4 Corners that physically glide inward to assemble the button */}
            <div
              style={{
                transform: `translate3d(${-cornerOffset}px, ${-cornerOffset}px, 0)`,
              }}
              className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-[#00F0FF]"
            />
            <div
              style={{
                transform: `translate3d(${cornerOffset}px, ${-cornerOffset}px, 0)`,
              }}
              className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-[#00F0FF]"
            />
            <div
              style={{
                transform: `translate3d(${-cornerOffset}px, ${cornerOffset}px, 0)`,
              }}
              className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-[#00F0FF]"
            />
            <div
              style={{
                transform: `translate3d(${cornerOffset}px, ${cornerOffset}px, 0)`,
              }}
              className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-[#00F0FF]"
            />

            {/* Assembled Button Label */}
            <motion.span
              animate={{
                opacity: assembled ? 1 : proximity > 0.4 ? proximity : 0.25,
                scale: assembled ? 1 : 0.95,
              }}
              className="font-kanit font-black text-base sm:text-xl uppercase tracking-wider text-white flex items-center gap-3 select-none"
            >
              <span>START A PROJECT</span>
              <span className="text-[#00F0FF]">→</span>
            </motion.span>
          </div>

          {/* Micro status text */}
          <div className="h-6 mt-4 font-mono text-xs tracking-widest text-[#00F0FF] uppercase flex items-center gap-2">
            {assembled ? (
              <span className="animate-pulse">⚡ READY TO FORGE.</span>
            ) : (
              <span className="text-[#646973]">
                APPROACH TO ASSEMBLE BUTTON ({Math.round(proximity * 100)}%)
              </span>
            )}
          </div>
        </div>

        {/* Direct Email link */}
        <div className="mt-8 font-mono text-xs text-[#BBCCD7]/60">
          DIRECT LINE:{' '}
          <a
            href="mailto:kumarsiva42887@gmail.com"
            className="text-[#00F0FF] hover:underline"
          >
            kumarsiva42887@gmail.com
          </a>
        </div>
      </div>

      {/* Interactive Collaboration Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[99990] bg-black/85 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="relative max-w-lg w-full p-8 rounded-3xl border border-[#00F0FF] bg-[#0E0E12] shadow-[0_0_50px_rgba(0,240,255,0.3)] text-left">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 font-mono text-xs text-[#646973] hover:text-white"
            >
              [CLOSE]
            </button>

            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#00F0FF] mx-auto" />
                <h3 className="font-kanit font-black text-2xl uppercase text-white">
                  SPECIFICATION QUEUED
                </h3>
                <p className="font-light text-sm text-[#BBCCD7]/70">
                  Thank you, {formData.name}. Arul S. will review your requirements and follow up.
                </p>
                <button
                  onClick={() => setShowModal(false)}
                  className="mt-4 px-6 py-2 rounded-full border border-[#00F0FF] text-xs font-mono uppercase text-[#00F0FF]"
                >
                  RETURN TO FORGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                <div className="text-sm font-bold uppercase tracking-wider text-[#00F0FF] mb-2 font-kanit">
                  FORGE INQUIRY MANIFEST
                </div>

                <div>
                  <label className="block text-[#BBCCD7] uppercase mb-1">YOUR NAME *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#16161C] border border-[#D7E2EA]/20 text-white font-kanit text-sm focus:outline-none focus:border-[#00F0FF]"
                  />
                </div>

                <div>
                  <label className="block text-[#BBCCD7] uppercase mb-1">EMAIL ADDRESS *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#16161C] border border-[#D7E2EA]/20 text-white font-kanit text-sm focus:outline-none focus:border-[#00F0FF]"
                  />
                </div>

                <div>
                  <label className="block text-[#BBCCD7] uppercase mb-1">PROJECT SCOPE *</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about what should be built next..."
                    className="w-full px-4 py-3 rounded-xl bg-[#16161C] border border-[#D7E2EA]/20 text-white font-kanit text-sm focus:outline-none focus:border-[#00F0FF] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-[#00F0FF] text-[#0C0C0C] font-black uppercase tracking-widest font-kanit text-sm flex items-center justify-center gap-2 hover:brightness-110"
                >
                  <span>SUBMIT SPECIFICATION</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default VisitorAssembledCTA;
