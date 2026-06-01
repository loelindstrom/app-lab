interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsDialog({ isOpen, onClose }: SettingsDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-30 grid items-center bg-app-ink/40 p-4" role="presentation">
      <section
        className="w-full max-w-xl justify-self-center overflow-hidden rounded-lg border border-app-line bg-app-surface/95 shadow-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
      >
        <header className="flex items-center justify-between gap-4 border-b border-app-line p-4">
          <div>
            <p className="mb-1 text-xs font-extrabold uppercase text-app-muted">Settings</p>
            <h2 className="text-xl font-extrabold leading-tight" id="settings-title">
              OpenRouter
            </h2>
          </div>
          <button className="min-h-9 rounded-md border border-app-accent bg-app-accent px-4 font-bold text-white hover:bg-app-strong" type="button" onClick={onClose}>
            Close
          </button>
        </header>
        <form className="grid gap-4 border-t border-app-line p-4">
          <label className="grid gap-2 text-sm font-extrabold text-app-muted">
            API key
            <input className="rounded-md border border-app-line px-3 py-2 text-app-ink" type="password" autoComplete="off" placeholder="Stored by the future core config service" />
          </label>
          <label className="grid gap-2 text-sm font-extrabold text-app-muted">
            Model id
            <input className="rounded-md border border-app-line px-3 py-2 text-app-ink" type="text" placeholder="inclusionai/ling-2.6-flash" />
          </label>
          <button className="min-h-9 justify-self-end rounded-md border border-app-accent bg-app-accent px-4 font-bold text-white hover:bg-app-strong" type="button">
            Save later
          </button>
        </form>
      </section>
    </div>
  );
}
