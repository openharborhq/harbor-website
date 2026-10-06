import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComparePage, compareMetadata } from "@/components/pages/ComparePage";
import { COMPARISONS, findComparison } from "@/content/compare";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return COMPARISONS.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const c = findComparison((await params).slug);
  return c ? compareMetadata(c) : {};
}

export default async function Page({ params }: { params: Params }) {
  const c = findComparison((await params).slug);
  if (!c) notFound();
  return <ComparePage comparison={c} />;
}
