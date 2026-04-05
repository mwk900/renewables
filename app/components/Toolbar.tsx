'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';

const THEME_EVENT = 'themechange';

function subscribe(callback: () => void) {
  if (typeof window === 'undefined') {
    return () => {};
  }

  window.addEventListener('storage', callback);
  window.addEventListener(THEME_EVENT, callback);

  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(THEME_EVENT, callback);
  };
}

function getThemeSnapshot() {
  if (typeof window === 'undefined') {
    return true;
  }

  return localStorage.getItem('theme') !== 'light';
}

export default function Toolbar() {
  const dark = useSyncExternalStore(subscribe, getThemeSnapshot, () => true);
  const [progress, setProgress] = useState(0);
  const [hovering, setHovering] = useState(false);

  /* ── Theme toggle ── */
  useEffect(() => {
    document.documentElement.classList.toggle('light', !dark);
  }, [dark]);

  const toggle = () => {
    const next = !dark;
    document.documentElement.classList.toggle('light', !next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
    window.dispatchEvent(new Event(THEME_EVENT));
  };

  /* ── Scroll progress ── */
  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Theme toggle */}
      <button
        onClick={toggle}
        className="group h-11 w-11 rounded-full glass-strong grid place-items-center shadow-lg shadow-black/20 hover:scale-105 active:scale-95 transition-transform"
        aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {dark ? (
          /* Sun icon */
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber">
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        ) : (
          /* Moon icon */
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal">
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
          </svg>
        )}
      </button>

      {/* Scroll progress / back to top */}
      <button
        onClick={scrollToTop}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        className="group relative h-11 rounded-full glass-strong shadow-lg shadow-black/20 flex items-center overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
        style={{ width: hovering ? '120px' : '56px' }}
        aria-label="Scroll progress"
      >
        {/* Background fill showing progress */}
        <div
          className="absolute inset-0 rounded-full bg-teal/10 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />

        {/* Content */}
        <div className="relative w-full flex items-center justify-center px-3">
          {hovering ? (
            <span className="flex items-center gap-1.5 text-xs font-semibold text-teal whitespace-nowrap">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
              Back to top
            </span>
          ) : (
            <span className="text-xs font-bold text-teal tabular-nums">
              {progress}%
            </span>
          )}
        </div>
      </button>
    </div>
  );
}
