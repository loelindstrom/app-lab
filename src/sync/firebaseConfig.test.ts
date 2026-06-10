import { describe, expect, it } from "vitest";
import { parseFirebaseWebAppConfig } from "./firebaseConfig";

describe("firebase config parsing", () => {
  it("parses the Firebase console JavaScript snippet", () => {
    const config = parseFirebaseWebAppConfig(
      `
      // For Firebase JS SDK v7.20.0 and later, measurementId is optional
      const firebaseConfig = {
        apiKey: "key",
        authDomain: "app.firebaseapp.com",
        projectId: "project",
        storageBucket: "project.appspot.com",
        messagingSenderId: "123",
        appId: "1:123:web:abc",
        measurementId: "G-ABC"
      };
    `,
      "https://project.europe-west1.firebasedatabase.app/",
    );

    expect(config).toMatchObject({
      apiKey: "key",
      appId: "1:123:web:abc",
      databaseURL: "https://project.europe-west1.firebasedatabase.app",
      projectId: "project",
    });
  });

  it("parses JSON config and normalizes the database URL", () => {
    expect(
      parseFirebaseWebAppConfig(
        JSON.stringify({
          apiKey: "key",
          databaseURL: "https://project.firebaseio.com/",
        }),
      ),
    ).toMatchObject({
      apiKey: "key",
      databaseURL: "https://project.firebaseio.com",
    });
  });

  it("requires a Realtime Database URL", () => {
    expect(() => parseFirebaseWebAppConfig(`const firebaseConfig = { apiKey: "key" };`)).toThrow(/Database URL/);
  });
});
