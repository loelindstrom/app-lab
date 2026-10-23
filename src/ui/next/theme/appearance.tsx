import { useEffect, useId, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";

export type ThemePreference = "system" | "light" | "dark";

export function useAppearance({ persist = true }: { persist?: boolean } = {}) {
  const [preference, setPreference] = useState<ThemePreference>(() => {
    try {
      const saved = persist ? localStorage.getItem("app-lab-next-appearance") : null;
      return saved === "light" || saved === "dark" ? saved : "system";
    } catch { return "system"; }
  });

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    function apply() {
      document.documentElement.dataset.theme = preference === "system" ? (media.matches ? "dark" : "light") : preference;
    }
    apply();
    try { if (persist) localStorage.setItem("app-lab-next-appearance", preference); } catch { /* System appearance still works without storage. */ }
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, [persist, preference]);

  return { preference, setPreference };
}

export function AppearanceControl({ value, onChange, compact = false }: {
  value: ThemePreference;
  onChange: (value: ThemePreference) => void;
  compact?: boolean;
}) {
  const name = useId();
  return <fieldset className={`appearance-control ${compact ? "appearance-control--compact" : ""}`}>
    <legend className="sr-only">Appearance</legend>
    {([
      { value: "system", label: "System", icon: Monitor },
      { value: "light", label: "Light", icon: Sun },
      { value: "dark", label: "Dark", icon: Moon },
    ] as const).map(({ value: choice, label, icon: Icon }) => <label key={choice} title={`${label} theme`}>
      <input type="radio" className="sr-only" name={name} value={choice} checked={value === choice} onChange={() => onChange(choice)} />
      <span><Icon size={17} /><span className={compact ? "sr-only" : undefined}>{label}</span></span>
    </label>)}
  </fieldset>;
}
