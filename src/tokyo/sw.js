// Keeps aram.nu/tokyo working without internet.
// The page itself: network first (so updates arrive when online), cached copy when offline.
// Google Fonts: cache first, so the fonts still show offline after the first visit.
const CACHE = "tokyo-6acbd50531";
const CORE = ["./", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./icon-maskable-512.png", "./apple-touch-icon.png"];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith("tokyo-") && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function timeout(ms) {
  return new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), ms));
}

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  if (url.origin === self.location.origin) {
    if (!url.pathname.startsWith(new URL("./", self.location).pathname)) return;
    event.respondWith((async () => {
      const cache = await caches.open(CACHE);
      try {
        // a slow connection should not leave the page blank: fall back to the cache after 4 s
        const res = await Promise.race([fetch(req), timeout(4000)]);
        if (res && res.ok) cache.put(req.mode === "navigate" ? "./" : req, res.clone());
        return res;
      } catch (e) {
        const hit = await cache.match(req.mode === "navigate" ? "./" : req, { ignoreSearch: true });
        return hit || (await cache.match("./")) || Response.error();
      }
    })());
    return;
  }

  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE);
      const hit = await cache.match(req);
      if (hit) return hit;
      try {
        const res = await fetch(req);
        cache.put(req, res.clone());
        return res;
      } catch (e) {
        return Response.error();
      }
    })());
  }
});
