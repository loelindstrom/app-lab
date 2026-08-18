export type JsonValue =
  | null
  | boolean
  | number
  | string
  | JsonValue[]
  | { [key: string]: JsonValue };

export const MAX_APP_DATA_BYTES = 1_048_576;

export function normalizeJsonValue(data: unknown): JsonValue {
  let serialized: string | undefined;

  try {
    serialized = JSON.stringify(data);
  } catch {
    throw new Error("App data must be JSON-serializable.");
  }

  if (serialized === undefined) {
    throw new Error("App data must be JSON-serializable.");
  }

  const byteLength = new TextEncoder().encode(serialized).byteLength;
  if (byteLength > MAX_APP_DATA_BYTES) {
    throw new Error(`App data exceeds the ${MAX_APP_DATA_BYTES} byte limit.`);
  }

  return JSON.parse(serialized) as JsonValue;
}
