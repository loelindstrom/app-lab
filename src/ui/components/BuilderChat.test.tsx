import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import type { WorkspaceController } from "../shell/useWorkspace";
import { BuilderChat } from "./BuilderChat";

afterEach(cleanup);

it("renders safe assistant Markdown and collapsed live reasoning", () => {
  const workspace = {
    activeApp: { appId: "app", name: "Board" },
    aiConfig: { apiKey: "test", model: "provider/model" },
    builderSessions: { app: {
      isRunning: true, activity: "Thinking...", reasoning: "Inspecting the source...",
      streamingContent: "Drafting **the answer**...", usage: { totalTokens: 100 },
      messages: [{ role: "assistant", messageId: "reply", content: '**Finished**\n\n- First item\n\n[Open docs](https://example.test)\n\n[Unsafe link](javascript:alert(1))\n\n<script>unsafe</script>' }],
    } },
  } as unknown as WorkspaceController;
  render(<BuilderChat workspace={workspace} draft="" onDraftChange={vi.fn()} onSettings={vi.fn()} motion={false} />);
  expect(screen.getByText("Finished").tagName).toBe("STRONG");
  expect(screen.getByText("First item").closest("li")).toBeTruthy();
  expect(screen.getByRole("link", { name: "Open docs" }).getAttribute("rel")).toContain("noopener");
  expect(screen.getByText("Unsafe link").closest("a")).toBeNull();
  expect(screen.queryByText("unsafe")).toBeNull();
  expect(screen.getByText("the answer").tagName).toBe("STRONG");
  const summary = screen.getAllByText("Thinking...").find((node) => node.tagName === "SUMMARY")!;
  const details = summary.closest("details")!;
  expect(details.open).toBe(false);
  fireEvent.click(summary);
  expect(details.open).toBe(true);
  expect(screen.getByText("Inspecting the source...")).toBeTruthy();
});
