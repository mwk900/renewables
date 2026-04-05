'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMouseParallax } from '../hooks/useMouseParallax';
import { useAnimatedCounter, formatNumber } from '../hooks/useAnimatedCounter';
import ParticleField from './ParticleField';

/* ── Stat counter ── */
function BigStat({
  value,
  suffix,
  label,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}) {
  const [active, setActive] = useState(false);
  const count = useAnimatedCounter(value, 2400, active);

  useEffect(() => {
    const t = setTimeout(() => setActive(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay / 1000, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="text-center"
    >
      <p className="font-heading text-5xl sm:text-6xl lg:text-7xl text-teal tabular-nums leading-none">
        {formatNumber(count)}
        <span className="text-2xl sm:text-3xl ml-1 text-teal/80">{suffix}</span>
      </p>
      <p className="text-xs sm:text-sm text-text-secondary mt-2 uppercase tracking-widest">{label}</p>
    </motion.div>
  );
}

/* ── Single offshore turbine ── */
function OffshoreT({
  x,
  waterY,
  hubY,
  bladeLen,
  speed,
  opacity,
  scale,
}: {
  x: number;
  waterY: number;
  hubY: number;
  bladeLen: number;
  speed: number;
  opacity: number;
  scale: number;
}) {
  return (
    <g opacity={opacity} transform={`translate(${x}, 0) scale(${scale})`}>
      {/* Tower */}
      <line
        x1={0} y1={hubY} x2={0} y2={waterY}
        stroke="var(--hero-turbine-tower)"
        strokeWidth={2.5 / scale}
      />
      {/* Platform base */}
      <rect
        x={-4 / scale} y={waterY - 3} width={8 / scale} height={6}
        rx={1}
        fill="var(--hero-turbine-base)"
      />
      {/* Nacelle */}
      <rect
        x={-6 / scale} y={hubY - 3} width={14 / scale} height={6}
        rx={2}
        fill="var(--hero-turbine-body)"
      />
      {/* Hub */}
      <circle cx={0} cy={hubY} r={3 / scale} fill="var(--hero-turbine-blade)" />
      {/* Blades */}
      <g style={{ transformOrigin: `0px ${hubY}px`, animation: `bladeSpin ${speed}s linear infinite` }}>
        <line x1={0} y1={hubY} x2={0} y2={hubY - bladeLen} stroke="var(--hero-turbine-blade)" strokeWidth={1.8 / scale} strokeLinecap="round" />
        <line x1={0} y1={hubY} x2={bladeLen * 0.866} y2={hubY + bladeLen * 0.5} stroke="var(--hero-turbine-blade)" strokeWidth={1.8 / scale} strokeLinecap="round" />
        <line x1={0} y1={hubY} x2={-bladeLen * 0.866} y2={hubY + bladeLen * 0.5} stroke="var(--hero-turbine-blade)" strokeWidth={1.8 / scale} strokeLinecap="round" />
      </g>
    </g>
  );
}

/* ── Full offshore windfarm scene ── */
function OffshoreScene({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const turbines = [
    // Far row (small, slow, faint)
    { x: 180, waterY: 320, hubY: 230, towerH: 90, bladeLen: 40, speed: 22, opacity: 0.25, scale: 0.7, depth: 0.3 },
    { x: 320, waterY: 315, hubY: 225, towerH: 90, bladeLen: 42, speed: 24, opacity: 0.22, scale: 0.68, depth: 0.3 },
    { x: 480, waterY: 318, hubY: 228, towerH: 90, bladeLen: 38, speed: 20, opacity: 0.2, scale: 0.65, depth: 0.3 },
    { x: 620, waterY: 316, hubY: 226, towerH: 90, bladeLen: 41, speed: 23, opacity: 0.23, scale: 0.7, depth: 0.3 },
    { x: 760, waterY: 319, hubY: 229, towerH: 90, bladeLen: 39, speed: 21, opacity: 0.2, scale: 0.66, depth: 0.3 },
    // Mid row
    { x: 140, waterY: 370, hubY: 250, towerH: 120, bladeLen: 55, speed: 18, opacity: 0.45, scale: 0.85, depth: 0.6 },
    { x: 350, waterY: 365, hubY: 245, towerH: 120, bladeLen: 58, speed: 16, opacity: 0.5, scale: 0.88, depth: 0.6 },
    { x: 560, waterY: 368, hubY: 248, towerH: 120, bladeLen: 54, speed: 19, opacity: 0.42, scale: 0.83, depth: 0.6 },
    { x: 720, waterY: 366, hubY: 246, towerH: 120, bladeLen: 56, speed: 17, opacity: 0.48, scale: 0.86, depth: 0.6 },
    // Near row (big, prominent)
    { x: 230, waterY: 440, hubY: 275, towerH: 165, bladeLen: 80, speed: 14, opacity: 0.7, scale: 1, depth: 1 },
    { x: 500, waterY: 435, hubY: 270, towerH: 165, bladeLen: 85, speed: 12, opacity: 0.75, scale: 1, depth: 1 },
    { x: 800, waterY: 438, hubY: 272, towerH: 165, bladeLen: 78, speed: 15, opacity: 0.65, scale: 1, depth: 1 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg
        viewBox="0 0 960 540"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Sky gradient */}
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--hero-sky-top)" />
            <stop offset="40%" stopColor="var(--hero-sky-mid)" />
            <stop offset="68%" stopColor="var(--hero-sky-horizon)" />
            <stop offset="100%" stopColor="var(--hero-sky-bottom)" />
          </linearGradient>
          <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--hero-sea-top)" />
            <stop offset="50%" stopColor="var(--hero-sea-mid)" />
            <stop offset="100%" stopColor="var(--hero-sea-bottom)" />
          </linearGradient>
          {/* Horizon glow */}
          <radialGradient id="horizon-glow" cx="0.5" cy="0.58" rx="0.5" ry="0.15">
            <stop offset="0%" stopColor="var(--hero-horizon-core)" />
            <stop offset="60%" stopColor="var(--hero-horizon-fade)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <radialGradient id="sun-glow" cx="0.7" cy="0.52" rx="0.12" ry="0.08">
            <stop offset="0%" stopColor="var(--hero-sun-core)" />
            <stop offset="100%" stopColor="var(--hero-sun-fade)" />
          </radialGradient>
        </defs>

        {/* Sky */}
        <rect width="960" height="540" fill="url(#sky)" />

        {/* Horizon glow */}
        <rect width="960" height="540" fill="url(#horizon-glow)" />
        <rect width="960" height="540" fill="url(#sun-glow)" />

        {/* Horizon line */}
        <line x1="0" y1="310" x2="960" y2="310" stroke="var(--hero-horizon-line)" strokeWidth="0.5" />

        {/* Sea */}
        <rect x="0" y="310" width="960" height="230" fill="url(#sea)" />

        {/* Sea shimmer lines */}
        {[330, 360, 395, 430, 465, 500].map((y, i) => (
          <line
            key={y}
            x1={80 + i * 30}
            y1={y}
            x2={880 - i * 30}
            y2={y}
            stroke="var(--hero-wave-line)"
            strokeWidth="0.3"
            strokeDasharray={`${20 + i * 10} ${40 + i * 15}`}
          >
            <animate
              attributeName="x1"
              values={`${80 + i * 30};${60 + i * 30};${80 + i * 30}`}
              dur={`${6 + i}s`}
              repeatCount="indefinite"
            />
          </line>
        ))}

        {/* Wave highlights */}
        {[340, 375, 410, 450, 490].map((y, i) => (
          <path
            key={`wave-${y}`}
            d={`M${100 + i * 50} ${y} Q${300 + i * 20} ${y - 2} ${500 + i * 30} ${y} Q${700 - i * 10} ${y + 2} ${900 - i * 40} ${y}`}
            stroke="var(--hero-wave-highlight)"
            strokeWidth="0.4"
            fill="none"
          >
            <animate
              attributeName="d"
              values={`M${100 + i * 50} ${y} Q${300 + i * 20} ${y - 2} ${500 + i * 30} ${y} Q${700 - i * 10} ${y + 2} ${900 - i * 40} ${y};M${100 + i * 50} ${y} Q${300 + i * 20} ${y + 2} ${500 + i * 30} ${y} Q${700 - i * 10} ${y - 2} ${900 - i * 40} ${y};M${100 + i * 50} ${y} Q${300 + i * 20} ${y - 2} ${500 + i * 30} ${y} Q${700 - i * 10} ${y + 2} ${900 - i * 40} ${y}`}
              dur={`${8 + i * 2}s`}
              repeatCount="indefinite"
            />
          </path>
        ))}

        {/* Turbines — parallax groups */}
        {turbines.map((t, i) => (
          <g
            key={i}
            style={{
              transform: `translateX(${mouseX * t.depth * -12}px) translateY(${mouseY * t.depth * -4}px)`,
              transition: 'transform 0.4s ease-out',
            }}
          >
            <OffshoreT {...t} />
          </g>
        ))}

        {/* Reflections in water (subtle vertical lines under near turbines) */}
        {turbines.slice(9).map((t, i) => (
          <line
            key={`ref-${i}`}
            x1={t.x} y1={t.waterY + 5} x2={t.x} y2={t.waterY + 60}
            stroke="var(--hero-reflection)"
            strokeWidth={1.5}
            strokeDasharray="3 6"
          />
        ))}
      </svg>
    </div>
  );
}

export default function Hero() {
  const mouse = useMouseParallax();

  return (
    <section className="hero-section relative h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Offshore windfarm scene */}
      <OffshoreScene mouseX={mouse.normalizedX} mouseY={mouse.normalizedY} />

      {/* Particle overlay */}
      <ParticleField />

      <div className="hero-scene-overlay absolute inset-0 pointer-events-none" />

      {/* ── Content ── */}
      <div className="relative z-10 px-6 w-full max-w-5xl">
        <div className="hero-copy-shell mx-auto w-full max-w-4xl flex flex-col items-center text-center rounded-[2rem] px-6 py-8 sm:px-10 sm:py-12">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="hero-badge inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-teal animate-pulse-glow" />
            <span className="text-xs font-medium text-teal tracking-widest uppercase">
              Renewable Energy Developer
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="hero-title font-heading text-5xl sm:text-7xl lg:text-8xl leading-[0.95] text-text-primary"
          >
            Powering Britain&apos;s{' '}
            <span className="relative inline-block">
              <span className="text-teal">Clean</span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-teal to-teal/20 rounded-full origin-left"
              />
            </span>
            <br />
            Energy Future
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-6 max-w-2xl text-text-secondary text-sm sm:text-base tracking-[0.18em] uppercase"
          >
            Solar &middot; Wind &middot; Battery Storage
          </motion.p>

          {/* Stat counters */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="mt-14 sm:mt-16 grid grid-cols-3 gap-8 sm:gap-16 w-full max-w-3xl"
          >
            <BigStat value={847} suffix="MW" label="Capacity" delay={1500} />
            <BigStat value={34} suffix="+" label="Projects" delay={1700} />
            <BigStat value={412} suffix="k" label="tCO₂ Avoided" delay={1900} />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-text-muted/30 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-teal/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
