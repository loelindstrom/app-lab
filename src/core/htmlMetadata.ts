export interface AppMetadataFallbacks {
  description?: string;
  name?: string;
}

export interface AppHtmlMetadata {
  description: string;
  name: string;
  themeColor?: string;
}

export function readAppHtmlMetadata(sourceCode: string, fallbacks: AppMetadataFallbacks = {}): AppHtmlMetadata {
  const document = new DOMParser().parseFromString(sourceCode, "text/html");
  const parsedName = document.querySelector("title")?.textContent?.trim();
  const parsedDescription = findMeta(document, "description")?.getAttribute("content")?.trim();
  const color = findMeta(document, "theme-color")?.getAttribute("content")?.trim();
  const themeColor = color && /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i.test(color)
    ? (color.length === 4 ? `#${[...color.slice(1)].map((digit) => digit.repeat(2)).join("")}` : color).toLowerCase()
    : undefined;

  return {
    name: parsedName || fallbacks.name?.trim() || "Untitled App",
    description: parsedDescription ?? fallbacks.description?.trim() ?? "",
    themeColor,
  };
}

function findMeta(document: Document, name: string): HTMLMetaElement | null {
  for (const meta of document.querySelectorAll("meta")) {
    if (meta.getAttribute("name")?.toLowerCase() === name) return meta;
  }
  return null;
}
