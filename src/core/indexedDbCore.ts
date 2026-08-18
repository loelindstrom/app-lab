import { createAlpineExampleAppInput } from "./alpineExampleApp";
import { readAppHtmlMetadata } from "./htmlMetadata";
import { normalizeJsonValue } from "../jsonData";
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

    await putRecord("apps_registry", record);
    return record;
  }

  function createBlankApp(): Promise<AppRecord> {
    return createApp(createAlpineExampleAppInput());
  }

  async function deleteApp(appId: string): Promise<void> {
    const database = await db();
    const transaction = database.transaction(["apps_registry", "apps_data"], "readwrite");
    transaction.objectStore("apps_registry").delete(appId);
    transaction.objectStore("apps_data").delete(appId);
    await transactionToPromise(transaction);
  }

  async function updateApp(input: UpdateAppInput): Promise<AppRecord> {
    const existing = await getApp(input.appId);
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
    await putRecord("apps_registry", updated);
    return updated;
  }

  async function upsertApp(record: AppRecord): Promise<AppRecord> {
    await putRecord("apps_registry", record);
    return record;
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
    deleteApp,
    getApp,
    getAppData,
    listApps,
    saveAppData,
    updateApp,
    upsertApp,
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

function transactionToPromise(transaction: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
}
