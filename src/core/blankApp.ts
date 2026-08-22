import type { CreateAppInput } from "./types";

export function createBlankAppInput(): CreateAppInput {
  return {
    name: "Blank App",
    description: "Blank App Lab document.",
    sourceCode: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Blank App Lab document.">
    <title>Blank App</title>
  </head>
  <body></body>
</html>`,
  };
}
