import React from "react";
import { BookOpen, CheckCheck, NotebookPen, Sprout, Utensils, WalletCards } from "lucide-react";
import type { AppKind } from "../sampleApps";

const ICONS = { board: NotebookPen, habits: CheckCheck, recipes: Utensils, books: BookOpen, budget: WalletCards, plants: Sprout };

export function AppIcon({ kind }: { kind: AppKind }) {
  const Icon = ICONS[kind];
  return <span className={`launcher-app-icon launcher-app-icon--${kind}`} aria-hidden="true"><Icon size={36} strokeWidth={1.5} /></span>;
}
