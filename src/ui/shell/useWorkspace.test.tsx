import { act, cleanup, fireEvent, render, renderHook, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { AiActions, AiConfig, AiUsage, BuilderProfile } from "../../ai";
import { createMemoryCore } from "../../core/memoryCore";
import * as runtime from "../../runtime";
import { createMemorySyncQueueStore, enqueueSaveSource, resetSyncingQueueItems, type SyncQueueStore } from "../../sync/queue/syncQueue";
import { createRoomCapability } from "../../sync/rooms/crypto";
import { encodeAppInvite } from "../../sync/sharing/invites";
import { configureTestStorageProfile } from "../../sync/testing/testStorageProfile";
import { createMemoryWorkspaceSyncStore, createWorkspaceSyncRegistry, type WorkspaceSyncRegistry } from "../../sync/workspace/workspaceSync";
import type { WorkspaceSyncActions } from "../../sync";
import { WorkspaceShell } from "./WorkspaceShell";
import { WorkspaceSettings } from "./WorkspaceSettings";
import { useWorkspace, type WorkspaceServices } from "./useWorkspace";

const TEST_AI_USAGE: AiUsage = { completionTokens: 600, costUsd: 0.0042, promptTokens: 1400, reasoningTokens: 100, totalTokens: 2000 };
const SOURCE = "<!doctype html><html><head><title>First</title></head><body></body></html>";

beforeEach(() => {
  vi.stubGlobal("matchMedia", vi.fn((query: string) => ({
    matches: query === "(min-width: 1024px)", media: query, onchange: null,
    addEventListener: vi.fn(), removeEventListener: vi.fn(), addListener: vi.fn(), removeListener: vi.fn(), dispatchEvent: vi.fn(),
  })));
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  history.replaceState(null, "", window.location.pathname + window.location.search);
});

function renderWorkspace(input: Partial<WorkspaceServices> = {}) {
  const core = input.core ?? createMemoryCore();
  const syncActions = input.syncActions ?? createSyncActionsStub();
  const aiActions = input.aiActions ?? createAiActionsStub();
  return { ...renderHook(() => useWorkspace({ core, syncActions, aiActions })), core, syncActions, aiActions };
}

describe("workspace workflows", () => {
  it("archives and unarchives locally while offline without forcing a manifest flush", async () => {
    const { core, syncActions, result } = renderWorkspace();
    const app = await core.createBlankApp();
    await waitFor(() => expect(syncActions.flushWorkspaceManifestQueue).toHaveBeenCalled());
    act(() => window.dispatchEvent(new Event("offline")));
    vi.mocked(syncActions.flushWorkspaceManifestQueue).mockClear();
    await act(() => result.current.setAppArchived(app.appId, true));
    expect(result.current.appArchiveStates[app.appId].archived).toBe(true);
    await act(() => result.current.setAppArchived(app.appId, false));
    expect(result.current.appArchiveStates[app.appId].archived).toBe(false);
    expect(syncActions.flushWorkspaceManifestQueue).not.toHaveBeenCalled();
    expect(await core.getApp(app.appId)).toEqual(app);
  });
  it("ignores a slow app load after a different app has been opened", async () => {
    const core = createMemoryCore();
    const first = await core.createApp({ name: "", description: "", sourceCode: SOURCE });
    const second = await core.createApp({ name: "", description: "", sourceCode: SOURCE.replace("First", "Second") });
    const getApp = core.getApp;
    let release!: (app: typeof first) => void;
    vi.spyOn(core, "getApp").mockImplementation((id) => id === first.appId ? new Promise((resolve) => { release = resolve; }) : getApp(id));
    const { result } = renderWorkspace({ core });
    let pending!: Promise<void>;
    act(() => { pending = result.current.openApp(first.appId); });
    await act(() => result.current.openApp(second.appId));
    await act(async () => { release(first); await pending; });
    expect(result.current.activeApp?.appId).toBe(second.appId);
  });

  it("ignores a late remote pull for an earlier app", async () => {
    const { core, syncActions, result } = renderWorkspace();
    const first = await core.createApp({ name: "", description: "", sourceCode: SOURCE });
    const second = await core.createApp({ name: "", description: "", sourceCode: SOURCE.replace("First", "Second") });
    let release!: (value: { app: typeof first }) => void;
    vi.mocked(syncActions.pullLatestAppRooms).mockImplementation((id) => id === first.appId ? new Promise((resolve) => { release = resolve; }) : Promise.resolve({}));
    await act(() => result.current.openApp(first.appId));
    await act(() => result.current.openApp(second.appId));
    await act(async () => release({ app: first }));
    expect(result.current.activeApp?.appId).toBe(second.appId);
  });

  for (const event of ["startup", "online", "focus"] as const) {
    it("drains pending queues on " + event, async () => {
      const { syncActions } = renderWorkspace();
      await waitFor(() => expect(syncActions.flushWorkspaceManifestQueue).toHaveBeenCalledTimes(1));
      const queues = [syncActions.flushRoomLifecycleQueue, syncActions.flushSourceSyncQueue, syncActions.flushAppDataSyncQueue,
        syncActions.flushOwnedAppDeletionQueue, syncActions.flushWorkspaceManifestQueue];
      if (event !== "startup") {
        queues.forEach((queue) => vi.mocked(queue).mockClear());
        act(() => window.dispatchEvent(new Event(event)));
        await waitFor(() => expect(syncActions.flushWorkspaceManifestQueue).toHaveBeenCalledTimes(1));
      }
      queues.forEach((queue) => expect(queue).toHaveBeenCalledTimes(1));
    });
  }

  for (const configureAfterOpen of [true, false]) {
    it("resubscribes when rooms appear " + (configureAfterOpen ? "during setup" : "after setup"), async () => {
      const core = createMemoryCore();
      const app = await core.createBlankApp();
      const registry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
      if (!configureAfterOpen) await configureTestStorageProfile(registry);
      const syncActions = createSyncActionsStub({ syncRegistry: registry });
      const unsubscribe = vi.fn();
      vi.mocked(syncActions.subscribeAppData).mockResolvedValue(unsubscribe);
      vi.mocked(syncActions.subscribeAppSource).mockResolvedValue(unsubscribe);
      const { result } = renderWorkspace({ core, syncActions });
      await act(() => result.current.openApp(app.appId));
      await waitFor(() => expect(syncActions.subscribeAppSource).toHaveBeenCalled());
      const calls = vi.mocked(syncActions.subscribeAppSource).mock.calls.length;
      const dataCalls = vi.mocked(syncActions.subscribeAppData).mock.calls.length;
      await act(async () => {
        if (configureAfterOpen) await configureTestStorageProfile(registry);
        await registry.ensureOwnedAppRooms(app.appId);
        await result.current.refreshApps();
      });
      await waitFor(() => expect(vi.mocked(syncActions.subscribeAppSource).mock.calls.length).toBeGreaterThan(calls));
      expect(vi.mocked(syncActions.subscribeAppData).mock.calls.length).toBeGreaterThan(dataCalls);
      expect(unsubscribe).toHaveBeenCalled();
      await act(async () => vi.mocked(syncActions.subscribeAppData).mock.lastCall![1]({ data: { note: "Remote update" }, version: 2 }));
      expect(result.current.remoteDataChange?.data).toEqual({ note: "Remote update" });
    });
  }

  it("cleans up a subscription that finishes after unmount", async () => {
    const registry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await configureTestStorageProfile(registry);
    const syncActions = createSyncActionsStub({ syncRegistry: registry });
    let release!: (unsubscribe: () => void) => void;
    vi.mocked(syncActions.subscribeStorageConnection).mockImplementation(() => new Promise((resolve) => { release = resolve; }));
    const { unmount } = renderWorkspace({ syncActions });
    await waitFor(() => expect(syncActions.subscribeStorageConnection).toHaveBeenCalled());
    unmount();
    const unsubscribe = vi.fn();
    await act(async () => release(unsubscribe));
    expect(unsubscribe).toHaveBeenCalledTimes(1);
    expect(syncActions.subscribeWorkspaceManifest).not.toHaveBeenCalled();
  });

  for (const connection of ["queued", "browser-offline", "provider-offline"] as const) {
    it("reports " + connection + " separately from the app relationship", async () => {
      const core = createMemoryCore();
      const app = await core.createBlankApp();
      const queueStore = createMemorySyncQueueStore();
      const syncRegistry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
      await configureTestStorageProfile(syncRegistry);
      await syncRegistry.ensureOwnedAppRooms(app.appId);
      await enqueueSaveSource(queueStore, app);
      const syncActions = createSyncActionsStub({ queueStore, syncRegistry });
      if (connection === "provider-offline") vi.mocked(syncActions.subscribeStorageConnection).mockImplementation(async (onChange) => { onChange(false); return () => {}; });
      const { result } = renderWorkspace({ core, syncActions });
      if (connection === "browser-offline") act(() => window.dispatchEvent(new Event("offline")));
      await waitFor(() => expect(result.current.syncHealth[app.appId]?.kind).toBe(connection === "queued" ? "pending" : "offline"));
      expect(result.current.syncBadges[app.appId].label).toBe("Private");
    });
  }

  it("opens locally without waiting for a remote pull", async () => {
    const { core, syncActions, result } = renderWorkspace();
    const app = await core.createApp({ name: "", description: "", sourceCode: SOURCE });
    vi.mocked(syncActions.pullLatestAppRooms).mockReturnValue(new Promise(() => {}));
    await act(() => result.current.openApp(app.appId));
    expect(result.current.activeApp?.appId).toBe(app.appId);
    expect(result.current.mode).toBe("app");
    expect(syncActions.pullLatestAppRooms).toHaveBeenCalledWith(app.appId);
  });

  it("pulls the manifest on return to the launcher", async () => {
    const { core, syncActions, result } = renderWorkspace();
    const app = await core.createApp({ name: "", description: "", sourceCode: SOURCE });
    await act(() => result.current.openApp(app.appId));
    vi.mocked(syncActions.pullLatestWorkspaceManifest).mockClear();
    await act(async () => result.current.openLauncher());
    expect(result.current.mode).toBe("launcher");
    expect(syncActions.pullLatestWorkspaceManifest).toHaveBeenCalledTimes(1);
  });

  it("creates from the active Builder starter and offers a backup", async () => {
    const aiActions = createAiActionsStub();
    const profile = { ...TEST_BUILDER_PROFILES[0], builtIn: false, profileId: "custom", starterSource: SOURCE };
    vi.mocked(aiActions.listBuilderProfiles).mockResolvedValue([profile]);
    vi.mocked(aiActions.getBuilderPreferences).mockResolvedValue({ activeProfileId: "custom", conversationMemory: "short" });
    const { result, core, syncActions } = renderWorkspace({ aiActions });
    await act(() => result.current.createApp());
    const [app] = await core.listApps();
    expect((await core.getApp(app.appId))?.sourceCode).toBe(SOURCE);
    expect(app.name).toBe("First");
    expect(syncActions.ensureAppBackedUp).toHaveBeenCalledWith(expect.objectContaining({ appId: app.appId }), expect.any(Object));
  });

  for (const includeData of [true, false]) {
    it("copies with data=" + includeData + " into a new identity and available name", async () => {
      const { core, result, syncActions } = renderWorkspace();
      const original = await core.createApp({ name: "", description: "", sourceCode: SOURCE, compiledCss: ".note { color: red; }", compiledCssSourceHash: "hash" });
      await core.saveAppData(original.appId, { notes: ["Keep"] });
      if (!includeData) await core.createApp({ name: "", description: "", sourceCode: SOURCE.replace("First", "First (copy)") });
      await act(() => result.current.copyApp(original.appId, includeData));
      const copy = (await core.listApps()).find((app) => app.name === (includeData ? "First (copy)" : "First (copy 2)"))!;
      expect(copy.appId).not.toBe(original.appId);
      const record = await core.getApp(copy.appId);
      expect(record?.compiledCss).toBe(original.compiledCss);
      expect(record?.compiledCssSourceHash).toBeUndefined();
      await expect(core.getAppData(copy.appId)).resolves.toEqual(includeData ? { notes: ["Keep"] } : null);
      await expect(core.getAppData(original.appId)).resolves.toEqual({ notes: ["Keep"] });
      expect(syncActions.ensureAppBackedUp).toHaveBeenCalledWith(expect.objectContaining({ appId: copy.appId }), expect.any(Object));
    });
  }

  it("rolls back a copy when copying data fails", async () => {
    const { core, result } = renderWorkspace();
    const original = await core.createApp({ name: "", description: "", sourceCode: SOURCE });
    vi.spyOn(core, "saveAppData").mockRejectedValue(new Error("Storage failed"));
    await act(async () => { await expect(result.current.copyApp(original.appId, true)).rejects.toThrow("Storage failed"); });
    expect(await core.listApps()).toHaveLength(1);
  });

  it("saves source metadata and offers the saved record to sync", async () => {
    const { core, result, syncActions } = renderWorkspace();
    const original = await core.createApp({ name: "", description: "", sourceCode: SOURCE });
    await act(() => result.current.openApp(original.appId));
    await act(() => result.current.saveAppSource(original.appId, '<!doctype html><html><head><title>Saved</title><meta name="description" content="Description"></head><body></body></html>'));
    expect(result.current.activeApp).toMatchObject({ name: "Saved", description: "Description" });
    expect(result.current.apps[0].name).toBe("Saved");
    expect(syncActions.pushAppSource).toHaveBeenCalledWith(expect.objectContaining({ appId: original.appId, name: "Saved" }));
  });

  it("rejects incomplete HTML without changing local or remote state", async () => {
    const { core, result, syncActions } = renderWorkspace();
    const app = await core.createApp({ name: "", description: "", sourceCode: SOURCE });
    await act(async () => { await expect(result.current.saveAppSource(app.appId, "<p>Incomplete</p>")).rejects.toThrow("complete HTML"); });
    expect((await core.getApp(app.appId))?.sourceCode).toBe(SOURCE);
    expect(syncActions.pushAppSource).not.toHaveBeenCalled();
  });

  it("keeps source editable if Tailwind compilation fails", async () => {
    const { core, result, syncActions } = renderWorkspace();
    const app = await core.createApp({ name: "", description: "", sourceCode: SOURCE, compiledCss: ".old{}", compiledCssSourceHash: "hash" });
    await act(() => result.current.openApp(app.appId));
    vi.spyOn(runtime, "compileAppStyles").mockRejectedValueOnce(new Error("Compiler unavailable"));
    await act(() => result.current.saveAppSource(app.appId, SOURCE.replace("First", "Saved")));
    expect(result.current.activeApp?.compiledCss).toBeUndefined();
    expect(result.current.activeApp?.compiledCssSourceHash).toBeUndefined();
    expect(result.current.syncStatus).toContain("Compiler unavailable");
    expect(syncActions.pushAppSource).toHaveBeenCalled();
  });

  it("imports app data locally, queues optional sync, and refreshes the sandbox", async () => {
    const { core, result, syncActions } = renderWorkspace();
    const app = await core.createApp({ name: "", description: "", sourceCode: SOURCE });
    await act(() => result.current.importAppData(app.appId, { notes: ["Imported"] }));
    await expect(core.getAppData(app.appId)).resolves.toEqual({ notes: ["Imported"] });
    expect(syncActions.pushAppData).toHaveBeenCalledWith(app.appId, { notes: ["Imported"] });
    expect(result.current.sandboxReloadKey).toBe(1);
  });

  it("runs app-bound AI tools and retains stable messages, reasoning, and usage", async () => {
    const { core, aiActions, result, syncActions } = renderWorkspace();
    const app = await core.createApp({ name: "", description: "", sourceCode: SOURCE });
    await act(() => result.current.openApp(app.appId));
    vi.mocked(aiActions.runBuilderTurn).mockImplementation(async (input) => {
      await expect(input.tools.readCurrentAppSource()).resolves.toMatchObject({ sourceCode: SOURCE });
      await expect(input.tools.readRecentConsoleOutput()).resolves.toBe("No recent console output.");
      await input.tools.replaceCurrentAppSource(SOURCE.replace("First", "AI Updated"));
      input.onReasoning?.("Checked the source");
      input.onAssistantContent?.("Updated");
      input.onUsage?.(TEST_AI_USAGE);
      return { content: "Updated", toolRounds: 2, usage: TEST_AI_USAGE };
    });
    await act(() => result.current.sendBuilderMessage(app, "Change it"));
    const session = result.current.builderSessions[app.appId];
    expect(session.messages.map((message) => message.content)).toEqual(["Change it", "Updated"]);
    expect(session.reasoning).toBe("Checked the source");
    expect(session.usage).toEqual(TEST_AI_USAGE);
    expect(session.isRunning).toBe(false);
    const message = session.messages[0];
    expect(message.appId).toBe(app.appId);
    expect(message.messageId).toBeTruthy();
    expect(Number.isNaN(Date.parse(message.createdAt))).toBe(false);
    expect(syncActions.pushAppSource).toHaveBeenCalledWith(expect.objectContaining({ name: "AI Updated" }));
    expect(vi.mocked(aiActions.runBuilderTurn).mock.calls[0][0]).toMatchObject({ conversationMemory: "short", profile: { profileId: "builtin-opinionated-v1" } });
    await act(async () => result.current.clearBuilderConversation(app.appId));
    expect(result.current.builderSessions[app.appId]).toBeUndefined();
  });

  it("preserves a failed user turn and reports the provider error", async () => {
    const { core, aiActions, result } = renderWorkspace();
    const app = await core.createApp({ name: "", description: "", sourceCode: SOURCE });
    vi.mocked(aiActions.runBuilderTurn).mockRejectedValue(new Error("Rate limit"));
    await act(() => result.current.sendBuilderMessage(app, "Change it"));
    expect(result.current.builderSessions[app.appId]).toMatchObject({ error: "Rate limit", isRunning: false, messages: [{ content: "Change it" }] });
  });

  it("keeps conversations independent across app navigation", async () => {
    const { core, result } = renderWorkspace();
    const first = await core.createApp({ name: "", description: "", sourceCode: SOURCE });
    const second = await core.createApp({ name: "", description: "", sourceCode: SOURCE.replace("First", "Second") });
    await act(() => result.current.openApp(first.appId));
    await act(() => result.current.sendBuilderMessage(first, "First request"));
    await act(() => result.current.openApp(second.appId));
    expect(result.current.builderSessions[second.appId]).toBeUndefined();
    await act(() => result.current.openApp(first.appId));
    expect(result.current.builderSessions[first.appId].messages[0].content).toBe("First request");
  });

  it("imports an invite without requiring a preview", async () => {
    const syncActions = createSyncActionsStub();
    const invite = { createdAt: "2026-08-07T12:00:00.000Z", dataRoom: createRoomCapability(), sourceRoom: createRoomCapability(),
      kind: "app-lab-invite" as const, schemaVersion: 1 as const,
      provider: { accessModel: "auth-v1" as const, databaseUrl: "https://example.firebaseio.com",
        firebaseConfig: { apiKey: "test-key", databaseURL: "https://example.firebaseio.com" }, provider: "firebase-rtdb" as const } };
    window.location.hash = encodeAppInvite(invite);
    render(<WorkspaceShell core={createMemoryCore()} aiActions={createAiActionsStub()} syncActions={syncActions} />);
    const dialog = await screen.findByRole("dialog", { name: "Import shared app" });
    fireEvent.click(within(dialog).getByRole("button", { name: "Import" }));
    await waitFor(() => expect(syncActions.importInvite).toHaveBeenCalledWith(expect.objectContaining({ dataRoom: invite.dataRoom })));
    expect(syncActions.previewInvite).not.toHaveBeenCalled();
  });
});

function SettingsHarness({ aiActions, core, syncActions, section }: WorkspaceServices & { section: "ai" | "storage" }) {
  const workspace = useWorkspace({ aiActions, core, syncActions });
  return <WorkspaceSettings embedded workspace={{ ...workspace, settingsOpen: true, settingsInitialSection: section }} />;
}

describe("workspace settings actions", () => {
  function renderSettings(section: "ai" | "storage", syncActions = createSyncActionsStub(), aiActions = createAiActionsStub()) {
    render(<SettingsHarness aiActions={aiActions} core={createMemoryCore()} syncActions={syncActions} section={section} />);
    return { aiActions, syncActions };
  }

  it("requires authenticated storage setup", async () => {
    renderSettings("storage");
    fireEvent.click(await screen.findByRole("button", { name: /Set Security/ }));
    expect(screen.getByText(/authenticated room claims/i)).toBeTruthy();
    expect(screen.getByText("Enable Anonymous Auth")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /Connect App Lab/ }));
    fireEvent.change(screen.getByLabelText("Firebase Realtime Database URL"), { target: { value: "https://example.firebaseio.com" } });
    fireEvent.click(screen.getByRole("button", { name: "Save storage profile" }));
    expect(await screen.findByText(/apiKey/)).toBeTruthy();
  });

  it("saves, tests, and removes browser-local OpenRouter configuration", async () => {
    const { aiActions } = renderSettings("ai");
    await act(async () => {});
    vi.mocked(aiActions.testConnection).mockResolvedValue({ keyLabel: "Key", model: "provider/model", modelName: "Model" });
    fireEvent.change(screen.getByLabelText("OpenRouter API key"), { target: { value: "sk-test" } });
    fireEvent.change(screen.getByLabelText("Model id"), { target: { value: "provider/model" } });
    fireEvent.click(screen.getByRole("button", { name: "Test connection" }));
    expect(await screen.findByText("Connected to Model using Key.")).toBeTruthy();
    expect(aiActions.testConnection).toHaveBeenCalledWith({ apiKey: "sk-test", model: "provider/model" });
    fireEvent.click(screen.getByRole("button", { name: "Save AI configuration" }));
    expect(await screen.findByText("AI configuration saved in this browser.")).toBeTruthy();
    expect(aiActions.saveConfig).toHaveBeenCalledWith({ apiKey: "sk-test", model: "provider/model" });
    vi.spyOn(window, "confirm").mockReturnValue(true);
    fireEvent.click(screen.getByRole("button", { name: "Remove" }));
    expect(await screen.findByText("AI configuration removed from this browser.")).toBeTruthy();
  });

  it("groups recovery export and restore under Sync device", async () => {
    renderSettings("storage");
    fireEvent.click(await screen.findByRole("button", { name: "Sync device" }));
    expect(screen.getByText(/moving the whole workspace/i)).toBeTruthy();
    expect(screen.getAllByText("Generate sync material").length).toBeGreaterThan(0);
    expect(screen.getByText("2. Paste sync material")).toBeTruthy();
  });

  it("rejects recovery material when storage is already configured", async () => {
    const registry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await configureTestStorageProfile(registry);
    const syncActions = createSyncActionsStub({ syncRegistry: registry });
    renderSettings("storage", syncActions);
    await act(async () => {});
    fireEvent.click(await screen.findByRole("button", { name: "Sync device" }));
    fireEvent.change(screen.getByPlaceholderText("Paste workspace sync material"), { target: { value: "applab-recovery:test" } });
    fireEvent.click(screen.getByRole("button", { name: "Sync this device" }));
    expect(await screen.findByText(/already has a storage profile/i)).toBeTruthy();
    expect(syncActions.restoreWorkspaceRecovery).not.toHaveBeenCalled();
  });

  it("allows collapsing all setup sections and marks completed steps", async () => {
    renderSettings("storage");
    fireEvent.click(await screen.findByRole("button", { name: /Create Firebase/ }));
    expect(screen.queryByText("Create or sign in to Firebase")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: /Set Security/ }));
    fireEvent.click(screen.getByLabelText("Enable Anonymous Auth"));
    expect(screen.getByText("Enable Anonymous Auth").className).toContain("line-through");
  });
});

function createAiActionsStub(config: AiConfig = { apiKey: "", model: "" }): AiActions {
  return {
    clearConfig: vi.fn().mockResolvedValue(undefined),
    createBuilderProfile: vi.fn(async (input) => ({ ...input, builtIn: false, profileId: "custom-profile" })),
    deleteBuilderProfile: vi.fn().mockResolvedValue(undefined),
    getBuilderPreferences: vi.fn().mockResolvedValue({ activeProfileId: "builtin-opinionated-v1", conversationMemory: "short" }),
    getConfig: vi.fn().mockResolvedValue(config),
    listBuilderProfiles: vi.fn().mockResolvedValue(TEST_BUILDER_PROFILES),
    runBuilderTurn: vi.fn().mockResolvedValue({ content: "Done.", toolRounds: 0, usage: TEST_AI_USAGE }),
    saveConfig: vi.fn(async (nextConfig) => ({
      apiKey: nextConfig.apiKey.trim(),
      model: nextConfig.model.trim(),
    })),
    saveBuilderPreferences: vi.fn(async (preferences) => preferences),
    testConnection: vi.fn(),
    updateBuilderProfile: vi.fn(async (input) => ({ ...input, builtIn: false })),
  };
}

const TEST_BUILDER_PROFILES: BuilderProfile[] = [
  {
    builtIn: true,
    description: "Minimal test profile.",
    name: "Minimal",
    profileId: "builtin-minimal-v1",
    promptTemplate: "Build the requested app.",
    starterSource: "<!doctype html><html><body><main></main></body></html>",
  },
  {
    builtIn: true,
    description: "Opinionated test profile.",
    name: "Opinionated",
    profileId: "builtin-opinionated-v1",
    promptTemplate: "Build the requested app using App Lab best practices.",
    starterSource: "<!doctype html><html><head><title>Opinionated Test</title></head><body><main></main></body></html>",
  },
];

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
        appArchiveStates: syncState.appArchiveStates ?? {},
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
    beginLocalAppSourceEdit: vi.fn(() => () => {}),
    noteLocalAppDataEdit: vi.fn(),
    previewInvite: vi.fn(),
    pullLatestAppRooms: vi.fn().mockResolvedValue({}),
    pullLatestWorkspaceManifest: vi.fn().mockResolvedValue({ appIdsChanged: [], appIdsDeleted: [] }),
    pushAppData: vi.fn().mockResolvedValue(undefined),
    pushAppSource: vi.fn().mockResolvedValue(undefined),
    queueWorkspaceManifestSave: vi.fn().mockResolvedValue(undefined),
    removeLocalAppSync: vi.fn((appId) => syncRegistry.removeLocalAppSync(appId)),
    setAppArchived: vi.fn((appId, archived) => syncRegistry.setAppArchived(appId, archived)),
    restoreWorkspaceRecovery: vi.fn().mockResolvedValue(undefined),
    subscribeAppData: vi.fn().mockResolvedValue(() => {}),
    subscribeAppSource: vi.fn().mockResolvedValue(() => {}),
    subscribeStorageConnection: vi.fn().mockResolvedValue(() => {}),
    subscribeWorkspaceManifest: vi.fn().mockResolvedValue(() => {}),
  };
}
