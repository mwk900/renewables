# Meridian Energy Solutions - Portfolio Project

## Commands
- `npm run dev` - Start development server
- `npm run build` - Production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Tech Stack
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Framer Motion

## Architecture
- Single-page application with no routing beyond `/`
- All content data in `app/data/content.ts`
- Components in `app/components/`
- Custom hooks in `app/hooks/`
- Dark/light theme toggle via `html.light` class

## Code Style
- No comments in code
- Follow existing component patterns
- Use `useScrollReveal` hook for scroll-triggered animations
- Use `useAnimatedCounter` for number animations
- Glass morphism via `.glass` / `.glass-strong` CSS classes
- All styling via Tailwind utility classes + CSS custom properties in `globals.css`
