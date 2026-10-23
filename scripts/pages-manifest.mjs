import { existsSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export function pagesManifest(base, icon = "flask") {
  return {
    name: "App Lab",
    short_name: "App Lab",
    start_url: base,
    scope: base,
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#111827",
    icons: [192, 512].map((size) => ({
      src: `${base}icons/${icon}-${size}.png`,
      sizes: `${size}x${size}`,
      type: "image/png",
      purpose: "any maskable",
    })),
  };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [directory, base] = process.argv.slice(2);
  const file = join(directory, "manifest.webmanifest");
  // Current builds emit a precached manifest. Older source refs need the legacy fallback.
  if (!existsSync(file)) {
    const icon = existsSync(join(directory, "icons/flask-192.png")) ? "flask" : "icon";
    writeFileSync(file, `${JSON.stringify(pagesManifest(base, icon), null, 2)}\n`);
  }
}
