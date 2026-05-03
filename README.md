# Meridian Energy Solutions

A portfolio project by [NorthSummit.agency](https://northsummit.agency) showcasing a fictional UK renewable energy developer. Built as a single-page showcase of front-end development capabilities.

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** (scroll-triggered animations)
- **React 19**

## Features

- Full-viewport animated hero with offshore windfarm SVG scene and parallax
- Interactive UK coverage map with country-level project data
- Animated impact statistics with scroll-triggered counters
- Five-step development timeline (Process section)
- Energy impact calculator (Solar / Wind / BESS)
- Auto-scrolling testimonials marquee with pause control
- Dark/light theme toggle with full CSS custom property theming
- Glass morphism UI components
- Custom cursor effect (desktop)
- Reduced motion support via `prefers-reduced-motion`
- Responsive across all breakpoints

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Project Structure

```
app/
├── layout.tsx          Root layout, metadata, JSON-LD
├── page.tsx            Homepage (composes all sections)
├── globals.css         Design tokens, themes, keyframes, utilities
├── components/         All UI components
├── hooks/              Custom React hooks
└── data/
    └── content.ts      All site content and types
```

## License

Portfolio project. All content is fictional.
