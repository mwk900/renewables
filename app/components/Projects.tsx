'use client';

import { motion } from 'framer-motion';
import { projects } from '../data/content';
import { useScrollReveal } from '../hooks/useScrollReveal';

/* ── Accent color per technology ── */
function techAccent(tech: string) {
  if (tech.includes('Solar') && tech.includes('BESS')) return { color: '#00d4a1', glow: 'rgba(0,212,161,0.12)' };
  if (tech.includes('Solar')) return { color: '#f59e0b', glow: 'rgba(245,158,11,0.12)' };
  if (tech.includes('Wind')) return { color: '#38bdf8', glow: 'rgba(56,189,248,0.12)' };
  if (tech.includes('BESS')) return { color: '#a855f7', glow: 'rgba(168,85,247,0.12)' };
  return { color: '#00d4a1', glow: 'rgba(0,212,161,0.12)' };
}

/* ── Animated tech icon ── */
function TechIcon({ tech, accent }: { tech: string; accent: string }) {
  if (tech.includes('Solar') && !tech.includes('BESS'))
    return (
      <svg viewBox="0 0 160 160" className="w-full h-full" fill="none">
        <circle cx="80" cy="80" r="28" stroke={accent} strokeWidth="1.5" strokeOpacity="0.6" />
        <circle cx="80" cy="80" r="20" fill={accent} fillOpacity="0.08" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
          const r = (a * Math.PI) / 180;
          return (
            <line
              key={a}
              x1={80 + Math.cos(r) * 36}
              y1={80 + Math.sin(r) * 36}
              x2={80 + Math.cos(r) * 55}
              y2={80 + Math.sin(r) * 55}
              stroke={accent}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeOpacity="0.4"
            />
          );
        })}
        <circle cx="80" cy="80" r="50" fill="url(#proj-sol-glow)" />
        <defs>
          <radialGradient id="proj-sol-glow">
            <stop offset="0%" stopColor={accent} stopOpacity="0.15" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    );

  if (tech.includes('Wind'))
    return (
      <svg viewBox="0 0 160 160" className="w-full h-full" fill="none">
        <circle cx="80" cy="80" r="8" fill={accent} fillOpacity="0.2" stroke={accent} strokeWidth="1" strokeOpacity="0.4" />
        <g style={{ transformOrigin: '80px 80px', animation: 'bladeSpin 10s linear infinite' }}>
          <path d="M80 80 Q76 52 80 18 Q84 52 80 80" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1" strokeOpacity="0.5" />
          <path d="M80 80 Q106 96 124 140 Q98 106 80 80" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1" strokeOpacity="0.5" />
          <path d="M80 80 Q54 96 36 140 Q62 106 80 80" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1" strokeOpacity="0.5" />
        </g>
        <circle cx="80" cy="80" r="45" fill="url(#proj-wind-glow)" />
        <defs>
          <radialGradient id="proj-wind-glow">
            <stop offset="0%" stopColor={accent} stopOpacity="0.1" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    );

  // BESS / hybrid
  return (
    <svg viewBox="0 0 160 160" className="w-full h-full" fill="none">
      <rect x="48" y="35" width="64" height="90" rx="14" stroke={accent} strokeWidth="1.5" strokeOpacity="0.5" fill={accent} fillOpacity="0.04" />
      <rect x="62" y="26" width="36" height="14" rx="5" fill={accent} fillOpacity="0.12" />
      <path d="M68 78 L80 58 L80 78 L92 78 L80 98 L80 78 Z" fill={accent} fillOpacity="0.15" stroke={accent} strokeWidth="1" strokeOpacity="0.5" />
      {/* Animated charge bar */}
      <rect x="58" y="108" width="44" height="4" rx="2" fill={accent} fillOpacity="0.08" />
      <rect x="58" y="108" rx="2" height="4" fill={accent} fillOpacity="0.3">
        <animate attributeName="width" values="8;44;8" dur="3s" repeatCount="indefinite" />
      </rect>
      <circle cx="80" cy="75" r="45" fill="url(#proj-bess-glow)" />
      <defs>
        <radialGradient id="proj-bess-glow">
          <stop offset="0%" stopColor={accent} stopOpacity="0.1" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

function ProjectRow({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const { ref, isVisible } = useScrollReveal(0.15);
  const isEven = index % 2 === 0;
  const { color, glow } = techAccent(project.technology);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="project-card group relative isolate rounded-3xl overflow-hidden"
      style={{
        borderColor: `${color}24`,
      }}
    >
      <div
        className="project-card-bg absolute inset-0 transition-transform duration-700 group-hover:scale-[1.02]"
        style={{ background: project.gradient }}
      />

      <div className="project-card-overlay absolute inset-0 pointer-events-none" />

      {/* Hover glow overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at ${isEven ? '30%' : '70%'} 50%, ${glow} 0%, transparent 60%)` }}
      />

      <div className={`relative z-10 grid md:grid-cols-2 min-h-[340px] sm:min-h-[400px]`}>
        {/* Visual side */}
        <div className={`relative flex items-center justify-center p-10 sm:p-14 ${isEven ? '' : 'md:order-2'}`}>
          <div className="project-card-icon w-44 h-44 sm:w-56 sm:h-56 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700">
            <TechIcon tech={project.technology} accent={color} />
          </div>
        </div>

        {/* Content side */}
        <div className={`relative flex flex-col justify-center p-8 sm:p-12 ${isEven ? '' : 'md:order-1'}`}>
          {/* Tech pill */}
          <span
            className="project-card-pill inline-flex self-start items-center rounded-full px-3 py-1 text-xs uppercase tracking-[0.15em] font-medium mb-5 border"
            style={{ borderColor: `${color}4d`, backgroundColor: `${color}1c` }}
          >
            {project.technology}
          </span>

          <h3 className="project-card-title font-heading text-2xl sm:text-3xl mb-2">
            {project.name}
          </h3>

          <p className="project-card-meta text-sm mb-4">
            {project.location} &middot; {project.year}
          </p>

          {/* Big capacity number */}
          <p className="project-card-capacity font-heading text-4xl sm:text-5xl leading-none mb-5">
            {project.capacity}
          </p>

          <p className="project-card-copy text-sm leading-relaxed max-w-md">
            {project.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section id="projects" className="py-16 sm:py-24" ref={ref}>
      <div className="mx-auto max-w-6xl px-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center text-sm uppercase tracking-[0.2em] text-text-muted mb-12 sm:mb-16"
        >
          Portfolio
        </motion.p>

        <div className="space-y-6 sm:space-y-8">
          {projects.map((project, i) => (
            <ProjectRow key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
