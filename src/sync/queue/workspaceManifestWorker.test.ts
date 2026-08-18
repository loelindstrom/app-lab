import { describe, expect, it } from "vitest";
import { createMemorySyncProvider } from "../testing/memorySyncProvider";
import { createMemorySyncQueueStore, enqueueSaveWorkspaceManifest } from "./syncQueue";
import { configureTestStorageProfile } from "../testing/testStorageProfile";
import { createMemoryWorkspaceSyncStore, createWorkspaceSyncRegistry } from "../workspace/workspaceSync";
import { createWorkspaceRecoveryMaterial, loadWorkspaceManifest } from "../workspace/workspaceManifest";
import { processWorkspaceManifestQueue } from "./workspaceManifestWorker";

describe("workspace manifest worker", () => {
  it("saves the encrypted workspace manifest and remembers the accepted version", async () => {
    const provider = createMemorySyncProvider();
    const queueStore = createMemorySyncQueueStore();
    const syncRegistry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await configureTestStorageProfile(syncRegistry);
    await syncRegistry.ensureOwnedAppRooms("app-1");
    const state = await syncRegistry.getState();
    await enqueueSaveWorkspaceManifest(queueStore, state.workspaceId);

    await processWorkspaceManifestQueue({
      createProviderFromStorageProfile: () => provider,
      queueStore,
      syncRegistry,
    });

    const savedState = await syncRegistry.getState();
    expect(savedState.manifestRoom?.lastSeenVersion).toBe(1);
    await expect(queueStore.listItems()).resolves.toEqual([]);

    const restored = await loadWorkspaceManifest({
      provider,
      recoveryMaterial: createWorkspaceRecoveryMaterial(savedState),
    });
    expect(restored.apps["app-1"]).toMatchObject({ appId: "app-1", kind: "owned" });
  });

  it("keeps the queue item pending when the provider is unavailable", async () => {
    const queueStore = createMemorySyncQueueStore();
    const syncRegistry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await configureTestStorageProfile(syncRegistry);
    const state = await syncRegistry.getState();
    await enqueueSaveWorkspaceManifest(queueStore, state.workspaceId);

    await processWorkspaceManifestQueue({
      createProviderFromStorageProfile: () => {
        throw new Error("Offline");
      },
      queueStore,
      syncRegistry,
    });

    await expect(queueStore.listItems()).resolves.toMatchObject([{ attempts: 1, kind: "save-workspace-manifest", status: "pending" }]);
  });

  it("stores the merged manifest returned from a stale save conflict", async () => {
    const provider = createMemorySyncProvider();
    const queueStore = createMemorySyncQueueStore();
    const remoteRegistry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await configureTestStorageProfile(remoteRegistry);
    await remoteRegistry.ensureWorkspaceManifestRoom();
    let remoteState = await remoteRegistry.getState();
    await enqueueSaveWorkspaceManifest(queueStore, remoteState.workspaceId);

    await processWorkspaceManifestQueue({
      createProviderFromStorageProfile: () => provider,
      queueStore,
      syncRegistry: remoteRegistry,
    });
    remoteState = await remoteRegistry.getState();

    const staleRegistry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore(remoteState));
    const staleQueueStore = createMemorySyncQueueStore();
    await remoteRegistry.ensureOwnedAppRooms("remote-app");
    remoteState = await remoteRegistry.getState();
    await enqueueSaveWorkspaceManifest(queueStore, remoteState.workspaceId);
    await processWorkspaceManifestQueue({
      createProviderFromStorageProfile: () => provider,
      queueStore,
      syncRegistry: remoteRegistry,
    });

    await staleRegistry.ensureOwnedAppRooms("local-app");
    const staleState = await staleRegistry.getState();
    await enqueueSaveWorkspaceManifest(staleQueueStore, staleState.workspaceId);
    await processWorkspaceManifestQueue({
      createProviderFromStorageProfile: () => provider,
      queueStore: staleQueueStore,
      syncRegistry: staleRegistry,
    });

    const mergedState = await staleRegistry.getState();
    expect(mergedState.apps["remote-app"]).toMatchObject({ appId: "remote-app", kind: "owned" });
    expect(mergedState.apps["local-app"]).toMatchObject({ appId: "local-app", kind: "owned" });
    expect(mergedState.manifestRoom?.lastSeenVersion).toBe(3);
  });
});
