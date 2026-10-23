import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { FlaskConical } from "lucide-react";
import indexHtml from "../index.html?raw";
import nextHtml from "../next/index.html?raw";
import galleryHtml from "../gallery/index.html?raw";
import favicon from "../public/favicon.svg?raw";

describe("host CSP", () => {
  it("keeps the parallel shell's host security policy identical", () => {
    const policy = (html: string) => new DOMParser().parseFromString(html, "text/html")
      .querySelector('meta[http-equiv="Content-Security-Policy"]')?.getAttribute("content");
    expect(policy(nextHtml)).toBeTruthy();
    expect(policy(nextHtml)).toBe(policy(indexHtml));
    expect(policy(galleryHtml)).toBe(policy(indexHtml));
  });

  it("uses the launcher flask as the favicon in every entry point", () => {
    for (const html of [indexHtml, nextHtml, galleryHtml]) {
      const doc = new DOMParser().parseFromString(html, "text/html");
      expect(doc.querySelector('link[rel="icon"]')?.getAttribute("href")).toBe("%BASE_URL%favicon.svg");
    }
    const paths = (markup: string) => [...new DOMParser().parseFromString(markup, "text/html").querySelectorAll("path")]
      .map((path) => path.getAttribute("d"));
    expect(paths(favicon)).toEqual(paths(renderToStaticMarkup(createElement(FlaskConical))));
  });
  it("allows Firebase Auth endpoints needed by authenticated RTDB setup", () => {
    const document = new DOMParser().parseFromString(indexHtml, "text/html");
    const csp = document.querySelector('meta[http-equiv="Content-Security-Policy"]')?.getAttribute("content") ?? "";

    expect(csp).toContain("connect-src");
    expect(csp).toContain("https://identitytoolkit.googleapis.com");
    expect(csp).toContain("https://securetoken.googleapis.com");
  });
});
