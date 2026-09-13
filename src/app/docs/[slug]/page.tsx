import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocPage } from "@/components/docs/DocPage";
import { ALL_PAGES, findPage, loadPage } from "@/content/docs";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return ALL_PAGES.filter((p) => p.slug !== "overview").map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  if (!findPage(slug) || slug === "overview") return {};
  const { meta } = await loadPage(slug);
  return { title: `${meta.title} · Harbor docs`, description: meta.description };
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;
  if (!findPage(slug) || slug === "overview") notFound();
  return <DocPage slug={slug} />;
}
