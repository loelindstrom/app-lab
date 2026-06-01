import { createBlankAppInput } from "./blankApp";
import type { AppLabCore, AppRecord, AppSummary, CreateAppInput, UpdateAppInput } from "./types";

export function createMemoryCore(): AppLabCore {
  const apps = new Map<string, AppRecord>();

  seedWelcomeApp(apps);

  async function listApps(): Promise<AppSummary[]> {
    return [...apps.values()]
      .map(({ appId, name, description, updatedAt }) => ({ appId, name, description, updatedAt }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  async function getApp(appId: string): Promise<AppRecord | null> {
    return apps.get(appId) ?? null;
  }

  async function createApp(input: CreateAppInput): Promise<AppRecord> {
    const now = new Date().toISOString();
    const record: AppRecord = {
      appId: crypto.randomUUID(),
      name: input.name,
      description: input.description,
      sourceCode: input.sourceCode,
      createdAt: now,
      updatedAt: now,
    };
    apps.set(record.appId, record);
    return record;
  }

  async function createBlankApp(): Promise<AppRecord> {
    return createApp(createBlankAppInput());
  }

  async function updateApp(input: UpdateAppInput): Promise<AppRecord> {
    const existing = apps.get(input.appId);
    if (!existing) throw new Error(`App not found: ${input.appId}`);

    const updated: AppRecord = {
      ...existing,
      ...input,
      updatedAt: new Date().toISOString(),
    };
    apps.set(updated.appId, updated);
    return updated;
  }

  return {
    createApp,
    createBlankApp,
    getApp,
    listApps,
    updateApp,
  };
}

function seedWelcomeApp(apps: Map<string, AppRecord>) {
  const now = new Date().toISOString();
  apps.set("welcome", {
    appId: "welcome",
    name: "Welcome",
    description: "A starter app rendered inside the sandbox.",
    createdAt: now,
    updatedAt: now,
    sourceCode: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Welcome</title>
    <style>
      * { box-sizing: border-box; }
      body {
        background: #fffaf0;
        color: #202521;
        font-family: Inter, ui-sans-serif, system-ui, sans-serif;
        margin: 0;
        min-height: 100vh;
        padding: 32px;
      }
      main { max-width: 760px; }
      h1 { font-size: clamp(44px, 10vw, 92px); line-height: .92; margin: 0 0 20px; }
      p { color: #617069; font-size: 19px; line-height: 1.55; margin: 0; }
    </style>
  </head>
  <body>
    <main>
      <h1>App Lab v2</h1>
      <p>This is the first React shell slice. The app is already isolated in the sandbox surface while the host owns the surrounding workspace tools.</p>
    </main>
  </body>
</html>`,
  });
}
