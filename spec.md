# Exquisitor

## Current State
Full-stack boutique IT staffing site with five pages (Home, Partners, Associates, Our DNA, The Standards), a sliding Contact drawer, and an Admin Dashboard. Backend is Motoko on ICP. Frontend uses React + TanStack Router + Supabase for auth/database/storage. All pages are eagerly loaded — no code splitting. Hero background is a `.jpg`. `InternetIdentityProvider` is still wrapping the app in `main.tsx` despite II auth being removed. `react-icons` is installed but unused. Vite build has `minify: false`. The `onAuthStateChange` listener fires synchronously on mount, blocking the critical render path.

## Requested Changes (Diff)

### Add
- Route-level code splitting via `React.lazy()` for: PartnersPage, AssociatesPage, AdminPage, OurDnaPage, TheStandardsPage
- Pulsing silver "E" Suspense fallback on `#050505` background shown during lazy-chunk download
- Hero image in `.webp` format replacing the `.jpg`
- `<link rel="preload" fetchpriority="high">` in `index.html` for the hero `.webp`
- Vite manual chunk splitting (`rollupOptions.output.manualChunks`) to isolate vendor bundles
- `minify: true` (esbuild) in vite.config.js

### Modify
- `main.tsx` — remove `InternetIdentityProvider` wrapper entirely (provider is still there, unused)
- `App.tsx` — lazy-load all non-home routes; wrap `<Outlet>` in `<Suspense fallback={<RouteLoadingFallback />}>`; defer `onAuthStateChange` listener via `requestIdleCallback` / `setTimeout(0)`
- `vite.config.js` — enable minification, add `rollupOptions` for vendor chunk splitting
- `index.html` — add hero preload link, set descriptive `<title>`
- `HomePage.tsx` — update hero `backgroundImage` to reference `.webp` file

### Remove
- `react-icons` from `package.json` dependencies (unused, ~2 MB)

## Implementation Plan
1. Write spec.md (this file)
2. Remove `InternetIdentityProvider` import + wrapper from `main.tsx`
3. Update `index.html`: add `<title>Exquisitor</title>` + `<link rel="preload">` for hero `.webp`
4. Update `vite.config.js`: set `minify: 'esbuild'`, add `rollupOptions.output.manualChunks` splitting react/radix/supabase into separate vendor chunks
5. Generate hero `.webp` (1920×1080, compressed)
6. Update `HomePage.tsx` hero `backgroundImage` to use `.webp` path
7. Update `App.tsx`: lazy-load all non-home routes, add `RouteLoadingFallback` pulsing E component, defer auth listener with `requestIdleCallback`
8. Remove `react-icons` from `package.json`
9. Build, typecheck, deploy
