'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Contact() {
  const { ref, isVisible } = useScrollReveal();
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" className="py-16 sm:py-24" ref={ref}>
      <div className="mx-auto max-w-lg px-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center text-sm uppercase tracking-[0.2em] text-text-muted mb-10"
        >
          Get in touch
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="glass rounded-3xl p-8 sm:p-10 relative overflow-hidden"
        >
          {/* Glow */}
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-teal/5 blur-3xl pointer-events-none" />

          {submitted ? (
            <div className="flex flex-col items-center justify-center py-8 text-center relative">
              <div className="h-14 w-14 rounded-full bg-teal/15 grid place-items-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-teal">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <p className="font-heading text-xl text-text-primary">Message Sent</p>
              <p className="text-sm text-text-muted mt-2">We&apos;ll be in touch within 24 hours.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
              className="space-y-4 relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-text-secondary mb-1.5">Name</label>
                  <input
                    type="text"
                    required
                    className="w-full rounded-xl bg-surface-elevated border border-surface-elevated px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-teal/40 focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-text-secondary mb-1.5">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full rounded-xl bg-surface-elevated border border-surface-elevated px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-teal/40 focus:outline-none transition-colors"
                    placeholder="you@company.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-text-secondary mb-1.5">Message</label>
                <textarea
                  rows={4}
                  required
                  className="w-full rounded-xl bg-surface-elevated border border-surface-elevated px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-teal/40 focus:outline-none transition-colors resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>
              <button
                type="submit"
                className="btn-magnetic w-full rounded-xl bg-teal py-3.5 text-sm font-semibold text-navy"
              >
                Send Message
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
