// Define a unique name for the cache
const CACHE_NAME = 'advanced-calculator-v1';

// List all the files and resources the app needs to function offline
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// --- INSTALL Event ---
// When the service worker is installed, open the cache and add all the specified files to it.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// --- FETCH Event ---
// When the app requests a resource, serve it from the cache if available.
// If it's not in the cache, fetch it from the network.
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // If the resource is in the cache, return it
        if (response) {
          return response;
        }
        // Otherwise, fetch the resource from the network
        return fetch(event.request);
      })
  );
});

// --- ACTIVATE Event ---
// This event is used to clean up old caches.
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // If a cache is not in our whitelist, delete it
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
