"use client";

import { useEffect } from "react";

/** Far enough that the page has plainly moved, not merely settled. */
const MOVED = 24;

/**
 * Marks the document once the page has been scrolled, which is what brings the call to action
 * into the phone nav. A root attribute rather than React state, the same way the theme is
 * carried, so the nav around it stays server-rendered and the styling stays in one place.
 */
export function NavScroll() {
  useEffect(() => {
    const root = document.documentElement;
    const onScroll = () => {
      if (window.scrollY > MOVED) root.dataset.scrolled = "";
      else delete root.dataset.scrolled;
    };
    onScroll(); // A reload can restore a position part-way down the page.
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      delete root.dataset.scrolled;
    };
  }, []);
  return null;
}
