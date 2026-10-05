import type { Lang } from "@/lib/i18n";
import { DOCS, features, pricing } from "./routes";

/*
 * The header's and the sticky pill's links and labels, in one place so the two bars cannot drift.
 * A plain module rather than part of NavV2, because the pill is a client component and NavV2 is not.
 */
export const NAV_COPY: Record<Lang, { features: string; docs: string; home: string; github: string; start: string }> = {
  en: { features: "Features", docs: "Docs", home: "Harbor home", github: "Harbor on GitHub", start: "Get started" },
  // The docs are English for now; the label says so before the click does.
  de: { features: "Funktionen", docs: "Doku (EN)", home: "Harbor Startseite", github: "Harbor auf GitHub", start: "Loslegen" },
};

export function navLinks(lang: Lang, pricingEnabled: boolean) {
  const t = NAV_COPY[lang];
  return [
    { label: t.features, href: features(lang) },
    { label: t.docs, href: DOCS },
    ...(pricingEnabled ? [{ label: "Harbor Cloud", href: pricing(lang) }] : []),
  ];
}
