const required = ["APP_LAB_OPENROUTER_TEST_API_KEY"];
const missing = required.filter((name) => !process.env[name]);

if (missing.length) {
  console.error(`Missing required OpenRouter test environment variables: ${missing.join(", ")}`);
  console.error("Add the paid-test key to .env.test.local using the shape in .env.test.local.example.");
  process.exit(1);
}
