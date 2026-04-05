'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show on desktop with pointer
    const mq = window.matchMedia('(pointer: fine)');
    if (!mq.matches) return;

    const onMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const onEnter = () => setVisible(true);
    const onLeave = () => setVisible(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mouseleave', onLeave);

    // Detect hovering on interactive elements
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [role="button"], input, textarea, select');
      setHovering(!!interactive);
    };
    document.addEventListener('mouseover', onOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseover', onOver);
    };
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-screen hidden lg:block"
      animate={{
        x: position.x - (hovering ? 20 : 12),
        y: position.y - (hovering ? 20 : 12),
        width: hovering ? 40 : 24,
        height: hovering ? 40 : 24,
        opacity: visible ? 1 : 0,
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 30, mass: 0.3 }}
    >
      <div
        className="w-full h-full rounded-full transition-colors duration-200"
        style={{
          background: hovering
            ? 'radial-gradient(circle, rgba(0,212,161,0.25) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(0,212,161,0.15) 0%, transparent 70%)',
          boxShadow: hovering
            ? '0 0 20px rgba(0,212,161,0.15)'
            : '0 0 10px rgba(0,212,161,0.08)',
        }}
      />
    </motion.div>
  );
}
