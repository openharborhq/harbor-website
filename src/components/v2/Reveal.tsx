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

    const targets = document.querySelectorAll<HTMLElement>("[data-reveal], [data-reveal-group]");
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.shown = "";
          io.unobserve(entry.target);
        }
      },
      // A little short of the bottom edge, so a section builds as it arrives rather than the
      // instant its first pixel appears.
      { rootMargin: "0px 0px -12% 0px", threshold: 0.01 },
    );

    for (const el of targets) io.observe(el);
    return () => io.disconnect();
  }, []);

  return null;
}
