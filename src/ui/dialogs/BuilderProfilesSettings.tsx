import { useEffect, useMemo, useState } from "react";
import {
  BUILDER_TOOL_SUMMARIES,
  type BuilderProfile,
  type BuilderProfileInput,
  type UpdateBuilderProfileInput,
} from "../../ai";
import { SettingsActionBar, SettingsSnackbar } from "./SettingsActions";

interface BuilderProfilesSettingsProps {
  onCreate: (input: BuilderProfileInput) => Promise<BuilderProfile>;
  onDelete: (profileId: string) => Promise<void>;
  onUpdate: (input: UpdateBuilderProfileInput) => Promise<BuilderProfile>;
  profiles: BuilderProfile[];
}

export function BuilderProfilesSettings({
  onCreate,
  onDelete,
  onUpdate,
  profiles,
}: BuilderProfilesSettingsProps) {
  const [selectedProfileId, setSelectedProfileId] = useState(profiles[0]?.profileId ?? "");
  const selectedProfile = useMemo(
    () => profiles.find((profile) => profile.profileId === selectedProfileId) ?? profiles[0] ?? null,
    [profiles, selectedProfileId],
  );
  const [draft, setDraft] = useState<BuilderProfileInput>(() => toProfileInput(selectedProfile));
  const [notice, setNotice] = useState<string | null>(null);
  const [status, setStatus] = useState("Ready");

  useEffect(() => {
    if (selectedProfile) {
      setSelectedProfileId(selectedProfile.profileId);
      setDraft(toProfileInput(selectedProfile));
    }
  }, [selectedProfile]);

  useEffect(() => {
    if (!notice) return;
    const timeoutId = window.setTimeout(() => setNotice(null), 3000);
    return () => window.clearTimeout(timeoutId);
  }, [notice]);

  async function createProfile(source: BuilderProfile | null, name: string) {
    setStatus("Creating profile...");
    try {
      const created = await onCreate({ ...toProfileInput(source), name });
      setSelectedProfileId(created.profileId);
      setDraft(toProfileInput(created));
      setStatus("Ready");
      setNotice("Profile created.");
    } catch (error) {
      setStatus("Ready");
      setNotice(error instanceof Error ? error.message : "Could not create profile.");
    }
  }

  async function saveProfile() {
    if (!selectedProfile || selectedProfile.builtIn) return;
    setStatus("Saving profile...");
    try {
      const updated = await onUpdate({ profileId: selectedProfile.profileId, ...draft });
      setDraft(toProfileInput(updated));
      setStatus("Ready");
      setNotice("Profile saved.");
    } catch (error) {
      setStatus("Ready");
      setNotice(error instanceof Error ? error.message : "Could not save profile.");
    }
  }

  async function deleteProfile() {
    if (!selectedProfile || selectedProfile.builtIn) return;
    if (!window.confirm(`Delete the Builder profile "${selectedProfile.name}"?`)) return;
    setStatus("Deleting profile...");
    try {
      await onDelete(selectedProfile.profileId);
      const fallback = profiles.find((profile) => profile.profileId !== selectedProfile.profileId) ?? null;
      setSelectedProfileId(fallback?.profileId ?? "");
      setStatus("Ready");
      setNotice("Profile deleted.");
    } catch (error) {
      setStatus("Ready");
      setNotice(error instanceof Error ? error.message : "Could not delete profile.");
    }
  }

  if (!selectedProfile) {
    return <p className="text-sm text-app-muted">No Builder profiles are available.</p>;
  }

  const isLocked = selectedProfile.builtIn;
  const fieldClassName = `w-full rounded-md border border-app-line px-3 py-2 font-normal text-app-ink outline-none focus:border-app-accent ${
    isLocked ? "bg-slate-50" : "bg-white"
  }`;

  return (
    <div className="grid max-w-3xl gap-8">
      <header className="grid gap-1">
        <h3 className="text-xl font-bold text-app-ink">Builder profiles</h3>
        <p className="text-sm text-app-muted">Choose the instructions and starter app BuilderAI can use.</p>
      </header>

      <section className="grid gap-4" aria-labelledby="profile-section-title">
        <div className="flex items-center gap-2">
          <h4 className="text-base font-bold text-app-ink" id="profile-section-title">Profile</h4>
          {isLocked ? <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-semibold text-app-muted">Built-in</span> : null}
        </div>

        <div className="flex flex-wrap items-end gap-2">
          <label className="grid min-w-[min(100%,18rem)] flex-1 gap-1.5 text-sm font-normal text-app-muted">
            Selected profile
            <select
              className="min-h-10 rounded-md border border-app-line bg-white px-3 font-normal text-app-ink outline-none focus:border-app-accent"
              value={selectedProfile.profileId}
              onChange={(event) => {
                setSelectedProfileId(event.target.value);
                setStatus("Ready");
              }}
            >
              {profiles.map((profile) => (
                <option key={profile.profileId} value={profile.profileId}>
                  {profile.name}
                </option>
              ))}
            </select>
          </label>
          <button
            className="min-h-10 rounded-md px-3 text-sm font-semibold text-app-accent hover:bg-app-accent/10"
            type="button"
            onClick={() => void createProfile(profiles[0], "Custom profile")}
          >
            + New
          </button>
        </div>

        {isLocked ? (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-app-muted">Duplicate this profile to edit it.</p>
            <button
              className="min-h-9 rounded-md px-3 text-sm font-semibold text-app-accent hover:bg-app-accent/10"
              type="button"
              onClick={() => void createProfile(selectedProfile, `${selectedProfile.name} copy`)}
            >
              Duplicate
            </button>
          </div>
        ) : (
          <label className="grid gap-1.5 text-sm font-normal text-app-muted">
            Name
            <input
              className={fieldClassName}
              type="text"
              value={draft.name}
              onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))}
            />
          </label>
        )}
      </section>

      <section className="grid gap-3" aria-labelledby="instructions-section-title">
        <h4 className="text-base font-bold text-app-ink" id="instructions-section-title">Instructions</h4>
        <p className="text-sm text-app-muted">These instructions guide how BuilderAI plans changes and writes App Lab code.</p>
        <textarea
          aria-label="Builder instructions"
          className={`${fieldClassName} min-h-64 resize-y font-mono text-xs font-normal leading-relaxed`}
          readOnly={isLocked}
          spellCheck={false}
          value={draft.promptTemplate}
          onChange={(event) => setDraft((current) => ({ ...current, promptTemplate: event.target.value }))}
        />
      </section>

      <section className="grid gap-3" aria-labelledby="starter-section-title">
        <h4 className="text-base font-bold text-app-ink" id="starter-section-title">Starter app</h4>
        <p className="text-sm text-app-muted">This source gives BuilderAI the app structure and patterns to start from.</p>
        <textarea
          aria-label="Starter app source"
          className={`${fieldClassName} min-h-64 resize-y font-mono text-xs font-normal leading-relaxed`}
          readOnly={isLocked}
          spellCheck={false}
          value={draft.starterSource}
          onChange={(event) => setDraft((current) => ({ ...current, starterSource: event.target.value }))}
        />
      </section>

      <section className="grid gap-3" aria-labelledby="fixed-tools-section-title">
        <h4 className="text-base font-bold text-app-ink" id="fixed-tools-section-title">Fixed tools</h4>
        <p className="text-sm text-app-muted">Every profile can use these App Lab tools; profiles change the guidance, not the capabilities.</p>
        <ul className="grid gap-2 text-sm font-normal text-app-muted">
          {BUILDER_TOOL_SUMMARIES.map((tool) => (
            <li className="grid gap-0.5" key={tool.name}>
              <code className="break-all font-semibold text-app-ink">{tool.name}</code>
              <span>{tool.description.replace(/\.$/, "")}</span>
            </li>
          ))}
        </ul>
      </section>

      {!isLocked ? (
        <SettingsActionBar status={status}>
          <button
            className="min-h-9 rounded-md px-3 text-sm font-semibold text-red-700 hover:bg-red-50"
            type="button"
            onClick={() => void deleteProfile()}
          >
            Delete
          </button>
          <button
            className="min-h-9 rounded-md bg-app-accent px-3 text-sm font-semibold text-white hover:bg-app-strong"
            type="button"
            onClick={() => void saveProfile()}
          >
            Save profile
          </button>
        </SettingsActionBar>
      ) : null}
      <SettingsSnackbar message={notice} />
    </div>
  );
}

function toProfileInput(profile: BuilderProfile | null): BuilderProfileInput {
  return {
    name: profile?.name ?? "",
    promptTemplate: profile?.promptTemplate ?? "",
    starterSource: profile?.starterSource ?? "",
  };
}
