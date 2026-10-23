self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const scope = self.registration.scope;
    const names = await caches.keys();
    await Promise.all(names
      .filter((name) => name.startsWith("app-lab-") && name.endsWith(scope))
      .map((name) => caches.delete(name)));
    await self.registration.unregister();
  })());
});
