# App Lab Backlog

This backlog captures the current next steps. It is not a roadmap promise; it is the working plan for the next implementation
passes.

## Potential bugs

- [x] **Console message not showing up in UI**  
There seems to be a bug which makes it so that certain console messages don't show up in the UI, only the console.
For example this one:
```
about:srcdoc:1 Blocked form submission to '' because the form's frame is sandboxed and the 'allow-forms' permission is not set.
```

And the code which caused it was probably this:
```
<form class="mx-auto max-w-4xl flex gap-3" @submit.prevent="submitUserMessage">
          <input 
            type="text" 
            class="flex-1 bg-slate-900 border border-cyan-800 px-4 py-3 text-sm text-cyan-100 placeholder-cyan-800 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all rounded-none" 
            placeholder="Describe the bug..." 
            autocomplete="off"
            x-model="ui.draft"
            :disabled="ui.isTyping"
            x-ref="inputField"
          >
          <button 
            type="submit" 
            class="bg-cyan-900 border border-cyan-500 px-6 font-black uppercase tracking-widest text-cyan-50 hover:bg-cyan-700 hover:neon-border-cyan disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            :disabled="!ui.draft.trim() || ui.isTyping"
          >
            Transmit
          </button>
        </form>
```

- [x] **In the "Opinionated Board" I often see sync error**  
The error shown via the cloud icon in host's top bar is 
"Could not retry pending sync: Remote room snapshot is older than the last seen version."
It's unclear why this happens...
Same for "Minimal Board" starting app.

## Small fixes

- [x] **FAB on launcher button should be more centered on desktop**  
The Floating Action Button doesn't have to be all the way out to the side on very wide screens in the launcher menu of App Lab's shell/host

- [x] **Change the pen edit icon for a cleaner one**  
This is for the icon on the apps in the App Lab host's launcher menu. Would be nicer with the one which is used in the "Opinionated Board" starting app

- [x] **Put the "Opinionated Board" starting app in correct place**  
The "Minimal Board" starting app lives inside the AI folder. I think the "Opinionated Board" belongs there too now when it's part of a AI profile

- [x] **When one opens an invite one _has_ to preview it before importing. I think that shall be optional**  
Title describes well.

- [x] **The Opinionated Board starting app drag and drop is not perfect**  
If many items and one drag the top one to the bottom and aim too low, i.e. hold it on the host's bottom bar (mobile view), it doesn't get moved but isntead bounces back/stays in the top.  
One needs to allow it to move as long as it's "south" of the last item even if it's "outside" the list of items

- [x] **Show token usage/cost always**  
Don't only show after first message is sent. Show from start but with 0 then if it hasn't been used yet

- [x] **The 'Copy prompt+code' button does not look good**  
I can't say exactly what it is, but something with its shape and placement. And the arrow in it is not good-looking.
Also I think there shall be a short description when it's opened saying "Copy prompt and paste into external AI. Paste result back in '<>' - where the source code lives"

- [x] **Also with OpenRouter connected the first message shall highlight the possibility to Copy prompt+code**  
The messages:
If OpenRouter connected:
- Hi,  
  Describe how you want to edit the app!  
  Or if you prefer, use the button below to copy prompt+source to use in external AI.
If OpenRouter not connected:
- Hi,  
  Use the button below to copy prompt+source to use in external AI to edit the app.  
  Or set up your AI provider in ['Settings'](<link to settings ai connection page>) to be able to chat directly here.

Btw, I suppose that this first message shall be included in the chat history as well sent to the LLM. That makes sense in my book, but open to change my mind.

- [x] **Small description of Builder profile**
It would be nice if there was a small description under the "Active profile" dropdown. Just text.  
And then in the next section "Profile details", we could add a text area for changing the description (optional to have something in there).  
But this would be a good way to describe the differences between the two profiles a bit more "Behind the scenes".

- [x] **Add which model is used in chat window**  
In the chat window it now says: "BuilderAI (Profile: Minimal)" But I think it shall say: "BuilderAI (Profile: Minimal Model: google/gemini-3.6-flash)"  
And it's only "Minimal" and "google/gemini-3.6-flash" that shall be undelined with a link, not "Profile" and "Model". And clicking the "google/gemini-3.6-flash" shall take you to Settings -> Ai -> Connection


## Current Baseline

App Lab is a React/Vite browser app with:

- sandboxed iframe apps
- local IndexedDB app/source/data persistence
- source editing and console logs
- source/data file export and BuilderAI prompt+code helper for external LLM workflows
- Firebase Realtime Database sync through encrypted auth-v1 rooms
- invite import/share
- workspace sync material for restoring/syncing the whole workspace on another browser
- active-app live source/data subscriptions
- live workspace manifest sync for apps created on another synced browser
- owner-deletion tombstones for shared apps
- local-first queue records for sync retries

## MVP Must-Have

1. BuilderAI loop

   Reintroduce native AI editing for the active app. The working feature brief is [AI integration](./ai-integration.md).

2. Onboarding guide
   Showcasing how one gets started with the app:
     - Welcome dialog/blurb/something asking if user "wants to build your first app in X steps?"
     - Highlight FAB-button
     - Inside example app describe what one is seeing
     - Highlight "AI" button, when user clicks move on
     - highlight "Copy prompt + ..." and say that user shall try putting the prompt into another AI (preferably a quite smart model) and ask to create an app for counting how many cinnamon buns one has eaten or something silly, and then to copy the new code the AI produce. Then offer a "next" button which the user is indicated to click on when they have come back with the copied code. The button moves to next step
     - Highlights "<>" button and has a description which stays after clicking "<>" button where it says one should replace the code seen and press save
     - "Congratulations! You created your first app! To use AI directly here, or to share your app with friends, set up AI integration or storage provider in Settings"

Known limitations that are intentionally not blockers for the current MVP:

- invite links are sensitive full-access bearer material for the shared app rooms
- workspace sync material is sensitive whole-workspace bearer material and includes owner setup material
- there is no revocation/key rotation UI
- there is no read-only sharing

## Nice-To-Have After MVP

The order does not have any meaning, one needs to evaluate the priority when we get here.

- PWA 
   Easy to make into a PWA so the app becomes very accessible for people

- Source history

   Add lightweight source snapshots only if manual experimentation shows real need. This should not block current sync work.

- Better app-data merge

   Add ID-based merge only if shared/offline conflicts become common enough to justify the complexity. The current policy is
   latest-local-pending-data wins.

- Import app data

   Export exists for source and app data. Add app-data import only when manual backup/restore workflows show enough demand to
   justify UI and safety checks.

- When clicking the "+" button on the launcher to create a new app one could get the choice to decide which Agent profile one wants to be active. Maybe think a bit about how the user perceives this in regards to if they think that one chooses profile per app while perhaps one is changing globally? Trade-off desired functionality, implemention complexity and clarity for the user.

- Large chunks when building the app. Perhaps something to take a look at:  
  This warning shows:  
  "(!) Some chunks are larger than 500 kB after minification. Consider:
   - Using dynamic import() to code-split the application
   - Use build.rollupOptions.output.manualChunks to improve chunking: https://rollupjs.org/configuration-options/#output-manualchunks
   - Adjust chunk size limit for this warning via build.chunkSizeWarningLimit."  




## Explicit Non-Goals For Now

- CRDT collaboration
- generated apps talking directly to Firebase
- read-only sharing
- TanStack Query integration
- source-code merge

## Checkpoint Format

For future implementation slices, report:

- changed behavior
- files touched
- automated checks run
- manual test scenario, when needed
- known limitations
