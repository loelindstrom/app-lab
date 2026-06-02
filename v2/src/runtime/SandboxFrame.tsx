import { useEffect, useMemo, useRef } from "react";
import type { AppRecord, JsonValue } from "../core/types";
import { prepareSandboxDocument } from "./sandboxDocument";

interface SandboxFrameProps {
  app: AppRecord;
  getAppData: (appId: string) => Promise<JsonValue>;
  saveAppData: (appId: string, data: JsonValue) => Promise<void>;
}

export function SandboxFrame({ app, getAppData, saveAppData }: SandboxFrameProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const srcDoc = useMemo(() => {
    const capability = crypto.randomUUID();
    return {
      capability,
      html: prepareSandboxDocument(app.sourceCode, capability),
    };
  }, [app.appId, app.sourceCode]);

  useEffect(() => {
    async function handleMessage(event: MessageEvent) {
      if (event.source !== iframeRef.current?.contentWindow) return;
      if (!event.data || typeof event.data !== "object") return;
      if (event.data.appLabCapability !== srcDoc.capability) return;

      const { type, requestId, payload } = event.data;

      if (type === "GET_MY_DATA") {
        postToApp({
          type: "MY_DATA",
          requestId,
          payload: { data: await getAppData(app.appId) },
        });
        return;
      }

      if (type === "SAVE_MY_DATA") {
        try {
          await saveAppData(app.appId, payload?.data ?? null);
          postToApp({
            type: "MY_DATA_SAVED",
            requestId,
            payload: { ok: true },
          });
        } catch (error) {
          postToApp({
            type: "MY_DATA_SAVE_FAILED",
            requestId,
            payload: { ok: false, error: error instanceof Error ? error.message : "Could not save app data." },
          });
        }
      }
    }

    function postToApp(message: unknown) {
      iframeRef.current?.contentWindow?.postMessage(message, "*");
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [app.appId, getAppData, saveAppData, srcDoc.capability]);

  return (
    <iframe
      ref={iframeRef}
      className="block h-[calc(100dvh-44px-44px)] w-full border-0 bg-app-surface lg:h-[calc(100dvh-44px)]"
      title={`${app.name} app`}
      sandbox="allow-scripts"
      referrerPolicy="no-referrer"
      srcDoc={srcDoc.html}
    />
  );
}
