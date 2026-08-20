export interface AiConfig {
  apiKey: string;
  model: string;
}

export interface AiConnectionResult {
  keyLabel: string | null;
  model: string;
  modelName: string;
}

export interface AiChatMessage {
  appId: string;
  content: string;
  createdAt: string;
  messageId: string;
  role: "assistant" | "user";
}

export interface BuilderAppSource {
  description: string;
  name: string;
  sourceCode: string;
}

export interface BuilderAgentTools {
  readCurrentAppSource: () => Promise<BuilderAppSource>;
  readRecentConsoleOutput: () => Promise<string>;
  replaceCurrentAppSource: (sourceCode: string) => Promise<BuilderAppSource>;
}

export interface RunBuilderTurnInput {
  appId: string;
  appName: string;
  messages: AiChatMessage[];
  onActivity?: (message: string) => void;
  signal?: AbortSignal;
  tools: BuilderAgentTools;
}

export interface BuilderTurnResult {
  content: string;
  toolRounds: number;
}

export interface AiActions {
  clearConfig(): Promise<void>;
  getConfig(): Promise<AiConfig>;
  runBuilderTurn(input: RunBuilderTurnInput): Promise<BuilderTurnResult>;
  saveConfig(config: AiConfig): Promise<AiConfig>;
  testConnection(config: AiConfig): Promise<AiConnectionResult>;
}
