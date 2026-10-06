import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/*
 * The picture a link shows when it is shared: one card, drawn by `next/og` at build time for every
 * page that has an `opengraph-image.tsx` beside it, and inherited by the pages under it that do not.
 *
 * Drawn in the site's own terms rather than as a screenshot: white paper, the cobalt mark, Inter
 * for the words and Plex Mono for the label, the way DESIGN.md sets the pages. The renderer reads
 * TrueType, not the woff2 the site serves, so the four faces it needs live in `src/assets/og-fonts`
 * (both families are under the SIL Open Font Licence).
 *
 * The renderer understands a subset of CSS: every element with more than one child must say
 * `display: flex`, and colours are literal because there are no custom properties here. They are
 * the light-theme tokens from `globals.css`.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const C = {
  ground: "#ffffff",
  surface: "#f2f5f9",
  border: "#dce3ec",
  text: "#0d1622",
  muted: "#586471",
  faint: "#8894a6",
  accent: "#123fa8",
  onBand: "#ffffff",
  bandLine: "#5f82d2",
};

const FONT_DIR = join(process.cwd(), "src", "assets", "og-fonts");

async function fonts() {
  const [regular, semibold, bold, mono] = await Promise.all(
    ["Inter-Regular.ttf", "Inter-SemiBold.ttf", "Inter-Bold.ttf", "IBMPlexMono-Medium.ttf"].map((f) => readFile(join(FONT_DIR, f))),
  );
  return [
    { name: "Inter", data: regular, weight: 400 as const, style: "normal" as const },
    { name: "Inter", data: semibold, weight: 600 as const, style: "normal" as const },
    { name: "Inter", data: bold, weight: 700 as const, style: "normal" as const },
    { name: "Plex Mono", data: mono, weight: 500 as const, style: "normal" as const },
  ];
}

/** The shield-and-anchor mark from `components/Logo.tsx`, as the renderer needs it: plain SVG. */
function Mark({ size: s, color }: { size: number; color: string }) {
  return (
    <svg width={s} height={s} viewBox="0 0 26 26">
      <path
        d="M13 2.5 L22.5 7 L22.5 14.5 C22.5 19.5 18.4 22.8 13 24 C7.6 22.8 3.5 19.5 3.5 14.5 L3.5 7 Z"
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M13 8.5 L13 17.5 M8.6 12.4 C8.6 12.4 10.2 14.6 13 14.6 C15.8 14.6 17.4 12.4 17.4 12.4"
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export type Comparison = { name: string; rows: { q: string; harbor: string; them: string }[] };

export type Card = {
  /** The mono label above the title: what kind of page this is. */
  eyebrow: string;
  title: string;
  lead?: string;
  /** A versus page draws its table beside the title instead of a lead. */
  comparison?: Comparison;
};

export async function card({ eyebrow, title, lead, comparison }: Card) {
  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", background: C.ground, fontFamily: "Inter" }}>
        <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, padding: "64px 72px 56px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <Mark size={44} color={C.accent} />
              <span style={{ fontSize: 34, fontWeight: 700, letterSpacing: "-0.02em", color: C.text }}>Harbor</span>
            </div>
            <span style={{ fontFamily: "Plex Mono", fontSize: 20, letterSpacing: "0.1em", color: C.faint }}>OPENHARBOR.APP</span>
          </div>

          <div style={{ display: "flex", flexGrow: 1, alignItems: "center", gap: 56 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 22, flex: comparison ? "0 0 470px" : "1 1 auto" }}>
              <span style={{ fontFamily: "Plex Mono", fontSize: 20, letterSpacing: "0.1em", color: C.faint, textTransform: "uppercase" }}>
                {eyebrow}
              </span>
              <span
                style={{
                  fontSize: comparison ? 60 : title.length > 40 ? 64 : 76,
                  fontWeight: 700,
                  lineHeight: 1.06,
                  letterSpacing: "-0.035em",
                  color: C.text,
                  maxWidth: comparison ? 470 : 1056,
                }}
              >
                {title}
              </span>
              {lead && !comparison && (
                <span style={{ fontSize: 30, lineHeight: 1.4, color: C.muted, maxWidth: 980 }}>{lead}</span>
              )}
            </div>
            {comparison && <Table comparison={comparison} />}
          </div>
        </div>
        <div style={{ display: "flex", height: 12, background: C.accent }} />
      </div>
    ),
    { ...size, fonts: await fonts() },
  );
}

/** The versus table in miniature: Harbor's head in cobalt and its answers in the accent. */
function Table({ comparison: c }: { comparison: Comparison }) {
  const cell = { display: "flex", flex: 1, padding: "14px 18px", fontSize: 19, lineHeight: 1.3 } as const;
  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, border: `1px solid ${C.border}`, borderRadius: 16, overflow: "hidden" }}>
      <div style={{ display: "flex" }}>
        <div style={{ ...cell, background: C.accent, color: C.onBand, fontSize: 22, fontWeight: 700, padding: "18px" }}>Harbor</div>
        <div style={{ ...cell, background: C.surface, color: C.text, fontSize: 22, fontWeight: 700, padding: "18px" }}>{c.name}</div>
      </div>
      {c.rows.map((r) => (
        <div key={r.q} style={{ display: "flex", flexDirection: "column", borderTop: `1px solid ${C.border}` }}>
          <div style={{ display: "flex", padding: "10px 18px 0", fontFamily: "Plex Mono", fontSize: 14, letterSpacing: "0.08em", color: C.faint, textTransform: "uppercase" }}>
            {r.q}
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ ...cell, color: C.accent, fontWeight: 600 }}>{r.harbor}</div>
            <div style={{ ...cell, color: C.muted }}>{r.them}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
