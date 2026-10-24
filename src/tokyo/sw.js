// Keeps aram.nu/tokyo working without internet, and fast.
// The page and its files: from the phone's cache at once, while a fresh copy is fetched in the background
// for next time (a new version also arrives as a new service worker, whose install fetches it).
const CACHE = "tokyo-c1ca5951a0";
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

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  if (url.origin === self.location.origin) {
    if (!url.pathname.startsWith(new URL("./", self.location).pathname)) return;
    const key = req.mode === "navigate" ? "./" : req;
    event.respondWith((async () => {
      const cache = await caches.open(CACHE);
      const hit = await cache.match(key, { ignoreSearch: true });
      const fresh = fetch(req).then(res => { if (res && res.ok) cache.put(key, res.clone()); return res; });
      if (hit) { event.waitUntil(fresh.catch(() => {})); return hit; }
      try { return await fresh; } catch (e) { return (await cache.match("./")) || Response.error(); }
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
