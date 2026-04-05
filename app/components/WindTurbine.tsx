'use client';

import { useEffect, useRef, useState } from 'react';

export default function WindTurbine({ className = '' }: { className?: string }) {
  const [scrollSpeed, setScrollSpeed] = useState(1);
  const lastScroll = useRef(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const scrollDelta = Math.abs(window.scrollY - lastScroll.current);
      lastScroll.current = window.scrollY;
      // Increase speed based on scroll velocity, with smooth decay
      setScrollSpeed((prev) => {
        const target = 1 + Math.min(scrollDelta * 0.05, 4);
        return prev + (target - prev) * 0.1;
      });
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  const duration = Math.max(2, 10 / scrollSpeed);

  return (
    <svg
      viewBox="0 0 200 320"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Tower */}
      <path
        d="M95 130 L92 310 L108 310 L105 130"
        stroke="url(#tower-grad)"
        strokeWidth="2"
        fill="rgba(0,212,161,0.03)"
      />

      {/* Base */}
      <ellipse cx="100" cy="310" rx="20" ry="4" fill="rgba(0,212,161,0.08)" />

      {/* Nacelle */}
      <rect x="90" y="120" width="20" height="14" rx="4" fill="rgba(0,212,161,0.15)" stroke="#00d4a1" strokeWidth="1" strokeOpacity="0.3" />

      {/* Hub */}
      <circle cx="100" cy="127" r="5" fill="rgba(0,212,161,0.2)" stroke="#00d4a1" strokeWidth="1.5" strokeOpacity="0.5" />

      {/* Blades */}
      <g
        style={{
          transformOrigin: '100px 127px',
          animation: `bladeSpin ${duration}s linear infinite`,
          willChange: 'transform',
        }}
      >
        {/* Blade 1 - top */}
        <path
          d="M100 127 Q97 80 100 27 Q103 80 100 127"
          fill="rgba(0,212,161,0.12)"
          stroke="#00d4a1"
          strokeWidth="1"
          strokeOpacity="0.4"
        />
        {/* Blade 2 - bottom-right */}
        <path
          d="M100 127 Q133 150 152 195 Q125 158 100 127"
          fill="rgba(0,212,161,0.12)"
          stroke="#00d4a1"
          strokeWidth="1"
          strokeOpacity="0.4"
        />
        {/* Blade 3 - bottom-left */}
        <path
          d="M100 127 Q67 150 48 195 Q75 158 100 127"
          fill="rgba(0,212,161,0.12)"
          stroke="#00d4a1"
          strokeWidth="1"
          strokeOpacity="0.4"
        />
      </g>

      {/* Glow at hub */}
      <circle cx="100" cy="127" r="8" fill="url(#hub-glow)" />

      <defs>
        <linearGradient id="tower-grad" x1="100" y1="130" x2="100" y2="310" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00d4a1" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#00d4a1" stopOpacity="0.05" />
        </linearGradient>
        <radialGradient id="hub-glow">
          <stop offset="0%" stopColor="#00d4a1" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#00d4a1" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}
