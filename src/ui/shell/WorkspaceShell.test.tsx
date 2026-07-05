import { render, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { createMemoryCore } from "../../core/memoryCore";
import { createMemorySyncQueueStore } from "../../sync/syncQueue";
import { createMemoryWorkspaceSyncStore, createWorkspaceSyncRegistry } from "../../sync/workspaceSync";
import type { WorkspaceSyncActions } from "../../sync/workspaceSyncActions";
import { WorkspaceShell } from "./WorkspaceShell";

describe("WorkspaceShell sync wake-ups", () => {
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

    window.dispatchEvent(new Event("online"));

    await waitFor(() => expect(syncActions.flushRoomLifecycleQueue).toHaveBeenCalledTimes(1));
    expect(syncActions.flushSourceSyncQueue).toHaveBeenCalledTimes(1);
    expect(syncActions.flushAppDataSyncQueue).toHaveBeenCalledTimes(1);
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
    flushRoomLifecycleQueue: vi.fn().mockResolvedValue(undefined),
    flushSourceSyncQueue: vi.fn().mockResolvedValue(undefined),
    importInvite: vi.fn().mockResolvedValue(undefined),
    pullLatestAppRooms: vi.fn().mockResolvedValue({}),
    pushAppData: vi.fn().mockResolvedValue(undefined),
    pushAppSource: vi.fn().mockResolvedValue(undefined),
    restoreWorkspaceRecovery: vi.fn().mockResolvedValue(undefined),
    subscribeAppData: vi.fn().mockResolvedValue(() => {}),
    subscribeAppSource: vi.fn().mockResolvedValue(() => {}),
  };
}
