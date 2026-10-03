import Image from "next/image";
import { StaggerGroup, StaggerItem } from "./Stagger";

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
    eyebrow: "Your household vault",
    title: "Keep your records under your control",
    lead: "Run Harbor on your own hardware, control who has access, and keep encrypted backups ready for recovery.",
    image: {
      src: "/mock/slide-inbox@2x.png",
      alt: "Documents waiting in Harbor's Inbox, each with a summary and a suggested filing.",
    },
    side: "right",
    claims: [
      {
        head: "Control access",
        copy: "Multi-factor authentication protects sign-in. Revoke access for a lost device and use the audit trail to review access to your vault.",
      },
      {
        head: "Encrypted storage",
        copy: "Harbor encrypts each document and requires an encrypted data volume, which you set up before installing. By default, the volume stays locked after a reboot until you unlock it.",
      },
      {
        head: "Backups you can check",
        copy: "Send encrypted nightly backups to Backblaze B2, an SFTP server, or a second disk. Monthly restore tests check that your backups can be read and your documents decrypted.",
      },
    ],
  },
  {
    id: "sharing",
    eyebrow: "Secure sharing",
    title: "Share documents on your terms",
    lead: "Send records to your accountant, advisor, or anyone else who needs a copy. Choose the documents, set a download limit, and decide when the link expires.",
    image: {
      src: "/mock/slide-home@2x.png",
      alt: "Harbor's Home page: family members and items, each with a record count and what expires next.",
    },
    side: "left",
    tint: true,
    claims: [
      {
        head: "Share through Tailscale",
        copy: "Use Tailscale to share documents without opening ports on your router. A separate sharing service handles access to the shared files.",
      },
      {
        head: "Choose how you share",
        copy: "You can also share through an external storage bucket. Recipients retrieve the shared files without connecting to your Harbor instance.",
      },
      {
        head: "Track shared access",
        copy: "Review views and downloads in the sharing history. Revoke a link at any time to prevent further access through it.",
      },
    ],
  },
];

export function DeepDives() {
  return (
    <>
      {DIVES.map((d) => (
        <section
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

          <StaggerGroup as="ul" className="grid gap-[20px] md:grid-cols-3">
            {d.claims.map((c) => (
              <StaggerItem as="li" key={c.head} className="flex flex-col gap-[8px] border-t border-border pt-[18px]">
                <h3 className="text-section font-bold leading-section tracking-snug text-text">{c.head}</h3>
                <p className="text-[15.5px] leading-[25px] text-muted">{c.copy}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </section>
      ))}
    </>
  );
}
