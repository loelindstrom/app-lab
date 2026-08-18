import { describe, expect, it } from "vitest";
import { createAuthFirebaseRules, createFirebaseOwnerSetupSecret } from "./firebaseAccessRules";

describe("Firebase access rules", () => {
  it("generates auth-v1 rules with an embedded owner setup secret and hidden membership paths", () => {
    const secret = createFirebaseOwnerSetupSecret();
    const rules = JSON.parse(createAuthFirebaseRules(secret)) as {
      rules: Record<string, Record<string, unknown>>;
    };

    expect(secret).toMatch(/^app_lab_owner_/);
    expect(JSON.stringify(rules)).toContain(secret);
    expect(rules.rules.appLabOwners).toBeTruthy();
    expect(JSON.stringify(rules.rules.appLabOwners)).toContain("!newData.exists()");
    expect(rules.rules.appLabRoomClaimTokens).toBeTruthy();
    expect(rules.rules.appLabRoomMembers).toBeTruthy();
    expect(rules.rules.appLabSyncRooms).toBeTruthy();
    expect(JSON.stringify(rules.rules.appLabSyncRooms)).toContain("appLabRoomMembers");
  });
});
