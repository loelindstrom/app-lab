import { describe, expect, it } from "vitest";
import { createMemorySyncProvider } from "../testing/memorySyncProvider";
import { configureTestStorageProfile } from "../testing/testStorageProfile";
import { createMemoryWorkspaceSyncStore, createWorkspaceSyncRegistry } from "./workspaceSync";
import {
  createWorkspaceRecoveryMaterial,
  decodeWorkspaceRecoveryMaterial,
  encodeWorkspaceRecoveryMaterial,
  loadLatestWorkspaceManifest,
  loadWorkspaceManifest,
  saveWorkspaceManifest,
} from "./workspaceManifest";

describe("workspace manifest sync", () => {
  it("backs up and restores workspace sync metadata", async () => {
    const provider = createMemorySyncProvider();
    const registry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await configureTestStorageProfile(registry);
    await registry.ensureWorkspaceManifestRoom();
    await registry.ensureOwnedAppRooms("app-1");

    const savedState = await saveWorkspaceManifest({
      provider,
      state: await registry.getState(),
    });
    await registry.replaceState(savedState);

    const recovery = createWorkspaceRecoveryMaterial(await registry.getState());
    const encoded = encodeWorkspaceRecoveryMaterial(recovery);
    const decoded = decodeWorkspaceRecoveryMaterial(encoded);
    const restored = await loadWorkspaceManifest({ provider, recoveryMaterial: decoded });

    expect(restored.workspaceId).toBe(savedState.workspaceId);
    expect(restored.apps["app-1"]).toMatchObject({ appId: "app-1", kind: "owned" });
    expect(restored.manifestRoom?.lastSeenVersion).toBe(1);
    expect(restored.storageProfile?.firebaseConfig.databaseURL).toBe("https://example.firebaseio.com");
  });

  it("updates an existing manifest room using the remembered version", async () => {
    const provider = createMemorySyncProvider();
    const registry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await configureTestStorageProfile(registry);
    await registry.ensureWorkspaceManifestRoom();

    const first = await saveWorkspaceManifest({ provider, state: await registry.getState() });
    await registry.replaceState(first);
    await registry.ensureOwnedAppRooms("app-2");
    const second = await saveWorkspaceManifest({ provider, state: await registry.getState() });

    expect(second.manifestRoom?.lastSeenVersion).toBe(2);
    const restored = await loadWorkspaceManifest({
      provider,
      recoveryMaterial: createWorkspaceRecoveryMaterial(second),
    });
    expect(restored.apps["app-2"]).toMatchObject({ appId: "app-2", kind: "owned" });
  });

  it("restores current remote manifest entries when recovery material has an older embedded snapshot", async () => {
    const provider = createMemorySyncProvider();
    const registry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await configureTestStorageProfile(registry);
    await registry.ensureWorkspaceManifestRoom();
    await registry.ensureOwnedAppRooms("app-1");
    const first = await saveWorkspaceManifest({ provider, state: await registry.getState() });
    await registry.replaceState(first);
    const oldRecovery = createWorkspaceRecoveryMaterial(await registry.getState());

    await registry.ensureOwnedAppRooms("app-2");
    const second = await saveWorkspaceManifest({ provider, state: await registry.getState() });
    await registry.replaceState(second);

    const restored = await loadWorkspaceManifest({ provider, recoveryMaterial: oldRecovery });

    expect(restored.apps["app-1"]).toMatchObject({ appId: "app-1", kind: "owned" });
    expect(restored.apps["app-2"]).toMatchObject({ appId: "app-2", kind: "owned" });
    expect(restored.manifestRoom?.lastSeenVersion).toBe(2);
  });

  it("keeps embedded recovery entries that were not flushed to the remote manifest yet", async () => {
    const provider = createMemorySyncProvider();
    const registry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await configureTestStorageProfile(registry);
    await registry.ensureWorkspaceManifestRoom();
    await registry.ensureOwnedAppRooms("remote-app");
    const saved = await saveWorkspaceManifest({ provider, state: await registry.getState() });
    await registry.replaceState(saved);

    await registry.ensureOwnedAppRooms("embedded-app");
    const recovery = createWorkspaceRecoveryMaterial(await registry.getState());

    const restored = await loadWorkspaceManifest({ provider, recoveryMaterial: recovery });

    expect(restored.apps["remote-app"]).toMatchObject({ appId: "remote-app", kind: "owned" });
    expect(restored.apps["embedded-app"]).toMatchObject({ appId: "embedded-app", kind: "owned" });
  });

  it("merges stale manifest saves with the current remote manifest instead of overwriting it", async () => {
    const provider = createMemorySyncProvider();
    const registry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await configureTestStorageProfile(registry);
    await registry.ensureWorkspaceManifestRoom();
    const initial = await saveWorkspaceManifest({ provider, state: await registry.getState() });
    await registry.replaceState(initial);

    const staleRegistry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore(await registry.getState()));
    await registry.ensureOwnedAppRooms("remote-app");
    const remoteSaved = await saveWorkspaceManifest({ provider, state: await registry.getState() });
    await registry.replaceState(remoteSaved);

    await staleRegistry.ensureOwnedAppRooms("local-app");
    const mergedSaved = await saveWorkspaceManifest({ provider, state: await staleRegistry.getState() });

    expect(mergedSaved.apps["remote-app"]).toMatchObject({ appId: "remote-app", kind: "owned" });
    expect(mergedSaved.apps["local-app"]).toMatchObject({ appId: "local-app", kind: "owned" });
    expect(mergedSaved.manifestRoom?.lastSeenVersion).toBe(3);

    const remoteManifest = await loadLatestWorkspaceManifest({ provider, state: mergedSaved });
    expect(remoteManifest.apps["remote-app"]).toMatchObject({ appId: "remote-app", kind: "owned" });
    expect(remoteManifest.apps["local-app"]).toMatchObject({ appId: "local-app", kind: "owned" });
  });

  it("preserves remote tombstones when a stale manifest tries to save an older app record", async () => {
    const provider = createMemorySyncProvider();
    const registry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await configureTestStorageProfile(registry);
    await registry.ensureWorkspaceManifestRoom();
    await registry.ensureOwnedAppRooms("deleted-app");
    const initial = await saveWorkspaceManifest({ provider, state: await registry.getState() });
    await registry.replaceState(initial);

    const staleRegistry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore(await registry.getState()));
    await registry.removeLocalAppSync("deleted-app");
    const remoteDeleted = await saveWorkspaceManifest({ provider, state: await registry.getState() });
    await registry.replaceState(remoteDeleted);

    const mergedSaved = await saveWorkspaceManifest({ provider, state: await staleRegistry.getState() });

    expect(mergedSaved.apps["deleted-app"]).toBeUndefined();
    expect(mergedSaved.deletedApps["deleted-app"]).toMatchObject({ appId: "deleted-app" });
  });

  it("recreates a missing manifest room when the local state remembers a version", async () => {
    const provider = createMemorySyncProvider();
    const registry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await configureTestStorageProfile(registry);
    await registry.ensureWorkspaceManifestRoom();
    await registry.rememberWorkspaceManifestVersion(1);
    await registry.ensureOwnedAppRooms("app-1");

    const savedState = await saveWorkspaceManifest({ provider, state: await registry.getState() });

    expect(savedState.manifestRoom?.lastSeenVersion).toBe(1);
    const restored = await loadWorkspaceManifest({
      provider,
      recoveryMaterial: createWorkspaceRecoveryMaterial(savedState),
    });
    expect(restored.apps["app-1"]).toMatchObject({ appId: "app-1", kind: "owned" });
  });

  it("rejects invalid recovery material", () => {
    expect(() => decodeWorkspaceRecoveryMaterial("not-a-recovery-key")).toThrow(/recovery material/i);
  });
});
