import { SettingsDialog, type SettingsDialogProps } from "../dialogs/SettingsDialog";
import type { WorkspaceController } from "./useWorkspace";
import type { ConfigureStorageProfileInput } from "../../sync";

export function WorkspaceSettings({ workspace, ...presentation }: { workspace: WorkspaceController } & Pick<SettingsDialogProps, "embedded">) {
  const {
    aiActions,
    syncActions,
    aiConfig,
    setAiConfig,
    builderPreferences,
    setBuilderPreferences,
    builderProfiles,
    setBuilderProfiles,
    storageProfile,
    settingsOpen,
    setSettingsOpen,
    settingsInitialAiTab,
    settingsInitialSection,
    refreshApps,
    trySync,
  } = workspace;
  return (
    <SettingsDialog {...presentation}
        aiConfig={aiConfig}
        builderPreferences={builderPreferences}
        builderProfiles={builderProfiles}
        initialAiTab={settingsInitialAiTab}
        initialSection={settingsInitialSection}
        isOpen={settingsOpen}
        storageProfile={storageProfile}
        onClearAiConfig={async () => {
          await aiActions.clearConfig();
          setAiConfig({ apiKey: "", model: "" });
        }}
        onClearStorageProfile={async () => {
          await syncActions.clearStorageProfile();
          await refreshApps();
        }}
        onClose={() => setSettingsOpen(false)}
        onConfigureStorageProfile={async (input: ConfigureStorageProfileInput) => {
          await syncActions.configureStorageProfile(input);
          await trySync("Storage configured locally. Remote backup failed", () => syncActions.backUpLocalApps());
          await refreshApps();
        }}
        onCreateBuilderProfile={async (input) => {
          const created = await aiActions.createBuilderProfile(input);
          setBuilderProfiles((profiles) => [...profiles, created]);
          return created;
        }}
        onDeleteBuilderProfile={async (profileId) => {
          await aiActions.deleteBuilderProfile(profileId);
          setBuilderProfiles((profiles) => profiles.filter((profile) => profile.profileId !== profileId));
        }}
        onSaveAiConfig={async (config) => {
          const saved = await aiActions.saveConfig(config);
          setAiConfig(saved);
          return saved;
        }}
        onSaveBuilderPreferences={async (preferences) => {
          const saved = await aiActions.saveBuilderPreferences(preferences);
          setBuilderPreferences(saved);
          return saved;
        }}
        onTestAiConnection={aiActions.testConnection}
        onUpdateBuilderProfile={async (input) => {
          const updated = await aiActions.updateBuilderProfile(input);
          setBuilderProfiles((profiles) =>
            profiles.map((profile) => (profile.profileId === updated.profileId ? updated : profile)),
          );
          return updated;
        }}
        onExportWorkspaceRecovery={async () => {
          return syncActions.exportWorkspaceRecovery();
        }}
        onRestoreWorkspaceRecovery={async (recoveryText) => {
          await syncActions.restoreWorkspaceRecovery(recoveryText);
          window.setTimeout(() => void refreshApps(), 0);
        }}
      />
  );
}
