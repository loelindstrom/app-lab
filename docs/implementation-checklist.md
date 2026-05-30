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

- [ ] Add host-owned settings.
  - [ ] Store AI provider configuration locally.
  - [ ] Keep API keys outside iframe memory.
- [ ] Add the Manager AI harness.
  - [ ] Implement provider adapter.
  - [ ] Implement `list_apps`.
  - [ ] Implement `read_app_code`.
  - [ ] Implement `write_app_code`.
  - [ ] Implement `create_app`.

## Later

- [ ] Sync app registry and data across devices.
- [ ] Define app-to-app communication only after real user workflows justify it.
- [ ] Explore in-app AI proxying after the manager workflow is stable.
