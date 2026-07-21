import type { CreateAppInput } from "./types";

export function createExampleAppInput(name = "Example App"): CreateAppInput {
  return {
    name,
    description: "Sandbox app with Tailwind, Alpine, persistence, and live shared data.",
    sourceCode: EXAMPLE_APP_SOURCE,
  };
}

export const EXAMPLE_APP_SOURCE = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="app-lab-tailwind" content="enabled">
    <title>Example App</title>
    <style>
      [x-cloak] { display: none !important; }
      [data-done="true"] .item-text { color: #94a3b8; text-decoration: line-through; }
    </style>
  </head>
  <body class="min-h-screen bg-slate-950 text-slate-100">
    <main class="mx-auto grid min-h-screen w-full max-w-3xl content-start gap-5 px-5 py-6" x-data="sandboxChecklist" x-init="init()" x-cloak>
      <header class="grid gap-3">
        <p class="text-xs font-black uppercase tracking-wide text-violet-300">App Lab example</p>
        <h1 class="max-w-2xl text-5xl font-black leading-none tracking-tight text-white sm:text-7xl">Sandbox checklist</h1>
        <p class="max-w-2xl text-base leading-7 text-slate-300">
          This app uses host-compiled Tailwind for styling, Alpine for UI state, and AppLab for persisted JSON and live shared data.
        </p>
      </header>

      <section class="grid gap-4 rounded-2xl border border-slate-700 bg-slate-900/85 p-4 shadow-2xl shadow-black/20">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <p class="text-sm font-bold text-slate-400">Persisted records with stable IDs</p>
          <span class="rounded-full border border-violet-400/30 bg-violet-400/10 px-3 py-1 text-xs font-black uppercase text-violet-200" x-text="savedLabel"></span>
        </div>

        <label class="grid gap-2 text-sm font-black text-slate-300">
          New item
          <span class="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
            <input
              class="min-h-12 rounded-full border border-slate-600 bg-slate-950 px-4 text-base font-semibold text-white outline-none placeholder:text-slate-500 focus:border-violet-400"
              autocomplete="off"
              placeholder="Add something to remember"
              x-model="draft"
              @keydown.enter.prevent="addItem"
            >
            <button class="min-h-12 rounded-full bg-violet-500 px-6 text-base font-black text-white hover:bg-violet-400 active:scale-[.98]" type="button" @click="addItem">Add</button>
          </span>
        </label>

        <ul class="grid gap-3" aria-label="Saved items">
          <template x-for="item in state.items" :key="item.id">
            <li class="grid gap-3 rounded-xl border border-slate-700 bg-slate-950/70 p-3 sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:items-center" :data-done="item.done">
              <span class="item-text min-w-0 break-words text-base font-bold text-white" x-text="item.text"></span>
              <button
                class="min-h-10 rounded-full border border-slate-600 px-4 text-sm font-black text-slate-200 hover:border-violet-400 hover:text-violet-200"
                type="button"
                @click="toggleItem(item.id)"
                x-text="item.done ? 'Undo' : 'Done'"
              ></button>
              <button
                class="min-h-10 rounded-full border border-slate-600 px-4 text-sm font-black text-slate-200 hover:border-red-400 hover:text-red-200"
                type="button"
                @click="deleteItem(item.id)"
              >Delete</button>
            </li>
          </template>
          <li class="rounded-xl border border-dashed border-slate-700 p-4 text-sm font-bold text-slate-500" x-show="state.items.length === 0">
            No saved items yet.
          </li>
        </ul>
      </section>

      <section class="grid gap-3 rounded-2xl border border-slate-800 bg-slate-900/45 p-4 text-sm leading-6 text-slate-300">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <output id="status" class="font-black text-sky-300" x-text="status">Loading saved data...</output>
          <span class="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-black uppercase text-emerald-200" x-text="completedLabel"></span>
        </div>
        <p>
          Contract: AppLab.getData(fallback), AppLab.saveData(json), and AppLab.onDataChange(handler). Keep persisted data in state and transient UI such as drafts in separate properties.
        </p>
      </section>
    </main>

    <script>
      "use strict";

      document.addEventListener("alpine:init", () => {
        Alpine.data("sandboxChecklist", () => ({
          draft: "",
          saveInFlight: 0,
          state: { schemaVersion: 1, items: [], savedAt: null },
          status: "Loading saved data...",

          async init() {
            AppLab.onError((message) => {
              this.status = "Error: " + message;
            });

            AppLab.onDataChange((nextData, info) => {
              if (this.saveInFlight > 0) {
                this.status = "Kept local edit while saving.";
                return;
              }
              this.applyData(nextData);
              this.status = "Live update received" + (info && info.version ? " v" + info.version : "") + ".";
            });

            const saved = await AppLab.getData({ schemaVersion: 1, items: [], savedAt: null });
            this.applyData(saved);
            this.status = "Loaded.";
          },

          get completedLabel() {
            const doneCount = this.state.items.filter((item) => item.done).length;
            return doneCount + " done / " + this.state.items.length + " total";
          },

          get savedLabel() {
            return this.state.savedAt ? "Last saved " + new Date(this.state.savedAt).toLocaleTimeString() : "Live data ready";
          },

          addItem() {
            const text = this.draft.trim();
            if (!text) return;
            this.state.items.push({
              id: this.createId(),
              text,
              done: false,
              createdAt: new Date().toISOString()
            });
            this.draft = "";
            this.saveState("Saving new item...");
          },

          toggleItem(id) {
            const item = this.state.items.find((candidate) => candidate.id === id);
            if (!item) return;
            item.done = !item.done;
            this.saveState("Saving item...");
          },

          deleteItem(id) {
            this.state.items = this.state.items.filter((candidate) => candidate.id !== id);
            this.saveState("Deleting item...");
          },

          async saveState(statusText) {
            this.status = statusText;
            this.state.savedAt = new Date().toISOString();
            this.saveInFlight += 1;
            try {
              await AppLab.saveData(this.snapshot());
              this.status = "Saved.";
            } finally {
              this.saveInFlight -= 1;
            }
          },

          applyData(data) {
            const sourceItems = Array.isArray(data && data.items) ? data.items : [];
            this.state = {
              schemaVersion: 1,
              items: sourceItems
                .filter((item) => item && typeof item === "object")
                .map((item) => ({
                  id: typeof item.id === "string" ? item.id : this.createId(),
                  text: typeof item.text === "string" ? item.text : "",
                  done: Boolean(item.done),
                  createdAt: typeof item.createdAt === "string" ? item.createdAt : new Date().toISOString()
                }))
                .filter((item) => item.text.trim()),
              savedAt: data && typeof data.savedAt === "string" ? data.savedAt : null
            };
          },

          snapshot() {
            return {
              schemaVersion: this.state.schemaVersion,
              savedAt: this.state.savedAt,
              items: this.state.items.map((item) => ({
                id: item.id,
                text: item.text,
                done: item.done,
                createdAt: item.createdAt
              }))
            };
          },

          createId() {
            if (window.crypto && typeof window.crypto.randomUUID === "function") return window.crypto.randomUUID();
            return "id_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2);
          }
        }));
      });
    </script>
  </body>
</html>`;
