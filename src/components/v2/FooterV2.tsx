import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { getLatestRelease, GITHUB, REPO } from "@/lib/github";
import { Wordmark } from "../Logo";
import type { Lang } from "@/lib/i18n";
import { LanguageSwitch } from "./LanguageSwitch";
import { COMPARE, doc, home, pricing } from "./routes";

/*
 * The v2 footer. Same columns as the live one, plus the theme control, which moved out of the
 * nav — a setting changed once a year does not need a permanent seat in the header.
 *
 * The bottom corners are rounded to close the page the way the hero opens it. That only reads
 * when the page sits on something darker than the footer; on white it is invisible and harmless.
 */
type Column = { head: string; width: string; links: { label: string; href: string }[] };

/* Docs and GitHub pages are English only, so their links are the same in both languages. */
const columns = (lang: Lang): Column[] => {
  const de = lang === "de";
  return [
    {
      head: de ? "PRODUKT" : "PRODUCT",
      width: "min-w-[150px]",
      links: [
        { label: de ? "Funktionen" : "Features", href: `${home(lang)}#features` },
        { label: de ? "Installieren (EN)" : "Install and deploy", href: doc("install") },
        { label: de ? "Backups (EN)" : "Backups & restore", href: doc("backups") },
        { label: "Changelog", href: `${GITHUB}/blob/main/CHANGELOG.md` },
        // The comparisons are English only, so the German footer leaves them out. One link to the
        // hub rather than one per page: the hub links each of them.
        ...(de ? [] : [{ label: "Compare alternatives", href: COMPARE }]),
      ],
    },
    {
      head: de ? "PROJEKT" : "PROJECT",
      width: "min-w-[150px]",
      links: [
        { label: "GitHub", href: GITHUB },
        { label: "Roadmap", href: `${GITHUB}/issues` },
        { label: de ? "Spezifikation" : "Design spec", href: `${GITHUB}/blob/main/docs/spec/00-overview.md` },
        { label: de ? "Sicherheit" : "Security", href: `${GITHUB}/blob/main/SECURITY.md` },
      ],
    },
    {
      head: de ? "VERTRAUEN" : "TRUST",
      width: "min-w-[180px]",
      links: [
        { label: de ? "Was dein Haus verlässt" : "What leaves your house", href: `${doc("language-model")}#what-leaves-the-house-per-document` },
        { label: de ? "Bedrohungsmodell" : "Threat model", href: `${GITHUB}/blob/main/docs/spec/03-security-hosting.md` },
        { label: de ? "Notfallzugang (Break-Glass)" : "Break-glass access", href: doc("break-glass") },
        { label: de ? "Lizenz (AGPL-3.0)" : "Licence (AGPL-3.0)", href: `${GITHUB}/blob/main/LICENSE` },
      ],
    },
  ];
};

const COPY: Record<Lang, { blurb: string; nav: string; project: string; since: string }> = {
  en: {
    blurb: "The open-source document vault for your household. Organize your records, find what you need, and share a copy.",
    nav: "Footer",
    project: "The Harbor project",
    since: "SELF-HOSTED SINCE DAY ONE",
  },
  de: {
    blurb: "Der quelloffene Dokumententresor für deinen Haushalt. Unterlagen ordnen, schnell wiederfinden und bei Bedarf eine Kopie teilen.",
    nav: "Fußzeile",
    project: "Das Harbor-Projekt",
    since: "SEIT TAG EINS SELBST GEHOSTET",
  },
};

export async function FooterV2({ pricingEnabled = siteConfig.pricingEnabled, lang = "en" }: { pricingEnabled?: boolean; lang?: Lang } = {}) {
  const t = COPY[lang];
  const release = await getLatestRelease();
  const year = new Date().getFullYear();

  return (
    <footer className="flex flex-col gap-[44px] rounded-b-[28px] bg-ground lane pb-[56px] pt-[68px]">
      <div className="flex flex-col items-start justify-between gap-12 lg:flex-row lg:gap-[80px]">
        <div className="flex max-w-[360px] flex-col gap-[14px]">
          <Wordmark mark={24} text="text-[18px] leading-body" />
          <p className="text-body leading-[24px] text-muted">
            {t.blurb}
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-[64px] gap-y-10" aria-label={t.nav}>
          {columns(lang).map((c, i) => (
            <div key={c.head} className={`flex ${c.width} flex-col gap-[12px]`}>
              <span className="pb-[4px] font-mono text-label font-medium leading-[14px] tracking-mono text-faint">
                {c.head}
              </span>
              {[...c.links, ...(pricingEnabled && i === 0 ? [{ label: "Harbor Cloud", href: pricing(lang) }] : [])].map((l) => (
                <Link key={l.label} href={l.href} className="self-start text-body leading-[18px] text-text hover:text-accent">
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>
      </div>

      <div className="flex flex-col justify-between gap-4 border-t border-border pt-[28px] sm:flex-row sm:items-center">
        <span className="text-[13.5px] leading-[18px] text-muted">
          © {year} {t.project} · AGPL-3.0 · github.com/{REPO}
        </span>
        <div className="flex flex-col gap-[12px] sm:flex-row sm:items-center sm:gap-[24px]">
          <LanguageSwitch lang={lang} />
          <span className="font-mono text-[12px] leading-[16px] tracking-[0.06em] text-faint">
            {release ? `${release.tag} · ` : ""}
            {t.since}
          </span>
        </div>
      </div>
    </footer>
  );
}
