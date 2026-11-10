/**
 * Generates Lift Lab's original muscle-group illustrations (front + back
 * silhouettes with one highlighted region). Output: assets/muscle-groups/*.svg.
 * Original work created for Lift Lab; released under CC0. Re-run after edits:
 *   node scripts/assets/build-muscle-illustrations.mjs
 */
import { mkdirSync, writeFileSync } from "node:fs";

const BODY = "#dfd2b9", LINE = "#14251f", HIGHLIGHT = "#b34d25", BG = "#f6f0e3";

// One simplified, symmetric figure centred on x=0, head top at y=12.
const figure = `
  <circle cx="0" cy="26" r="14"/>
  <rect x="-6" y="38" width="12" height="10" rx="3"/>
  <path d="M-34 52 Q0 42 34 52 L30 120 Q0 130 -30 120 Z"/>
  <path d="M-36 54 Q-48 58 -48 76 L-52 132 Q-50 138 -44 136 L-38 82 Z"/>
  <path d="M36 54 Q48 58 48 76 L52 132 Q50 138 44 136 L38 82 Z"/>
  <path d="M-30 118 Q0 130 30 118 L28 140 Q0 148 -28 140 Z"/>
  <path d="M-28 138 L-4 142 L-8 206 L-22 206 Z"/>
  <path d="M28 138 L4 142 L8 206 L22 206 Z"/>
  <path d="M-22 206 L-8 206 L-10 252 L-20 252 Z"/>
  <path d="M22 206 L8 206 L10 252 L20 252 Z"/>`;

const regions = {
  chest:      { front: `<ellipse cx="-14" cy="66" rx="14" ry="9"/><ellipse cx="14" cy="66" rx="14" ry="9"/>` },
  shoulders:  { front: `<circle cx="-36" cy="58" r="9"/><circle cx="36" cy="58" r="9"/>`,
                back:  `<circle cx="-36" cy="58" r="9"/><circle cx="36" cy="58" r="9"/>` },
  core:       { front: `<rect x="-14" y="78" width="28" height="44" rx="8"/>` },
  back:       { back:  `<path d="M-28 54 Q0 48 28 54 L22 110 Q0 118 -22 110 Z"/>` },
  glutes:     { back:  `<ellipse cx="-13" cy="132" rx="14" ry="11"/><ellipse cx="13" cy="132" rx="14" ry="11"/>` },
  quadriceps: { front: `<path d="M-26 146 L-6 148 L-9 198 L-20 198 Z"/><path d="M26 146 L6 148 L9 198 L20 198 Z"/>` },
  calves:     { back:  `<ellipse cx="-15" cy="224" rx="7" ry="17"/><ellipse cx="15" cy="224" rx="7" ry="17"/>` },
};

const view = (x, highlight = "") => `
  <g transform="translate(${x} 0)">
    <g fill="${BODY}" stroke="${LINE}" stroke-width="1.5" stroke-linejoin="round">${figure}</g>
    <g fill="${HIGHLIGHT}" stroke="${LINE}" stroke-width="1" opacity="0.92">${highlight}</g>
  </g>`;

mkdirSync("assets/muscle-groups", { recursive: true });
for (const [slug, r] of Object.entries(regions)) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 264" width="480" height="528" role="img">
  <!-- Lift Lab muscle-group illustration: ${slug}. Original work, CC0. Left: front view. Right: back view. -->
  <rect width="240" height="264" rx="16" fill="${BG}"/>${view(64, r.front)}${view(176, r.back)}
  <line x1="120" y1="24" x2="120" y2="240" stroke="${LINE}" stroke-opacity="0.15" stroke-dasharray="4 4"/>
</svg>
`;
  writeFileSync(`assets/muscle-groups/${slug}.svg`, svg);
}
console.log(`Wrote ${Object.keys(regions).length} illustrations to assets/muscle-groups/`);
