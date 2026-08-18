# Security

App Lab is a local-first browser workspace for small sandboxed HTML apps. The host shell owns persistence, sync, tools, and
security boundaries; generated apps own their HTML UI and app-owned JSON data.

## Threat Model

App Lab aims to protect:

- the host shell from generated app source
- other apps in the same workspace
- Firebase config, room capabilities, recovery material, and sync queue metadata
- local workspace metadata that generated apps do not need

App Lab does not make arbitrary generated or shared app source trustworthy. Generated app code can read its own app-owned JSON
data through `AppLab.getData`, and malicious app source can display misleading UI or disclose its own app data if the user runs it.
Only run or import apps from sources you trust.

Generated apps run in sandboxed iframes with scripts enabled and without `allow-same-origin`. They use the host-provided
`window.AppLab` API for JSON persistence and live data updates. Generated apps should not receive Firebase credentials, room ids,
room decrypt secrets, invite material, workspace recovery material, or OpenRouter configuration.

## Optional Sync

Sync is optional and currently uses a Firebase Realtime Database configured by the user. App source, app data, and workspace
manifest payloads are encrypted in the browser before being written to Firebase.

Firebase `auth-v1` rules enforce owner/member access to room records. App Lab's TypeScript client/provider code performs the
write-token hash checks and optimistic version checks for normal App Lab clients. A room member using a modified or custom Firebase
client can still write syntactically valid room records for rooms they can access. App invites are therefore full-access bearer
material for the shared app rooms, not read-only links.

Previewing an app invite is not a local import: it does not save the app source or data into the workspace. Under `auth-v1`, preview
does still claim Firebase membership for the invite's source room so App Lab can load and decrypt the app metadata before the user
chooses whether to import.

## Secret Material

| Material | Where it lives | What compromise means |
| --- | --- | --- |
| Workspace sync store | Browser local storage | Reveals storage profile metadata, workspace room capabilities, app room capabilities, and owner setup material for this browser. |
| Workspace recovery material | User-copied text | Restores/decrypts the whole workspace manifest and includes owner setup material for creating more rooms in the user's Firebase project. Treat it like a password. |
| App invite link | URL fragment copied by the user | Grants full read/write access to one app's source and data rooms. Anyone with the link can import or forward it. |
| Firebase owner setup secret | Settings UI, local sync metadata, recovery material | Lets another browser owned by the user claim owner setup in that Firebase project. |
| Room decrypt secret | Local sync metadata, invite/recovery material | Decrypts one encrypted room payload. Firebase does not store this secret in plaintext. |
| Room access token | Local sync metadata, invite/recovery material | Authorizes normal App Lab client reads/writes for one room and is used as the Firebase room membership claim token. |
| OpenRouter API key | Future local AI config | Should remain local to the browser. It should not be synced, exported in recovery material, or exposed to generated apps. |

## Reporting Vulnerabilities

Please do not include exploit details in a public issue. Use GitHub private vulnerability reporting if it is enabled for this
repository. If private reporting is not available, open a minimal public issue asking for a private contact path.
