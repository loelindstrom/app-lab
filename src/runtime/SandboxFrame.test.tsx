import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { AppRecord } from "../core/types";
import { SandboxFrame } from "./SandboxFrame";

const app: AppRecord = {
  appId: "app-1",
  name: "Example",
  description: "Test app",
  sourceCode: "<!doctype html><html><head><title>Example</title></head><body></body></html>",
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
};

describe("SandboxFrame", () => {
  it("revokes the current capability when the app document unloads", async () => {
    const getAppData = vi.fn().mockResolvedValue({ note: "secret" });
    const { container } = render(
      <SandboxFrame app={app} getAppData={getAppData} onConsoleEntry={vi.fn()} saveAppData={vi.fn().mockResolvedValue(undefined)} />,
    );
    const iframe = getIframe(container);
    const capability = getCapability(iframe);

    fireEvent.load(iframe);
    dispatchAppMessage(iframe, { type: "APP_LAB_UNLOADING", appLabCapability: capability });
    dispatchAppMessage(iframe, { type: "GET_MY_DATA", requestId: "read-1", appLabCapability: capability });

    await settle();
    expect(getAppData).not.toHaveBeenCalled();
  });

  it("reloads the sandbox document after an unexpected iframe load", async () => {
    const getAppData = vi.fn().mockResolvedValue({ note: "secret" });
    const { container } = render(
      <SandboxFrame app={app} getAppData={getAppData} onConsoleEntry={vi.fn()} saveAppData={vi.fn().mockResolvedValue(undefined)} />,
    );
    const iframe = getIframe(container);
    const firstCapability = getCapability(iframe);

    fireEvent.load(iframe);
    fireEvent.load(iframe);

    await waitFor(() => expect(getCapability(iframe)).not.toBe(firstCapability));

    dispatchAppMessage(iframe, { type: "GET_MY_DATA", requestId: "old-read", appLabCapability: firstCapability });
    await settle();
    expect(getAppData).not.toHaveBeenCalled();

    dispatchAppMessage(iframe, { type: "GET_MY_DATA", requestId: "new-read", appLabCapability: getCapability(iframe) });
    await waitFor(() => expect(getAppData).toHaveBeenCalledWith(app.appId));
  });

  it("accepts console entries from the active sandbox capability", async () => {
    const onConsoleEntry = vi.fn();
    const { container } = render(
      <SandboxFrame app={app} getAppData={vi.fn().mockResolvedValue(null)} onConsoleEntry={onConsoleEntry} saveAppData={vi.fn().mockResolvedValue(undefined)} />,
    );
    const iframe = getIframe(container);
    const capability = getCapability(iframe);

    fireEvent.load(iframe);
    dispatchAppMessage(iframe, {
      type: "APP_LAB_CONSOLE",
      appLabCapability: capability,
      payload: {
        level: "error",
        args: ["Broken"],
        timestamp: "2026-01-01T00:00:00.000Z",
      },
    });

    expect(onConsoleEntry).toHaveBeenCalledWith(
      expect.objectContaining({
        args: ["Broken"],
        level: "error",
        timestamp: "2026-01-01T00:00:00.000Z",
      }),
    );
  });

  it("waits briefly for the app to register a remote data handler before warning", () => {
    vi.useFakeTimers();
    const onUnhandledRemoteDataChange = vi.fn();
    const saveAppData = vi.fn().mockResolvedValue(undefined);
    const getAppData = vi.fn().mockResolvedValue(null);
    const { container, rerender } = render(
      <SandboxFrame
        app={app}
        getAppData={getAppData}
        onConsoleEntry={vi.fn()}
        onUnhandledRemoteDataChange={onUnhandledRemoteDataChange}
        remoteDataChange={null}
        saveAppData={saveAppData}
      />,
    );
    const iframe = getIframe(container);
    const capability = getCapability(iframe);

    fireEvent.load(iframe);
    rerender(
      <SandboxFrame
        app={app}
        getAppData={getAppData}
        onConsoleEntry={vi.fn()}
        onUnhandledRemoteDataChange={onUnhandledRemoteDataChange}
        remoteDataChange={{ data: { count: 2 }, id: "remote-1", version: 2 }}
        saveAppData={saveAppData}
      />,
    );

    dispatchAppMessage(iframe, {
      type: "APP_LAB_DATA_HANDLER_STATUS",
      appLabCapability: capability,
      payload: { registered: true },
    });
    act(() => {
      vi.advanceTimersByTime(600);
    });

    expect(onUnhandledRemoteDataChange).not.toHaveBeenCalled();
    vi.useRealTimers();
  });

  it("warns when remote data changes and the app does not register a handler", () => {
    vi.useFakeTimers();
    const onUnhandledRemoteDataChange = vi.fn();
    const { container, rerender } = render(
      <SandboxFrame
        app={app}
        getAppData={vi.fn().mockResolvedValue(null)}
        onConsoleEntry={vi.fn()}
        onUnhandledRemoteDataChange={onUnhandledRemoteDataChange}
        remoteDataChange={null}
        saveAppData={vi.fn().mockResolvedValue(undefined)}
      />,
    );
    const iframe = getIframe(container);

    fireEvent.load(iframe);
    rerender(
      <SandboxFrame
        app={app}
        getAppData={vi.fn().mockResolvedValue(null)}
        onConsoleEntry={vi.fn()}
        onUnhandledRemoteDataChange={onUnhandledRemoteDataChange}
        remoteDataChange={{ data: { count: 2 }, id: "remote-1", version: 2 }}
        saveAppData={vi.fn().mockResolvedValue(undefined)}
      />,
    );
    act(() => {
      vi.advanceTimersByTime(600);
    });

    expect(onUnhandledRemoteDataChange).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });
});

function getIframe(container: HTMLElement): HTMLIFrameElement {
  const iframe = container.querySelector("iframe");
  if (!(iframe instanceof HTMLIFrameElement)) {
    throw new Error("Expected iframe to render.");
  }
  return iframe;
}

function getCapability(iframe: HTMLIFrameElement): string {
  const match = iframe.srcdoc.match(/value: "([^"]+)"/);
  if (!match) {
    throw new Error("Expected sandbox capability in srcdoc.");
  }
  return match[1];
}

function dispatchAppMessage(iframe: HTMLIFrameElement, data: unknown) {
  const event = new MessageEvent("message", { data });
  Object.defineProperty(event, "source", { value: iframe.contentWindow });
  window.dispatchEvent(event);
}

function settle(): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, 0);
  });
}
