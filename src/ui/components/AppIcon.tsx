import type { CSSProperties } from "react";

const TONES = ["board", "habits", "recipes", "books", "budget", "plants"];

export function getAppInitials(name: string): string {
  return [...name.trim().split(/\s+/).slice(0, 2).map((word) => [...word][0] ?? "").join("").toLocaleUpperCase()].slice(0, 2).join("") || "?";
}

export function AppIcon({ kind, name, themeColor }: { kind: number; name: string; themeColor?: string | null }) {
  const color = themeColor && /^#[0-9a-f]{6}$/i.test(themeColor) ? themeColor : undefined;
  return <span className={`launcher-app-icon launcher-app-icon--${TONES[kind % TONES.length]}`} data-custom-color={!!color}
    style={color ? { "--app-icon-color": color } as CSSProperties : undefined} aria-hidden="true">
    <span className="launcher-app-initials">{getAppInitials(name)}</span>
  </span>;
}
