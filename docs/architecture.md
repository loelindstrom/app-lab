# App Lab Architecture

App Lab is a static, browser-native workspace for local apps. The host owns storage, settings, BuilderAI, and the sandbox boundary. User apps run as HTML strings inside one sandboxed iframe.

There is no build step and no framework. Runtime code is vanilla ES modules loaded from `src/main.js`.

## Code Map

```text
index.html              Host markup, iframe, BuilderAI panel, settings dialog
styles.css              Host layout and responsive shell styling
src/main.js             Production bootstrap
src/app.js              Dependency wiring, boot lifecycle, event listeners
src/platform.js         Privileged storage, app loading, seed apps, RPC boundary
src/shell.js            Host UI behavior, settings UI, blank app creation
src/builder/ui.js       BuilderAI drawer, messages, streaming/progress UI
src/builder/agent.js    BuilderAI prompt, tools, tool loop
src/builder/openrouter.js
                        OpenRouter calls, SSE stream parsing, model price formatting
seed-apps/menu.html     Home app shown inside the iframe
seed-apps/notes.html    Example persisted app
tests/                  Dependency-free unit and browser smoke tests
resources/icons/        Favicon and web manifest assets
```

## Runtime Boundaries

The host page is trusted. It contains the top bar, side menu, settings dialog, BuilderAI chat, and the single app iframe.

Apps are untrusted. They are loaded through `iframe.srcdoc` with `sandbox="allow-scripts"` and without `allow-same-origin`. This gives app code a unique opaque origin and prevents direct access to host DOM, cookies, local storage, IndexedDB, and settings fields. Before loading, the host parses the app HTML, removes app-supplied CSP meta tags, injects the host CSP, and injects a per-load RPC capability. The CSP blocks network connections, remote resources, forms, frames, workers, and base URL rewriting. The host also reloads the active app after unexpected iframe navigation.

The platform boundary in `src/platform.js` is the stable privileged API. It owns:

- IndexedDB setup and access
- app registry records
- per-app data records
- OpenRouter config persistence
- seed app installation
- current app loading
- app CSP injection
- `postMessage` RPC validation

`src/app.js`, `src/shell.js`, and `src/builder/*` use the platform API instead of touching IndexedDB directly.

## Data Model

App Lab uses IndexedDB database `app-lab`, version `2`.

Stores:

- `apps_registry`: app metadata and executable HTML source.
- `apps_data`: JSON data owned by the currently active app.
- `system_config`: host-owned settings such as OpenRouter API key and model id.

Seed apps are defined in `src/platform.js` and loaded from `seed-apps/` on boot. Current seeds are:

- `menu`: the Home app launcher.
- `notes`: a small persisted notes app.

The Home app remains an iframe app by design for now. It lists apps by asking the host for `LIST_APPS`.

## Host/App RPC

Apps communicate with the host through `window.parent.postMessage`. The platform accepts messages only when `event.source` equals the active iframe's `contentWindow` and the message includes the current per-load `appLabCapability` value injected into the app document.

Supported app-to-host messages:

- `LIST_APPS`: returns `APPS_LIST` with registry summaries and the active app id.
- `NAVIGATE_APP`: loads another app by `appId`.
- `GET_MY_DATA`: returns `MY_DATA` for the active app.
- `SAVE_MY_DATA`: writes up to 1MB of JSON data for the active app and returns `MY_DATA_SAVED`, or `MY_DATA_SAVE_FAILED` when validation fails.

Apps never receive the OpenRouter API key and cannot request arbitrary host capabilities. The per-load RPC capability is an app/document binding guard, not a data-loss-prevention mechanism against the currently running app.

## BuilderAI

BuilderAI is host-owned UI and does not run inside the iframe.

`src/builder/ui.js` manages:

- drawer open/close state
- mobile bottom toggle state
- chat message rendering
- transient progress lines
- streaming assistant text

`src/builder/agent.js` manages:

- the BuilderAI system prompt
- `read_current_app_code`
- `write_current_app`
- the tool-calling loop

`src/builder/openrouter.js` manages OpenRouter chat requests and streaming Server-Sent Event parsing.

BuilderAI can read and write only the currently active app. Writes replace the app's complete HTML document in `apps_registry`, then reload the iframe.

## Tests

The tests intentionally avoid external dependencies.

- `node tests/unit.mjs` checks pure helpers such as stream parsing, token price formatting, tool activity labels, and HTML escaping.
- `node tests/smoke.mjs` starts a temporary static server, drives local Chrome/Chromium through DevTools, and verifies boot, seeded apps, Notes data RPC, mobile layout states, settings failure handling, blank app creation, and BuilderAI progress UI.

The smoke runner serves a virtual local-only page at `/__app_lab_test__.html` while `tests/smoke.mjs` is running. That page swaps the production bootstrap for `tests/test-main.js`, which exposes a small host-only `window.__appLabTest` surface for assertions.

There is no committed `index.test.html` file and `src/main.js` does not expose diagnostics. `tests/test-main.js` also refuses to run unless it is loaded from the local smoke-test URL.

## Static Assets

Reusable non-code resources live under `resources/`.

Current assets are favicons and the web manifest in `resources/icons/`. `index.html` references these paths explicitly, so no root-level favicon fallback is required.
