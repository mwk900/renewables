'use client';

import { useRef, useState, useCallback } from 'react';

export function useMagnetic(strength = 0.3) {
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      setOffset({
        x: (e.clientX - centerX) * strength,
        y: (e.clientY - centerY) * strength,
      });
    },
    [strength]
  );

  const onMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 });
  }, []);

  return { ref, offset, onMouseMove, onMouseLeave };
}
