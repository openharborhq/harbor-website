"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { TrackedLink } from "@/components/TrackedLink";
import { useEffect, useRef, useState } from "react";
import { Wordmark } from "../Logo";
import { MobileMenu } from "./MobileMenu";
import type { Lang } from "@/lib/i18n";
import { NAV_COPY, navLinks } from "./navLinks";
import { doc, home } from "./routes";

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
export function StickyNav({
  sentinelClassName = "h-px w-full",
  pricingEnabled = siteConfig.pricingEnabled,
  lang = "en",
}: { sentinelClassName?: string; pricingEnabled?: boolean; lang?: Lang } = {}) {
  const links = navLinks(lang, pricingEnabled);
  const t = NAV_COPY[lang];
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
        <Link href={home(lang)} aria-label={t.home}>
          <Wordmark mark={17} text="text-row leading-[18px]" />
        </Link>

        <nav className="hidden items-center gap-[16px] md:flex" aria-label="Primary">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-small font-medium leading-[16px] text-muted hover:text-text"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <MobileMenu links={links} size="sm" lang={lang} />

        {/* Where the GitHub mark sat: kept empty, so Get started stays set in from the bar's last link. */}
        <span aria-hidden="true" className="hidden w-[15px] shrink-0 md:block" />

        <TrackedLink
          href={doc("install")}
          analyticsEvent="installation_guide_opened"
          analyticsProperties={{ placement: "sticky_nav" }}
          className="hidden rounded-pill bg-text px-[14px] py-[6px] md:block text-small font-semibold leading-[16px] tracking-[-0.01em] text-ground transition-[filter] duration-150 hover:brightness-[1.15]"
        >
          {t.start}
        </TrackedLink>
      </div>
    </>
  );
}
