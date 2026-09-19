"use client";

import posthog from "posthog-js";
import { useRef, useState, type ComponentProps } from "react";

/** A highlighted code block with a copy control. The text is read from the rendered lines. */
export function CodeBlock({ children, ...props }: ComponentProps<"pre">) {
  const pre = useRef<HTMLPreElement>(null);
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const lang = String((props as Record<string, unknown>)["data-language"] ?? "sh");
  const label = lang === "sh" || lang === "bash" || lang === "shell" ? "SHELL" : lang.toUpperCase();

  const copy = async () => {
    const text = (pre.current?.innerText ?? "").replace(/\n$/, "");
    try {
      await navigator.clipboard.writeText(text);
      if (process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN && process.env.NEXT_PUBLIC_POSTHOG_HOST) {
        posthog.capture("code_block_copied", { language: lang });
      }
      setState("copied");
    } catch (error) {
      if (process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN && process.env.NEXT_PUBLIC_POSTHOG_HOST) {
        posthog.captureException(error);
      }
      setState("failed");
    }
    window.setTimeout(() => setState("idle"), 1800);
  };

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
