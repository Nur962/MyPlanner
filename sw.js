// sw.js
const CACHE_NAME = 'my-planner-cache-v1';
const urlsToCache = [
  '/',
  'index.html',
  'style.css',
  'script.js',
  // Add any other assets (icons, fonts, etc.)
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});