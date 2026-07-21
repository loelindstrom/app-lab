export interface AppMetadataFallbacks {
  description?: string;
  name?: string;
}

export interface AppHtmlMetadata {
  description: string;
  name: string;
}

export function readAppHtmlMetadata(sourceCode: string, fallbacks: AppMetadataFallbacks = {}): AppHtmlMetadata {
  const document = new DOMParser().parseFromString(sourceCode, "text/html");
  const parsedName = document.querySelector("title")?.textContent?.trim();
  const parsedDescription = findDescriptionMeta(document)?.getAttribute("content")?.trim();

  return {
    name: parsedName || fallbacks.name?.trim() || "Untitled App",
    description: parsedDescription ?? fallbacks.description?.trim() ?? "",
  };
}

function findDescriptionMeta(document: Document): HTMLMetaElement | null {
  for (const meta of document.querySelectorAll("meta")) {
    if (meta.getAttribute("name")?.toLowerCase() === "description") return meta;
  }
  return null;
}
