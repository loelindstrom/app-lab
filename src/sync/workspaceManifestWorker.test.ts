import { describe, expect, it } from "vitest";
import { createMemorySyncProvider } from "./memorySyncProvider";
import { createMemorySyncQueueStore, enqueueSaveWorkspaceManifest } from "./syncQueue";
import { configureTestStorageProfile } from "./testStorageProfile";
import { createMemoryWorkspaceSyncStore, createWorkspaceSyncRegistry } from "./workspaceSync";
import { createWorkspaceRecoveryMaterial, loadWorkspaceManifest } from "./workspaceManifest";
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
});
