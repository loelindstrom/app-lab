import { describe, expect, it } from "vitest";
import { createRoomCapability } from "./crypto";
import { configureTestStorageProfile } from "./testStorageProfile";
import { createMemoryWorkspaceSyncStore, createWorkspaceSyncRegistry } from "./workspaceSync";

describe("workspace sync registry", () => {
  it("configures a storage profile and creates stable owned app room references", async () => {
    const registry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await configureTestStorageProfile(registry, {
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
    await configureTestStorageProfile(registry);
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

  it("stores auth-v1 owner setup material without putting it into app invites", async () => {
    const registry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await registry.configureStorageProfile({
      accessModel: "auth-v1",
      databaseUrl: "https://example.firebaseio.com",
      firebaseConfigText: JSON.stringify({
        apiKey: "test-api-key",
        appId: "app-id",
        authDomain: "example.firebaseapp.com",
        databaseURL: "https://example.firebaseio.com",
        measurementId: "G-TEST",
        messagingSenderId: "123",
        projectId: "example",
        storageBucket: "example.appspot.com",
      }),
      ownerSetupSecret: "app_lab_owner_test_secret",
    });
    await registry.ensureOwnedAppRooms("app-1");

    const profile = await registry.getStorageProfile();
    const invite = await registry.createInvite("app-1");

    expect(profile).toMatchObject({
      accessModel: "auth-v1",
      ownerSetupSecret: "app_lab_owner_test_secret",
    });
    expect(invite.provider.accessModel).toBe("auth-v1");
    expect(invite.provider).not.toHaveProperty("ownerSetupSecret");
    expect(invite.provider).not.toHaveProperty("profileId");
    expect(invite.provider.firebaseConfig).toEqual({
      apiKey: "test-api-key",
      authDomain: "example.firebaseapp.com",
      databaseURL: "https://example.firebaseio.com",
    });
  });

  it("requires Firebase web app config before saving auth-v1 storage", async () => {
    const registry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());

    await expect(
      registry.configureStorageProfile({
        accessModel: "auth-v1",
        databaseUrl: "https://example.firebaseio.com",
      }),
    ).rejects.toThrow(/apiKey/);
  });

  it("keeps joined apps attached to the original provider even if local storage is configured", async () => {
    const registry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await configureTestStorageProfile(registry, { databaseUrl: "https://my-project.firebaseio.com" });

    const sourceRoom = createRoomCapability();
    const dataRoom = createRoomCapability();
    const originalProvider = {
      provider: "firebase-rtdb" as const,
      accessModel: "auth-v1" as const,
      databaseUrl: "https://friend-project.firebaseio.com",
      firebaseConfig: {
        apiKey: "friend-api-key",
        authDomain: "friend-project.firebaseapp.com",
        databaseURL: "https://friend-project.firebaseio.com",
      },
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
    await configureTestStorageProfile(registry);
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
