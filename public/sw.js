const CACHE_NAME = 'lab-navigator-cache-v1';

self.addEventListener('install', event => {
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames =>
            Promise.all(
                cacheNames.map(name => {
                    if (name !== CACHE_NAME) {
                        return caches.delete(name);
                    }
                })
            )
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cached => {
            if (cached) return cached;

            return fetch(event.request)
                .then(response => {
                    if (
                        response &&
                        response.status === 200 &&
                        response.type === 'basic'
                    ) {
                        const responseClone = response.clone();
                        caches.open(CACHE_NAME).then(cache => {
                            cache.put(event.request, responseClone);
                        });
                    }
                    return response;
                })
                .catch(err => {
                    if (event.request.destination === 'document') {
                        return caches.match('/');
                    }

                    return new Response('', {
                        status: 503,
                        statusText: 'Offline and resource not cached',
                    });
                });
        })
    );
});