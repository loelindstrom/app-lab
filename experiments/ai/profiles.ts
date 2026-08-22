import { APP_LAB_RUNTIME_GUIDANCE } from "../../src/ai/prompt.ts";
import {
  createBuiltInBuilderProfiles,
  OPINIONATED_BUILDER_PROFILE_ID,
  resolveBuilderProfilePrompt,
} from "../../src/ai/profiles.ts";

export interface AiEvaluationProfile {
  description: string;
  id: string;
  sourceCode: string;
  systemPrompt: (appName: string) => string;
}

export const STOPWATCH_SCENARIO = {
  appName: "Example App",
  id: "stopwatch-saved-times",
  userMessage: "I'd like a stopwatch app, but where finished times are saved in separate tab",
};

const COMPACT_STARTER_SOURCE = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Minimal App Lab starter.">
    <meta name="app-lab-tailwind" content="enabled">
    <title>Example App</title>
    <style>[x-cloak] { display: none !important; }</style>
  </head>
  <body class="min-h-screen bg-white text-slate-950">
    <main x-data="starter" x-init="init()" x-cloak>
      <p x-text="state.message"></p>
      <button type="button" @click="save()">Save</button>
    </main>
    <script>
      document.addEventListener("alpine:init", () => {
        Alpine.data("starter", () => ({
          state: { schemaVersion: 1, message: "Ready" },
          async init() {
            this.state = await AppLab.getData(this.state);
            AppLab.onDataChange((nextData) => { if (nextData) this.state = nextData; });
          },
          async save() {
            await AppLab.saveData(JSON.parse(JSON.stringify(this.state)));
          }
        }));
      });
    </script>
  </body>
</html>`;

const productionProfile = createBuiltInBuilderProfiles().find(
  (profile) => profile.profileId === OPINIONATED_BUILDER_PROFILE_ID,
);
if (!productionProfile) throw new Error("The production Opinionated Builder profile is missing.");

export const AI_EVALUATION_PROFILES: AiEvaluationProfile[] = [
  {
    description: "Current production prompt and full Opinionated Board source.",
    id: "baseline",
    sourceCode: productionProfile.starterSource,
    systemPrompt: (appName) => resolveBuilderProfilePrompt(productionProfile.promptTemplate, appName),
  },
  {
    description: "Copy-prompt-aligned, scope-conscious prompt with the full Opinionated Board source.",
    id: "restrained",
    sourceCode: productionProfile.starterSource,
    systemPrompt: createRestrainedBuilderPrompt,
  },
  {
    description: "The restrained prompt with a compact App Lab starter instead of the full Example App.",
    id: "compact-starter",
    sourceCode: COMPACT_STARTER_SOURCE,
    systemPrompt: createRestrainedBuilderPrompt,
  },
  {
    description: "Compact starter plus an explicit prohibition on common speculative secondary workflows.",
    id: "strict-compact",
    sourceCode: COMPACT_STARTER_SOURCE,
    systemPrompt: createStrictScopeBuilderPrompt,
  },
];

function createRestrainedBuilderPrompt(appName: string): string {
  return createScopeAwareBuilderPrompt(appName, false);
}

function createStrictScopeBuilderPrompt(appName: string): string {
  return createScopeAwareBuilderPrompt(appName, true);
}

function createScopeAwareBuilderPrompt(appName: string, strictScope: boolean): string {
  return `You are helping me edit an App Lab sandbox app named "${appName}".

Return one complete single-file HTML document. Use inline JavaScript, host-compiled Tailwind classes, Alpine.js, and minimal inline CSS only when Tailwind cannot express a rule.

You are operating as BuilderAI and can use host-provided tools for exactly one active app. You cannot access other apps, API keys, app data, sync configuration, or browser storage.

Product intent:
- Implement the behavior the user requests and behavior that is clearly necessary for it to work.
- Prefer a small, polished, working app over speculative features. Leave room for the user to iterate.
- Do not add analytics, categories, filters, statistics, complex editing workflows, or other product scope unless requested or clearly required.
${strictScope ? "- Do not add optional secondary workflows such as laps or splits, labels, tags, notes, search, sorting, editing, deletion, keyboard shortcuts, or extra dialogs unless the user asks for them." : ""}

Important host boundaries:
- App Lab already displays the app title from <title> in its surrounding frame. Do not repeat the app name, branding, a title header, or a top app bar inside the generated app unless the user explicitly asks for one.
- Never use <form>, form submission, or buttons with type="submit". Use button type="button" and explicit click handlers.

Agent workflow:
- Use read_current_app_source before editing unless the user asks only a general question.
- Use read_recent_console_output when the request concerns an error or broken behavior.
- Use replace_current_app_source when the user asks for an app change.
- Never ask a tool to operate on an app id; the host binds every tool to the active app.
- After a successful replacement, briefly summarize what changed.
- Ask a clarifying question only when the missing information prevents a sensible small implementation.

${APP_LAB_RUNTIME_GUIDANCE}`;
}
