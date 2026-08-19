# Security

App Lab must execute HTML source produced by AI tools or shared by other people. Running that source as trusted host code would
give it the same browser access as the workspace that stores other apps, local data, and optional service configuration.

The security boundary exists to let a generated app control its own UI and JSON data without trusting it with the surrounding
App Lab host. The host owns persistence, sync, tools, and access to optional services; generated apps run separately.

## Threat Model

App Lab aims to protect:

- the host shell from generated app source
- other apps in the same workspace
- storage profiles (e.g. Firebase configuration), room capabilities, workspace sync material, and sync queue metadata
- local workspace metadata that generated apps do not need

App Lab does not make arbitrary generated or shared app source trustworthy. Generated app code can read its own app-owned JSON
data through `AppLab.getData`, and malicious app source can display misleading UI or disclose its own app data if the user runs it.
Only run or import apps from sources you trust.

The runtime controls answer the host-isolation problem: generated apps run in sandboxed iframes with scripts enabled and without
`allow-same-origin`. The narrow `window.AppLab` API answers the app-data need by allowing JSON persistence and live updates without
exposing general host access. Generated apps should not receive storage-provider credentials, room ids, room decrypt secrets,
invite material, workspace sync material, or LLM-provider configuration.

## Optional Sync

Sync introduces remote storage without making that provider the source of truth. Client-side encryption addresses payload
confidentiality: app source, app data, and workspace-manifest payloads are encrypted before leaving the browser. Firebase Realtime
Database is the current provider implementation.

Provider rules address who may access the encrypted records: Firebase `auth-v1` rules enforce owner/member access to rooms.
App Lab's token-hash and optimistic-version checks address normal client correctness, but cannot make an authorized member's
modified Firebase client read-only. App invites are therefore full-access bearer material for the shared app rooms, not read-only
links.

Previewing an app invite is not a local import: it does not save the app source or data into the workspace. Under `auth-v1`, preview
does still claim Firebase membership for the invite's source room so App Lab can load and decrypt the app metadata before the user
chooses whether to import.

## Secret Material

| Material | Where it lives | What compromise means |
| --- | --- | --- |
| Workspace sync store | Browser local storage | Reveals storage profile metadata, workspace room capabilities, app room capabilities, and owner setup material for this browser. |
| Workspace sync material (`WorkspaceRecoveryMaterial` in code) | User-copied text | Restores/decrypts the whole workspace manifest and includes owner setup material for creating more rooms in the user's Firebase project. Treat it like a password. |
| App invite link | URL fragment copied by the user | Grants full read/write access to one app's source and data rooms. Anyone with the link can import or forward it. |
| Firebase owner setup secret | Settings UI, local sync metadata, workspace sync material | Lets another browser owned by the user claim owner setup in that Firebase project. |
| Room decrypt secret | Local sync metadata, invite links, and workspace sync material | Decrypts one encrypted room payload. Firebase does not store this secret in plaintext. |
| Room access token | Local sync metadata, invite links, and workspace sync material | Authorizes normal App Lab client reads/writes for one room and is used as the Firebase room membership claim token. |
| OpenRouter API key | Local AI configuration | Remains local to the browser. It is not synced, exported in workspace sync material, or exposed to generated apps. |

## Reporting Vulnerabilities

Please do not include exploit details in a public issue. Use GitHub private vulnerability reporting if it is enabled for this
repository. If private reporting is not available, open a minimal public issue asking for a private contact path.
