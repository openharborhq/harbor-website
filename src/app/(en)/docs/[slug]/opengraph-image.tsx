import { card } from "@/components/og/card";
import { ALL_PAGES, findPage, loadPage } from "@/content/docs";

/* Each guide's card carries its own title and description, under the section it sits in. */
export { size, contentType } from "@/components/og/card";
export const alt = "A Harbor documentation page";

/* Drawn at build time for every guide the docs route builds. */
export function generateStaticParams() {
  return ALL_PAGES.filter((p) => p.slug !== "overview").map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const found = findPage(slug);
  const { meta } = await loadPage(slug);
  return card({
    eyebrow: found ? `Docs · ${found.section.section}` : "Docs",
    title: meta.title,
    lead: meta.description,
  });
}
