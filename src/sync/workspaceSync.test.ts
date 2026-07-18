import { describe, expect, it } from "vitest";
import { createRoomCapability } from "./crypto";
import { createMemoryWorkspaceSyncStore, createWorkspaceSyncRegistry } from "./workspaceSync";

describe("workspace sync registry", () => {
  it("configures a storage profile and creates stable owned app room references", async () => {
    const registry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await registry.configureStorageProfile({
      databaseUrl: "https://example.firebaseio.com/",
      displayName: "My Firebase",
    });

    const first = await registry.ensureOwnedAppRooms("app-1");
    const second = await registry.ensureOwnedAppRooms("app-1");

    expect(first.sourceRoom.roomId).toBe(second.sourceRoom.roomId);
    expect(first.dataRoom.roomId).toBe(second.dataRoom.roomId);
    expect(await registry.getAppSyncBadge("app-1")).toMatchObject({
      kind: "backed-up",
      label: "Private",
    });
  });

  it("marks owned apps as shared without recreating rooms", async () => {
    const registry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await registry.configureStorageProfile({ databaseUrl: "https://example.firebaseio.com" });
    const owned = await registry.ensureOwnedAppRooms("app-1");

    const firstInvite = await registry.createInvite("app-1");
    const secondInvite = await registry.createInvite("app-1");

    expect(firstInvite.sourceRoom.roomId).toBe(owned.sourceRoom.roomId);
    expect(secondInvite.sourceRoom.roomId).toBe(owned.sourceRoom.roomId);
    expect(firstInvite.dataRoom.roomId).toBe(secondInvite.dataRoom.roomId);
    expect(await registry.getAppSyncBadge("app-1")).toMatchObject({
      kind: "shared-by-me",
      label: "Shared by me",
    });
  });

  it("keeps joined apps attached to the original provider even if local storage is configured", async () => {
    const registry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await registry.configureStorageProfile({ databaseUrl: "https://my-project.firebaseio.com" });

    const sourceRoom = createRoomCapability();
    const dataRoom = createRoomCapability();
    const originalProvider = {
      provider: "firebase-rtdb" as const,
      databaseUrl: "https://friend-project.firebaseio.com",
    };
    await registry.markJoinedApp({
      appId: "joined-app",
      sourceProvider: originalProvider,
      sourceRoom,
      dataRoom,
    });

    await expect(registry.ensureOwnedAppRooms("joined-app")).rejects.toThrow(/Joined apps/);
    expect(await registry.getAppSyncBadge("joined-app")).toMatchObject({
      kind: "shared-with-me",
      label: "Shared with me",
    });

    const forwardedInvite = await registry.createInvite("joined-app");
    expect(forwardedInvite.provider.databaseUrl).toBe(originalProvider.databaseUrl);
    expect(forwardedInvite.sourceRoom.roomId).toBe(sourceRoom.roomId);
  });

  it("requires a storage profile before owned app rooms are created", async () => {
    const registry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());

    await expect(registry.ensureOwnedAppRooms("app-1")).rejects.toThrow(/Storage profile/);
    expect(await registry.getAppSyncBadge("app-1")).toMatchObject({ kind: "local-only" });
  });

  it("removes local sync metadata and remembers a local tombstone", async () => {
    const registry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await registry.configureStorageProfile({ databaseUrl: "https://example.firebaseio.com" });
    await registry.ensureOwnedAppRooms("app-1");

    await registry.removeLocalAppSync("app-1");
    const state = await registry.getState();

    expect(state.apps["app-1"]).toBeUndefined();
    expect(state.deletedApps["app-1"]).toMatchObject({
      appId: "app-1",
      reason: "local-delete",
    });
    expect(await registry.getAppSyncBadge("app-1")).toMatchObject({ kind: "local-only" });
  });

  it("marks joined apps as remotely deleted without making them forwardable", async () => {
    const registry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    const sourceRoom = createRoomCapability();
    const dataRoom = createRoomCapability();
    await registry.markJoinedApp({
      appId: "joined-app",
      sourceProvider: {
        provider: "firebase-rtdb",
        databaseUrl: "https://friend-project.firebaseio.com",
      },
      sourceRoom,
      dataRoom,
    });

    await registry.markRemoteAppDeleted("joined-app", "2026-01-01T00:00:00.000Z");

    expect(await registry.getAppSyncBadge("joined-app")).toMatchObject({
      kind: "needs-attention",
      label: "Deleted by owner",
    });
    await expect(registry.createInvite("joined-app")).rejects.toThrow(/Deleted shared apps/);
  });
});
