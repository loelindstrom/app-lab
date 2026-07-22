import { describe, expect, it } from "vitest";
import indexHtml from "../index.html?raw";

describe("host CSP", () => {
  it("allows Firebase Auth endpoints needed by authenticated RTDB setup", () => {
    const document = new DOMParser().parseFromString(indexHtml, "text/html");
    const csp = document.querySelector('meta[http-equiv="Content-Security-Policy"]')?.getAttribute("content") ?? "";

    expect(csp).toContain("connect-src");
    expect(csp).toContain("https://identitytoolkit.googleapis.com");
    expect(csp).toContain("https://securetoken.googleapis.com");
  });
});
