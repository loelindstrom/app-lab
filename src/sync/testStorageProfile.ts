import type { StorageProfile, WorkspaceSyncRegistry } from "./workspaceSync";

const TEST_FIREBASE_DATABASE_URL = "https://example.firebaseio.com";
const TEST_FIREBASE_API_KEY = "test-api-key";
const TEST_FIREBASE_AUTH_DOMAIN = "example.firebaseapp.com";
const TEST_OWNER_SETUP_SECRET = "app_lab_owner_test_secret";

export function configureTestStorageProfile(
  registry: WorkspaceSyncRegistry,
  input: { databaseUrl?: string; displayName?: string; ownerSetupSecret?: string } = {},
): Promise<StorageProfile> {
  const databaseUrl = input.databaseUrl ?? TEST_FIREBASE_DATABASE_URL;
  return registry.configureStorageProfile({
    accessModel: "auth-v1",
    databaseUrl,
    displayName: input.displayName,
    firebaseConfigText: JSON.stringify({
      apiKey: TEST_FIREBASE_API_KEY,
      authDomain: TEST_FIREBASE_AUTH_DOMAIN,
      databaseURL: databaseUrl,
    }),
    ownerSetupSecret: input.ownerSetupSecret ?? TEST_OWNER_SETUP_SECRET,
  });
}

