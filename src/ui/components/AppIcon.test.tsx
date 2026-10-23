import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { AppIcon, getAppInitials } from "./AppIcon";

afterEach(cleanup);

describe("AppIcon", () => {
  it.each([["Weekend plans", "WP"], ["Groceries", "G"], ["  My   reading list ", "MR"], ["", "?"], ["\u00c5sa \u00d6berg", "\u00c5\u00d6"]])("derives initials from %s", (name, expected) => {
    expect(getAppInitials(name)).toBe(expected);
  });

  it("only accepts hex colors for the host icon", () => {
    const { container, rerender } = render(<AppIcon kind={0} name="Dinner club" themeColor="#167d70" />);
    expect(container.textContent).toBe("DC");
    expect(container.querySelector<HTMLElement>(".launcher-app-icon")?.style.getPropertyValue("--app-icon-color")).toBe("#167d70");
    rerender(<AppIcon kind={0} name="Dinner club" themeColor="url(https://example.com/image)" />);
    expect(container.querySelector<HTMLElement>(".launcher-app-icon")?.style.getPropertyValue("--app-icon-color")).toBe("");
  });
});
