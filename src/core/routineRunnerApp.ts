import type { CreateAppInput } from "./types";

export function createRoutineRunnerAppInput(name = "Routine Runner"): CreateAppInput {
  return {
    name,
    description: "Experimental Tailwind and Alpine app with routines, sessions, history, dialogs, drag handles, and live data.",
    sourceCode: ROUTINE_RUNNER_APP_SOURCE,
  };
}

export const ROUTINE_RUNNER_APP_SOURCE = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="app-lab-tailwind" content="enabled">
    <title>Routine Runner</title>
    <style>
      html, body { height: 100%; overflow: hidden; }
      [x-cloak] { display: none !important; }
      [data-dragging="true"] { opacity: 0.45; }
      [data-done="true"] .step-label { color: #64748b; text-decoration: line-through; }
      dialog { margin: 12vh auto auto auto; }
    </style>
  </head>
  <body class="h-full bg-stone-50 text-slate-950">
    <main class="mx-auto grid h-full w-full max-w-3xl grid-rows-[minmax(0,1fr)_auto] overflow-hidden" x-data="routineRunner" x-init="init()" @pointermove.window="moveDragged" @pointerup.window="endDrag" x-cloak>
      <div class="min-h-0 overflow-y-auto px-5 py-6 sm:px-6">
        <section x-show="ui.tab === 'plan'" class="grid gap-6">
          <div class="grid gap-3">
            <p class="text-xs font-black uppercase tracking-wide text-violet-700">Plan</p>
            <h1 class="text-4xl font-black tracking-tight text-slate-950">Routine Runner</h1>
            <p class="max-w-xl text-sm leading-6 text-slate-600">Create reusable routines, run a session, and keep finished sessions in history.</p>
          </div>

          <section class="grid gap-4">
            <div class="flex items-end justify-between gap-3">
              <h2 class="text-xl font-black tracking-tight">Routines</h2>
              <button class="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-black text-slate-800 shadow-sm active:scale-[.98]" type="button" @click="openRoutineDialog()">New routine</button>
            </div>

            <div class="grid gap-4" x-ref="routineList">
              <template x-for="(routine, routineIndex) in state.routines" :key="routine.id">
                <details open class="group relative rounded-2xl bg-white shadow-sm ring-1 ring-slate-200" :data-id="routine.id" :data-index="routineIndex" @toggle="rememberRoutineOpen(routine.id, $event.target.open)">
                  <summary class="grid min-h-24 cursor-pointer list-none grid-cols-[minmax(0,1fr)_auto] items-start gap-4 px-5 py-4 pr-20">
                    <div class="min-w-0 pt-1">
                      <strong class="block truncate text-base font-black" x-text="routine.name"></strong>
                      <span class="text-xs font-bold uppercase text-slate-500" x-text="routine.steps.length + ' steps'"></span>
                    </div>
                    <span class="absolute right-4 top-4 grid h-7 w-7 place-items-center rounded-full bg-stone-100 text-sm font-black text-slate-500 transition-transform group-open:rotate-180" aria-hidden="true">⌄</span>
                    <button class="absolute right-20 top-4 grid h-7 w-7 place-items-center rounded-full border border-slate-200 bg-white text-sm font-black text-slate-500 hover:text-violet-700" type="button" aria-label="Rename routine" title="Rename" @click.stop.prevent="openRoutineDialog(routine.id)">
                      <span class="inline-block scale-x-[-1]" aria-hidden="true">✎</span>
                    </button>
                    <button class="absolute right-12 top-4 grid h-7 w-7 place-items-center rounded-full border border-red-100 bg-red-50 text-base font-black leading-none text-red-600 hover:bg-red-100" type="button" aria-label="Delete routine" title="Delete" @click.stop.prevent="openDeleteDialog('routine', routine.id)">×</button>
                    <button class="drag-handle absolute right-4 top-14 grid h-8 w-8 place-items-center rounded-lg border border-slate-200 bg-stone-50 text-base font-black text-slate-500 active:cursor-grabbing" type="button" aria-label="Drag routine" title="Drag" @click.stop.prevent @pointerdown.stop="startDrag($event, 'routine', null)">=</button>
                  </summary>

                  <div class="grid gap-4 border-t border-slate-100 px-5 pb-5 pt-4">
                    <label class="grid gap-2 text-sm font-black text-slate-700">
                      New step
                      <span class="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
                        <input
                          class="min-h-12 rounded-xl border border-slate-300 bg-stone-50 px-4 text-base font-semibold outline-none placeholder:text-slate-400 focus:border-violet-500"
                          autocomplete="off"
                          placeholder="Add a step"
                          x-model="ui.stepDrafts[routine.id]"
                          @keydown.enter.prevent="addStep(routine.id)"
                        >
                        <button class="min-h-12 rounded-xl bg-violet-600 px-5 text-sm font-black text-white active:scale-[.98]" type="button" @click="addStep(routine.id)">Add step</button>
                      </span>
                    </label>

                    <ul class="grid gap-3" :data-routine-id="routine.id">
                      <template x-for="(step, stepIndex) in routine.steps" :key="step.id">
                        <li class="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-2 rounded-xl bg-stone-50 px-4 py-3 ring-1 ring-slate-200" :data-id="step.id" :data-index="stepIndex">
                          <span class="min-w-0 break-words text-sm font-bold text-slate-800" x-text="step.text"></span>
                          <button class="grid h-8 w-8 place-items-center rounded-md text-base font-black text-red-600 hover:bg-red-50" type="button" aria-label="Delete step" title="Delete" @click="deleteStep(routine.id, step.id)">×</button>
                          <button class="drag-handle grid h-8 w-8 place-items-center rounded-md text-base font-black text-slate-400 active:cursor-grabbing" type="button" aria-label="Drag step" title="Drag" @pointerdown.stop="startDrag($event, 'step', routine.id)">=</button>
                        </li>
                      </template>
                      <li class="rounded-xl border border-dashed border-slate-300 px-4 py-4 text-sm font-bold text-slate-500" x-show="routine.steps.length === 0">No steps yet.</li>
                    </ul>
                  </div>
                </details>
              </template>

              <p class="rounded-xl border border-dashed border-slate-300 bg-white/70 p-5 text-center text-sm font-bold text-slate-500" x-show="state.routines.length === 0">No routines yet.</p>
            </div>
          </section>
        </section>

        <section x-show="ui.tab === 'run'" class="grid gap-6">
          <div class="grid gap-3">
            <p class="text-xs font-black uppercase tracking-wide text-emerald-700">Run</p>
            <h1 class="text-4xl font-black tracking-tight text-slate-950">Today's Session</h1>
          </div>

          <section class="grid gap-5 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200" x-show="!state.activeSession">
            <label class="grid gap-2 text-sm font-black text-slate-700">
              Routine
              <select class="min-h-12 rounded-xl border border-slate-300 bg-stone-50 px-4 text-base font-bold outline-none focus:border-emerald-500" x-model="ui.selectedRoutineId">
                <option value="">Choose a routine</option>
                <template x-for="routine in state.routines" :key="routine.id">
                  <option :value="routine.id" x-text="routine.name"></option>
                </template>
              </select>
            </label>
            <button class="min-h-12 rounded-xl bg-emerald-600 px-5 text-base font-black text-white disabled:opacity-40" type="button" :disabled="!canStartSession" @click="startSession">Start session</button>
          </section>

          <section class="grid gap-5" x-show="state.activeSession">
            <div class="rounded-2xl bg-emerald-700 p-5 text-white shadow-sm">
              <p class="text-xs font-black uppercase text-emerald-100">Active routine</p>
              <h2 class="mt-1 text-2xl font-black tracking-tight" x-text="state.activeSession ? state.activeSession.routineName : ''"></h2>
              <p class="mt-2 text-sm font-bold text-emerald-100" x-text="activeSessionLabel"></p>
            </div>

            <ul class="grid gap-3">
              <template x-for="step in activeSteps" :key="step.id">
                <li class="grid gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200" :data-done="step.done">
                  <div class="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
                    <button class="grid h-10 w-10 place-items-center rounded-full border border-slate-300 bg-stone-50 text-sm font-black text-slate-700" type="button" @click="toggleActiveStep(step.id)" x-text="step.done ? 'OK' : ''"></button>
                    <span class="step-label min-w-0 break-words text-base font-black text-slate-900" x-text="step.text"></span>
                  </div>
                  <label class="grid gap-1 text-xs font-black uppercase text-slate-500">
                    Note
                    <input class="min-h-10 rounded-lg border border-slate-200 bg-stone-50 px-3 text-sm font-semibold normal-case text-slate-900 outline-none focus:border-emerald-500" autocomplete="off" placeholder="Optional detail" :value="step.note" @change="updateStepNote(step.id, $event.target.value)">
                  </label>
                </li>
              </template>
            </ul>

            <div class="grid grid-cols-2 gap-2">
              <button class="min-h-12 rounded-xl border border-slate-300 bg-white px-5 text-sm font-black text-slate-700" type="button" @click="openDeleteDialog('session')">Exit session</button>
              <button class="min-h-12 rounded-xl bg-emerald-600 px-5 text-sm font-black text-white" type="button" @click="finishSession">Finish</button>
            </div>
          </section>
        </section>

        <section x-show="ui.tab === 'history'" class="grid gap-6">
          <div class="grid gap-3">
            <div class="flex items-center gap-2">
              <p class="text-xs font-black uppercase tracking-wide text-sky-700">History</p>
              <button class="grid h-6 w-6 place-items-center rounded-full border border-slate-300 bg-white text-xs font-black text-slate-500" type="button" @click="toggleHelp">?</button>
            </div>
            <h1 class="text-4xl font-black tracking-tight text-slate-950">Finished Sessions</h1>
            <p class="rounded-xl bg-sky-50 p-3 text-sm font-semibold leading-6 text-sky-900 ring-1 ring-sky-100" x-show="ui.helpOpen">History is saved app data. Live updates should update this list without resetting the selected tab.</p>
          </div>

          <div class="grid gap-4">
            <template x-for="session in reversedHistory" :key="session.id">
              <details class="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                <summary class="grid cursor-pointer list-none grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 py-4">
                  <div class="min-w-0">
                    <strong class="block truncate text-base font-black" x-text="session.routineName"></strong>
                    <span class="text-xs font-bold text-slate-500" x-text="formatSessionSummary(session)"></span>
                  </div>
                  <span class="rounded-full bg-slate-100 px-2 py-1 text-xs font-black text-slate-600" x-text="session.doneCount + '/' + session.totalCount"></span>
                </summary>
                <div class="grid gap-3 border-t border-slate-100 px-5 pb-5 pt-4">
                  <template x-for="step in session.steps" :key="step.id">
                    <div class="grid gap-1 rounded-xl bg-stone-50 p-4">
                      <p class="text-sm font-black text-slate-800" x-text="step.text"></p>
                      <p class="text-xs font-bold text-slate-500" x-text="step.done ? 'Done' : 'Skipped'"></p>
                      <p class="text-sm leading-5 text-slate-600" x-show="step.note" x-text="step.note"></p>
                    </div>
                  </template>
                  <button class="grid h-9 w-9 place-items-center justify-self-end rounded-full border border-red-100 bg-red-50 text-base font-black text-red-700" type="button" aria-label="Delete history" title="Delete" @click="openDeleteDialog('history', session.id)">×</button>
                </div>
              </details>
            </template>

            <p class="rounded-xl border border-dashed border-slate-300 bg-white/70 p-5 text-center text-sm font-bold text-slate-500" x-show="state.history.length === 0">No finished sessions yet.</p>
          </div>
        </section>
      </div>

      <nav class="z-30 grid grid-cols-3 border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom,0px)] shadow-[0_-8px_24px_rgb(15_23_42_/_6%)]" aria-label="Routine Runner tabs">
        <button class="min-h-16 border-t-4 px-2 text-sm font-black" :class="ui.tab === 'plan' ? 'border-violet-600 text-violet-700' : 'border-transparent text-slate-500'" type="button" @click="setTab('plan')">Plan</button>
        <button class="min-h-16 border-t-4 px-2 text-sm font-black" :class="ui.tab === 'run' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-slate-500'" type="button" @click="setTab('run')">Run</button>
        <button class="min-h-16 border-t-4 px-2 text-sm font-black" :class="ui.tab === 'history' ? 'border-sky-600 text-sky-700' : 'border-transparent text-slate-500'" type="button" @click="setTab('history')">History</button>
      </nav>

      <output id="status" class="fixed left-1/2 top-3 z-20 max-w-[calc(100vw-2rem)] -translate-x-1/2 rounded-full bg-slate-950 px-4 py-2 text-center text-xs font-black text-white shadow-lg transition-opacity" :class="ui.statusVisible ? 'opacity-100' : 'pointer-events-none opacity-0'" x-text="ui.status"></output>

      <dialog x-ref="editDialog" class="w-[92vw] max-w-sm rounded-2xl border border-slate-200 bg-white p-5 text-slate-950 shadow-2xl">
        <div class="grid gap-5">
          <h2 class="text-xl font-black" x-text="dialogTitle"></h2>
          <label class="grid gap-2 text-sm font-black text-slate-700">
            Name
            <input class="min-h-11 rounded-xl border border-slate-300 bg-stone-50 px-3 text-base font-semibold outline-none focus:border-violet-500" autocomplete="off" x-model="ui.dialogDraft" @keydown.enter.prevent="saveDialog">
          </label>
          <div class="flex justify-end gap-2">
            <button class="min-h-10 rounded-xl border border-slate-300 bg-white px-4 text-sm font-black text-slate-700" type="button" @click="$refs.editDialog.close()">Cancel</button>
            <button class="min-h-10 rounded-xl bg-violet-600 px-4 text-sm font-black text-white" type="button" @click="saveDialog">Save</button>
          </div>
        </div>
      </dialog>

      <dialog x-ref="confirmDialog" class="w-[92vw] max-w-sm rounded-2xl border border-slate-200 bg-white p-5 text-slate-950 shadow-2xl">
        <div class="grid gap-5">
          <h2 class="text-xl font-black" x-text="confirmTitle"></h2>
          <p class="text-sm font-semibold leading-6 text-slate-600" x-text="confirmMessage"></p>
          <div class="flex justify-end gap-2">
            <button class="min-h-10 rounded-xl border border-slate-300 bg-white px-4 text-sm font-black text-slate-700" type="button" @click="$refs.confirmDialog.close()">Cancel</button>
            <button class="min-h-10 rounded-xl bg-red-600 px-4 text-sm font-black text-white" type="button" @click="confirmDelete">Delete</button>
          </div>
        </div>
      </dialog>
    </main>

    <script>
      "use strict";

      document.addEventListener("alpine:init", () => {
        Alpine.data("routineRunner", () => ({
          saveInFlight: 0,
          queuedRemoteData: null,
          state: {
            schemaVersion: 1,
            routines: [],
            activeSession: null,
            history: [],
            savedAt: null
          },
          ui: {
            tab: "plan",
            expandedRoutines: {},
            stepDrafts: {},
            selectedRoutineId: "",
            status: "Loading...",
            statusVisible: true,
            statusTimer: null,
            helpOpen: false,
            dialogMode: null,
            dialogRoutineId: null,
            dialogDraft: "",
            confirmKind: null,
            confirmId: null
          },
          drag: {
            kind: null,
            routineId: null,
            itemId: null,
            pointerId: null
          },

          async init() {
            AppLab.onError((message) => this.showStatus("Error: " + message, true));
            AppLab.onDataChange((nextData, info) => {
              if (this.saveInFlight > 0) {
                this.queuedRemoteData = nextData;
                this.showStatus("Remote update queued while saving.", false);
                return;
              }
              this.applyData(nextData);
              this.showStatus("Live update received" + (info && info.version ? " v" + info.version : "") + ".", false);
            });

            const saved = await AppLab.getData(this.defaultData());
            this.applyData(saved);
            this.showStatus("Ready.", false, 1200);
          },

          defaultData() {
            const routineId = this.createId();
            return {
              schemaVersion: 1,
              routines: [{
                id: routineId,
                name: "Morning reset",
                steps: [
                  { id: this.createId(), text: "Drink water" },
                  { id: this.createId(), text: "Write the top task" },
                  { id: this.createId(), text: "Start a ten minute focus block" }
                ]
              }],
              activeSession: null,
              history: [],
              savedAt: null
            };
          },

          applyData(data) {
            const source = data && typeof data === "object" ? data : this.defaultData();
            const routines = Array.isArray(source.routines) ? source.routines : [];
            const history = Array.isArray(source.history) ? source.history : [];
            this.state = {
              schemaVersion: 1,
              routines: routines.map((routine) => ({
                id: typeof routine.id === "string" ? routine.id : this.createId(),
                name: typeof routine.name === "string" && routine.name.trim() ? routine.name : "Untitled routine",
                steps: Array.isArray(routine.steps) ? routine.steps.map((step) => ({
                  id: typeof step.id === "string" ? step.id : this.createId(),
                  text: typeof step.text === "string" ? step.text : ""
                })).filter((step) => step.text.trim()) : []
              })),
              activeSession: this.normalizeActiveSession(source.activeSession),
              history: history.map((session) => this.normalizeHistorySession(session)).filter(Boolean),
              savedAt: typeof source.savedAt === "string" ? source.savedAt : null
            };

            if (!this.ui.selectedRoutineId && this.state.routines[0]) this.ui.selectedRoutineId = this.state.routines[0].id;
            if (Object.keys(this.ui.expandedRoutines).length === 0 && this.state.routines[0]) {
              this.ui.expandedRoutines[this.state.routines[0].id] = true;
            }
          },

          normalizeActiveSession(session) {
            if (!session || typeof session !== "object") return null;
            const steps = Array.isArray(session.steps) ? session.steps : [];
            return {
              id: typeof session.id === "string" ? session.id : this.createId(),
              routineId: typeof session.routineId === "string" ? session.routineId : "",
              routineName: typeof session.routineName === "string" ? session.routineName : "Routine",
              startedAt: typeof session.startedAt === "string" ? session.startedAt : new Date().toISOString(),
              steps: steps.map((step) => ({
                id: typeof step.id === "string" ? step.id : this.createId(),
                text: typeof step.text === "string" ? step.text : "",
                done: Boolean(step.done),
                note: typeof step.note === "string" ? step.note : ""
              })).filter((step) => step.text.trim())
            };
          },

          normalizeHistorySession(session) {
            if (!session || typeof session !== "object") return null;
            const steps = Array.isArray(session.steps) ? session.steps : [];
            return {
              id: typeof session.id === "string" ? session.id : this.createId(),
              routineName: typeof session.routineName === "string" ? session.routineName : "Routine",
              startedAt: typeof session.startedAt === "string" ? session.startedAt : new Date().toISOString(),
              finishedAt: typeof session.finishedAt === "string" ? session.finishedAt : new Date().toISOString(),
              doneCount: Number.isFinite(session.doneCount) ? session.doneCount : 0,
              totalCount: Number.isFinite(session.totalCount) ? session.totalCount : steps.length,
              steps: steps.map((step) => ({
                id: typeof step.id === "string" ? step.id : this.createId(),
                text: typeof step.text === "string" ? step.text : "",
                done: Boolean(step.done),
                note: typeof step.note === "string" ? step.note : ""
              })).filter((step) => step.text.trim())
            };
          },

          snapshot() {
            return JSON.parse(JSON.stringify(this.state));
          },

          async saveState(message) {
            this.state.savedAt = new Date().toISOString();
            this.saveInFlight += 1;
            this.showStatus(message || "Saving...", false);
            try {
              await AppLab.saveData(this.snapshot());
              this.showStatus("Saved.", false, 1500);
            } finally {
              this.saveInFlight -= 1;
              if (this.saveInFlight === 0 && this.queuedRemoteData) {
                const nextData = this.queuedRemoteData;
                this.queuedRemoteData = null;
                this.applyData(nextData);
              }
            }
          },

          showStatus(message, sticky, hideAfter) {
            this.ui.status = message;
            this.ui.statusVisible = true;
            if (this.ui.statusTimer) window.clearTimeout(this.ui.statusTimer);
            if (!sticky) {
              this.ui.statusTimer = window.setTimeout(() => {
                this.ui.statusVisible = false;
              }, hideAfter || 2000);
            }
          },

          setTab(tab) {
            this.ui.tab = tab;
          },

          toggleHelp() {
            this.ui.helpOpen = !this.ui.helpOpen;
          },

          get canStartSession() {
            const routine = this.findRoutine(this.ui.selectedRoutineId);
            return Boolean(routine && routine.steps.length);
          },

          get activeSteps() {
            return this.state.activeSession ? this.state.activeSession.steps : [];
          },

          get activeSessionLabel() {
            if (!this.state.activeSession) return "";
            const done = this.state.activeSession.steps.filter((step) => step.done).length;
            return done + " of " + this.state.activeSession.steps.length + " steps done";
          },

          get reversedHistory() {
            return this.state.history.slice().reverse();
          },

          isRoutineExpanded(id) {
            return Boolean(this.ui.expandedRoutines[id]);
          },

          rememberRoutineOpen(id, isOpen) {
            this.ui.expandedRoutines[id] = isOpen;
          },

          addStep(routineId) {
            const text = (this.ui.stepDrafts[routineId] || "").trim();
            if (!text) return;
            const routine = this.findRoutine(routineId);
            if (!routine) return;
            routine.steps.push({ id: this.createId(), text });
            this.ui.stepDrafts[routineId] = "";
            this.saveState("Saving step...");
          },

          deleteStep(routineId, stepId) {
            const routine = this.findRoutine(routineId);
            if (!routine) return;
            routine.steps = routine.steps.filter((step) => step.id !== stepId);
            this.saveState("Deleting step...");
          },

          openRoutineDialog(routineId) {
            const routine = routineId ? this.findRoutine(routineId) : null;
            this.ui.dialogMode = routine ? "renameRoutine" : "newRoutine";
            this.ui.dialogRoutineId = routine ? routine.id : null;
            this.ui.dialogDraft = routine ? routine.name : "";
            this.$refs.editDialog.showModal();
            window.setTimeout(() => {
              const input = this.$refs.editDialog.querySelector("input");
              if (input) input.focus();
            }, 30);
          },

          get dialogTitle() {
            return this.ui.dialogMode === "renameRoutine" ? "Rename routine" : "New routine";
          },

          saveDialog() {
            const name = this.ui.dialogDraft.trim();
            if (!name) return;
            if (this.ui.dialogMode === "renameRoutine") {
              const routine = this.findRoutine(this.ui.dialogRoutineId);
              if (routine) routine.name = name;
            } else {
              const id = this.createId();
              this.state.routines.push({ id, name, steps: [] });
              this.ui.expandedRoutines[id] = true;
              this.ui.selectedRoutineId = id;
            }
            this.$refs.editDialog.close();
            this.saveState("Saving routine...");
          },

          openDeleteDialog(kind, id) {
            this.ui.confirmKind = kind;
            this.ui.confirmId = id || null;
            this.$refs.confirmDialog.showModal();
          },

          get confirmTitle() {
            if (this.ui.confirmKind === "session") return "Exit session?";
            if (this.ui.confirmKind === "history") return "Delete history?";
            return "Delete routine?";
          },

          get confirmMessage() {
            if (this.ui.confirmKind === "session") return "The active session will be removed. Finished sessions stay in history.";
            if (this.ui.confirmKind === "history") return "This finished session will be removed from history.";
            return "This routine and its steps will be removed.";
          },

          confirmDelete() {
            if (this.ui.confirmKind === "session") {
              this.state.activeSession = null;
            } else if (this.ui.confirmKind === "history") {
              this.state.history = this.state.history.filter((session) => session.id !== this.ui.confirmId);
            } else if (this.ui.confirmKind === "routine") {
              this.state.routines = this.state.routines.filter((routine) => routine.id !== this.ui.confirmId);
              if (this.ui.selectedRoutineId === this.ui.confirmId) this.ui.selectedRoutineId = this.state.routines[0] ? this.state.routines[0].id : "";
            }
            this.$refs.confirmDialog.close();
            this.saveState("Deleting...");
          },

          startSession() {
            const routine = this.findRoutine(this.ui.selectedRoutineId);
            if (!routine || !routine.steps.length) return;
            this.state.activeSession = {
              id: this.createId(),
              routineId: routine.id,
              routineName: routine.name,
              startedAt: new Date().toISOString(),
              steps: routine.steps.map((step) => ({
                id: this.createId(),
                text: step.text,
                done: false,
                note: ""
              }))
            };
            this.ui.tab = "run";
            this.saveState("Starting session...");
          },

          toggleActiveStep(stepId) {
            if (!this.state.activeSession) return;
            const step = this.state.activeSession.steps.find((candidate) => candidate.id === stepId);
            if (!step) return;
            step.done = !step.done;
            this.saveState("Saving session...");
          },

          updateStepNote(stepId, note) {
            if (!this.state.activeSession) return;
            const step = this.state.activeSession.steps.find((candidate) => candidate.id === stepId);
            if (!step) return;
            step.note = note;
            this.saveState("Saving note...");
          },

          finishSession() {
            if (!this.state.activeSession) return;
            const steps = this.state.activeSession.steps.map((step) => ({
              id: step.id,
              text: step.text,
              done: step.done,
              note: step.note
            }));
            const doneCount = steps.filter((step) => step.done).length;
            this.state.history.push({
              id: this.createId(),
              routineName: this.state.activeSession.routineName,
              startedAt: this.state.activeSession.startedAt,
              finishedAt: new Date().toISOString(),
              doneCount,
              totalCount: steps.length,
              steps
            });
            this.state.activeSession = null;
            this.ui.tab = "history";
            this.saveState("Session finished.");
          },

          formatSessionSummary(session) {
            return new Date(session.finishedAt).toLocaleString();
          },

          findRoutine(id) {
            return this.state.routines.find((routine) => routine.id === id);
          },

          startDrag(event, kind, routineId) {
            const item = event.target.closest("[data-id]");
            if (!item) return;
            this.drag.kind = kind;
            this.drag.routineId = routineId;
            this.drag.itemId = item.dataset.id;
            this.drag.pointerId = event.pointerId;
            item.dataset.dragging = "true";
            event.target.setPointerCapture(event.pointerId);
            event.preventDefault();
          },

          moveDragged(event) {
            if (!this.drag.itemId) return;
            const target = document.elementFromPoint(event.clientX, event.clientY);
            const targetItem = target ? target.closest("[data-id]") : null;
            if (!targetItem || targetItem.dataset.id === this.drag.itemId) return;
            if (this.drag.kind === "routine") this.moveRoutineBefore(targetItem.dataset.id);
            if (this.drag.kind === "step") this.moveStepBefore(targetItem.dataset.id);
          },

          endDrag(event) {
            if (!this.drag.itemId) return;
            const dragged = document.querySelector('[data-id="' + this.drag.itemId + '"]');
            if (dragged) dragged.dataset.dragging = "false";
            if (event.target.releasePointerCapture && this.drag.pointerId !== null) {
              try { event.target.releasePointerCapture(this.drag.pointerId); } catch (_) {}
            }
            this.drag.kind = null;
            this.drag.routineId = null;
            this.drag.itemId = null;
            this.drag.pointerId = null;
            this.saveState("Saving order...");
          },

          moveRoutineBefore(targetId) {
            const from = this.state.routines.findIndex((routine) => routine.id === this.drag.itemId);
            const to = this.state.routines.findIndex((routine) => routine.id === targetId);
            if (from < 0 || to < 0 || from === to) return;
            const moved = this.state.routines.splice(from, 1)[0];
            this.state.routines.splice(to, 0, moved);
          },

          moveStepBefore(targetId) {
            const routine = this.findRoutine(this.drag.routineId);
            if (!routine) return;
            const from = routine.steps.findIndex((step) => step.id === this.drag.itemId);
            const to = routine.steps.findIndex((step) => step.id === targetId);
            if (from < 0 || to < 0 || from === to) return;
            const moved = routine.steps.splice(from, 1)[0];
            routine.steps.splice(to, 0, moved);
          },

          createId() {
            if (window.crypto && typeof window.crypto.randomUUID === "function") return window.crypto.randomUUID();
            return "id_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2);
          }
        }));
      });
    </script>
  </body>
</html>`;
