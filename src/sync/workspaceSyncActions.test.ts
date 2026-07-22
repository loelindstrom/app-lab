import { describe, expect, it } from "vitest";
import { createMemoryCore } from "../core/memoryCore";
import { isRemoteAppDeletedError, loadRemoteAppRooms, saveRemoteAppData, saveRemoteAppSource } from "./appRooms";
import { roomWriteToken } from "./crypto";
import { createMemorySyncProvider } from "./memorySyncProvider";
import { createMemorySyncQueueStore, enqueueSaveAppData, enqueueSaveSource } from "./syncQueue";
import { configureTestStorageProfile } from "./testStorageProfile";
import type { ClaimRoomAccessInput, RealtimeSyncProvider } from "./types";
import { createWorkspaceSyncActions } from "./workspaceSyncActions";
import { createMemoryWorkspaceSyncStore, createWorkspaceSyncRegistry } from "./workspaceSync";
import { createWorkspaceRecoveryMaterial, loadWorkspaceManifest } from "./workspaceManifest";

describe("workspace sync actions", () => {
  it("backs up an owned app, imports the invite into another workspace, and streams data changes", async () => {
    const provider = createMemorySyncProvider();
    const ownerCore = createMemoryCore();
    const ownerRegistry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await configureTestStorageProfile(ownerRegistry);
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

  it("claims invite rooms before loading a shared app", async () => {
    const provider = createMemorySyncProvider();
    const ownerCore = createMemoryCore();
    const ownerRegistry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await configureTestStorageProfile(ownerRegistry);
    const ownerActions = createWorkspaceSyncActions({
      core: ownerCore,
      createProviderFromReference: () => provider,
      createProviderFromStorageProfile: () => provider,
      queueStore: createMemorySyncQueueStore(),
      syncRegistry: ownerRegistry,
    });

    const app = await ownerCore.createApp({
      description: "Claim test",
      name: "Claim test",
      sourceCode: "<!doctype html><title>Claim test</title>",
    });
    await ownerCore.saveAppData(app.appId, { count: 1 });
    await ownerActions.ensureAppBackedUp(app);
    const invite = await ownerActions.createInvite(app.appId);

    const operations: string[] = [];
    const claims: ClaimRoomAccessInput[] = [];
    const claimingProvider: RealtimeSyncProvider = {
      ...provider,
      async claimRoomAccess(input) {
        operations.push(`claim:${input.roomId}`);
        claims.push(input);
      },
      async loadRoom(input) {
        operations.push(`load:${input.roomId}`);
        return provider.loadRoom(input);
      },
    };
    const joinedActions = createWorkspaceSyncActions({
      core: createMemoryCore(),
      createProviderFromReference: () => claimingProvider,
      createProviderFromStorageProfile: () => claimingProvider,
      queueStore: createMemorySyncQueueStore(),
      syncRegistry: createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore()),
    });

    await joinedActions.importInvite(invite);

    expect(claims).toEqual([
      {
        claimToken: roomWriteToken(invite.sourceRoom),
        roomId: invite.sourceRoom.roomId,
      },
      {
        claimToken: roomWriteToken(invite.dataRoom),
        roomId: invite.dataRoom.roomId,
      },
    ]);
    expect(operations.slice(0, 4)).toEqual([
      `claim:${invite.sourceRoom.roomId}`,
      `claim:${invite.dataRoom.roomId}`,
      `load:${invite.sourceRoom.roomId}`,
      `load:${invite.dataRoom.roomId}`,
    ]);
  });

  it("queues source saves and shares the latest queued source", async () => {
    const provider = createMemorySyncProvider();
    const ownerCore = createMemoryCore();
    const ownerRegistry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await configureTestStorageProfile(ownerRegistry);
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
    await configureTestStorageProfile(ownerRegistry);
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
    await configureTestStorageProfile(ownerRegistry);
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
    await configureTestStorageProfile(ownerRegistry);
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
    await configureTestStorageProfile(ownerRegistry);
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

  it("hydrates apps created after workspace recovery in both synced workspaces", async () => {
    const provider = createMemorySyncProvider();
    const ownerCore = createMemoryCore();
    const ownerRegistry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await configureTestStorageProfile(ownerRegistry);
    const ownerActions = createWorkspaceSyncActions({
      core: ownerCore,
      createProviderFromReference: () => provider,
      createProviderFromStorageProfile: () => provider,
      queueStore: createMemorySyncQueueStore(),
      syncRegistry: ownerRegistry,
    });

    const firstApp = await ownerCore.createApp({
      description: "First workspace app",
      name: "First workspace app",
      sourceCode: "<!doctype html><title>First workspace app</title>",
    });
    await ownerCore.saveAppData(firstApp.appId, { source: "initial" });
    await ownerActions.ensureAppBackedUp(firstApp);
    await ownerActions.flushWorkspaceManifestQueue();
    const recoveryText = await ownerActions.exportWorkspaceRecovery();
    await ownerActions.flushWorkspaceManifestQueue();

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
    await restoredActions.flushWorkspaceManifestQueue();

    const ownerCreated = await ownerCore.createApp({
      description: "Created on owner",
      name: "Created on owner",
      sourceCode: "<!doctype html><title>Created on owner</title>",
    });
    await ownerCore.saveAppData(ownerCreated.appId, { source: "owner" });
    await ownerActions.ensureAppBackedUp(ownerCreated);
    await ownerActions.flushWorkspaceManifestQueue();

    await expect(restoredActions.pullLatestWorkspaceManifest()).resolves.toMatchObject({
      appIdsChanged: [ownerCreated.appId],
    });
    await expect(restoredCore.getApp(ownerCreated.appId)).resolves.toMatchObject({
      appId: ownerCreated.appId,
      name: "Created on owner",
    });
    await expect(restoredCore.getAppData(ownerCreated.appId)).resolves.toEqual({ source: "owner" });

    const restoredCreated = await restoredCore.createApp({
      description: "Created on restored",
      name: "Created on restored",
      sourceCode: "<!doctype html><title>Created on restored</title>",
    });
    await restoredCore.saveAppData(restoredCreated.appId, { source: "restored" });
    await restoredActions.ensureAppBackedUp(restoredCreated);
    await restoredActions.flushWorkspaceManifestQueue();

    await expect(ownerActions.pullLatestWorkspaceManifest()).resolves.toMatchObject({
      appIdsChanged: [restoredCreated.appId],
    });
    await expect(ownerCore.getApp(restoredCreated.appId)).resolves.toMatchObject({
      appId: restoredCreated.appId,
      name: "Created on restored",
    });
    await expect(ownerCore.getAppData(restoredCreated.appId)).resolves.toEqual({ source: "restored" });
  });

  it("keeps joined app tombstones when remote deletion reaches another synced recipient device", async () => {
    const provider = createMemorySyncProvider();
    const ownerCore = createMemoryCore();
    const ownerRegistry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await configureTestStorageProfile(ownerRegistry);
    const ownerActions = createWorkspaceSyncActions({
      core: ownerCore,
      createProviderFromReference: () => provider,
      createProviderFromStorageProfile: () => provider,
      queueStore: createMemorySyncQueueStore(),
      syncRegistry: ownerRegistry,
    });

    const app = await ownerCore.createApp({
      description: "Shared tombstone test",
      name: "Shared tombstone test",
      sourceCode: "<!doctype html><title>Shared tombstone test</title>",
    });
    await ownerCore.saveAppData(app.appId, { count: 1 });
    await ownerActions.ensureAppBackedUp(app);
    await ownerActions.flushWorkspaceManifestQueue();
    const invite = await ownerActions.createInvite(app.appId);

    const recipientCore = createMemoryCore();
    const recipientRegistry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await configureTestStorageProfile(recipientRegistry);
    const recipientActions = createWorkspaceSyncActions({
      core: recipientCore,
      createProviderFromReference: () => provider,
      createProviderFromStorageProfile: () => provider,
      queueStore: createMemorySyncQueueStore(),
      syncRegistry: recipientRegistry,
    });
    await recipientActions.importInvite(invite);
    await recipientActions.flushWorkspaceManifestQueue();
    const recipientRecoveryText = await recipientActions.exportWorkspaceRecovery();
    await recipientActions.flushWorkspaceManifestQueue();

    const secondRecipientCore = createMemoryCore();
    const secondRecipientRegistry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    const secondRecipientActions = createWorkspaceSyncActions({
      core: secondRecipientCore,
      createProviderFromReference: () => provider,
      createProviderFromStorageProfile: () => provider,
      queueStore: createMemorySyncQueueStore(),
      syncRegistry: secondRecipientRegistry,
    });
    await secondRecipientActions.restoreWorkspaceRecovery(recipientRecoveryText);
    await secondRecipientActions.flushWorkspaceManifestQueue();

    await ownerActions.deleteSyncedAppRooms(app.appId);
    await ownerActions.flushOwnedAppDeletionQueue();
    await expect(recipientActions.pullLatestAppRooms(app.appId)).resolves.toMatchObject({
      deletedAt: expect.any(String),
    });
    await recipientActions.flushWorkspaceManifestQueue();

    await expect(secondRecipientActions.pullLatestWorkspaceManifest()).resolves.toMatchObject({
      appIdsChanged: [app.appId],
      appIdsDeleted: [],
    });

    await expect(secondRecipientCore.getApp(app.appId)).resolves.toMatchObject({
      appId: app.appId,
      name: "Shared tombstone test",
    });
    await expect(secondRecipientRegistry.getAppSyncBadge(app.appId)).resolves.toMatchObject({
      kind: "needs-attention",
      label: "Deleted by owner",
    });
  });

  it("does not pull remote source/data over pending local work", async () => {
    const provider = createMemorySyncProvider();
    const core = createMemoryCore();
    const queueStore = createMemorySyncQueueStore();
    const registry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await configureTestStorageProfile(registry);
    const actions = createWorkspaceSyncActions({
      core,
      createProviderFromReference: () => provider,
      createProviderFromStorageProfile: () => provider,
      queueStore,
      syncRegistry: registry,
    });

    const app = await core.createApp({
      description: "Pending local work",
      name: "Initial",
      sourceCode: "<!doctype html><title>Initial</title>",
    });
    await core.saveAppData(app.appId, { count: 1 });
    await actions.ensureAppBackedUp(app);
    await actions.flushRoomLifecycleQueue();
    await actions.pushAppSource(app);
    await actions.pushAppData(app.appId, { count: 1 });
    await actions.flushSourceSyncQueue();
    await actions.flushAppDataSyncQueue();

    const syncedRecord = await registry.getAppSyncRecord(app.appId);
    if (!syncedRecord) throw new Error("Expected synced app record.");

    const localApp = await core.updateApp({
      appId: app.appId,
      name: "Local pending",
      sourceCode: "<!doctype html><title>Local pending</title>",
    });
    await core.saveAppData(app.appId, { count: 2 });
    await enqueueSaveSource(queueStore, localApp);
    await enqueueSaveAppData({
      appId: app.appId,
      baseData: { count: 1 },
      baseRemoteVersion: syncedRecord.dataRoom.lastSeenVersion,
      data: { count: 2 },
      roomId: syncedRecord.dataRoom.roomId,
      store: queueStore,
    });

    await saveRemoteAppSource({
      app: {
        ...localApp,
        name: "Remote newer",
        sourceCode: "<!doctype html><title>Remote newer</title>",
      },
      provider,
      syncRecord: syncedRecord,
    });
    await saveRemoteAppData({
      appData: { count: 99 },
      provider,
      syncRecord: syncedRecord,
    });

    await actions.pullLatestAppRooms(app.appId);

    await expect(core.getApp(app.appId)).resolves.toMatchObject({
      name: "Local pending",
      sourceCode: "<!doctype html><title>Local pending</title>",
    });
    await expect(core.getAppData(app.appId)).resolves.toEqual({ count: 2 });
  });
});
