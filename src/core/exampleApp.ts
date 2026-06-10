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
        padding: 28px;
      }
      main { display: grid; gap: 18px; max-width: 760px; }
      h1 { font-size: clamp(42px, 10vw, 84px); letter-spacing: -0.04em; line-height: .92; margin: 0; }
      p { color: #a7b5c2; font-size: 18px; line-height: 1.55; margin: 0; }
      section {
        background: #121e2b;
        border: 1px solid #334155;
        border-radius: 16px;
        display: grid;
        gap: 14px;
        padding: 16px;
      }
      label { color: #cbd5e1; display: grid; gap: 8px; font-weight: 800; }
      textarea {
        background: #172333;
        border: 1px solid #334155;
        border-radius: 10px;
        color: #f8fafc;
        font: inherit;
        min-height: 160px;
        padding: 14px;
        resize: vertical;
      }
      button {
        background: #8b5cf6;
        border: 0;
        border-radius: 999px;
        color: white;
        cursor: pointer;
        font: inherit;
        font-weight: 850;
        justify-self: start;
        min-height: 40px;
        padding: 0 18px;
      }
      output { color: #93c5fd; min-height: 22px; }
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
      .counter { align-items: center; display: flex; flex-wrap: wrap; gap: 12px; }
      .counter strong { color: #f8fafc; font-size: 44px; min-width: 72px; }
    </style>
  </head>
  <body>
    <main>
      <header>
        <h1>Sandbox notes</h1>
        <p>This app persists JSON through the AppLab helper and updates live when shared data changes remotely.</p>
      </header>

      <section>
        <div class="bar">
          <p class="hint">Persisted counter</p>
          <span id="live" class="badge">Live data ready</span>
        </div>
        <div>
          <div class="counter">
            <strong id="count">0</strong>
            <button id="increment" type="button">+1 and save</button>
          </div>
        </div>

        <label>
          Saved note
          <textarea id="note" placeholder="Write something, save, then reload the page."></textarea>
        </label>

        <button id="save" type="button">Save note</button>
      </section>

      <output id="status">Loading saved data...</output>
      <p class="hint">Contract: load with AppLab.getData(fallback), save with AppLab.saveData(json), and react to shared updates with AppLab.onDataChange(handler).</p>
    </main>

    <script>
      "use strict";

      const note = document.querySelector("#note");
      const count = document.querySelector("#count");
      const increment = document.querySelector("#increment");
      const save = document.querySelector("#save");
      const status = document.querySelector("#status");
      const live = document.querySelector("#live");
      const state = { count: 0, note: "", savedAt: null };
      Object.seal(state);

      AppLab.onError((message) => {
        status.textContent = "Error: " + message;
      });

      function normalizeData(data) {
        return {
          count: Number(data && data.count || 0),
          note: data && typeof data.note === "string" ? data.note : "",
          savedAt: data && typeof data.savedAt === "string" ? data.savedAt : null
        };
      }

      function applyData(data, source) {
        const next = normalizeData(data);
        const noteWasFocused = document.activeElement === note;
        state.count = next.count;
        state.note = next.note;
        state.savedAt = next.savedAt;
        render({ preserveDraft: noteWasFocused && source === "remote" });
      }

      function render(options = {}) {
        count.textContent = String(state.count);
        if (!options.preserveDraft) note.value = state.note;
        live.textContent = state.savedAt ? "Last saved " + new Date(state.savedAt).toLocaleTimeString() : "Live data ready";
      }

      async function loadState() {
        status.textContent = "Loading saved data...";
        const saved = await AppLab.getData({ count: 0, note: "" });
        applyData(saved, "load");
        status.textContent = "Loaded.";
      }

      async function saveState(statusText) {
        status.textContent = statusText;
        await AppLab.saveData({
          count: state.count,
          note: state.note,
          savedAt: new Date().toISOString()
        });
        status.textContent = "Saved.";
      }

      AppLab.onDataChange((nextData, info) => {
        applyData(nextData, "remote");
        status.textContent = "Live update received" + (info && info.version ? " v" + info.version : "") + ".";
      });

      increment.addEventListener("click", () => {
        state.count += 1;
        render();
        saveState("Saving counter...");
      });

      save.addEventListener("click", () => {
        state.note = note.value;
        saveState("Saving...");
      });

      loadState();
    </script>
  </body>
</html>`;
