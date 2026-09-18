"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { GITHUB } from "@/lib/github";
import { Wordmark } from "../Logo";
import { DOCS, FEATURES, HOME } from "./routes";

/*
 * The bar that arrives once the hero is behind you.
 *
 * Trigger: the position of a one-pixel sentinel left where this component sits in the flow — drop
 * it after the hero and the bar appears as the hero's floor passes the top of the viewport.
 *
 * `sentinelClassName` exists because the sentinel is a real box in the flow, and in a flex column
 * with a `gap` it collects one gap on each side — 27px of space the layout never asked for. The
 * features page hands it `h-0 ... -mt-[26px]` to cancel its own gap, which leaves the rhythm of
 * the bands untouched and puts the sentinel exactly on the first band's floor. The pill itself is
 * `fixed`, so it is out of flow already and costs nothing wherever it is rendered.
 *
 * This deliberately does NOT use an IntersectionObserver, which was the first attempt. An observer
 * only fires when the intersection ratio crosses a threshold, and a 1px sentinel jumped clean over
 * — by a fast flick, an anchor link, or a restored scroll position — goes from ratio 0 to ratio 0
 * without ever crossing anything. No callback, no bar. It failed with the sentinel 872px above the
 * viewport.
 *
 * A scroll listener is correct in every one of those cases. The cost people avoid it for is a
 * layout read per frame; coalescing through rAF makes that one read per frame at most, on a single
 * element, which is nothing. React bails out of same-value `setState`, so a scroll that does not
 * change the answer costs no render either.
 *
 * It is a small centred pill rather than a bar spanning the page. At full width it competed with
 * the header it replaces; at this size it reads as a control that followed you down, and the
 * sections keep their own edges.
 */
const LINKS = [
  { label: "Features", href: FEATURES },
  { label: "Docs", href: DOCS },
];

export function StickyNav({ sentinelClassName = "h-px w-full" }: { sentinelClassName?: string } = {}) {
  const sentinel = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const el = sentinel.current;
      if (el) setShown(el.getBoundingClientRect().top < 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div ref={sentinel} aria-hidden="true" className={sentinelClassName} />

      <div
        // Hidden from the tab order and from assistive tech while it is off screen: the links in
        // it are duplicates of the header's, and two of everything is worse than one.
        inert={!shown}
        aria-hidden={!shown}
        className={`sticky-nav fixed left-1/2 top-[12px] z-50 flex -translate-x-1/2 items-center gap-[14px] rounded-pill border border-border bg-ground/90 py-[7px] pl-[14px] pr-[7px] shadow-[0_8px_26px_-16px_rgba(13,22,34,0.5)] backdrop-blur-md ${
          shown ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-[180%] opacity-0"
        }`}
      >
        <Link href={HOME} aria-label="Harbor home">
          <Wordmark mark={17} text="text-row leading-[18px]" />
        </Link>

        <nav className="hidden items-center gap-[16px] md:flex" aria-label="Primary">
          {LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-small font-medium leading-[16px] text-muted hover:text-text"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link href={GITHUB} className="flex items-center text-text" aria-label="Harbor on GitHub">
          <svg width="15" height="15" viewBox="0 0 16 16" className="shrink-0" aria-hidden="true">
            <path
              d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38v-1.34C3.8 14.35 3.33 12.8 3.33 12.8c-.36-.93-.89-1.17-.89-1.17-.72-.5.06-.49.06-.49.8.06 1.22.83 1.22.83.71 1.22 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.19c0 .21.145.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8Z"
              fill="currentColor"
            />
          </svg>
        </Link>

        <Link
          href={`${GITHUB}#install`}
          className="rounded-pill bg-text px-[14px] py-[6px] text-small font-semibold leading-[16px] tracking-[-0.01em] text-ground transition-[filter] duration-150 hover:brightness-[1.15]"
        >
          Get started
        </Link>
      </div>
    </>
  );
}
