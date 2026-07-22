export interface FirebaseE2eProfile {
  accessModel: "auth-v1";
  config: Record<string, string>;
  ownerSetupSecret: string;
}

export function readFirebaseE2eProfile(): FirebaseE2eProfile | null {
  const ownerSetupSecret = process.env.APP_LAB_FIREBASE_AUTH_V1_OWNER_SETUP_SECRET;
  const authConfig = readFirebaseSmokeConfig();
  if (authConfig && ownerSetupSecret) {
    return {
      accessModel: "auth-v1",
      config: authConfig,
      ownerSetupSecret,
    };
  }

  return null;
}

function readFirebaseSmokeConfig(): Record<string, string> | null {
  const value = process.env.APP_LAB_FIREBASE_AUTH_V1_SMOKE_CONFIG;
  if (!value) return null;
  return JSON.parse(value) as Record<string, string>;
}
