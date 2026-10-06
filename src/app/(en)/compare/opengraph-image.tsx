import { card } from "@/components/og/card";

/* The hub's card. Each versus page under it draws its own. */
export { size, contentType } from "@/components/og/card";
export const alt = "How Harbor compares with Trustworthy, Everplans, Quicken LifeHub and Paperless-ngx";

export default function Image() {
  return card({
    eyebrow: "Compare",
    title: "How Harbor compares",
    lead: "Against Trustworthy, Everplans, Quicken LifeHub and Paperless-ngx.",
  });
}
