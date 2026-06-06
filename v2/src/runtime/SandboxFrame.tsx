import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { AppRecord, JsonValue } from "../core/types";
import { prepareSandboxDocument } from "./sandboxDocument";

interface SandboxFrameProps {
  app: AppRecord;
  getAppData: (appId: string) => Promise<JsonValue>;
  onConsoleEntry: (entry: SandboxConsoleEntry) => void;
  saveAppData: (appId: string, data: JsonValue) => Promise<void>;
}

export interface SandboxConsoleEntry {
  id: string;
  level: "debug" | "error" | "info" | "log" | "warn";
  args: string[];
  timestamp: string;
}

interface ActiveSandboxLoad {
  appId: string;
  capability: string;
}

export function SandboxFrame({ app, getAppData, onConsoleEntry, saveAppData }: SandboxFrameProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const activeLoadRef = useRef<ActiveSandboxLoad | null>(null);
  const expectedLoadCapabilityRef = useRef<string | null>(null);
  const [reloadNonce, setReloadNonce] = useState(0);
  const sandboxDocument = useMemo(() => {
    const capability = crypto.randomUUID();
    return {
      capability,
      html: prepareSandboxDocument(app.sourceCode, capability),
    };
  }, [app.appId, app.sourceCode, app.updatedAt, reloadNonce]);

  useLayoutEffect(() => {
    activeLoadRef.current = {
      appId: app.appId,
      capability: sandboxDocument.capability,
    };
    expectedLoadCapabilityRef.current = sandboxDocument.capability;
  }, [app.appId, sandboxDocument.capability]);

  useEffect(() => {
    async function handleMessage(event: MessageEvent) {
      if (event.source !== iframeRef.current?.contentWindow) return;
      if (!event.data || typeof event.data !== "object") return;
      const activeLoad = activeLoadRef.current;
      if (!activeLoad || event.data.appLabCapability !== activeLoad.capability) return;

      const { type, requestId, payload } = event.data;

      if (type === "APP_LAB_UNLOADING") {
        revokeActiveLoad(activeLoad.capability);
        return;
      }

      if (type === "APP_LAB_CONSOLE") {
        const entry = toConsoleEntry(payload);
        if (entry) onConsoleEntry(entry);
        return;
      }

      if (type === "GET_MY_DATA") {
        const data = await getAppData(activeLoad.appId);
        if (!isActiveLoad(activeLoad)) return;
        postToApp({
          type: "MY_DATA",
          requestId,
          payload: { data },
        });
        return;
      }

      if (type === "SAVE_MY_DATA") {
        try {
          await saveAppData(activeLoad.appId, payload?.data ?? null);
          if (!isActiveLoad(activeLoad)) return;
          postToApp({
            type: "MY_DATA_SAVED",
            requestId,
            payload: { ok: true },
          });
        } catch (error) {
          if (!isActiveLoad(activeLoad)) return;
          postToApp({
            type: "MY_DATA_SAVE_FAILED",
            requestId,
            payload: { ok: false, error: error instanceof Error ? error.message : "Could not save app data." },
          });
        }
      }
    }

    function isActiveLoad(load: ActiveSandboxLoad): boolean {
      const activeLoad = activeLoadRef.current;
      return activeLoad?.appId === load.appId && activeLoad.capability === load.capability;
    }

    function revokeActiveLoad(capability: string) {
      if (activeLoadRef.current?.capability === capability) {
        activeLoadRef.current = null;
      }
      if (expectedLoadCapabilityRef.current === capability) {
        expectedLoadCapabilityRef.current = null;
      }
    }

    function postToApp(message: unknown) {
      iframeRef.current?.contentWindow?.postMessage(message, "*");
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [getAppData, onConsoleEntry, saveAppData]);

  function handleFrameLoad() {
    if (expectedLoadCapabilityRef.current === sandboxDocument.capability) {
      expectedLoadCapabilityRef.current = null;
      return;
    }

    activeLoadRef.current = null;
    expectedLoadCapabilityRef.current = null;
    setReloadNonce((nonce) => nonce + 1);
  }

  return (
    <iframe
      ref={iframeRef}
      className="block h-[calc(100dvh-44px-44px)] w-full border-0 bg-app-surface lg:h-[calc(100dvh-44px)]"
      title={`${app.name} app`}
      sandbox="allow-scripts"
      referrerPolicy="no-referrer"
      onLoad={handleFrameLoad}
      srcDoc={sandboxDocument.html}
    />
  );
}

function toConsoleEntry(payload: unknown): SandboxConsoleEntry | null {
  if (!payload || typeof payload !== "object") return null;
  const candidate = payload as { args?: unknown; level?: unknown; timestamp?: unknown };
  const level = typeof candidate.level === "string" && isConsoleLevel(candidate.level) ? candidate.level : "log";
  const args = Array.isArray(candidate.args) ? candidate.args.map((arg) => String(arg)).slice(0, 20) : [];
  const timestamp = typeof candidate.timestamp === "string" ? candidate.timestamp : new Date().toISOString();

  return {
    id: crypto.randomUUID(),
    level,
    args,
    timestamp,
  };
}

function isConsoleLevel(level: string): level is SandboxConsoleEntry["level"] {
  return level === "debug" || level === "error" || level === "info" || level === "log" || level === "warn";
}
