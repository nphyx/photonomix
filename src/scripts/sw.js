const CACHE_NAME = "photonomix-v1";
const cacheUrls = [
	"/scripts/index.js",
	"/styles/style.js"
];
self.addEventListener("install", (ev) => {
	/* global caches */
	ev.waitUntil(caches.open(CACHE_NAME).then(
		(cache) => {
			console.log("opened cache");
			return cache.addAll(cacheUrls).then(
				() => console.log("cached all urls"),
				(err) => console.log("failed to cache urls", err)
			)
		},
		(err) => console.log("cache open failure", err)
	));
});

self.addEventListener("fetch", (ev) => {
	ev.respondWith(caches.match(ev.request).then(
		(response) => {
			if(response) return response;
			let fetchRequest = ev.request.clone();
			return fetch(fetchRequest).then((response) => {
				if(!response || 
					 response.status !== 200 || 
					 response.type !== "basic") return response;
				let responseToCache = response.clone();
				caches.open(CACHE_NAME).then((cache) => {
					cache.put(ev.request, responseToCache);
				});
				return response;
			}); // end fetch
		},
		(err) => console.log("cache match failure", err)
	)); // end respondWidth
});
