'use client';

import { useRef, useState, useCallback } from 'react';

interface TiltValues {
  rotateX: number;
  rotateY: number;
  scale: number;
}

export function useTilt(maxTilt = 8) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<TiltValues>({ rotateX: 0, rotateY: 0, scale: 1 });

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setTilt({
        rotateX: -y * maxTilt,
        rotateY: x * maxTilt,
        scale: 1.02,
      });
    },
    [maxTilt]
  );

  const onMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0, scale: 1 });
  }, []);

  return { ref, tilt, onMouseMove, onMouseLeave };
}
