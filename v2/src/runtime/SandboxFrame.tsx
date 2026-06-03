import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { AppRecord, JsonValue } from "../core/types";
import { prepareSandboxDocument } from "./sandboxDocument";

interface SandboxFrameProps {
  app: AppRecord;
  getAppData: (appId: string) => Promise<JsonValue>;
  saveAppData: (appId: string, data: JsonValue) => Promise<void>;
}

interface ActiveSandboxLoad {
  appId: string;
  capability: string;
}

export function SandboxFrame({ app, getAppData, saveAppData }: SandboxFrameProps) {
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
  }, [app.appId, app.sourceCode, reloadNonce]);

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
  }, [getAppData, saveAppData]);

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
