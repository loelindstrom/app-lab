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
const CUSTOM_STARTER_SOURCE = `<!doctype html>
<html lang="en">
  <head><meta charset="utf-8"><title>Profile Starter</title></head>
  <body><main><h1>Profile Starter</h1></main></body>
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
    await expect(page.getByText(/I can edit Opinionated Board/)).toBeVisible();

    await page.getByLabel("Message", { exact: true }).fill("Replace this with the browser test app");
    await page.getByRole("button", { name: "Send message" }).click();

    await expect(page.getByText("I rebuilt the app in the sandbox.")).toBeVisible();
    await expect(page.frameLocator('iframe[sandbox="allow-scripts"]').getByRole("heading", { name: "AI Browser Test" })).toBeVisible();
    expect(requests).toHaveLength(3);
    expect(readMessages(requests[0])[0]).toMatchObject({
      content: expect.stringContaining('active App Lab app named "Opinionated Board"'),
      role: "system",
    });
    expect(String(readMessages(requests[0])[0].content)).toContain("Runtime constraints:");
    expect(String(readMessages(requests[0])[0].content)).toContain("App Lab best practices:");
    expect(readToolNames(requests[0])).toEqual([
      "read_current_app_source",
      "read_recent_console_output",
      "replace_current_app_source",
    ]);
    expect(readMessages(requests[1])).toEqual(
      expect.arrayContaining([expect.objectContaining({ role: "tool", tool_call_id: "read-source" })]),
    );
    expect(readMessages(requests[2])).toEqual(
      expect.arrayContaining([expect.objectContaining({ role: "tool", tool_call_id: "replace-source" })]),
    );
    const writeReceipt = readMessages(requests[2]).find((message) => message.tool_call_id === "replace-source");
    expect(JSON.parse(String(writeReceipt?.content))).toEqual({
      name: "AI Browser Test",
      sourceChars: UPDATED_SOURCE.length,
      success: true,
    });
    expect(String(writeReceipt?.content)).not.toContain("<!doctype html>");
    await expect(page.getByLabel("Builder session usage")).toHaveText("Session: $0.0030 · 360 tokens");

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

    await expect(page.getByRole("dialog", { name: "Settings" })).toBeVisible();
    await expect(page.getByLabel("OpenRouter API key")).toBeVisible();
  });

  test("creates the selected starter and changes profiles without replacing the active app", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open settings" }).click();
    await page.getByRole("button", { name: "AI", exact: true }).click();
    await page.getByRole("button", { name: "AI Agent" }).click();
    await page.getByLabel("Active profile").selectOption("builtin-minimal-v1");
    await expect(page.getByLabel("Active profile")).toHaveValue("builtin-minimal-v1");
    await page.getByRole("button", { name: /Back/ }).click();

    await page.getByRole("button", { name: "Create new app" }).click();
    const frame = page.frameLocator('iframe[sandbox="allow-scripts"]');
    await expect(page.getByText("Minimal Board", { exact: true }).first()).toBeVisible();
    await expect(frame.getByText(/This example app shows you and the AI/)).toBeVisible();

    await frame.getByLabel("Note", { exact: true }).fill("Temporary board note");
    await frame.getByRole("button", { name: "Post" }).click();
    await expect(frame.getByText("Temporary board note", { exact: true })).toBeVisible();
    await frame.getByRole("button", { name: /Delete note: Temporary board note/ }).click();
    await frame.getByRole("button", { name: "Delete", exact: true }).click();
    await expect(frame.getByText("Temporary board note", { exact: true })).toBeHidden();

    await page.getByRole("button", { name: "Toggle BuilderAI" }).click();
    await page.getByRole("button", { name: "Open Builder profile settings for Minimal" }).click();
    await expect(page.getByRole("button", { name: "AI Agent" })).toHaveAttribute("aria-current", "page");
    await page.getByLabel("Active profile").selectOption("builtin-opinionated-v1");
    await page.getByRole("button", { name: /Back/ }).click();

    await expect(frame.getByLabel("Note", { exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Open Builder profile settings for Opinionated" })).toBeVisible();
  });

  test("stores custom Builder profiles in this browser", async ({ page }) => {
    const requests: Array<Record<string, unknown>> = [];
    await page.route(CHAT_URL, async (route) => {
      requests.push(readRequestBody(route.request()));
      await fulfillAssistant(route, { content: "Used the active profile.", role: "assistant" });
    });
    await page.setViewportSize({ height: 844, width: 390 });
    await page.goto("/");
    await page.getByRole("button", { name: "Open settings" }).click();
    await page.getByRole("button", { name: /^AI/ }).click();
    await page.getByRole("button", { name: "AI Agent" }).click();
    await page.getByLabel("Conversation memory").selectOption("long");
    await expect(page.getByText("Saved", { exact: true })).toBeVisible();

    await expect(page.getByLabel("Active profile")).toHaveValue("builtin-opinionated-v1");
    await expect(page.getByLabel("Builder instructions")).not.toBeEditable();
    await page.getByRole("button", { name: "Duplicate" }).click();
    await expect(page.getByLabel("Profile name", { exact: true })).toHaveValue("Opinionated copy");

    await page.getByLabel("Profile name", { exact: true }).fill("Mobile Builder");
    await page.getByLabel("Builder instructions").fill("Build one focused app.");
    await page.getByLabel("Starter app source").fill(CUSTOM_STARTER_SOURCE);
    await page.getByRole("button", { name: "Save profile" }).click();
    await expect(page.getByText("Profile saved.")).toBeVisible();

    const storedProfilesText = await page.evaluate(() => localStorage.getItem("app-lab-builder-profiles-v1"));
    const storedProfiles = JSON.parse(storedProfilesText ?? "null");
    expect(storedProfiles).toMatchObject({
      profiles: [
        {
          builtIn: false,
          name: "Mobile Builder",
          promptTemplate: "Build one focused app.",
          starterSource: CUSTOM_STARTER_SOURCE,
        },
      ],
      version: 1,
    });
    expect(await page.evaluate(() => JSON.parse(localStorage.getItem("app-lab-builder-preferences-v1") ?? "null"))).toEqual({
      activeProfileId: storedProfiles.profiles[0].profileId,
      conversationMemory: "long",
      version: 1,
    });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);

    await page.reload();
    await page.getByRole("button", { name: "Open settings" }).click();
    await page.getByRole("button", { name: /^AI/ }).click();
    await page.getByRole("button", { name: "AI Agent" }).click();
    await expect(page.getByLabel("Conversation memory")).toHaveValue("long");
    await page.getByLabel("Active profile").selectOption({ label: "Mobile Builder" });
    await expect(page.getByLabel("Builder instructions")).toHaveValue("Build one focused app.");

    await page.evaluate(() => {
      localStorage.setItem("app-lab-ai-config-v1", JSON.stringify({ apiKey: "sk-test-browser", model: "provider/model" }));
    });
    await page.reload();
    await page.getByRole("button", { name: "Create new app" }).click();
    await expect(page.frameLocator('iframe[sandbox="allow-scripts"]').getByRole("heading", { name: "Profile Starter" })).toBeVisible();
    await page.getByRole("button", { name: "Toggle BuilderAI" }).click();
    await page.getByLabel("Message", { exact: true }).fill("Use my profile");
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.getByText("Used the active profile.")).toBeVisible();
    expect(readMessages(requests[0])).toEqual([
      { content: "Build one focused app.", role: "system" },
      { content: "Use my profile", role: "user" },
    ]);
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

function readToolNames(request: Record<string, unknown>): string[] {
  if (!Array.isArray(request.tools)) throw new Error("Expected OpenRouter tools.");
  return request.tools.map((tool) => {
    if (!tool || typeof tool !== "object" || Array.isArray(tool)) throw new Error("Expected an OpenRouter tool object.");
    const functionDefinition = (tool as Record<string, unknown>).function;
    if (!functionDefinition || typeof functionDefinition !== "object" || Array.isArray(functionDefinition)) {
      throw new Error("Expected an OpenRouter function definition.");
    }
    const name = (functionDefinition as Record<string, unknown>).name;
    if (typeof name !== "string") throw new Error("Expected an OpenRouter tool name.");
    return name;
  });
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
    body: JSON.stringify({
      choices: [{ message }],
      usage: {
        completion_tokens: 20,
        completion_tokens_details: { reasoning_tokens: 5 },
        cost: 0.001,
        prompt_tokens: 100,
        total_tokens: 120,
      },
    }),
    contentType: "application/json",
    status: 200,
  });
}
