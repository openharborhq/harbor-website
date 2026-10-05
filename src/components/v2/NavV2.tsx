import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { TrackedLink } from "@/components/TrackedLink";
import { GITHUB } from "@/lib/github";
import { Wordmark } from "../Logo";
import { MobileMenu } from "./MobileMenu";
import { GitHubIcon } from "./parts";
import type { Lang } from "@/lib/i18n";
import { NAV_COPY, navLinks } from "./navLinks";
import { doc, home } from "./routes";

/*
 * The v2 bar: brand and links together on the left, account on the right.
 *
 * No bottom rule. The hero band beneath it is `surface` against the page's white, and that step
 * already draws the line a border would; with both, the bar read as a separate strip sitting on
 * the page rather than part of it.
 *
 * The theme control is not here — it moved to the footer, where a setting changed once belongs.
 * This is a copy of the live nav rather than a shared component because `/` still wants the
 * centred version with its rule and its star count.
 */
export function NavV2({ pricingEnabled = siteConfig.pricingEnabled, lang = "en" }: { pricingEnabled?: boolean; lang?: Lang } = {}) {
  const links = navLinks(lang, pricingEnabled);
  const t = NAV_COPY[lang];

  return (
    // `relative` so the phone menu's panel hangs from the bar.
    <header className="relative flex items-center justify-center bg-ground px-[24px] py-[16px] md:px-[60px]">
      <div className="flex w-full items-center justify-between gap-[24px]">
        <div className="flex items-center gap-[24px] md:gap-[44px]">
          <Link href={home(lang)} aria-label={t.home}>
            <Wordmark />
          </Link>
          <nav className="hidden items-center gap-[32px] md:flex" aria-label="Primary">
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-copy font-medium leading-[22px] tracking-[-0.01em] text-muted hover:text-text"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* On a phone the burger stands in for both: the hero carries its own "Get started", and
            GitHub is a footer link away. */}
        <MobileMenu links={links} lang={lang} />
        <div className="hidden items-center gap-[26px] md:flex">
          <TrackedLink
            href={GITHUB}
            analyticsEvent="github_repository_opened"
            analyticsProperties={{ placement: "header" }}
            className="flex items-center gap-[8px] text-text"
            aria-label={t.github}
          >
            <GitHubIcon />
            <span className="hidden font-mono text-row font-medium leading-[18px] sm:block">GitHub</span>
          </TrackedLink>
          <TrackedLink
            href={doc("install")}
            analyticsEvent="installation_guide_opened"
            analyticsProperties={{ placement: "header" }}
            className="rounded-pill bg-text px-[22px] py-[12px] text-body font-semibold leading-[20px] tracking-[-0.01em] text-ground"
          >
            {t.start}
          </TrackedLink>
        </div>
      </div>
    </header>
  );
}
