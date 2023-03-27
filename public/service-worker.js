const cacheName = 'kanye-west-quote-generator-app-cache';

// List of assets to cache
const urlsToCache = [
  '/views/pages/offline.ejs'
];

self.addEventListener('install', (event) => {
  console.log('Service Worker: installed');

  event.waitUntil((async () => {
    try {
      const cache = await caches.open(cacheName);
      console.log('Opened cache.');
      return cache.addAll(urlsToCache);
    } catch (error) {
      console.error('Cache Add All error:', error);
    }
  })());
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activated');

  event.waitUntil((async () => {
    const cacheNames = await caches.keys();
    return Promise.all(
      cacheNames.filter((thisCacheName) => thisCacheName !== cacheName)
        .map((cacheName) => {
          console.log('Service Worker: Deleting Cache ', cacheName);
          return caches.delete(cacheName);
        })
    );
  })());
});

self.addEventListener('fetch', (event) => {
  event.respondWith((async () => {
    try {
      // Try to match the request in the cache
      const cachedResponse = await caches.match(event.request);
      if (cachedResponse) {
        return cachedResponse;
      }

      // If not in cache, perform a network request
      const networkResponse = await fetch(event.request);

      // If we received a valid response, cache it and return it
      if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
        const responseToCache = networkResponse.clone();
        const cache = await caches.open(cacheName);
        cache.put(event.request, responseToCache);
        return networkResponse;
      }

      // If response is not valid, return it without caching
      return networkResponse;
    } catch (error) {
      // If a network error occurs, serve the offline page
      return caches.match('/offline.ejs');
    }
  })());
});
