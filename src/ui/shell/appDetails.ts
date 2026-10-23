export interface AppDetailsInput {
  name: string;
  themeColor: string | null;
}

export function updateAppSourceDetails(source: string, input: AppDetailsInput): string {
  const name = input.name.trim();
  if (!name) throw new Error("Enter an app name.");
  if (input.themeColor !== null && !/^#[0-9a-f]{6}$/i.test(input.themeColor)) throw new Error("Choose a valid icon color.");
  const document = new DOMParser().parseFromString(source, "text/html");
  document.title = name;
  for (const meta of document.querySelectorAll("meta")) {
    if (meta.getAttribute("name")?.toLowerCase() === "theme-color") meta.remove();
  }
  if (input.themeColor) {
    const meta = document.createElement("meta");
    meta.name = "theme-color";
    meta.content = input.themeColor.toLowerCase();
    document.head.append(meta);
  }
  // Keep presentation metadata in the source so existing copy and source-sync flows carry it.
  return `<!doctype html>\n${document.documentElement.outerHTML}`;
}
