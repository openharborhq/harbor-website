"use client";

import { useRef, useState, type ComponentProps } from "react";

/** A highlighted code block with a copy control. The text is read from the rendered lines. */
export function CodeBlock({ children, ...props }: ComponentProps<"pre">) {
  const pre = useRef<HTMLPreElement>(null);
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  const copy = async () => {
    const text = (pre.current?.innerText ?? "").replace(/\n$/, "");
    try {
      await navigator.clipboard.writeText(text);
      setState("copied");
    } catch {
      setState("failed");
    }
    window.setTimeout(() => setState("idle"), 1800);
  };

  const lang = String((props as Record<string, unknown>)["data-language"] ?? "sh");
  const label = lang === "sh" || lang === "bash" || lang === "shell" ? "SHELL" : lang.toUpperCase();

  return (
    <div className="doc-code">
      <div className="doc-code-bar">
        <span className="doc-code-lang" aria-hidden="true">
          {label}
        </span>
        <button type="button" onClick={copy} className="doc-copy" data-state={state} aria-label="Copy this command">
          <span aria-live="polite">{state === "copied" ? "COPIED" : state === "failed" ? "SELECT & COPY" : "COPY"}</span>
        </button>
      </div>
      <pre ref={pre} {...props}>
        {children}
      </pre>
    </div>
  );
}
