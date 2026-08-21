import { JSDOM } from "jsdom";

export interface GeneratedAppAnalysis {
  buttonWithoutTypeCount: number;
  completeDocument: boolean;
  duplicateIds: string[];
  externalAssetCount: number;
  formCount: number;
  hasSavedTimesSignal: boolean;
  hasSaveTimeSignal: boolean;
  hasStartSignal: boolean;
  hasStopwatchSignal: boolean;
  hasSeparateTabSignal: boolean;
  lineCount: number;
  prohibitedBrowserStorageCount: number;
  remoteUrlCount: number;
  scopeSignals: string[];
  scriptSyntaxErrors: string[];
  sourceChars: number;
  submitControlCount: number;
  topHeaderCount: number;
  unsafeHtmlWriteCount: number;
  usesAppLabLoad: boolean;
  usesAppLabSave: boolean;
}

const SCOPE_PATTERNS: Array<[string, RegExp]> = [
  ["categories", /categor(?:y|ies)/i],
  ["deletion", /\bdelete\b|clear all/i],
  ["editing", /\bedit\b|editing/i],
  ["filters", /filter/i],
  ["laps", /\blaps?\b/i],
  ["notes", /notes?/i],
  ["search", /search/i],
  ["sorting", /sort by|newest|oldest/i],
  ["statistics", /statistics|\bstats\b|average (?:session|time)|best time|total (?:count|runs|logged)/i],
];

export function analyzeGeneratedApp(sourceCode: string): GeneratedAppAnalysis {
  const dom = new JSDOM(sourceCode);
  const document = dom.window.document;
  const ids = Array.from(document.querySelectorAll("[id]"), (element) => element.id).filter(Boolean);
  const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
  const scriptSyntaxErrors = Array.from(document.querySelectorAll("script:not([src])"), (script, index) => {
    try {
      Function(script.textContent ?? "");
      return null;
    } catch (error) {
      return `Inline script ${index + 1}: ${error instanceof Error ? error.message : String(error)}`;
    }
  }).filter((value): value is string => Boolean(value));
  const normalizedText = readVisibleText(dom);

  return {
    buttonWithoutTypeCount: document.querySelectorAll("button:not([type])").length,
    completeDocument: /^\s*(?:<!doctype\s+html(?:\s[^>]*)?>|<html(?:\s|>))/i.test(sourceCode),
    duplicateIds,
    externalAssetCount: document.querySelectorAll("script[src], link[rel='stylesheet'][href], img[src^='http']").length,
    formCount: document.querySelectorAll("form").length,
    hasSavedTimesSignal: /(?:saved|finished)\s+(?:times?|sessions?|history)/i.test(normalizedText),
    hasSaveTimeSignal: /save\s+(?:time|session)|finish\s*(?:&|and)\s*save/i.test(normalizedText),
    hasStartSignal: /\bstart\b/i.test(normalizedText) || /['"`]Start['"`]/i.test(sourceCode),
    hasStopwatchSignal: /stopwatch|\b00:00/i.test(normalizedText),
    hasSeparateTabSignal: /tab/i.test(sourceCode) && /(?:saved|finished)\s+(?:times?|sessions?|history)/i.test(sourceCode),
    lineCount: sourceCode.split("\n").length,
    prohibitedBrowserStorageCount: countMatches(sourceCode, /\b(?:localStorage|sessionStorage|indexedDB)\b/g),
    remoteUrlCount: countMatches(sourceCode, /https?:\/\//g),
    scopeSignals: SCOPE_PATTERNS.filter(([, pattern]) => pattern.test(normalizedText)).map(([name]) => name),
    scriptSyntaxErrors,
    sourceChars: sourceCode.length,
    submitControlCount: document.querySelectorAll("button[type='submit'], input[type='submit']").length,
    topHeaderCount: document.querySelectorAll("body header").length,
    unsafeHtmlWriteCount: countMatches(sourceCode, /\binnerHTML\b|\bx-html\b/g),
    usesAppLabLoad: sourceCode.includes("AppLab.getData"),
    usesAppLabSave: sourceCode.includes("AppLab.saveData"),
  };
}

function readVisibleText(dom: JSDOM): string {
  const walker = dom.window.document.createTreeWalker(dom.window.document.body, dom.window.NodeFilter.SHOW_TEXT);
  const parts: string[] = [];
  while (walker.nextNode()) {
    const parent = walker.currentNode.parentElement;
    if (parent?.closest("script, style, template")) continue;
    parts.push(walker.currentNode.nodeValue ?? "");
  }
  for (const element of dom.window.document.querySelectorAll("[aria-label], [placeholder], [title]")) {
    parts.push(element.getAttribute("aria-label") ?? "", element.getAttribute("placeholder") ?? "", element.getAttribute("title") ?? "");
  }
  return parts.join(" ").replace(/\s+/g, " ");
}

function countMatches(value: string, pattern: RegExp): number {
  return value.match(pattern)?.length ?? 0;
}
