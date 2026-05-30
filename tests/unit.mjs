import { getToolActivityLabel } from "../src/builder/agent.js";
import { formatTokenPrice, readOpenRouterStream } from "../src/builder/openrouter.js";
import { escapeHtml } from "../src/shell.js";

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(`${message}\nExpected: ${expected}\nActual: ${actual}`);
  }
}

function assertDeepEqual(actual, expected, message) {
  const actualJson = JSON.stringify(actual);
  const expectedJson = JSON.stringify(expected);
  if (actualJson !== expectedJson) {
    throw new Error(`${message}\nExpected: ${expectedJson}\nActual: ${actualJson}`);
  }
}

function streamFromEvents(events) {
  const encoder = new TextEncoder();
  return new ReadableStream({
    start(controller) {
      for (const event of events) {
        controller.enqueue(encoder.encode(event));
      }
      controller.close();
    },
  });
}

async function testOpenRouterStream() {
  const contents = [];
  const toolNames = [];
  let thinkingCount = 0;
  const message = await readOpenRouterStream(
    streamFromEvents([
      'data: {"choices":[{"delta":{"reasoning":"hidden"}}]}\r\n\r\n',
      'data: {"choices":[{"delta":{"content":"Hello "}}]}\n\n',
      'data: {"choices":[{"delta":{"content":"there"}}]}\n\n',
      'data: {"choices":[{"delta":{"tool_calls":[{"index":0,"id":"call_1","type":"function","function":{"name":"read_current_app_code","arguments":"{}"}}]}}]}\n\n',
      "data: [DONE]\n\n",
    ]),
    {
      onContent: (_chunk, content) => contents.push(content),
      onThinking: () => {
        thinkingCount += 1;
      },
      onToolDelta: (toolCall) => toolNames.push(toolCall.function.name),
    },
  );

  assertEqual(message.content, "Hello there", "Stream content should be assembled");
  assertEqual(thinkingCount, 1, "Reasoning progress should only be reported once");
  assertDeepEqual(contents, ["Hello ", "Hello there"], "Content callbacks should receive accumulated content");
  assertDeepEqual(toolNames, ["read_current_app_code"], "Tool delta callback should report tool names");
  assertEqual(message.tool_calls[0].id, "call_1", "Tool call id should be preserved");
  assertEqual(message.tool_calls[0].function.arguments, "{}", "Tool call arguments should be assembled");
}

function testHelpers() {
  assertEqual(formatTokenPrice("0"), "$0", "Zero token price should render cleanly");
  assertEqual(formatTokenPrice("0.0000005"), "$0.50", "Small token price should render per million tokens");
  assertEqual(formatTokenPrice("0.000003"), "$3.0", "Token price should render per million tokens");
  assertEqual(formatTokenPrice(undefined), "?", "Missing token price should be unknown");
  assertEqual(getToolActivityLabel("read_current_app_code"), "Reading current app...", "Read tool active label");
  assertEqual(getToolActivityLabel("write_current_app", false), "Edited app.", "Write tool done label");
  assertEqual(getToolActivityLabel("unknown_tool"), "Using a tool...", "Unknown tool active label");
  assertEqual(escapeHtml(`<a href="x">Tom & 'Jerry'</a>`), "&lt;a href=&quot;x&quot;&gt;Tom &amp; &#039;Jerry&#039;&lt;/a&gt;", "HTML escaping should cover risky characters");
}

await testOpenRouterStream();
testHelpers();
console.log("Unit tests passed");
