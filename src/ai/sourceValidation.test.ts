import { describe, expect, it } from "vitest";
import { validateBuilderSource } from "./sourceValidation";

describe("BuilderAI source validation", () => {
  it("accepts a complete document with explicit buttons", () => {
    expect(
      validateBuilderSource('<!doctype html><html><body><button type="button">Save</button></body></html>'),
    ).toBeNull();
  });

  it("rejects partial markup", () => {
    expect(validateBuilderSource("<main>Only a fragment</main>")).toMatchObject({
      code: "INCOMPLETE_HTML",
      success: false,
    });
  });

  it("rejects forms and submit controls", () => {
    expect(validateBuilderSource("<!doctype html><html><body><form></form></body></html>")).toMatchObject({
      code: "UNSUPPORTED_FORM",
      success: false,
    });
    expect(
      validateBuilderSource('<!doctype html><html><body><button type="submit">Save</button></body></html>'),
    ).toMatchObject({
      code: "UNSUPPORTED_FORM",
      success: false,
    });
  });
});
