import { expect, test, type Page, type Request, type Route } from "@playwright/test";

const CHAT_URL = "https://openrouter.ai/api/v1/chat/completions";
const UPDATED_SOURCE = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="description" content="Updated through the BuilderAI browser test.">
    <title>AI Browser Test</title>
  </head>
  <body><main><h1>AI Browser Test</h1></main></body>
</html>`;

test.describe("BuilderAI browser workflow", () => {
  test("runs the tool loop and reloads the sandbox with replaced source", async ({ page }) => {
    const requests: Array<Record<string, unknown>> = [];
    await page.route(CHAT_URL, async (route) => {
      requests.push(readRequestBody(route.request()));
      const requestNumber = requests.length;
      if (requestNumber === 1) {
        await fulfillAssistant(route, toolCall("read-source", "read_current_app_source", {}));
        return;
      }
      if (requestNumber === 2) {
        await fulfillAssistant(
          route,
          toolCall("replace-source", "replace_current_app_source", { sourceCode: UPDATED_SOURCE }),
        );
        return;
      }
      await fulfillAssistant(route, { content: "I rebuilt the app in the sandbox.", role: "assistant" });
    });

    await configureTestAi(page);
    await page.getByRole("button", { name: "Create new app" }).click();
    await page.getByRole("button", { name: "Toggle BuilderAI" }).click();
    await expect(page.getByText(/I can edit Example App/)).toBeVisible();

    await page.getByLabel("Message", { exact: true }).fill("Replace this with the browser test app");
    await page.getByRole("button", { name: "Send message" }).click();

    await expect(page.getByText("I rebuilt the app in the sandbox.")).toBeVisible();
    await expect(page.frameLocator('iframe[sandbox="allow-scripts"]').getByRole("heading", { name: "AI Browser Test" })).toBeVisible();
    expect(requests).toHaveLength(3);
    expect(readMessages(requests[1])).toEqual(
      expect.arrayContaining([expect.objectContaining({ role: "tool", tool_call_id: "read-source" })]),
    );
    expect(readMessages(requests[2])).toEqual(
      expect.arrayContaining([expect.objectContaining({ role: "tool", tool_call_id: "replace-source" })]),
    );

    await page.getByRole("button", { name: "‹ Apps" }).click();
    await page.getByRole("button", { name: "Open", exact: true }).click();
    await page.getByRole("button", { name: "Toggle BuilderAI" }).click();
    await expect(page.getByText("I rebuilt the app in the sandbox.")).toBeVisible();
  });

  test("opens AI settings from the unconfigured Builder panel", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Create new app" }).click();
    await page.getByRole("button", { name: "Toggle BuilderAI" }).click();
    await page.getByRole("button", { name: "Set up OpenRouter" }).click();

    await expect(page.getByRole("dialog", { name: "AI config" })).toBeVisible();
    await expect(page.getByLabel("OpenRouter API key")).toBeVisible();
  });
});

async function configureTestAi(page: Page) {
  await page.goto("/");
  await page.evaluate(() => {
    localStorage.setItem(
      "app-lab-ai-config-v1",
      JSON.stringify({ apiKey: "sk-test-browser", model: "provider/model" }),
    );
  });
  await page.reload();
}

function readRequestBody(request: Request): Record<string, unknown> {
  const body = request.postDataJSON();
  if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error("Expected an OpenRouter JSON request body.");
  return body as Record<string, unknown>;
}

function readMessages(request: Record<string, unknown>): Array<Record<string, unknown>> {
  if (!Array.isArray(request.messages)) throw new Error("Expected OpenRouter messages.");
  return request.messages as Array<Record<string, unknown>>;
}

function toolCall(id: string, name: string, args: Record<string, unknown>) {
  return {
    content: null,
    role: "assistant",
    tool_calls: [
      {
        function: { arguments: JSON.stringify(args), name },
        id,
        type: "function",
      },
    ],
  };
}

async function fulfillAssistant(route: Route, message: Record<string, unknown>) {
  await route.fulfill({
    body: JSON.stringify({ choices: [{ message }] }),
    contentType: "application/json",
    status: 200,
  });
}
