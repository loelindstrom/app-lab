import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        app: {
          bg: "#eef3f7",
          ink: "#172026",
          muted: "#60717c",
          line: "#cbd7df",
          surface: "#fbfdff",
          panel: "#ffffff",
          accent: "#2563eb",
          strong: "#1d4ed8",
          violet: "#7c3aed",
        },
      },
      boxShadow: {
        panel: "0 22px 60px rgb(23 32 38 / 16%)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["Cascadia Code", "SFMono-Regular", "Consolas", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;
