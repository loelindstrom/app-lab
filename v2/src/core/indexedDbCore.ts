import { createExampleAppInput } from "./exampleApp";
import { normalizeJsonValue } from "./jsonData";
import type { AppLabCore, AppRecord, AppSummary, CreateAppInput, JsonValue, UpdateAppInput } from "./types";

const DB_NAME = "app-lab-v2";
const DB_VERSION = 1;

interface AppDataRecord {
  appId: string;
  data: JsonValue;
  updatedAt: string;
}

export function createIndexedDbCore(): AppLabCore {
  let dbPromise: Promise<IDBDatabase> | null = null;

  function db() {
    dbPromise ??= openDatabase();
    return dbPromise;
  }

  async function listApps(): Promise<AppSummary[]> {
    const records = await requestToPromise<AppRecord[]>((await db()).transaction("apps_registry").objectStore("apps_registry").getAll());
    return records
      .map(({ appId, name, description, updatedAt }) => ({ appId, name, description, updatedAt }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  async function getApp(appId: string): Promise<AppRecord | null> {
    return (await requestToPromise<AppRecord | undefined>((await db()).transaction("apps_registry").objectStore("apps_registry").get(appId))) ?? null;
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

    await putRecord("apps_registry", record);
    return record;
  }

  function createBlankApp(): Promise<AppRecord> {
    return createApp(createExampleAppInput());
  }

  async function updateApp(input: UpdateAppInput): Promise<AppRecord> {
    const existing = await getApp(input.appId);
    if (!existing) throw new Error(`App not found: ${input.appId}`);

    const updated: AppRecord = {
      ...existing,
      ...input,
      updatedAt: new Date().toISOString(),
    };
    await putRecord("apps_registry", updated);
    return updated;
  }

  async function getAppData(appId: string): Promise<JsonValue> {
    const record = await requestToPromise<AppDataRecord | undefined>((await db()).transaction("apps_data").objectStore("apps_data").get(appId));
    return record?.data ?? null;
  }

  async function saveAppData(appId: string, data: JsonValue): Promise<void> {
    const existing = await getApp(appId);
    if (!existing) throw new Error(`App not found: ${appId}`);

    await putRecord("apps_data", {
      appId,
      data: normalizeJsonValue(data),
      updatedAt: new Date().toISOString(),
    });
  }

  async function putRecord(storeName: "apps_registry" | "apps_data", record: AppRecord | AppDataRecord) {
    await requestToPromise((await db()).transaction(storeName, "readwrite").objectStore(storeName).put(record));
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

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains("apps_registry")) {
        const registry = db.createObjectStore("apps_registry", { keyPath: "appId" });
        registry.createIndex("updatedAt", "updatedAt");
      }

      if (!db.objectStoreNames.contains("apps_data")) {
        db.createObjectStore("apps_data", { keyPath: "appId" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function requestToPromise<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
