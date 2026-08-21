export interface BuilderSourceValidationFailure {
  code: "INCOMPLETE_HTML" | "UNSUPPORTED_FORM";
  message: string;
  success: false;
}

export function validateBuilderSource(sourceCode: string): BuilderSourceValidationFailure | null {
  const start = sourceCode.trimStart().toLowerCase();
  if (!/^<!doctype\s+html(?:\s[^>]*)?>/.test(start) && !/^<html(?:\s|>)/.test(start)) {
    return {
      code: "INCOMPLETE_HTML",
      message: "Return one complete HTML document starting with <!doctype html> or <html>.",
      success: false,
    };
  }

  const document = new DOMParser().parseFromString(sourceCode, "text/html");
  if (document.querySelector("form, button[type='submit'], input[type='submit']")) {
    return {
      code: "UNSUPPORTED_FORM",
      message: "Generated apps must use buttons with explicit click handlers instead of forms or submit controls.",
      success: false,
    };
  }

  return null;
}
