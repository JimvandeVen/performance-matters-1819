self.addEventListener('install', function (e) {
    e.waitUntil(self.skipWaiting())
    e.waitUntil(
        caches.open('MTG').then(function (cache) {
            return cache.addAll([
                '/',
                '/css/styles-4f53a5f048.css',
                '/js/script-74edf1791a.js',
                '/images/logo.jpg',
                '/images/Mtg-logo-700x560.png',
                '/offline/offline.html'
            ]);
        })
    );
});

self.addEventListener("activate", event => {
    console.log("activate")
});

self.addEventListener('fetch', function (event) {
    if (
        event.request.mode === 'navigate' ||
        (event.request.method === 'GET' &&
            event.request.headers.get('accept').includes('text/html'))
    ) {
        event.respondWith(
            fetch(event.request.url).catch(error => {
                // Return the offline page
                return caches.match('/offline/offline.html')
            })
        )
    } else {
        event.respondWith(
            caches.match(event.request)
                .then(function (response) {
                    return response || fetch(event.request);
                })
        );
    }

});