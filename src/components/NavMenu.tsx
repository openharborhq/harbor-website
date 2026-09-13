"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * The phone menu. Below md the header's links fold away, and without this there is no way to
 * reach Features or Docs from a phone at all.
 *
 * A panel under the header rather than a drawer over the page, because the docs navigation
 * already opens that way and one site should only have one idea of what a menu does. Like that
 * one, the open flag remembers the page it was opened on, so following a link closes the menu
 * without an effect watching the path.
 */
export function NavMenu({
  links,
  current,
  wide = false,
  children,
}: {
  links: readonly { label: string; href: string; key: string }[];
  current?: string;
  wide?: boolean;
  /** Rows the header cannot fit on a phone either: the GitHub link and the theme control. */
  children?: React.ReactNode;
}) {
  const pathname = usePathname();
  const [openFor, setOpenFor] = useState<string | null>(null);
  const open = openFor === pathname;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenFor(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label="Menu"
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={() => setOpenFor(open ? null : pathname)}
        className="-mr-[8px] flex min-h-[40px] min-w-[40px] items-center justify-center text-text md:hidden"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          {open ? <path d="M4.5 4.5l9 9M13.5 4.5l-9 9" /> : <path d="M2.5 5h13M2.5 9h13M2.5 13h13" />}
        </svg>
      </button>
      <div
        id="site-menu"
        hidden={!open}
        className="absolute inset-x-0 top-full z-40 border-b border-border bg-ground md:hidden"
      >
        <div className={`${wide ? "px-[28px]" : "gutter"} py-[6px]`}>
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={current === l.key ? "page" : undefined}
                  className={`block py-[13px] text-body font-medium leading-[18px] ${current === l.key ? "text-text" : "text-muted"}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          {/* Outside the list: the theme control is a setting, not somewhere to go. */}
          {children && <div className="border-t border-border">{children}</div>}
        </div>
      </div>
    </>
  );
}
