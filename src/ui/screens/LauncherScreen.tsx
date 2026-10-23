import { useState } from "react";
import { FlaskConical, MoreHorizontal, Plus, Search, Settings, Users, X } from "lucide-react";
import { AppIcon } from "../components/AppIcon";
import { AttentionBadge, Button, IconButton } from "../components/controls";
import type { ToolAttention } from "../types";
import type { LauncherApp } from "../types";

export function LauncherScreen({ apps, attention, onOpenApp, onCreateApp, onSettings, onAppOptions }: {
  apps: LauncherApp[];
  attention: Record<string, ToolAttention>;
  onOpenApp: (id: string) => void;
  onCreateApp: () => void;
  onSettings: () => void;
  onAppOptions: (app: LauncherApp) => void;
}) {
  const [query, setQuery] = useState("");
  const filtered = apps.filter((app) => app.name.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base", numeric: true }));

  return <div className="launcher-screen">
    <header className="launcher-header">
      <div className="launcher-header-inner">
      <div className="launcher-brand"><FlaskConical size={23} strokeWidth={1.7} /><span>App Lab</span></div>
      <IconButton className="launcher-settings" label="Settings" onClick={onSettings}><Settings size={21} /></IconButton>
      </div>
      <div className="launcher-search-bar">
      <div className="launcher-search"><Search size={18} aria-hidden="true" /><input aria-label="Search apps" type="search" placeholder="Search apps" value={query} onChange={(event) => setQuery(event.target.value)} />
        {query && <IconButton label="Clear search" onClick={() => setQuery("")}><X size={17} /></IconButton>}
      </div>
      </div>
    </header>
    <main className="launcher-main">
      <h1 className="sr-only">Apps</h1>
      {filtered.length ? <ul className="launcher-grid" aria-label="Apps">
        {filtered.map((app) => {
          const unread = attention[app.id];
          const count = unread?.logErrors || unread?.aiReplies || 0;
          return <li key={app.id} className="launcher-tile">
            <button className="launcher-open" data-app-id={app.id} aria-label={`Open ${app.name}`} disabled={app.unavailable} onClick={() => onOpenApp(app.id)}>
              <span className="launcher-icon-wrap"><AppIcon kind={app.kind} name={app.name} themeColor={app.themeColor} />
                <AttentionBadge count={count} kind={unread?.logErrors ? "error" : "reply"} />
              </span>
              <span className="launcher-app-name">{app.name}</span>
              <span className="launcher-app-detail">{app.relationship ? <><Users size={12} />{app.relationship}</> : ""}</span>
              {!!count && <span className="sr-only">{unread?.logErrors ? "Unread log error" : "Unread AI reply"}</span>}
            </button>
            <IconButton className="launcher-options" label={`Options for ${app.name}`} onClick={() => onAppOptions(app)}><MoreHorizontal size={18} /></IconButton>
          </li>;
        })}
      </ul> : <div className="launcher-empty">{apps.length ? <><Search size={25} /><h2>No apps found</h2><Button variant="quiet" onClick={() => setQuery("")}>Clear search</Button></>
        : <p>Press "+" to create your first app</p>}</div>}
    </main>
    <IconButton className="launcher-fab" label="New app" onClick={onCreateApp}><Plus size={27} strokeWidth={1.8} /></IconButton>
  </div>;
}
