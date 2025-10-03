// AeroForecast Service Worker for Offline Functionality

const CACHE_NAME = 'aeroforecast-cache-v1';
const RUNTIME_CACHE = 'aeroforecast-runtime';

// Resources to cache on install
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/assets/index.css',
  '/assets/index.js',
  'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css',
];

// Install event - precache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  const currentCaches = [CACHE_NAME, RUNTIME_CACHE];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

// Fetch event - network-first strategy with fallback to cache
self.addEventListener('fetch', event => {
  // Skip cross-origin requests
  if (event.request.url.startsWith(self.location.origin) || 
      event.request.url.includes('tile.openstreetmap.org') ||
      event.request.url.includes('unpkg.com/leaflet')) {
    
    // API requests - network first, then cache
    if (event.request.url.includes('/api/') || 
        event.request.url.includes('open-meteo.com') ||
        event.request.url.includes('geocoding-api')) {
      event.respondWith(
        fetch(event.request)
          .then(response => {
            // Clone the response to store in cache
            const responseToCache = response.clone();
            
            caches.open(RUNTIME_CACHE)
              .then(cache => {
                // Only cache successful responses
                if (response.status === 200) {
                  cache.put(event.request, responseToCache);
                }
              });
              
            return response;
          })
          .catch(() => {
            // If network fails, try to get from cache
            return caches.match(event.request);
          })
      );
    } else {
      // For non-API requests - cache first, then network
      event.respondWith(
        caches.match(event.request)
          .then(cachedResponse => {
            if (cachedResponse) {
              return cachedResponse;
            }
            
            return fetch(event.request)
              .then(response => {
                // Don't cache non-successful responses
                if (!response || response.status !== 200) {
                  return response;
                }
                
                // Clone the response to store in cache
                const responseToCache = response.clone();
                
                caches.open(RUNTIME_CACHE)
                  .then(cache => {
                    cache.put(event.request, responseToCache);
                  });
                  
                return response;
              });
          })
      );
    }
  }
});

// Handle messages from clients
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});