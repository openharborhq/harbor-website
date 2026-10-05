import Image from "next/image";
import { StaggerGroup, StaggerItem } from "./Stagger";
import type { Lang } from "@/lib/i18n";

/*
 * The two deep dives: what the vault does, and how a copy leaves it for an adviser.
 *
 * Each is a heading block beside a screenshot, then three claims under a 2px accent rule. The
 * screenshot alternates sides so the second does not read as a repeat of the first, and the
 * tinted one sits on `surface-2` with a 26px corner while the white one runs edge to edge.
 */
type DiveCopy = {
  eyebrow: string;
  title: string;
  lead: string;
  alt: string;
  claims: { head: string; copy: string }[];
};

type Dive = {
  id: string;
  src: string;
  side: "left" | "right";
  tint?: boolean;
  copy: Record<Lang, DiveCopy>;
};

const DIVES: Dive[] = [
  {
    id: "management",
    src: "/mock/slide-inbox@2x.png",
    side: "right",
    copy: {
      en: {
        eyebrow: "Your household vault",
        title: "Keep your records under your control",
        lead: "Run Harbor on your own hardware, control who has access, and keep encrypted backups ready for recovery.",
        alt: "Documents waiting in Harbor's Inbox, each with a summary and a suggested filing.",
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
      de: {
        eyebrow: "Der Tresor deines Haushalts",
        title: "Deine Unterlagen bleiben unter deiner Kontrolle",
        lead: "Betreibe Harbor auf deiner eigenen Hardware, bestimme, wer Zugriff hat, und halte verschlüsselte Backups für die Wiederherstellung bereit.",
        alt: "Dokumente in Harbors Inbox, jedes mit Zusammenfassung und vorgeschlagener Ablage.",
        claims: [
          {
            head: "Zugriff steuern",
            copy: "Mehr-Faktor-Authentifizierung schützt die Anmeldung. Entzieh einem verlorenen Gerät den Zugriff und prüf im Audit-Protokoll, wer auf deinen Tresor zugegriffen hat.",
          },
          {
            head: "Verschlüsselte Ablage",
            copy: "Harbor verschlüsselt jedes Dokument und setzt ein verschlüsseltes Datenvolume voraus, das du vor der Installation einrichtest. Standardmäßig bleibt das Volume nach einem Neustart gesperrt, bis du es entsperrst.",
          },
          {
            head: "Backups, die du prüfen kannst",
            copy: "Schick jede Nacht verschlüsselte Backups an Backblaze B2, einen SFTP-Server oder eine zweite Festplatte. Monatliche Wiederherstellungstests prüfen, ob sich deine Backups lesen und deine Dokumente entschlüsseln lassen.",
          },
        ],
      },
    },
  },
  {
    id: "sharing",
    src: "/mock/slide-home@2x.png",
    side: "left",
    tint: true,
    copy: {
      en: {
        eyebrow: "Secure sharing",
        title: "Share documents on your terms",
        lead: "Send records to your accountant, advisor, or anyone else who needs a copy. Choose the documents, set a download limit, and decide when the link expires.",
        alt: "Harbor's Home page: family members and items, each with a record count and what expires next.",
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
      de: {
        eyebrow: "Sicher teilen",
        title: "Teile Dokumente zu deinen Bedingungen",
        lead: "Schick Unterlagen an deine Steuerberatung, deine Finanzberatung oder alle anderen, die eine Kopie brauchen. Du wählst die Dokumente, legst ein Download-Limit fest und bestimmst, wann der Link abläuft.",
        alt: "Harbors Home-Seite: Familienmitglieder und Gegenstände, jeweils mit Anzahl der Unterlagen und dem, was als Nächstes abläuft.",
        claims: [
          {
            head: "Über Tailscale teilen",
            copy: "Mit Tailscale teilst du Dokumente, ohne Ports an deinem Router zu öffnen. Ein separater Freigabedienst regelt den Zugriff auf die geteilten Dateien.",
          },
          {
            head: "Wähle, wie du teilst",
            copy: "Du kannst auch über einen externen Storage-Bucket teilen. Empfänger rufen die geteilten Dateien ab, ohne sich mit deiner Harbor-Instanz zu verbinden.",
          },
          {
            head: "Geteilten Zugriff verfolgen",
            copy: "Im Freigabeverlauf siehst du Aufrufe und Downloads. Widerrufe einen Link jederzeit, um weiteren Zugriff darüber zu verhindern.",
          },
        ],
      },
    },
  },
];

export function DeepDives({ lang = "en" }: { lang?: Lang } = {}) {
  return (
    <>
      {DIVES.map((d) => {
        const t = d.copy[lang];
        return (
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
                  {t.eyebrow}
                </span>
                <h2 className="text-section-head font-bold leading-[1.1] tracking-tight text-text hyphens-auto">
                  {t.title}
                </h2>
                <p className="text-lead leading-copy text-muted">{t.lead}</p>
              </div>
              {/* The mock keeps its own hairline: a 2000px export scaled into half a column needs an
                  edge or it floats on the tint. */}
              <div
                className={`w-full overflow-hidden rounded-lg border border-border bg-panel lg:w-[56%] ${
                  d.side === "left" ? "lg:order-1" : ""
                }`}
              >
                <Image
                  src={d.src}
                  alt={t.alt}
                  width={2000}
                  height={1440}
                  sizes="(max-width: 1024px) 100vw, 640px"
                  className="block h-auto w-full"
                />
              </div>
            </div>

            <StaggerGroup as="ul" className="grid gap-[20px] md:grid-cols-3">
              {t.claims.map((c) => (
                <StaggerItem as="li" key={c.head} className="flex flex-col gap-[8px] border-t border-border pt-[18px]">
                  <h3 className="text-section font-bold leading-section tracking-snug text-text hyphens-auto">{c.head}</h3>
                  <p className="text-[15.5px] leading-[25px] text-muted">{c.copy}</p>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </section>
        );
      })}
    </>
  );
}
