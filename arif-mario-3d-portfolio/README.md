# Arif Kurniawan — 3D World Portfolio

Interactive single-page portfolio inspired by *Super Mario 3D World / Super Mario Odyssey* (bright 3D toon low-poly aesthetic with 100% original procedural Three.js models) designed for fast recruiter readability alongside playful game-like exploration.

## Tech Stack
- **Vite + React + TypeScript**
- **Three.js** via `@react-three/fiber` & `@react-three/drei` (100% procedural toon primitives — zero external `.glb` assets needed)
- **GSAP + ScrollTrigger** (scroll-driven 3D camera & AK character track progression)
- **Framer Motion** (snappy UI card pops, coin bursts, warp pipe transitions)
- **Tailwind CSS** (game HUD & responsive WCAG AA layout)
- **Web Audio API** (optional procedural retro SFX, muted by default)

## Features
- **Original "AK" 3D Toon Character**: Low-poly red cap hero with `"AK"` emblem walking, running, and jumping along an elevated 3D grass/brick world.
- **Interactive Game Elements**:
  - `PRESS START` title intro with camera zoom-out from a green warp pipe
  - 3 hittable `?` blocks in **World 1-1 (Services)** with coin bursts
  - 10 spinning collectible coins in **World 1-2 (Skills & Tech Stack)** with tooltips & HUD counter
  - 4 chronological career levels (**Level 1-1** to **Level 1-4 Final/Castle**) ending with finish flags
  - **Goal Pole & Castle** contact finale
  - **Keyboard Controls (Desktop)**: `← →` or `A D` to run, `Space` to jump
  - **Easter Egg**: Enter the Konami Code (`↑ ↑ ↓ ↓ ← → ← → B A`) for **Star Power!**
- **Accessibility & Performance**:
  - All portfolio data rendered as real semantic HTML (SEO + screen readers + `<30s` recruiter scan via `"Skip Intro"` / `"Skip to Content"`)
  - Automatic & manual **Classic 2D Mode** (zero WebGL) for low-end GPUs or `prefers-reduced-motion`
  - Lazy-loaded 3D scene (`React.lazy` + code splitting) & mobile DPR/geometry reduction

## Quick Start

```bash
npm install
npm run dev
```

## Production Build & Deploy
Ready for **Vercel** (`vercel.json`) and **Netlify** (`netlify.toml`):

```bash
npm run build
npm run preview
```

## Easy Content Editing
All portfolio copy, stats (including the `Projects Delivered` placeholder), services, skills, experience levels, and contact links live in:
`src/data/portfolio.ts`
