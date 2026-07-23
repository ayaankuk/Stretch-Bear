const CACHE_NAME = "stretch-bear-v1";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./styles.css",
    "./script.js",
    "./manifest.webmanifest",
    "./Images/Stretch Bear.PNG",
    "./Images/icon-192.png",
    "./Images/icon-512.png"
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                return cache.addAll(FILES_TO_CACHE);
            })
    );
});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (cachedResponse) {
                return cachedResponse || fetch(event.request);
            })
    );
});