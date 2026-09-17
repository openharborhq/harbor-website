import type { Metadata } from "next";
import { DocPage } from "@/components/docs/DocPage";
import { loadPage } from "@/content/docs";

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await loadPage("overview");
  return {
    title: `${meta.title} · Harbor docs`,
    description: meta.description,
    // Noindex while these sit beside the live docs rather than in place of them.
  };
}

export default function V2DocsOverview() {
  return <DocPage slug="overview" />;
}
