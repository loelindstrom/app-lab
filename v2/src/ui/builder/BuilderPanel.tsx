interface BuilderPanelProps {
  activeAppName: string;
  isOpen: boolean;
  onClose: () => void;
}

export function BuilderPanel({ activeAppName, isOpen, onClose }: BuilderPanelProps) {
  return (
    <aside
      className={`fixed bottom-0 right-0 z-20 grid h-[min(76svh,620px)] w-full grid-rows-[auto_minmax(0,1fr)_auto] border-t border-app-line bg-app-surface/95 shadow-panel transition-transform duration-200 lg:top-0 lg:h-auto lg:w-[min(420px,36vw)] lg:border-l lg:border-t-0 ${
        isOpen ? "translate-y-0 lg:translate-x-0" : "translate-y-full lg:translate-x-full lg:translate-y-0"
      }`}
      aria-label="BuilderAI"
      aria-hidden={!isOpen}
    >
      <header className="flex items-center justify-between gap-4 border-b border-app-line p-4">
        <div>
          <p className="mb-1 text-xs font-extrabold uppercase text-app-muted">BuilderAI</p>
          <h2 className="text-xl font-extrabold leading-tight">{activeAppName}</h2>
        </div>
        <button
          className="min-h-9 w-9 rounded-full border border-transparent bg-transparent p-0 text-2xl text-app-accent hover:bg-app-accent/10"
          type="button"
          aria-label="Close BuilderAI"
          onClick={onClose}
        >
          ×
        </button>
      </header>

      <ol className="flex flex-col gap-3 overflow-auto p-4" aria-live="polite">
        <li className="rounded-lg border border-app-line bg-app-accent/10 px-3 py-2 leading-relaxed text-app-muted">
          BuilderAI is a placeholder in this first v2 slice. The next step is moving the PoC agent loop into core.
        </li>
      </ol>

      <form className="grid gap-3 border-t border-app-line p-4">
        <label className="grid gap-2 text-xs font-extrabold uppercase text-app-muted" htmlFor="builder-message">
          Message
        </label>
        <textarea
          className="min-h-24 resize-y rounded-md border border-app-line px-3 py-2 text-app-ink"
          id="builder-message"
          rows={4}
          placeholder="What should change in this app?"
        />
        <button className="min-h-9 rounded-md border border-app-accent bg-app-accent px-4 font-bold text-white hover:bg-app-strong" type="button">
          Send
        </button>
      </form>
    </aside>
  );
}
