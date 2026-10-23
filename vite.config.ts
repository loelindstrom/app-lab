import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig(({ command }) => ({
  base: command === "build" ? "/app-lab/" : "/",
  plugins: [react()],
  build: {
    rollupOptions: {
      input: { main: "index.html", next: "next/index.html" },
    },
  },
  test: {
    environment: "jsdom",
    exclude: ["**/*.smoke.test.ts", "e2e/**", "node_modules/**"],
  },
}));
