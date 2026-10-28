import { describe, expect, it, vi } from "vitest";
import { createMemoryCore } from "../core/memoryCore";
import { createMemorySyncQueueStore } from "./queue/syncQueue";
import { createMemorySyncProvider } from "./testing/memorySyncProvider";
import { configureTestStorageProfile } from "./testing/testStorageProfile";
import { createWorkspaceSyncActions } from "./workspaceSyncActions";
import { createMemoryWorkspaceSyncStore, createWorkspaceSyncRegistry } from "./workspace/workspaceSync";

function device(provider: ReturnType<typeof createMemorySyncProvider>) {
  const core = createMemoryCore();
  const registry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
  const queue = createMemorySyncQueueStore();
  const actions = createWorkspaceSyncActions({ core, queueStore: queue, syncRegistry: registry,
    createProviderFromReference: () => provider, createProviderFromStorageProfile: () => provider });
  return { core, registry, queue, actions };
}

describe("archive synchronization", () => {
  it("streams archive/unarchive to another device, but not to a shared app recipient", async () => {
    const provider = createMemorySyncProvider();
    const owner = device(provider);
    await configureTestStorageProfile(owner.registry);
    const app = await owner.core.createBlankApp();
    await owner.core.saveAppData(app.appId, { count: 7 });
    await owner.actions.backUpLocalApps();
    const second = device(provider);
    await second.actions.restoreWorkspaceRecovery(await owner.actions.exportWorkspaceRecovery());
    await second.actions.flushWorkspaceManifestQueue();
    const recipient = device(provider);
    await recipient.actions.importInvite(await owner.actions.createInvite(app.appId));
    await owner.actions.flushWorkspaceManifestQueue();
    const onChange = vi.fn();
    const unsubscribe = await second.actions.subscribeWorkspaceManifest(onChange);
    try {
      await owner.actions.setAppArchived(app.appId, true);
      expect((await owner.queue.listItems()).some(item => item.kind === "save-workspace-manifest")).toBe(true);
      await owner.actions.flushWorkspaceManifestQueue();
      await vi.waitFor(async () => expect((await second.actions.getWorkspaceSyncOverview([app.appId])).appArchiveStates[app.appId]?.archived).toBe(true));
      expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ appIdsChanged: expect.arrayContaining([app.appId]) }));
      expect((await recipient.actions.getWorkspaceSyncOverview([app.appId])).appArchiveStates[app.appId]).toBeUndefined();
      await second.actions.setAppArchived(app.appId, false);
      await second.actions.flushWorkspaceManifestQueue();
      await owner.actions.pullLatestWorkspaceManifest();
      expect((await owner.actions.getWorkspaceSyncOverview([app.appId])).appArchiveStates[app.appId].archived).toBe(false);
      expect(await second.core.getAppData(app.appId)).toEqual({ count: 7 });
      expect((await owner.core.getApp(app.appId))?.sourceCode).toBe(app.sourceCode);
    } finally { unsubscribe(); }
  });

  it("keeps a newer unarchive when a stale offline device later saves its manifest", async () => {
    const provider = createMemorySyncProvider();
    const owner = device(provider);
    await configureTestStorageProfile(owner.registry);
    const app = await owner.core.createBlankApp();
    await owner.actions.backUpLocalApps();
    await owner.actions.setAppArchived(app.appId, true);
    await owner.actions.flushWorkspaceManifestQueue();
    const stale = device(provider);
    await stale.actions.restoreWorkspaceRecovery(await owner.actions.exportWorkspaceRecovery());
    await stale.actions.flushWorkspaceManifestQueue();
    await owner.actions.setAppArchived(app.appId, false);
    await owner.actions.flushWorkspaceManifestQueue();
    expect((await stale.registry.getState()).appArchiveStates?.[app.appId].archived).toBe(true);
    await stale.actions.queueWorkspaceManifestSave();
    await stale.actions.flushWorkspaceManifestQueue();
    expect((await stale.registry.getState()).appArchiveStates?.[app.appId].archived).toBe(false);
    await owner.actions.pullLatestWorkspaceManifest();
    expect((await owner.registry.getState()).appArchiveStates?.[app.appId].archived).toBe(false);
  });
});
