import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useState } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { BuilderProfile, BuilderProfileInput, UpdateBuilderProfileInput } from "../../ai";
import { BuilderProfilesSettings } from "./BuilderProfilesSettings";

const BUILT_INS: BuilderProfile[] = [
  {
    builtIn: true,
    name: "Opinionated",
    profileId: "builtin-opinionated-v1",
    promptTemplate: "Opinionated prompt",
    starterSource: "<!doctype html><title>Opinionated</title>",
  },
  {
    builtIn: true,
    name: "Minimal",
    profileId: "builtin-minimal-v1",
    promptTemplate: "Minimal prompt",
    starterSource: "<!doctype html><title>Minimal</title>",
  },
];

describe("BuilderProfilesSettings", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("shows locked built-ins and lets a duplicated profile be edited", async () => {
    const createProfile = vi.fn(async (input: BuilderProfileInput): Promise<BuilderProfile> => ({
      ...input,
      builtIn: false,
      profileId: "custom-1",
    }));
    const updateProfile = vi.fn(async (input: UpdateBuilderProfileInput): Promise<BuilderProfile> => ({
      ...input,
      builtIn: false,
    }));
    const deleteProfile = vi.fn().mockResolvedValue(undefined);
    const selectProfile = vi.fn().mockResolvedValue(undefined);

    function Harness() {
      const [profiles, setProfiles] = useState(BUILT_INS);
      return (
        <BuilderProfilesSettings
          activeProfileId="builtin-opinionated-v1"
          profiles={profiles}
          onCreate={async (input) => {
            const created = await createProfile(input);
            setProfiles((current) => [...current, created]);
            return created;
          }}
          onDelete={async (profileId) => {
            await deleteProfile(profileId);
            setProfiles((current) => current.filter((profile) => profile.profileId !== profileId));
          }}
          onSelect={selectProfile}
          onUpdate={async (input) => {
            const updated = await updateProfile(input);
            setProfiles((current) => current.map((profile) => (profile.profileId === updated.profileId ? updated : profile)));
            return updated;
          }}
        />
      );
    }

    render(<Harness />);

    expect(screen.getByLabelText("Profile name")).toHaveProperty("readOnly", true);
    expect(readControlValue("Profile name")).toBe("Opinionated");
    expect(screen.getByLabelText("Builder instructions")).toHaveProperty("readOnly", true);
    expect(readControlValue("Builder instructions")).toBe("Opinionated prompt");
    expect(screen.queryByLabelText("Conversation memory")).toBeNull();
    expect(screen.getByRole("option", { name: "Opinionated (Built-in)" })).toBeTruthy();
    expect(screen.getByRole("option", { name: "Minimal (Built-in)" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "New" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Delete" })).toHaveProperty("disabled", true);

    fireEvent.click(screen.getByRole("button", { name: "Duplicate" }));
    await waitFor(() => expect(readControlValue("Profile name")).toBe("Opinionated copy"));
    expect(createProfile).toHaveBeenCalledWith(expect.objectContaining({ name: "Opinionated copy" }));
    expect(selectProfile).toHaveBeenCalledWith("custom-1");
    expect(screen.getByLabelText("Profile name")).toHaveProperty("readOnly", false);
    expect(screen.getByRole("button", { name: "Delete" })).toHaveProperty("disabled", false);

    fireEvent.change(screen.getByLabelText("Profile name"), { target: { value: "My Builder" } });
    fireEvent.click(screen.getByRole("button", { name: "Save profile" }));

    await waitFor(() =>
      expect(updateProfile).toHaveBeenCalledWith(
        expect.objectContaining({ name: "My Builder", profileId: "custom-1" }),
      ),
    );
  });
});

function readControlValue(label: string): string {
  const control = screen.getByLabelText(label);
  if (!(control instanceof HTMLInputElement || control instanceof HTMLTextAreaElement)) {
    throw new Error(`Expected an input or textarea for ${label}.`);
  }
  return control.value;
}
