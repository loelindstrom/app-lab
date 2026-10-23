import { mergeConfig } from "vite";
import appConfig from "./vite.config.ts";
import { pagesPwa } from "./scripts/pages-pwa.mjs";

export default (env) => mergeConfig(appConfig(env), {
  base: "/app-lab/",
  plugins: pagesPwa("/app-lab/", "app-lab-production"),
});
