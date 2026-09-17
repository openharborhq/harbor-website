import Link from "next/link";
import { Arrow, SectionHead } from "./parts";
import { doc } from "./routes";

/*
 * Where the box can be, in the position a desktop product puts its per-platform download cards.
 *
 * The third card is the honest one: a laptop, for looking, with the two safeguards off. Saying so
 * costs nothing and stops someone trying Harbor that way and keeping documents in it.
 */
const HOSTS = [
  {
    name: "A box at home",
    spec: "Linux with Docker. A mini PC, a NUC, anything with a disk.",
    note: "The documents never leave the building, and the tailnet is the only way in.",
    href: doc("install"),
    cta: "The install guide",
  },
  {
    name: "A rented VPS",
    spec: "$5 to $10 a month, any provider, amd64 or arm64.",
    note: "Same install, same tailnet. The provider holds the disk, so the encrypted volume matters more.",
    href: doc("install"),
    cta: "The install guide",
  },
  {
    name: "A laptop, to look",
    spec: "The same images, no encrypted volume, no tailnet.",
    note: "For deciding whether you want it. Not for keeping documents in, and the page says so where you meet it.",
    href: doc("first-run"),
    cta: "Try it first",
  },
];

export function WhereItRuns() {
  return (
    <section className="gutter flex flex-col gap-[56px] border-y border-border bg-surface py-[104px]">
      <SectionHead
        eyebrow="Where it runs"
        title="A Linux machine with Docker, and that is the requirement"
        lead="Eight containers, published for amd64 and arm64. What differs between these three is not the software but who holds the disk."
        align="center"
        max="max-w-[640px]"
      />
      <ul className="grid gap-[20px] lg:grid-cols-3">
        {HOSTS.map((h) => (
          <li key={h.name} className="flex flex-col gap-[16px] rounded-lg border border-border bg-panel p-[28px]">
            <h3 className="text-title font-bold leading-[36px] tracking-tight text-text">{h.name}</h3>
            <p className="text-body leading-[24px] text-text">{h.spec}</p>
            <p className="text-body leading-[24px] text-muted">{h.note}</p>
            <Link
              href={h.href}
              className="mt-auto flex items-center gap-[8px] pt-[6px] text-body font-semibold leading-[22px] text-accent"
            >
              {h.cta}
              <Arrow size={14} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
