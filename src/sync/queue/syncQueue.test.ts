import { describe, expect, it } from "vitest";
import {
  createMemorySyncQueueStore,
  enqueueEnsureAppRooms,
  enqueueSaveAppData,
  enqueueSaveSource,
  enqueueSaveWorkspaceManifest,
  markQueueItemFailed,
  markQueueItemSyncing,
  resetSyncingQueueItems,
} from "./syncQueue";

describe("sync queue store", () => {
  it("coalesces ensure-app-rooms work per app", async () => {
    const store = createMemorySyncQueueStore();

    const first = await enqueueEnsureAppRooms(store, "app-1");
    const second = await enqueueEnsureAppRooms(store, "app-1");

    expect(first.id).toBe(second.id);
    await expect(store.listItems()).resolves.toHaveLength(1);
    await expect(store.getItem(first.id)).resolves.toMatchObject({
      appId: "app-1",
      kind: "ensure-app-rooms",
      status: "pending",
    });
  });

  it("marks failed work as pending so future wake-ups can retry it", async () => {
    const store = createMemorySyncQueueStore();
    const item = await enqueueEnsureAppRooms(store, "app-1");

    const syncing = await markQueueItemSyncing(store, item);
    const failed = await markQueueItemFailed(store, syncing, new Error("Network down"));

    expect(failed).toMatchObject({
      attempts: 1,
      lastError: "Network down",
      status: "pending",
    });
    await expect(store.getItem(item.id)).resolves.toMatchObject({
      attempts: 1,
      status: "pending",
    });
  });

  it("resets abandoned syncing work to pending on startup", async () => {
    const store = createMemorySyncQueueStore();
    const item = await enqueueEnsureAppRooms(store, "app-1");
    await markQueueItemSyncing(store, item);

    await resetSyncingQueueItems(store);

    await expect(store.getItem(item.id)).resolves.toMatchObject({
      appId: "app-1",
      kind: "ensure-app-rooms",
      status: "pending",
    });
  });

  it("coalesces save-source work per app and keeps the latest source", async () => {
    const store = createMemorySyncQueueStore();
    const baseApp = {
      appId: "app-1",
      createdAt: "2026-01-01T00:00:00.000Z",
      description: "Example",
      name: "Example",
      updatedAt: "2026-01-01T00:00:00.000Z",
    };

    const first = await enqueueSaveSource(store, {
      ...baseApp,
      sourceCode: "<!doctype html><title>Old</title>",
    });
    const second = await enqueueSaveSource(store, {
      ...baseApp,
      sourceCode: "<!doctype html><title>New</title>",
    });

    expect(first.id).toBe(second.id);
    await expect(store.listItems()).resolves.toHaveLength(1);
    await expect(store.getItem(first.id)).resolves.toMatchObject({
      appId: "app-1",
      kind: "save-source",
      sourceCode: "<!doctype html><title>New</title>",
      status: "pending",
    });
  });

  it("coalesces save-app-data work per app and keeps the latest data", async () => {
    const store = createMemorySyncQueueStore();

    const first = await enqueueSaveAppData({
      appId: "app-1",
      baseData: { count: 0 },
      baseRemoteVersion: 3,
      data: { count: 1 },
      roomId: "room-1",
      store,
    });
    const second = await enqueueSaveAppData({
      appId: "app-1",
      baseData: { count: 1 },
      baseRemoteVersion: 4,
      data: { count: 2 },
      roomId: "room-1",
      store,
    });

    expect(first.id).toBe(second.id);
    await expect(store.listItems()).resolves.toHaveLength(1);
    await expect(store.getItem(first.id)).resolves.toMatchObject({
      appId: "app-1",
      baseData: { count: 0 },
      baseRemoteVersion: 3,
      kind: "save-app-data",
      localData: { count: 2 },
      localRevision: 2,
      status: "pending",
    });
  });

  it("coalesces workspace manifest saves per workspace", async () => {
    const store = createMemorySyncQueueStore();

    const first = await enqueueSaveWorkspaceManifest(store, "workspace-1");
    const second = await enqueueSaveWorkspaceManifest(store, "workspace-1");

    expect(first.id).toBe(second.id);
    await expect(store.listItems()).resolves.toHaveLength(1);
    await expect(store.getItem(first.id)).resolves.toMatchObject({
      appId: "workspace-1",
      kind: "save-workspace-manifest",
      status: "pending",
      workspaceId: "workspace-1",
    });
  });
});
