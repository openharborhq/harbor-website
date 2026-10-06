/*
 * The shape of a versus page. One file per alternative under `content/compare/`, registered in
 * `index.ts`; the page itself is `components/pages/ComparePage.tsx` and renders any of them.
 *
 * Short on purpose: a table of a few words per cell, three differentiators, and a plain list of
 * where the other product is ahead. Everything said about it is a sentence its own published
 * pages support, and `sources` lists those pages. `checked` is the day they were read: prices and
 * policies move, so the page prints the date rather than letting a claim look current forever.
 */
export type Quote = { text: string; source: string; href: string };

/**
 * A bar in a differentiator's cost chart. `value` is what the label prints; `amount` is the same
 * figure as a number, which sets the bar's length. `harbor` marks Harbor's own bar.
 */
export type Figure = { label: string; value: string; amount: number; harbor?: boolean };

export type Differentiator = {
  title: string;
  body: string;
  quote?: Quote;
  figures?: Figure[];
  /** A short list in the evidence box, for a point whose evidence is what Harbor does. */
  checklist?: { caption: string; items: string[] };
  /** Small print under the figures: what the estimate assumes. */
  note?: string;
};

export type Row = { q: string; harbor: string; them: string };

export type Comparison = {
  slug: string;
  /** The other product's name, as it writes it. */
  name: string;
  /** ISO date the other product's pages were last read. */
  checked: string;
  meta: { title: string; description: string };
  hero: { title: string; lead: string };
  /** A few words per cell. A row that needs a sentence belongs in a differentiator instead. */
  rows: Row[];
  differentiators: { title: string; points: Differentiator[] };
  /** Where the other product is the better pick. Said plainly, because the reader will check. */
  fair: { title: string; lead: string; points: string[] };
  faq: { q: string; a: string }[];
  sources: { label: string; href: string }[];
};
