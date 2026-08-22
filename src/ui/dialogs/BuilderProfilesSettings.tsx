import { useEffect, useMemo, useState } from "react";
import {
  BUILDER_TOOL_SUMMARIES,
  MINIMAL_BUILDER_PROFILE_ID,
  type BuilderProfile,
  type BuilderProfileInput,
  type UpdateBuilderProfileInput,
} from "../../ai";
import { SettingsActionBar, SettingsSnackbar } from "./SettingsActions";

interface BuilderProfilesSettingsProps {
  activeProfileId: string;
  onCreate: (input: BuilderProfileInput) => Promise<BuilderProfile>;
  onDelete: (profileId: string) => Promise<void>;
  onSelect: (profileId: string) => Promise<void>;
  onUpdate: (input: UpdateBuilderProfileInput) => Promise<BuilderProfile>;
  profiles: BuilderProfile[];
}

export function BuilderProfilesSettings({
  activeProfileId,
  onCreate,
  onDelete,
  onSelect,
  onUpdate,
  profiles,
}: BuilderProfilesSettingsProps) {
  const [selectedProfileId, setSelectedProfileId] = useState(activeProfileId);
  const selectedProfile = useMemo(
    () =>
      profiles.find((profile) => profile.profileId === selectedProfileId) ??
      profiles.find((profile) => profile.profileId === activeProfileId) ??
      profiles[0] ??
      null,
    [activeProfileId, profiles, selectedProfileId],
  );
  const [draft, setDraft] = useState<BuilderProfileInput>(() => toProfileInput(selectedProfile));
  const [notice, setNotice] = useState<string | null>(null);
  const [status, setStatus] = useState("Ready");

  useEffect(() => {
    if (profiles.some((profile) => profile.profileId === activeProfileId)) {
      setSelectedProfileId(activeProfileId);
    }
  }, [activeProfileId, profiles]);

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
    let created: BuilderProfile;
    try {
      created = await onCreate({ ...toProfileInput(source), name });
    } catch (error) {
      setStatus("Ready");
      setNotice(error instanceof Error ? error.message : "Could not create profile.");
      return;
    }

    setSelectedProfileId(created.profileId);
    setDraft(toProfileInput(created));
    try {
      await onSelect(created.profileId);
      setNotice("Profile created.");
    } catch (_) {
      setSelectedProfileId(activeProfileId);
      setNotice("Profile created, but could not make it active.");
    } finally {
      setStatus("Ready");
    }
  }

  async function selectProfile(profileId: string) {
    setSelectedProfileId(profileId);
    setStatus("Selecting profile...");
    try {
      await onSelect(profileId);
      setStatus("Ready");
    } catch (error) {
      setSelectedProfileId(activeProfileId);
      setStatus("Ready");
      setNotice(error instanceof Error ? error.message : "Could not select profile.");
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
    const fallback = profiles.find((profile) => profile.profileId !== selectedProfile.profileId) ?? null;
    try {
      await onDelete(selectedProfile.profileId);
    } catch (error) {
      setStatus("Ready");
      setNotice(error instanceof Error ? error.message : "Could not delete profile.");
      return;
    }

    setSelectedProfileId(fallback?.profileId ?? "");
    try {
      if (fallback) await onSelect(fallback.profileId);
      setNotice("Profile deleted.");
    } catch (_) {
      setNotice("Profile deleted, but could not save the fallback selection.");
    } finally {
      setStatus("Ready");
    }
  }

  if (!selectedProfile) {
    return <p className="text-sm text-app-muted">No Builder profiles are available.</p>;
  }

  const isLocked = selectedProfile.builtIn;
  const minimalProfile = profiles.find((profile) => profile.profileId === MINIMAL_BUILDER_PROFILE_ID) ?? profiles[0] ?? null;
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
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h4 className="text-base font-bold text-app-ink" id="profile-section-title">Profile</h4>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Profile actions">
            <button
              className="min-h-9 rounded-md border border-app-line bg-white px-3 text-sm font-semibold text-app-ink hover:border-app-accent hover:text-app-accent"
              type="button"
              onClick={() => void createProfile(minimalProfile, "New profile")}
            >
              New
            </button>
            <button
              className="min-h-9 rounded-md border border-app-line bg-white px-3 text-sm font-semibold text-app-ink hover:border-app-accent hover:text-app-accent"
              type="button"
              onClick={() => void createProfile(selectedProfile, `${selectedProfile.name} copy`)}
            >
              Duplicate
            </button>
            <button
              className="min-h-9 rounded-md border border-transparent px-3 text-sm font-semibold text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:text-app-muted disabled:hover:bg-transparent"
              type="button"
              disabled={isLocked}
              title={isLocked ? "Built-in profiles cannot be deleted" : "Delete profile"}
              onClick={() => void deleteProfile()}
            >
              Delete
            </button>
          </div>
        </div>

        <label className="grid gap-1.5 text-sm font-normal text-app-muted">
          Active profile
          <select
            className="min-h-10 rounded-md border border-app-line bg-white px-3 font-normal text-app-ink outline-none focus:border-app-accent"
            value={selectedProfile.profileId}
            onChange={(event) => {
              void selectProfile(event.target.value);
            }}
          >
            {profiles.map((profile) => (
              <option key={profile.profileId} value={profile.profileId}>
                {profile.name}
                {profile.builtIn ? " (Built-in)" : ""}
              </option>
            ))}
          </select>
        </label>
      </section>

      <section className="grid gap-8 border-t border-app-line pt-6" aria-labelledby="profile-details-title">
        <h4 className="text-base font-bold text-app-ink" id="profile-details-title">Profile details</h4>

        <label className="grid gap-1.5 text-sm font-normal text-app-muted">
          Profile name
          <input
            className={fieldClassName}
            readOnly={isLocked}
            type="text"
            value={draft.name}
            onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))}
          />
        </label>

        <section className="grid gap-3" aria-labelledby="instructions-section-title">
          <h5 className="text-base font-bold text-app-ink" id="instructions-section-title">Instructions</h5>
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
          <h5 className="text-base font-bold text-app-ink" id="starter-section-title">Starter app</h5>
          <p className="text-sm text-app-muted">This source becomes each new app created with the profile.</p>
          <textarea
            aria-label="Starter app source"
            className={`${fieldClassName} min-h-64 resize-y font-mono text-xs font-normal leading-relaxed`}
            readOnly={isLocked}
            spellCheck={false}
            value={draft.starterSource}
            onChange={(event) => setDraft((current) => ({ ...current, starterSource: event.target.value }))}
          />
        </section>
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
