/* eslint-disable no-restricted-globals */
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst, NetworkFirst } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';

// -------- PRECACHE ALL REACT BUILD FILES ----------
precacheAndRoute(self.__WB_MANIFEST);

// -------- NAVIGATION FALLBACK (SPA MODE) ----------
registerRoute(
    ({ request }) => request.mode === 'navigate',
    new NetworkFirst({
        cacheName: 'html-cache',
        plugins: [
            new CacheableResponsePlugin({ statuses: [200] }),
        ],
    })
);

// -------- RUNTIME CACHE: API (FakeStore API) -------
registerRoute(
    ({ url }) => url.origin.includes('fakestoreapi.com'),
    new NetworkFirst({
        cacheName: 'api-cache',
        networkTimeoutSeconds: 5,
        plugins: [
            new CacheableResponsePlugin({ statuses: [200] }),
            new ExpirationPlugin({ maxEntries: 30 }),
        ],
    })
);

// -------- RUNTIME CACHE: IMAGES --------------------
registerRoute(
    ({ request }) => request.destination === 'image',
    new CacheFirst({
        cacheName: 'image-cache',
        plugins: [
            new CacheableResponsePlugin({ statuses: [200] }),
            new ExpirationPlugin({ maxEntries: 60, maxAgeSeconds: 30 * 24 * 60 * 60 }),
        ],
    })
);

// -------- STALE-WHILE-REVALIDATE FOR CSS/JS -------
registerRoute(
    ({ request }) =>
        request.destination === 'style' ||
        request.destination === 'script' ||
        request.destination === 'worker',
    new StaleWhileRevalidate({
        cacheName: 'static-resources',
    })
);

// Skip waiting and activate immediately
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
