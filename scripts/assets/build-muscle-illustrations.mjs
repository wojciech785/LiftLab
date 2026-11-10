/**
 * Generates Lift Lab's original muscle-group illustrations (front + back
 * silhouettes with one highlighted region). Output: assets/muscle-groups/*.svg.
 * Geometry is shared with the web BodyMap: apps/web/src/components/body-map/geometry.json.
 * Original work created for Lift Lab; released under CC0. Re-run after edits:
 *   node scripts/assets/build-muscle-illustrations.mjs
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const BODY = "#dfd2b9", LINE = "#14251f", HIGHLIGHT = "#b34d25", BG = "#f6f0e3";
const geometry = JSON.parse(readFileSync(new URL("../../apps/web/src/components/body-map/geometry.json", import.meta.url), "utf8"));
const paths = (list = []) => list.map((d) => `<path d="${d}"/>`).join("");

const view = (x, highlight) => `
  <g transform="translate(${x} 0)">
    <g fill="${BODY}" stroke="${LINE}" stroke-width="1.5" stroke-linejoin="round">${paths(geometry.figure)}</g>
    <g fill="${HIGHLIGHT}" stroke="${LINE}" stroke-width="1" opacity="0.92">${paths(highlight)}</g>
  </g>`;

mkdirSync("assets/muscle-groups", { recursive: true });
for (const [slug, region] of Object.entries(geometry.regions)) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${geometry.viewBox}" width="480" height="528" role="img">
  <!-- Lift Lab muscle-group illustration: ${slug}. Original work, CC0. Left: front view. Right: back view. -->
  <rect width="240" height="264" rx="16" fill="${BG}"/>${view(geometry.views.front, region.front)}${view(geometry.views.back, region.back)}
  <line x1="120" y1="24" x2="120" y2="240" stroke="${LINE}" stroke-opacity="0.15" stroke-dasharray="4 4"/>
</svg>
`;
  writeFileSync(`assets/muscle-groups/${slug}.svg`, svg);
}
console.log(`Wrote ${Object.keys(geometry.regions).length} illustrations to assets/muscle-groups/`);
