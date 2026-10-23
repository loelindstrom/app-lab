import { mergeConfig } from "vite";
import appConfig from "./vite.config.ts";
import { pagesPwa } from "./scripts/pages-pwa.mjs";

export default (env) => mergeConfig(appConfig(env), {
  base: "/app-lab/staging/",
  plugins: pagesPwa("/app-lab/staging/", "app-lab-staging"),
});
