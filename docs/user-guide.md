# Using App Lab

App Lab starts as a local workspace in one browser. Begin there. Firebase is optional and only becomes relevant when you want
remote backup, another device, or a live shared app.

[Open App Lab](https://loelindstrom.github.io/app-lab/)

## Make And Improve An App

1. Select the plus button in the launcher. App Lab creates an example app and opens it immediately.
2. Use the app normally. Data saved through App Lab remains available when you leave the app, reload the page, or reopen it.
3. Open **BuilderAI**, expand **Copy prompt + code**, and copy the package into an external AI chat.
4. Describe the app or change you want. Ask the AI to return one complete HTML document.
5. Open **Source**, replace the current document with the result, and save it. App Lab reloads the app with the new source.

The prompt teaches the external AI about App Lab's data API, sandbox, Tailwind support, and built-in Alpine runtime. You can keep
iterating in the same AI conversation and paste each complete revision back into Source.

The HTML `<title>` becomes the app name in the launcher. A `<meta name="description">` supplies its description.

Source is executable code. Only use source you trust, especially when it came from another person or an unfamiliar AI response.

## Keep Your Workspace Local

Nothing else is required. App records and their JSON data live in IndexedDB in this browser. The Source tool can export the active
app's HTML and data when you want a separate copy.

Clearing browser storage can remove the local workspace. If the apps matter, export them or connect Firebase and keep the generated
workspace sync material somewhere private.

## Add Firebase

Open **Settings > Storage > First-time setup**. The in-app checklist walks through one consistent sequence:

1. Create a Firebase project and Realtime Database.
2. Enable Anonymous Authentication and publish the generated database rules.
3. Paste the Firebase web app configuration and Realtime Database URL into App Lab.
4. Save the storage profile. Existing local apps are then queued for encrypted backup.

The storage profile belongs to this browser. App Lab encrypts app source, app data, and workspace metadata before sending them to
Firebase. The generated apps themselves do not receive Firebase access.

## Sync Another Device

On the browser that already contains the workspace, open **Settings > Storage > Sync device** and generate workspace sync
material. Paste that material into the same screen on the new browser and select **Sync this device**.

The sync material can restore and control the whole workspace. Treat it like a password: store it privately and do not put it in
an issue, screenshot, or public message.

## Share One App

Select **Share** for an app. If storage is not configured, App Lab first takes you to Firebase setup. Once the app has remote
rooms, App Lab creates an invite link for its source and data.

The recipient previews the app before importing it. Imported shared apps receive live source and data updates, and collaborators
can write back to the same rooms. Current invites are full-access links, so share them only with people you trust.

An app invite grants access to one app. Workspace sync material grants access to the whole workspace. They are deliberately
different.

## Built-In AI

The native OpenRouter agent is still being built. Its planned workflow, chat history, source editing, and undo behavior are
described in the [AI integration brief](./ai-integration.md). The current copy-prompt workflow remains available without an API
key.

For the trust boundaries behind local apps, Firebase, invites, and generated source, read [Security](../SECURITY.md).
