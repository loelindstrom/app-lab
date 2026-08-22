import type { BuilderProfile } from "./types";
import { OPINIONATED_BOARD_SOURCE } from "./opinionatedBoardApp";

export const BUILDER_APP_NAME_PLACEHOLDER = "{{appName}}";
export const MINIMAL_BUILDER_PROFILE_ID = "builtin-minimal-v1";
export const OPINIONATED_BUILDER_PROFILE_ID = "builtin-opinionated-v1";
export const LEGACY_GUIDED_BUILDER_PROFILE_ID = "builtin-guided-v1";
export const MINIMAL_BOARD_DESCRIPTION =
  "A small example app that showcases App Lab's runtime, persistence, and live updates while leaving design and behavior to the user and AI.";

export const MINIMAL_BUILDER_STARTER_SOURCE = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="${MINIMAL_BOARD_DESCRIPTION}">
    <meta name="app-lab-tailwind" content="enabled">
    <title>Minimal Board</title>
    <style>
      html, body { height: 100%; overflow: hidden; }
      [x-cloak] { display: none !important; }
      dialog { margin: min(16vh, 6rem) auto auto auto; }
    </style>
  </head>
  <body class="h-full bg-slate-100 text-slate-950">
    <main class="grid h-full grid-rows-[minmax(0,1fr)_auto] overflow-hidden" x-data="minimalBoard" x-init="init()" x-cloak>
      <div class="min-h-0 overflow-y-auto">
        <div class="mx-auto grid w-full max-w-xl gap-3 px-4 py-5">
          <template x-for="note in state.notes" :key="note.id">
            <article class="relative rounded-lg border border-slate-200 bg-white p-4 pr-12 shadow-sm">
              <button
                class="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-md text-xl leading-none text-slate-400 hover:bg-red-50 hover:text-red-700"
                type="button"
                :aria-label="'Delete note: ' + note.body.slice(0, 40)"
                title="Delete note"
                @click="requestDelete(note.id)"
              >&times;</button>
              <p class="whitespace-pre-wrap break-words text-sm leading-6 text-slate-700" x-text="note.body"></p>
              <p class="mt-3 text-xs font-semibold text-slate-400" x-text="formatDate(note.createdAt)"></p>
            </article>
          </template>
        </div>
      </div>

      <section class="border-t border-slate-200 bg-white p-4" aria-label="Post a note">
        <div class="mx-auto grid w-full max-w-xl gap-2">
          <label class="sr-only" for="minimal-board-note">Note</label>
          <textarea
            class="min-h-24 resize-y rounded-md border border-slate-300 bg-white px-3 py-2 text-base outline-none focus:border-blue-600"
            id="minimal-board-note"
            placeholder="Write a note"
            x-model="ui.draft"
          ></textarea>
          <button
            class="min-h-11 rounded-md bg-blue-700 px-4 text-sm font-bold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
            type="button"
            :disabled="!ui.draft.trim()"
            @click="postNote()"
          >Post</button>
          <p class="text-sm font-semibold text-red-700" role="alert" x-show="ui.error" x-text="ui.error"></p>
        </div>
      </section>

      <dialog x-ref="deleteDialog" class="w-[min(88vw,24rem)] rounded-lg border border-slate-200 bg-white p-5 text-slate-950 shadow-2xl backdrop:bg-slate-950/40">
        <h2 class="text-lg font-bold">Delete note?</h2>
        <p class="mt-2 text-sm leading-6 text-slate-600">This permanently removes the note from the shared board.</p>
        <div class="mt-5 flex justify-end gap-2">
          <button class="min-h-10 rounded-md border border-slate-300 bg-white px-4 text-sm font-bold text-slate-700" type="button" @click="$refs.deleteDialog.close()">Cancel</button>
          <button class="min-h-10 rounded-md bg-red-700 px-4 text-sm font-bold text-white" type="button" @click="deleteNote()">Delete</button>
        </div>
      </dialog>
    </main>

    <script>
      "use strict";

      document.addEventListener("alpine:init", () => {
        Alpine.data("minimalBoard", () => ({
          state: { schemaVersion: 1, notes: [] },
          ui: { draft: "", pendingDeleteId: null, error: "" },
          saveInFlight: 0,
          queuedRemoteData: undefined,

          async init() {
            AppLab.onError((message) => { this.ui.error = String(message || "Unknown App Lab error"); });
            AppLab.onDataChange((nextData) => {
              if (this.saveInFlight > 0) {
                this.queuedRemoteData = nextData;
                return;
              }
              this.applyData(nextData);
            });
            this.applyData(await AppLab.getData(this.defaultData()));
          },

          defaultData() {
            const now = new Date().toISOString();
            return {
              schemaVersion: 1,
              notes: [
                {
                  id: this.createId(),
                  body: [
                    "Hi!",
                    "",
                    "This example app shows you and the AI who will edit it the most crucial parts of building apps in App Lab.",
                    "",
                    "Press AI to copy a prompt into your favorite external AI tool, or work directly with BuilderAI after connecting your own AI in Settings.",
                    "",
                    "In Settings you can also switch profile, add your own starter app, and adjust the AI agent's instructions.",
                    "",
                    "Happy building!",
                    "",
                    "/App Lab"
                  ].join("\\n"),
                  createdAt: now
                },
                {
                  id: this.createId(),
                  body: "Connect a storage provider in Settings to share this board and see notes update live across browsers.",
                  createdAt: now
                }
              ]
            };
          },

          applyData(data) {
            const fallback = this.defaultData();
            const source = data && typeof data === "object" ? data : fallback;
            const notes = Array.isArray(source.notes) ? source.notes : fallback.notes;
            this.state = {
              schemaVersion: 1,
              notes: notes.map((note) => ({
                id: typeof note.id === "string" ? note.id : this.createId(),
                body: typeof note.body === "string" ? note.body : "",
                createdAt: typeof note.createdAt === "string" ? note.createdAt : new Date().toISOString()
              }))
            };
          },

          postNote() {
            const body = this.ui.draft.trim();
            if (!body) return;
            this.state.notes = [
              ...this.state.notes,
              { id: this.createId(), body, createdAt: new Date().toISOString() }
            ];
            this.ui.draft = "";
            this.saveState();
          },

          requestDelete(noteId) {
            this.ui.pendingDeleteId = noteId;
            this.$refs.deleteDialog.showModal();
          },

          deleteNote() {
            this.state.notes = this.state.notes.filter((note) => note.id !== this.ui.pendingDeleteId);
            this.ui.pendingDeleteId = null;
            this.$refs.deleteDialog.close();
            this.saveState();
          },

          async saveState() {
            this.ui.error = "";
            this.saveInFlight += 1;
            try {
              await AppLab.saveData(JSON.parse(JSON.stringify(this.state)));
            } catch (error) {
              this.ui.error = error && error.message ? error.message : "Could not save data.";
            } finally {
              this.saveInFlight -= 1;
              if (this.saveInFlight === 0 && this.queuedRemoteData !== undefined) {
                const queued = this.queuedRemoteData;
                this.queuedRemoteData = undefined;
                this.applyData(queued);
              }
            }
          },

          formatDate(value) {
            const date = new Date(value);
            return Number.isNaN(date.getTime()) ? "Recently" : new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(date);
          },

          createId() {
            if (window.crypto && typeof window.crypto.randomUUID === "function") return window.crypto.randomUUID();
            return "note_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2);
          }
        }));
      });
    </script>
  </body>
</html>`;

export function createBuiltInBuilderProfiles(): BuilderProfile[] {
  const minimalPrompt = createMinimalProfilePrompt();
  return [
    {
      builtIn: true,
      name: "Opinionated",
      profileId: OPINIONATED_BUILDER_PROFILE_ID,
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
      starterSource: OPINIONATED_BOARD_SOURCE,
    },
    {
      builtIn: true,
      name: "Minimal",
      profileId: MINIMAL_BUILDER_PROFILE_ID,
      promptTemplate: minimalPrompt,
      starterSource: MINIMAL_BUILDER_STARTER_SOURCE,
    },
  ];
}

export function resolveBuilderProfilePrompt(promptTemplate: string, appName: string): string {
  return promptTemplate.split(BUILDER_APP_NAME_PLACEHOLDER).join(appName);
}

export function resolveActiveBuilderProfile(
  profiles: readonly BuilderProfile[],
  activeProfileId: string,
): BuilderProfile | null {
  return (
    profiles.find((profile) => profile.profileId === activeProfileId) ??
    profiles.find((profile) => profile.profileId === OPINIONATED_BUILDER_PROFILE_ID) ??
    profiles[0] ??
    null
  );
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
