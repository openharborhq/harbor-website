"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/content/docs/nav";

function useActiveHeading(items: TocItem[]) {
  const [active, setActive] = useState<string | null>(items[0]?.id ?? null);
  useEffect(() => {
    if (!items.length) return;
    const headings = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    let ticking = false;
    const measure = () => {
      ticking = false;
      let current = headings[0]?.id ?? null;
      for (const h of headings) {
        if (h.getBoundingClientRect().top <= 120) current = h.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(measure);
      }
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);
  return active;
}

function TocList({ items, active }: { items: TocItem[]; active: string | null }) {
  return (
    <ul className="docs-toc-list">
      {items.map((i) => (
        <li key={i.id} data-depth={i.depth}>
          <a href={`#${i.id}`} aria-current={i.id === active ? "location" : undefined} className="docs-toc-link">
            {i.text}
          </a>
        </li>
      ))}
    </ul>
  );
}

/** On this page, in the right column on wide screens: the headings, the one on screen marked. */
export function Toc({ items }: { items: TocItem[] }) {
  const active = useActiveHeading(items);
  if (items.length < 2) return <div className="docs-toc" aria-hidden="true" />;
  return (
    <aside className="docs-toc" aria-label="On this page">
      <p className="docs-toc-heading">On this page</p>
      <TocList items={items} active={active} />
    </aside>
  );
}

/** The same list folded under the page description where the right column does not fit. */
export function TocMobile({ items }: { items: TocItem[] }) {
  const active = useActiveHeading(items);
  if (items.length < 2) return null;
  return (
    <details className="docs-toc-mobile">
      <summary>On this page</summary>
      <TocList items={items} active={active} />
    </details>
  );
}
