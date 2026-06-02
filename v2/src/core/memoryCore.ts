import { createExampleAppInput } from "./exampleApp";
import { normalizeJsonValue } from "./jsonData";
import type { AppLabCore, AppRecord, AppSummary, CreateAppInput, JsonValue, UpdateAppInput } from "./types";

export function createMemoryCore(): AppLabCore {
  const apps = new Map<string, AppRecord>();
  const appData = new Map<string, JsonValue>();

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
    return createApp(createExampleAppInput());
  }

  async function getAppData(appId: string): Promise<JsonValue> {
    return appData.get(appId) ?? null;
  }

  async function saveAppData(appId: string, data: JsonValue): Promise<void> {
    if (!apps.has(appId)) throw new Error(`App not found: ${appId}`);
    appData.set(appId, normalizeJsonValue(data));
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
    getAppData,
    listApps,
    saveAppData,
    updateApp,
  };
}
