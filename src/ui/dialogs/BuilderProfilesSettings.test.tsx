import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useState } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { BuilderProfile, BuilderProfileInput, UpdateBuilderProfileInput } from "../../ai";
import { BuilderProfilesSettings } from "./BuilderProfilesSettings";

const BUILT_INS: BuilderProfile[] = [
  {
    builtIn: true,
    name: "Minimal",
    profileId: "builtin-minimal-v1",
    promptTemplate: "Minimal prompt",
    starterSource: "<!doctype html><title>Minimal</title>",
  },
  {
    builtIn: true,
    name: "Guided",
    profileId: "builtin-guided-v1",
    promptTemplate: "Guided prompt",
    starterSource: "<!doctype html><title>Guided</title>",
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
          activeProfileId="builtin-minimal-v1"
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

    expect(screen.queryByLabelText("Name")).toBeNull();
    expect(screen.getByLabelText("Builder instructions")).toHaveProperty("readOnly", true);
    expect(readControlValue("Builder instructions")).toBe("Minimal prompt");
    expect(screen.queryByLabelText("Conversation memory")).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Duplicate" }));
    await waitFor(() => expect(readControlValue("Name")).toBe("Minimal copy"));
    expect(createProfile).toHaveBeenCalledWith(expect.objectContaining({ name: "Minimal copy" }));
    expect(selectProfile).toHaveBeenCalledWith("custom-1");
    expect(screen.getByLabelText("Name")).toHaveProperty("readOnly", false);

    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "My Builder" } });
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
