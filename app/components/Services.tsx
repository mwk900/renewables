'use client';

import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { services } from '../data/content';

const panelConfig = [
  {
    gradient: 'from-amber/10 via-transparent to-transparent',
    accentColor: '#f59e0b',
    icon: (
      <svg viewBox="0 0 120 120" className="w-full h-full" aria-hidden="true">
        <circle cx="60" cy="60" r="20" stroke="#f59e0b" strokeWidth="1.5" fill="rgba(245,158,11,0.08)" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <line
              key={angle}
              x1={60 + Math.cos(rad) * 28}
              y1={60 + Math.sin(rad) * 28}
              x2={60 + Math.cos(rad) * 42}
              y2={60 + Math.sin(rad) * 42}
              stroke="#f59e0b"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeOpacity="0.5"
            />
          );
        })}
        <circle cx="60" cy="60" r="30" fill="url(#solar-glow)" />
        <defs>
          <radialGradient id="solar-glow">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    ),
  },
  {
    gradient: 'from-teal/10 via-transparent to-transparent',
    accentColor: '#00d4a1',
    icon: (
      <svg viewBox="0 0 120 120" className="w-full h-full" aria-hidden="true">
        <circle cx="60" cy="60" r="6" fill="rgba(0,212,161,0.3)" stroke="#00d4a1" strokeWidth="1" />
        <g style={{ transformOrigin: '60px 60px', animation: 'bladeSpin 10s linear infinite' }}>
          <path d="M60 60 Q56 35 60 10 Q64 35 60 60" fill="rgba(0,212,161,0.08)" stroke="#00d4a1" strokeWidth="1" strokeOpacity="0.4" />
          <path d="M60 60 Q82 75 95 103 Q74 82 60 60" fill="rgba(0,212,161,0.08)" stroke="#00d4a1" strokeWidth="1" strokeOpacity="0.4" />
          <path d="M60 60 Q38 75 25 103 Q46 82 60 60" fill="rgba(0,212,161,0.08)" stroke="#00d4a1" strokeWidth="1" strokeOpacity="0.4" />
        </g>
        <circle cx="60" cy="60" r="25" fill="url(#wind-glow)" />
        <defs>
          <radialGradient id="wind-glow">
            <stop offset="0%" stopColor="#00d4a1" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#00d4a1" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    ),
  },
  {
    gradient: 'from-purple-500/10 via-transparent to-transparent',
    accentColor: '#a855f7',
    icon: (
      <svg viewBox="0 0 120 120" className="w-full h-full" aria-hidden="true">
        <rect x="35" y="25" width="50" height="70" rx="10" stroke="#a855f7" strokeWidth="1.5" fill="rgba(168,85,247,0.05)" />
        <rect x="48" y="18" width="24" height="10" rx="4" fill="rgba(168,85,247,0.15)" />
        <path d="M52 55 L60 42 L60 55 L68 55 L60 68 L60 55 Z" fill="rgba(168,85,247,0.2)" stroke="#a855f7" strokeWidth="1" strokeOpacity="0.5" />
        <rect x="44" y="72" width="32" height="3" rx="1.5" fill="rgba(168,85,247,0.08)" />
        <rect x="44" y="72" width="24" height="3" rx="1.5" fill="rgba(168,85,247,0.25)">
          <animate attributeName="width" values="8;32;8" dur="3s" repeatCount="indefinite" />
        </rect>
        <circle cx="60" cy="55" r="30" fill="url(#bess-glow)" />
        <defs>
          <radialGradient id="bess-glow">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    ),
  },
];

export default function Services() {
  const { ref, isVisible } = useScrollReveal(0.15);

  return (
    <section id="services" className="py-16 sm:py-24" ref={ref} aria-labelledby="services-heading">
      <div className="mx-auto max-w-7xl px-6">
        {/* Minimal header */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center text-sm uppercase tracking-[0.2em] text-text-muted mb-12 sm:mb-16"
          id="services-heading"
        >
          What we build
        </motion.p>

        {/* Three full-bleed panels */}
        <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service, i) => {
            const config = panelConfig[i];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: i * 0.15,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`group relative aspect-[3/4] sm:aspect-[2/3] rounded-3xl overflow-hidden border border-white/[0.04] bg-gradient-to-b ${config.gradient} cursor-default`}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity duration-500 p-16 sm:p-12">
                  {config.icon}
                </div>

                <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8">
                  <h3
                    className="font-heading text-3xl sm:text-4xl"
                    style={{ color: config.accentColor }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-xs text-text-secondary mt-2 leading-relaxed line-clamp-2">
                    {service.description}
                  </p>
                </div>

                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${config.accentColor}08 0%, transparent 70%)`,
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
