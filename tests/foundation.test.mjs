import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

function relativeLuminance(hex) {
  const channels = hex
    .slice(1)
    .match(/.{2}/g)
    .map((channel) => Number.parseInt(channel, 16) / 255)
    .map((channel) => channel <= 0.03928
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4);

  return (0.2126 * channels[0]) + (0.7152 * channels[1]) + (0.0722 * channels[2]);
}

function contrastRatio(first, second) {
  const luminances = [relativeLuminance(first), relativeLuminance(second)].sort((a, b) => b - a);
  return (luminances[0] + 0.05) / (luminances[1] + 0.05);
}

test("version 1 boundaries remain explicit", async () => {
  const product = await read("PRODUCT.md");

  assert.match(product, /No automatic cloud recognition/);
  assert.match(product, /No Windy integration/);
  assert.match(product, /No recorded or synthesized voice/);
});

test("the project records its visual source of truth", async () => {
  const design = await read("DESIGN.md");

  assert.match(design, /Atlas Swiatla/);
  assert.match(design, /design\/reference\/atlas-swiatla-mobile\.png/);
});

test("the public base path matches the repository", async () => {
  const config = await read("vite.config.mjs");

  assert.match(config, /base: "\/cloud-recognition\/"/);
});

test("the installable app and offline shell use the Pages base path", async () => {
  const manifest = JSON.parse(await read("public/manifest.webmanifest"));
  const worker = await read("public/service-worker.js");

  assert.equal(manifest.start_url, "/cloud-recognition/");
  assert.equal(manifest.scope, "/cloud-recognition/");
  assert.match(worker, /const BASE = "\/cloud-recognition\/"/);
});

test("GitHub Pages deployment runs tests before publishing", async () => {
  const workflow = await read(".github/workflows/deploy-pages.yml");

  assert.match(workflow, /npm test/);
  assert.match(workflow, /npm run build/);
  assert.match(workflow, /actions\/deploy-pages@v4/);
  assert.match(workflow, /FORCE_JAVASCRIPT_ACTIONS_TO_NODE24/);
});

test("npm configuration remains portable across local and CI machines", async () => {
  const npmrc = await read(".npmrc");

  assert.doesNotMatch(npmrc, /\/Users\//);
  assert.match(npmrc, /cache=\.npm-cache/);
});

test("small annotation colors meet WCAG AA against their surfaces", async () => {
  const styles = await read("src/styles.css");
  const token = (name) => styles.match(new RegExp(`--${name}: (#[0-9a-f]{6})`))[1];
  const paper = token("paper");
  const white = token("white");

  assert.ok(contrastRatio(token("coral"), paper) >= 4.5);
  assert.ok(contrastRatio(token("coral"), white) >= 4.5);
  assert.ok(contrastRatio(token("moss"), paper) >= 4.5);
});
