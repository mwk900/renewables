'use client';

import { useRef, useEffect, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
}

interface ParticlePalette {
  colors: string[];
  line: string;
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: -1000, y: -1000 });
  const raf = useRef(0);
  const palette = useRef<ParticlePalette>({
    colors: ['#00d4a1', '#00d4a1', '#f59e0b'],
    line: '#00d4a1',
  });

  const syncPalette = useCallback(() => {
    const styles = getComputedStyle(document.documentElement);
    const primary = styles.getPropertyValue('--hero-particle-primary').trim() || '#00d4a1';
    const secondary = styles.getPropertyValue('--hero-particle-secondary').trim() || '#f59e0b';
    const line = styles.getPropertyValue('--hero-particle-line').trim() || primary;

    palette.current = {
      colors: [primary, primary, secondary],
      line,
    };
  }, []);

  const initParticles = useCallback((w: number, h: number) => {
    const count = Math.min(Math.floor((w * h) / 18000), 80);
    const colors = palette.current.colors;

    particles.current = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.4 + 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    syncPalette();

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles(window.innerWidth, window.innerHeight);
    };
    resize();

    const onMouse = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('mousemove', onMouse, { passive: true });

    const observer = new MutationObserver(() => {
      syncPalette();
      initParticles(window.innerWidth, window.innerHeight);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    const w = () => window.innerWidth;
    const h = () => window.innerHeight;

    const draw = () => {
      ctx.clearRect(0, 0, w(), h());
      const ps = particles.current;

      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        // Mouse repulsion
        const dx = p.x - mouse.current.x;
        const dy = p.y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          p.vx += (dx / dist) * force * 0.08;
          p.vy += (dy / dist) * force * 0.08;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        p.vy *= 0.99;

        if (p.x < 0) p.x = w();
        if (p.x > w()) p.x = 0;
        if (p.y < 0) p.y = h();
        if (p.y > h()) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < ps.length; j++) {
          const p2 = ps[j];
          const cdx = p.x - p2.x;
          const cdy = p.y - p2.y;
          const cd = Math.sqrt(cdx * cdx + cdy * cdy);
          if (cd < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = palette.current.line;
            ctx.globalAlpha = (1 - cd / 130) * 0.08;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      raf.current = requestAnimationFrame(draw);
    };
    raf.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf.current);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
    };
  }, [initParticles, syncPalette]);

  return (
    <canvas
      ref={canvasRef}
      className="hero-particles absolute inset-0 pointer-events-none"
      style={{ willChange: 'transform' }}
    />
  );
}
