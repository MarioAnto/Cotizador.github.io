// Service worker del Cotizador PROTEKTA.
// Sube el número de VERSION cada vez que publiques cambios para forzar actualización.
const VERSION = 'protekta-v1';

const PRECACHE = [
  './',
  './index.html',
  './manifest.json',
  './image/logo.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(VERSION).then(cache =>
      // Un recurso que falle no debe impedir la instalación
      Promise.all(PRECACHE.map(url =>
        fetch(url, url.startsWith('http') ? { mode: 'no-cors' } : {})
          .then(res => cache.put(url, res))
          .catch(() => {})
      ))
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Stale-while-revalidate: responde rápido desde caché y actualiza en segundo plano.
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  event.respondWith(
    caches.open(VERSION).then(async cache => {
      const cached = await cache.match(req, { ignoreSearch: false });
      const network = fetch(req).then(res => {
        if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone());
        return res;
      }).catch(() => null);

      if (cached) return cached;
      const res = await network;
      if (res) return res;
      if (req.mode === 'navigate') return cache.match('./index.html');
      return Response.error();
    })
  );
});
