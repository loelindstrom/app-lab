# App Lab Architecture

App Lab is a React and TypeScript browser app for creating and running small sandboxed HTML/CSS/JavaScript apps. The shell is host-owned React UI. Generated apps run in sandboxed iframes and persist app-owned JSON data through host-mediated APIs.

The security model is pragmatic: App Lab protects host secrets, host UI, and other apps' data from generated apps. Generated apps can read their own saved data, so source inspection, backup, and future guardrails are product features rather than hard guarantees that arbitrary app code cannot disclose app-owned data.

## Core

`src/core` is headless browser-bound logic. It does not import React or render UI.

Responsibilities:

- app registry records: create, list, read, update, and delete apps
- per-app data: read/write normalized JSON with a size limit
- browser persistence through IndexedDB
- in-memory implementation for tests
- future export/import, sync, OpenRouter config, and BuilderAI service contracts

The browser core currently uses IndexedDB database `app-lab-v2`. That name is intentionally retained after the root-folder move so existing local apps and app data continue to load.

Core rules:

- APIs receive explicit ids and data objects
- returned values are plain serializable objects
- generated app source is stored as data, not executed by core
- app data is persisted as normalized JSON through host-mediated APIs, iframes do not have direct IndexedDB access

## Runtime

`src/runtime` owns the iframe boundary around generated apps.

Responsibilities:

- prepare sandbox HTML before iframe load
- inject the app CSP, runtime capability, `window.AppLab` helper, unload recovery, and console forwarding
- load active app source into the iframe
- validate app-to-host messages by iframe source and per-load capability
- route app data requests to core
- forward app console output to the host Console tool

Runtime security posture:

- `sandbox="allow-scripts"` without `allow-same-origin`
- injected app CSP blocks network, remote resources, forms, frames, workers, objects, and base URL rewriting
- app data RPC is scoped to the active app id chosen by the host
- app data is normalized JSON and limited by size
- generated apps should use `AppLab.getData()`, `AppLab.saveData()`, and `AppLab.onError()`

## UI

`src/ui` is the React view layer. Styling uses Tailwind CSS with pinned package versions.

The shell is a lightweight workspace frame:

- launcher lists apps and supports create, rename, description edit, delete, workspace sync entry, and app sharing entry
- active app remains the main surface
- desktop tools open as a right drawer
- mobile tools open as a bottom sheet with a compact dock
- Source is a host-owned editor for the app HTML
- Console shows sandbox logs/errors and makes them easy to copy
- BuilderAI is present as a placeholder for the future agent loop
- Settings is present as a placeholder for future host configuration

UI rules:

- React owns view state such as launcher/app mode, active app, selected tool, dialogs, and console entries
- UI calls core/runtime through explicit props and service objects
- UI does not access IndexedDB or OpenRouter directly
- host tools stay available around apps without turning the shell into a heavy dashboard

## Sync Plan

Sync is planned around encrypted rooms, explicit room capabilities, and a private workspace manifest. The goal is that a user can
restore an entire App Lab workspace on another device with one recovery key, while also sharing individual apps with friends.

The sync model has three concepts:

- workspace manifest: the user's private launcher state, encrypted with a workspace secret
- app package room: encrypted app source and app metadata
- app data room: encrypted JSON data used by `AppLab.getData()` and `AppLab.saveData()`

Private apps and shared apps use the same room mechanism. A private app is simply an app whose room secrets only appear in one
user's workspace manifest. A shared app appears in multiple users' workspace manifests, with each manifest containing the room
references and capabilities that user is allowed to use.

The workspace recovery key is high-entropy generated material, not a user-chosen password in the first implementation. It unlocks
the encrypted workspace manifest, so compromise of that key compromises the user's private apps and all shared room memberships
listed in that workspace. The key should not be logged, stored in provider records, or placed in URLs. Clipboard and QR export may
be useful later, but the UI must treat them as sensitive recovery flows.

The manifest should contain records like:

```ts
interface SyncedWorkspaceApp {
  localAppId: string;
  displayName: string;
  role: "owner" | "collaborator";
  sourceRoom?: RoomCapability;
  dataRoom?: RoomCapability;
}
```

Room capabilities separate decrypt/read authority from write authority. Read-only must be a real boundary, not only a UI hint.

```ts
type RoomPermission = "read" | "write";

interface RoomCapability {
  roomId: string;
  decryptSecret: string;
  readToken: string;
  writeToken?: string;
  permission: RoomPermission;
  lastSeenVersion: number;
}
```

A read-only invite can contain `roomId`, `decryptSecret`, and `readToken`. A write-capable invite can additionally contain
`writeToken`. The storage provider or sync adapter must reject writes without write authority. If a provider cannot enforce write
tokens directly, the implementation needs another enforceable write mechanism before exposing read/write permissions in the UI.

For the first sync implementation, `readToken` and `writeToken` are provider-side bearer capabilities rather than cryptographic
signing keys. `roomId` identifies the room but is not treated as the authorization secret. `readToken` authorizes loading and
subscribing to a room; `writeToken` authorizes version-checked saves. This means App Lab trusts the chosen provider adapter to
enforce read/write ACLs correctly. Client-side write signing can be considered later if App Lab needs write integrity independent
of provider enforcement.

Invite links are bearer capabilities, but opening one should not mutate the workspace automatically. The user should first see an
import confirmation screen with the app name, source and data permissions, whether the app joins live shared data, and owner or
origin information when available. Import requires an explicit user action. Workspace sync remains separate and is only for
restoring the user's own workspace on another device.

The initial sharing UI is designed around collaboration permissions:

- source `read`: recipient can inspect or copy the app source
- source `write`: recipient can edit the shared source
- data `read`: recipient can open the app using shared data
- data `write`: recipient can save app data changes

Source is always effectively visible to collaborators because generated apps run in the browser and can be inspected. Therefore
collaboration sharing should not pretend that source can be hidden from someone who can run the app.

Source-write is also code-publish authority for that app. A source-write collaborator can change code that later runs for other
collaborators and can read the shared app data exposed to that app. The UI must present source-write as a trusted collaborator
permission. In the first implementation, after a user explicitly imports or joins a shared app, remote source updates from
write-capable collaborators may become runnable as part of the live collaboration model. A future review-before-apply mode can be
added for less trusted sharing flows.

This keeps future options open:

- share app source and app data together
- share app source as view-only while allowing data collaboration
- fork source while keeping private data
- share a copy as a separate future flow, where the recipient receives source/template material without joining the live data room
- add collaborator roles later without changing the shell model

### Sync Provider Boundary

App Lab should own encryption, room ids, room capabilities, version checks, and conflict behavior. Storage providers should be
adapters behind a small interface:

```ts
interface SyncProvider {
  loadRoom(input: {
    roomId: string;
    readToken: string;
  }): Promise<RemoteRoomSnapshot>;
  saveRoom(input: {
    roomId: string;
    writeToken: string;
    expectedVersion: number;
    encryptedPayload: string;
  }): Promise<RemoteRoomSaveResult>;
}
```

Realtime support should be optional and added without changing app/runtime APIs:

```ts
interface RealtimeSyncProvider extends SyncProvider {
  subscribeRoom(input: {
    roomId: string;
    readToken: string;
    onChange: (snapshot: RemoteRoomSnapshot) => void;
  }): () => void;
}
```

The first implementation can use polling plus optimistic version checks. The provider boundary should make it easy to replace
polling with subscriptions later.

### Conflict Rule

Generated apps store arbitrary JSON, so App Lab should not try to globally merge data. The safe default is optimistic concurrency:

1. load room version `N`
2. edit locally
3. save only if the remote room is still version `N`
4. if remote has moved to `N+1`, do not overwrite automatically
5. preserve the local attempted save as a conflict copy or require user action

This avoids silent data loss. App-specific merge strategies can be explored later.

### Room Cryptography And Integrity

Room payloads should use authenticated encryption, not unauthenticated encryption. The authenticated data should include at least:

- room id
- room type: workspace manifest, app package, or app data
- schema version
- room version

Clients should reject malformed payloads, authentication failures, and snapshots older than a locally remembered `lastSeenVersion`.
On fresh restore, there is no local version memory; the client can accept the provider's current snapshot after successful
authentication, then remember that version for rollback checks. A malicious provider could still present an older valid snapshot
on first restore because the client has no prior version anchor yet; this is accepted as a first-version limitation.

### Security Notes

The storage provider should only see encrypted payloads. Decrypt secrets, workspace secrets, and write tokens stay in the browser
and in invite or recovery material controlled by the user. Invite links are still sensitive: anyone with a write-capable invite can
access that room with the permissions encoded in the invite.

Revocation is not solved in the first sync version. With bearer capabilities, leaked invites and removed collaborators remain
sensitive unless the room rotates capabilities and re-shares new capabilities to remaining collaborators. The first UI should say
this clearly before creating share links.

Sync does not change the existing generated-app boundary. A generated app that can read its own app data through `AppLab.getData()`
can still disclose that app-owned data. Sync protects against provider-side reading and cross-app leakage, not against malicious
source inside the shared app itself.

## Source Workflow

The Source tool edits the complete HTML document for the active app. Saving source updates the app record, clears the current console, and reloads the sandbox.

The source tool can also generate a copyable prompt+code bundle for external LLMs. The prompt steers models toward the stable `AppLab` helper, visible error reporting, defensive data migrations, and sandbox-compatible browser APIs.

## Testing

Vitest covers the core and runtime boundaries:

- memory core create/list/update/delete/data behavior
- JSON normalization for app data
- sandbox document CSP/helper injection
- iframe capability revocation and unexpected navigation recovery
- console forwarding from sandbox to host

Build verification uses:

```bash
pnpm typecheck
pnpm test
pnpm build
```
