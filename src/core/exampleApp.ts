import type { CreateAppInput } from "./types";

export function createExampleAppInput(name = "Example App"): CreateAppInput {
  return {
    name,
    description: "Sandbox app with persistence and live shared data.",
    sourceCode: EXAMPLE_APP_SOURCE,
  };
}

export const EXAMPLE_APP_SOURCE = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Example App</title>
    <style>
      * { box-sizing: border-box; }
      body {
        background: #101923;
        color: #e7edf3;
        font-family: Inter, ui-sans-serif, system-ui, sans-serif;
        margin: 0;
        min-height: 100vh;
        padding: 24px;
      }
      main { display: grid; gap: 18px; max-width: 760px; }
      h1 { font-size: clamp(38px, 9vw, 76px); letter-spacing: -0.04em; line-height: .94; margin: 0; }
      p { color: #a7b5c2; font-size: 17px; line-height: 1.55; margin: 0; }
      section {
        background: #121e2b;
        border: 1px solid #334155;
        border-radius: 16px;
        display: grid;
        gap: 14px;
        padding: 16px;
      }
      label { color: #cbd5e1; display: grid; gap: 8px; font-weight: 800; }
      input {
        background: #172333;
        border: 1px solid #334155;
        border-radius: 999px;
        color: #f8fafc;
        font: inherit;
        min-height: 44px;
        padding: 0 14px;
      }
      button {
        background: #8b5cf6;
        border: 0;
        border-radius: 999px;
        color: white;
        cursor: pointer;
        font: inherit;
        font-weight: 850;
        min-height: 40px;
        padding: 0 16px;
      }
      button.secondary {
        background: transparent;
        border: 1px solid #334155;
        color: #dbeafe;
      }
      output { color: #93c5fd; min-height: 22px; }
      ul { display: grid; gap: 10px; list-style: none; margin: 0; padding: 0; }
      li {
        align-items: center;
        background: #172333;
        border: 1px solid #334155;
        border-radius: 14px;
        display: grid;
        gap: 10px;
        grid-template-columns: minmax(0, 1fr) auto auto;
        padding: 12px;
      }
      li.done span { color: #94a3b8; text-decoration: line-through; }
      .bar { align-items: center; display: flex; flex-wrap: wrap; gap: 10px; justify-content: space-between; }
      .badge {
        background: #172333;
        border: 1px solid #334155;
        border-radius: 999px;
        color: #c4b5fd;
        font-size: 13px;
        font-weight: 850;
        padding: 7px 10px;
      }
      .hint { color: #94a3b8; font-size: 14px; }
      .new-row { display: grid; gap: 10px; grid-template-columns: minmax(0, 1fr) auto; }
      @media (max-width: 520px) {
        body { padding: 18px; }
        .new-row { grid-template-columns: 1fr; }
        li { grid-template-columns: minmax(0, 1fr); }
        li button { justify-self: start; }
      }
    </style>
  </head>
  <body>
    <main>
      <header>
        <h1>Sandbox checklist</h1>
        <p>This app persists JSON through AppLab and updates live when shared data changes remotely.</p>
      </header>

      <section>
        <div class="bar">
          <p class="hint">Persisted records with stable IDs</p>
          <span id="live" class="badge">Live data ready</span>
        </div>

        <div class="new-row">
          <label>
            New item
            <input id="draft" autocomplete="off" placeholder="Add something to remember">
          </label>
          <button id="add" type="button">Add</button>
        </div>

        <ul id="items" aria-label="Saved items"></ul>
      </section>

      <output id="status">Loading saved data...</output>
      <p class="hint">Contract: AppLab.getData(fallback), AppLab.saveData(json), and AppLab.onDataChange(handler). Current sync is latest-local-wins; stable item IDs prepare this data for richer merging later.</p>
    </main>

    <script>
      "use strict";

      const draft = document.querySelector("#draft");
      const add = document.querySelector("#add");
      const list = document.querySelector("#items");
      const status = document.querySelector("#status");
      const live = document.querySelector("#live");
      const state = { schemaVersion: 1, items: [], savedAt: null };
      let saveInFlight = 0;
      Object.seal(state);

      AppLab.onError((message) => {
        status.textContent = "Error: " + message;
      });

      function createId() {
        if (window.crypto && typeof window.crypto.randomUUID === "function") return window.crypto.randomUUID();
        return "id_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2);
      }

      function normalizeData(data) {
        const sourceItems = Array.isArray(data && data.items) ? data.items : [];
        return {
          schemaVersion: 1,
          items: sourceItems
            .filter((item) => item && typeof item === "object")
            .map((item) => ({
              id: typeof item.id === "string" ? item.id : createId(),
              text: typeof item.text === "string" ? item.text : "",
              done: Boolean(item.done),
              createdAt: typeof item.createdAt === "string" ? item.createdAt : new Date().toISOString()
            }))
            .filter((item) => item.text.trim()),
          savedAt: data && typeof data.savedAt === "string" ? data.savedAt : null
        };
      }

      function applyData(data, source) {
        const next = normalizeData(data);
        const draftWasFocused = document.activeElement === draft;
        state.items = next.items;
        state.savedAt = next.savedAt;
        render({ preserveDraft: draftWasFocused && source === "remote" });
      }

      function render(options = {}) {
        list.replaceChildren();
        if (!options.preserveDraft && state.items.length === 0) draft.value = "";

        for (const item of state.items) {
          const row = document.createElement("li");
          if (item.done) row.classList.add("done");

          const text = document.createElement("span");
          text.textContent = item.text;

          const toggle = document.createElement("button");
          toggle.className = "secondary";
          toggle.type = "button";
          toggle.textContent = item.done ? "Undo" : "Done";
          toggle.addEventListener("click", () => {
            item.done = !item.done;
            render({ preserveDraft: true });
            saveState("Saving item...");
          });

          const remove = document.createElement("button");
          remove.className = "secondary";
          remove.type = "button";
          remove.textContent = "Delete";
          remove.addEventListener("click", () => {
            state.items = state.items.filter((candidate) => candidate.id !== item.id);
            render({ preserveDraft: true });
            saveState("Deleting item...");
          });

          row.append(text, toggle, remove);
          list.append(row);
        }

        if (state.items.length === 0) {
          const empty = document.createElement("li");
          const text = document.createElement("span");
          text.className = "hint";
          text.textContent = "No saved items yet.";
          empty.append(text);
          list.append(empty);
        }

        live.textContent = state.savedAt ? "Last saved " + new Date(state.savedAt).toLocaleTimeString() : "Live data ready";
      }

      async function loadState() {
        status.textContent = "Loading saved data...";
        const saved = await AppLab.getData({ schemaVersion: 1, items: [], savedAt: null });
        applyData(saved, "load");
        status.textContent = "Loaded.";
      }

      async function saveState(statusText) {
        status.textContent = statusText;
        state.savedAt = new Date().toISOString();
        saveInFlight += 1;
        try {
          await AppLab.saveData({
            schemaVersion: state.schemaVersion,
            items: state.items,
            savedAt: state.savedAt
          });
          live.textContent = "Last saved " + new Date(state.savedAt).toLocaleTimeString();
          status.textContent = "Saved.";
        } finally {
          saveInFlight -= 1;
        }
      }

      AppLab.onDataChange((nextData, info) => {
        if (saveInFlight > 0) {
          status.textContent = "Kept local edit while saving.";
          return;
        }
        applyData(nextData, "remote");
        status.textContent = "Live update received" + (info && info.version ? " v" + info.version : "") + ".";
      });

      add.addEventListener("click", () => {
        const text = draft.value.trim();
        if (!text) return;
        state.items = [
          ...state.items,
          { id: createId(), text, done: false, createdAt: new Date().toISOString() }
        ];
        draft.value = "";
        render({ preserveDraft: true });
        saveState("Saving new item...");
      });

      draft.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          add.click();
        }
      });

      loadState();
    </script>
  </body>
</html>`;
