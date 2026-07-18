import type { JsonValue } from "../core/types";
import type { AppRecord } from "../core/types";
import type { OwnedAppSyncRecord, PrivateCopySyncRecord } from "./workspaceSync";

const QUEUE_DB_NAME = "app-lab-sync-queue-v1";
const QUEUE_DB_VERSION = 1;
const QUEUE_STORE = "sync_queue";
const STALE_SYNCING_AFTER_MS = 2 * 60 * 1000;

export type PendingSyncStatus = "pending" | "syncing" | "problem";

interface PendingSyncItemBase {
  id: string;
  appId: string;
  attempts: number;
  createdAt: string;
  lastError?: string;
  status: PendingSyncStatus;
  updatedAt: string;
}

export interface EnsureAppRoomsQueueItem extends PendingSyncItemBase {
  kind: "ensure-app-rooms";
}

export interface SaveSourceQueueItem extends PendingSyncItemBase {
  kind: "save-source";
  sourceCode: string;
}

export interface SaveAppDataQueueItem extends PendingSyncItemBase {
  baseData: JsonValue;
  baseRemoteVersion: number;
  inFlightRevision: number | null;
  kind: "save-app-data";
  localData: JsonValue;
  localRevision: number;
  roomId: string;
}

export interface DeleteOwnedAppQueueItem extends PendingSyncItemBase {
  app: AppRecord;
  kind: "delete-owned-app";
  syncRecord: OwnedAppSyncRecord | PrivateCopySyncRecord;
}

export interface SaveWorkspaceManifestQueueItem extends PendingSyncItemBase {
  kind: "save-workspace-manifest";
  workspaceId: string;
}

export type PendingSyncItem =
  | DeleteOwnedAppQueueItem
  | EnsureAppRoomsQueueItem
  | SaveAppDataQueueItem
  | SaveSourceQueueItem
  | SaveWorkspaceManifestQueueItem;

export interface SyncQueueStore {
  getItem(id: string): Promise<PendingSyncItem | null>;
  listItems(): Promise<PendingSyncItem[]>;
  putItem(item: PendingSyncItem): Promise<void>;
  removeItem(id: string): Promise<void>;
}

export function ensureAppRoomsQueueId(appId: string): string {
  return `ensure-app-rooms:${appId}`;
}

export function saveSourceQueueId(appId: string): string {
  return `save-source:${appId}`;
}

export function saveAppDataQueueId(appId: string): string {
  return `save-app-data:${appId}`;
}

export function deleteOwnedAppQueueId(appId: string): string {
  return `delete-owned-app:${appId}`;
}

export function saveWorkspaceManifestQueueId(workspaceId: string): string {
  return `save-workspace-manifest:${workspaceId}`;
}

export async function enqueueEnsureAppRooms(store: SyncQueueStore, appId: string): Promise<EnsureAppRoomsQueueItem> {
  const id = ensureAppRoomsQueueId(appId);
  const existing = await store.getItem(id);
  const now = new Date().toISOString();
  const item: EnsureAppRoomsQueueItem = {
    appId,
    attempts: existing?.attempts ?? 0,
    createdAt: existing?.createdAt ?? now,
    id,
    kind: "ensure-app-rooms",
    status: "pending",
    updatedAt: now,
  };
  await store.putItem(item);
  return item;
}

export async function enqueueDeleteOwnedApp(input: {
  app: AppRecord;
  store: SyncQueueStore;
  syncRecord: OwnedAppSyncRecord | PrivateCopySyncRecord;
}): Promise<DeleteOwnedAppQueueItem> {
  const id = deleteOwnedAppQueueId(input.app.appId);
  const existing = await input.store.getItem(id);
  const now = new Date().toISOString();
  const item: DeleteOwnedAppQueueItem = {
    app: input.app,
    appId: input.app.appId,
    attempts: existing?.attempts ?? 0,
    createdAt: existing?.createdAt ?? now,
    id,
    kind: "delete-owned-app",
    status: "pending",
    syncRecord: input.syncRecord,
    updatedAt: now,
  };
  await input.store.putItem(item);
  return item;
}

export async function enqueueSaveSource(store: SyncQueueStore, app: AppRecord): Promise<SaveSourceQueueItem> {
  const id = saveSourceQueueId(app.appId);
  const existing = await store.getItem(id);
  const now = new Date().toISOString();
  const item: SaveSourceQueueItem = {
    appId: app.appId,
    attempts: existing?.attempts ?? 0,
    createdAt: existing?.createdAt ?? now,
    id,
    kind: "save-source",
    sourceCode: app.sourceCode,
    status: "pending",
    updatedAt: now,
  };
  await store.putItem(item);
  return item;
}

export async function enqueueSaveAppData(input: {
  appId: string;
  baseData: JsonValue;
  baseRemoteVersion: number;
  data: JsonValue;
  roomId: string;
  store: SyncQueueStore;
}): Promise<SaveAppDataQueueItem> {
  const id = saveAppDataQueueId(input.appId);
  const existing = await input.store.getItem(id);
  const now = new Date().toISOString();
  const previous = existing?.kind === "save-app-data" ? existing : null;
  const item: SaveAppDataQueueItem = {
    appId: input.appId,
    attempts: previous?.attempts ?? 0,
    baseData: previous?.baseData ?? input.baseData,
    baseRemoteVersion: previous?.baseRemoteVersion ?? input.baseRemoteVersion,
    createdAt: previous?.createdAt ?? now,
    id,
    inFlightRevision: null,
    kind: "save-app-data",
    localData: input.data,
    localRevision: (previous?.localRevision ?? 0) + 1,
    roomId: input.roomId,
    status: "pending",
    updatedAt: now,
  };
  await input.store.putItem(item);
  return item;
}

export async function enqueueSaveWorkspaceManifest(store: SyncQueueStore, workspaceId: string): Promise<SaveWorkspaceManifestQueueItem> {
  const id = saveWorkspaceManifestQueueId(workspaceId);
  const existing = await store.getItem(id);
  const now = new Date().toISOString();
  const item: SaveWorkspaceManifestQueueItem = {
    appId: workspaceId,
    attempts: existing?.attempts ?? 0,
    createdAt: existing?.createdAt ?? now,
    id,
    kind: "save-workspace-manifest",
    status: "pending",
    updatedAt: now,
    workspaceId,
  };
  await store.putItem(item);
  return item;
}

export async function markQueueItemSyncing(store: SyncQueueStore, item: PendingSyncItem): Promise<PendingSyncItem> {
  const updated = {
    ...item,
    status: "syncing" as const,
    updatedAt: new Date().toISOString(),
  };
  await store.putItem(updated);
  return updated;
}

export async function markQueueItemFailed(store: SyncQueueStore, item: PendingSyncItem, error: unknown): Promise<PendingSyncItem> {
  const updated = {
    ...item,
    attempts: item.attempts + 1,
    lastError: error instanceof Error ? error.message : "Unknown sync error.",
    status: "pending" as const,
    updatedAt: new Date().toISOString(),
  };
  await store.putItem(updated);
  return updated;
}

export function isQueueItemStaleSyncing(item: PendingSyncItem, now = new Date()): boolean {
  return item.status === "syncing" && now.getTime() - new Date(item.updatedAt).getTime() > STALE_SYNCING_AFTER_MS;
}

export async function removeQueueItemIfCurrent(store: SyncQueueStore, item: PendingSyncItem): Promise<void> {
  const current = await store.getItem(item.id);
  if (!current || current.updatedAt !== item.updatedAt || current.status !== item.status) return;
  await store.removeItem(item.id);
}

export async function resetSyncingQueueItems(store: SyncQueueStore): Promise<void> {
  const items = await store.listItems();
  const now = new Date().toISOString();
  await Promise.all(
    items
      .filter((item) => item.status === "syncing")
      .map((item) =>
        store.putItem({
          ...item,
          status: "pending" as const,
          updatedAt: now,
        }),
      ),
  );
}

export function createMemorySyncQueueStore(initialItems: PendingSyncItem[] = []): SyncQueueStore {
  const items = new Map(initialItems.map((item) => [item.id, cloneItem(item)]));

  return {
    async getItem(id) {
      const item = items.get(id);
      return item ? cloneItem(item) : null;
    },
    async listItems() {
      return [...items.values()].map(cloneItem).sort(compareQueueItems);
    },
    async putItem(item) {
      items.set(item.id, cloneItem(item));
    },
    async removeItem(id) {
      items.delete(id);
    },
  };
}

export function createIndexedDbSyncQueueStore(): SyncQueueStore {
  let dbPromise: Promise<IDBDatabase> | null = null;

  function db() {
    dbPromise ??= openQueueDatabase();
    return dbPromise;
  }

  return {
    async getItem(id) {
      const item = await requestToPromise<PendingSyncItem | undefined>((await db()).transaction(QUEUE_STORE).objectStore(QUEUE_STORE).get(id));
      return item ? cloneItem(item) : null;
    },
    async listItems() {
      const items = await requestToPromise<PendingSyncItem[]>((await db()).transaction(QUEUE_STORE).objectStore(QUEUE_STORE).getAll());
      return items.map(cloneItem).sort(compareQueueItems);
    },
    async putItem(item) {
      await requestToPromise((await db()).transaction(QUEUE_STORE, "readwrite").objectStore(QUEUE_STORE).put(cloneItem(item)));
    },
    async removeItem(id) {
      await requestToPromise((await db()).transaction(QUEUE_STORE, "readwrite").objectStore(QUEUE_STORE).delete(id));
    },
  };
}

function openQueueDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(QUEUE_DB_NAME, QUEUE_DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(QUEUE_STORE)) {
        const store = db.createObjectStore(QUEUE_STORE, { keyPath: "id" });
        store.createIndex("status", "status");
        store.createIndex("kind", "kind");
        store.createIndex("updatedAt", "updatedAt");
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

function compareQueueItems(left: PendingSyncItem, right: PendingSyncItem): number {
  return left.createdAt.localeCompare(right.createdAt) || left.id.localeCompare(right.id);
}

function cloneItem<T extends PendingSyncItem>(item: T): T {
  return JSON.parse(JSON.stringify(item)) as T;
}
