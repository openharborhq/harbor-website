"use client";

import Link, { type LinkProps } from "next/link";
import posthog from "posthog-js";
import { forwardRef, type ComponentPropsWithoutRef } from "react";

type TrackedEvent = "installation_guide_opened" | "github_repository_opened" | "release_notes_opened";

type TrackedLinkProps = LinkProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof LinkProps> & {
    analyticsEvent: TrackedEvent;
    analyticsProperties: {
      placement: string;
    };
  };

export const TrackedLink = forwardRef<HTMLAnchorElement, TrackedLinkProps>(function TrackedLink(
  { analyticsEvent, analyticsProperties, onClick, ...props },
  ref,
) {
  return (
    <Link
      {...props}
      ref={ref}
      onClick={(event) => {
        if (process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN && process.env.NEXT_PUBLIC_POSTHOG_HOST) {
          posthog.capture(analyticsEvent, analyticsProperties);
        }
        onClick?.(event);
      }}
    />
  );
});
