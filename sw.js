var cacheShell = 'shell-v9'; 

var filesToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/main.js'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheShell).then( function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {

  var cacheToKeep = [cacheShell];
  
  e.waitUntil(
    caches.keys().then(function(keylist) {
		return Promise.all(keylist.map(function(key) {
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

// used to notify the user of a new version
self.addEventListener('message', function (event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
