import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ChevronRight, Cloud, SlidersHorizontal, Sparkles } from "lucide-react";
import { IconButton, Switch } from "../components/controls";
import { AppearanceControl, type ThemePreference } from "../theme/appearance";

const SECTIONS = [
  { id: "general", label: "General", icon: SlidersHorizontal },
  { id: "storage", label: "Storage", icon: Cloud },
  { id: "ai", label: "AI", icon: Sparkles },
] as const;
type Section = typeof SECTIONS[number]["id"];

export function SettingsScreen({ preference, onPreferenceChange, motion, onMotionChange, onBack, renderSection, initialSection, returnToApp = false }: {
  preference: ThemePreference;
  onPreferenceChange: (preference: ThemePreference) => void;
  motion: boolean;
  onMotionChange: (motion: boolean) => void;
  onBack: () => void;
  initialSection?: Section;
  returnToApp?: boolean;
  renderSection: (section: "ai" | "storage") => ReactNode;
}) {
  const [section, setSection] = useState<Section | null>(initialSection ?? null);
  const heading = useRef<HTMLHeadingElement>(null);
  const menu = useRef<HTMLElement>(null);
  const previousSection = useRef<Section | null>(null);
  const [desktop, setDesktop] = useState(() => window.matchMedia("(min-width: 1024px)").matches);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const changed = () => setDesktop(media.matches);
    media.addEventListener("change", changed);
    return () => media.removeEventListener("change", changed);
  }, []);
  useEffect(() => {
    if (desktop) return;
    if (section) heading.current?.focus({ preventScroll: true });
    else if (previousSection.current) menu.current?.querySelector<HTMLButtonElement>(`[data-section="${previousSection.current}"]`)?.focus();
  }, [section, desktop]);
  const activeSection = section ?? (desktop ? "general" : null);
  const activeTitle = SECTIONS.find((item) => item.id === activeSection)?.label;
  const inSubmenu = !desktop && section !== null;

  return <div className="settings-screen">
    <header className="settings-page-header"><IconButton label={returnToApp ? "Back to app" : inSubmenu ? "Back to settings" : "Back to workspace"} onClick={() => inSubmenu && !returnToApp ? setSection(null) : onBack()}><ArrowLeft size={21} /></IconButton><h1 ref={heading} tabIndex={-1}>{inSubmenu ? activeTitle : "Settings"}</h1></header>
    <main className="settings-page-content">
      {(desktop || !activeSection) && <nav ref={menu} className="settings-menu" aria-label="Settings sections">
        {SECTIONS.map(({ id, label, icon: Icon }) => <button key={id} type="button" data-section={id} aria-current={activeSection === id ? "page" : undefined} onClick={() => { previousSection.current = id; setSection(id); }}>
          <Icon size={20} /><span>{label}</span><ChevronRight className="settings-menu-chevron" size={18} />
        </button>)}
      </nav>}
      {activeSection && <div className="settings-section-content" key={activeSection}>
        {desktop && <h2>{activeTitle}</h2>}
        {activeSection === "general" && <section className="preference-section"><h3>Appearance</h3><AppearanceControl value={preference} onChange={onPreferenceChange} /><Switch label="AI animation" checked={motion} onChange={onMotionChange} /></section>}
        {activeSection !== "general" && renderSection(activeSection)}

      </div>}
    </main>
  </div>;
}
