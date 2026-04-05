'use client';

import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useAnimatedCounter, formatNumber } from '../hooks/useAnimatedCounter';
import EnergyFlowLines from './EnergyFlowLines';

const impactStats = [
  { value: 847, suffix: 'MW', label: 'Installed Capacity' },
  { value: 412, suffix: 'k tCO₂', label: 'Emissions Avoided' },
  { value: 12, suffix: '', label: 'Counties' },
  { value: 34, suffix: '', label: 'Projects' },
];

function ImpactNumber({
  value,
  suffix,
  label,
  active,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  active: boolean;
  index: number;
}) {
  const count = useAnimatedCounter(value, 2400, active);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.2,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="text-center"
    >
      <p className="font-heading text-6xl sm:text-7xl lg:text-8xl text-text-primary leading-none tabular-nums">
        {formatNumber(count)}
        {suffix && <span className="text-3xl sm:text-4xl ml-2 text-teal/90">{suffix}</span>}
      </p>
      <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-text-secondary mt-3">
        {label}
      </p>
    </motion.div>
  );
}

export default function Stats() {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <section ref={ref} className="relative py-32 sm:py-44 overflow-hidden">
      {/* Energy flow lines behind */}
      <EnergyFlowLines />

      {/* Subtle center glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-teal/[0.03] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center text-sm uppercase tracking-[0.2em] text-text-muted mb-16 sm:mb-20"
        >
          Impact
        </motion.p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-16">
          {impactStats.map((stat, i) => (
            <ImpactNumber
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              active={isVisible}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
