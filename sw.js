const CACHE_NAME = 'db-meter-v1';
const urlsToCache = [
    './index.html',
    './manifest.json'
];

// 安裝 Service Worker 並快取檔案
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});

// 攔截網路請求，優先回傳快取內容（達成離線功能）
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});