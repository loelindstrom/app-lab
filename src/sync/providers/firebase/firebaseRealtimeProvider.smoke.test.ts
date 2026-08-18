import { describe, expect, it } from "vitest";
import { deleteApp, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getDatabase, ref, remove, type Database } from "firebase/database";
import { createRoomCapability, encryptRoomPayload, roomWriteToken } from "../../rooms/crypto";
import {
  createFirebaseRealtimeDriverFromDatabase,
  createFirebaseRealtimeSyncProvider,
} from "./firebaseRealtimeProvider";
import type { FirebaseWebAppConfig } from "./firebaseConfig";

const authFirebaseConfig = readFirebaseSmokeConfig("APP_LAB_FIREBASE_AUTH_V1_SMOKE_CONFIG");
const authOwnerSetupSecret = process.env.APP_LAB_FIREBASE_AUTH_V1_OWNER_SETUP_SECRET ?? "";

describe("firebase realtime sync provider auth-v1 smoke", () => {
  it("lets invite recipients claim shared rooms without owner create access", async () => {
    if (!authFirebaseConfig || !authOwnerSetupSecret) {
      throw new Error("APP_LAB_FIREBASE_AUTH_V1_SMOKE_CONFIG and APP_LAB_FIREBASE_AUTH_V1_OWNER_SETUP_SECRET are required.");
    }

    const owner = createFirebaseSmokeContext(authFirebaseConfig, "auth-v1-owner");
    const member = createFirebaseSmokeContext(authFirebaseConfig, "auth-v1-member");
    const ownerProvider = createFirebaseRealtimeSyncProvider({
      driver: createFirebaseRealtimeDriverFromDatabase(owner.database, {
        accessModel: "auth-v1",
        auth: owner.auth,
        ownerSetupSecret: authOwnerSetupSecret,
      }),
    });
    const memberProvider = createFirebaseRealtimeSyncProvider({
      driver: createFirebaseRealtimeDriverFromDatabase(member.database, {
        accessModel: "auth-v1",
        auth: member.auth,
      }),
    });
    const capability = createRoomCapability();
    const firstPayload = await encryptRoomPayload({
      data: { count: 1, source: "firebase-auth-v1-smoke" },
      decryptSecret: capability.decryptSecret,
      roomId: capability.roomId,
      roomType: "app-data",
      roomVersion: 1,
    });

    try {
      await ownerProvider.createRoom({
        encryptedPayload: firstPayload,
        readToken: capability.readToken,
        roomId: capability.roomId,
        writeToken: roomWriteToken(capability),
      });

      await expect(
        memberProvider.loadRoom({
          readToken: capability.readToken,
          roomId: capability.roomId,
        }),
      ).rejects.toThrow(/permission|denied/i);

      if (!memberProvider.claimRoomAccess) throw new Error("Auth-v1 provider must support room access claims.");
      await memberProvider.claimRoomAccess({
        claimToken: roomWriteToken(capability),
        roomId: capability.roomId,
      });
      await expect(
        memberProvider.loadRoom({
          readToken: capability.readToken,
          roomId: capability.roomId,
        }),
      ).resolves.toMatchObject({ roomId: capability.roomId, version: 1 });

      const secondPayload = await encryptRoomPayload({
        data: { count: 2, source: "firebase-auth-v1-smoke" },
        decryptSecret: capability.decryptSecret,
        roomId: capability.roomId,
        roomType: "app-data",
        roomVersion: 2,
      });
      await expect(
        memberProvider.saveRoom({
          encryptedPayload: secondPayload,
          expectedVersion: 1,
          roomId: capability.roomId,
          writeToken: roomWriteToken(capability),
        }),
      ).resolves.toMatchObject({ roomId: capability.roomId, version: 2 });

      const unrelatedCapability = createRoomCapability();
      const unrelatedPayload = await encryptRoomPayload({
        data: { count: 1, source: "firebase-auth-v1-smoke-unrelated" },
        decryptSecret: unrelatedCapability.decryptSecret,
        roomId: unrelatedCapability.roomId,
        roomType: "app-data",
        roomVersion: 1,
      });
      let unauthorizedCreateSucceeded = false;
      try {
        await memberProvider.createRoom({
          encryptedPayload: unrelatedPayload,
          readToken: unrelatedCapability.readToken,
          roomId: unrelatedCapability.roomId,
          writeToken: roomWriteToken(unrelatedCapability),
        });
        unauthorizedCreateSucceeded = true;
      } catch (error) {
        expect(error instanceof Error ? error.message : String(error)).toMatch(/permission|denied|owner/i);
      }
      if (unauthorizedCreateSucceeded) {
        await ownerProvider
          .deleteRoom({
            roomId: unrelatedCapability.roomId,
            writeToken: roomWriteToken(unrelatedCapability),
          })
          .catch(() => {});
        throw new Error("Invite recipient created an unrelated room.");
      }
    } finally {
      const ownerUid = owner.auth.currentUser?.uid;
      const memberUid = member.auth.currentUser?.uid;
      await ownerProvider
        .deleteRoom({
          roomId: capability.roomId,
          writeToken: roomWriteToken(capability),
        })
        .catch(() => {});
      await removePath(owner.database, `appLabRoomClaimTokens/${capability.roomId}`);
      if (memberUid) await removePath(owner.database, `appLabRoomMembers/${capability.roomId}/${memberUid}`);
      if (ownerUid) await removePath(owner.database, `appLabOwners/${ownerUid}`);
      await Promise.all([deleteApp(owner.app), deleteApp(member.app)]);
    }
  }, 20000);
});

interface FirebaseSmokeContext {
  app: FirebaseApp;
  auth: Auth;
  database: Database;
}

function createFirebaseSmokeContext(config: FirebaseWebAppConfig, label: string): FirebaseSmokeContext {
  const app = initializeApp(config, `app-lab-${label}-${crypto.randomUUID()}`);
  return {
    app,
    auth: getAuth(app),
    database: getDatabase(app, config.databaseURL),
  };
}

async function removePath(database: Database, path: string): Promise<void> {
  await remove(ref(database, path)).catch(() => {});
}

function readFirebaseSmokeConfig(envName: string): FirebaseWebAppConfig | null {
  const value = process.env[envName];
  if (!value) return null;
  return JSON.parse(value) as FirebaseWebAppConfig;
}
