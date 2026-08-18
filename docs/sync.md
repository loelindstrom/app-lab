# Sync

App Lab is useful with only the browser: apps and their data are saved locally through `AppLabCore`. That local-first foundation
keeps setup optional, but a browser alone cannot keep two devices updated or let friends work on the same app.

## Why Sync Exists

Sync extends the local workspace with encrypted backup, sharing, and cross-device updates through a storage provider. It does not
replace local persistence: local saves complete first, and `AppLabCore` remains the local source of truth. A durable queue lets
remote work catch up later when the browser or provider was unavailable.

That creates three design needs: preserve local saves when remote storage is unavailable, represent the encrypted relationships
needed for restore and sharing, and keep provider-specific behavior out of the rest of App Lab.

The sync facade is created even when no storage provider is configured, so UI can follow the same code paths. Without a storage
profile, this workspace's own apps remain local-only: sync does not create their remote rooms or a remote workspace-manifest room.
A joined app is different because its invite supplies the owner's provider reference and room capabilities; that app can sync
without the recipient configuring a provider of their own. Local sync metadata can also remain after an earlier setup.

Start with the [developer map](./README.md) for the surrounding product areas and vocabulary.

## Map

```text
src/sync/
├── index.ts                 Public contract and browser setup
├── workspaceSyncActions.ts  Facade coordinating complete sync workflows
├── workspace/               Restores workspace relationships across devices
├── rooms/                   Separates and encrypts remote payloads
├── queue/                   Keeps local saves working through outages
├── providers/               Isolates service-specific access
├── sharing/                 Connects a recipient to one app's rooms
└── testing/                 Reusable in-memory test support
```

Production code outside sync imports only `src/sync/index.ts`. UI therefore sees one `WorkspaceSyncActions` facade rather than
the provider, queue, and encryption details underneath it.

## Coordination

The facade receives the same `AppLabCore` object used by UI. It ties the folders above together while UI decides when a user
action should be saved locally and offered to sync.

```text
User edit:     UI -> core -> sync facade -> queue -> provider
Remote update: provider -> sync facade -> core -> UI callback
```

The outgoing order is the local-first guarantee: core completes the save before queue or provider work. The incoming order keeps
the origin visible, so a remote update written to core is not mistaken for a new local edit and sent back again. IndexedDB is
therefore persistence rather than a general event bus.

Generated apps remain outside the sync boundary. They receive only the runtime's `window.AppLab` API, never a storage profile,
room capability, storage-provider client, or encryption key.

## `workspace/`

Cross-device restore needs more than the apps stored in core: a new browser must also recover how this workspace relates to remote
rooms. The workspace registry therefore keeps sync-only local state: the storage profile, workspace identity, app relationships,
room capabilities, observed versions, and deletion tombstones.

The encrypted **workspace manifest room** mirrors the relationships needed to restore that registry on another device. Its merge
works per app id: independent additions are retained, the highest observed room versions survive, and tombstones suppress stale
app records.

**Workspace sync material** is the sensitive text needed to locate and decrypt that manifest from a clean browser. Storage-
provider configuration alone cannot restore a workspace because decrypt secrets are never stored by the provider.

## `rooms/`

Backup and sharing require remote payloads, but do not require trusting the provider with their content. App Lab encrypts and
separates that content into three provider-neutral room types:

| Room | Contains |
| --- | --- |
| `workspace-manifest` | Workspace relationships, room references, versions, and tombstones. |
| `app-package` | App metadata, complete HTML source, and compiled CSS. |
| `app-data` | JSON saved by the generated app. |

A `RoomCapability` combines a room id with decryption and access material plus the last observed version. Payloads are encrypted
in the browser; the provider sees encrypted content, token hashes, versions, and timestamps.

Source and data use separate rooms because source changes reload the sandbox, while data changes can be delivered live through
`AppLab.onDataChange`.

## `queue/`

To keep the local workspace useful through outages, the durable IndexedDB queue lets a local save succeed while the provider is
offline. Workers later coalesce and retry the newest source, data, room-lifecycle, deletion, and manifest work. Interrupted
`syncing` entries return to `pending` at startup.

Pending local work is also a conflict barrier: sync will not accept a remote source or data snapshot that would discard an
unsent local edit.

The MVP conflict policies match each payload:

- **App source:** the complete HTML document is one change; there is no line or CRDT merge.
- **App data:** the reconnecting browser's pending JSON snapshot can overwrite a newer remote snapshot.
- **Workspace manifest:** app records merge by id and deletion tombstones prevent stale resurrection.

## `providers/`

To keep optional integrations from spreading through App Lab, `RealtimeSyncProvider` defines the room-level contract implemented
by storage-provider adapters. Firebase Realtime Database is the current production adapter; tests can use the in-memory provider
under `testing/`.

Each adapter is responsible for its provider-specific connection and access model. For example, the current Firebase adapter uses
Anonymous Authentication and generated database rules to limit rooms to the owner and members who claimed an invite. App Lab
additionally checks token hashes and optimistic versions in its normal client. Those client checks are not protection against a
deliberately modified provider client after it has become a room member.

The complete trust model and secret inventory live in [Security](../SECURITY.md).

## `sharing/`

Sharing should connect a recipient to one app without exposing the owner's whole workspace. An invite therefore contains the
provider reference and capabilities for only that app's source and data rooms. It is sensitive full-access bearer material:
recipients can read and update both rooms.

- **Owned app:** uses rooms created through this workspace's storage profile.
- **Joined app:** remains connected to the owner's provider and rooms.
- **Private copy:** receives new rooms owned by this workspace.

Previewing an invite does not import the app, but it does claim source-room membership so App Lab can decrypt the confirmation
details. Deleting a joined app is local only; deleting an owned app writes a remote deletion marker and a workspace tombstone.

## Verification

```bash
pnpm test
pnpm test:firebase-smoke
pnpm test:firebase-e2e
```

Unit tests cover provider-neutral sync policy with memory stores. The current real-provider suites use Firebase to cover access
rules, offline queue recovery, live updates, deletion, workspace recovery, offline additions, and stale-browser tombstones.
