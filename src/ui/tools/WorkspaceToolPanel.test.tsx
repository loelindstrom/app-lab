import { cleanup, fireEvent, render, screen, waitFor, type RenderResult } from "@testing-library/react";
import type { ComponentProps } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { AppRecord } from "../../core/types";
import { WorkspaceToolPanel } from "./WorkspaceToolPanel";

const app: AppRecord = {
  appId: "app-export",
  createdAt: "2026-01-01T00:00:00.000Z",
  description: "Export test",
  name: "Exportable App",
  sourceCode: "<!doctype html><title>Exportable App</title>",
  updatedAt: "2026-01-01T00:00:00.000Z",
};

const originalCreateObjectURL = window.URL.createObjectURL;
const originalRevokeObjectURL = window.URL.revokeObjectURL;

describe("WorkspaceToolPanel", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    restoreUrlFunction("createObjectURL", originalCreateObjectURL);
    restoreUrlFunction("revokeObjectURL", originalRevokeObjectURL);
  });

  it("downloads selected source and data files from the source tool", async () => {
    const onLoadAppData = vi.fn().mockResolvedValue({ items: [{ title: "Saved item" }], schemaVersion: 1 });
    const createObjectURL = vi.fn(() => "blob:export");
    const revokeObjectURL = vi.fn();
    Object.defineProperty(window.URL, "createObjectURL", { configurable: true, value: createObjectURL });
    Object.defineProperty(window.URL, "revokeObjectURL", { configurable: true, value: revokeObjectURL });
    vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => undefined);

    renderToolPanel({ mode: "source", onLoadAppData });

    fireEvent.click(screen.getByRole("button", { name: "Export ↑" }));
    expect(screen.queryByRole("tab", { name: "Prompt" })).toBeNull();
    expect(screen.getByRole("checkbox", { name: /Source code/ })).toBeTruthy();
    expect(screen.getByRole("checkbox", { name: /App data/ })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Copy source" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Copy data" })).toBeTruthy();

    fireEvent.click(screen.getByRole("checkbox", { name: /App data/ }));
    await waitFor(() => expect(onLoadAppData).toHaveBeenCalledWith("app-export"));

    fireEvent.click(screen.getByRole("button", { name: "Download selected" }));
    expect(createObjectURL).toHaveBeenCalledTimes(2);
    expect(HTMLAnchorElement.prototype.click).toHaveBeenCalledTimes(2);
  });

  it("offers copy-prompt and AI setup paths when OpenRouter is not configured", () => {
    const onOpenAiSettings = vi.fn();
    renderToolPanel({ mode: "builder", onOpenAiSettings });

    expect(screen.getByText(/Start with any AI chat/)).toBeTruthy();
    expect(screen.queryByRole("button", { name: /Export/ })).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Set up OpenRouter" }));
    expect(onOpenAiSettings).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole("button", { name: /^Copy prompt \+ code$/ }));

    expect(screen.getByRole("button", { name: "Copy prompt + code ↓" })).toBeTruthy();
    expect(getTextarea("Prompt and code").value).toContain('You are helping me edit an App Lab sandbox app named "Exportable App".');
    expect(getTextarea("Prompt and code").value).toContain(app.sourceCode);
  });

  it("submits configured chat messages and renders conversation state", async () => {
    const onClearBuilderConversation = vi.fn();
    const onOpenBuilderProfileSettings = vi.fn();
    const onSendBuilderMessage = vi.fn().mockResolvedValue(undefined);
    renderToolPanel({
      aiConfigured: true,
      builderActivity: "Applying app source...",
      builderError: "The model could not finish.",
      builderMessages: [
        {
          appId: app.appId,
          content: "Make it blue",
          createdAt: "2026-01-01T00:00:01.000Z",
          messageId: "user-1",
          role: "user",
        },
        {
          appId: app.appId,
          content: "I updated the colors.",
          createdAt: "2026-01-01T00:00:02.000Z",
          messageId: "assistant-1",
          role: "assistant",
        },
      ],
      builderUsage: {
        completionTokens: 6_000,
        costUsd: 0.0165795,
        promptTokens: 14_000,
        reasoningTokens: 640,
        totalTokens: 20_640,
      },
      mode: "builder",
      onClearBuilderConversation,
      onOpenBuilderProfileSettings,
      onSendBuilderMessage,
    });

    expect(screen.getByText(/I can edit/)).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Open Builder profile settings for Opinionated" }));
    expect(onOpenBuilderProfileSettings).toHaveBeenCalledTimes(1);
    expect(screen.getByText("Make it blue")).toBeTruthy();
    expect(screen.getByText("I updated the colors.")).toBeTruthy();
    expect(screen.getByText("Applying app source...")).toBeTruthy();
    expect(screen.getByRole("alert").textContent).toContain("The model could not finish.");
    expect(screen.getByLabelText("Builder session usage").textContent).toBe("Session: $0.0166 · 20.6k tokens");

    fireEvent.change(screen.getByLabelText("Message"), { target: { value: "  Add a dashboard  " } });
    fireEvent.click(screen.getByRole("button", { name: "Send message" }));
    await waitFor(() => expect(onSendBuilderMessage).toHaveBeenCalledWith("Add a dashboard"));

    fireEvent.click(screen.getByRole("button", { name: "Clear chat" }));
    expect(onClearBuilderConversation).toHaveBeenCalledTimes(1);
  });
});

function renderToolPanel(overrides: Partial<ComponentProps<typeof WorkspaceToolPanel>> = {}): RenderResult {
  return render(
    <WorkspaceToolPanel
      activeApp={app}
      activeBuilderProfileName="Opinionated"
      aiConfigured={false}
      builderActivity={null}
      builderError={null}
      builderIsRunning={false}
      builderMessages={[]}
      builderUsage={{ completionTokens: 0, costUsd: 0, promptTokens: 0, reasoningTokens: 0, totalTokens: 0 }}
      consoleEntries={[]}
      mode="builder"
      onClearBuilderConversation={vi.fn()}
      onClearConsole={vi.fn()}
      onClose={vi.fn()}
      onLoadAppData={vi.fn()}
      onOpenAiSettings={vi.fn()}
      onOpenBuilderProfileSettings={vi.fn()}
      onSaveSource={vi.fn().mockResolvedValue(app)}
      onSendBuilderMessage={vi.fn().mockResolvedValue(undefined)}
      {...overrides}
    />,
  );
}

function getTextarea(label: string): HTMLTextAreaElement {
  const textarea = screen.getByLabelText(label);
  if (!(textarea instanceof HTMLTextAreaElement)) throw new Error(`Expected textarea: ${label}`);
  return textarea;
}

function restoreUrlFunction(name: "createObjectURL" | "revokeObjectURL", value: typeof window.URL.createObjectURL | typeof window.URL.revokeObjectURL | undefined) {
  if (value) {
    Object.defineProperty(window.URL, name, { configurable: true, value });
  } else {
    delete (window.URL as unknown as Record<string, unknown>)[name];
  }
}
