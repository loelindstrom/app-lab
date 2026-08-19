# Developer Guide

This is the technical map of App Lab. It starts with shared vocabulary and architecture goals, maps those goals to top-level
modules, then points to deeper documents only where the design needs more explanation than the code can provide.

## Contents

- [Developer Guide](#developer-guide)
  - [Contents](#contents)
  - [Glossary](#glossary)
    - [In The Workspace](#in-the-workspace)
    - [Product Areas](#product-areas)
    - [When Sync Is Enabled](#when-sync-is-enabled)
  - [Architecture Goals](#architecture-goals)
  - [Architecture Map](#architecture-map)
  - [Modules](#modules)
    - [1. `src/ui`](#1-srcui)
    - [2. `src/runtime`](#2-srcruntime)
    - [3. `src/core`](#3-srccore)
    - [4. `src/sync`](#4-srcsync)
    - [5. `src/ai`](#5-srcai)
  - [Coordination Model](#coordination-model)
  - [Engineering Guide](#engineering-guide)
    - [Local Setup](#local-setup)
    - [Verification](#verification)
    - [Module Boundaries](#module-boundaries)
    - [Compatibility](#compatibility)
    - [Security And Deployment](#security-and-deployment)

## Glossary

### In The Workspace

- **App / generated app:** The apps that the user creates or generates with AI in AppLab.
- **Host:** The App Lab interface surrounding the generated apps.
- **Workspace / workspace manifest:** The collection/tracking of apps kept together by App Lab.
- **App source:** The complete HTML document that defines an app.
- **App data:** The JSON an app saves through `window.AppLab`.

### Product Areas

- **UI (`src/ui`):** The host interface and coordinator for user actions.
- **Runtime (`src/runtime`):** The sandbox (iFrame) where generated app's source code runs and communicates through `window.AppLab` with the core.
- **Core (`src/core`):** The `AppLabCore` contract for local persistence (IndexedDB) implementation.
- **Sync (`src/sync`):** Optional backup, sharing, and cross-device synchronization through `WorkspaceSyncActions`.
- **AI (`src/ai`):** The agent, AI conversation, and connection to an LLM.

### When Sync Is Enabled

- **Storage profile (`StorageProfile`):** The browser's connection to the user's storage provider (e.g. Firebase).
- **Room:** One encrypted remote (ie in the storage provider) unit containing a workspace manifest, app source, or app data.
- **Owned app:** An app created in the user's workspace.
- **Joined app:** An app imported from another user's invite.
- **Workspace sync material (`WorkspaceRecoveryMaterial` in code):** Sensitive text that lets another browser restore and continue
  syncing the workspace.

## Architecture Goals

Three choices shape App Lab's architecture:

1. **The local workspace must be useful on its own.** Persistence belongs to the browser and should work also when offline; sync and AI services extend it only
   when the user opts in.
2. **Generated source must run without becoming trusted host code.** Apps need to stay isolated from the rest of the AppLab workspace, but they need a narrow path to their own data.
3. **Optional integrations must not spread through the application.** Provider-specific details stay behind sync and AI
   contracts, and other modules interact with them only through those public boundaries.

The product-area map below shows where those responsibilities live. The sections after it then zoom into each area and explain
how work moves between them.

## Architecture Map

App Lab is divided into different product areas. These are always in use:

1. **UI** is the menu and host around generated apps. It coordinates user actions across the other areas.
2. **Runtime** is where generated app source runs and appears on screen. It only knows the values and callbacks supplied by UI.
3. **Core** stores app source, app data, and app metadata locally in IndexedDB.

These areas are optional and in use if the user sets up integration to a storage provider (for sync) or a LLM provider (for AI):

4. **Sync** extends App Lab's [local-first model](https://en.wikipedia.org/wiki/Local-first_software) with encrypted backup, app
   sharing, and cross-device sync through a storage provider (e.g. Firebase Realtime Database).
5. **AI** lets App Lab's own agent update app source directly by connecting it to an LLM provider (e.g. OpenRouter).

The diagram below has the above numbers written out. The arrows indicate how the different areas interact with each other.

```mermaid
flowchart TB
  subgraph manual["Manual AI workflow"]
    direction TB
    aimanual["<b>External AI chat</b>\nPrompt and source copied out and back"]
  end

  subgraph browser["<b>In the browser</b> (App Lab code lives fully client-side.)"]
    ui["<b>1. src/ui</b>\nThe UI shell surrounding the sandboxed apps"]
    core["<b>3. src/core</b>\nPersists apps and data locally"]
    runtime["<b>2. src/runtime</b>\nRuns generated apps in a sandbox"]
    subgraph optional["Optional for user to set up"]
        ai["<b>5. src/ai</b>\nAI agent and LLM integration"]
        sync["<b>4. src/sync</b>\nEnables sharing and cross-device sync"]
    end
  end

  subgraph integrations["Optional external services"]
    direction TB
    subgraph aiBox["AI provider"]
        openrouter["<b>LLM service</b>\nE.g. OpenRouter"]
    end
    subgraph syncBox["Storage provider"]
        firebase["<b>Remote storage</b>\nE.g. Firebase RTDB"]
    end
  end

  ui <--> runtime
  ui <--> core
  ui <--> sync
  sync <--> core
  sync <--> syncBox
  ui <--> ai
  ai <--> core
  ai <--> aiBox
  ui <--> aimanual
```

## Modules

### 1. `src/ui`

**Purpose:** Coordinate user actions and render the workspace around the active app.

**Owns:** React state, launcher and app views, tools, dialogs, and the ordering of local and optional remote actions.

Keeping that coordination in UI lets runtime remain callback-driven and makes remote work an explicit extension of a local save.

### 2. `src/runtime`

**Purpose:** Run generated source without giving it access to the host application.

**Owns:** Sandbox document construction, iframe capabilities, the `window.AppLab` bridge (which lets the sandboxed app communicate with the host/core via `postMessage` to save and subscribe to data changes), console forwarding, and host-compiled
Tailwind support.

The sandbox and narrow bridge are how generated code remains useful without becoming trusted host code.

[Read the runtime design](./runtime.md)

### 3. `src/core`

**Purpose:** Provide the local source of truth for apps and their JSON data.

**Owns:** `AppLabCore`, app records, HTML metadata, IndexedDB persistence, and the in-memory test implementation.

Keeping persistence here is what makes the workspace useful before sync or AI has been configured.

### 4. `src/sync`

**Purpose:** Extend the local workspace with encrypted backup, device sync, and app sharing.

**Owns:** The public sync actions, local sync metadata, durable queues, encrypted rooms, provider adapters, invites, recovery, and
conflict policy.

Its facade and provider boundary add remote behavior without making core or UI depend on a particular storage provider.

[Read the sync design](./sync.md)

### 5. `src/ai`

**Purpose:** Bring the current external-AI workflow into App Lab through an LLM provider (e.g. OpenRouter).

**Owns:** AI configuration, per-app conversations, bounded model context, and the agent loop.

Keeping the agent behind its own contract will make AI optional and keep model credentials away from generated apps.

[Read the AI integration brief](./ai-integration.md)

## Coordination Model

The architecture map explains what each product area owns. The flows below explain where a workflow is coordinated.

`App.tsx` is the composition root: it creates one `AppLabCore`, uses it to create `WorkspaceSyncActions`, and passes both
`AppLabCore` and `WorkspaceSyncActions` to UI. App Lab then uses explicit commands and callbacks rather than a global event bus:

```text
Manual source edit (user clicks "Save" in source code view):
      UI -> runtime compiler -> core -> sync

Remote source update (e.g. another user makes a change to the source code of an app):
      Storage provider (e.g. Firebase) -> sync -> core -> UI -> runtime

Generated app data (user clicks a button in app which changes app's data):
        runtime -> UI callback -> core -> sync
```

UI coordinates user-originated actions and updates React state. Sync coordinates provider-originated subscriptions, queue workers,
and reconciliation; it writes accepted remote changes through the same `AppLabCore` object and then calls UI. Runtime only knows
the app values and callbacks supplied to it.

This flow preserves the architecture goals during actual use: edits reach the local source of truth first, generated code receives
only narrow callbacks, and provider work enters through the sync contract. Core does not broadcast every IndexedDB write; keeping
write origins explicit also avoids sync loops. As workflows grow, shared commands can be extracted from UI, but the module
ownership and explicit flow should remain.

## Engineering Guide

### Local Setup

```bash
pnpm install
pnpm hooks:install
pnpm dev
```

`pnpm hooks:install` activates the tracked pre-commit hook for this clone.

### Verification

```bash
pnpm check
pnpm test:e2e
```

`pnpm check` enforces module boundaries, runs unit tests and TypeScript, and builds the production app. `pnpm test:e2e` runs local
browser workflows without Firebase credentials.

Real Firebase checks load `.env.test.local`; copy its shape from
[`.env.test.local.example`](../.env.test.local.example):

```bash
pnpm test:firebase-smoke
pnpm test:firebase-e2e
```

The smoke suite checks low-level provider and RTDB-rule behavior. The Firebase E2E suite checks complete browser workflows such
as offline edits, live updates, deletion, recovery, and workspace conflicts.

### Module Boundaries

Production code outside a top-level module must import through that module's `index.ts`. Tests may reach internals for focused
coverage. `pnpm deps:check` enforces the boundary, including type-only imports.

Generate a compact module graph with `pnpm deps:graph` or a file-level graph with `pnpm deps:graph:files`. Both outputs are ignored
by Git.

### Compatibility

Treat persisted and shared formats as contracts, even when TypeScript types make a code change look local:

- IndexedDB database names, versions, app records, and queue records may outlive a release.
- Invite, recovery, encrypted-room, and workspace-manifest payloads may be opened by another version or browser.
- `window.AppLab` is the generated-app API and should remain backward compatible.
- Firebase rule changes must preserve access for existing apps or include an explicit migration path.

Prefer additive parsing and migrations over silently changing stored shapes. Compatibility-sensitive changes deserve tests using
older serialized examples and, for sync, the real Firebase suites.

### Security And Deployment

[Security](../SECURITY.md) defines the trust model and sensitive material. [Deployment](./deploy.md) explains the static GitHub
Pages release process. The [backlog](./backlog.md) records current planning but is not part of the required reading path.
