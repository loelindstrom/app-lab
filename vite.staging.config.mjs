import { mergeConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import appConfig from "./vite.config.ts";

export default (env) => mergeConfig(appConfig(env), {
  base: "/app-lab/staging/",
  plugins: [
    {
      name: "staging-worker-scope",
      configResolved(config) {
        if (!config.base.startsWith("/") || !config.base.endsWith("/staging/")) {
          throw new Error("The staging worker requires an absolute base path ending in /staging/.");
        }
      },
    },
    VitePWA({
      // The existing HTML and deploy script own the manifest and mobile metadata.
      manifest: false,
      injectRegister: "script",
      registerType: "prompt",
      workbox: {
        cacheId: "app-lab-staging",
        globPatterns: ["**/*.{html,js,css,svg,png,ico,woff,woff2}"],
        // Serve the main shell from its cached directory index.
        navigateFallback: null,
        directoryIndex: "index.html",
        ignoreURLParametersMatching: [/.*/],
        cleanupOutdatedCaches: true,
        skipWaiting: false,
        clientsClaim: false,
      },
    }),
  ],
});
