import type { ReactNode } from "react";

export function SettingsActionBar({ children, status }: { children: ReactNode; status?: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-app-line bg-white/95 shadow-[0_-8px_24px_rgba(15,23,42,0.06)] backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-end gap-3 px-4 py-3 md:pl-[228px]">
        {status && status !== "Ready" ? (
          <span className="mr-auto min-w-0 flex-1 text-xs font-normal text-app-muted" aria-live="polite">
            {status}
          </span>
        ) : null}
        <div className="flex flex-wrap justify-end gap-2">{children}</div>
      </div>
    </div>
  );
}

export function SettingsSnackbar({ message }: { message: string | null }) {
  if (!message) return null;

  return (
    <div
      className="fixed bottom-20 left-1/2 z-50 max-w-[calc(100vw-2rem)] -translate-x-1/2 rounded-md bg-app-ink px-4 py-2.5 text-center text-sm font-semibold text-white shadow-lg"
      role="status"
    >
      {message}
    </div>
  );
}
