# Implementation Checklist

## Phase 1: Kernel Skeleton

- [x] Create a static host shell.
  - [x] Add `index.html`.
  - [x] Add a single sandboxed iframe with `sandbox="allow-scripts"`.
  - [x] Add host-owned controls outside the iframe.
- [x] Create the browser kernel.
  - [x] Add `kernel.js`.
  - [x] Open and migrate IndexedDB.
  - [x] Create `apps_registry`.
  - [x] Create `apps_data`.
- [x] Prove app loading.
  - [x] Seed app `menu` if it does not exist.
  - [x] Seed one dummy app if it does not exist.
  - [x] Load `menu` on boot.
  - [x] Switch iframe content from registry HTML.
- [x] Prove safe host/app communication.
  - [x] Add a narrow `postMessage` listener.
  - [x] Validate messages by iframe `contentWindow`.
  - [x] Let apps request the app list.
  - [x] Let apps request navigation without trusting iframe-provided app identity.
- [x] Prepare the kernel for iteration.
  - [x] Move built-in app HTML out of `kernel.js`.
  - [x] Mark `kernel.js` sections by kernel module.
  - [x] Add seed versioning for built-in registry apps.

## Phase 2: App Data Plumbing

- [x] Add app-owned data access.
  - [x] Implement `GET_MY_DATA`.
  - [x] Implement `SAVE_MY_DATA`.
  - [x] Bind data access to the kernel's active app id.
  - [x] Add a test notes app that persists text.

## Phase 3: Manager AI

- [x] Add host-owned settings.
  - [x] Store OpenRouter configuration locally.
  - [x] Keep API keys outside iframe memory.
- [x] Add the per-app Builder Agent.
  - [x] Add host-level builder chat UI.
  - [x] Keep builder conversation history in memory only.
  - [x] Implement OpenRouter Chat Completions calls.
  - [x] Implement `read_current_app_code`.
  - [x] Implement `write_current_app`.
  - [x] Auto-reload the iframe after writes.
- [x] Add blank app creation.
  - [x] Add a host-level New App button.
  - [x] Create a blank registry app.
  - [x] Open the builder for the new app.

## Later

- [ ] Sync app registry and data across devices.
- [ ] Define app-to-app communication only after real user workflows justify it.
- [ ] Explore in-app AI proxying after the manager workflow is stable.
