import Link from "next/link";
import { GITHUB } from "@/lib/github";
import { Wordmark } from "../Logo";
import { GitHubIcon } from "./parts";
import { DOCS, FEATURES, HOME } from "./routes";

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
const LINKS = [
  { label: "Features", href: FEATURES },
  { label: "Docs", href: DOCS },
];

export function NavV2() {
  return (
    <header className="flex items-center justify-center bg-ground px-[24px] py-[16px] md:px-[60px]">
      <div className="flex w-full items-center justify-between gap-[24px]">
        <div className="flex items-center gap-[24px] md:gap-[44px]">
          <Link href={HOME} aria-label="Harbor home">
            <Wordmark />
          </Link>
          <nav className="hidden items-center gap-[32px] md:flex" aria-label="Primary">
            {LINKS.map((l) => (
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

        <div className="flex items-center gap-[18px] md:gap-[26px]">
          <Link href={GITHUB} className="flex items-center gap-[8px] text-text" aria-label="Harbor on GitHub">
            <GitHubIcon />
            <span className="hidden font-mono text-row font-medium leading-[18px] sm:block">GitHub</span>
          </Link>
          <Link
            href={`${GITHUB}#install`}
            className="rounded-pill bg-text px-[22px] py-[12px] text-body font-semibold leading-[20px] tracking-[-0.01em] text-ground"
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}
