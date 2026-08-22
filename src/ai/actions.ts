import { createBuilderAgent } from "./agent";
import { createAiConfigStore } from "./config";
import { createOpenRouterClient, type OpenRouterClient } from "./openrouter";
import { createBuilderPreferencesStore } from "./preferences";
import { createBuilderProfileStore } from "./profileStore";
import { createBuiltInBuilderProfiles } from "./profiles";
import type { AiActions } from "./types";

interface BrowserAiActionsOptions {
  client?: OpenRouterClient;
  opinionatedStarterSource: string;
  storage?: Storage;
}

export function createBrowserAiActions(options: BrowserAiActionsOptions): AiActions {
  const storage = options.storage ?? window.localStorage;
  const configStore = createAiConfigStore(storage);
  const preferencesStore = createBuilderPreferencesStore(storage);
  const profileStore = createBuilderProfileStore(storage, {
    builtInProfiles: createBuiltInBuilderProfiles(options.opinionatedStarterSource),
  });
  const client = options.client ?? createOpenRouterClient({ referer: window.location.origin });
  const agent = createBuilderAgent(client, configStore.get);

  return {
    clearConfig: configStore.clear,
    createBuilderProfile: profileStore.create,
    deleteBuilderProfile: profileStore.delete,
    getBuilderPreferences: preferencesStore.get,
    getConfig: configStore.get,
    listBuilderProfiles: profileStore.list,
    runBuilderTurn: agent.runTurn,
    saveConfig: configStore.save,
    saveBuilderPreferences: preferencesStore.save,
    testConnection: (config) => client.testConnection(config),
    updateBuilderProfile: profileStore.update,
  };
}
