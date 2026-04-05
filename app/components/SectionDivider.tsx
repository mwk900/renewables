'use client';

import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function SectionDivider() {
  const { ref, isVisible } = useScrollReveal(0.5);

  return (
    <div ref={ref} className="relative py-4 flex items-center justify-center overflow-hidden">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isVisible ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="w-48 h-px bg-gradient-to-r from-transparent via-teal/30 to-transparent origin-center"
      />
    </div>
  );
}
