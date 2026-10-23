import { VitePWA } from "vite-plugin-pwa";
import { pagesManifest } from "./pages-manifest.mjs";

export function pagesPwa(base, cacheId) {
  return [
    {
      name: "pages-worker-scope",
      configResolved(config) {
        if (config.base !== base) {
          throw new Error(`The ${cacheId} worker requires base ${base}.`);
        }
      },
      generateBundle() {
        this.emitFile({
          type: "asset",
          fileName: "manifest.webmanifest",
          source: `${JSON.stringify(pagesManifest(base), null, 2)}\n`,
        });
      },
    },
    VitePWA({
      // HTML already links the manifest emitted above; avoid a duplicate link.
      manifest: false,
      injectRegister: "script",
      registerType: "prompt",
      workbox: {
        cacheId,
        globPatterns: ["**/*.{html,js,css,svg,png,ico,woff,woff2,webmanifest}"],
        // Only exact build assets and their directory indexes are cached.
        navigateFallback: null,
        directoryIndex: "index.html",
        ignoreURLParametersMatching: [/.*/],
        // The old-format sweep uses a scope substring and would delete nested staging caches.
        // Workbox still removes obsolete entries from this worker's own precache on activation.
        cleanupOutdatedCaches: false,
        skipWaiting: false,
        clientsClaim: false,
      },
    }),
  ];
}
