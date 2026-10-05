"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import type { Lang } from "@/lib/i18n";
import { Arrow } from "./parts";

/*
 * The phone nav: a burger on the right of the bar, and the site's pages in a panel under it.
 *
 * Below `md` the bar has room for the wordmark and one control, and that control is the way to
 * the other pages rather than GitHub or a second "Get started" — the hero already carries one.
 *
 * The panel is positioned against the nearest positioned ancestor rather than the viewport: the
 * header is `relative`, and the sticky pill is `fixed`, which is also why this is not `fixed`
 * itself — the pill's transform would capture it anyway. Both bars are centred, so centring the
 * panel on its bar centres it on the screen, and `100vw - 48px` is the page's own 24px inset.
 *
 * Like the docs menu, it remembers the path it was opened on, so a navigation closes it without
 * an effect having to watch for one.
 */
export function MobileMenu({
  links,
  size = "lg",
  lang = "en",
}: {
  links: { label: string; href: string }[];
  /** `lg` in the header, beside a 44px row; `sm` in the sticky pill. */
  size?: "lg" | "sm";
  lang?: Lang;
}) {
  const t = lang === "de" ? { open: "Menü öffnen", close: "Menü schließen", nav: "Hauptnavigation" } : { open: "Open menu", close: "Close menu", nav: "Primary" };
  const pathname = usePathname();
  const [openFor, setOpenFor] = useState<string | null>(null);
  const open = openFor === pathname;
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const close = () => setOpenFor(null);
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      close();
      button.current?.focus();
    };
    const onPointer = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) close();
    };
    // Past `md` the burger is gone, and a panel left open behind it would have no way to close.
    const wide = window.matchMedia("(min-width: 768px)");
    const onWide = () => wide.matches && close();
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    wide.addEventListener("change", onWide);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      wide.removeEventListener("change", onWide);
    };
  }, [open]);

  return (
    <div ref={root} className="md:hidden">
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls={id}
        aria-label={open ? t.close : t.open}
        onClick={() => setOpenFor(open ? null : pathname)}
        className={`flex items-center justify-center rounded-pill text-text transition-colors duration-150 hover:bg-surface ${
          size === "lg" ? "h-[44px] w-[44px]" : "h-[30px] w-[30px]"
        } ${open ? "bg-surface" : ""}`}
      >
        <svg width={size === "lg" ? 22 : 18} height={size === "lg" ? 22 : 18} viewBox="0 0 22 22" fill="none" aria-hidden="true">
          {open ? (
            <path d="M5.5 5.5l11 11M16.5 5.5l-11 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          ) : (
            <path d="M3.5 7h15M3.5 15h15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          )}
        </svg>
      </button>

      <nav
        id={id}
        aria-label={t.nav}
        inert={!open}
        className={`absolute left-1/2 top-[calc(100%+8px)] z-50 w-[calc(100vw-48px)] -translate-x-1/2 rounded-[20px] border border-border bg-ground p-[8px] shadow-[0_8px_26px_-16px_rgba(13,22,34,0.5)] transition-[opacity,translate] duration-150 ease-out ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-[6px] opacity-0"
        }`}
      >
        <ul className="flex flex-col">
          {links.map((l) => {
            const current = pathname === l.href || pathname.startsWith(`${l.href}/`);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={current ? "page" : undefined}
                  // A link to the page already open changes no path, so it closes the panel itself.
                  onClick={() => setOpenFor(null)}
                  className={`flex items-center justify-between rounded-[12px] px-[16px] py-[14px] text-copy font-medium leading-[22px] tracking-[-0.01em] hover:bg-surface ${
                    current ? "text-accent" : "text-text"
                  }`}
                >
                  {l.label}
                  <Arrow size={14} />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
