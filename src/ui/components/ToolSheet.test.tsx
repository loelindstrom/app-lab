import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { AppRecord } from "../../core";
import type { WorkspaceController } from "../shell/useWorkspace";
import { ToolSheet } from "./ToolSheet";

vi.mock("./ToolsPanel", () => ({ ToolsPanel: ({ children }: { children: ReactNode }) => <div>{children}</div> }));
afterEach(cleanup);

describe("ToolSheet save completion", () => {
  for (const leave of ["unmount", "settings"] as const) {
    it(`does not close a different view after ${leave}`, async () => {
      const app: AppRecord = { appId: "first", name: "First", description: "", sourceCode: "<!doctype html><html><body></body></html>", createdAt: "", updatedAt: "" };
      let resolve!: (app: AppRecord) => void;
      const saveAppSource = vi.fn(() => new Promise<AppRecord>((done) => { resolve = done; }));
      const workspace = { activeApp: app, saveAppSource } as unknown as WorkspaceController;
      const onOpenChange = vi.fn();
      const onNotify = vi.fn();
      const props = { workspace, open: true, onOpenChange, onNotify, initialTool: "ai" as const, motion: false,
        attention: { aiReplies: 0, logErrors: 0 }, onViewChange: vi.fn(), onSettings: vi.fn() };
      const { rerender, unmount } = render(<ToolSheet {...props} />);
      fireEvent.change(screen.getByLabelText("Paste the new code"), { target: { value: app.sourceCode } });
      fireEvent.click(screen.getByRole("button", { name: "Apply code" }));
      expect(saveAppSource).toHaveBeenCalledWith(app.appId, app.sourceCode);
      expect((screen.getByLabelText("Paste the new code") as HTMLTextAreaElement).readOnly).toBe(true);
      if (leave === "unmount") unmount(); else rerender(<ToolSheet {...props} open={false} />);
      await act(async () => resolve(app));
      expect(onOpenChange).not.toHaveBeenCalled();
      if (leave === "unmount") expect(onNotify).not.toHaveBeenCalled();
    });
  }
});
