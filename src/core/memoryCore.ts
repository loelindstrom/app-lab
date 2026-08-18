import { createAlpineExampleAppInput } from "./alpineExampleApp";
import { readAppHtmlMetadata } from "./htmlMetadata";
import { normalizeJsonValue } from "../jsonData";
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
    const metadata = readAppHtmlMetadata(input.sourceCode, { description: input.description, name: input.name });
    const record: AppRecord = {
      appId: crypto.randomUUID(),
      compiledCss: input.compiledCss,
      compiledCssSourceHash: input.compiledCssSourceHash,
      name: metadata.name,
      description: metadata.description,
      sourceCode: input.sourceCode,
      createdAt: now,
      updatedAt: now,
    };
    apps.set(record.appId, record);
    return record;
  }

  async function createBlankApp(): Promise<AppRecord> {
    return createApp(createAlpineExampleAppInput());
  }

  async function deleteApp(appId: string): Promise<void> {
    apps.delete(appId);
    appData.delete(appId);
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

    const updated: AppRecord =
      input.sourceCode === undefined
        ? {
            ...existing,
            ...input,
            updatedAt: new Date().toISOString(),
          }
        : {
            ...existing,
            ...input,
            ...readAppHtmlMetadata(input.sourceCode, { description: existing.description, name: existing.name }),
            updatedAt: new Date().toISOString(),
          };
    apps.set(updated.appId, updated);
    return updated;
  }

  async function upsertApp(record: AppRecord): Promise<AppRecord> {
    apps.set(record.appId, record);
    return record;
  }

  return {
    createApp,
    createBlankApp,
    deleteApp,
    getApp,
    getAppData,
    listApps,
    saveAppData,
    updateApp,
    upsertApp,
  };
}
