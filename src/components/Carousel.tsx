"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";

const SLIDES = [
  {
    img: "home",
    title: "Home: everyone and everything",
    copy: "The household on one page: each person and each thing you own, with what’s on file and the next date that matters.",
    alt: "Harbor's Home page with the Weber household's people, property and expiring records.",
  },
  {
    img: "inbox",
    title: "Inbox: paperwork arrives already read",
    copy: "Forward an email or drop a file. Harbor reads it, writes a summary, and proposes where it belongs and who it’s for. You confirm with one click.",
    alt: "Harbor's Inbox with a forwarded email, its summary and a proposed filing.",
  },
  {
    img: "todo",
    title: "To do: the bills the vault noticed",
    copy: "A tax bill, a renewal, a form to return: filed documents become a short list grouped by when it’s due, and nothing is deleted once it’s done.",
    alt: "Harbor's To do list grouped by due date, each row linked to its document.",
  },
  {
    img: "document",
    title: "Document: the original, plus what it means",
    copy: "Every page kept as it arrived, beside a plain-English summary, tags, notes, versions, and a record of who changed what.",
    alt: "A document in Harbor: the scanned original beside its summary, tags and notes.",
  },
];

const pad2 = (n: number) => String(n).padStart(2, "0");

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * One full slide plus a quarter of the next, as in the design: 1000px slides on a track that
 * starts at the page gutter. The track is a real scroll container so trackpads and touch work;
 * the buttons and dots just scroll it.
 *
 * Accessibility follows the WAI-ARIA tabbed-carousel pattern: the dots are a tablist with roving
 * focus and arrow-key movement, each slide is the tabpanel they control.
 */
export function Carousel() {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const settleTimer = useRef<number | null>(null);
  const id = useId();
  const tabId = (i: number) => `${id}-tab-${i}`;
  const panelId = (i: number) => `${id}-panel-${i}`;

  const go = useCallback((i: number) => {
    const el = trackRef.current;
    const next = Math.max(0, Math.min(SLIDES.length - 1, i));
    setIndex(next);
    const slide = el?.children[next] as HTMLElement | undefined;
    if (el && slide) {
      el.scrollTo({
        left: slide.offsetLeft - parseFloat(getComputedStyle(el).paddingLeft),
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });
    }
  }, []);

  // Keep the caption in step when the user drags the track instead of pressing the arrows.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      if (settleTimer.current) window.clearTimeout(settleTimer.current);
      settleTimer.current = window.setTimeout(() => {
        const pad = parseFloat(getComputedStyle(el).paddingLeft);
        let best = 0;
        let bestDist = Infinity;
        Array.from(el.children).forEach((c, i) => {
          const d = Math.abs((c as HTMLElement).offsetLeft - pad - el.scrollLeft);
          if (d < bestDist) {
            bestDist = d;
            best = i;
          }
        });
        setIndex(best);
      }, 80);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (settleTimer.current) window.clearTimeout(settleTimer.current);
    };
  }, []);

  // Left/Right/Home/End on the dots move the selection and keep focus on the active dot.
  const onTabKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const last = SLIDES.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowRight") next = index === last ? 0 : index + 1;
    else if (e.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    go(next);
    tabRefs.current[next]?.focus();
  };

  const current = SLIDES[index];
  const atStart = index === 0;
  const atEnd = index === SLIDES.length - 1;

  return (
    <section id="inside" className="flex flex-col gap-[36px] border-y border-border bg-surface pb-[112px] pt-[104px]">
      <div className="gutter flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <div className="flex max-w-[640px] flex-col gap-[22px]">
          <span className="font-mono text-[12px] font-medium leading-[16px] tracking-mono text-faint">A LOOK INSIDE</span>
          <h2 className="text-section-head font-bold leading-section-head tracking-tight text-text">See how Harbor works</h2>
        </div>
        <div className="flex items-center gap-[18px]">
          <div className="flex items-center" role="tablist" aria-label="Screens" onKeyDown={onTabKeyDown}>
            {SLIDES.map((s, i) => {
              const selected = i === index;
              return (
                <button
                  key={s.img}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={tabId(i)}
                  aria-selected={selected}
                  aria-controls={panelId(i)}
                  aria-label={s.title}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => go(i)}
                  className="group flex h-[40px] items-center px-[4px]"
                >
                  <span
                    aria-hidden="true"
                    className={`block h-[6px] rounded-pill transition-all ${selected ? "w-[22px] bg-text" : "w-[6px] bg-border-strong group-hover:bg-faint"}`}
                  />
                </button>
              );
            })}
          </div>
          <div className="flex gap-[8px]">
            <ArrowButton dir="prev" disabled={atStart} onClick={() => go(index - 1)} />
            <ArrowButton dir="next" disabled={atEnd} onClick={() => go(index + 1)} />
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        className="no-scrollbar gutter flex w-full snap-x snap-mandatory gap-[24px] overflow-x-auto [scroll-padding-inline:var(--gutter)]"
        aria-roledescription="carousel"
        aria-label="Screens from Harbor"
      >
        {SLIDES.map((s, i) => (
          <figure
            key={s.img}
            id={panelId(i)}
            role="tabpanel"
            aria-labelledby={tabId(i)}
            className="w-[min(1000px,calc(100vw-40px))] shrink-0 snap-start overflow-hidden rounded-[14px] border border-border bg-ground"
            aria-roledescription="slide"
          >
            <Image
              src={`/mock/slide-${s.img}@2x.png`}
              alt={s.alt}
              width={1000}
              height={720}
              sizes="(min-width: 1040px) 1000px, calc(100vw - 40px)"
              className="block h-auto w-full"
              priority={i === 0}
            />
          </figure>
        ))}
      </div>

      <div className="gutter flex items-start justify-between gap-8">
        <div className="flex min-w-0 items-start gap-[16px]" aria-live="polite">
          <span className="w-[28px] shrink-0 pt-[5px] font-mono text-[12px] font-medium leading-[16px] tracking-mono text-accent">{pad2(index + 1)}</span>
          <div className="flex min-w-0 max-w-[720px] flex-col gap-[6px]">
            <h3 className="font-title text-[20px] leading-[24px] tracking-snug text-text">{current.title}</h3>
            <p className="text-[16px] leading-section text-muted">{current.copy}</p>
          </div>
        </div>
        <span className="shrink-0 pt-[5px] font-mono text-[12px] font-medium leading-[16px] tracking-mono text-faint">
          {pad2(index + 1)} / {pad2(SLIDES.length)}
        </span>
      </div>
    </section>
  );
}

function ArrowButton({ dir, disabled, onClick }: { dir: "prev" | "next"; disabled: boolean; onClick: () => void }) {
  // In the design the live arrow is ink on ink, the dead one is a hairline circle.
  const live = !disabled;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "prev" ? "Previous screen" : "Next screen"}
      className={`flex h-[40px] w-[40px] items-center justify-center rounded-pill transition-colors ${live ? "bg-text text-ground" : "border border-border bg-ground text-border-strong"}`}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className="shrink-0" aria-hidden="true">
        <path d={dir === "prev" ? "M10 3L5 8l5 5" : "M6 3l5 5-5 5"} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
