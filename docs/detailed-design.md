# App Lab Detailed Design

This document maps directly to the section comments in the JavaScript modules. The goal is that a reader can start with `src/main.js`, see the production entry point, then jump into `src/app.js` and use the section headers to find the relevant behavior.

## `src/main.js`

`main.js` is the production bootstrap. It should stay tiny and should not contain subsystem logic or diagnostics.

It imports `createAppLab` from `src/app.js` and starts the app.

Design rule: production-only startup belongs here; dependency wiring belongs in `src/app.js`; test hooks belong under `tests/`.

## `src/app.js`

`app.js` is the composition root. It creates the host modules, wires dependencies, binds host events, and exposes the started objects to controlled callers such as the smoke-test entry point.

Sections:

- `Composition root`: creates the platform, shell, BuilderAI UI, and BuilderAI agent objects, then wires their dependencies together.
- `Boot lifecycle`: opens IndexedDB, installs seed apps, and loads Home.
- `Host event wiring`: attaches DOM events to shell, builder, settings, and RPC handlers.

Design rule: if code starts to describe storage, BuilderAI internals, settings behavior, or RPC handling, it belongs outside `app.js`. If code exposes test-only capabilities, it belongs under `tests/`.

## `src/platform.js`

`platform.js` is the privileged browser boundary. It owns browser storage, app loading, and the host/app message firewall.

Sections:

- `Seed app manifest`: declares the built-in registry apps loaded from `seed-apps/`.
- `Platform state and lifecycle hooks`: tracks the active app and lets the shell/builder react after app loads.
- `IndexedDB connection and request helpers`: opens database `app-lab`, creates stores, wraps IDB requests, and creates transactions.
- `Host-owned system configuration`: reads and writes OpenRouter settings in `system_config`.
- `App registry`: lists, reads, and writes app records in `apps_registry`.
- `Active app data`: reads and writes normalized JSON data in `apps_data` for the current active app, with a 1MB serialized payload limit.
- `Iframe app loading`: parses app HTML, removes app-supplied CSP meta tags, injects the enforced app CSP and per-load RPC capability, puts the active app HTML into the sandbox iframe via `srcdoc`, and reloads the active app after unexpected iframe navigation.
- `Host/app RPC boundary`: accepts only messages from the active iframe `contentWindow` with the current per-load capability, then handles `LIST_APPS`, `NAVIGATE_APP`, `GET_MY_DATA`, and `SAVE_MY_DATA`.
- `Seed app installation`: fetches built-in app HTML and installs or updates seed records.

Design rule: `platform.js` exposes capabilities; other modules should call it rather than reaching directly into IndexedDB or the iframe.

## `src/shell.js`

`shell.js` owns host UI behavior that is not BuilderAI-specific.

Sections:

- `Host DOM bindings`: defines required selectors and fails early if host markup is missing.
- `Shared shell helpers`: currently HTML escaping used by generated blank app HTML.
- `Active app chrome`: syncs the title, home/back button, shell mode classes, and mobile builder bar visibility.
- `Navigation and side menu`: handles Home/back behavior, side menu open/close, and settings entry from the side menu.
- `Blank app creation`: creates a new registry app with a starter HTML document, loads it, and opens BuilderAI.
- `Settings dialog`: loads/saves OpenRouter config and fetches the model list for the datalist.

Design rule: `shell.js` may coordinate platform and builder UI actions, but it should not implement storage or agent logic itself.

## `src/builder/ui.js`

`builder/ui.js` owns BuilderAI presentation and local chat UI state.

Sections:

- `Builder UI state`: tracks the current builder app id, in-memory messages, progress lines, and busy state.
- `App switching lifecycle`: resets chat history when the active app changes.
- `Builder drawer controls`: opens/closes the panel, updates desktop/mobile toggle state, and keeps labels current.
- `Chat message rendering`: renders system/user/assistant messages and keeps transient progress at the bottom.
- `Busy/progress display`: disables input while the agent runs, shows progress lines, and renders the animated loader.
- `Builder form submission`: persists the user message in memory, runs the agent, handles errors, and restores focus.

Design rule: this file should not know how OpenRouter works or how app records are stored. It displays BuilderAI state and delegates execution through the injected agent runner.

## `src/builder/agent.js`

`builder/agent.js` owns the BuilderAI reasoning loop and tool execution.

Sections:

- `Builder prompt`: defines the host-owned system prompt and generated-app constraints.
- `Tool schema`: exposes `read_current_app_code` and `write_current_app` to the model.
- `Tool execution`: implements those tools against the current active app through `platform`.
- `Agent loop`: sends messages to OpenRouter, streams final text into the UI, executes requested tools, and caps tool rounds.
- `Progress labels`: maps tool names to short user-visible progress text.

Design rule: tool execution should remain narrow. BuilderAI may read/write only the active app and should not expose general storage, config, or arbitrary host access.

## `src/builder/openrouter.js`

`builder/openrouter.js` owns OpenRouter-specific network and stream parsing behavior.

Sections:

- `Chat Completions request`: validates config, sends the OpenRouter request, enables streaming, and normalizes request errors.
- `Streaming response reader`: reads the response stream, splits Server-Sent Events, and returns the assembled assistant message.
- `SSE event parsing`: handles content deltas, reasoning/progress signals, and streamed tool-call deltas.
- `Model pricing display`: formats OpenRouter per-token prices as per-million-token labels.

Design rule: OpenRouter wire format details belong here. The agent loop should consume assembled messages and callbacks rather than parsing SSE itself.

## `seed-apps/`

Seed apps are ordinary iframe apps. They are not trusted just because they are bundled with the repository.

- `menu.html`: asks the host for `LIST_APPS` and renders app launch buttons, including the injected per-load capability in each RPC message.
- `notes.html`: asks for `GET_MY_DATA`, saves with `SAVE_MY_DATA`, includes the injected per-load capability in each RPC message, and keeps all persistence behind host RPC.

Design rule: seed apps should follow the same RPC contract as generated apps.

## `tests/`

Tests are dependency-free.

- `unit.mjs`: tests pure helpers and stream parsing.
- `smoke.mjs`: starts a static server, drives Chrome/Chromium via DevTools, and verifies cross-module behavior.
- `test-main.js`: local smoke-test entry point. It imports `src/app.js`, exposes `window.__appLabTest`, and refuses to run outside the local virtual smoke-test URL.

Design rule: browser smoke tests should cover user-visible integration points, while unit tests should cover deterministic parsing and helper behavior.
