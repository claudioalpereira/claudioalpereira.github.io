var cacheShell = 'shell-v1';
var filesToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/main.js'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheShell).then(cache => {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', e => {

  let cacheToKeep = [cacheShell];
  
  e.waitUntil(
    caches.keys().then(keylist => {
		return Promise.all(keylist.map(key => {
			if(cacheToKeep.indexOf(key) === -1){
				return caches.delete(key);
			}
		}));
	})
  );
});

/* Serve cached content when offline */
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});


