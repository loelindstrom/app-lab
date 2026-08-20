import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { createMemoryCore } from "../../core/memoryCore";
import { createMemorySyncQueueStore, enqueueSaveSource, resetSyncingQueueItems, type SyncQueueStore } from "../../sync/queue/syncQueue";
import { createRoomCapability } from "../../sync/rooms/crypto";
import { encodeAppInvite } from "../../sync/sharing/invites";
import { configureTestStorageProfile } from "../../sync/testing/testStorageProfile";
import { createMemoryWorkspaceSyncStore, createWorkspaceSyncRegistry, type WorkspaceSyncRegistry } from "../../sync/workspace/workspaceSync";
import type { WorkspaceSyncActions } from "../../sync";
import { WorkspaceShell } from "./WorkspaceShell";

describe("WorkspaceShell sync wake-ups", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    history.replaceState(null, "", window.location.pathname + window.location.search);
  });

  it("drains queued room and source sync on startup", async () => {
    const syncActions = createSyncActionsStub();

    render(
      <WorkspaceShell
        core={createMemoryCore()}
        syncActions={syncActions}
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
        syncActions={syncActions}
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

  it("retries pending sync when the browser window receives focus", async () => {
    const syncActions = createSyncActionsStub();

    render(
      <WorkspaceShell
        core={createMemoryCore()}
        syncActions={syncActions}
      />,
    );

    await waitFor(() => expect(syncActions.flushSourceSyncQueue).toHaveBeenCalledTimes(1));
    vi.mocked(syncActions.flushRoomLifecycleQueue).mockClear();
    vi.mocked(syncActions.flushSourceSyncQueue).mockClear();
    vi.mocked(syncActions.flushAppDataSyncQueue).mockClear();
    vi.mocked(syncActions.flushOwnedAppDeletionQueue).mockClear();
    vi.mocked(syncActions.flushWorkspaceManifestQueue).mockClear();

    window.dispatchEvent(new Event("focus"));

    await waitFor(() => expect(syncActions.flushRoomLifecycleQueue).toHaveBeenCalledTimes(1));
    expect(syncActions.flushSourceSyncQueue).toHaveBeenCalledTimes(1);
    expect(syncActions.flushAppDataSyncQueue).toHaveBeenCalledTimes(1);
    expect(syncActions.flushOwnedAppDeletionQueue).toHaveBeenCalledTimes(1);
    expect(syncActions.flushWorkspaceManifestQueue).toHaveBeenCalledTimes(1);
  });

  it("shows queued sync health separately from the app relationship label", async () => {
    const core = createMemoryCore();
    const app = await core.createBlankApp();
    const queueStore = createMemorySyncQueueStore();
    const syncRegistry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await configureTestStorageProfile(syncRegistry);
    await syncRegistry.ensureOwnedAppRooms(app.appId);
    await enqueueSaveSource(queueStore, app);
    const syncActions = createSyncActionsStub({ queueStore, syncRegistry });

    render(
      <WorkspaceShell
        core={core}
        syncActions={syncActions}
      />,
    );

    expect(await screen.findByText("Private")).toBeTruthy();
    expect(await screen.findByRole("button", { name: "Open sync status: Local changes are queued for remote sync." })).toBeTruthy();
  });

  it("shows offline sync health for queued work when the browser reports offline", async () => {
    const core = createMemoryCore();
    const app = await core.createBlankApp();
    const queueStore = createMemorySyncQueueStore();
    const syncRegistry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await configureTestStorageProfile(syncRegistry);
    await syncRegistry.ensureOwnedAppRooms(app.appId);
    await enqueueSaveSource(queueStore, app);
    const syncActions = createSyncActionsStub({ queueStore, syncRegistry });

    render(
      <WorkspaceShell
        core={core}
        syncActions={syncActions}
      />,
    );

    window.dispatchEvent(new Event("offline"));

    expect(await screen.findByRole("button", { name: "Open sync status: Offline. Local changes are saved and will sync when the browser comes back online." })).toBeTruthy();
  });

  it("shows offline sync health for queued work when the storage provider reports disconnected", async () => {
    const core = createMemoryCore();
    const app = await core.createBlankApp();
    const queueStore = createMemorySyncQueueStore();
    const syncRegistry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await configureTestStorageProfile(syncRegistry);
    await syncRegistry.ensureOwnedAppRooms(app.appId);
    await enqueueSaveSource(queueStore, app);
    const syncActions = createSyncActionsStub({ queueStore, syncRegistry });
    vi.mocked(syncActions.subscribeStorageConnection).mockImplementation(async (onChange) => {
      onChange(false);
      return () => {};
    });

    render(
      <WorkspaceShell
        core={core}
        syncActions={syncActions}
      />,
    );

    expect(await screen.findByRole("button", { name: "Open sync status: Offline. Local changes are saved and will sync when the browser comes back online." })).toBeTruthy();
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
        syncActions={syncActions}
      />,
    );

    expect(await screen.findByText("Offline local app")).toBeTruthy();
    fireEvent.click(await screen.findByRole("button", { name: "Open" }));

    expect(await screen.findByRole("button", { name: /Apps/ })).toBeTruthy();
    expect(syncActions.pullLatestAppRooms).toHaveBeenCalledTimes(1);
  });

  it("pulls the workspace manifest when returning to the launcher", async () => {
    const syncActions = createSyncActionsStub();
    const core = createMemoryCore();
    await core.createApp({
      description: "Launcher refresh",
      name: "Launcher refresh",
      sourceCode: "<!doctype html><title>Launcher refresh</title>",
    });

    render(
      <WorkspaceShell
        core={core}
        syncActions={syncActions}
      />,
    );

    expect(await screen.findByRole("button", { name: "Open app actions for Launcher refresh" })).toBeTruthy();
    await waitFor(() => expect(syncActions.pullLatestWorkspaceManifest).toHaveBeenCalled());
    vi.mocked(syncActions.pullLatestWorkspaceManifest).mockClear();

    fireEvent.click(await screen.findByRole("button", { name: "Open" }));
    fireEvent.click(await screen.findByRole("button", { name: /Apps/ }));

    await waitFor(() => expect(syncActions.pullLatestWorkspaceManifest).toHaveBeenCalledTimes(1));
  });

  it("updates launcher metadata from the saved source HTML head", async () => {
    const syncActions = createSyncActionsStub();
    const core = createMemoryCore();
    await core.createApp({
      description: "Initial description",
      name: "Initial fallback",
      sourceCode: "<!doctype html><html><head><title>Initial app</title></head><body></body></html>",
    });

    render(
      <WorkspaceShell
        core={core}
        syncActions={syncActions}
      />,
    );

    expect(await screen.findByText("Initial app")).toBeTruthy();
    fireEvent.click(await screen.findByRole("button", { name: "Open" }));
    await waitFor(() => expect(screen.getAllByRole("button", { name: "Toggle source" }).length).toBeGreaterThan(0));
    fireEvent.click(screen.getAllByRole("button", { name: "Toggle source" })[0]);

    const sourcePanel = await screen.findByRole("complementary", { name: "Source" });
    const sourceInput = sourcePanel.querySelector("textarea");
    if (!(sourceInput instanceof HTMLTextAreaElement)) throw new Error("Expected source textarea.");

    fireEvent.change(sourceInput, {
      target: {
        value: `<!doctype html>
<html>
  <head>
    <title>Saved launcher title</title>
    <meta name="description" content="Saved launcher description">
  </head>
  <body></body>
</html>`,
      },
    });
    fireEvent.click(within(sourcePanel).getByRole("button", { name: "Save" }));

    await waitFor(() =>
      expect(syncActions.pushAppSource).toHaveBeenCalledWith(
        expect.objectContaining({
          description: "Saved launcher description",
          name: "Saved launcher title",
        }),
      ),
    );
    fireEvent.click(await screen.findByRole("button", { name: /Apps/ }));

    expect(await screen.findByText("Saved launcher title")).toBeTruthy();
    expect(await screen.findByText("Saved launcher description")).toBeTruthy();
  });

  it("rejects source that is not a complete HTML document", async () => {
    const syncActions = createSyncActionsStub();
    const core = createMemoryCore();
    const app = await core.createApp({
      description: "Initial description",
      name: "Initial app",
      sourceCode: "<!doctype html><html><head><title>Initial app</title></head><body></body></html>",
    });

    render(
      <WorkspaceShell
        core={core}
        syncActions={syncActions}
      />,
    );

    fireEvent.click(await screen.findByRole("button", { name: "Open" }));
    await waitFor(() => expect(screen.getAllByRole("button", { name: "Toggle source" }).length).toBeGreaterThan(0));
    fireEvent.click(screen.getAllByRole("button", { name: "Toggle source" })[0]);

    const sourcePanel = await screen.findByRole("complementary", { name: "Source" });
    const sourceInput = sourcePanel.querySelector("textarea");
    if (!(sourceInput instanceof HTMLTextAreaElement)) throw new Error("Expected source textarea.");

    fireEvent.change(sourceInput, { target: { value: "This is not an HTML document." } });
    fireEvent.click(within(sourcePanel).getByRole("button", { name: "Save" }));

    expect(await within(sourcePanel).findByText("Source must be a complete HTML document starting with <!doctype html> or <html>.")).toBeTruthy();
    expect((await core.getApp(app.appId))?.sourceCode).toBe(app.sourceCode);
    expect(syncActions.pushAppSource).not.toHaveBeenCalled();
  });

  it("saves source locally when Tailwind compilation is unavailable", async () => {
    vi.spyOn(window.navigator, "onLine", "get").mockReturnValue(false);
    const syncActions = createSyncActionsStub();
    const core = createMemoryCore();
    const app = await core.createApp({
      compiledCss: ".old { color: red; }",
      compiledCssSourceHash: "old-hash",
      description: "Initial description",
      name: "Initial app",
      sourceCode: "<!doctype html><html><head><title>Initial app</title></head><body></body></html>",
    });

    render(
      <WorkspaceShell
        core={core}
        syncActions={syncActions}
      />,
    );

    expect(await screen.findByText("Initial app")).toBeTruthy();
    fireEvent.click(await screen.findByRole("button", { name: "Open" }));
    await waitFor(() => expect(screen.getAllByRole("button", { name: "Toggle source" }).length).toBeGreaterThan(0));
    fireEvent.click(screen.getAllByRole("button", { name: "Toggle source" })[0]);

    const sourcePanel = await screen.findByRole("complementary", { name: "Source" });
    const sourceInput = sourcePanel.querySelector("textarea");
    if (!(sourceInput instanceof HTMLTextAreaElement)) throw new Error("Expected source textarea.");

    fireEvent.change(sourceInput, {
      target: {
        value: `<!doctype html>
<html>
  <head>
    <title>Offline Tailwind</title>
    <meta name="app-lab-tailwind" content="enabled">
  </head>
  <body class="p-4"></body>
</html>`,
      },
    });
    fireEvent.click(within(sourcePanel).getByRole("button", { name: "Save" }));

    await waitFor(() =>
      expect(syncActions.pushAppSource).toHaveBeenCalledWith(
        expect.objectContaining({
          compiledCss: undefined,
          compiledCssSourceHash: undefined,
          name: "Offline Tailwind",
        }),
      ),
    );
    const saved = await core.getApp(app.appId);
    expect(saved?.compiledCss).toBeUndefined();
    expect(saved?.compiledCssSourceHash).toBeUndefined();
    expect(await screen.findByRole("button", { name: /Open sync status: Source saved without compiled Tailwind CSS/i })).toBeTruthy();
  });

  it("opens storage settings from share when cloud sync is not configured", async () => {
    const syncActions = createSyncActionsStub();
    const core = createMemoryCore();
    await core.createApp({
      description: "Share test",
      name: "Share fallback",
      sourceCode: "<!doctype html><title>Shareable app</title>",
    });

    render(
      <WorkspaceShell
        core={core}
        syncActions={syncActions}
      />,
    );

    expect(await screen.findByText("Shareable app")).toBeTruthy();
    fireEvent.click(await screen.findByRole("button", { name: "Open" }));
    fireEvent.click(await screen.findByRole("button", { name: "Share Shareable app" }));

    const shareDialog = await screen.findByRole("dialog", { name: "Share app" });
    expect(within(shareDialog).getByText("Cloud sync is required before this app can be shared.")).toBeTruthy();

    fireEvent.click(within(shareDialog).getByRole("button", { name: "Open settings" }));

    expect(screen.queryByRole("dialog", { name: "Share app" })).toBeNull();
    expect(await screen.findByRole("dialog", { name: "Storage and sync" })).toBeTruthy();
  });

  it("defaults new storage setup to authenticated room claims", async () => {
    const syncActions = createSyncActionsStub();

    render(
      <WorkspaceShell
        core={createMemoryCore()}
        syncActions={syncActions}
      />,
    );

    fireEvent.click(await screen.findByRole("button", { name: "Open settings" }));
    fireEvent.click(await screen.findByRole("button", { name: /Set Security/ }));

    expect(screen.queryByText("Prototype open rules")).toBeNull();
    expect(screen.getByText(/authenticated room claims/i)).toBeTruthy();
    expect(screen.getByText(/Enable Anonymous Auth/)).toBeTruthy();

    fireEvent.click(await screen.findByRole("button", { name: /Connect App Lab/ }));
    fireEvent.change(screen.getByLabelText("Firebase Realtime Database URL"), {
      target: { value: "https://example.firebaseio.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Save storage profile" }));

    expect(await screen.findByText(/apiKey/)).toBeTruthy();
  });

  it("closes settings from the full-page back button", async () => {
    const syncActions = createSyncActionsStub();

    render(
      <WorkspaceShell
        core={createMemoryCore()}
        syncActions={syncActions}
      />,
    );

    fireEvent.click(await screen.findByRole("button", { name: "Open settings" }));
    expect(await screen.findByRole("dialog", { name: "Storage and sync" })).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: /Back/ }));

    expect(screen.queryByRole("dialog", { name: "Storage and sync" })).toBeNull();
  });

  it("combines workspace export and restore into sync device settings", async () => {
    const syncActions = createSyncActionsStub();

    render(
      <WorkspaceShell
        core={createMemoryCore()}
        syncActions={syncActions}
      />,
    );

    fireEvent.click(await screen.findByRole("button", { name: "Open settings" }));

    expect(screen.getByRole("button", { name: "Sync device" })).toBeTruthy();
    expect(screen.queryByRole("button", { name: "Restore device" })).toBeNull();
    expect(screen.queryByRole("button", { name: "Advanced" })).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Sync device" }));

    expect(screen.getByText(/moving the whole workspace/i)).toBeTruthy();
    expect(screen.getAllByText("Generate sync material").length).toBeGreaterThan(0);
    expect(screen.getByText("Paste sync material")).toBeTruthy();
  });

  it("blocks syncing device material when this browser already has a storage profile", async () => {
    const syncRegistry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await configureTestStorageProfile(syncRegistry);
    const syncActions = createSyncActionsStub({ syncRegistry });

    render(
      <WorkspaceShell
        core={createMemoryCore()}
        syncActions={syncActions}
      />,
    );

    fireEvent.click(await screen.findByRole("button", { name: "Open settings" }));
    fireEvent.click(screen.getByRole("button", { name: "Sync device" }));
    fireEvent.change(screen.getByPlaceholderText("Paste workspace sync material"), {
      target: { value: "applab-recovery:test" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Sync this device" }));

    expect(await screen.findByText(/already has a storage profile/i)).toBeTruthy();
    expect(syncActions.restoreWorkspaceRecovery).not.toHaveBeenCalled();
  });

  it("requires a shared app preview before importing invite source", async () => {
    const syncActions = createSyncActionsStub();
    const invite = {
      createdAt: "2026-08-07T12:00:00.000Z",
      dataRoom: createRoomCapability(),
      kind: "app-lab-invite" as const,
      provider: {
        accessModel: "auth-v1" as const,
        databaseUrl: "https://example.firebaseio.com",
        firebaseConfig: {
          apiKey: "test-api-key",
          databaseURL: "https://example.firebaseio.com",
        },
        provider: "firebase-rtdb" as const,
      },
      schemaVersion: 1 as const,
      sourceRoom: createRoomCapability(),
    };
    vi.mocked(syncActions.previewInvite).mockResolvedValue({
      appId: "shared-app",
      dataRoomId: invite.dataRoom.roomId,
      description: "Preview description",
      name: "Preview title",
      providerDatabaseUrl: invite.provider.databaseUrl,
      sourceRoomId: invite.sourceRoom.roomId,
      updatedAt: "2026-08-07T12:30:00.000Z",
    });
    window.location.hash = encodeAppInvite(invite);

    render(
      <WorkspaceShell
        core={createMemoryCore()}
        syncActions={syncActions}
      />,
    );

    const dialog = await screen.findByRole("dialog", { name: "Import shared app" });
    const importButton = within(dialog).getByRole("button", { name: "Import" }) as HTMLButtonElement;
    expect(importButton.disabled).toBe(true);

    fireEvent.click(within(dialog).getByRole("button", { name: "Preview app" }));

    expect(await within(dialog).findByText("Preview title")).toBeTruthy();
    expect(within(dialog).getByText("Preview description")).toBeTruthy();
    expect(importButton.disabled).toBe(false);

    fireEvent.click(importButton);

    await waitFor(() =>
      expect(syncActions.importInvite).toHaveBeenCalledWith(
        expect.objectContaining({
          dataRoom: expect.objectContaining({ roomId: invite.dataRoom.roomId }),
          provider: expect.objectContaining({ databaseUrl: invite.provider.databaseUrl }),
          sourceRoom: expect.objectContaining({ roomId: invite.sourceRoom.roomId }),
        }),
      ),
    );
  });

  it("lets storage guide sections all close and marks completed steps", async () => {
    const syncActions = createSyncActionsStub();

    render(
      <WorkspaceShell
        core={createMemoryCore()}
        syncActions={syncActions}
      />,
    );

    fireEvent.click(await screen.findByRole("button", { name: "Open settings" }));

    expect(await screen.findByText("Create or sign in to Firebase")).toBeTruthy();
    fireEvent.click(await screen.findByRole("button", { name: /Create Firebase/ }));
    expect(screen.queryByText("Create or sign in to Firebase")).toBeNull();

    fireEvent.click(await screen.findByRole("button", { name: /Set Security/ }));
    expect(await screen.findByText("2a")).toBeTruthy();
    fireEvent.click(screen.getByLabelText(/Enable Anonymous Auth/));

    expect(screen.getByText("Enable Anonymous Auth").className).toContain("line-through");
  });
});

function createSyncActionsStub(
  input: { queueStore?: SyncQueueStore; syncRegistry?: WorkspaceSyncRegistry } = {},
): WorkspaceSyncActions {
  const queueStore = input.queueStore ?? createMemorySyncQueueStore();
  const syncRegistry = input.syncRegistry ?? createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());

  return {
    backUpLocalApps: vi.fn().mockResolvedValue(undefined),
    clearStorageProfile: vi.fn(() => syncRegistry.clearStorageProfile()),
    configureStorageProfile: vi.fn((profileInput) => syncRegistry.configureStorageProfile(profileInput)),
    createInvite: vi.fn(),
    deleteSyncedAppRooms: vi.fn().mockResolvedValue(undefined),
    ensureAppBackedUp: vi.fn().mockResolvedValue(undefined),
    exportWorkspaceRecovery: vi.fn(),
    flushAppDataSyncQueue: vi.fn().mockResolvedValue(undefined),
    flushOwnedAppDeletionQueue: vi.fn().mockResolvedValue(undefined),
    flushWorkspaceManifestQueue: vi.fn().mockResolvedValue(undefined),
    flushRoomLifecycleQueue: vi.fn().mockResolvedValue(undefined),
    flushSourceSyncQueue: vi.fn().mockResolvedValue(undefined),
    getWorkspaceSyncOverview: vi.fn(async (appIds) => {
      const [appBadges, queueItems, syncState] = await Promise.all([
        syncRegistry.listAppSyncBadges(appIds),
        queueStore.listItems(),
        syncRegistry.getState(),
      ]);
      return {
        appBadges,
        pendingOperations: queueItems.map(({ appId, kind, lastError, status }) => ({ appId, kind, lastError, status })),
        storageProfile: syncState.storageProfile,
        workspaceManifestRoomId: syncState.manifestRoom?.roomId ?? null,
      };
    }),
    importInvite: vi.fn().mockResolvedValue(undefined),
    initializeWorkspaceSync: vi.fn(async () => {
      await resetSyncingQueueItems(queueStore);
      return { storageConfigured: Boolean(await syncRegistry.getStorageProfile()) };
    }),
    noteLocalAppDataEdit: vi.fn(),
    previewInvite: vi.fn(),
    pullLatestAppRooms: vi.fn().mockResolvedValue({}),
    pullLatestWorkspaceManifest: vi.fn().mockResolvedValue({ appIdsChanged: [], appIdsDeleted: [] }),
    pushAppData: vi.fn().mockResolvedValue(undefined),
    pushAppSource: vi.fn().mockResolvedValue(undefined),
    queueWorkspaceManifestSave: vi.fn().mockResolvedValue(undefined),
    removeLocalAppSync: vi.fn((appId) => syncRegistry.removeLocalAppSync(appId)),
    restoreWorkspaceRecovery: vi.fn().mockResolvedValue(undefined),
    subscribeAppData: vi.fn().mockResolvedValue(() => {}),
    subscribeAppSource: vi.fn().mockResolvedValue(() => {}),
    subscribeStorageConnection: vi.fn().mockResolvedValue(() => {}),
    subscribeWorkspaceManifest: vi.fn().mockResolvedValue(() => {}),
  };
}
