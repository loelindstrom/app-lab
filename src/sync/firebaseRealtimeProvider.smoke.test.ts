import { describe, expect, it } from "vitest";
import { createRoomCapability, decryptRoomSnapshot, encryptRoomPayload } from "./crypto";
import { createFirebaseRealtimeSyncProvider, createFirebaseSdkRealtimeDriver } from "./firebaseRealtimeProvider";
import type { FirebaseWebAppConfig } from "./firebaseConfig";

const firebaseConfig = readFirebaseSmokeConfig();
const describeFirebaseSmoke = firebaseConfig ? describe : describe.skip;

describeFirebaseSmoke("firebase realtime sync provider smoke", () => {
  it("creates, updates, subscribes, and deletes one real Firebase room", async () => {
    if (!firebaseConfig) throw new Error("APP_LAB_FIREBASE_SMOKE_CONFIG is required.");
    const provider = createFirebaseRealtimeSyncProvider({ driver: createFirebaseSdkRealtimeDriver(firebaseConfig) });
    const capability = createRoomCapability();
    const firstPayload = await encryptRoomPayload({
      data: { count: 1, source: "firebase-smoke" },
      decryptSecret: capability.decryptSecret,
      roomId: capability.roomId,
      roomType: "app-data",
      roomVersion: 1,
    });

    try {
      await provider.createRoom({
        encryptedPayload: firstPayload,
        readToken: capability.readToken,
        roomId: capability.roomId,
        writeToken: capability.writeToken ?? "",
      });

      const initial = await provider.loadRoom({
        readToken: capability.readToken,
        roomId: capability.roomId,
      });
      expect(initial.version).toBe(1);

      const nextSnapshotPromise = new Promise<number>((resolve) => {
        const unsubscribe = provider.subscribeRoom({
          readToken: capability.readToken,
          roomId: capability.roomId,
          onChange: (snapshot) => {
            if (snapshot.version > 1) {
              unsubscribe();
              resolve(snapshot.version);
            }
          },
        });
      });

      const secondPayload = await encryptRoomPayload({
        data: { count: 2, source: "firebase-smoke" },
        decryptSecret: capability.decryptSecret,
        roomId: capability.roomId,
        roomType: "app-data",
        roomVersion: 2,
      });
      const updated = await provider.saveRoom({
        encryptedPayload: secondPayload,
        expectedVersion: 1,
        roomId: capability.roomId,
        writeToken: capability.writeToken ?? "",
      });

      await expect(nextSnapshotPromise).resolves.toBe(2);
      await expect(
        decryptRoomSnapshot({
          capability,
          roomType: "app-data",
          snapshot: updated,
        }),
      ).resolves.toEqual({ count: 2, source: "firebase-smoke" });
    } finally {
      await provider.deleteRoom({
        roomId: capability.roomId,
        writeToken: capability.writeToken ?? "",
      }).catch(() => {});
    }
  }, 15000);
});

function readFirebaseSmokeConfig(): FirebaseWebAppConfig | null {
  const value = process.env.APP_LAB_FIREBASE_SMOKE_CONFIG;
  if (!value) return null;
  return JSON.parse(value) as FirebaseWebAppConfig;
}
