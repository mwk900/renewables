'use client';

import { useState, useEffect } from 'react';

export function useAnimatedCounter(
  target: number,
  duration = 2200,
  active = false
) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;

    let start: number | null = null;
    let raf: number;

    const step = (ts: number) => {
      if (start === null) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      /* ease-out cubic */
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, active]);

  return count;
}

export function formatNumber(n: number): string {
  return n.toLocaleString('en-GB');
}
