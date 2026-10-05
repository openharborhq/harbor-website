import { PricingPage, pricingMetadata } from "@/components/pages/PricingPage";

export const metadata = pricingMetadata("de");

export default function Page() {
  return <PricingPage lang="de" />;
}
