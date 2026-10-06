import type { MetadataRoute } from "next";
import { COMPARISONS } from "@/content/compare";
import { ALL_PAGES } from "@/content/docs/nav";
import { localize } from "@/lib/i18n";

/*
 * Every page meant to be found. Pricing is left out: it is `noindex` until Harbor Cloud opens.
 * The pages that exist in both languages carry their German twin as an alternate, matching the
 * `hreflang` links in their own metadata; the docs and the versus pages are English only.
 */
const SITE = "https://openharbor.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const bilingual = ["/", "/features"].flatMap((path) =>
    (["en", "de"] as const).map((lang) => ({
      url: SITE + localize(path, lang),
      alternates: { languages: { en: SITE + path, de: SITE + localize(path, "de") } },
    })),
  );
  const docs = ALL_PAGES.map((p) => ({ url: SITE + p.href }));
  const compare = [
    { url: `${SITE}/compare` },
    ...COMPARISONS.map((c) => ({ url: `${SITE}/compare/${c.slug}`, lastModified: c.checked })),
  ];
  return [...bilingual, ...compare, ...docs];
}
