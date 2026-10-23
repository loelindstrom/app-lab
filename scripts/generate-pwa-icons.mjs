import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { JSDOM } from "jsdom";

const namespace = "http://www.w3.org/2000/svg";
const favicon = new JSDOM(readFileSync("public/favicon.svg", "utf8"), { contentType: "image/svg+xml" }).window.document;
const document = favicon.implementation.createDocument(namespace, "svg");
const root = document.documentElement;
root.setAttribute("viewBox", "0 0 512 512");
const background = document.createElementNS(namespace, "rect");
background.setAttribute("width", "512");
background.setAttribute("height", "512");
background.setAttribute("fill", "#ffffff");
root.append(background);

// Keep the favicon's actual paths, with padding inside the maskable icon safe area.
const flask = document.createElementNS(namespace, "g");
flask.setAttribute("transform", "translate(112 112) scale(12)");
for (const name of ["fill", "stroke-width", "stroke-linecap", "stroke-linejoin"]) {
  flask.setAttribute(name, favicon.documentElement.getAttribute(name));
}
flask.setAttribute("stroke", "#167d70");
favicon.querySelector("style")?.remove();
for (const child of favicon.documentElement.childNodes) {
  if (child.nodeType === 3 && !child.textContent.trim()) continue;
  flask.append(document.importNode(child, true));
}
root.append(flask);
writeFileSync("public/icons/icon.svg", `${root.outerHTML}\n`);

for (const size of [192, 512]) {
  const result = spawnSync("convert", [
    "-background", "none", "public/icons/icon.svg", "-resize", `${size}x${size}`,
    "-depth", "8", "-strip", `public/icons/flask-${size}.png`,
  ], { stdio: "inherit" });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}
