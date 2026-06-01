import { useMemo } from "react";
import type { AppRecord } from "../core/types";
import { prepareSandboxDocument } from "./sandboxDocument";

interface SandboxFrameProps {
  app: AppRecord;
}

export function SandboxFrame({ app }: SandboxFrameProps) {
  const srcDoc = useMemo(() => {
    const capability = crypto.randomUUID();
    return prepareSandboxDocument(app.sourceCode, capability);
  }, [app.appId, app.sourceCode]);

  return (
    <iframe
      className="block h-[calc(100dvh-44px-44px)] w-full border-0 bg-app-surface lg:h-[calc(100dvh-44px)]"
      title={`${app.name} app`}
      sandbox="allow-scripts"
      referrerPolicy="no-referrer"
      srcDoc={srcDoc}
    />
  );
}
