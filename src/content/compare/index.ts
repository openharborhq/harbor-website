import { trustworthy } from "./trustworthy";
import type { Comparison } from "./types";

export type { Comparison } from "./types";

/** Every versus page, in the order the sitemap lists them. Adding one is a file and a line here. */
export const COMPARISONS: Comparison[] = [trustworthy];

export function findComparison(slug: string): Comparison | undefined {
  return COMPARISONS.find((c) => c.slug === slug);
}
