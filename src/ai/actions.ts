import { createBuilderAgent } from "./agent";
import { createAiConfigStore } from "./config";
import { createOpenRouterClient, type OpenRouterClient } from "./openrouter";
import type { AiActions } from "./types";

interface BrowserAiActionsOptions {
  client?: OpenRouterClient;
  storage?: Storage;
}

export function createBrowserAiActions(options: BrowserAiActionsOptions = {}): AiActions {
  const storage = options.storage ?? window.localStorage;
  const configStore = createAiConfigStore(storage);
  const client = options.client ?? createOpenRouterClient({ referer: window.location.origin });
  const agent = createBuilderAgent(client, configStore.get);

  return {
    clearConfig: configStore.clear,
    getConfig: configStore.get,
    runBuilderTurn: agent.runTurn,
    saveConfig: configStore.save,
    testConnection: (config) => client.testConnection(config),
  };
}
