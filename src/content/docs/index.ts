import fs from "node:fs/promises";
import path from "node:path";
import GithubSlugger from "github-slugger";
import type { ComponentType } from "react";
import type { PageMeta, TocItem } from "./nav";

export * from "./nav";

export async function loadPage(slug: string): Promise<{ Content: ComponentType; meta: PageMeta }> {
  const mod = await import(`@/content/docs/${slug}.mdx`);
  return { Content: mod.default, meta: mod.meta };
}

/**
 * The on-this-page list, read from the page's own markdown. Ids are produced the way
 * rehype-slug produces them, so the links land on the rendered headings.
 */
export async function getToc(slug: string): Promise<TocItem[]> {
  const file = path.join(process.cwd(), "src", "content", "docs", `${slug}.mdx`);
  const raw = await fs.readFile(file, "utf8");
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  let inFence = false;
  for (const line of raw.split("\n")) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = /^(##|###)\s+(.+?)\s*$/.exec(line);
    if (!m) continue;
    const text = m[2]
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/[`*_]/g, "")
      .trim();
    items.push({ id: slugger.slug(text), text, depth: m[1] === "##" ? 2 : 3 });
  }
  return items;
}
