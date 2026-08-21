import type { BuilderProfile } from "./types";

export const BUILDER_APP_NAME_PLACEHOLDER = "{{appName}}";

export const MINIMAL_BUILDER_STARTER_SOURCE = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Minimal App Lab starter.">
    <meta name="app-lab-tailwind" content="enabled">
    <title>New App</title>
    <style>[x-cloak] { display: none !important; }</style>
  </head>
  <body class="min-h-screen bg-white text-slate-950">
    <main x-data="starter" x-init="init()" x-cloak>
      <p x-text="state.message"></p>
      <button type="button" @click="save()">Save</button>
    </main>
    <script>
      document.addEventListener("alpine:init", () => {
        Alpine.data("starter", () => ({
          state: { schemaVersion: 1, message: "Ready" },
          async init() {
            this.state = await AppLab.getData(this.state);
            AppLab.onDataChange((nextData) => { if (nextData) this.state = nextData; });
          },
          async save() {
            await AppLab.saveData(JSON.parse(JSON.stringify(this.state)));
          }
        }));
      });
    </script>
  </body>
</html>`;

export function createBuiltInBuilderProfiles(guidedStarterSource: string): BuilderProfile[] {
  const minimalPrompt = createMinimalProfilePrompt();
  return [
    {
      builtIn: true,
      name: "Minimal",
      profileId: "builtin-minimal-v1",
      promptTemplate: minimalPrompt,
      starterSource: MINIMAL_BUILDER_STARTER_SOURCE,
    },
    {
      builtIn: true,
      name: "Guided",
      profileId: "builtin-guided-v1",
      promptTemplate: `${minimalPrompt}

App Lab best practices:
- Build a polished, mobile-first app with clear visual hierarchy and efficient controls.
- Prefer a small, focused app over speculative features and leave room for the user to iterate.
- Use tabs, lists, dialogs, and collapsible details when they simplify the workflow.
- App Lab already displays the title from <title>; avoid repeating it in a fixed app header.
- Register non-trivial Alpine components with Alpine.data during alpine:init.
- Prefer literal Tailwind classes for layout and styling, with small inline styles only for browser quirks.
- Keep transient UI state separate from persisted records and settings.
- Include schemaVersion in persisted data, normalize loaded data, and give collection items stable high-entropy ids.
- Show unexpected runtime or save errors without adding noisy success-status UI.
- Design shared state so occasional latest-local-wins overwrites remain understandable to users.
- Follow the patterns demonstrated by the current starter source when they suit the user's request.`,
      starterSource: guidedStarterSource,
    },
  ];
}

function createMinimalProfilePrompt(): string {
  return `You are BuilderAI, helping edit the active App Lab app named "${BUILDER_APP_NAME_PLACEHOLDER}".

Return app changes as one complete single-file HTML document.

Runtime constraints:
- The app runs in a sandboxed iframe with scripts enabled and an opaque origin.
- Keep code and dependencies inline. Do not use external scripts, imports, CDNs, remote images, browser storage, cookies, or navigation.
- Do not use <form>, form submission, or buttons with type="submit". Use button type="button" and explicit click handlers.
- Alpine.js is injected by App Lab. Do not import it or call Alpine.start().
- To use Tailwind, include <meta name="app-lab-tailwind" content="enabled"> and keep utility classes literal in class attributes.
- Use x-text, textContent, or DOM APIs for user-controlled text, never x-html or innerHTML.

Persistence and live data:
- Load app-owned JSON with await AppLab.getData(fallbackValue).
- Save a plain JSON snapshot with await AppLab.saveData(jsonValue).
- App data may later be shared and update live. Subscribe with AppLab.onDataChange and do not immediately save remote updates back.
- Persist only JSON-compatible primitives, arrays, and plain objects.`;
}
