import React from "react";
import { CircleAlert, Info, Terminal, TriangleAlert } from "lucide-react";

export interface ConsoleEntry {
  id: string;
  level: "debug" | "error" | "info" | "log" | "warn";
  args: string[];
  timestamp: string;
}

function time(timestamp: string) {
  return new Date(timestamp).toLocaleTimeString([], { hour12: false });
}

export function formatConsoleEntries(entries: ConsoleEntry[]) {
  return entries.map((entry) => `[${time(entry.timestamp)}] ${entry.level.toUpperCase()} ${entry.args.join(" ")}`).join("\n\n");
}

export function ConsoleView({ entries }: { entries: ConsoleEntry[] }) {
  return <>
    <div className="console-heading"><Terminal size={17} /><h3>App console</h3><span>iframe</span></div>
    {entries.length ? <ol className="console-entries" role="log" aria-label="App iframe console" aria-live="polite">
      {entries.map((entry) => <li className="console-entry" key={entry.id} data-level={entry.level}>
        <div className="console-entry-meta">
          {entry.level === "error" ? <CircleAlert size={14} /> : entry.level === "warn" ? <TriangleAlert size={14} /> : <Info size={14} />}
          <span>{entry.level.toUpperCase()}</span><time dateTime={entry.timestamp}>{time(entry.timestamp)}</time>
        </div>
        <pre>{entry.args.join(" ")}</pre>
      </li>)}
    </ol> : <p className="console-empty">No console output.</p>}
  </>;
}
