export const OPINIONATED_BOARD_DESCRIPTION =
  "A richer example app that showcases App Lab capabilities through reusable UI and state patterns designed to inspire the user and AI.";

export const OPINIONATED_BOARD_SOURCE = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="${OPINIONATED_BOARD_DESCRIPTION}">
    <meta name="app-lab-tailwind" content="enabled">
    <title>Opinionated Board</title>
    <style>
      html, body { height: 100%; overflow: hidden; }
      [x-cloak] { display: none !important; }
      dialog { margin: min(12vh, 4rem) auto auto auto; }
    </style>
  </head>
  <body class="h-full bg-stone-50 text-slate-950">
    <main class="grid h-full w-full grid-rows-[minmax(0,1fr)_auto] overflow-hidden" x-data="opinionatedBoard" x-init="init()" x-cloak>
      <div
        class="min-h-0 overflow-y-auto"
        data-board-scroll
        x-ref="scrollViewport"
        @dragover.prevent="handleBoardDragOver($event)"
        @dragleave="handleBoardDragLeave($event)"
        @drop.prevent="dropNoteAtPointer($event)"
      >
        <!-- App Lab already renders the document title in its outer frame. -->
        <div class="mx-auto grid w-full max-w-3xl gap-4 px-4 py-5 pb-28 sm:px-6 sm:py-7">
          <section class="grid gap-4" aria-labelledby="notes-heading">
            <div class="flex items-end justify-between gap-3">
              <h2 class="text-xl font-black text-slate-950" id="notes-heading" x-text="ui.tab === 'active' ? 'Active notes' : 'Archived notes'"></h2>
              <p class="text-xs font-bold uppercase text-slate-500" x-text="countLabel"></p>
            </div>

            <div class="grid gap-3">
              <template x-for="note in visibleNotes" :key="note.id">
                <article
                  class="relative grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-2 rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition-opacity sm:gap-3 sm:p-4"
                  :class="ui.draggedNoteId === note.id ? 'opacity-50' : ''"
                  :data-note-id="note.id"
                >
                  <button
                    class="absolute inset-0 z-0 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-inset"
                    type="button"
                    data-note-toggle
                    :aria-expanded="String(!isNoteCollapsed(note.id))"
                    :aria-label="(isNoteCollapsed(note.id) ? 'Expand details for ' : 'Collapse details for ') + note.title"
                    :title="isNoteCollapsed(note.id) ? 'Expand note' : 'Collapse note'"
                    @click="toggleNoteCollapsed(note.id)"
                  ></button>

                  <div class="relative z-10 grid w-9 justify-items-center gap-0.5">
                    <button
                      class="grid h-9 w-9 cursor-grab place-items-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700 active:cursor-grabbing"
                      type="button"
                      draggable="true"
                      :aria-label="'Drag ' + note.title + ' to reorder'"
                      title="Drag to reorder. Arrow keys also work."
                      x-show="ui.tab === 'active'"
                      @dragstart="startNoteDrag(note.id, $event)"
                      @dragend="endNoteDrag($event)"
                      @keydown.arrow-up.prevent="moveNote(note.id, -1)"
                      @keydown.arrow-down.prevent="moveNote(note.id, 1)"
                    >
                      <svg class="h-4 w-4" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="9" cy="6" r="1.5"></circle><circle cx="15" cy="6" r="1.5"></circle>
                        <circle cx="9" cy="12" r="1.5"></circle><circle cx="15" cy="12" r="1.5"></circle>
                        <circle cx="9" cy="18" r="1.5"></circle><circle cx="15" cy="18" r="1.5"></circle>
                      </svg>
                    </button>
                    <div class="grid" x-show="ui.tab === 'archived'">
                      <button
                        class="grid h-8 w-8 place-items-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-30"
                        type="button"
                        :aria-label="'Move ' + note.title + ' up'"
                        title="Move up"
                        :disabled="isFirstVisibleNote(note.id)"
                        @click="moveNote(note.id, -1)"
                      >
                        <svg class="h-4 w-4" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 15 12 9 18 15"></polyline></svg>
                      </button>
                      <button
                        class="grid h-8 w-8 place-items-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-30"
                        type="button"
                        :aria-label="'Move ' + note.title + ' down'"
                        title="Move down"
                        :disabled="isLastVisibleNote(note.id)"
                        @click="moveNote(note.id, 1)"
                      >
                        <svg class="h-4 w-4" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                      </button>
                    </div>
                  </div>

                  <div class="pointer-events-none relative z-10 min-w-0 py-1">
                    <h3 class="break-words text-base font-black text-slate-950" x-text="note.title"></h3>
                    <p class="mt-1 text-xs font-semibold text-slate-500" x-text="formatDate(note.updatedAt || note.createdAt)"></p>
                    <p class="mt-3 whitespace-pre-wrap break-words text-sm font-medium leading-6 text-slate-600" x-show="!isNoteCollapsed(note.id)" x-transition.opacity x-text="note.body"></p>
                  </div>

                  <div class="relative z-10 grid grid-cols-2 gap-0.5 sm:flex sm:items-center">
                      <button
                        class="grid h-9 w-9 place-items-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                        type="button"
                        :aria-expanded="String(!isNoteCollapsed(note.id))"
                        :aria-label="(isNoteCollapsed(note.id) ? 'Expand ' : 'Collapse ') + note.title"
                        :title="isNoteCollapsed(note.id) ? 'Expand note' : 'Collapse note'"
                        @click="toggleNoteCollapsed(note.id)"
                      >
                        <svg class="h-[18px] w-[18px]" data-direction="up" x-show="!isNoteCollapsed(note.id)" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 15 12 9 18 15"></polyline></svg>
                        <svg class="h-[18px] w-[18px]" data-direction="down" x-show="isNoteCollapsed(note.id)" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                      </button>
                      <button class="grid h-9 w-9 place-items-center rounded-md text-slate-500 hover:bg-violet-50 hover:text-violet-700" type="button" :aria-label="'Edit ' + note.title" title="Edit note" x-show="ui.tab === 'active'" @click="openNoteDialog(note.id)">
                        <svg class="h-4 w-4" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path><path d="m15 5 4 4"></path>
                        </svg>
                      </button>
                      <button class="grid h-9 w-9 place-items-center rounded-md text-slate-500 hover:bg-emerald-50 hover:text-emerald-700" type="button" :aria-label="'Archive ' + note.title" title="Archive note" x-show="ui.tab === 'active'" @click="requestAction('archive', note.id)">
                        <svg class="h-4 w-4" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M4 7h16v13H4zM3 4h18v3H3zM9 11h6"></path>
                        </svg>
                      </button>
                      <button class="grid h-9 w-9 place-items-center rounded-md text-slate-500 hover:bg-emerald-50 hover:text-emerald-700" type="button" :aria-label="'Restore ' + note.title" title="Restore note" x-show="ui.tab === 'archived'" @click="restoreNote(note.id)">
                        <svg class="h-4 w-4" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M4 12a8 8 0 1 0 3-6.2M4 4v6h6"></path>
                        </svg>
                      </button>
                      <button class="grid h-9 w-9 place-items-center rounded-md text-xl leading-none text-slate-500 hover:bg-red-50 hover:text-red-700" type="button" :aria-label="'Delete ' + note.title" title="Delete note" x-show="ui.tab === 'archived'" @click="requestAction('delete', note.id)">&times;</button>
                  </div>
                </article>
              </template>

              <p class="rounded-lg border border-dashed border-slate-300 bg-white/70 p-7 text-center text-sm font-semibold text-slate-500" x-show="visibleNotes.length === 0">
                Nothing here yet.
              </p>
            </div>
          </section>

          <div class="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-semibold leading-6 text-amber-900" x-show="ui.error" role="alert">
            <p class="font-black">Something needs attention.</p>
            <p x-text="ui.error"></p>
          </div>
        </div>
      </div>

      <nav class="z-30 border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom,0px)] shadow-[0_-8px_24px_rgb(15_23_42_/_6%)]" aria-label="Opinionated Board tabs">
        <div class="mx-auto grid max-w-3xl grid-cols-2">
          <button class="flex min-h-16 items-center justify-center gap-2 border-t-4 px-4 text-sm font-black" :class="ui.tab === 'active' ? 'border-violet-600 text-violet-700' : 'border-transparent text-slate-500'" type="button" @click="ui.tab = 'active'">
            <svg class="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><path d="M14 2v6h6M8 13h8M8 17h6"></path></svg>
            Active
          </button>
          <button class="flex min-h-16 items-center justify-center gap-2 border-t-4 px-4 text-sm font-black" :class="ui.tab === 'archived' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-slate-500'" type="button" @click="ui.tab = 'archived'">
            <svg class="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16v13H4zM3 4h18v3H3zM9 11h6"></path></svg>
            Archived
          </button>
        </div>
      </nav>

      <div class="pointer-events-none fixed inset-x-0 bottom-20 z-40 mx-auto w-full max-w-3xl px-4 sm:px-6" x-show="ui.tab === 'active'">
        <button class="pointer-events-auto ml-auto grid h-14 w-14 place-items-center rounded-full bg-violet-600 text-3xl font-light leading-none text-white shadow-lg shadow-slate-900/20 active:scale-[.96]" type="button" aria-label="New note" title="New note" @click="openNoteDialog()">+</button>
      </div>

      <dialog x-ref="noteDialog" class="w-[min(92vw,28rem)] rounded-lg border border-slate-200 bg-white p-5 text-slate-950 shadow-2xl backdrop:bg-slate-950/40">
        <h2 class="text-xl font-black" x-text="noteDialogTitle"></h2>
        <label class="mt-4 grid gap-2 text-sm font-bold text-slate-700">
          Title
          <input class="min-h-12 rounded-md border border-slate-300 bg-stone-50 px-3 text-base font-semibold outline-none focus:border-violet-500" autocomplete="off" x-model="ui.titleDraft" @keydown.enter.prevent="saveNoteDialog()">
        </label>
        <label class="mt-3 grid gap-2 text-sm font-bold text-slate-700">
          Note
          <textarea class="min-h-32 resize-y rounded-md border border-slate-300 bg-stone-50 px-3 py-3 text-base font-medium outline-none focus:border-violet-500" x-model="ui.bodyDraft"></textarea>
        </label>
        <div class="mt-5 flex justify-end gap-2 border-t border-slate-100 pt-4">
          <button class="min-h-10 rounded-md border border-slate-300 bg-white px-4 text-sm font-bold text-slate-700" type="button" @click="$refs.noteDialog.close()">Cancel</button>
          <button class="min-h-10 rounded-md bg-violet-600 px-4 text-sm font-black text-white" type="button" @click="saveNoteDialog()">Save</button>
        </div>
      </dialog>

      <!-- Archive and delete share one confirmation dialog and one action dispatcher. -->
      <dialog x-ref="confirmDialog" class="w-[min(88vw,24rem)] rounded-lg border border-slate-200 bg-white p-5 text-slate-950 shadow-2xl backdrop:bg-slate-950/40">
        <h2 class="text-lg font-black" x-text="confirmTitle"></h2>
        <p class="mt-2 text-sm font-medium leading-6 text-slate-600" x-text="confirmMessage"></p>
        <div class="mt-5 flex justify-end gap-2">
          <button class="min-h-10 rounded-md border border-slate-300 bg-white px-4 text-sm font-bold text-slate-700" type="button" @click="$refs.confirmDialog.close()">Cancel</button>
          <button class="min-h-10 rounded-md px-4 text-sm font-black text-white" :class="ui.pendingAction === 'delete' ? 'bg-red-700' : 'bg-emerald-700'" type="button" x-text="confirmLabel" @click="confirmAction()"></button>
        </div>
      </dialog>
    </main>

    <script>
      "use strict";

      document.addEventListener("alpine:init", () => {
        Alpine.data("opinionatedBoard", () => ({
          // Persist plain JSON only. Dialogs, drafts, and selected tabs remain transient.
          state: { schemaVersion: 1, notes: [] },
          ui: {
            tab: "active",
            collapsedNoteIds: [],
            draggedNoteId: null,
            editingId: null,
            titleDraft: "",
            bodyDraft: "",
            pendingAction: null,
            pendingNoteId: null,
            error: ""
          },
          saveInFlight: 0,
          queuedRemoteData: undefined,
          dragScrollFrame: null,
          dragScrollSpeed: 0,
          externalDropIndex: null,

          async init() {
            AppLab.onError((message) => { this.ui.error = String(message || "Unknown App Lab error"); });
            AppLab.onDataChange((nextData) => {
              if (this.saveInFlight > 0) {
                this.queuedRemoteData = nextData;
                return;
              }
              this.applyData(nextData);
            });
            this.applyData(await AppLab.getData(this.defaultData()));
          },

          defaultData() {
            const now = new Date().toISOString();
            return {
              schemaVersion: 1,
              notes: [
                {
                  id: this.createId(),
                  title: "Welcome to App Lab",
                  body: "This board showcases App Lab persistence, live updates, tabs, dialogs, and reusable actions for you (the user) and for the AI which will interact with it.",
                  status: "active",
                  createdAt: now,
                  updatedAt: now,
                  archivedAt: null
                },
                {
                  id: this.createId(),
                  title: "Build with AI",
                  body: "Press 'AI ✦' to copy the prompt+app source into an external AI chat, or work directly with BuilderAI after connecting your own provider in 'Settings'.",
                  status: "active",
                  createdAt: now,
                  updatedAt: now,
                  archivedAt: null
                },
                {
                  id: this.createId(),
                  title: "Share live updates",
                  body: "Connect a storage provider in 'Settings', then share the app to let other people update this board live.",
                  status: "active",
                  createdAt: now,
                  updatedAt: now,
                  archivedAt: null
                }
              ]
            };
          },

          applyData(data) {
            const fallback = this.defaultData();
            const source = data && typeof data === "object" ? data : fallback;
            const notes = Array.isArray(source.notes) ? source.notes : fallback.notes;
            this.state = {
              schemaVersion: 1,
              notes: notes.map((note) => ({
                id: typeof note.id === "string" ? note.id : this.createId(),
                title: typeof note.title === "string" && note.title.trim() ? note.title : "Untitled note",
                body: typeof note.body === "string" ? note.body : "",
                status: note.status === "archived" ? "archived" : "active",
                createdAt: typeof note.createdAt === "string" ? note.createdAt : new Date().toISOString(),
                updatedAt: typeof note.updatedAt === "string" ? note.updatedAt : null,
                archivedAt: typeof note.archivedAt === "string" ? note.archivedAt : null
              }))
            };
          },

          async saveState() {
            this.ui.error = "";
            this.saveInFlight += 1;
            try {
              await AppLab.saveData(JSON.parse(JSON.stringify(this.state)));
            } catch (error) {
              this.ui.error = error && error.message ? error.message : "Could not save data.";
            } finally {
              this.saveInFlight -= 1;
              if (this.saveInFlight === 0 && this.queuedRemoteData !== undefined) {
                const queued = this.queuedRemoteData;
                this.queuedRemoteData = undefined;
                this.applyData(queued);
              }
            }
          },

          get visibleNotes() {
            return this.state.notes.filter((note) => note.status === this.ui.tab);
          },
          get countLabel() {
            return this.visibleNotes.length + (this.visibleNotes.length === 1 ? " note" : " notes");
          },
          get noteDialogTitle() {
            return this.ui.editingId ? "Edit note" : "New note";
          },
          get confirmTitle() {
            return this.ui.pendingAction === "delete" ? "Delete note?" : "Archive note?";
          },
          get confirmMessage() {
            return this.ui.pendingAction === "delete"
              ? "This permanently removes the note from the shared board."
              : "The note moves to Archived and can be restored later.";
          },
          get confirmLabel() {
            return this.ui.pendingAction === "delete" ? "Delete" : "Archive";
          },

          isNoteCollapsed(noteId) {
            return this.ui.collapsedNoteIds.includes(noteId);
          },
          toggleNoteCollapsed(noteId) {
            this.ui.collapsedNoteIds = this.isNoteCollapsed(noteId)
              ? this.ui.collapsedNoteIds.filter((id) => id !== noteId)
              : [...this.ui.collapsedNoteIds, noteId];
          },
          isFirstVisibleNote(noteId) {
            return this.visibleNotes[0]?.id === noteId;
          },
          isLastVisibleNote(noteId) {
            return this.visibleNotes[this.visibleNotes.length - 1]?.id === noteId;
          },
          moveNote(noteId, offset) {
            const visible = [...this.visibleNotes];
            const currentIndex = visible.findIndex((note) => note.id === noteId);
            const nextIndex = currentIndex + offset;
            if (currentIndex < 0 || nextIndex < 0 || nextIndex >= visible.length) return;
            const [moved] = visible.splice(currentIndex, 1);
            visible.splice(nextIndex, 0, moved);
            this.replaceVisibleOrder(visible);
            this.saveState();
          },
          startNoteDrag(noteId, event) {
            this.ui.draggedNoteId = noteId;
            this.externalDropIndex = null;
            event.dataTransfer.effectAllowed = "move";
            event.dataTransfer.setData("text/plain", noteId);
          },
          handleBoardDragOver(event) {
            if (!this.ui.draggedNoteId) return;
            this.externalDropIndex = null;
            event.dataTransfer.dropEffect = "move";
            this.updateDragAutoScroll(event.clientY);
          },
          handleBoardDragLeave(event) {
            const nextTarget = event.relatedTarget;
            if (nextTarget instanceof Node && event.currentTarget.contains(nextTarget)) return;
            const cards = [...this.$refs.scrollViewport.querySelectorAll("[data-note-id]")];
            const viewportBounds = this.$refs.scrollViewport.getBoundingClientRect();
            const firstBounds = cards[0]?.getBoundingClientRect();
            const lastBounds = cards[cards.length - 1]?.getBoundingClientRect();
            this.externalDropIndex = event.clientY <= viewportBounds.top + 4
              ? 0
              : event.clientY >= viewportBounds.bottom - 4
                ? cards.length
                : firstBounds && event.clientY < firstBounds.top
                  ? 0
                  : lastBounds && event.clientY > lastBounds.bottom
                    ? cards.length
                    : null;
            this.stopDragAutoScroll();
          },
          updateDragAutoScroll(clientY) {
            const viewport = this.$refs.scrollViewport;
            const bounds = viewport.getBoundingClientRect();
            const threshold = Math.min(72, Math.max(40, bounds.height * 0.18));
            const maxSpeed = 14;
            let speed = 0;

            if (clientY < bounds.top + threshold) {
              speed = -maxSpeed * Math.min(1, (bounds.top + threshold - clientY) / threshold);
            } else if (clientY > bounds.bottom - threshold) {
              speed = maxSpeed * Math.min(1, (clientY - (bounds.bottom - threshold)) / threshold);
            }

            this.dragScrollSpeed = speed;
            if (speed === 0) {
              this.stopDragAutoScroll();
            } else if (this.dragScrollFrame === null) {
              this.dragScrollFrame = requestAnimationFrame(() => this.continueDragAutoScroll());
            }
          },
          continueDragAutoScroll() {
            if (!this.ui.draggedNoteId || this.dragScrollSpeed === 0) {
              this.dragScrollFrame = null;
              return;
            }
            this.$refs.scrollViewport.scrollTop += this.dragScrollSpeed;
            this.dragScrollFrame = requestAnimationFrame(() => this.continueDragAutoScroll());
          },
          stopDragAutoScroll() {
            if (this.dragScrollFrame !== null) cancelAnimationFrame(this.dragScrollFrame);
            this.dragScrollFrame = null;
            this.dragScrollSpeed = 0;
          },
          finishNoteDrag() {
            this.ui.draggedNoteId = null;
            this.externalDropIndex = null;
            this.stopDragAutoScroll();
          },
          endNoteDrag(event) {
            const draggedNoteId = this.ui.draggedNoteId;
            let dropIndex = this.externalDropIndex;
            if (draggedNoteId && dropIndex === null) {
              const bounds = this.$refs.scrollViewport.getBoundingClientRect();
              if (event.clientY >= bounds.bottom - 4) dropIndex = this.visibleNotes.length;
              if (event.clientY > 0 && event.clientY <= bounds.top + 4) dropIndex = 0;
            }
            this.finishNoteDrag();
            if (draggedNoteId && dropIndex !== null) this.placeDraggedNote(draggedNoteId, dropIndex);
          },
          getDropIndex(clientY) {
            const cards = [...this.$refs.scrollViewport.querySelectorAll("[data-note-id]")];
            const index = cards.findIndex((card) => {
              const bounds = card.getBoundingClientRect();
              return clientY < bounds.top + bounds.height / 2;
            });
            return index < 0 ? cards.length : index;
          },
          dropNoteAtPointer(event) {
            const draggedNoteId = this.ui.draggedNoteId || event.dataTransfer.getData("text/plain");
            const dropIndex = this.getDropIndex(event.clientY);
            this.finishNoteDrag();
            this.placeDraggedNote(draggedNoteId, dropIndex);
          },
          placeDraggedNote(draggedNoteId, dropIndex) {
            const visible = [...this.visibleNotes];
            const draggedIndex = visible.findIndex((note) => note.id === draggedNoteId);
            if (draggedIndex < 0) return;
            const [moved] = visible.splice(draggedIndex, 1);
            const adjustedIndex = Math.max(
              0,
              Math.min(visible.length, dropIndex - (draggedIndex < dropIndex ? 1 : 0))
            );
            visible.splice(adjustedIndex, 0, moved);
            if (visible.every((note, index) => note.id === this.visibleNotes[index]?.id)) return;
            this.replaceVisibleOrder(visible);
            this.saveState();
          },
          replaceVisibleOrder(visible) {
            let visibleIndex = 0;
            this.state.notes = this.state.notes.map((note) =>
              note.status === this.ui.tab ? visible[visibleIndex++] : note
            );
          },

          openNoteDialog(id) {
            const note = this.state.notes.find((candidate) => candidate.id === id);
            this.ui.editingId = note ? note.id : null;
            this.ui.titleDraft = note ? note.title : "";
            this.ui.bodyDraft = note ? note.body : "";
            this.$refs.noteDialog.showModal();
          },
          saveNoteDialog() {
            const title = this.ui.titleDraft.trim();
            const body = this.ui.bodyDraft.trim();
            if (!title || !body) return;
            const now = new Date().toISOString();
            const note = this.state.notes.find((candidate) => candidate.id === this.ui.editingId);
            if (note) {
              note.title = title;
              note.body = body;
              note.updatedAt = now;
            } else {
              this.state.notes.unshift({
                id: this.createId(),
                title,
                body,
                status: "active",
                createdAt: now,
                updatedAt: now,
                archivedAt: null
              });
            }
            this.$refs.noteDialog.close();
            this.saveState();
          },
          requestAction(action, noteId) {
            this.ui.pendingAction = action;
            this.ui.pendingNoteId = noteId;
            this.$refs.confirmDialog.showModal();
          },
          confirmAction() {
            const note = this.state.notes.find((candidate) => candidate.id === this.ui.pendingNoteId);
            if (this.ui.pendingAction === "delete") {
              this.state.notes = this.state.notes.filter((candidate) => candidate.id !== this.ui.pendingNoteId);
            } else if (note) {
              note.status = "archived";
              note.archivedAt = new Date().toISOString();
              note.updatedAt = note.archivedAt;
            }
            this.$refs.confirmDialog.close();
            this.ui.pendingAction = null;
            this.ui.pendingNoteId = null;
            this.saveState();
          },
          restoreNote(noteId) {
            const note = this.state.notes.find((candidate) => candidate.id === noteId);
            if (!note) return;
            note.status = "active";
            note.archivedAt = null;
            note.updatedAt = new Date().toISOString();
            this.saveState();
          },

          formatDate(value) {
            const date = new Date(value);
            return Number.isNaN(date.getTime()) ? "Recently" : new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(date);
          },
          createId() {
            if (window.crypto && typeof window.crypto.randomUUID === "function") return window.crypto.randomUUID();
            return "note_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2);
          }
        }));
      });
    </script>
  </body>
</html>`;
