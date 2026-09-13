import Link from "next/link";
import { getLatestRelease, GITHUB, REPO } from "@/lib/github";
import { Wordmark } from "./Logo";

/*
 * Guides live on this site under /docs. Every GitHub href below resolves to a file that exists on
 * main today; if a page moves in the repo, change it here, never link to a document it lacks.
 */
const COLUMNS: { head: string; width: string; links: { label: string; href: string }[] }[] = [
  {
    head: "PRODUCT",
    width: "min-w-[150px]",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Install and deploy", href: "/docs/install" },
      { label: "Backups & restore", href: "/docs/backups-and-restore" },
      { label: "Changelog", href: `${GITHUB}/blob/main/CHANGELOG.md` },
    ],
  },
  {
    head: "PROJECT",
    width: "min-w-[150px]",
    links: [
      { label: "GitHub", href: GITHUB },
      { label: "Roadmap", href: `${GITHUB}/issues` },
      { label: "Design spec", href: `${GITHUB}/blob/main/docs/spec/00-overview.md` },
      { label: "Security", href: `${GITHUB}/blob/main/SECURITY.md` },
    ],
  },
  {
    head: "TRUST",
    width: "min-w-[180px]",
    links: [
      { label: "What leaves your house", href: "/docs/using-harbor#what-leaves-the-house" },
      { label: "Threat model", href: `${GITHUB}/blob/main/docs/spec/03-security-hosting.md` },
      { label: "Break-glass access", href: "/docs/backups-and-restore#the-break-glass-envelope" },
      { label: "Licence (AGPL-3.0)", href: `${GITHUB}/blob/main/LICENSE` },
    ],
  },
];

export async function Footer({ wide = false }: { wide?: boolean } = {}) {
  const release = await getLatestRelease();
  const year = new Date().getFullYear();

  return (
    <footer className={`${wide ? "px-[28px] md:px-[36px]" : "gutter"} flex flex-col gap-[44px] bg-ground pb-[56px] pt-[68px]`}>
      <div className="flex flex-col items-start justify-between gap-12 lg:flex-row lg:gap-[80px]">
        <div className="flex max-w-[360px] flex-col gap-[14px]">
          <Wordmark mark={24} text="text-[18px] leading-body" />
          <p className="text-body leading-[24px] text-muted">
            Everything that matters, safely together, on a machine you own. Built in the open by people who wanted it
            for their own households.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-[64px] gap-y-10" aria-label="Footer">
          {COLUMNS.map((c) => (
            <div key={c.head} className={`flex ${c.width} flex-col gap-[12px]`}>
              <span className="pb-[4px] font-mono text-label font-medium leading-[14px] tracking-mono text-faint">{c.head}</span>
              {c.links.map((l) => (
                <Link key={l.label} href={l.href} className="self-start text-body leading-[18px] text-text hover:text-accent">
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>
      </div>
      <div className="flex flex-col justify-between gap-3 border-t border-border pt-[28px] sm:flex-row sm:items-center">
        <span className="text-[13.5px] leading-[18px] text-muted">
          © {year} The Harbor project · AGPL-3.0 · github.com/{REPO}
        </span>
        <span className="font-mono text-[12px] leading-[16px] tracking-[0.06em] text-faint">
          {release ? (
            <>
              <Link href={release.url} className="text-text hover:text-accent">
                {release.tag}
              </Link>
              {" · "}
            </>
          ) : null}
          SELF-HOSTED SINCE DAY ONE
        </span>
      </div>
    </footer>
  );
}
