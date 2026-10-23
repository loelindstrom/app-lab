import type { AppSummary } from "../core";

export interface LauncherApp extends AppSummary {
  id: string;
  kind: number;
  relationship?: string;
  unavailable: boolean;
}

export interface ToolAttention {
  logErrors: number;
  aiReplies: number;
}
