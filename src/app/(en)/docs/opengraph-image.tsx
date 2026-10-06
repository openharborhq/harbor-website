import { card } from "@/components/og/card";

export { size, contentType } from "@/components/og/card";
export const alt = "Harbor documentation";

export default function Image() {
  return card({
    eyebrow: "Docs",
    title: "Harbor documentation",
    lead: "Install Harbor in minutes.",
  });
}
