"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ALL_PAGES, NAV } from "@/content/docs/nav";

/** The left navigation: every page, grouped by section, the current one marked. */
export function DocsNav() {
  const pathname = usePathname();
  // The phone menu remembers which page it was opened on, so a navigation closes it by itself.
  const [openFor, setOpenFor] = useState<string | null>(null);
  const open = openFor === pathname;
  const current = ALL_PAGES.find((p) => p.href === pathname);

  return (
    <nav className="docs-nav" aria-label="Documentation">
      <button
        type="button"
        className="docs-nav-toggle"
        aria-expanded={open}
        aria-controls="docs-nav-list"
        onClick={() => setOpenFor(open ? null : pathname)}
      >
        <span className="docs-nav-toggle-label">Docs</span>
        <span className="docs-nav-toggle-current">{current?.title ?? "Menu"}</span>
        <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="docs-nav-toggle-icon">
          <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div id="docs-nav-list" className="docs-nav-list" data-open={open || undefined}>
        {NAV.map((s) => (
          <div key={s.section} className="docs-nav-section">
            <p className="docs-nav-heading">{s.section}</p>
            <ul>
              {s.pages.map((p) => {
                const active = p.href === pathname;
                return (
                  <li key={p.slug}>
                    <Link href={p.href} aria-current={active ? "page" : undefined} className="docs-nav-link">
                      {p.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
