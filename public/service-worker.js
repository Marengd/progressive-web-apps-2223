const cacheName = 'kanye-west-quote-generator-app-cache';

// List of assets to cache
const urlsToCache = [
    '/views/pages/offline.ejs'
  ];

self.addEventListener('install', function(event) {
  console.log('Service Worker: installed');

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('Opened cache.');
      return cache.addAll(urlsToCache);
    }).catch(function(error) {
      console.error('Cache addAll error:', error);
    })
  );
});

self.addEventListener('activate', function(event) {
  console.log('Service Worker: Activated');

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(thisCacheName) {
          return thisCacheName !== cacheName;
        }).map(function(cacheName) {
          console.log('Service Worker: Deleting Cache ', cacheName);
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  console.log('Service Worker: Fetched', event.request.url);

  event.respondWith(
    caches.match(event.request).then(function(response) {
      // Cache hit - return response
      if (response) {
        console.log('Service Worker: Cache Hit ', event.request.url);
        return response;
      }

      // Clone the request
      const fetchRequest = event.request.clone();

      return fetch(fetchRequest).then(function(response) {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Clone the response
        const responseToCache = response.clone();

        console.log('Service Worker: Caching A New Request', event.request.url);

        caches.open(cacheName).then(function(cache) {
          cache.put(event.request, responseToCache);
        });

        return response;
      }).catch(function() {
        // If request fails, serve offline page
        console.log('Offline:', event.request.url);
        return caches.match('/offline.ejs');
      });
    })
  );
});
