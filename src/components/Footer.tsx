import Link from "next/link";
import { Wordmark } from "./Logo";
import { GITHUB } from "./Nav";

const COLUMNS: { head: string; width: string; links: { label: string; href: string }[] }[] = [
  {
    head: "PRODUCT",
    width: "w-[150px]",
    links: [
      { label: "Features", href: "#features" },
      { label: "Self-hosting guide", href: `${GITHUB}#install` },
      { label: "Backups & restore", href: `${GITHUB}/blob/main/docs/backups.md` },
      { label: "Changelog", href: `${GITHUB}/releases` },
    ],
  },
  {
    head: "PROJECT",
    width: "w-[150px]",
    links: [
      { label: "GitHub", href: GITHUB },
      { label: "Roadmap", href: `${GITHUB}/issues` },
      { label: "Contributing", href: `${GITHUB}/blob/main/CONTRIBUTING.md` },
      { label: "Security", href: `${GITHUB}/blob/main/SECURITY.md` },
    ],
  },
  {
    head: "TRUST",
    width: "w-[180px]",
    links: [
      { label: "What leaves your house", href: `${GITHUB}/blob/main/docs/what-leaves-your-house.md` },
      { label: "Threat model", href: `${GITHUB}/blob/main/docs/threat-model.md` },
      { label: "Break-glass access", href: `${GITHUB}/blob/main/docs/break-glass.md` },
      { label: "Licence (AGPL-3.0)", href: `${GITHUB}/blob/main/LICENSE` },
    ],
  },
];

export function Footer() {
  return (
    <footer className="gutter flex flex-col gap-[44px] bg-ground pb-[56px] pt-[68px]">
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
                <Link key={l.label} href={l.href} className="w-max text-body leading-[18px] text-text hover:text-accent">
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>
      </div>
      <div className="flex flex-col justify-between gap-3 border-t border-border pt-[28px] sm:flex-row sm:items-center">
        <span className="text-[13.5px] leading-[18px] text-muted">© 2026 The Harbor project · AGPL-3.0 · github.com/openharborhq/harbor</span>
        <span className="font-mono text-[12px] leading-[16px] tracking-[0.06em] text-faint">v0.4.1 · SELF-HOSTED SINCE DAY ONE</span>
      </div>
    </footer>
  );
}
