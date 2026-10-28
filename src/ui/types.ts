import type { AppSummary } from "../core";

export interface LauncherApp extends AppSummary {
  archived?: boolean;
  id: string;
  kind: number;
  relationship?: string;
  unavailable: boolean;
}

export interface ToolAttention {
  logErrors: number;
  aiReplies: number;
}
