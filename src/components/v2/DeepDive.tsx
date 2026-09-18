import Image from "next/image";

/*
 * The two deep dives: what the vault does, and how a copy leaves it for an adviser.
 *
 * Each is a heading block beside a screenshot, then three claims under a 2px accent rule. The
 * screenshot alternates sides so the second does not read as a repeat of the first, and the
 * tinted one sits on `surface-2` with a 26px corner while the white one runs edge to edge.
 */
type Dive = {
  id: string;
  eyebrow: string;
  title: string;
  lead: string;
  image: { src: string; alt: string };
  side: "left" | "right";
  tint?: boolean;
  claims: { head: string; copy: string }[];
};

const DIVES: Dive[] = [
  {
    id: "management",
    eyebrow: "Turn-key document management",
    title: "Complete, secure document management",
    lead: "Harbor means turn-key document management with a robust feature set and best-in-class security. Perfect for your household.",
    image: {
      src: "/mock/slide-inbox@2x.png",
      alt: "Documents waiting in Harbor's Inbox, each with a summary and a suggested filing.",
    },
    side: "right",
    claims: [
      {
        head: "Access security",
        copy: "With MFA out of the box, and revocable device tokens, Harbor provides best-in-class security to keep you in and everyone else out. A full audit trail shows who has accessed from where.",
      },
      {
        head: "Full device encryption",
        copy: "Harbor encrypts your storage volume to protect you in case your device gets stolen. Drives are encrypted and require unlock after each reboot so no one can access your data.",
      },
      {
        head: "S3 compatible backup",
        copy: "Choose your favorite backup provider such as Backblaze, Wasabi, or Amazon S3 to store data encrypted at rest. This also ensures easy recovery should your device ever fail.",
      },
    ],
  },
  {
    id: "sharing",
    eyebrow: "Secure sharing",
    title: "Secure sharing with your tax advisors",
    lead: "Too many tax professionals don't use proper security when handling your documents. Harbor puts you in charge by letting you define how long files are shared for, with whom, and how many times they can be downloaded.",
    image: {
      src: "/mock/slide-home@2x.png",
      alt: "Harbor's Home page: family members and items, each with a record count and what expires next.",
    },
    side: "left",
    tint: true,
    claims: [
      {
        head: "No firewalls to configure",
        copy: "Harbor configures your Tailscale access so you don't have to open or forward ports to share data. Isolated resources handle sharing securely without you having to lift a finger.",
      },
      {
        head: "Choose how you share",
        copy: "Optionally share using an external bucket. Files are encrypted and require a signing key which you provide. Harbor manages the entire lifecycle without anyone accessing your Harbor instance.",
      },
      {
        head: "Audit your files",
        copy: "See who viewed, downloaded, and how many times. Delivery receipts give you peace of mind that files were delivered. Remove access to shared links any time.",
      },
    ],
  },
];

export function DeepDives() {
  return (
    <>
      {DIVES.map((d) => (
        <section
      data-reveal
          key={d.id}
          id={d.id}
          className={`flex flex-col gap-[56px] lane py-[60px] md:py-[88px] ${
            d.tint ? "rounded-[26px] bg-surface-2" : "bg-ground"
          }`}
        >
          <div className="flex flex-col items-center gap-[48px] lg:flex-row lg:gap-[72px]">
            <div className={`flex w-full flex-col gap-[18px] lg:w-[44%] ${d.side === "left" ? "lg:order-2" : ""}`}>
              <span className="font-mono text-label font-medium uppercase leading-[14px] tracking-mono text-faint">
                {d.eyebrow}
              </span>
              <h2 className="text-section-head font-bold leading-[1.1] tracking-tight text-text">
                {d.title}
              </h2>
              <p className="text-lead leading-copy text-muted">{d.lead}</p>
            </div>
            {/* The mock keeps its own hairline: a 2000px export scaled into half a column needs an
                edge or it floats on the tint. */}
            <div
              className={`w-full overflow-hidden rounded-lg border border-border bg-panel lg:w-[56%] ${
                d.side === "left" ? "lg:order-1" : ""
              }`}
            >
              <Image
                src={d.image.src}
                alt={d.image.alt}
                width={2000}
                height={1440}
                sizes="(max-width: 1024px) 100vw, 640px"
                className="block h-auto w-full"
              />
            </div>
          </div>

          <ul className="grid gap-[20px] md:grid-cols-3">
            {d.claims.map((c) => (
              <li key={c.head} className="flex flex-col gap-[8px] border-t border-border pt-[18px]">
                <h3 className="text-section font-bold leading-section tracking-snug text-text">{c.head}</h3>
                <p className="text-[15.5px] leading-[25px] text-muted">{c.copy}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}
