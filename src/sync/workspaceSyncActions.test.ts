import { describe, expect, it } from "vitest";
import { createMemoryCore } from "../core/memoryCore";
import { createMemorySyncProvider } from "./memorySyncProvider";
import { createWorkspaceSyncActions } from "./workspaceSyncActions";
import { createMemoryWorkspaceSyncStore, createWorkspaceSyncRegistry } from "./workspaceSync";

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
});
