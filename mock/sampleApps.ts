export type AppKind = "board" | "habits" | "recipes" | "books" | "budget" | "plants";

export interface SampleNote {
  id: string;
  title: string;
  detail: string;
  checked: boolean;
}

export interface SampleApp {
  id: string;
  name: string;
  kind: AppKind;
  title: string;
  subtitle: string;
  source: string;
  notes: SampleNote[];
  sharedBy?: string;
}

function htmlText(text: string) {
  return text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

export function createSampleApp(name: string, kind: AppKind = "board", titles: string[] = [], sharedBy?: string): SampleApp {
  const title = name === "Weekend board" ? "For the weekend" : name;
  return {
    id: crypto.randomUUID(), name, kind, title, sharedBy,
    subtitle: kind === "board" ? "A few good plans. Nothing more." : "A little space for the things that matter.",
    source: `<!doctype html>\n<html lang="en">\n  <head>\n    <title>${htmlText(name)}</title>\n  </head>\n  <body>\n    <h1>${htmlText(title)}</h1>\n  </body>\n</html>`,
    notes: titles.map((text, index) => ({ id: crypto.randomUUID(), title: text, detail: ["Something to look forward to", "Whenever it feels right", "No rush"][index % 3], checked: false })),
  };
}

export function initialApps(): SampleApp[] {
  return [
    { ...createSampleApp("Weekend board", "board", ["Dinner at ours", "A walk, no agenda", "Sunday slow-down"]), id: "weekend" },
    createSampleApp("Little wins", "habits", ["A little movement", "Read a few pages", "Step outside"]),
    createSampleApp("Dinner club", "recipes", ["Lemon pasta", "A really good salad", "Something chocolate"], "Alex"),
    createSampleApp("Reading list", "books", ["The Creative Act", "A Psalm for the Wild-Built", "Four Thousand Weeks"]),
    createSampleApp("Trip fund", "budget", ["Train tickets", "A place to stay", "Coffee along the way"], "Sam"),
    createSampleApp("Plant care", "plants", ["Water the monstera", "Turn the little fern", "Check the windowsill"]),
  ];
}
