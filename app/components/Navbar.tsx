'use client';

import { useState, useEffect } from 'react';
import { navLinks } from '../data/content';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* ── Floating brand stamp (top-left) ── */}
      <a
        href="#"
        className={`fixed top-[4.75rem] left-1/2 z-40 -translate-x-1/2 transition-opacity duration-300 sm:top-5 sm:left-6 sm:z-50 sm:translate-x-0 ${
          scrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <span className="font-heading text-lg text-text-primary tracking-tight">
          meridian
        </span>
      </a>

      {/* ── Centered floating pill nav ── */}
      <nav
        className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
          scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <ul className="flex items-center gap-1 glass-strong rounded-full px-2 py-1.5 shadow-lg shadow-black/20">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="block rounded-full px-4 py-1.5 text-sm font-medium text-text-secondary hover:text-teal hover:bg-teal/5 transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── Sticky bottom "Get in Touch" ── */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <a
          href="#contact"
          className="btn-magnetic inline-flex items-center gap-2 glass-strong rounded-full px-6 py-3 text-sm font-semibold text-teal shadow-lg shadow-black/20 hover:shadow-teal/10 transition-shadow"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-teal"
          >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <path d="M22 6l-10 7L2 6" />
          </svg>
          Get in Touch
        </a>
      </div>
    </>
  );
}
