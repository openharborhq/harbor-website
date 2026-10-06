import { card } from "@/components/og/card";

export { size, contentType } from "@/components/og/card";
export const alt = "Harbor Funktionen: Schluss mit dem Aktenschrank";

export default function Image() {
  return card({
    eyebrow: "Funktionen",
    title: "Schluss mit dem Aktenschrank",
    lead: "Dateien einfach hochladen, E-Mail verbinden oder mit dem Handy fotografieren – und im Blick behalten, was zählt.",
  });
}
