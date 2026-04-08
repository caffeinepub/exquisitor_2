/**
 * Exquisitor — Custom Cache-First Service Worker
 *
 * Purpose: Eliminate the ICP boundary node's asset re-verification delay
 * (~8 seconds on subsequent reloads) by serving all static assets directly
 * from the browser cache on repeat visits.
 *
 * Strategy:
 *  - STATIC ASSETS (JS, CSS, images, fonts, WASM): Cache-First
 *    → First visit: fetch from network, store in cache
 *    → Repeat visits: return from cache instantly, no network round-trip,
 *      no ICP boundary node verification stall
 *  - HTML / navigation: Network-First (always fresh, so deploys propagate)
 *  - Supabase / API calls: Network-Only (never cache auth or data responses)
 *
 * Cache busting: increment CACHE_VERSION on every deploy to force a clean
 * cache install and discard stale assets from previous versions.
 */

const CACHE_VERSION = 'exquisitor-v1';

// Asset URL patterns that should be served Cache-First
const STATIC_ASSET_PATTERNS = [
  /\/assets\//,          // Vite-built chunks: /assets/*.js, /assets/*.css
  /\.js$/,               // Any .js file
  /\.css$/,              // Any .css file
  /\.webp$/,             // WebP images
  /\.jpg$/, /\.jpeg$/,   // JPEG images
  /\.png$/,              // PNG images
  /\.svg$/,              // SVG files
  /\.woff2?$/,           // Web fonts
  /\.ttf$/, /\.otf$/,    // Font files
  /\.wasm$/,             // WASM binaries (ICP canisters)
  /\.ico$/,              // Favicon
];

// URL patterns that must NEVER be cached (always go to network)
const BYPASS_PATTERNS = [
  /supabase\.co/,                      // Supabase API / auth
  /exquisitor-auth-proxy/,             // Cloudflare Worker proxy
  /workers\.dev/,                      // Cloudflare Workers
  /\/api\//,                           // Internal API routes
  /\/_/,                               // ICP internal routes
  /\/auth\//,                          // Auth callback routes
  /chrome-extension:\/\//,            // Browser extension requests
];

function isStaticAsset(url) {
  return STATIC_ASSET_PATTERNS.some((pattern) => pattern.test(url));
}

function shouldBypass(url) {
  return BYPASS_PATTERNS.some((pattern) => pattern.test(url));
}

function isNavigation(request) {
  return request.mode === 'navigate';
}

// ─── Install ────────────────────────────────────────────────────────────────
// Skip waiting so the new SW activates immediately without requiring a tab close
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// ─── Activate ───────────────────────────────────────────────────────────────
// Clean up old versioned caches when a new SW activates
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_VERSION)
          .map((name) => caches.delete(name))
      )
    ).then(() => self.clients.claim())
  );
});

// ─── Fetch ───────────────────────────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = request.url;

  // 1. Always bypass: non-GET, API/auth/Supabase calls
  if (request.method !== 'GET' || shouldBypass(url)) {
    return; // Fall through to browser default (network)
  }

  // 2. Navigation requests (HTML pages): Network-First so deploys propagate
  //    immediately. Falls back to cache if offline.
  if (isNavigation(request)) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache a copy of the HTML for offline fallback
          if (response.ok) {
            const cloned = response.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(request, cloned));
          }
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // 3. Static assets: Cache-First — return from cache instantly if available,
  //    otherwise fetch from network and populate the cache for next time.
  if (isStaticAsset(url)) {
    event.respondWith(
      caches.open(CACHE_VERSION).then(async (cache) => {
        const cached = await cache.match(request);
        if (cached) {
          // Cache hit — return instantly, no ICP boundary verification needed
          return cached;
        }
        // Cache miss — fetch from network and cache for future visits
        try {
          const response = await fetch(request);
          if (response.ok) {
            cache.put(request, response.clone());
          }
          return response;
        } catch {
          // Network failure and no cache — return a minimal error response
          return new Response('Network error', { status: 503 });
        }
      })
    );
    return;
  }

  // 4. Everything else (non-asset GET requests): pass through to network
  // No event.respondWith() means the browser handles it normally
});
