"use client";

import { useEffect } from "react";

/**
 * Marks anything carrying `data-reveal` as shown the first time it enters the viewport.
 *
 * One observer for the whole page rather than a client island per section: the sections stay
 * server components, and adding the effect to one is an attribute rather than a wrapper.
 *
 * The hidden state is armed before paint by the script in the layout, not by this component, so
 * there is no flash of built content on the way in and — more importantly — no way for a page to
 * end up permanently blank if this never runs. If the attribute is missing, every rule that hides
 * anything simply does not match.
 *
 * An IntersectionObserver is right here in a way it was not for the sticky nav's one-pixel
 * sentinel: these are whole sections, and an observer delivers an initial callback for every
 * target it is given, so anything already on screen — after a jump, a refresh partway down, or an
 * anchor link — is shown on the first tick rather than waiting for a threshold it already crossed.
 */
export function Reveal() {
  useEffect(() => {
    if (document.documentElement.dataset.reveal !== "armed") return;

    // Scoped to the body: <html> carries data-reveal="armed" to arm the effect, so an unscoped
    // query matches the document element itself and hands the observer the whole page as a target.
    const targets = document.body.querySelectorAll<HTMLElement>("[data-reveal], [data-reveal-group]");
    if (!targets.length) return;

    let io: IntersectionObserver | undefined;
    let raf = 0;

    const observe = () => {
      io = new IntersectionObserver(
        (entries, self) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            (entry.target as HTMLElement).dataset.shown = "";
            self.unobserve(entry.target);
          }
        },
        // A little short of the bottom edge, so a section builds as it arrives rather than the
        // instant its first pixel appears.
        { rootMargin: "0px 0px -12% 0px", threshold: 0.01 },
      );
      for (const el of targets) io.observe(el);
    };

    /*
     * Nothing is observed until the page has finished loading.
     *
     * Every position this depends on is only meaningful once the layout has settled. Observe while
     * images are still reserving their space and the webfont has yet to swap, and the sections are
     * all still stacked near the top of a much shorter document: they intersect together, they are
     * all marked shown together, and not one of them ever animates. The effect does not fail
     * loudly when that happens — it silently does nothing, permanently, which is the worst way for
     * it to fail and the hardest to tell apart from "the animation is too subtle".
     *
     * A frame after `load`, so what gets measured is the final layout rather than the last one
     * before it.
     */
    const start = () => {
      raf = requestAnimationFrame(observe);
    };

    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });

    return () => {
      window.removeEventListener("load", start);
      if (raf) cancelAnimationFrame(raf);
      io?.disconnect();
    };
  }, []);

  return null;
}
