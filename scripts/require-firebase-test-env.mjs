const required = ["APP_LAB_FIREBASE_AUTH_V1_SMOKE_CONFIG", "APP_LAB_FIREBASE_AUTH_V1_OWNER_SETUP_SECRET"];
const missing = required.filter((name) => !process.env[name]);

if (missing.length) {
  console.error(`Missing Firebase test environment: ${missing.join(", ")}`);
  console.error("Copy .env.test.local.example to .env.test.local and fill in the test Firebase RTDB values.");
  process.exit(1);
}
