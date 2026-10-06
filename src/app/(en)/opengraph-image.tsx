import { card } from "@/components/og/card";

/* The default card for every English page and the docs; pages below that draw their own replace it. */
export { size, contentType } from "@/components/og/card";
export const alt = "Harbor: a document vault for your household, on your own hardware";

export default function Image() {
  return card({
    eyebrow: "Open-source document vault",
    title: "A document vault for your household, on your own hardware",
    lead: "Connect your email, upload files, Harbor finds it.",
  });
}
