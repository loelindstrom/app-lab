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

export type BuilderConversationMemory = "long" | "medium" | "short";

export interface BuilderPreferences {
  activeProfileId: string;
  conversationMemory: BuilderConversationMemory;
}

export interface BuilderProfile {
  builtIn: boolean;
  description: string;
  name: string;
  profileId: string;
  promptTemplate: string;
  starterSource: string;
}

export interface BuilderProfileInput {
  description: string;
  name: string;
  promptTemplate: string;
  starterSource: string;
}

export interface BuilderToolSummary {
  description: string;
  name: string;
}

export interface UpdateBuilderProfileInput extends BuilderProfileInput {
  profileId: string;
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
  conversationMemory?: BuilderConversationMemory;
  messages: AiChatMessage[];
  onActivity?: (message: string) => void;
  onAssistantContent?: (content: string) => void;
  onReasoning?: (reasoning: string) => void;
  onUsage?: (usage: AiUsage) => void;
  profile?: BuilderProfile;
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
  createBuilderProfile(input: BuilderProfileInput): Promise<BuilderProfile>;
  deleteBuilderProfile(profileId: string): Promise<void>;
  getBuilderPreferences(): Promise<BuilderPreferences>;
  getConfig(): Promise<AiConfig>;
  listBuilderProfiles(): Promise<BuilderProfile[]>;
  runBuilderTurn(input: RunBuilderTurnInput): Promise<BuilderTurnResult>;
  saveConfig(config: AiConfig): Promise<AiConfig>;
  saveBuilderPreferences(preferences: BuilderPreferences): Promise<BuilderPreferences>;
  testConnection(config: AiConfig): Promise<AiConnectionResult>;
  updateBuilderProfile(input: UpdateBuilderProfileInput): Promise<BuilderProfile>;
}
