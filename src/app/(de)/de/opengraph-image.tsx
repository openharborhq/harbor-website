import { card } from "@/components/og/card";

/* The default card for every German page. */
export { size, contentType } from "@/components/og/card";
export const alt = "Harbor: der Dokumententresor für deinen Haushalt, auf deiner eigenen Hardware";

export default function Image() {
  return card({
    eyebrow: "Quelloffener Dokumententresor",
    title: "Der Dokumententresor für deinen Haushalt, auf deiner eigenen Hardware",
    lead: "Unterlagen per E-Mail hinein. Harbor liest, sortiert und findet sie wieder.",
  });
}
