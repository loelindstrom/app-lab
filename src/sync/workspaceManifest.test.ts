import { describe, expect, it } from "vitest";
import { createMemorySyncProvider } from "./memorySyncProvider";
import { createMemoryWorkspaceSyncStore, createWorkspaceSyncRegistry } from "./workspaceSync";
import {
  createWorkspaceRecoveryMaterial,
  decodeWorkspaceRecoveryMaterial,
  encodeWorkspaceRecoveryMaterial,
  loadWorkspaceManifest,
  saveWorkspaceManifest,
} from "./workspaceManifest";

describe("workspace manifest sync", () => {
  it("backs up and restores workspace sync metadata", async () => {
    const provider = createMemorySyncProvider();
    const registry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await registry.configureStorageProfile({
      databaseUrl: "https://example.firebaseio.com",
      firebaseConfigText: JSON.stringify({ apiKey: "key", databaseURL: "https://example.firebaseio.com" }),
    });
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
    await registry.configureStorageProfile({
      databaseUrl: "https://example.firebaseio.com",
      firebaseConfigText: JSON.stringify({ databaseURL: "https://example.firebaseio.com" }),
    });
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

  it("rejects invalid recovery material", () => {
    expect(() => decodeWorkspaceRecoveryMaterial("not-a-recovery-key")).toThrow(/recovery material/i);
  });
});
