import type { CreateAppInput } from "./types";

export function createBlankAppInput(name = "Untitled App"): CreateAppInput {
  return {
    name,
    description: "New local app",
    sourceCode: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(name)}</title>
    <style>
      * { box-sizing: border-box; }
      body {
        align-items: center;
        background: #fffaf0;
        color: #202521;
        display: grid;
        font-family: Inter, ui-sans-serif, system-ui, sans-serif;
        margin: 0;
        min-height: 100vh;
        padding: 24px;
      }
      main { max-width: 680px; }
      h1 { font-size: clamp(42px, 11vw, 88px); line-height: .95; margin: 0 0 18px; }
      p { color: #637067; font-size: 18px; line-height: 1.55; margin: 0; }
    </style>
  </head>
  <body>
    <main>
      <h1>${escapeHtml(name)}</h1>
      <p>Open BuilderAI and describe what this app should become.</p>
    </main>
  </body>
</html>`,
  };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
