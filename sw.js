var cacheShell = 'shell-v13'; 

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

// When a new SW is activated, it means that no previous SW is in use anymore.
// ... so, it is safe to clear all caches from previous SWs.
self.addEventListener('activate', function(e) {

  var cacheToKeep = [cacheShell];
  
  e.waitUntil(
    caches.keys().then(function(keylist) {
		return Promise.all(keylist.map(function(key) {
			if(cacheToKeep.indexOf(key) === -1){ // all new SW, have a different cache name
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

// Called when the user is notified of a new version and clicks the 'Update' button
self.addEventListener('message', function (event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
