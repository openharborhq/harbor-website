import type { ReactNode } from "react";

/*
 * Eight feature boxes on a four-tint palette.
 *
 * The tint is the only decoration and it cycles blue → violet → green → orange, so no two
 * neighbours share a hue in either row. `label` and `violet` are the two tokens this section
 * added to the site (globals.css); the other two were already here.
 *
 * Each box is a fill and nothing else — no border. `surface` on the section's white `ground` is
 * one step, which is enough to read as a card and quiet enough that eight of them do not become
 * a grid of outlines.
 */
type Tint = "accent" | "violet" | "green" | "warn";

const TILE: Record<Tint, string> = {
  accent: "bg-accent-soft",
  violet: "bg-violet-soft",
  green: "bg-green-soft",
  warn: "bg-warn-soft",
};

/** The stroke colour each glyph draws itself in. Set on the SVG so every path inherits it. */
const STROKE: Record<Tint, string> = {
  accent: "var(--color-accent)",
  violet: "var(--color-violet)",
  green: "var(--color-green)",
  warn: "var(--color-warn)",
};

function Glyph({ tint, children }: { tint: Tint; children: ReactNode }) {
  return (
    <div className={`flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-lg ${TILE[tint]}`}>
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke={STROKE[tint]}
        strokeWidth="1.7"
        className="shrink-0"
        aria-hidden="true"
      >
        {children}
      </svg>
    </div>
  );
}

const BOXES: { head: string; copy: string; tint: Tint; glyph: ReactNode }[] = [
  {
    head: "Connect your inbox",
    copy: "Connect your inbox and Harbor decides which documents are worth keeping.",
    tint: "accent",
    glyph: (
      <>
        <rect x="3" y="5.5" width="18" height="13" rx="2.6" />
        <path d="m4.2 7.8 6.9 5.1a1.5 1.5 0 0 0 1.8 0l6.9-5.1" strokeLinecap="round" />
      </>
    ),
  },
  {
    head: "Upload files and photos",
    copy: "Upload images and documents with automatic OCR and text indexing.",
    tint: "violet",
    glyph: (
      <>
        <path d="M12 3.4v10.4" strokeLinecap="round" />
        <path d="m8.2 7.2 3.8-3.8 3.8 3.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4.4 14.8v3.4a2.2 2.2 0 0 0 2.2 2.2h10.8a2.2 2.2 0 0 0 2.2-2.2v-3.4" strokeLinecap="round" />
      </>
    ),
  },
  {
    head: "AI Summaries",
    copy: "Files get auto-tagged and categorized. Use your own LLM or API key.",
    tint: "green",
    glyph: (
      <>
        <path d="M13.6 3.2l1.9 5 5 1.9-5 1.9-1.9 5-1.9-5-5-1.9 5-1.9 1.9-5Z" strokeLinejoin="round" />
        <path d="M5.8 15.4v4.4M3.6 17.6H8" strokeLinecap="round" />
      </>
    ),
  },
  {
    head: "Automatic Backups",
    copy: "Pick your backup provider and make daily backups. Supports Backblaze and S3 API.",
    tint: "warn",
    glyph: (
      <>
        <ellipse cx="12" cy="6.2" rx="7.2" ry="2.8" />
        <path d="M4.8 6.2v11.6c0 1.55 3.22 2.8 7.2 2.8s7.2-1.25 7.2-2.8V6.2" />
        <path d="M4.8 12c0 1.55 3.22 2.8 7.2 2.8s7.2-1.25 7.2-2.8" />
      </>
    ),
  },
  {
    head: "For all your things",
    copy: "Store documents like passports, id cards, bills, deeds, wills, utility bills, expenses and more.",
    tint: "violet",
    glyph: (
      <>
        <path
          d="M7.6 3.4h6l4 4v10.4a2.2 2.2 0 0 1-2.2 2.2H7.6a2.2 2.2 0 0 1-2.2-2.2V5.6a2.2 2.2 0 0 1 2.2-2.2Z"
          strokeLinejoin="round"
        />
        <path d="M13.4 3.4v4.2h4.2" strokeLinejoin="round" />
        <path d="M8.8 12.6h6.4M8.8 16h4.2" strokeLinecap="round" />
      </>
    ),
  },
  {
    head: "Best-in-class security",
    copy: "Your own fort knox in your basement. Comes with your own virtual security guards.",
    tint: "accent",
    glyph: (
      <>
        <rect x="4.6" y="10.4" width="14.8" height="10" rx="2.6" />
        <path d="M8.3 10.4V7.7a3.7 3.7 0 0 1 7.4 0v2.7" strokeLinecap="round" />
        <circle cx="12" cy="15.4" r="1.5" fill="var(--color-accent)" stroke="none" />
      </>
    ),
  },
  {
    head: "Open Source",
    copy: "Community driven but hosted by you. Get the updates you want, only when you want, and no one else has access.",
    tint: "warn",
    glyph: (
      <>
        <circle cx="7" cy="5.8" r="2.4" />
        <circle cx="7" cy="18.2" r="2.4" />
        <circle cx="17" cy="9" r="2.4" />
        <path d="M7 8.2v7.6" strokeLinecap="round" />
        <path d="M17 11.4c0 2.7-2.3 4.4-5.2 4.4" strokeLinecap="round" />
      </>
    ),
  },
  {
    head: "Secure Sharing",
    copy: "Up your accountant's game by sending files securely. Set expiration dates, max downloads and more.",
    tint: "green",
    glyph: (
      <>
        <circle cx="17.4" cy="5.8" r="2.6" />
        <circle cx="6.6" cy="12" r="2.6" />
        <circle cx="17.4" cy="18.2" r="2.6" />
        <path d="m9 10.7 5.9-3.4M9 13.3l5.9 3.4" strokeLinecap="round" />
      </>
    ),
  },
];

export function Boxes() {
  return (
    <section
      data-reveal-group
      id="features"
      className="flex flex-col items-center gap-[56px] rounded-[26px] bg-ground lane py-[60px] md:py-[88px]"
    >
      <div className="flex w-full flex-col items-center gap-[18px]">
        <h2 className="max-w-[860px] text-center text-section-head font-bold leading-[1.1] tracking-tight text-text">
          Ditch the filing cabinet
        </h2>
        <p className="max-w-[660px] text-center text-lead leading-copy text-muted">
          Harbor was designed from the ground up to tame your document chaos. Full-text search, automatic tagging and
          summarization, plus powerful sharing features means you stay in control.
        </p>
      </div>

      {/* Two rows of four on desktop, collapsing to two and then one. A grid rather than two flex
          rows, so a long box in the top row does not set the height of the bottom one. */}
      <ul className="grid w-full gap-[20px] sm:grid-cols-2 lg:grid-cols-4">
        {BOXES.map((b, i) => (
          <li
            key={b.head}
            data-reveal-item
            style={{ ["--reveal-delay" as string]: `${i * 55}ms` }}
            className="flex flex-col gap-[18px] rounded-[20px] bg-surface p-[28px]"
          >
            <Glyph tint={b.tint}>{b.glyph}</Glyph>
            <h3 className="text-section font-bold leading-[26px] tracking-snug text-text">{b.head}</h3>
            <p className="text-body leading-[24px] text-muted">{b.copy}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
