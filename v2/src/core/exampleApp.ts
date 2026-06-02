import type { CreateAppInput } from "./types";

export function createExampleAppInput(name = "Example App"): CreateAppInput {
  return {
    name,
    description: "Sandbox app with host-mediated persistence.",
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
      .hint { color: #94a3b8; font-size: 14px; }
    </style>
  </head>
  <body>
    <main>
      <header>
        <h1>Sandbox notes</h1>
        <p>This app cannot access host storage directly. It persists data by sending simple messages to App Lab.</p>
      </header>

      <label>
        Saved note
        <textarea id="note" placeholder="Write something, save, then reload the page."></textarea>
      </label>

      <button id="save" type="button">Save note</button>
      <output id="status">Loading saved data...</output>
      <p class="hint">Persistence contract: include window.__APP_LAB_CAPABILITY__, send GET_MY_DATA on load, then SAVE_MY_DATA with JSON data.</p>
    </main>

    <script>
      const appLabCapability = window.__APP_LAB_CAPABILITY__;
      const note = document.querySelector("#note");
      const save = document.querySelector("#save");
      const status = document.querySelector("#status");
      const pending = new Map();

      function request(type, payload = {}) {
        const requestId = crypto.randomUUID();
        pending.set(requestId, type);
        window.parent.postMessage({ type, requestId, appLabCapability, payload }, "*");
        return requestId;
      }

      window.addEventListener("message", (event) => {
        const message = event.data;
        if (!message || typeof message !== "object") return;

        if (message.type === "MY_DATA" && pending.get(message.requestId) === "GET_MY_DATA") {
          pending.delete(message.requestId);
          note.value = message.payload?.data?.note || "";
          status.textContent = "Loaded.";
        }

        if (message.type === "MY_DATA_SAVED" && pending.get(message.requestId) === "SAVE_MY_DATA") {
          pending.delete(message.requestId);
          status.textContent = "Saved.";
        }

        if (message.type === "MY_DATA_SAVE_FAILED" && pending.get(message.requestId) === "SAVE_MY_DATA") {
          pending.delete(message.requestId);
          status.textContent = message.payload?.error || "Could not save.";
        }
      });

      save.addEventListener("click", () => {
        status.textContent = "Saving...";
        request("SAVE_MY_DATA", { data: { note: note.value, savedAt: new Date().toISOString() } });
      });

      request("GET_MY_DATA");
    </script>
  </body>
</html>`;
