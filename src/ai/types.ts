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

export interface AiUsage {
  completionTokens: number;
  costUsd: number | null;
  promptTokens: number;
  reasoningTokens: number;
  totalTokens: number;
}

export interface BuilderAppSource {
  description: string;
  name: string;
  sourceCode: string;
}

export interface BuilderSourceWriteReceipt {
  name: string;
  sourceChars: number;
  success: true;
}

export interface BuilderAgentTools {
  readCurrentAppSource: () => Promise<BuilderAppSource>;
  readRecentConsoleOutput: () => Promise<string>;
  replaceCurrentAppSource: (sourceCode: string) => Promise<BuilderSourceWriteReceipt>;
}

export interface RunBuilderTurnInput {
  appId: string;
  appName: string;
  messages: AiChatMessage[];
  onActivity?: (message: string) => void;
  onUsage?: (usage: AiUsage) => void;
  signal?: AbortSignal;
  tools: BuilderAgentTools;
}

export interface BuilderTurnResult {
  content: string;
  toolRounds: number;
  usage: AiUsage;
}

export interface AiActions {
  clearConfig(): Promise<void>;
  getConfig(): Promise<AiConfig>;
  runBuilderTurn(input: RunBuilderTurnInput): Promise<BuilderTurnResult>;
  saveConfig(config: AiConfig): Promise<AiConfig>;
  testConnection(config: AiConfig): Promise<AiConnectionResult>;
}
