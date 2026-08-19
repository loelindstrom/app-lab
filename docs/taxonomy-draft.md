# App Lab Taxonomy (Draft)

> Temporary design aid. This document describes the system as it exists today so the taxonomy and folder boundaries can be
> reviewed before any restructuring is proposed.

A taxonomy answers **what belongs to what**. It is not a call graph: communication between branches is listed separately under
[Main flows](#main-flows).

## Whole System

```text
App Lab
├── Browser
│   ├── Trusted App Lab host (React + TypeScript)
│   │   ├── Composition
│   │   ├── UI
│   │   ├── Core
│   │   ├── Runtime host controllers
│   │   ├── Sync (optional behavior)
│   │   ├── AI (planned optional behavior)
│   │   └── Shared JSON value primitive
│   ├── Generated-app iframe (untrusted)
│   ├── Tailwind compiler iframe (isolated, short-lived)
│   └── Browser-owned state
│       ├── IndexedDB: app source, metadata, compiled CSS, and app data
│       ├── IndexedDB: pending sync operations
│       ├── localStorage: sync configuration and room relationships
│       └── React memory: current screen, active app, status, and subscriptions
└── Optional external services
    ├── Storage provider (currently Firebase Realtime Database)
    ├── LLM provider (OpenRouter is planned)
    └── External AI chat used by the current manual workflow
```

The browser contains three different execution contexts. The trusted React host can access local state and optional service
configuration. The generated-app iframe can run an app but cannot access the host. The Tailwind compiler iframe can process a
sanitized view of an app's styling candidates but cannot run the generated app in the host.

## Source Ownership

```text
src/
├── main.tsx and App.tsx
│   └── Start React and compose the long-lived module contracts
├── ui/
│   ├── Render the launcher, active app shell, tools, and dialogs
│   └── Coordinate user-originated workflows
├── core/
│   ├── Define AppLabCore
│   ├── Persist app records and app-owned JSON data
│   └── Provide production IndexedDB and in-memory test implementations
├── runtime/
│   ├── Build and supervise the generated-app iframe
│   ├── Inject the AppLab API, Alpine, CSP, and compiled CSS
│   └── Compile Tailwind in a second sandboxed iframe
├── sync/
│   ├── Expose WorkspaceSyncActions
│   ├── Own sync-only local state and the durable remote-work queue
│   ├── Encrypt, reconcile, and subscribe to remote rooms
│   ├── Encode app invites and workspace recovery material
│   └── Adapt the room contract to a storage provider
├── ai/ (planned)
│   └── Own model configuration, chat, and the bounded agent loop
└── jsonData.ts
    └── Define and normalize the JSON value shared by core and sync
```

`App.tsx` is the composition root:

```text
createIndexedDbCore() ───────────────┐
          │                          │
          ├──> createBrowserWorkspaceSyncActions(core)
          │                          │
          └──────────────┬───────────┘
                         v
             WorkspaceShell(core, syncActions)
```

UI and sync therefore receive the same `AppLabCore` object. UI uses it for local user actions. Sync uses it to read current local
state for queued uploads and to persist accepted remote updates. Runtime does not receive `AppLabCore`; UI gives it narrower data
callbacks.

## State Ownership

### Local State

| Owner | Browser location | Contains | Why it is separate |
| --- | --- | --- | --- |
| Core | IndexedDB `app-lab-v2` | App records: id, metadata, complete HTML source, compiled CSS, and timestamps | These are the apps the user can open and edit locally. |
| Core | IndexedDB `app-lab-v2` | JSON data saved by each generated app | App data has a different update lifecycle from source. |
| Sync registry | `localStorage` key `app-lab-workspace-sync-v1` | Storage profile, workspace id, manifest capability, per-app room relationships, observed versions, and deletion tombstones | This describes how local apps relate to remote rooms; it is not app content. |
| Sync queue | IndexedDB `app-lab-sync-queue-v1` | Pending room creation, source/data saves, deletion, and manifest saves | Remote work must survive reloads and offline periods without blocking local saves. |
| UI | React memory | Active app, launcher list, tool state, console entries, sync display state, and active subscriptions | This is current presentation state and can be reconstructed. |
| AI (planned) | To be decided | Local provider configuration and per-app chat | The AI brief currently proposes local-first chat with optional sync. |

The two IndexedDB databases have different owners and durability purposes. Core's database is product state and remains useful
without sync. The queue database is transport state: it records remote work that still needs to happen.

### Remote State

```text
Remote sync state
├── One workspace-manifest room per synced workspace
│   ├── Workspace identity and storage profile
│   ├── Per-app room relationships and observed versions
│   └── Deletion tombstones
└── One room pair for each synced app
    ├── One app-package room
    │   └── App metadata, complete HTML source, and compiled CSS
    └── One app-data room
        └── JSON saved by the generated app
```

The workspace manifest belongs to sync, not core. It is an encrypted remote mirror of the sync registry information needed to
reconstruct a workspace on another browser. It references app rooms; it does not replace the app source and data stored in those
rooms or the local records in core.

Owned app rooms use the workspace's configured provider. Joined app records can point to the owner's provider carried in the
invite instead.

Every room has a local `RoomCapability`: its id, decryption secret, access material, and last observed version. The storage
provider receives encrypted payloads and access-token hashes, not plaintext app content or decryption secrets.

## Runtime Ownership

```text
Trusted host
├── SandboxFrame.tsx
│   ├── React component that owns the visible iframe element
│   ├── Creates one capability for each app load
│   ├── Checks messages from that exact iframe window
│   └── Calls host-supplied data and console callbacks
├── sandboxDocument.ts
│   └── Turns stored app source into the restricted iframe srcdoc
└── tailwindCompiler.ts
    └── Owns a hidden compiler iframe and returns static CSS

Generated-app iframe
├── User/AI-authored HTML, CSS, and scripts
├── Host-defined Content Security Policy
├── Host-injected Alpine runtime
├── Host-injected static compiled CSS
└── Host-injected window.AppLab API
```

`window.AppLab` is a generated-app API, not a direct reference to core. Its implementation sends `postMessage` requests to
`SandboxFrame`; accepted requests invoke callbacks supplied by UI, which then use core and optional sync.

## Public Contracts

```text
AppLabCore
└── Local app and app-data persistence used by UI and sync

Runtime exports
├── SandboxFrame
└── compileAppStyles

WorkspaceSyncActions
└── Product-level sync operations used by UI

RealtimeSyncProvider (internal to sync)
└── Provider-neutral encrypted room operations

window.AppLab
└── Generated-app methods: getData, saveData, onDataChange, and onError

AI contract (planned)
└── Agent operations using host-supplied source and console tools
```

Top-level modules expose their production contracts through `index.ts`. Dependency-cruiser prevents production code from
reaching into another module's implementation files.

## Main Flows

```text
Manual source save
UI -> runtime compiler -> core -> sync queue -> storage provider

Generated app saves data
window.AppLab -> postMessage -> SandboxFrame -> UI callback -> core -> sync queue -> storage provider

Remote source update
storage provider -> sync subscription -> core -> UI callback -> SandboxFrame rebuild

Remote app-data update
storage provider -> sync subscription -> core -> UI callback -> postMessage -> window.AppLab.onDataChange

Workspace restore
recovery material -> sync manifest room -> sync registry -> app rooms -> core -> UI refresh
```

These are explicit commands and callbacks. IndexedDB is not used as a global event bus, which keeps the origin of each write
visible and avoids sending an incoming remote write back out as a new local edit.

## Taxonomy Versus Current Folders

The current top-level folders mostly describe product responsibilities, but the taxonomy exposes several useful questions:

- **`src/core` is a clear ownership boundary but a broad name.** Its actual responsibility is local app persistence. Renaming it
  could improve discovery, but would touch a stable public contract without changing behavior.
- **`src/runtime` contains trusted host code, not the sandbox itself.** It creates two sandboxed execution contexts. Documentation
  may solve this naming ambiguity without a code move.
- **`src/ui` owns rendering and application orchestration.** This is workable for the MVP, but the reusable manual/AI source-save
  workflow may eventually justify a small application-command layer.
- **`src/sync/workspace` means sync metadata about a workspace.** It does not own the local apps; core does. Keeping that
  distinction explicit may be enough without renaming it.
- **IndexedDB is a technology used by two owners.** Moving all IndexedDB code into one folder would mix durable product state with
  transport state merely because they share a browser API.
- **There is one shared primitive today.** `src/jsonData.ts` is used by core and sync. A `common/` folder would become useful only
  if more genuinely ownerless primitives appear.
- **`src/ai` is still prescriptive.** Its proposed boundary should be validated when the first implementation slice introduces
  real source-save and chat dependencies.

Folder changes should follow demonstrated ownership problems in this model. The taxonomy should not be changed merely to make
the folder tree look symmetrical.
