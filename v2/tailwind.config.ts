import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        app: {
          bg: "#f4f1ea",
          ink: "#202521",
          muted: "#637067",
          line: "#d8d0c1",
          surface: "#fffaf0",
          accent: "#0f6d5c",
          strong: "#09483d",
        },
      },
      boxShadow: {
        panel: "0 22px 60px rgb(46 38 24 / 16%)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["Cascadia Code", "SFMono-Regular", "Consolas", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;
