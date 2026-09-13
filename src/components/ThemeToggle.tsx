"use client";

import { useSyncExternalStore } from "react";

/*
 * The site theme: "system" follows the device, "light" and "dark" are explicit. The choice is
 * kept in this browser. The resolved theme is written to <html data-theme> so the CSS has one
 * selector to work from; the inline script in the root layout does the same before paint.
 */
export type ThemeChoice = "system" | "light" | "dark";
export const THEME_KEY = "harbor-theme";

const listeners = new Set<() => void>();

function readChoice(): ThemeChoice {
  try {
    const v = window.localStorage.getItem(THEME_KEY);
    return v === "light" || v === "dark" ? v : "system";
  } catch {
    return "system";
  }
}

function resolve(choice: ThemeChoice): "light" | "dark" {
  if (choice !== "system") return choice;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function apply(choice: ThemeChoice) {
  document.documentElement.dataset.theme = resolve(choice);
}

function setChoice(choice: ThemeChoice) {
  try {
    if (choice === "system") window.localStorage.removeItem(THEME_KEY);
    else window.localStorage.setItem(THEME_KEY, choice);
  } catch {
    // Not remembered, but applied for this page.
  }
  apply(choice);
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  const onSystem = () => {
    if (readChoice() === "system") apply("system");
    cb();
  };
  mq.addEventListener("change", onSystem);
  window.addEventListener("storage", onSystem);
  return () => {
    listeners.delete(cb);
    mq.removeEventListener("change", onSystem);
    window.removeEventListener("storage", onSystem);
  };
}

/** The three choices in the order the nav control cycles through them. */
const ORDER: ThemeChoice[] = ["system", "light", "dark"];

function readResolved(): "light" | "dark" {
  return resolve(readChoice());
}

/**
 * The nav control: one button that cycles System, Light, Dark. The icon shows the choice, the
 * accessible name says which theme is actually showing, so "system" is never a mystery. The
 * button is 40x40 for the pointer, with a 34px hairline pill for the eye.
 */
export function ThemeToggle() {
  const choice = useSyncExternalStore(subscribe, readChoice, () => "system" as ThemeChoice);
  const resolved = useSyncExternalStore(subscribe, readResolved, () => "light" as const);
  const next = ORDER[(ORDER.indexOf(choice) + 1) % ORDER.length];

  return (
    <button
      type="button"
      onClick={() => setChoice(next)}
      title={`Theme: ${choice}`}
      aria-label={`Theme: ${resolved}${choice === "system" ? ", following the device" : ""}. Change theme`}
      className="flex h-[40px] w-[40px] shrink-0 items-center justify-center text-muted hover:text-text"
    >
      <span className="flex h-[34px] w-[34px] items-center justify-center rounded-pill border border-border">
        <ThemeIcon choice={choice} />
      </span>
    </button>
  );
}

function ThemeIcon({ choice }: { choice: ThemeChoice }) {
  const s = {
    width: 16,
    height: 16,
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    xmlns: "http://www.w3.org/2000/svg",
    className: "shrink-0",
    "aria-hidden": true,
  } as const;

  if (choice === "light") {
    return (
      <svg {...s}>
        <circle cx="8" cy="8" r="3.1" />
        <path d="M8 1.4v1.7M8 12.9v1.7M2.4 8H0.7M15.3 8h-1.7M4.05 4.05L2.85 2.85M13.15 13.15l-1.2-1.2M11.95 4.05l1.2-1.2M2.85 13.15l1.2-1.2" />
      </svg>
    );
  }
  if (choice === "dark") {
    return (
      <svg {...s}>
        <path d="M13.4 9.6A5.8 5.8 0 0 1 6.4 2.6a5.8 5.8 0 1 0 7 7Z" />
      </svg>
    );
  }
  return (
    <svg {...s}>
      <rect x="1.8" y="2.6" width="12.4" height="8.6" rx="1.4" />
      <path d="M5.8 14h4.4M8 11.2V14" />
    </svg>
  );
}
