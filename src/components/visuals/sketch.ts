/**
 * Shared vocabulary for the hand-drawn illustrations: a few helpers that return paths with a bow
 * in every edge and a small overshoot at every corner.
 *
 * The wobble is seeded from each shape's own position, never random, so the server and the browser
 * draw the identical path and hydration stays quiet.
 */

export const INK = "var(--color-text)";
export const HAIR = "var(--color-border-strong)";
export const RULE = "var(--color-border)";
export const MUTED = "var(--color-muted)";
export const FAINT = "var(--color-faint)";
export const ACCENT = "var(--color-accent)";
export const WARN = "var(--color-warn)";

/** Deterministic jitter in [-1, 1] from a seed. */
export function j(seed: number) {
  const v = Math.sin(seed * 12.9898) * 43758.5453;
  return (v - Math.floor(v)) * 2 - 1;
}

/** A rounded rectangle with every edge bowed and every corner slightly off, as if drawn. */
export function box(x: number, y: number, w: number, h: number, r: number, seed = 1) {
  const a = 1.2;
  const t = (n: number) => j(seed + n) * a;
  return [
    `M${x + r} ${y + t(1)}`,
    `Q${x + w / 2} ${y + t(2) - 1} ${x + w - r} ${y + t(3)}`,
    `Q${x + w} ${y} ${x + w + t(4)} ${y + r}`,
    `Q${x + w + t(5) + 1} ${y + h / 2} ${x + w + t(6)} ${y + h - r}`,
    `Q${x + w} ${y + h} ${x + w - r} ${y + h + t(7)}`,
    `Q${x + w / 2} ${y + h + t(8) + 1} ${x + r} ${y + h + t(9)}`,
    `Q${x} ${y + h} ${x + t(10)} ${y + h - r}`,
    `Q${x + t(11) - 1} ${y + h / 2} ${x + t(12)} ${y + r}`,
    `Q${x} ${y} ${x + r} ${y + t(1)}`,
    "Z",
  ].join(" ");
}

/** A circle that does not quite close on itself. */
export function ring(cx: number, cy: number, r: number, seed = 1) {
  const t = (n: number) => j(seed + n) * 1.4;
  return [
    `M${cx - r + t(1)} ${cy}`,
    `Q${cx - r + t(2)} ${cy - r} ${cx} ${cy - r + t(3)}`,
    `Q${cx + r} ${cy - r + t(4)} ${cx + r + t(5)} ${cy}`,
    `Q${cx + r + t(6)} ${cy + r} ${cx} ${cy + r + t(7)}`,
    `Q${cx - r} ${cy + r + t(8)} ${cx - r + t(1)} ${cy}`,
    "Z",
  ].join(" ");
}

/** A bowed horizontal rule. */
export function line(x: number, y: number, w: number, seed = 1) {
  return `M${x} ${y + j(seed) * 0.8} Q${x + w / 2} ${y + j(seed + 1) * 1.6} ${x + w} ${y + j(seed + 2) * 0.8}`;
}

/** The sidebar glyphs, drawn around (0,0). */
export const NAV_GLYPH: Record<string, string> = {
  Home: "M-8 0 Q0 -8 8 0 M-6 -0.6 Q-5.6 4 -6 8 Q0 9 6 8 Q5.6 4 6 -0.6 M-2 8 Q-1.6 4.4 -2 1.6 Q0 1.2 2 1.6 Q1.6 4.6 2 8",
  Inbox: "M-8 -5.4 Q0 -6.4 8 -5.4 Q8.8 0 8 5.4 Q0 6.4 -8 5.4 Q-8.8 0 -8 -5.4 Z M-8 -5.4 L0 0.6 L8 -5.4",
  "To do": "M-7.6 0 Q-8 -7.6 0 -7.8 Q8 -8 7.8 0 Q8 7.8 0 7.8 Q-8 8 -7.6 0 Z M-3.6 0.4 Q-1.6 2.4 -0.6 3.6 Q1.8 -0.6 4.4 -3.2",
  Library: "M-7.6 -7 Q0 -7.8 7.6 -7 Q8.2 0 7.6 7 Q0 7.8 -7.6 7 Q-8.2 0 -7.6 -7 Z M-4 -2.4 Q0 -1.8 4 -2.4 M-4 2.2 Q-1 2.8 2 2.2",
  "People & things": "M-2.4 -3.4 Q-2.8 -8 1.4 -8 Q5.6 -8 5.2 -3.4 Q5.6 1 1.4 1 Q-2.8 1 -2.4 -3.4 Z M-6.6 8.4 Q-6.2 2.6 1.4 2.6 Q9 2.6 9.4 8.4",
  Settings: "M-7.4 0 Q-7.8 -7.4 0 -7.6 Q7.8 -7.8 7.6 0 Q7.8 7.6 0 7.6 Q-7.8 7.8 -7.4 0 Z M-3 0 Q-3.2 -3.2 0 -3.2 Q3.2 -3.2 3 0 Q3.2 3.2 0 3.2 Q-3.2 3.2 -3 0 Z",
};

export const NAV = ["Home", "Inbox", "To do", "Library", "People & things", "Settings"];
