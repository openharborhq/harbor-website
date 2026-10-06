import { card } from "@/components/og/card";

export { size, contentType } from "@/components/og/card";
export const alt = "Harbor features: ditch your filing cabinet";

export default function Image() {
  return card({
    eyebrow: "Features",
    title: "Ditch your filing cabinet",
    lead: "Easy file upload, connect your email or snap pictures on your phone and track what matters.",
  });
}
