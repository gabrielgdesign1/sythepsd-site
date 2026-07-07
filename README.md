# Sythe — Portfolio Website

A premium, animated portfolio for **Sythe**, a graphic designer from Romania specializing in
Fortnite thumbnails, IRL content, banners, posters and 3D designs.

## Stack

- **Vite + React + TypeScript**
- **Tailwind CSS** — custom purple "laboratory liquid" design system
- **Three.js** — custom GLSL noise-displaced liquid blob + particle field in the hero
- **GSAP + ScrollTrigger** — load-in timelines, scroll-scrubbed parallax, reveal-on-scroll
- **Lenis** — smooth scrolling
- Fully responsive, with `prefers-reduced-motion` and mobile performance fallbacks

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build      # outputs to /dist
npm run preview    # preview the production build
```

## Assets

Source thumbnails/logo were optimized to WebP via `scripts/optimize-images.mjs`
(originals live outside this repo). Optimized files are in `public/`.

## Deploy (Vercel)

This repo is Vercel-ready (`vercel.json` sets the Vite framework preset).

- Framework preset: **Vite**
- Build command: `npm run build`
- Output directory: `dist`

Import the repo at https://vercel.com/new and deploy — no environment variables required.
