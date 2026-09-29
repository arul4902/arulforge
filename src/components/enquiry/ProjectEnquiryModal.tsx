import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ArrowLeft, Check, Sparkles, Send, Copy } from 'lucide-react';
import { InstagramIcon } from '../common/BrandIcons';
import { brand, socialLinks } from '../../data/forgeConfig';
import { useCursor } from '../../context/CursorContext';

interface ProjectEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectEnquiryModal: React.FC<ProjectEnquiryModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [projectType, setProjectType] = useState<string>('Business Website');
  const [formData, setFormData] = useState({
    name: '',
    brandName: '',
    instagram: '',
    projectIdea: '',
    email: '',
    whatsapp: '',
  });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const { setCursor, resetCursor } = useCursor();

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const projectTypes = [
    { title: 'Business Website', desc: 'Digital storefront engineered to convert enquiries.' },
    { title: 'Landing Page', desc: 'High-focus campaign page built for single CTA.' },
    { title: 'Creative Experience', desc: 'Distinctive motion, storytelling & high visual impact.' },
    { title: 'Web Application', desc: 'Interactive full-stack platform, dashboard or API product.' },
    { title: 'Something Else', desc: 'Custom digital forge or experimental web build.' },
  ];

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const buildSummaryText = () => {
    return `*ARULFORGE PROJECT ENQUIRY*\n` +
      `--------------------------\n` +
      `Forge Type: ${projectType}\n` +
      `Name: ${formData.name || 'Not provided'}\n` +
      `Brand: ${formData.brandName || 'Not provided'}\n` +
      `Instagram: ${formData.instagram || 'Not provided'}\n` +
      `Project Brief: ${formData.projectIdea || 'None'}\n` +
      `Email: ${formData.email || 'None'}\n` +
      `WhatsApp: ${formData.whatsapp || 'None'}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    sessionStorage.setItem('last_enquiry', JSON.stringify({ projectType, ...formData }));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(buildSummaryText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenWhatsApp = () => {
    const text = encodeURIComponent(buildSummaryText());
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 30 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl rounded-3xl bg-[#0A0E27] border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.8)] p-6 sm:p-10 text-[#F7FAFC] flex flex-col justify-between max-h-[92vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="font-display font-black text-xl text-[#00D4FF]">
                {brand.name}
              </span>
              <span className="font-mono text-xs text-[#8D96A8] tracking-widest pl-2 border-l border-white/10">
                PROJECT ENQUIRY
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="font-mono text-xs text-[#00D4FF]">
                STEP 0{currentStep} / 03
              </span>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-[#8D96A8] hover:text-white transition-colors cursor-pointer"
                aria-label="Close project enquiry"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Form Content */}
          <div className="py-8">
            {!isSubmitted ? (
              <div>
                {/* STEP 01: WHAT ARE WE FORGING? */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <span className="font-mono text-xs text-[#00D4FF] tracking-widest">
                        PHASE 01 // SCOPE SELECTION
                      </span>
                      <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#F7FAFC] mt-1">
                        WHAT ARE WE FORGING?
                      </h3>
                      <p className="text-sm text-[#8D96A8] mt-1">
                        Select the primary digital format that matches your ambition.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {projectTypes.map((type) => {
                        const isSelected = projectType === type.title;
                        return (
                          <button
                            key={type.title}
                            type="button"
                            onClick={() => setProjectType(type.title)}
                            onMouseEnter={() => setCursor('default')}
                            onMouseLeave={resetCursor}
                            className={`p-4 rounded-2xl text-left border transition-all duration-200 cursor-pointer ${
                              isSelected
                                ? 'bg-[#00D4FF]/10 border-[#00D4FF] shadow-[0_0_20px_rgba(0,212,255,0.2)]'
                                : 'bg-[#101522] border-white/10 hover:border-white/20'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-display font-bold text-base text-[#F7FAFC]">
                                {type.title}
                              </span>
                              <div
                                className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                                  isSelected
                                    ? 'bg-[#00D4FF] border-[#00D4FF] text-[#070A12]'
                                    : 'border-white/20'
                                }`}
                              >
                                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                            </div>
                            <p className="text-xs text-[#8D96A8] leading-relaxed">
                              {type.desc}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* STEP 02: TELL US ABOUT YOUR BRAND */}
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <span className="font-mono text-xs text-[#00D4FF] tracking-widest">
                        PHASE 02 // IDENTITY
                      </span>
                      <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#F7FAFC] mt-1">
                        TELL US ABOUT YOUR BRAND.
                      </h3>
                      <p className="text-sm text-[#8D96A8] mt-1">
                        Share your current presence and what you want to achieve.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-mono text-xs text-[#8D96A8] block mb-2">YOUR NAME *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Arun / Alex"
                          className="w-full px-4 py-3 rounded-xl bg-[#101522] border border-white/10 focus:border-[#00D4FF] focus:outline-none font-mono text-sm text-[#F7FAFC]"
                        />
                      </div>

                      <div>
                        <label className="font-mono text-xs text-[#8D96A8] block mb-2">BUSINESS / BRAND NAME *</label>
                        <input
                          type="text"
                          required
                          value={formData.brandName}
                          onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                          placeholder="Apex Studio / Brand Co."
                          className="w-full px-4 py-3 rounded-xl bg-[#101522] border border-white/10 focus:border-[#00D4FF] focus:outline-none font-mono text-sm text-[#F7FAFC]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-mono text-xs text-[#8D96A8] block mb-2">INSTAGRAM HANDLE</label>
                      <input
                        type="text"
                        value={formData.instagram}
                        onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                        placeholder="@yourbrand"
                        className="w-full px-4 py-3 rounded-xl bg-[#101522] border border-white/10 focus:border-[#00D4FF] focus:outline-none font-mono text-sm text-[#F7FAFC]"
                      />
                    </div>

                    <div>
                      <label className="font-mono text-xs text-[#8D96A8] block mb-2">PROJECT IDEA / OBJECTIVES</label>
                      <textarea
                        rows={3}
                        value={formData.projectIdea}
                        onChange={(e) => setFormData({ ...formData, projectIdea: e.target.value })}
                        placeholder="Tell us what problem this website will solve or what aesthetic you envision..."
                        className="w-full px-4 py-3 rounded-xl bg-[#101522] border border-white/10 focus:border-[#00D4FF] focus:outline-none font-mono text-sm text-[#F7FAFC] resize-none"
                      />
                    </div>
                  </motion.div>
                )}

                {/* STEP 03: HOW SHOULD WE REACH YOU? */}
                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <span className="font-mono text-xs text-[#00D4FF] tracking-widest">
                        PHASE 03 // CONTACT DIRECT
                      </span>
                      <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#F7FAFC] mt-1">
                        HOW SHOULD WE REACH YOU?
                      </h3>
                      <p className="text-sm text-[#8D96A8] mt-1">
                        We respect your time. Direct responses within 24 hours.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-mono text-xs text-[#8D96A8] block mb-2">EMAIL ADDRESS *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="hello@yourbrand.com"
                          className="w-full px-4 py-3 rounded-xl bg-[#101522] border border-white/10 focus:border-[#00D4FF] focus:outline-none font-mono text-sm text-[#F7FAFC]"
                        />
                      </div>

                      <div>
                        <label className="font-mono text-xs text-[#8D96A8] block mb-2">WHATSAPP NUMBER</label>
                        <input
                          type="tel"
                          value={formData.whatsapp}
                          onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3 rounded-xl bg-[#101522] border border-white/10 focus:border-[#00D4FF] focus:outline-none font-mono text-sm text-[#F7FAFC]"
                        />
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#0E1322] border border-white/10 space-y-2">
                      <div className="font-mono text-xs text-[#00D4FF] font-semibold">SELECTED SPECIFICATION:</div>
                      <div className="text-xs text-[#8D96A8] flex flex-wrap gap-x-4 gap-y-1">
                        <span>Format: <strong className="text-white">{projectType}</strong></span>
                        <span>Name: <strong className="text-white">{formData.name || 'Anonymous'}</strong></span>
                        <span>Brand: <strong className="text-white">{formData.brandName || 'Brand'}</strong></span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              /* Success / Confirmation Screen */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-[#00D4FF]/20 border-2 border-[#00D4FF] text-[#00D4FF] mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(0,212,255,0.4)]">
                  <Sparkles className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="font-display text-3xl font-extrabold text-[#F7FAFC]">
                    PROJECT BRIEF INGESTED.
                  </h3>
                  <p className="text-sm text-[#8D96A8] max-w-md mx-auto mt-2">
                    Thank you, <span className="text-[#F7FAFC] font-semibold">{formData.name || 'builder'}</span>. ArulForge has captured your project blueprint. We will review your requirements and reach out directly.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                  <button
                    onClick={handleOpenWhatsApp}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#00D4FF] text-[#070A12] font-mono text-xs font-bold hover:bg-white transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>TRANSMIT VIA WHATSAPP NOW ↗</span>
                  </button>

                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-[#101522] text-[#F7FAFC] font-mono text-xs border border-white/10 hover:border-white/20 transition-colors cursor-pointer"
                  >
                    <Copy className="w-4 h-4 text-[#00D4FF]" />
                    <span>{copied ? 'COPIED TO CLIPBOARD!' : 'COPY BRIEF SUMMARY'}</span>
                  </button>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono text-[#00D4FF] hover:underline"
                  >
                    <InstagramIcon className="w-4 h-4" />
                    <span>Prefer Instagram? DM @arulforge ↗</span>
                  </a>
                </div>
              </motion.div>
            )}
          </div>

          {/* Navigation Controls */}
          {!isSubmitted && (
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex items-center gap-2 font-mono text-xs text-[#8D96A8] hover:text-[#F7FAFC] transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>BACK</span>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-[#8D96A8] hover:text-[#00D4FF] transition-colors"
                >
                  Prefer Instagram? DM @arulforge ↗
                </a>

                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    onMouseEnter={() => setCursor('forge')}
                    onMouseLeave={resetCursor}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#00D4FF] text-[#070A12] font-mono text-xs font-bold tracking-wider hover:bg-white transition-colors cursor-pointer"
                  >
                    <span>NEXT STEP</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    onMouseEnter={() => setCursor('forge')}
                    onMouseLeave={resetCursor}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#00D4FF] text-[#070A12] font-mono text-xs font-black tracking-wider hover:bg-white transition-all shadow-[0_0_25px_rgba(0,212,255,0.4)] cursor-pointer"
                  >
                    <span>SEND PROJECT REQUEST →</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectEnquiryModal;
