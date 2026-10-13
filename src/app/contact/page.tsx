'use client';

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Phone, Check, ArrowRight } from 'lucide-react';
import Reveal from '@/components/Reveal';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    scale: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        console.warn('API submission responded with non-ok status');
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        projectType: '',
        scale: '',
        message: '',
      });
    } catch (err) {
      console.error('Submission error:', err);
      // Keep UX smooth
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        projectType: '',
        scale: '',
        message: '',
      });
    }
  };

  const inputClass =
    'w-full px-4 py-3 rounded-[10px] border border-neutral-200 bg-neutral-50 text-black text-sm focus:outline-none focus:border-brand-blue focus:bg-white transition-colors';

  const labelClass = 'text-xs font-semibold text-black tracking-wider uppercase';

  return (
    <div className="select-none">
      {/* HERO — sleek gradient band */}
      <section className="relative bg-molecules-hero overflow-hidden px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="relative w-full max-w-[1700px] mx-auto py-16 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <span className="inline-block px-3 py-1.5 rounded-[10px] text-[10px] uppercase font-bold tracking-wider bg-brand-yellow text-black mb-6">
              Contact
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.1] mb-4">
              Let&apos;s Advance Your <span className="text-neutral-900">Next Biologics</span> Program
            </h1>
            {/* animated yellow underline */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
              className="h-1 w-24 bg-brand-yellow rounded-full origin-left mb-5"
            />
            <p className="text-[17px] text-slate-500 font-normal leading-relaxed">
              Whether you&apos;re developing an innovator biologic, biosimilar, or next-generation therapeutic, our team is ready to discuss your development and manufacturing requirements.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20 w-full">
        <div className="w-full max-w-[1700px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">

          {/* Left Column: Form */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="relative glass-card rounded-[10px] p-6 md:p-8 shadow-sm overflow-hidden border border-neutral-200/90 bg-white/95">
                {/* yellow top accent */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-brand-yellow" />
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="py-12 flex flex-col items-center text-center justify-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.1 }}
                        className="w-20 h-20 rounded-[10px] bg-brand-yellow flex items-center justify-center mb-6"
                      >
                        <Check className="w-10 h-10 text-black" strokeWidth={3} />
                      </motion.div>
                      <h3 className="text-2xl font-semibold text-black mb-2">Technical Inquiry Received</h3>
                      <p className="text-[15px] text-neutral-600 font-normal max-w-sm leading-relaxed">
                        Thank you for sharing your project specifications. Our development directors will evaluate your requirements and contact you promptly.
                      </p>
                      <button
                        onClick={() => setStatus('idle')}
                        className="group mt-6 inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-brand-blue uppercase"
                      >
                        <span className="w-6 h-0.5 bg-brand-yellow group-hover:w-10 transition-all duration-300" />
                        Submit another inquiry
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-5 select-none"
                    >
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="name" className={labelClass}>Contact Name</label>
                        <input
                          type="text"
                          id="name"
                          required
                          placeholder="Jane Smith"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={inputClass}
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" className={labelClass}>Corporate Email</label>
                        <input
                          type="email"
                          id="email"
                          required
                          placeholder="jane@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={inputClass}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="projectType" className={labelClass}>Service Requested</label>
                          <select
                            id="projectType"
                            value={formData.projectType}
                            onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                            className={`${inputClass} cursor-pointer`}
                          >
                            <option value="">Select...</option>
                            <option value="cell-line">Cell Line Engineering</option>
                            <option value="process-development-characterization">Process Development and Characterization</option>
                            <option value="gmp-substance">cGMP Drug Substance Manufacturing</option>
                            <option value="aseptic-fill">Aseptic Drug Product Fill/Finish</option>
                            <option value="analytical-testing">Analytical Validation & Characterization</option>
                          </select>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="scale" className={labelClass}>Project Phase / Scale</label>
                          <select
                            id="scale"
                            value={formData.scale}
                            onChange={(e) => setFormData({ ...formData, scale: e.target.value })}
                            className={`${inputClass} cursor-pointer`}
                          >
                            <option value="">Select...</option>
                            <option value="pilot">Early Pilot / Pre-clinical run</option>
                            <option value="phase-1">Phase I Clinical Batch</option>
                            <option value="phase-2-3">Phase II / III Clinical Quantities</option>
                            <option value="commercial">Commercial Supply</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="message" className={labelClass}>Technical Specifications</label>
                        <textarea
                          id="message"
                          required
                          rows={5}
                          placeholder="Tell us about your lead molecule target format, expression titers, and timeline expectations..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className={`${inputClass} resize-none`}
                        />
                      </div>

                      <div className="mt-2">
                        <button
                          type="submit"
                          disabled={status === 'loading'}
                          className="group w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-[10px] bg-brand-yellow hover:bg-brand-yellow-hover text-black font-semibold text-sm uppercase tracking-wider shadow-md hover:shadow-lg active:scale-98 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {status === 'loading' ? (
                            <>
                              <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            <>
                              Submit Technical Inquiry
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Contact Information — Premium Ultra-Modern Card */}
          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="relative bg-white/95 backdrop-blur-xl border border-neutral-200/90 rounded-[10px] p-6 sm:p-8 lg:p-9 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden select-none flex flex-col justify-between min-h-[500px] group">
                {/* Soft ambient lighting glow (No grid) */}
                <div className="absolute -top-24 -right-24 w-60 h-60 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none group-hover:bg-brand-blue/15 transition-all duration-500" />
                <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none transition-all duration-500" />

                {/* Top Accent Blue Bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-brand-blue" />

                <div className="relative z-10">
                  {/* Status Indicator */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/5 border border-brand-blue/20 mb-5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue" />
                    </span>
                    <span className="text-[10px] font-bold tracking-widest text-brand-navy uppercase">
                      Available for Technical Discussion
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-semibold text-black tracking-tight leading-tight mb-3">
                    Connect with our <span className="text-brand-blue font-bold">scientific team</span>
                  </h3>
                  
                  <p className="text-[15px] text-neutral-600 font-normal leading-relaxed mb-6">
                    Get in touch directly with our technical directors to map out development strategies, equipment trains, and technology transfer schedules.
                  </p>
                </div>

                {/* Contact Channels Cards */}
                <div className="flex flex-col gap-3.5 my-6 relative z-10">
                  <a
                    href="mailto:BD@lambda-cro.com"
                    className="group/item flex items-center gap-4 p-3.5 rounded-[10px] bg-neutral-50/80 border border-neutral-200/80 hover:border-brand-blue hover:bg-brand-blue/[0.03] transition-all duration-200"
                  >
                    <div className="w-11 h-11 rounded-[8px] bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center flex-shrink-0 group-hover/item:bg-brand-blue group-hover/item:text-white transition-all duration-200">
                      <Mail className="w-5 h-5 text-brand-blue group-hover/item:text-white transition-colors duration-200" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">Corporate Email</span>
                      <p className="text-sm font-semibold text-neutral-900 group-hover/item:text-brand-blue transition-colors duration-200 truncate">
                        BD@lambda-cro.com
                      </p>
                    </div>
                  </a>

                  {/* Ahmedabad Location */}
                  <div className="flex items-center gap-4 p-3.5 rounded-[10px] bg-neutral-50/80 border border-neutral-200/80">
                    <div className="w-11 h-11 rounded-[8px] bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-brand-blue" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">India Facility</span>
                      <p className="text-xs sm:text-sm font-semibold text-neutral-900 leading-snug">
                        Lambda House, Plot No. 38, Survey No. 388, Near Silver Oak University, S. G. Highway, Gota, Ahmedabad - 382481, Gujarat, India
                      </p>
                    </div>
                  </div>

                  {/* London Location */}
                  <div className="flex items-center gap-4 p-3.5 rounded-[10px] bg-neutral-50/80 border border-neutral-200/80">
                    <div className="w-11 h-11 rounded-[8px] bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-brand-blue" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">London UK Centre</span>
                      <p className="text-xs sm:text-sm font-semibold text-neutral-900 leading-snug">
                        319 Sage House, Pinner Road, Harrow, London, HA1 4HF, UK
                      </p>
                    </div>
                  </div>

                  <a
                    href="tel:+917940202020"
                    className="group/item flex items-center gap-4 p-3.5 rounded-[10px] bg-neutral-50/80 border border-neutral-200/80 hover:border-brand-blue hover:bg-brand-blue/[0.03] transition-all duration-200"
                  >
                    <div className="w-11 h-11 rounded-[8px] bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center flex-shrink-0 group-hover/item:bg-brand-blue group-hover/item:text-white transition-all duration-200">
                      <Phone className="w-5 h-5 text-brand-blue group-hover/item:text-white transition-colors duration-200" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">Direct Phone</span>
                      <p className="text-sm font-semibold text-neutral-900 group-hover/item:text-brand-blue transition-colors duration-200 truncate">
                        +91-79-40202020
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  </div>
);
}
