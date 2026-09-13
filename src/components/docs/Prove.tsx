"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

/*
 * Ticks live in this browser's storage, so a reader who comes back mid-install finds the list
 * where they left it. Storage is read as an external store; when it is unavailable, an
 * in-memory copy keeps the list working for the session.
 */
const memory = new Map<string, string>();
const listeners = new Set<() => void>();

function read(key: string): string | null {
  try {
    return window.localStorage.getItem(key) ?? memory.get(key) ?? null;
  } catch {
    return memory.get(key) ?? null;
  }
}

function write(key: string, value: string) {
  memory.set(key, value);
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Storage unavailable: the in-memory copy carries the session.
  }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

/** The checkpoint list that closes a guide. */
export function Prove({ id, items }: { id: string; items: string[] }) {
  const key = `harbor-docs-prove:${id}`;
  const raw = useSyncExternalStore(
    subscribe,
    () => read(key),
    () => null,
  );

  const done = useMemo(() => {
    let saved: unknown = null;
    try {
      saved = raw ? JSON.parse(raw) : null;
    } catch {
      saved = null;
    }
    return items.map((_, i) => Array.isArray(saved) && saved[i] === true);
  }, [raw, items]);

  const update = useCallback((next: boolean[]) => write(key, JSON.stringify(next)), [key]);
  const count = done.filter(Boolean).length;

  return (
    <div className="doc-prove">
      <p className="doc-prove-count" aria-live="polite">
        <span className="doc-prove-num">
          {count} / {items.length}
        </span>{" "}
        proven
        {count > 0 ? (
          <>
            {" · "}
            <button type="button" className="doc-prove-reset" onClick={() => update(items.map(() => false))}>
              start over
            </button>
          </>
        ) : null}
      </p>
      <ol className="doc-prove-list">
        {items.map((text, i) => (
          <li key={text}>
            <label className="doc-prove-item">
              <input
                type="checkbox"
                checked={done[i]}
                onChange={(e) => update(done.map((d, j) => (j === i ? e.target.checked : d)))}
              />
              <span className="doc-prove-text">{text}</span>
            </label>
          </li>
        ))}
      </ol>
    </div>
  );
}
