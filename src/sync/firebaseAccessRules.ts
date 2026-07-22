export type FirebaseAccessModel = "auth-v1";

export const DEFAULT_FIREBASE_ACCESS_MODEL: FirebaseAccessModel = "auth-v1";

const OWNER_SECRET_BYTES = 32;

export function createFirebaseOwnerSetupSecret(): string {
  return `app_lab_owner_${randomBase64Url(OWNER_SECRET_BYTES)}`;
}

export function createAuthFirebaseRules(ownerSetupSecret: string): string {
  const setupSecretLiteral = JSON.stringify(ownerSetupSecret);
  return JSON.stringify(
    {
      rules: {
        ".read": false,
        ".write": false,
        appLabOwners: {
          $uid: {
            ".read": "auth != null && auth.uid === $uid",
            ".write": `auth != null && auth.uid === $uid && ((!data.exists() && newData.child('owner').val() === true && newData.child('setupSecret').val() === ${setupSecretLiteral}) || (data.exists() && data.child('owner').val() === true && newData.child('owner').val() === true) || (data.exists() && data.child('owner').val() === true && !newData.exists()))`,
            ".validate": "newData.hasChildren(['owner','setupSecret']) && newData.child('owner').val() === true && newData.child('setupSecret').isString()",
          },
        },
        appLabRoomClaimTokens: {
          $roomId: {
            ".read": false,
            ".write": "auth != null && root.child('appLabOwners').child(auth.uid).child('owner').val() === true",
            ".validate": "newData.isString()",
          },
        },
        appLabRoomMembers: {
          $roomId: {
            $uid: {
              ".read": false,
              ".write": "auth != null && auth.uid === $uid && (root.child('appLabOwners').child(auth.uid).child('owner').val() === true || (!data.exists() && newData.child('member').val() === true && newData.child('claimToken').val() === root.child('appLabRoomClaimTokens').child($roomId).val()) || (data.exists() && data.child('member').val() === true && newData.child('member').val() === true))",
              ".validate": "newData.hasChildren(['member','claimToken']) && newData.child('member').val() === true && newData.child('claimToken').isString()",
            },
          },
        },
        appLabSyncRooms: {
          $roomId: {
            ".read": "auth != null && (root.child('appLabOwners').child(auth.uid).child('owner').val() === true || root.child('appLabRoomMembers').child($roomId).child(auth.uid).child('member').val() === true)",
            ".write": "auth != null && ((!data.exists() && newData.exists() && root.child('appLabOwners').child(auth.uid).child('owner').val() === true) || (data.exists() && root.child('appLabOwners').child(auth.uid).child('owner').val() === true) || (data.exists() && newData.exists() && root.child('appLabRoomMembers').child($roomId).child(auth.uid).child('member').val() === true))",
            ".validate": "newData.hasChildren(['encryptedPayload','readTokenHash','roomId','updatedAt','version','writeTokenHash']) && newData.child('roomId').val() === $roomId && newData.child('encryptedPayload').isString() && newData.child('readTokenHash').isString() && newData.child('updatedAt').isString() && newData.child('version').isNumber() && newData.child('writeTokenHash').isString()",
          },
        },
      },
    },
    null,
    2,
  );
}

function randomBase64Url(byteLength: number): string {
  const bytes = crypto.getRandomValues(new Uint8Array(byteLength));
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}
