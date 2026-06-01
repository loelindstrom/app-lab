export type AppId = string;

export type JsonValue =
  | null
  | boolean
  | number
  | string
  | JsonValue[]
  | { [key: string]: JsonValue };

export interface AppSummary {
  appId: AppId;
  name: string;
  description: string;
  updatedAt: string;
}

export interface AppRecord extends AppSummary {
  sourceCode: string;
  createdAt: string;
}

export interface OpenRouterConfig {
  apiKey: string;
  model: string;
}

export interface CreateAppInput {
  name: string;
  description: string;
  sourceCode: string;
}

export interface UpdateAppInput {
  appId: AppId;
  name?: string;
  description?: string;
  sourceCode?: string;
}

export interface AppLabCore {
  createApp(input: CreateAppInput): Promise<AppRecord>;
  createBlankApp(): Promise<AppRecord>;
  getApp(appId: AppId): Promise<AppRecord | null>;
  listApps(): Promise<AppSummary[]>;
  updateApp(input: UpdateAppInput): Promise<AppRecord>;
}
