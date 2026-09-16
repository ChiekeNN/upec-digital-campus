const CACHE_NAME = "upec-cache-v2";
const OFFLINE_URL = "/offline";

const PRECACHE_URLS = ["/", "/offline"];

// Install: pre-cache essential pages
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS)),
  );
  self.skipWaiting();
});

// Activate: clean up old caches (v1 included cached 404 responses,
// which made some photos keep failing even after they were uploaded)
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      ),
  );
  self.clients.claim();
});

// Only cache successful responses. A 404 (e.g. a photo that was not
// uploaded yet when the visitor first loaded the site) must never be
// stored, or it would be served forever instead of the real photo.
async function cacheSuccessful(cacheName, request, response) {
  if (response && response.ok) {
    const cache = await caches.open(cacheName);
    await cache.put(request, response);
  }
}

// Fetch: network-first, with cache as an offline fallback
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Only handle GET requests
  if (request.method !== "GET") return;

  // For page navigations
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          cacheSuccessful(CACHE_NAME, request, copy);
          return response;
        })
        .catch(() =>
          caches
            .match(request)
            .then((cached) => cached || caches.match(OFFLINE_URL)),
        ),
    );
    return;
  }

  // For other GET requests (images, CSS, JS): try the network first so
  // newly uploaded photos appear immediately; only fall back to the
  // cache when offline. Never cache failed (404) responses.
  event.respondWith(
    fetch(request)
      .then((response) => {
        const copy = response.clone();
        cacheSuccessful(CACHE_NAME, request, copy);
        return response;
      })
      .catch(() =>
        caches.match(request).then((cached) => cached || Response.error()),
      ),
  );
});
