import Link from "next/link";
import { formatStars, getStars, GITHUB } from "@/lib/github";
import { Wordmark } from "./Logo";
import { NavMenu } from "./NavMenu";
import { NavScroll } from "./NavScroll";
import { ThemeToggle } from "./ThemeToggle";

export { GITHUB };

const LINKS = [
  { label: "Features", href: "/features", key: "features" },
  { label: "Docs", href: "/docs", key: "docs" },
] as const;

export type NavKey = (typeof LINKS)[number]["key"];

/**
 * Below this the count says less than the plain link does. Raise or lower it as the project
 * grows; the number itself always comes from GitHub, never from this file.
 */
const STARS_FLOOR = 50;

export async function Nav({ current, wide = false }: { current?: NavKey; wide?: boolean } = {}) {
  const stars = await getStars();
  const showStars = stars !== null && stars >= STARS_FLOOR;

  return (
    // Pinned to the top on a phone, where the call to action is only in reach if the bar stays
    // put. Left in the flow above md, where the page has room to carry it.
    <header className={`${wide ? "px-[28px] md:px-[36px]" : "gutter"} relative flex items-center justify-between border-b border-border py-[26px] max-md:sticky max-md:top-0 max-md:z-50 max-md:bg-ground`}>
      <NavScroll />
      <Link href="/" aria-label="Harbor home">
        <Wordmark />
      </Link>
      {/* Below md the links, GitHub and the theme control fold into the burger, so the wordmark,
          the pill and the burger still sit on one line on a 390px phone. Anything more and "Get
          started" wraps. */}
      <nav className="flex items-center gap-[14px] md:gap-[34px]" aria-label="Primary">
        {LINKS.map((l) => (
          <Link
            key={l.label}
            href={l.href}
            aria-current={current === l.key ? "page" : undefined}
            className={`hidden text-body font-medium leading-[18px] hover:text-text md:block ${current === l.key ? "text-text" : "text-muted"}`}
          >
            {l.label}
          </Link>
        ))}
        <span className="hidden md:block">
          <ThemeToggle />
        </span>
        <Link
          href={GITHUB}
          className="hidden min-h-[40px] items-center gap-[8px] text-text md:flex"
          aria-label={showStars ? `Harbor on GitHub, ${formatStars(stars)} stars` : "Harbor on GitHub"}
        >
          <GitHubIcon />
          <span className="font-mono text-small font-medium leading-[16px]">{showStars ? formatStars(stars) : "GitHub"}</span>
        </Link>
        {/* Held back until the page moves — see nav-cta in globals.css. It grows leftwards into
            empty bar, so the burger it appears beside does not shift. */}
        <Link href={`${GITHUB}#install`} className="nav-cta rounded-pill bg-text px-[20px] py-[11px] text-row font-semibold leading-[18px] tracking-[-0.01em] text-ground">
          Get started
        </Link>
        <NavMenu links={LINKS} current={current} wide={wide}>
          {/* The mark alone carries the link in the bar above md; in the menu there is room to say
              what it is, and to spell the star count out. */}
          <Link href={GITHUB} className="flex items-center gap-[10px] py-[13px] text-body font-medium leading-[18px] text-muted">
            <GitHubIcon />
            GitHub
            {showStars && <span className="font-mono text-small leading-[16px] text-faint">{formatStars(stars)}</span>}
          </Link>
          {/* The control cycles in place: changing the theme is not a reason to close the menu. */}
          <div className="flex items-center justify-between border-t border-border py-[6px]">
            <span className="text-body font-medium leading-[18px] text-muted">Theme</span>
            <ThemeToggle />
          </div>
        </NavMenu>
      </nav>
    </header>
  );
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className="shrink-0" aria-hidden="true">
      <path
        d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38v-1.34C3.8 14.35 3.33 12.8 3.33 12.8c-.36-.93-.89-1.17-.89-1.17-.72-.5.06-.49.06-.49.8.06 1.22.83 1.22.83.71 1.22 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.19c0 .21.145.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8Z"
        fill="currentColor"
      />
    </svg>
  );
}
