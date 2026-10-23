import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import type { AppSyncHealth } from "../../shell/useWorkspace";
import { SyncStatusIndicator } from "./SyncStatusIndicator";

afterEach(cleanup);

describe("SyncStatusIndicator", () => {
  it.each([
    ["synced", "check"], ["syncing", "refresh-cw"], ["pending", "clock-3"],
    ["offline", "wifi-off"], ["problem", "circle-alert"],
  ] as const)("uses the matching Lucide icon for %s", (kind, icon) => {
    render(<SyncStatusIndicator health={{ kind, label: "Status", title: "Detailed status", tone: "neutral" }} />);
    const button = screen.getByRole("button", { name: "Sync status: Status" });
    const cloud = button.querySelector(".lucide-cloud");
    expect(cloud?.getAttribute("width")).toBe("28");
    expect(cloud?.getAttribute("stroke-width")).toBe("1.8");
    expect(button.querySelector(`.sync-status-mark .lucide-${icon}`)).toBeTruthy();
    fireEvent.click(button);
    expect(screen.getByRole("region", { name: "Sync status" }).textContent).toContain("Detailed status");
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("region")).toBeNull();
    expect(document.activeElement).toBe(button);
  });

  it("does not suggest cloud sync for local-only apps", () => {
    const health: AppSyncHealth = { kind: "none", label: "", title: "", tone: "neutral" };
    render(<SyncStatusIndicator health={health} />);
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("dismisses details when tapping outside", () => {
    render(<SyncStatusIndicator health={{ kind: "synced", label: "Synced", title: "Saved remotely.", tone: "good" }} />);
    fireEvent.click(screen.getByRole("button"));
    fireEvent.pointerDown(document.body);
    expect(screen.queryByRole("region")).toBeNull();
  });
});
