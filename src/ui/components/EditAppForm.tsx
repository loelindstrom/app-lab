import { useState, type CSSProperties } from "react";
import { Check, RotateCcw } from "lucide-react";
import type { AppDetailsInput } from "../shell/appDetails";
import type { LauncherApp } from "../types";
import { AppIcon } from "./AppIcon";
import { Button, IconButton } from "./controls";

const COLORS = [
  { name: "Teal", color: "#167d70" }, { name: "Violet", color: "#8062a6" },
  { name: "Rose", color: "#b45c76" }, { name: "Gold", color: "#9c7b2d" },
  { name: "Blue", color: "#507ca6" }, { name: "Green", color: "#648344" },
];

export function EditAppForm({ app, busy, onSave }: { app: LauncherApp; busy: boolean; onSave: (input: AppDetailsInput) => void }) {
  const [name, setName] = useState(app.name);
  const [themeColor, setThemeColor] = useState(app.themeColor ?? null);
  return <form onSubmit={(event) => { event.preventDefault(); onSave({ name, themeColor }); }}>
    <div className="app-details-name">
      <AppIcon kind={app.kind} name={name} themeColor={themeColor} />
      <div className="field-group"><label htmlFor="edit-app-name">App name</label>
        <input className="text-field" id="edit-app-name" value={name} onChange={(event) => setName(event.target.value)} maxLength={120} required disabled={busy} />
      </div>
    </div>
    <fieldset className="app-color-picker" disabled={busy}>
      <legend>Icon color</legend>
      <div className="app-color-choices">
        <IconButton label="Automatic color" selected={themeColor === null} aria-pressed={themeColor === null} onClick={() => setThemeColor(null)}><RotateCcw size={18} /></IconButton>
        {COLORS.map(({ name, color }) => <IconButton key={color} label={name} className="app-color-choice" aria-pressed={themeColor === color}
          style={{ "--swatch": color } as CSSProperties} onClick={() => setThemeColor(color)}>
          <span>{themeColor === color && <Check size={17} />}</span>
        </IconButton>)}
      </div>
    </fieldset>
    <Button type="submit" className="sheet-form-submit" disabled={busy || !name.trim()}><Check size={18} />{busy ? "Saving..." : "Save changes"}</Button>
  </form>;
}
