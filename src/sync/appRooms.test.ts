import { describe, expect, it } from "vitest";
import { decryptRoomSnapshot } from "./crypto";
import { createMemorySyncProvider } from "./memorySyncProvider";
import { deleteRemoteAppRooms, ensureRemoteAppRooms, isRemoteAppDeletedError, loadRemoteAppRooms, saveRemoteAppData, saveRemoteAppSource } from "./appRooms";
import { createMemoryWorkspaceSyncStore, createWorkspaceSyncRegistry } from "./workspaceSync";
import type { AppRecord } from "../core/types";

describe("app room sync", () => {
  it("creates source and data rooms for an owned app", async () => {
    const provider = createMemorySyncProvider();
    const registry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await registry.configureStorageProfile({ databaseUrl: "https://example.firebaseio.com" });
    const syncRecord = await registry.ensureOwnedAppRooms("app-1");
    const app = exampleApp();

    await ensureRemoteAppRooms({
      app,
      appData: { count: 3 },
      provider,
      syncRecord,
    });

    const sourceSnapshot = await provider.loadRoom({ readToken: syncRecord.sourceRoom.readToken, roomId: syncRecord.sourceRoom.roomId });
    const dataSnapshot = await provider.loadRoom({ readToken: syncRecord.dataRoom.readToken, roomId: syncRecord.dataRoom.roomId });

    await expect(decryptRoomSnapshot({ capability: syncRecord.sourceRoom, roomType: "app-package", snapshot: sourceSnapshot })).resolves.toMatchObject({
      app: { appId: "app-1", name: "Example" },
      schemaVersion: 1,
    });
    await expect(decryptRoomSnapshot({ capability: syncRecord.dataRoom, roomType: "app-data", snapshot: dataSnapshot })).resolves.toEqual({ count: 3 });
  });

  it("does not fail if rooms were already created", async () => {
    const provider = createMemorySyncProvider();
    const registry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await registry.configureStorageProfile({ databaseUrl: "https://example.firebaseio.com" });
    const syncRecord = await registry.ensureOwnedAppRooms("app-1");
    const app = exampleApp();

    await ensureRemoteAppRooms({ app, appData: null, provider, syncRecord });
    await expect(ensureRemoteAppRooms({ app, appData: null, provider, syncRecord })).resolves.toBeUndefined();
  });

  it("loads source and data rooms back into app records", async () => {
    const provider = createMemorySyncProvider();
    const registry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await registry.configureStorageProfile({ databaseUrl: "https://example.firebaseio.com" });
    const syncRecord = await registry.ensureOwnedAppRooms("app-1");
    const app = exampleApp();
    await ensureRemoteAppRooms({ app, appData: { count: 7 }, provider, syncRecord });

    const loaded = await loadRemoteAppRooms({ provider, syncRecord });

    expect(loaded.app).toMatchObject({
      appId: "app-1",
      compiledCss: ".bg-slate-950 { background: #020617; }",
      compiledCssSourceHash: "source-hash",
      name: "Example",
      sourceCode: app.sourceCode,
    });
    expect(loaded.appData).toEqual({ count: 7 });
    expect(loaded.sourceRoom.lastSeenVersion).toBe(1);
    expect(loaded.dataRoom.lastSeenVersion).toBe(1);
  });

  it("pushes source and data updates with remembered room versions", async () => {
    const provider = createMemorySyncProvider();
    const registry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await registry.configureStorageProfile({ databaseUrl: "https://example.firebaseio.com" });
    let syncRecord = await registry.ensureOwnedAppRooms("app-1");
    const app = exampleApp();
    await ensureRemoteAppRooms({ app, appData: { count: 1 }, provider, syncRecord });
    const loaded = await loadRemoteAppRooms({ provider, syncRecord });
    syncRecord = {
      ...syncRecord,
      dataRoom: loaded.dataRoom,
      sourceRoom: loaded.sourceRoom,
    };

    const nextSourceRoom = await saveRemoteAppSource({
      app: { ...app, name: "Updated", updatedAt: "2026-01-02T00:00:00.000Z" },
      provider,
      syncRecord,
    });
    const nextDataRoom = await saveRemoteAppData({
      appData: { count: 2 },
      provider,
      syncRecord: { ...syncRecord, sourceRoom: nextSourceRoom },
    });
    const updated = await loadRemoteAppRooms({
      provider,
      syncRecord: { ...syncRecord, dataRoom: nextDataRoom, sourceRoom: nextSourceRoom },
    });

    expect(updated.app.name).toBe("Updated");
    expect(updated.appData).toEqual({ count: 2 });
    expect(updated.sourceRoom.lastSeenVersion).toBe(2);
    expect(updated.dataRoom.lastSeenVersion).toBe(2);
  });

  it("overwrites an existing remote source room when local version is unknown", async () => {
    const provider = createMemorySyncProvider();
    const registry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await registry.configureStorageProfile({ databaseUrl: "https://example.firebaseio.com" });
    const syncRecord = await registry.ensureOwnedAppRooms("app-1");
    const app = exampleApp();
    await ensureRemoteAppRooms({ app, appData: null, provider, syncRecord });

    const nextSourceRoom = await saveRemoteAppSource({
      app: { ...app, name: "Tailored", sourceCode: "<!doctype html><title>Tailored</title>" },
      provider,
      syncRecord,
    });
    const loaded = await loadRemoteAppRooms({
      provider,
      syncRecord: { ...syncRecord, sourceRoom: nextSourceRoom },
    });

    expect(loaded.app.name).toBe("Tailored");
    expect(loaded.app.sourceCode).toContain("Tailored");
    expect(nextSourceRoom.lastSeenVersion).toBe(2);
  });

  it("recreates missing owned rooms even when a local version was remembered", async () => {
    const provider = createMemorySyncProvider();
    const registry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await registry.configureStorageProfile({ databaseUrl: "https://example.firebaseio.com" });
    const syncRecord = await registry.ensureOwnedAppRooms("app-1");
    await ensureRemoteAppRooms({ app: exampleApp(), appData: { count: 1 }, provider, syncRecord });
    const loaded = await loadRemoteAppRooms({ provider, syncRecord });

    const dataRoomV2 = await saveRemoteAppData({
      appData: { count: 2 },
      provider,
      syncRecord: { ...syncRecord, dataRoom: loaded.dataRoom, sourceRoom: loaded.sourceRoom },
    });
    await provider.deleteRoom({
      roomId: dataRoomV2.roomId,
      writeToken: dataRoomV2.writeToken ?? "",
    });

    const recreatedDataRoom = await saveRemoteAppData({
      appData: { count: 3 },
      provider,
      syncRecord: { ...syncRecord, dataRoom: dataRoomV2, sourceRoom: loaded.sourceRoom },
    });
    const dataSnapshot = await provider.loadRoom({ readToken: recreatedDataRoom.readToken, roomId: recreatedDataRoom.roomId });

    await expect(decryptRoomSnapshot({ capability: recreatedDataRoom, roomType: "app-data", snapshot: dataSnapshot })).resolves.toEqual({ count: 3 });
    expect(recreatedDataRoom.lastSeenVersion).toBe(1);
  });

  it("marks source as deleted and removes data when deleting a synced app", async () => {
    const provider = createMemorySyncProvider();
    const registry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await registry.configureStorageProfile({ databaseUrl: "https://example.firebaseio.com" });
    const syncRecord = await registry.ensureOwnedAppRooms("app-1");
    const app = exampleApp();
    await ensureRemoteAppRooms({ app, appData: { count: 1 }, provider, syncRecord });

    await deleteRemoteAppRooms({ app, dataProvider: provider, sourceProvider: provider, syncRecord });

    await expect(provider.loadRoom({ readToken: syncRecord.sourceRoom.readToken, roomId: syncRecord.sourceRoom.roomId })).resolves.toMatchObject({ version: 2 });
    await expect(provider.loadRoom({ readToken: syncRecord.dataRoom.readToken, roomId: syncRecord.dataRoom.roomId })).rejects.toThrow(/not found/i);

    let error: unknown;
    try {
      await loadRemoteAppRooms({ provider, syncRecord: { ...syncRecord, sourceRoom: { ...syncRecord.sourceRoom, lastSeenVersion: 2 } } });
    } catch (caught) {
      error = caught;
    }
    expect(isRemoteAppDeletedError(error)).toBe(true);
  });
});

function exampleApp(): AppRecord {
  return {
    appId: "app-1",
    compiledCss: ".bg-slate-950 { background: #020617; }",
    compiledCssSourceHash: "source-hash",
    createdAt: "2026-01-01T00:00:00.000Z",
    description: "Example app",
    name: "Example",
    sourceCode: "<!doctype html><title>Example</title>",
    updatedAt: "2026-01-01T00:00:00.000Z",
  };
}
