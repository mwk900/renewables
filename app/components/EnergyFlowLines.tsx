'use client';

import { useEffect, useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function EnergyFlowLines() {
  const { ref, isVisible } = useScrollReveal(0.1);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!isVisible || !svgRef.current) return;
    const paths = svgRef.current.querySelectorAll('.energy-path');
    paths.forEach((path, i) => {
      const el = path as SVGPathElement;
      const length = el.getTotalLength();
      el.style.strokeDasharray = `${length}`;
      el.style.strokeDashoffset = `${length}`;
      el.style.animation = `energyDash 2.5s ease-out ${i * 0.3}s forwards`;
    });
  }, [isVisible]);

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          className="energy-path"
          d="M0 200 Q360 100 720 200 T1440 200"
          stroke="url(#energy-grad-1)"
          strokeWidth="1.5"
          opacity={isVisible ? 0.6 : 0}
        />
        <path
          className="energy-path"
          d="M0 250 Q400 150 800 250 T1440 220"
          stroke="url(#energy-grad-2)"
          strokeWidth="1"
          opacity={isVisible ? 0.4 : 0}
        />
        <path
          className="energy-path"
          d="M0 150 Q300 250 700 150 T1440 180"
          stroke="url(#energy-grad-1)"
          strokeWidth="1"
          opacity={isVisible ? 0.3 : 0}
        />

        {/* Animated dots traveling along paths */}
        {isVisible && (
          <>
            <circle r="3" fill="#00d4a1" opacity="0.8">
              <animateMotion
                dur="4s"
                repeatCount="indefinite"
                path="M0 200 Q360 100 720 200 T1440 200"
              />
            </circle>
            <circle r="2" fill="#f59e0b" opacity="0.6">
              <animateMotion
                dur="5s"
                repeatCount="indefinite"
                path="M0 250 Q400 150 800 250 T1440 220"
                begin="1s"
              />
            </circle>
            <circle r="2.5" fill="#00d4a1" opacity="0.5">
              <animateMotion
                dur="6s"
                repeatCount="indefinite"
                path="M0 150 Q300 250 700 150 T1440 180"
                begin="2s"
              />
            </circle>
          </>
        )}

        <defs>
          <linearGradient id="energy-grad-1" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00d4a1" stopOpacity="0" />
            <stop offset="30%" stopColor="#00d4a1" stopOpacity="1" />
            <stop offset="70%" stopColor="#00d4a1" stopOpacity="1" />
            <stop offset="100%" stopColor="#00d4a1" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="energy-grad-2" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0" />
            <stop offset="40%" stopColor="#f59e0b" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
