import type { CreateAppInput } from "./types";

export function createAlpineExampleAppInput(name = "Example App"): CreateAppInput {
  return {
    name,
    description:
      "Compact AppLab example using host-compiled Tailwind, Alpine, dialogs, tabs, collapsible items, and live JSON data.",
    sourceCode: ALPINE_EXAMPLE_APP_SOURCE,
  };
}

export const ALPINE_EXAMPLE_APP_SOURCE = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="app-lab-tailwind" content="enabled">
    <title>Example App</title>
    <style>
      html, body { height: 100%; overflow: hidden; }
      [x-cloak] { display: none !important; }
      [data-done="true"] .item-title { color: #64748b; text-decoration: line-through; }
      details > summary::-webkit-details-marker { display: none; }
      dialog { margin: min(12vh, 4rem) auto auto auto; }
    </style>
  </head>
  <body class="h-full bg-stone-50 text-slate-950">
    <main class="grid h-full w-full grid-rows-[minmax(0,1fr)_auto] overflow-hidden" x-data="todoExample" x-init="init()" x-cloak>
      <div class="min-h-0 overflow-y-auto">
        <!-- AppLab already shows a fixed frame header from <title>; do not add a second top app bar inside the sandbox. -->
        <!-- The bottom padding keeps the final items clear of the fixed bottom tabs and plus button. -->
        <div class="mx-auto grid w-full max-w-3xl gap-6 px-5 py-6 pb-32 sm:px-6">
          <header class="grid gap-3">
            <p class="text-xs font-black uppercase tracking-wide text-violet-700">AppLab example</p>
            <h1 class="text-4xl font-black tracking-tight text-slate-950">Example App</h1>
            <p class="max-w-2xl text-sm leading-6 text-slate-600">
              A small Alpine and Tailwind app showing AppLab JSON persistence, live shared data, tabs, one dialog, and collapsible list items.
            </p>
          </header>

          <section class="grid gap-3">
            <div class="flex items-end justify-between gap-3">
              <h2 class="text-xl font-black tracking-tight" x-text="ui.tab === 'active' ? 'Active items' : 'Done items'"></h2>
              <p class="text-xs font-bold uppercase text-slate-500" x-text="countLabel"></p>
            </div>

            <div class="grid gap-3">
              <template x-for="item in visibleItems" :key="item.id">
                <details class="group rounded-2xl bg-white shadow-sm ring-1 ring-slate-200" :data-done="item.done">
                  <summary class="grid min-h-20 cursor-pointer list-none grid-cols-[auto_minmax(0,1fr)_auto_auto] items-center gap-3 px-5 py-4">
                    <button class="grid h-8 w-8 place-items-center rounded-full border border-slate-300 text-sm font-black text-emerald-700" type="button" aria-label="Toggle item" @click.stop.prevent="toggleItem(item.id)" x-text="item.done ? '✓' : ''"></button>
                    <div class="min-w-0">
                      <strong class="item-title block truncate text-base font-black text-slate-900" x-text="item.title"></strong>
                      <span class="text-xs font-bold uppercase text-slate-500" x-text="item.done ? 'Done' : 'Active'"></span>
                    </div>
                    <button class="grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white text-sm font-black text-slate-500 hover:text-violet-700" type="button" aria-label="Edit item" title="Edit item" @click.stop.prevent="openItemDialog(item.id)">
                      <svg class="h-4 w-4" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4.2 19.8 6.4 14.1 9.9 17.6 4.2 19.8Z"></path>
                        <path d="M8.1 12.4 13.4 7.1 16.9 10.6 11.6 15.9Z"></path>
                        <path d="M15.1 5.4 17.4 3.1 20.9 6.6 18.6 8.9Z"></path>
                      </svg>
                    </button>
                    <span class="grid h-9 w-9 place-items-center text-sm font-black text-slate-500 transition-transform group-open:rotate-180" aria-hidden="true">v</span>
                  </summary>
                  <div class="border-t border-slate-100 px-5 pb-5 pt-3">
                    <p class="whitespace-pre-wrap text-sm font-semibold leading-6 text-slate-600" x-text="item.description || 'No description yet.'"></p>
                  </div>
                </details>
              </template>

              <p class="rounded-2xl border border-dashed border-slate-300 bg-white/70 p-6 text-center text-sm font-bold text-slate-500" x-show="visibleItems.length === 0">
                Nothing here yet.
              </p>
            </div>
          </section>

          <div class="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-bold leading-6 text-amber-900" x-show="ui.error" role="status">
            <p>Something needs attention.</p>
            <p class="font-semibold" x-text="ui.error"></p>
          </div>
        </div>
      </div>

      <!-- Bottom tabs are useful inside mobile-first sandbox apps; AppLab's outer frame handles global app controls. -->
      <nav class="z-30 border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom,0px)] shadow-[0_-8px_24px_rgb(15_23_42_/_6%)]" aria-label="Example App tabs">
        <div class="mx-auto grid max-w-3xl grid-cols-2">
          <button class="min-h-16 border-t-4 px-4 text-sm font-black" :class="ui.tab === 'active' ? 'border-violet-600 text-violet-700' : 'border-transparent text-slate-500'" type="button" @click="ui.tab = 'active'">Active</button>
          <button class="min-h-16 border-t-4 px-4 text-sm font-black" :class="ui.tab === 'done' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-slate-500'" type="button" @click="ui.tab = 'done'">Done</button>
        </div>
      </nav>

      <button class="fixed bottom-20 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-violet-600 text-3xl font-light leading-none text-white shadow-lg shadow-slate-900/20 active:scale-[.96]" type="button" aria-label="New item" title="New item" x-show="ui.tab === 'active'" @click="openItemDialog()">+</button>

      <!-- One dialog handles create, edit, and delete instead of using browser prompt/alert/confirm. -->
      <dialog x-ref="itemDialog" class="w-[min(92vw,28rem)] rounded-2xl border border-slate-200 bg-white p-5 text-slate-950 shadow-2xl backdrop:bg-slate-950/40">
        <h2 class="text-xl font-black tracking-tight" x-text="dialogTitle"></h2>
        <label class="mt-4 grid gap-2 text-sm font-black text-slate-700">
          Title
          <input class="min-h-12 rounded-xl border border-slate-300 bg-stone-50 px-4 text-base font-semibold outline-none focus:border-violet-500" autocomplete="off" x-model="ui.titleDraft" @keydown.enter.prevent="saveItemDialog">
        </label>
        <label class="mt-3 grid gap-2 text-sm font-black text-slate-700">
          Description
          <textarea class="min-h-28 resize-none rounded-xl border border-slate-300 bg-stone-50 px-4 py-3 text-base font-semibold outline-none focus:border-violet-500" x-model="ui.descriptionDraft"></textarea>
        </label>

        <div class="mt-5 border-t border-slate-100 pt-4" x-show="ui.editingId">
          <button class="text-sm font-black text-slate-500 underline decoration-slate-300 underline-offset-4 hover:text-slate-950" type="button" x-show="!ui.confirmDelete" @click="ui.confirmDelete = true">Delete this item</button>
          <div class="grid gap-3 rounded-xl bg-stone-50 p-3" x-show="ui.confirmDelete">
            <p class="text-sm font-bold text-slate-700">Delete this item permanently?</p>
            <div class="flex justify-end gap-2">
              <button class="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-black text-slate-700" type="button" @click="ui.confirmDelete = false">Keep</button>
              <button class="rounded-full bg-slate-950 px-4 py-2 text-sm font-black text-white" type="button" @click="deleteEditingItem">Delete</button>
            </div>
          </div>
        </div>

        <div class="mt-5 flex justify-end gap-2">
          <button class="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-black text-slate-700" type="button" @click="$refs.itemDialog.close()">Cancel</button>
          <button class="rounded-full bg-violet-600 px-5 py-2.5 text-sm font-black text-white" type="button" @click="saveItemDialog">Save</button>
        </div>
      </dialog>
    </main>

    <script>
      "use strict";

      document.addEventListener("alpine:init", () => {
        Alpine.data("todoExample", () => ({
          // Persist only plain JSON. Keep transient UI in ui.
          state: { schemaVersion: 1, items: [] },
          ui: {
            tab: "active",
            editingId: null,
            titleDraft: "",
            descriptionDraft: "",
            confirmDelete: false,
            error: ""
          },
          saveInFlight: 0,
          queuedRemoteData: null,

          async init() {
            // Use AppLab for persistence and live shared data; do not use localStorage or direct IndexedDB.
            AppLab.onError((message) => { this.ui.error = String(message || "Unknown AppLab error"); });
            AppLab.onDataChange((nextData) => {
              // Queue incoming data while a local save is in flight so a remote echo does not clobber the local edit.
              if (this.saveInFlight > 0) {
                this.queuedRemoteData = nextData;
                return;
              }
              this.applyData(nextData);
            });
            this.applyData(await AppLab.getData(this.defaultData()));
          },

          defaultData() {
            return {
              schemaVersion: 1,
              items: [
                {
                  id: this.createId(),
                  title: "Edit this example",
                  description: "Open the source or ask AI to change this AppLab app.",
                  done: false,
                  createdAt: new Date().toISOString(),
                  doneAt: null
                },
                {
                  id: this.createId(),
                  title: "Try live data",
                  description: "Share the app, then update an item to see AppLab.onDataChange apply incoming JSON.",
                  done: false,
                  createdAt: new Date().toISOString(),
                  doneAt: null
                }
              ]
            };
          },

          applyData(data) {
            // Normalize saved JSON before the UI reads it. This keeps older or malformed data from breaking the app.
            const source = data && typeof data === "object" ? data : this.defaultData();
            const items = Array.isArray(source.items) ? source.items : [];
            this.state = {
              schemaVersion: 1,
              items: items.map((item) => ({
                id: typeof item.id === "string" ? item.id : this.createId(),
                title: typeof item.title === "string" && item.title.trim() ? item.title : "Untitled item",
                description: typeof item.description === "string" ? item.description : "",
                done: Boolean(item.done),
                createdAt: typeof item.createdAt === "string" ? item.createdAt : new Date().toISOString(),
                doneAt: typeof item.doneAt === "string" ? item.doneAt : null
              }))
            };
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
              if (this.saveInFlight === 0 && this.queuedRemoteData) {
                const queued = this.queuedRemoteData;
                this.queuedRemoteData = null;
                this.applyData(queued);
              }
            }
          },

          get visibleItems() {
            return this.state.items.filter((item) => this.ui.tab === "done" ? item.done : !item.done);
          },
          get countLabel() {
            return this.visibleItems.length + (this.visibleItems.length === 1 ? " item" : " items");
          },
          get dialogTitle() {
            return this.ui.editingId ? "Edit item" : "New item";
          },

          openItemDialog(id) {
            const item = this.state.items.find((candidate) => candidate.id === id);
            this.ui.editingId = item ? item.id : null;
            this.ui.titleDraft = item ? item.title : "";
            this.ui.descriptionDraft = item ? item.description : "";
            this.ui.confirmDelete = false;
            this.$refs.itemDialog.showModal();
          },
          saveItemDialog() {
            const title = this.ui.titleDraft.trim();
            if (!title) return;
            const item = this.state.items.find((candidate) => candidate.id === this.ui.editingId);
            if (item) {
              item.title = title;
              item.description = this.ui.descriptionDraft;
            } else {
              this.state.items.push({
                id: this.createId(),
                title,
                description: this.ui.descriptionDraft,
                done: false,
                createdAt: new Date().toISOString(),
                doneAt: null
              });
            }
            this.$refs.itemDialog.close();
            this.saveState();
          },
          deleteEditingItem() {
            this.state.items = this.state.items.filter((item) => item.id !== this.ui.editingId);
            this.$refs.itemDialog.close();
            this.saveState();
          },
          toggleItem(id) {
            const item = this.state.items.find((candidate) => candidate.id === id);
            if (!item) return;
            item.done = !item.done;
            item.doneAt = item.done ? new Date().toISOString() : null;
            this.saveState();
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
