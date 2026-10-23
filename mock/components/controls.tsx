import React, { forwardRef, useEffect, useId, useRef, useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Info, Sparkles, type LucideIcon } from "lucide-react";

export function Button({ variant = "primary", className = "", ...props }:
  ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "quiet" }) {
  return <button type="button" className={`button button--${variant} ${className}`} {...props} />;
}

export const IconButton = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  selected?: boolean;
}>(function IconButton({ label, selected, className = "", ...props }, ref) {
  return <button ref={ref} type="button" aria-label={label} title={label}
    className={`icon-button ${selected ? "is-selected" : ""} ${className}`} {...props} />;
});

export interface Attention {
  count: number;
  kind: "error" | "reply";
}

export function AttentionBadge({ count, kind }: Attention) {
  if (!count) return null;
  return <span className={`attention-dot attention-dot--${kind}`} aria-hidden="true" />;
}

export function HelpTip({ label, children }: { label: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const container = useRef<HTMLSpanElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function dismissOutside(event: PointerEvent) {
      if (event.target instanceof Node && !container.current?.contains(event.target)) setOpen(false);
    }
    function dismissOnEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      event.preventDefault();
      event.stopPropagation();
      setOpen(false);
      trigger.current?.focus();
    }
    document.addEventListener("pointerdown", dismissOutside, true);
    document.addEventListener("keydown", dismissOnEscape, true);
    return () => {
      document.removeEventListener("pointerdown", dismissOutside, true);
      document.removeEventListener("keydown", dismissOnEscape, true);
    };
  }, [open]);

  return (
    <span className="help-tip" ref={container}>
      <IconButton ref={trigger} className="help-trigger" label={label} aria-expanded={open}
        aria-controls={id} aria-describedby={open ? id : undefined} onClick={() => setOpen((value) => !value)}>
        <Info size={15} />
      </IconButton>
      {open && <span className="help-popover" id={id} role="tooltip">{children}</span>}
    </span>
  );
}

export function Tabs<T extends string>({ label, value, onChange, items, idPrefix, variant = "segmented" }: {
  label: string;
  value: T;
  onChange: (value: T) => void;
  items: readonly { value: T; label: string; icon: LucideIcon; attention?: Attention }[];
  idPrefix: string;
  variant?: "segmented" | "underline";
}) {
  return (
    <div className={`tabs ${variant === "underline" ? "tabs--underline" : ""}`} role="tablist" aria-label={label} onKeyDown={(event) => {
      if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const index = items.findIndex((item) => item.value === value);
      const nextIndex = event.key === "Home" ? 0 : event.key === "End" ? items.length - 1
        : (index + (event.key === "ArrowRight" ? 1 : -1) + items.length) % items.length;
      onChange(items[nextIndex].value);
      event.currentTarget.querySelectorAll<HTMLButtonElement>("[role=tab]")[nextIndex].focus();
    }}>
      {items.map(({ value: itemValue, label: itemLabel, icon: Icon, attention }) => (
        <button type="button" key={itemValue} role="tab" id={`${idPrefix}-tab-${itemValue}`}
          aria-controls={`${idPrefix}-panel-${itemValue}`} aria-selected={value === itemValue}
          aria-label={itemLabel} aria-describedby={attention?.count ? `${idPrefix}-attention-${itemValue}` : undefined}
          tabIndex={value === itemValue ? 0 : -1} onClick={() => onChange(itemValue)}>
          <Icon size={16} />{itemLabel}
          {attention && <AttentionBadge {...attention} />}
          {!!attention?.count && <span className="sr-only" id={`${idPrefix}-attention-${itemValue}`}>
            {attention.count} unread {attention.kind === "error" ? (attention.count === 1 ? "error" : "errors") : (attention.count === 1 ? "reply" : "replies")}
          </span>}
        </button>
      ))}
    </div>
  );
}

export function Switch({ label, detail, checked, onChange }: {
  label: string;
  detail?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  const id = useId();
  return (
    <label className="setting-row" htmlFor={id}>
      <span><span className="setting-label">{label}</span>{detail && <span className="setting-detail">{detail}</span>}</span>
      <input id={id} className="switch-input" type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
      <span className="switch-track" aria-hidden="true"><span /></span>
    </label>
  );
}

export function Activity({ active = true }: { active?: boolean }) {
  return <span className={`ai-mark ${active ? "ai-mark--active" : ""}`} aria-hidden="true"><Sparkles size={18} /></span>;
}

export function Section({ number, title, children }: { number: string; title: string; children: ReactNode }) {
  return <section className="study-section"><div className="section-label"><span>{number}</span><h2>{title}</h2></div>{children}</section>;
}
