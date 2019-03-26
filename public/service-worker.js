self.addEventListener('install', function (e) {
    console.log(e)
    e.waitUntil(
        caches.open('MTG').then(function (cache) {
            return cache.addAll([
                '/',
                '/css/styles-dfe9fb0f18.css',
                '/js/script-74edf1791a.js',
                '/images/logo.jpg',
                '/images/Mtg-logo-700x560.png',
            ]);
        })
    );
});

self.addEventListener("activate", event => {
    console.log("activate")
});

self.addEventListener('fetch', function (event) {
    console.log(event.request.url);

    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                return response || fetch(event.request);
            })
    );
});