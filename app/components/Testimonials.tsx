'use client';

import { motion } from 'framer-motion';
import { testimonials } from '../data/content';
import { useScrollReveal } from '../hooks/useScrollReveal';

/* Build a doubled list for seamless loop */
const items = [...testimonials, ...testimonials];

export default function Testimonials() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section ref={ref} className="py-16 sm:py-24 overflow-hidden">
      <motion.p
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center text-sm uppercase tracking-[0.2em] text-text-muted mb-10 sm:mb-14 px-6"
      >
        What partners say
      </motion.p>

      {/* ── Marquee ribbon ── */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-navy to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-navy to-transparent z-10 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex gap-6 sm:gap-8"
          style={{
            animation: isVisible ? 'marquee 60s linear infinite' : 'none',
            width: 'max-content',
          }}
        >
          {items.map((t, i) => (
            <div
              key={`${t.id}-${i}`}
              className="flex-none w-[380px] sm:w-[440px] glass rounded-2xl px-6 py-5 flex flex-col justify-between"
            >
              <p className="text-sm text-text-primary/85 leading-relaxed italic line-clamp-3">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-2">
                <div className="h-7 w-7 rounded-full bg-surface-elevated grid place-items-center text-[9px] font-bold text-teal flex-none">
                  {t.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-xs font-medium text-text-primary">{t.author}</p>
                  <p className="text-xs text-text-secondary">{t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
