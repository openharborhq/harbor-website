import { RootDocument, rootMetadata } from "@/components/RootDocument";

/* The German site, under /de. Its own root layout so the document says `lang="de"`. */
export const metadata = rootMetadata("de");

export default function GermanLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument lang="de">{children}</RootDocument>;
}
