self.importScripts('data/cards.js');

var cacheName = 'turnorder-v1';
var appShellFiles = [
  '/turnorder/app.css',
  '/turnorder/app.js',
  '/turnorder/index.html',
  '/turnorder/sw.js',
];


var cardsImages = [];
for (var i = 0; i < cards.length; i++) {
  cardsImages.push('data/img/' + cards[i].file);
}

var contentToCache = appShellFiles.concat(cardsImages);

// Install serviceWorker
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(contentToCache);
    })
  );
});


// Fetching content using Service Worker
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(r) {
      return r || fetch(e.request).then(function(response) {
        return caches.open(cacheName).then(function(cache) {
          cache.put(e.request, response.clone());

          return response;
        });
      });
    })
  );
});


// clear old caches
self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if(cacheName.indexOf(key === -1)) {
          return caches.delete(key);
        }
      }));
    })
  );
});
