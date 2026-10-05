import { RootDocument, rootMetadata } from "@/components/RootDocument";

/* The English site and the docs. German pages have their own root layout under (de). */
export const metadata = rootMetadata("en");

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument lang="en">{children}</RootDocument>;
}
