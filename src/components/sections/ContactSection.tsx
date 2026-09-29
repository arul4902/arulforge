import React, { useState } from 'react';
import FadeIn from '../common/FadeIn';
import Magnet from '../common/Magnet';
import { Mail, Send, CheckCircle2, Copy, Check } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const emailAddress = 'kumarsiva42887@gmail.com';

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="py-24 sm:py-32 px-5 sm:px-8 md:px-16 relative bg-[#0C0C0C] border-t border-[#D7E2EA]/10"
      aria-label="Contact and Inquiry"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
          {/* Left Column: Massive Heading & Email info */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <FadeIn delay={0} y={35}>
                <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#B600A8] uppercase block mb-4">
                  GET IN TOUCH
                </span>
                <h2
                  style={{ fontSize: 'clamp(3rem, 9vw, 8.5rem)' }}
                  className="hero-heading font-black uppercase tracking-tight leading-[0.92] mb-8 select-none"
                >
                  LET'S
                  <br />
                  COLLABORATE.
                </h2>
              </FadeIn>

              <FadeIn delay={0.15} y={25}>
                <p className="text-base sm:text-lg md:text-xl font-light text-[#D7E2EA]/85 leading-relaxed max-w-lg mb-10 font-kanit">
                  Available for select functional projects and software development
                  opportunities.
                </p>
              </FadeIn>
            </div>

            {/* Direct Email Display with Copy button */}
            <FadeIn delay={0.25} y={20}>
              <div className="p-6 rounded-[28px] border border-[#D7E2EA]/15 bg-[#121212]/80 backdrop-blur-md max-w-md">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#646973] mb-2">
                  <Mail className="w-3.5 h-3.5 text-[#B600A8]" />
                  <span>Direct Communication</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <a
                    href={`mailto:${emailAddress}`}
                    className="text-base sm:text-lg font-semibold text-[#D7E2EA] hover:text-white transition-colors truncate"
                  >
                    {emailAddress}
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-xl bg-[#1C1C1C] hover:bg-[#252525] text-[#BBCCD7] transition-colors shrink-0"
                    title="Copy Email"
                    aria-label="Copy Email Address"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-6">
            <FadeIn delay={0.2} y={30}>
              <div className="rounded-[36px] sm:rounded-[48px] border-2 border-[#D7E2EA]/20 bg-[#121212]/90 p-6 sm:p-10 md:p-12 shadow-2xl relative">
                {submitted ? (
                  <div className="py-12 sm:py-16 text-center space-y-4 animate-in fade-in zoom-in-95 duration-500">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold uppercase text-[#D7E2EA] font-kanit">
                      Inquiry Received
                    </h3>
                    <p className="text-sm sm:text-base text-[#BBCCD7]/70 font-light max-w-md mx-auto">
                      Thank you for reaching out, {formData.name}. Arul S. will review your
                      project details and follow up promptly.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-4 px-6 py-2.5 rounded-full border border-[#D7E2EA]/20 text-xs uppercase tracking-wider text-[#D7E2EA] hover:bg-white hover:text-black transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                    {/* NAME */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs font-semibold uppercase tracking-[0.2em] text-[#BBCCD7]/80 mb-2"
                      >
                        NAME *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="w-full px-5 py-3.5 sm:py-4 rounded-2xl bg-[#1A1A1A] border border-[#D7E2EA]/15 text-[#D7E2EA] placeholder-[#646973] text-sm sm:text-base focus:outline-none focus:border-[#B600A8] focus:ring-1 focus:ring-[#B600A8] transition-all font-kanit"
                      />
                    </div>

                    {/* EMAIL */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-semibold uppercase tracking-[0.2em] text-[#BBCCD7]/80 mb-2"
                      >
                        EMAIL *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="alex@domain.com"
                        className="w-full px-5 py-3.5 sm:py-4 rounded-2xl bg-[#1A1A1A] border border-[#D7E2EA]/15 text-[#D7E2EA] placeholder-[#646973] text-sm sm:text-base focus:outline-none focus:border-[#B600A8] focus:ring-1 focus:ring-[#B600A8] transition-all font-kanit"
                      />
                    </div>

                    {/* COMPANY — OPTIONAL */}
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-xs font-semibold uppercase tracking-[0.2em] text-[#BBCCD7]/80 mb-2"
                      >
                        COMPANY — OPTIONAL
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Company or organization"
                        className="w-full px-5 py-3.5 sm:py-4 rounded-2xl bg-[#1A1A1A] border border-[#D7E2EA]/15 text-[#D7E2EA] placeholder-[#646973] text-sm sm:text-base focus:outline-none focus:border-[#B600A8] focus:ring-1 focus:ring-[#B600A8] transition-all font-kanit"
                      />
                    </div>

                    {/* MESSAGE */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-xs font-semibold uppercase tracking-[0.2em] text-[#BBCCD7]/80 mb-2"
                      >
                        MESSAGE *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell me about your project scope, goals, or opportunities..."
                        className="w-full px-5 py-3.5 sm:py-4 rounded-2xl bg-[#1A1A1A] border border-[#D7E2EA]/15 text-[#D7E2EA] placeholder-[#646973] text-sm sm:text-base focus:outline-none focus:border-[#B600A8] focus:ring-1 focus:ring-[#B600A8] transition-all font-kanit resize-none"
                      />
                    </div>

                    {/* CTA: SEND INQUIRY */}
                    <div className="pt-2">
                      <Magnet strength={4} padding={80} className="w-full sm:w-auto">
                        <button
                          type="submit"
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 sm:py-4.5 rounded-full font-bold uppercase tracking-widest text-sm text-white cursor-pointer contact-btn-signature transition-transform active:scale-[0.98]"
                          style={{
                            background:
                              'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                            boxShadow:
                              '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
                            outline: '2px solid #FFFFFF',
                            outlineOffset: '-3px',
                          }}
                        >
                          <span>SEND INQUIRY</span>
                          <Send className="w-4 h-4" />
                        </button>
                      </Magnet>
                    </div>
                  </form>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
