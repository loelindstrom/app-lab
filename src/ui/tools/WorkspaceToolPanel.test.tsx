import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
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

    render(
      <WorkspaceToolPanel
        activeApp={app}
        consoleEntries={[]}
        mode="source"
        onClearConsole={vi.fn()}
        onClose={vi.fn()}
        onLoadAppData={onLoadAppData}
        onSaveSource={vi.fn()}
      />,
    );

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

  it("keeps the prompt and code helper in the BuilderAI chat panel", () => {
    render(
      <WorkspaceToolPanel
        activeApp={app}
        consoleEntries={[]}
        mode="builder"
        onClearConsole={vi.fn()}
        onClose={vi.fn()}
        onLoadAppData={vi.fn()}
        onSaveSource={vi.fn()}
      />,
    );

    expect(screen.getByText("The AI bot is still being built, but use the button below to copy prompt + code and use it in another AI.")).toBeTruthy();
    expect(screen.queryByRole("button", { name: /Export/ })).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Copy prompt + code ↑" }));

    expect(screen.getByRole("button", { name: "Copy prompt + code ↓" })).toBeTruthy();
    expect(getTextarea("Prompt and code").value).toContain('You are helping me edit an App Lab sandbox app named "Exportable App".');
    expect(getTextarea("Prompt and code").value).toContain(app.sourceCode);
  });
});

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
