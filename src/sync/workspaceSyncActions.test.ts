import { describe, expect, it } from "vitest";
import { createMemoryCore } from "../core/memoryCore";
import { isRemoteAppDeletedError, loadRemoteAppRooms, saveRemoteAppSource } from "./appRooms";
import { createMemorySyncProvider } from "./memorySyncProvider";
import { createMemorySyncQueueStore } from "./syncQueue";
import { createWorkspaceSyncActions } from "./workspaceSyncActions";
import { createMemoryWorkspaceSyncStore, createWorkspaceSyncRegistry } from "./workspaceSync";
import { createWorkspaceRecoveryMaterial, loadWorkspaceManifest } from "./workspaceManifest";

describe("workspace sync actions", () => {
  it("backs up an owned app, imports the invite into another workspace, and streams data changes", async () => {
    const provider = createMemorySyncProvider();
    const ownerCore = createMemoryCore();
    const ownerRegistry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await ownerRegistry.configureStorageProfile({ databaseUrl: "https://example.firebaseio.com" });
    const ownerActions = createWorkspaceSyncActions({
      core: ownerCore,
      createProviderFromReference: () => provider,
      createProviderFromStorageProfile: () => provider,
      queueStore: createMemorySyncQueueStore(),
      syncRegistry: ownerRegistry,
    });

    const app = await ownerCore.createApp({
      description: "Counts things",
      name: "Counter",
      sourceCode: "<!doctype html><title>Counter</title>",
    });
    await ownerCore.saveAppData(app.appId, { count: 1 });

    await ownerActions.ensureAppBackedUp(app);
    const firstInvite = await ownerActions.createInvite(app.appId);
    const secondInvite = await ownerActions.createInvite(app.appId);

    expect(secondInvite.sourceRoom.roomId).toBe(firstInvite.sourceRoom.roomId);
    expect(secondInvite.dataRoom.roomId).toBe(firstInvite.dataRoom.roomId);

    const joinedCore = createMemoryCore();
    const joinedRegistry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    const joinedActions = createWorkspaceSyncActions({
      core: joinedCore,
      createProviderFromReference: () => provider,
      createProviderFromStorageProfile: () => provider,
      queueStore: createMemorySyncQueueStore(),
      syncRegistry: joinedRegistry,
    });

    await joinedActions.importInvite(firstInvite);

    await expect(joinedCore.getApp(app.appId)).resolves.toMatchObject({
      appId: app.appId,
      name: "Counter",
    });
    await expect(joinedCore.getAppData(app.appId)).resolves.toEqual({ count: 1 });

    let unsubscribe = () => {};
    const dataChange = new Promise((resolve) => {
      void joinedActions.subscribeAppData(app.appId, (change) => resolve(change.data)).then((nextUnsubscribe) => {
        unsubscribe = nextUnsubscribe;
      });
    });

    await ownerActions.pushAppData(app.appId, { count: 2 });

    await expect(dataChange).resolves.toEqual({ count: 2 });
    await expect(joinedCore.getAppData(app.appId)).resolves.toEqual({ count: 2 });
    unsubscribe();
  });

  it("queues source saves and shares the latest queued source", async () => {
    const provider = createMemorySyncProvider();
    const ownerCore = createMemoryCore();
    const ownerRegistry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await ownerRegistry.configureStorageProfile({ databaseUrl: "https://example.firebaseio.com" });
    const ownerActions = createWorkspaceSyncActions({
      core: ownerCore,
      createProviderFromReference: () => provider,
      createProviderFromStorageProfile: () => provider,
      queueStore: createMemorySyncQueueStore(),
      syncRegistry: ownerRegistry,
    });

    const app = await ownerCore.createApp({
      description: "Source test",
      name: "Source test",
      sourceCode: "<!doctype html><title>Initial</title>",
    });
    await ownerActions.ensureAppBackedUp(app);

    const oldSource = await ownerCore.updateApp({
      appId: app.appId,
      name: "Old",
      sourceCode: "<!doctype html><title>Old</title>",
    });
    await ownerActions.pushAppSource(oldSource);
    const latestSource = await ownerCore.updateApp({
      appId: app.appId,
      name: "Latest",
      sourceCode: "<!doctype html><title>Latest</title>",
    });
    await ownerActions.pushAppSource(latestSource);
    await ownerActions.flushSourceSyncQueue();

    const joinedCore = createMemoryCore();
    const joinedRegistry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    const joinedActions = createWorkspaceSyncActions({
      core: joinedCore,
      createProviderFromReference: () => provider,
      createProviderFromStorageProfile: () => provider,
      queueStore: createMemorySyncQueueStore(),
      syncRegistry: joinedRegistry,
    });

    await joinedActions.importInvite(await ownerActions.createInvite(app.appId));

    await expect(joinedCore.getApp(app.appId)).resolves.toMatchObject({
      name: "Latest",
      sourceCode: "<!doctype html><title>Latest</title>",
    });
  });

  it("refreshes stale room versions before deleting owned app rooms", async () => {
    const provider = createMemorySyncProvider();
    const ownerCore = createMemoryCore();
    const ownerRegistry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await ownerRegistry.configureStorageProfile({ databaseUrl: "https://example.firebaseio.com" });
    const ownerActions = createWorkspaceSyncActions({
      core: ownerCore,
      createProviderFromReference: () => provider,
      createProviderFromStorageProfile: () => provider,
      queueStore: createMemorySyncQueueStore(),
      syncRegistry: ownerRegistry,
    });

    const app = await ownerCore.createApp({
      description: "Delete test",
      name: "Delete test",
      sourceCode: "<!doctype html><title>Delete test</title>",
    });
    await ownerCore.saveAppData(app.appId, { count: 1 });
    await ownerActions.ensureAppBackedUp(app);
    await ownerActions.flushRoomLifecycleQueue();

    const staleRecord = await ownerRegistry.getAppSyncRecord(app.appId);
    if (!staleRecord) throw new Error("Expected app sync record.");
    const remotelyUpdatedApp = await ownerCore.updateApp({
      appId: app.appId,
      name: "Remote newer",
      sourceCode: "<!doctype html><title>Remote newer</title>",
    });
    const sourceRoom = await saveRemoteAppSource({ app: remotelyUpdatedApp, provider, syncRecord: staleRecord });
    await ownerRegistry.rememberAppRoomVersions({
      appId: app.appId,
      sourceRoom: { ...sourceRoom, lastSeenVersion: sourceRoom.lastSeenVersion + 5 },
    });

    await expect(ownerActions.deleteSyncedAppRooms(app.appId)).resolves.toBeUndefined();
    await ownerActions.flushOwnedAppDeletionQueue();

    try {
      await loadRemoteAppRooms({ provider, syncRecord: staleRecord });
      throw new Error("Expected remote app to be marked deleted.");
    } catch (error) {
      expect(isRemoteAppDeletedError(error)).toBe(true);
    }
  });

  it("does not delete remote rooms when a joined workspace removes a shared app", async () => {
    const provider = createMemorySyncProvider();
    const ownerCore = createMemoryCore();
    const ownerRegistry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await ownerRegistry.configureStorageProfile({ databaseUrl: "https://example.firebaseio.com" });
    const ownerActions = createWorkspaceSyncActions({
      core: ownerCore,
      createProviderFromReference: () => provider,
      createProviderFromStorageProfile: () => provider,
      queueStore: createMemorySyncQueueStore(),
      syncRegistry: ownerRegistry,
    });

    const app = await ownerCore.createApp({
      description: "Joined delete test",
      name: "Joined delete test",
      sourceCode: "<!doctype html><title>Joined delete test</title>",
    });
    await ownerCore.saveAppData(app.appId, { count: 1 });
    await ownerActions.ensureAppBackedUp(app);
    await ownerActions.flushRoomLifecycleQueue();
    const invite = await ownerActions.createInvite(app.appId);

    const joinedCore = createMemoryCore();
    const joinedRegistry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    const joinedActions = createWorkspaceSyncActions({
      core: joinedCore,
      createProviderFromReference: () => provider,
      createProviderFromStorageProfile: () => provider,
      queueStore: createMemorySyncQueueStore(),
      syncRegistry: joinedRegistry,
    });
    await joinedActions.importInvite(invite);

    await expect(joinedActions.deleteSyncedAppRooms(app.appId)).resolves.toBeUndefined();
    await joinedActions.flushOwnedAppDeletionQueue();

    const ownerRecord = await ownerRegistry.getAppSyncRecord(app.appId);
    if (!ownerRecord) throw new Error("Expected owner sync record.");
    await expect(loadRemoteAppRooms({ provider, syncRecord: ownerRecord })).resolves.toMatchObject({
      app: { appId: app.appId, name: "Joined delete test" },
      appData: { count: 1 },
    });
  });

  it("writes a restorable workspace manifest after backing up local apps", async () => {
    const provider = createMemorySyncProvider();
    const ownerCore = createMemoryCore();
    const ownerRegistry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await ownerRegistry.configureStorageProfile({ databaseUrl: "https://example.firebaseio.com" });
    const ownerActions = createWorkspaceSyncActions({
      core: ownerCore,
      createProviderFromReference: () => provider,
      createProviderFromStorageProfile: () => provider,
      queueStore: createMemorySyncQueueStore(),
      syncRegistry: ownerRegistry,
    });

    const app = await ownerCore.createApp({
      description: "Manifest test",
      name: "Manifest test",
      sourceCode: "<!doctype html><title>Manifest test</title>",
    });
    await ownerCore.saveAppData(app.appId, { count: 1 });

    await ownerActions.backUpLocalApps();

    const state = await ownerRegistry.getState();
    expect(state.manifestRoom?.lastSeenVersion).toBe(1);
    const restored = await loadWorkspaceManifest({
      provider,
      recoveryMaterial: createWorkspaceRecoveryMaterial(state),
    });
    expect(restored.apps[app.appId]).toMatchObject({ appId: app.appId, kind: "owned" });
  });

  it("exports recovery material that hydrates apps into a clean workspace", async () => {
    const provider = createMemorySyncProvider();
    const ownerCore = createMemoryCore();
    const ownerRegistry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await ownerRegistry.configureStorageProfile({ databaseUrl: "https://example.firebaseio.com" });
    const ownerActions = createWorkspaceSyncActions({
      core: ownerCore,
      createProviderFromReference: () => provider,
      createProviderFromStorageProfile: () => provider,
      queueStore: createMemorySyncQueueStore(),
      syncRegistry: ownerRegistry,
    });

    const app = await ownerCore.createApp({
      description: "Recovery export test",
      name: "Recovery export test",
      sourceCode: "<!doctype html><title>Recovery export test</title>",
    });
    await ownerCore.saveAppData(app.appId, { count: 4 });
    await ownerActions.ensureAppBackedUp(app);
    await ownerActions.pushAppSource(app);
    await ownerActions.pushAppData(app.appId, { count: 4 });

    const recoveryText = await ownerActions.exportWorkspaceRecovery();

    const restoredCore = createMemoryCore();
    const restoredRegistry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    const restoredActions = createWorkspaceSyncActions({
      core: restoredCore,
      createProviderFromReference: () => provider,
      createProviderFromStorageProfile: () => provider,
      queueStore: createMemorySyncQueueStore(),
      syncRegistry: restoredRegistry,
    });

    await restoredActions.restoreWorkspaceRecovery(recoveryText);

    await expect(restoredCore.getApp(app.appId)).resolves.toMatchObject({
      appId: app.appId,
      name: "Recovery export test",
    });
    await expect(restoredCore.getAppData(app.appId)).resolves.toEqual({ count: 4 });
  });
});
