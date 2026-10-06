import { card } from "@/components/og/card";
import { COMPARISONS, findComparison } from "@/content/compare";

/* A versus page's card: its headline beside the first rows of its table. */
export { size, contentType } from "@/components/og/card";
export const alt = "Harbor compared with a hosted alternative";

/* Drawn at build time for every versus page, like the pages themselves. */
export function generateStaticParams() {
  return COMPARISONS.map((c) => ({ slug: c.slug }));
}

/* The card has room for four short rows; a row whose answer needs two lines in the page's table
   needs three on the card, so the card shows the first four that fit instead. */
const fitsCard = (r: { harbor: string; them: string }) => r.harbor.length <= 34 && r.them.length <= 34;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const c = findComparison((await params).slug);
  if (!c) return card({ eyebrow: "Compare", title: "Harbor compared" });
  return card({
    eyebrow: `Harbor vs ${c.name}`,
    title: c.hero.title,
    comparison: { name: c.name, rows: c.rows.filter(fitsCard).slice(0, 4) },
  });
}
