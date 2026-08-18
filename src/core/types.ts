import type { JsonValue } from "../jsonData";

export type { JsonValue } from "../jsonData";

export type AppId = string;

export interface AppSummary {
  appId: AppId;
  name: string;
  description: string;
  updatedAt: string;
}

export interface AppRecord extends AppSummary {
  compiledCss?: string;
  compiledCssSourceHash?: string;
  sourceCode: string;
  createdAt: string;
}

export interface CreateAppInput {
  compiledCss?: string;
  compiledCssSourceHash?: string;
  name: string;
  description: string;
  sourceCode: string;
}

export interface UpdateAppInput {
  appId: AppId;
  compiledCss?: string;
  compiledCssSourceHash?: string;
  name?: string;
  description?: string;
  sourceCode?: string;
}

export interface AppLabCore {
  createApp(input: CreateAppInput): Promise<AppRecord>;
  createBlankApp(): Promise<AppRecord>;
  deleteApp(appId: AppId): Promise<void>;
  getApp(appId: AppId): Promise<AppRecord | null>;
  getAppData(appId: AppId): Promise<JsonValue>;
  listApps(): Promise<AppSummary[]>;
  saveAppData(appId: AppId, data: JsonValue): Promise<void>;
  updateApp(input: UpdateAppInput): Promise<AppRecord>;
  upsertApp(record: AppRecord): Promise<AppRecord>;
}
