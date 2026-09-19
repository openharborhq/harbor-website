"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import posthog from "posthog-js";
import { useCallback, useEffect, useRef, useState } from "react";

/*
 * The hero demo: a still of the app that plays a scripted run when pressed.
 *
 * Everything here is traced from the real application, not invented — apps/web's Sidebar,
 * SignInForm, InboxCard and TaskRow. Where this file and the app disagree, the app is right.
 * The specifics that matter:
 *
 *   - the nav is seven items including Shared, at h-[34px] with an 18px stroked icon, and the
 *     active row is `bg-accent-soft text-accent font-semibold`;
 *   - the Inbox badge is a count pill, and To do's is `danger` because it means overdue;
 *   - signing in is two steps — password, then the authenticator — and the first button says
 *     "Continue", not anything friendlier;
 *   - an Inbox card is a thumbnail, a summary, a "File to" category and a "For" item, and the
 *     to-dos in the last beat exist because "…and remind me to" is ticked when the card is filed.
 *     That checkbox is the mechanism, so the demo shows it rather than implying magic.
 *
 * Drawn in the DOM rather than recorded: it stays sharp at any width, follows the theme tokens,
 * weighs nothing, and can be corrected in a text editor when the product moves.
 */
/** The walkthrough's full length. Every scene is scheduled against this one clock. */
const DURATION = 46;

const SCENES: { at: number; label: string }[] = [
  { at: 0, label: "Sign in" },
  { at: 3.2, label: "Verify" },
  { at: 5.3, label: "Home" },
  { at: 13.6, label: "Inbox" },
  { at: 24.9, label: "To do" },
  { at: 27.8, label: "Search" },
  { at: 36.6, label: "Share" },
];

const clock = (t: number) => `0:${String(Math.floor(t)).padStart(2, "0")}`;

/**
 * The stage is authored at a fixed size and scaled to fit, rather than laid out in percentages.
 *
 * That is what keeps the pointer honest. Its positions are percentages of the stage, but the
 * stage's contents are fixed pixels — the sidebar is 186px at any size — so on a wider hero the
 * sidebar takes a smaller *fraction*, and a percentage that pointed at the Inbox row at one width
 * lands to the right of it at another. Pinning the design size makes every coordinate inside
 * absolute, and a single transform handles every viewport.
 *
 * There are two independent levers here and they are worth keeping apart.
 *
 * The frame's width scales the whole thing uniformly and costs nothing: the pointer's positions
 * are percentages of the stage and the stage is a single transform, so the track survives any
 * width. The frame is capped at 960 rather than the column's 1200 for exactly that reason — it
 * was a third larger than anything else on the page.
 *
 * STAGE_W is the other lever, and it is not free. It decides how much app fits in the frame
 * rather than how big the frame is, so changing it reflows every fixed-pixel element inside and
 * invalidates all thirteen pointer coordinates — which is how an earlier 880 and 550 produced
 * eight straight misses. Raise it only with a re-measure.
 *
 * 750 × 455 puts the stage at 1.28× in a 960 frame. An earlier 550 was taken from an 881px-wide measuring session and blew the
 * app up 2.18× on a real page. The aspect matches the screenshot the window is sized from
 * (2640 × 1600).
 */
const STAGE_W = 750;
const STAGE_H = 455;

export function HeroDemo() {
  const [started, setStarted] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const fit = () => el.style.setProperty("--hd-scale", String(el.clientWidth / STAGE_W));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={root}
      className="hd-root relative mx-auto w-full max-w-[960px] overflow-hidden rounded-[14px] bg-panel shadow-[0_2px_6px_-2px_rgba(13,22,34,0.12),0_28px_64px_-24px_rgba(13,22,34,0.34)]"
    >
      <Image
        src="/mock/hero-home@2x.png"
        alt="Harbor's Home page: four family members and four items, each with its record count and what expires next."
        width={2640}
        height={1600}
        priority
        sizes="(max-width: 1440px) 100vw, 1200px"
        className={`block h-auto w-full transition-opacity duration-500 ${started ? "opacity-0" : "opacity-100"}`}
      />

      {!started && (
        <button
          type="button"
          onClick={() => {
            if (process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN && process.env.NEXT_PUBLIC_POSTHOG_HOST) {
              posthog.capture("product_walkthrough_started", { placement: "homepage_hero" });
            }
            setStarted(true);
          }}
          aria-label="Play a walkthrough of Harbor"
          className="hd-play absolute inset-0 flex items-center justify-center"
        >
          <span className="flex items-center gap-[10px] rounded-pill bg-text/90 px-[22px] py-[14px] text-body font-semibold text-ground backdrop-blur-sm transition-transform duration-200 ease-out">
            <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" aria-hidden="true">
              <path d="M1.5 1.3v13.4a.6.6 0 0 0 .92.5l10.6-6.7a.6.6 0 0 0 0-1l-10.6-6.7a.6.6 0 0 0-.92.5Z" />
            </svg>
            See it work
          </span>
        </button>
      )}

      {started && <Walkthrough />}
    </div>
  );
}

/**
 * The run, plus a transport for it.
 *
 * The scenes are CSS animations, which the Web Animations API also exposes: every one of them
 * turns up in `getAnimations({ subtree: true })` with a `currentTime`, a `pause()` and a `play()`.
 * Because they all start together and encode their position in the timeline as `animation-delay`,
 * writing the same `currentTime` to all of them lands an exact composite frame — which is what
 * makes scrubbing possible without rebuilding any of this in JavaScript.
 *
 * `hd-clock` is an empty animation the full length of the run, used only as the thing to read
 * the time off, so the readout never depends on whichever animation happens to come back first.
 * It is also the authority when resuming — see `toggle`.
 */
function Walkthrough() {
  const stage = useRef<HTMLDivElement>(null);
  const clockEl = useRef<HTMLSpanElement>(null);
  const [playing, setPlaying] = useState(true);
  const [time, setTime] = useState(0);

  const all = useCallback(() => stage.current?.getAnimations({ subtree: true }) ?? [], []);

  /* Follow the clock while it runs, and stop the transport when it reaches the end. */
  useEffect(() => {
    let frame = 0;
    const tick = () => {
      const a = clockEl.current?.getAnimations()[0];
      const t = typeof a?.currentTime === "number" ? a.currentTime / 1000 : 0;
      setTime(Math.min(t, DURATION));
      if (t >= DURATION) setPlaying(false);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const seek = useCallback(
    (t: number) => {
      const next = Math.min(Math.max(t, 0), DURATION);
      for (const a of all()) a.currentTime = next * 1000;
      setTime(next);
    },
    [all],
  );

  /** The clock is the authority on where the run is, not React state a frame behind it. */
  const now = useCallback(() => {
    const a = clockEl.current?.getAnimations()[0];
    return typeof a?.currentTime === "number" ? Math.min(a.currentTime / 1000, DURATION) : time;
  }, [time]);

  const toggle = useCallback(() => {
    const next = !playing;
    // Restart from the top if the run already finished, so the button is never a no-op.
    const from = next && now() >= DURATION ? 0 : now();

    for (const a of all()) {
      if (!next) {
        a.pause();
        continue;
      }
      /*
       * play() first, then the time again after it — not the other way round.
       *
       * Almost every animation here is a short one parked at a long `animation-delay`, so anywhere
       * past the opening seconds most of them have already finished. The Web Animations API
       * rewinds a finished animation to zero when you play() it, and that put 73 of 83 back at the
       * start while the clock — as long as the whole run, so never finished, so never rewound —
       * carried on reporting the right time. The readout stayed correct and the picture did not:
       * pausing at 40s and pressing play brought the sign-in screen back over the app.
       *
       * Re-asserting the time after play() costs nothing and cannot drift: an animation set past
       * its own end simply reports finished again, which is what it was.
       */
      a.play();
      a.currentTime = from * 1000;
    }

    setTime(from);
    setPlaying(next);
  }, [all, playing, now]);

  /*
   * Stepping is relative to the clock, not to `time`.
   *
   * `time` is React state refreshed once per frame, so two key presses inside one frame both read
   * the same base and the second overwrites the first instead of adding to it: eight presses of
   * shift-right moved the run five seconds rather than forty.
   */
  const nudge = useCallback((delta: number) => seek(now() + delta), [seek, now]);

  const scene = [...SCENES].reverse().find((s) => time >= s.at)?.label ?? SCENES[0].label;

  return (
    <>
      <div ref={stage} className="hd-run absolute inset-0 overflow-hidden bg-ground" aria-hidden="true">
        <span ref={clockEl} className="hd-clock absolute left-0 top-0 block size-px opacity-0" />
        {/* Fixed 750×455, scaled by --hd-scale to whatever width the hero is. Everything inside
            is absolute pixels, so the pointer's percentages mean the same thing at any viewport. */}
        <div
          className="hd-stage absolute left-0 top-0 origin-top-left"
          style={{ width: STAGE_W, height: STAGE_H }}
        >
          <SignIn />
          <Totp />
          <App />
          <Cursor />
        </div>
      </div>
      <Transport playing={playing} time={time} scene={scene} onToggle={toggle} onSeek={seek} onNudge={nudge} />
    </>
  );
}

function Transport({
  playing,
  time,
  scene,
  onToggle,
  onSeek,
  onNudge,
}: {
  playing: boolean;
  time: number;
  scene: string;
  onToggle: () => void;
  onSeek: (t: number) => void;
  onNudge: (delta: number) => void;
}) {
  const track = useRef<HTMLDivElement>(null);

  const seekFromPointer = (clientX: number) => {
    const r = track.current?.getBoundingClientRect();
    if (!r) return;
    onSeek(((clientX - r.left) / r.width) * DURATION);
  };

  return (
    <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-text/90 px-4 py-2.5 backdrop-blur-sm">
      <button
        type="button"
        onClick={onToggle}
        aria-label={playing ? "Pause the walkthrough" : "Play the walkthrough"}
        className="flex size-[22px] shrink-0 items-center justify-center rounded-pill text-ground"
      >
        {playing ? (
          <svg width="11" height="12" viewBox="0 0 12 14" fill="currentColor" aria-hidden="true">
            <rect x="1" y="1" width="3.4" height="12" rx="1" />
            <rect x="7.6" y="1" width="3.4" height="12" rx="1" />
          </svg>
        ) : (
          <svg width="11" height="12" viewBox="0 0 12 14" fill="currentColor" aria-hidden="true">
            <path d="M1.4 1.2v11.6a.5.5 0 0 0 .77.42l9.1-5.8a.5.5 0 0 0 0-.84l-9.1-5.8a.5.5 0 0 0-.77.42Z" />
          </svg>
        )}
      </button>

      <span className="shrink-0 font-mono text-[11px] tabular-nums text-ground/70">
        {clock(time)} / {clock(DURATION)}
      </span>

      {/* A div rather than an <input type=range>, so the scene ticks can sit on the track — with
          the slider role and key handling put back by hand. */}
      <div
        ref={track}
        role="slider"
        tabIndex={0}
        aria-label="Walkthrough position"
        aria-valuemin={0}
        aria-valuemax={DURATION}
        aria-valuenow={Number(time.toFixed(1))}
        aria-valuetext={`${clock(time)}, ${scene}`}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          seekFromPointer(e.clientX);
        }}
        onPointerMove={(e) => e.currentTarget.hasPointerCapture(e.pointerId) && seekFromPointer(e.clientX)}
        onKeyDown={(e) => {
          const step = e.shiftKey ? 5 : 1;
          if (e.key === "ArrowRight") { e.preventDefault(); onNudge(step); }
          if (e.key === "ArrowLeft") { e.preventDefault(); onNudge(-step); }
          if (e.key === "Home") { e.preventDefault(); onSeek(0); }
          if (e.key === "End") { e.preventDefault(); onSeek(DURATION); }
          if (e.key === " " || e.key === "Enter") { e.preventDefault(); onToggle(); }
        }}
        className="group relative h-[18px] flex-1 cursor-pointer touch-none"
      >
        <span className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 rounded-pill bg-ground/25" />
        <span
          className="absolute left-0 top-1/2 h-[3px] -translate-y-1/2 rounded-pill bg-ground"
          style={{ width: `${(time / DURATION) * 100}%` }}
        />
        {SCENES.slice(1).map((s) => (
          <span
            key={s.label}
            title={s.label}
            className="absolute top-1/2 size-[3px] -translate-y-1/2 rounded-pill bg-text"
            style={{ left: `${(s.at / DURATION) * 100}%` }}
          />
        ))}
        <span
          className="absolute top-1/2 size-[11px] -translate-x-1/2 -translate-y-1/2 rounded-pill bg-ground shadow-[0_1px_3px_rgba(13,22,34,0.5)]"
          style={{ left: `${(time / DURATION) * 100}%` }}
        />
      </div>

      <span className="w-[54px] shrink-0 text-right text-[11px] font-medium text-ground">{scene}</span>
    </div>
  );
}

/* ---- 1. Sign in — apps/web (auth)/sign-in/SignInForm.tsx ---- */
function SignIn() {
  return (
    <div className="hd-signin absolute inset-0 flex flex-col items-center justify-center bg-ground">
      <div className="flex w-[300px] flex-col">
        <Mark />
        <span className="mt-4 text-[17px] font-bold tracking-snug text-text">Sign in</span>
        <div className="mt-5 flex flex-col gap-3">
          <label className="flex flex-col gap-1">
            <span className="text-[8px] font-medium uppercase tracking-[0.08em] text-muted">Email</span>
            <span className="flex h-[30px] items-center overflow-hidden whitespace-nowrap rounded-md border border-border-strong px-3 text-[10px] text-text">
              <span className="hd-type">sarah@weber.example</span>
              <i className="hd-caret" />
            </span>
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-[8px] font-medium uppercase tracking-[0.08em] text-muted">Password</span>
            <span className="flex h-[30px] items-center rounded-md border border-border-strong px-3">
              <span className="flex flex-1 items-center gap-[3px]">
                {Array.from({ length: 10 }).map((_, i) => (
                  <i key={i} className="hd-dot block size-[4px] rounded-pill bg-text" style={{ ["--d" as string]: `${1.75 + i * 0.06}s` }} />
                ))}
              </span>
              <span className="text-[8px] font-medium text-muted">Show</span>
            </span>
          </label>
          {/* The app calls this cobalt `accent-fill`; on the site the non-flipping pair is `band` /
              `on-band`. `accent` itself is not interchangeable — it becomes a light blue in dark
              mode, and white on it fails. */}
          <span className="hd-submit mt-1 flex h-[30px] items-center justify-center rounded-md bg-band text-[10px] font-semibold text-on-band">
            Continue
          </span>
          <span className="text-center text-[8px] leading-[12px] text-muted">
            There is no password reset by email &mdash; on purpose.
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---- 1b. The authenticator step the real flow goes to next ---- */
function Totp() {
  return (
    <div className="hd-totp absolute inset-0 flex flex-col items-center justify-center bg-ground">
      <div className="flex w-[300px] flex-col items-center">
        <Mark />
        <span className="mt-4 text-[17px] font-bold tracking-snug text-text">Six-digit code</span>
        <span className="mt-1.5 text-center text-[9px] leading-[13px] text-muted">From your authenticator app.</span>
        <div className="mt-4 flex gap-[6px]">
          {["4", "8", "2", "9", "1", "7"].map((d, i) => (
            <span
              key={i}
              className="hd-digit flex h-[32px] w-[26px] items-center justify-center rounded-md border border-border-strong text-[13px] font-semibold text-text"
              style={{ ["--d" as string]: `${3.5 + i * 0.16}s` }}
            >
              {d}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Mark() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="shrink-0">
      <path d="M12 2.5 3.5 6v6c0 5.2 3.6 8.6 8.5 9.5 4.9-.9 8.5-4.3 8.5-9.5V6L12 2.5Z" stroke="var(--color-accent)" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M12 7.5v7" stroke="var(--color-accent)" strokeWidth="1.8" strokeLinecap="round" />
      <path d="m15 11.5-3 3-3-3" stroke="var(--color-accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ---- 2–5. The shell — apps/web components/shell/Sidebar.tsx ---- */
const NAV: { label: string; d: string; cls?: string }[] = [
  { label: "Home", d: "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5Z", cls: "hd-nav-home" },
  { label: "Inbox", d: "M3 12h4l2 3h6l2-3h4M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z", cls: "hd-nav-inbox" },
  { label: "To do", d: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-3.6-9.2 2.5 2.5 4.7-5.2", cls: "hd-nav-todo" },
  { label: "Library", d: "M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5Zm4 3h8M8 12h8M8 16h5" },
  { label: "People & things", d: "M16 19v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1M9.5 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm8.5 8v-1a4 4 0 0 0-3-3.9M15 4.1a3.5 3.5 0 0 1 0 6.8" },
  { label: "Shared", d: "M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7M12 3v13M8 7l4-4 4 4" },
  { label: "Settings", d: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7.4-3a7.4 7.4 0 0 0-.1-1l2-1.5-2-3.4-2.3.9a7.5 7.5 0 0 0-1.7-1L15 3.5H9l-.3 2.5a7.5 7.5 0 0 0-1.7 1L4.7 6.1l-2 3.4 2 1.5a7.4 7.4 0 0 0 0 2l-2 1.5 2 3.4 2.3-.9a7.5 7.5 0 0 0 1.7 1L9 20.5h6l.3-2.5a7.5 7.5 0 0 0 1.7-1l2.3.9 2-3.4-2-1.5c.1-.3.1-.7.1-1Z" },
];

function App() {
  return (
    <div className="hd-app absolute inset-0 flex bg-ground">
      <aside className="flex w-[186px] shrink-0 flex-col border-r border-border bg-surface px-3 py-4">
        <span className="flex items-center gap-2 px-1">
          <Mark />
          <span className="text-[12px] font-bold tracking-snug text-text">Harbor</span>
        </span>
        <nav className="mt-5 flex flex-col gap-[2px]">
          {NAV.map((n) => (
            <span key={n.label} className={`flex h-[26px] items-center gap-2.5 rounded-md px-2.5 text-[10px] font-medium text-text ${n.cls ?? ""}`}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <path d={n.d} />
              </svg>
              <span className="flex-1 truncate">{n.label}</span>
              {n.label === "Inbox" && <i className="hd-badge-inbox inline-flex h-[14px] min-w-[14px] items-center justify-center rounded-pill bg-accent-soft px-1 text-[8px] font-bold not-italic text-accent">5</i>}
              {n.label === "To do" && <i className="hd-badge-todo inline-flex h-[14px] min-w-[14px] items-center justify-center rounded-pill bg-danger/10 px-1 text-[8px] font-bold not-italic text-danger">2</i>}
            </span>
          ))}
        </nav>
        <div className="mt-5 flex flex-col gap-[1px]">
          <span className="px-2.5 text-[8px] font-medium uppercase tracking-[0.08em] text-muted">Categories</span>
          {CATS.slice(0, 5).map(([c, n]) => (
            <span key={c} className="flex h-[22px] items-center gap-2 rounded-md px-2.5 text-[9px] text-text">
              <span className="flex-1 truncate">{c}</span>
              <span className="text-[8px] text-muted">{n}</span>
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center gap-2 border-t border-border pt-3">
          <span className="flex size-[20px] items-center justify-center rounded-pill bg-ground text-[8px] font-bold text-muted">SW</span>
          <span className="flex-1 truncate text-[9px] font-medium text-text">Sarah Weber</span>
          <span className="text-[8px] font-medium text-muted">Sign out</span>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* The real TopBar: 72px, no rule under it — the controls carry their own edges. */}
        <header className="flex h-[46px] shrink-0 items-center gap-3 bg-ground px-5">
          <span className="hd-t-search hd-field flex h-[24px] w-full max-w-[290px] items-center gap-2 rounded-md border border-border bg-ground px-2.5">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="shrink-0 text-muted">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.6-3.6" />
            </svg>
            {/* The placeholder is taken out of flow so the query it gives way to starts hard left. */}
            <span className="relative flex min-w-0 flex-1 items-center text-[9px]">
              <span className="hd-ph absolute inset-y-0 left-0 flex items-center truncate text-muted">Search inside every document</span>
              <span className="hd-typed font-medium text-text">Macbook</span>
              <i className="hd-scaret ml-px block h-[10px] not-italic" />
            </span>
            <span className="hd-kbd text-[8px] text-muted">⌘K</span>
          </span>
          {/*
            Absent until something is ticked, which is the app's own rule (ShareTrigger): a control
            reading "0 documents" is a control asking to be explained. Here that is the beat.
          */}
          <span className="hd-sharebtn hd-t-share ml-auto flex h-[24px] shrink-0 items-center gap-1.5 rounded-md border border-border-strong bg-ground px-2.5 text-[9px] font-semibold text-text">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-muted">
              <path d="M4 13v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6M12 3v12M8 7l4-4 4 4" />
            </svg>
            Share
            <i className="inline-flex h-[12px] min-w-[12px] items-center justify-center rounded-pill bg-band px-1 text-[7px] font-bold not-italic leading-none text-on-band">1</i>
          </span>
          <span className="hd-addbtn flex h-[24px] shrink-0 items-center gap-1.5 rounded-md bg-band px-3 text-[9px] font-semibold text-on-band">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
            Add documents
          </span>
        </header>
        <main className="relative min-h-0 flex-1 overflow-hidden">
          <Home />
          <Inbox />
          <Todo />
          <Search />
        </main>
      </div>
      <ShareDialog />
    </div>
  );
}

/** Invented throughout — the Weber household the site's other mocks already use. */
const CATS: [string, string][] = [
  ["Identity", "18"],
  ["Real Estate", "61"],
  ["Money", "37"],
  ["Taxes", "26"],
  ["Insurance", "31"],
  ["Health", "44"],
];

function SectionHeader({ title, meta }: { title: string; meta: string }) {
  return (
    <span className="flex items-baseline gap-2">
      <span className="text-[14px] font-bold tracking-snug text-text">{title}</span>
      <span className="text-[8.5px] text-muted">{meta}</span>
    </span>
  );
}

/*
 * Avatars, drawn from the same icon family as the feature boxes: a 24×24 viewBox, 1.7 stroke,
 * round caps and joins, sitting on a soft tint. The frame is a circle rather than the boxes'
 * rounded square because that is the shape the app's ItemAvatar uses.
 *
 * The real ItemAvatar shows the item's photograph when it has one and falls back to the person's
 * initial or a glyph. Photographs are not an option here — the household is invented, and putting
 * pictures of real people behind invented names on a public page is not a thing to do — so the
 * glyph is the state shown, in the page's own icon language.
 */
const TINTS: Record<string, [string, string]> = {
  accent: ["var(--color-accent-soft)", "var(--color-accent)"],
  violet: ["var(--color-violet-soft)", "var(--color-violet)"],
  green: ["var(--color-green-soft)", "var(--color-green)"],
  warn: ["var(--color-warn-soft)", "var(--color-warn)"],
};

function Avatar({ tint, children }: { tint: keyof typeof TINTS; children: ReactNode }) {
  const [soft, strong] = TINTS[tint];
  return (
    <span
      className="mb-1 flex size-[26px] shrink-0 items-center justify-center rounded-pill"
      style={{ background: soft }}
      aria-hidden="true"
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={strong} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </svg>
    </span>
  );
}

const PERSON = (
  <>
    <circle cx="12" cy="8.4" r="3.6" />
    <path d="M5.6 19.6a6.4 6.4 0 0 1 12.8 0" />
  </>
);

const THINGS: Record<string, ReactNode> = {
  house: (
    <>
      <path d="M3.6 10.8 12 4.2l8.4 6.6" />
      <path d="M6.1 10.2v9.4h11.8v-9.4" />
      <path d="M10.2 19.6v-4.5h3.6v4.5" />
    </>
  ),
  car: (
    <>
      <path d="M3.6 14.6h16.8" />
      <path d="M5.6 14.6 7.4 10a2 2 0 0 1 1.9-1.3h5.4a2 2 0 0 1 1.9 1.3l1.8 4.6" />
      <path d="M4.8 14.6v2.8M19.2 14.6v2.8" />
      <circle cx="7.8" cy="17.6" r="1.5" />
      <circle cx="16.2" cy="17.6" r="1.5" />
    </>
  ),
  cabin: (
    <>
      <path d="M12 4.2 20 19.8H4z" />
      <path d="M8.6 14.4h6.8" />
    </>
  ),
};

function ItemCard({ name, role, records, expiry, warn, avatar, at }: { name: string; role: string; records: string; expiry: string; warn?: boolean; avatar: ReactNode; at: number }) {
  return (
    <div
      className="hd-item flex flex-col items-center gap-0.5 rounded-lg border border-border px-2 py-3"
      style={{ ["--d" as string]: `${at}s` }}
    >
      {avatar}
      <span className="max-w-full truncate text-[9px] font-semibold text-text">{name}</span>
      <span className="text-[7.5px] text-muted">{role}</span>
      <span className="text-[7.5px] text-muted">{records}</span>
      <span className={`text-[7.5px] ${warn ? "font-medium text-warn" : "text-muted"}`}>{expiry}</span>
    </div>
  );
}

function Home() {
  return (
    <div className="hd-view hd-home absolute inset-0 overflow-hidden px-5 pb-5">
      <div className="hd-scroll flex flex-col gap-5">
        <section className="flex flex-col gap-2.5">
          <SectionHeader title="Family" meta="4 people · 197 records" />
          <div className="grid grid-cols-4 gap-2.5">
            <ItemCard at={5.45} name="Sarah" role="Owner" records="74 records" expiry="Expires in 24 days" warn avatar={<Avatar tint="accent">{PERSON}</Avatar>} />
            <ItemCard at={5.515} name="Daniel" role="Spouse" records="68 records" expiry="Expires in 71 days" avatar={<Avatar tint="violet">{PERSON}</Avatar>} />
            <ItemCard at={5.58} name="Lucas" role="Son" records="31 records" expiry="Nothing expiring" avatar={<Avatar tint="green">{PERSON}</Avatar>} />
            <ItemCard at={5.645} name="Emma" role="Daughter" records="24 records" expiry="Nothing expiring" avatar={<Avatar tint="warn">{PERSON}</Avatar>} />
          </div>
        </section>
        <section className="flex flex-col gap-2.5">
          <SectionHeader title="Property &amp; things" meta="4 items · 151 records" />
          <div className="grid grid-cols-4 gap-2.5">
            <ItemCard at={5.71} name="1428 Maple Ave" role="Primary residence" records="86 records" expiry="Expires in 112 days" avatar={<Avatar tint="accent">{THINGS.house}</Avatar>} />
            <ItemCard at={5.775} name="Subaru Outback" role="ABC-4471 · 2019" records="14 records" expiry="Expires in 57 days" avatar={<Avatar tint="warn">{THINGS.car}</Avatar>} />
            <ItemCard at={5.84} name="Lake cabin" role="22 Birch Ln" records="29 records" expiry="Nothing expiring" avatar={<Avatar tint="green">{THINGS.cabin}</Avatar>} />
            {/* The real grid ends on a dashed invitation, not on the last item. */}
            <span
              className="hd-item flex flex-col items-center justify-center rounded-lg border border-dashed border-border-strong px-2 text-center text-[8px] font-medium text-muted"
              style={{ ["--d" as string]: "5.905s" }}
            >
              + Add a house, car or account
            </span>
          </div>
        </section>
        <section className="flex flex-col gap-2.5">
          <SectionHeader title="Categories" meta="6 categories · 348 documents · backed up 2 hours ago" />
          <div className="grid grid-cols-4 gap-2">
            {CATS.map(([c, n]) => (
              <span key={c} className="flex flex-col gap-1 rounded-lg border border-border px-2.5 py-2">
                <span className="flex items-center justify-between">
                  <span className="text-[9px] font-semibold text-text">{c}</span>
                  <span className="text-[9px] text-muted">{n}</span>
                </span>
                <span className="truncate text-[7.5px] text-muted">
                  {c === "Identity" ? "Passports · Licences" : c === "Money" ? "Banking · Pensions" : "—"}
                </span>
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

/* ---- 4. The Inbox -------------------------------------------------------------------------
 *
 * Compact rows rather than the app's full-size card. The real card is a 200×283 thumbnail beside
 * two select controls, which at this zoom put its action button below the window and made the
 * suggested filing look like empty text inputs — the opposite of the auto-tagging the page above
 * is promising.
 *
 * So this follows the site's own Inbox mock instead: what the document actually says, then the
 * suggested category and item as chips, then the two verdicts. The summary line carries the
 * weight — the filing is the promise, but the one-liner is what a person reads.
 */
type Row = {
  title: string;
  meta: string;
  /** What the document says. The reason to read the row at all. */
  summary: string;
  tags: [string, string] | null;
  verdict: "accept" | "delete";
  /** Seconds: row in, action pressed, row leaves. */
  t: [number, number, number];
};

const ROWS: Row[] = [
  { title: "Homeowners Policy Renewal 2027", meta: "Forwarded by email · 12 min ago", summary: "Premium rises to $2,140 and the wind-and-hail deductible is now 2%.", tags: ["Insurance › Home", "1428 Maple Ave"], verdict: "accept", t: [13.9, 15.5, 16.1] },
  { title: "Lake County Property Tax Bill 2026", meta: "Forwarded by email · 2 h ago", summary: "$3,812 due 1 March, with a second instalment in August.", tags: ["Taxes › Property", "Lake cabin"], verdict: "accept", t: [14.0, 17.6, 18.2] },
  { title: "Home & Garden — this week's picks", meta: "Forwarded by email · 3 h ago", summary: "A newsletter: patio furniture on sale, and a note about autumn bulbs.", tags: null, verdict: "delete", t: [14.1, 19.5, 20.3] },
  { title: "Learner's Permit, Lucas Weber", meta: "Photo from phone · 3 h ago", summary: "Valid to 4 June 2027; the road test must be booked before it expires.", tags: ["Identity › Licences", "Lucas"], verdict: "accept", t: [14.2, 21.8, 22.4] },
  { title: "Your coffee subscription receipt", meta: "Forwarded by email · 5 h ago", summary: "$18.00 charged to the card ending 4417 for the monthly bag.", tags: null, verdict: "delete", t: [14.3, 23.7, 24.5] },
];

/** The discard verdict, at 9px. Lid, can, two ruled lines. */
function Trash() {
  return (
    <svg viewBox="0 0 16 16" className="h-[9px] w-[9px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2.5 4.5h11M6.5 4.5V3a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1.5M4 4.5l.6 8a1 1 0 0 0 1 .9h4.8a1 1 0 0 0 1-.9l.6-8" />
      <path d="M6.8 7v4M9.2 7v4" />
    </svg>
  );
}

/** A page, not a grey block: a letterhead band and ruled lines, sized for the row. */
function Preview() {
  return (
    <span className="flex h-[34px] w-[26px] shrink-0 flex-col gap-[2px] overflow-hidden rounded-[3px] border border-border bg-panel p-[3px]">
      <i className="block h-[4px] w-[70%] rounded-[1px] bg-accent-soft" />
      <i className="block h-[2px] w-full rounded-[1px] bg-border" />
      <i className="block h-[2px] w-[85%] rounded-[1px] bg-border" />
      <i className="block h-[2px] w-full rounded-[1px] bg-border" />
      <i className="block h-[2px] w-[60%] rounded-[1px] bg-border" />
    </span>
  );
}

function Inbox() {
  return (
    <div className="hd-view hd-inbox absolute inset-0 overflow-hidden px-5 pb-5">
      <h1 className="text-[15px] font-bold tracking-snug text-text">Inbox</h1>
      <p className="hd-count mt-0.5 text-[9px] text-muted">5 documents to review · each has a suggested filing</p>
      <p className="mt-2 text-[8px] font-medium uppercase tracking-[0.08em] text-muted">Today</p>
      <ul className="mt-1.5 flex flex-col gap-[5px]">
        {ROWS.map((r) => (
          <li
            key={r.title}
            className={`hd-row hd-row-${r.verdict} flex items-center gap-2.5 overflow-hidden rounded-md border border-border bg-ground p-1.5`}
            style={{ ["--in" as string]: `${r.t[0]}s`, ["--act" as string]: `${r.t[1]}s`, ["--out" as string]: `${r.t[2]}s` }}
          >
            <Preview />
            <span className="flex min-w-0 flex-1 flex-col gap-[2px]">
              <span className="flex min-w-0 items-baseline gap-1.5">
                <span className="truncate text-[9.5px] font-semibold text-text">{r.title}</span>
                <span className="shrink-0 text-[7.5px] text-muted">{r.meta}</span>
              </span>
              <span className="truncate text-[8px] leading-[1.35] text-text">{r.summary}</span>
              {r.tags ? (
                <span className="flex items-center gap-1">
                  {r.tags.map((t) => (
                    <span key={t} className="hd-chip truncate rounded-pill bg-accent-soft px-1.5 py-[1px] text-[7.5px] font-medium text-accent">
                      {t}
                    </span>
                  ))}
                </span>
              ) : (
                <span className="text-[7.5px] text-muted">No suggestion — too little readable text to go on.</span>
              )}
            </span>
            {/* Both verdicts on every row; only the one the script takes carries `hd-btn`. */}
            <span className="flex shrink-0 items-center gap-1.5">
              <span
                aria-hidden
                className={`${r.verdict === "delete" ? "hd-btn " : ""}flex h-[17px] w-[17px] items-center justify-center rounded-md border border-border-strong bg-ground text-muted`}
              >
                <Trash />
              </span>
              <span className={`${r.verdict === "accept" ? "hd-btn " : ""}flex items-center rounded-md bg-band px-2 py-[3px] text-[8px] font-semibold text-on-band`}>
                Accept
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---- 5. To do — apps/web (shell)/todo/TaskRow.tsx ---- */
function Todo() {
  return (
    <div className="hd-view hd-todo absolute inset-0 overflow-hidden px-5 pb-5">
      <h1 className="text-[15px] font-bold tracking-snug text-text">To do</h1>
      <p className="mt-1 text-[9px] text-muted">2 open · both from documents you filed just now</p>
      <p className="mt-3 text-[8px] font-medium uppercase tracking-[0.08em] text-muted">Due later</p>
      <ul className="mt-1.5 flex flex-col">
        {[
          { t: "Renew the policy", d: "Due 31 Dec 2027", doc: "Homeowners Policy Renewal 2027", tone: "text-muted" },
          { t: "Pay $2,140", d: "Due 31 Oct 2026", doc: "Lake County Property Tax Bill 2026", tone: "text-warn font-medium" },
        ].map((x, i) => (
          <li
            key={x.t}
            className="hd-task flex items-start gap-3 border-t border-border py-2.5 last:border-b"
            style={{ ["--d" as string]: `${25.2 + i * 0.35}s` }}
          >
            <i className="mt-[1px] block size-[13px] shrink-0 rounded-[4px] border border-border-strong" />
            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="truncate text-[10px] font-medium text-text">{x.t}</span>
              <span className="truncate text-[8.5px] text-muted">{x.doc}</span>
            </span>
            <span className={`shrink-0 text-[8.5px] ${x.tone}`}>{x.d}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---- 6. Search — apps/web (shell)/library/page.tsx › SearchResults -----------------------
 *
 * The result row is the app's: a ShareCheckbox, then the title beside its category and date, then
 * the snippet with the matched word carrying the <mark> fill, then the item chips. The chips use
 * green rather than the accent for the reason the app gives — the accent fill is what a *match*
 * looks like, and a person drawn the same way reads as a match it is not.
 */
type Hit = {
  title: string;
  meta: string;
  /** Split so the matched word can carry the mark fill, the way ts_headline hands it over. */
  snippet: [string, string, string];
  chips: string[];
  at: number;
};

const HITS: Hit[] = [
  {
    title: "Apple Store receipt — MacBook Pro 14”",
    meta: "Money › Receipts · 4 Mar 2026",
    snippet: ["Order W419268341 · ", "MacBook", " Pro 14-inch, 1 TB, space black. $2,499.00 on the card ending 4417."],
    chips: ["Sarah Weber", "Home office"],
    at: 31.0,
  },
  {
    title: "Home office deductions, tax year 2026",
    meta: "Taxes › Deductions · 12 Jan 2027",
    snippet: ["Equipment bought in March: one ", "MacBook", " Pro, depreciated over three years."],
    chips: ["Sarah Weber"],
    at: 31.12,
  },
];

function Search() {
  return (
    <div className="hd-view hd-search absolute inset-0 overflow-hidden px-5 pb-5">
      <h1 className="text-[15px] font-bold tracking-snug text-text">Library</h1>
      <p className="mt-1 text-[9px] text-muted">Every document in the vault, including the words inside them.</p>
      <div className="mt-3 flex items-baseline justify-between">
        <span className="flex items-baseline gap-2">
          <span className="text-[11px] font-semibold tracking-snug text-text">2 results for “Macbook”</span>
          <span className="text-[8px] text-muted">8 ms</span>
        </span>
        <span className="text-[9px] font-medium text-accent">Clear search</span>
      </div>
      <ul className="mt-1 flex flex-col">
        {HITS.map((h, i) => (
          <li key={h.title} className="hd-hit flex items-start gap-2.5 border-t border-border py-2.5 last:border-b" style={{ ["--d" as string]: `${h.at}s` }}>
            {/* The app's ShareCheckbox. Only the first is ticked, and only it needs a hook. */}
            {/* The glyph takes `currentColor`, which the tick animates from transparent — an unticked
                box simply has no tick, as an unticked box does not. */}
            <i className={`${i === 0 ? "hd-tick hd-t-check " : ""}mt-[2px] flex size-[11px] shrink-0 items-center justify-center rounded-[3px] border border-border-strong not-italic`}>
              {i === 0 && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="size-[8px]">
                  <path d="m5 12.5 5 5 9-10.5" />
                </svg>
              )}
            </i>
            <span className="flex min-w-0 flex-1 flex-col gap-[3px]">
              <span className="flex min-w-0 items-baseline gap-2">
                <span className="truncate text-[9.5px] font-semibold text-text">{h.title}</span>
                <span className="shrink-0 text-[7.5px] text-muted">{h.meta}</span>
              </span>
              <span className="text-[8px] leading-[1.4] text-text">
                {h.snippet[0]}
                <mark className="rounded-[2px] bg-accent-soft px-[2px] font-semibold text-accent">{h.snippet[1]}</mark>
                {h.snippet[2]}
              </span>
              <span className="mt-[1px] flex flex-wrap items-center gap-1">
                {h.chips.map((c) => (
                  <span key={c} className="rounded-sm bg-green-soft px-1.5 py-[1px] text-[7.5px] font-medium text-green">
                    {c}
                  </span>
                ))}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---- 7. The share dialog — apps/web components/share/{ShareModal,ReviewShare}.tsx ----------
 *
 * Over the page the documents were picked on, not a screen of its own, and a size that does not
 * depend on its contents: the window less a margin, two panes, the form scrolling inside the left
 * one. Recipients get the room, because who gets this is the only real question.
 *
 * What the footer says is the product's, not the script's: Harbor mints a link per recipient and
 * cannot send mail. See the note where the recipient is typed.
 */
function ShareDialog() {
  return (
    <div className="hd-modal pointer-events-none absolute inset-0 z-30">
      <i className="hd-scrim absolute inset-0 block bg-text/40 not-italic" />
      {/* The real dialog is the window less an even margin. Here the bottom margin is deeper, because
          the transport bar overlays the last ~30px of the stage and the footer is where the payoff
          press happens — a button under the scrubber is a button nobody sees pressed. */}
      <div className="hd-panel absolute inset-x-[10px] bottom-[32px] top-[10px] flex overflow-hidden rounded-[10px] border border-border bg-ground shadow-[0_16px_44px_rgba(13,22,34,0.28)]">
        {/* `relative`, because the link panel is absolutely positioned against this column — without
            it the nearest positioned ancestor is the dialog and the panel covers the preview too. */}
        <div className="relative flex w-[286px] shrink-0 flex-col">
          <header className="flex shrink-0 items-center gap-2 border-b border-border px-3 py-2">
            <span className="flex-1 text-[11px] font-semibold tracking-snug text-text">Share</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="size-[10px] text-muted">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </header>

          {/* Before: what is going, for how long, and to whom. */}
          <div className="hd-form flex min-h-0 flex-1 flex-col">
            <div className="flex gap-2.5 border-b border-border px-3 py-2.5">
              <span className="flex min-w-0 flex-1 flex-col gap-1">
                <span className="text-[7px] font-medium uppercase tracking-[0.08em] text-muted">Name</span>
                <span className="flex h-[20px] items-center rounded-md border border-border bg-ground px-2 text-[8.5px] text-muted/70">2025 tax documents</span>
              </span>
              <span className="flex w-[74px] shrink-0 flex-col gap-1">
                <span className="text-[7px] font-medium uppercase tracking-[0.08em] text-muted">Available for</span>
                <span className="flex h-[20px] items-center justify-between rounded-md border border-border bg-ground px-2 text-[8.5px] text-text">
                  7 days
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="size-[7px] text-muted">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </span>
              </span>
            </div>

            <div className="border-b border-border px-3 py-2.5">
              <span className="mb-1.5 flex items-baseline justify-between gap-2">
                <span className="text-[9px] font-semibold text-text">1 document</span>
                <span className="text-[8px] text-muted">Clear all</span>
              </span>
              <span className="flex items-center gap-2 rounded-lg border border-border bg-accent-soft px-2 py-1.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="size-[11px] shrink-0 text-accent">
                  <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
                  <path d="M14 3v5h5M9 13h6M9 17h4" />
                </svg>
                <span className="min-w-0 flex-1 truncate text-[8.5px] font-semibold text-accent">Apple Store receipt — MacBook Pro 14”</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="size-[8px] shrink-0 text-muted">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </span>
            </div>

            <div className="px-3 py-2.5">
              <span className="text-[9px] font-semibold text-text">Recipients</span>
              <div className="mt-2 rounded-lg border border-border p-2">
                {/*
                  The app's recipient is a free-text label, not an address — Harbor mints a link and
                  never sends mail. An address is a perfectly ordinary thing to write here to
                  remember who a link went to, which is why the script's one reads true.
                */}
                <span className="hd-t-rcpt hd-field flex h-[20px] items-center rounded-md border border-border bg-ground px-2">
                  <span className="relative flex min-w-0 flex-1 items-center text-[8.5px]">
                    <span className="hd-rph absolute inset-y-0 left-0 flex items-center text-muted/70">Accountant</span>
                    <span className="hd-rcpt font-medium text-text">rich@myaccountant.com</span>
                    <i className="hd-rcaret ml-px block h-[9px] not-italic" />
                  </span>
                </span>
                <span className="mt-1.5 flex items-center gap-2.5">
                  <span className="flex h-[18px] min-w-0 flex-1 items-center rounded-md border border-border bg-ground px-2 text-[8px] text-muted/70">Password (optional)</span>
                  <span className="flex shrink-0 items-center gap-1.5 text-[8px] text-muted">
                    <i className="block size-[9px] shrink-0 rounded-[2px] border border-border-strong not-italic" />
                    One download only
                  </span>
                </span>
              </div>
              <span className="mt-1.5 inline-flex items-center gap-1 text-[8.5px] font-semibold text-accent">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" className="size-[8px]">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Add another
              </span>
            </div>
          </div>

          {/* After: the link, readable exactly once. */}
          <div className="hd-linkpanel absolute inset-x-0 bottom-0 top-[30px] flex flex-col bg-ground px-3 py-2.5">
            <span className="text-[8.5px] leading-[1.45] text-text">
              The link is ready. Copy it now — Harbor keeps them hashed and cannot show them again.
            </span>
            <span className="mt-2.5 text-[9px] font-semibold text-text">rich@myaccountant.com</span>
            <span className="mt-1 flex items-center gap-1.5">
              <span className="min-w-0 flex-1 truncate rounded-md border border-border bg-surface px-2 py-1.5 font-mono text-[7.5px] text-muted">
                https://share.weber.family/s/k7Qp2m9XvB
              </span>
              <span className="flex h-[19px] w-[42px] shrink-0 items-center justify-center rounded-md bg-band text-[8px] font-semibold text-on-band">Copy</span>
            </span>
            <span className="mt-auto flex items-center gap-2 border-t border-border pt-2">
              <span className="text-[8.5px] text-accent">See all shares</span>
              <span className="ml-auto flex h-[19px] shrink-0 items-center rounded-md bg-band px-3 text-[8.5px] font-semibold text-on-band">Done</span>
            </span>
          </div>

          <footer className="hd-foot mt-auto flex shrink-0 items-center gap-2 border-t border-border px-3 py-2">
            <span className="ml-auto text-[8.5px] font-semibold text-muted">Cancel</span>
            <span className="hd-t-create hd-create flex h-[19px] shrink-0 items-center rounded-md bg-band px-2.5 text-[8.5px] font-semibold text-on-band">
              Create link
            </span>
          </footer>
        </div>

        {/* The preview pane is always there — one that appears on first click resizes the dialog
            under the pointer. */}
        <aside className="flex min-w-0 flex-1 items-center justify-center border-l border-border bg-surface p-4">
          <span className="flex h-full w-[150px] flex-col gap-[5px] overflow-hidden rounded-[4px] border border-border bg-panel p-3 shadow-[0_2px_8px_rgba(13,22,34,0.08)]">
            <i className="block h-[7px] w-[52%] rounded-[1px] bg-accent-soft" />
            <i className="mt-1 block h-[3px] w-full rounded-[1px] bg-border" />
            <i className="block h-[3px] w-[88%] rounded-[1px] bg-border" />
            <i className="block h-[3px] w-[94%] rounded-[1px] bg-border" />
            <i className="mt-2 block h-[3px] w-[40%] rounded-[1px] bg-border" />
            <i className="block h-[3px] w-full rounded-[1px] bg-border" />
            <i className="block h-[3px] w-[76%] rounded-[1px] bg-border" />
            <i className="mt-auto block h-[3px] w-[58%] rounded-[1px] bg-border" />
          </span>
        </aside>
      </div>
    </div>
  );
}

/**
 * The pointer. Every state change in this demo is caused by a click, and without something doing
 * the clicking the screens look like they advance on their own.
 *
 * Its path is one 24s track of `top`/`left` keyframes, and the ring underneath it pulses at the
 * same instants the buttons depress — so the press and the cause land on the same frame. Positions
 * are percentages of the window, tuned against the rendered demo rather than computed.
 */
function Cursor() {
  return (
    <span className="hd-cursor pointer-events-none absolute z-20">
      <i className="hd-click absolute -left-[9px] -top-[9px] block size-[22px] rounded-pill border border-accent not-italic" />
      <svg width="17" height="20" viewBox="0 0 17 20" fill="none" className="relative drop-shadow-[0_1px_2px_rgba(13,22,34,0.45)]">
        <path d="M1.2 1.1 14.4 11.6l-5.7.6 3.1 6.2-2.3 1.1-3-6.1-3.9 4.1z" fill="#fff" stroke="var(--color-text)" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
