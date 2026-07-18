import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { createMemoryCore } from "../../core/memoryCore";
import { createMemorySyncQueueStore, enqueueSaveSource } from "../../sync/syncQueue";
import { createMemoryWorkspaceSyncStore, createWorkspaceSyncRegistry } from "../../sync/workspaceSync";
import type { WorkspaceSyncActions } from "../../sync/workspaceSyncActions";
import { WorkspaceShell } from "./WorkspaceShell";

describe("WorkspaceShell sync wake-ups", () => {
  afterEach(() => cleanup());

  it("drains queued room and source sync on startup", async () => {
    const syncActions = createSyncActionsStub();

    render(
      <WorkspaceShell
        core={createMemoryCore()}
        syncActionsOverride={syncActions}
        syncQueueStore={createMemorySyncQueueStore()}
        syncRegistry={createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore())}
      />,
    );

    await waitFor(() => expect(syncActions.flushRoomLifecycleQueue).toHaveBeenCalledTimes(1));
    expect(syncActions.flushSourceSyncQueue).toHaveBeenCalledTimes(1);
    expect(syncActions.flushAppDataSyncQueue).toHaveBeenCalledTimes(1);
    expect(syncActions.flushOwnedAppDeletionQueue).toHaveBeenCalledTimes(1);
    expect(syncActions.flushWorkspaceManifestQueue).toHaveBeenCalledTimes(1);
  });

  it("drains queued room and source sync when the browser comes online", async () => {
    const syncActions = createSyncActionsStub();

    render(
      <WorkspaceShell
        core={createMemoryCore()}
        syncActionsOverride={syncActions}
        syncQueueStore={createMemorySyncQueueStore()}
        syncRegistry={createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore())}
      />,
    );

    await waitFor(() => expect(syncActions.flushSourceSyncQueue).toHaveBeenCalledTimes(1));
    vi.mocked(syncActions.flushRoomLifecycleQueue).mockClear();
    vi.mocked(syncActions.flushSourceSyncQueue).mockClear();
    vi.mocked(syncActions.flushAppDataSyncQueue).mockClear();
    vi.mocked(syncActions.flushOwnedAppDeletionQueue).mockClear();
    vi.mocked(syncActions.flushWorkspaceManifestQueue).mockClear();

    window.dispatchEvent(new Event("online"));

    await waitFor(() => expect(syncActions.flushRoomLifecycleQueue).toHaveBeenCalledTimes(1));
    expect(syncActions.flushSourceSyncQueue).toHaveBeenCalledTimes(1);
    expect(syncActions.flushAppDataSyncQueue).toHaveBeenCalledTimes(1);
    expect(syncActions.flushOwnedAppDeletionQueue).toHaveBeenCalledTimes(1);
    expect(syncActions.flushWorkspaceManifestQueue).toHaveBeenCalledTimes(1);
  });

  it("shows queued sync health separately from the app relationship label", async () => {
    const syncActions = createSyncActionsStub();
    const core = createMemoryCore();
    const app = await core.createBlankApp();
    const queueStore = createMemorySyncQueueStore();
    const syncRegistry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await syncRegistry.configureStorageProfile({ databaseUrl: "https://example.firebaseio.com" });
    await syncRegistry.ensureOwnedAppRooms(app.appId);
    await enqueueSaveSource(queueStore, app);

    render(
      <WorkspaceShell
        core={core}
        syncActionsOverride={syncActions}
        syncQueueStore={queueStore}
        syncRegistry={syncRegistry}
      />,
    );

    expect(await screen.findByText("Private")).toBeTruthy();
    expect((await screen.findByTitle("Local changes are queued for remote sync.")).textContent).toBe("☁ …");
  });

  it("opens the local app without waiting for remote pull", async () => {
    const syncActions = createSyncActionsStub();
    const core = createMemoryCore();
    await core.createApp({
      description: "Offline open",
      name: "Offline local app",
      sourceCode: "<!doctype html><title>Offline local app</title>",
    });
    vi.mocked(syncActions.pullLatestAppRooms).mockReturnValue(new Promise(() => {}));

    render(
      <WorkspaceShell
        core={core}
        syncActionsOverride={syncActions}
        syncQueueStore={createMemorySyncQueueStore()}
        syncRegistry={createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore())}
      />,
    );

    expect(await screen.findByText("Offline local app")).toBeTruthy();
    fireEvent.click(await screen.findByRole("button", { name: "Open" }));

    expect(await screen.findByRole("button", { name: /Apps/ })).toBeTruthy();
    expect(syncActions.pullLatestAppRooms).toHaveBeenCalledTimes(1);
  });
});

function createSyncActionsStub(): WorkspaceSyncActions {
  return {
    backUpLocalApps: vi.fn().mockResolvedValue(undefined),
    createInvite: vi.fn(),
    deleteSyncedAppRooms: vi.fn().mockResolvedValue(undefined),
    ensureAppBackedUp: vi.fn().mockResolvedValue(undefined),
    exportWorkspaceRecovery: vi.fn(),
    flushAppDataSyncQueue: vi.fn().mockResolvedValue(undefined),
    flushOwnedAppDeletionQueue: vi.fn().mockResolvedValue(undefined),
    flushWorkspaceManifestQueue: vi.fn().mockResolvedValue(undefined),
    flushRoomLifecycleQueue: vi.fn().mockResolvedValue(undefined),
    flushSourceSyncQueue: vi.fn().mockResolvedValue(undefined),
    importInvite: vi.fn().mockResolvedValue(undefined),
    noteLocalAppDataEdit: vi.fn(),
    pullLatestAppRooms: vi.fn().mockResolvedValue({}),
    pushAppData: vi.fn().mockResolvedValue(undefined),
    pushAppSource: vi.fn().mockResolvedValue(undefined),
    queueWorkspaceManifestSave: vi.fn().mockResolvedValue(undefined),
    restoreWorkspaceRecovery: vi.fn().mockResolvedValue(undefined),
    subscribeAppData: vi.fn().mockResolvedValue(() => {}),
    subscribeAppSource: vi.fn().mockResolvedValue(() => {}),
  };
}
