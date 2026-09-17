/** The navigation tree and page types. Pure data, safe to import from client components. */

export type PageMeta = {
  title: string;
  description: string;
};

export type NavPage = { slug: string; title: string; href: string };
export type NavSection = { section: string; pages: NavPage[] };
export type TocItem = { id: string; text: string; depth: 2 | 3 };

/**
 * Where a slug lives, under whichever docs tree is asking.
 *
 * `base` is a parameter because the redesign's docs lived at `/v2/docs` beside the live ones for a
 * while, and the nav and the pager had to stay inside whichever tree the reader was in. There is
 * one tree again; the parameter stays because it costs nothing and the next staging run will want
 * it.
 */
export function hrefFor(slug: string, base = "/docs"): string {
  return slug === "overview" ? base : `${base}/${slug}`;
}

const page = (slug: string, title: string): NavPage => ({ slug, title, href: hrefFor(slug) });

/** The left navigation, in reading order. Every slug is a file in this directory. */
export const NAV: NavSection[] = [
  {
    section: "Getting started",
    pages: [page("overview", "Overview"), page("prerequisites", "Prerequisites"), page("install", "Install"), page("first-run", "First run")],
  },
  {
    section: "Set up",
    pages: [
      page("data-volume", "The data volume"),
      page("reaching-your-vault", "Reaching your vault"),
      page("backups", "Backups"),
      page("break-glass", "The break-glass envelope"),
    ],
  },
  {
    section: "Recover",
    pages: [page("restore", "Restore from a backup"), page("when-something-breaks", "When something breaks")],
  },
  {
    section: "Day to day",
    pages: [
      page("adding-documents", "Adding documents"),
      page("email", "Email"),
      page("inbox", "The Inbox"),
      page("people-and-things", "People and things"),
      page("categories-tags-search", "Categories, tags, and search"),
      page("to-do", "To do"),
      page("household", "The household"),
    ],
  },
  {
    section: "Reference",
    pages: [
      page("harbor-command", "The harbor command"),
      page("configuration", "Configuration"),
      page("language-model", "The language model"),
      page("what-runs", "What runs"),
    ],
  },
];

export const ALL_PAGES: NavPage[] = NAV.flatMap((s) => s.pages);

export function findPage(slug: string): { page: NavPage; section: NavSection; index: number } | null {
  const index = ALL_PAGES.findIndex((p) => p.slug === slug);
  if (index < 0) return null;
  const section = NAV.find((s) => s.pages.some((p) => p.slug === slug))!;
  return { page: ALL_PAGES[index], section, index };
}
