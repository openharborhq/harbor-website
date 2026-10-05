import { StaggerGroup, StaggerItem } from "./Stagger";
import type { Lang } from "@/lib/i18n";

/*
 * The FAQ, in the position that answers the last objections before the final call to action.
 *
 * A plain list rather than an accordion: five questions is short enough to read straight through,
 * and collapsing them hides the two answers — cost and security — that the audience came for.
 */
const QUESTIONS: Record<Lang, { q: string; a: string }[]> = {
  en: [
    {
      q: "What does Harbor cost?",
      a: "Harbor is free and open source. You provide the hardware or hosting. Backup storage and a hosted AI provider may have their own charges, depending on what you choose.",
    },
    {
      q: "What do I need to get started?",
      a: "You need a Linux machine with Docker, an encrypted data volume, and somewhere to keep backups. The setup guide walks you through preparing the machine, running the installer, and creating your household vault. Setup involves using the command line.",
    },
    {
      q: "How do backups work?",
      a: "Once configured, Harbor makes encrypted nightly backups to Backblaze B2, an SFTP server, or a second disk. It tests a restore each month and shows the results in Settings. Keep your recovery keys somewhere safe, separate from the machine: you need them to recover your records if it fails.",
    },
    {
      q: "How does Harbor protect my data?",
      a: "Harbor encrypts your documents, requires an encrypted data volume, and protects sign-in with multi-factor authentication. You control access to the vault and remain responsible for the machine and its backups. If you choose a hosted AI provider, Harbor sends it text from your documents to generate suggestions. You can use a local model instead.",
    },
    {
      q: "What hardware can I use?",
      a: "A Raspberry Pi 5 with an SSD or a small Linux PC can run Harbor. Plan for at least 100 GB of available storage. The setup guide uses Debian 12; check the prerequisites before preparing your machine.",
    },
  ],
  de: [
    {
      q: "Was kostet Harbor?",
      a: "Harbor ist kostenlos und Open Source. Hardware oder Hosting stellst du selbst. Für Backup-Speicher und einen gehosteten KI-Anbieter können eigene Kosten anfallen, je nachdem, was du wählst.",
    },
    {
      q: "Was brauche ich, um loszulegen?",
      a: "Du brauchst einen Linux-Rechner mit Docker, ein verschlüsseltes Datenvolume und einen Ort für Backups. Die Installationsanleitung führt dich durch die Vorbereitung des Rechners, den Installer und das Anlegen des Tresors für deinen Haushalt. Für die Einrichtung arbeitest du auf der Kommandozeile.",
    },
    {
      q: "Wie funktionieren Backups?",
      a: "Sobald sie eingerichtet sind, erstellt Harbor jede Nacht verschlüsselte Backups auf Backblaze B2, einem SFTP-Server oder einer zweiten Festplatte. Jeden Monat führt Harbor einen Wiederherstellungstest durch und zeigt das Ergebnis unter Settings an. Bewahre deine Wiederherstellungsschlüssel sicher und getrennt vom Rechner auf: Fällt er aus, brauchst du sie, um deine Unterlagen wiederherzustellen.",
    },
    {
      q: "Wie schützt Harbor meine Daten?",
      a: "Harbor verschlüsselt deine Dokumente, setzt ein verschlüsseltes Datenvolume voraus und schützt die Anmeldung mit Mehr-Faktor-Authentifizierung. Du bestimmst, wer auf den Tresor zugreift, und bleibst für den Rechner und seine Backups verantwortlich. Wenn du einen gehosteten KI-Anbieter wählst, schickt Harbor ihm Text aus deinen Dokumenten, um Vorschläge zu erzeugen. Stattdessen kannst du auch ein lokales Modell verwenden.",
    },
    {
      q: "Welche Hardware kann ich verwenden?",
      a: "Ein Raspberry Pi 5 mit SSD oder ein kleiner Linux-PC reicht für Harbor. Plane mindestens 100 GB freien Speicher ein. Die Installationsanleitung verwendet Debian 12; prüf die Voraussetzungen, bevor du deinen Rechner vorbereitest.",
    },
  ],
};

const TITLE: Record<Lang, string> = {
  en: "A few things to know before you start",
  de: "Was du vor dem Start wissen solltest",
};

/**
 * The pricing page asks its own questions in the same shape, so the words are props and the
 * home page's are the defaults.
 */
export function Faq({
  title,
  questions,
  lang = "en",
}: {
  /** Defaults to the home page's heading in `lang`. */
  title?: string;
  /** Defaults to the home page's questions in `lang`. */
  questions?: { q: string; a: string }[];
  lang?: Lang;
} = {}) {
  const heading = title ?? TITLE[lang];
  const items = questions ?? QUESTIONS[lang];

  return (
    <section id="faq" className="flex flex-col items-center gap-[56px] bg-ground lane py-[60px] md:py-[88px]">
      <div className="flex w-full flex-col items-center gap-[18px]">
        <span className="font-mono text-label font-medium leading-[14px] tracking-mono text-faint">FAQ</span>
        <h2 className="max-w-[860px] text-center text-section-head font-bold leading-[1.1] tracking-tight text-text hyphens-auto">
          {heading}
        </h2>
      </div>

      <StaggerGroup as="dl" className="flex w-full max-w-[860px] flex-col">
        {items.map((item, i) => (
          <StaggerItem
            key={item.q}
            className={`flex flex-col gap-[10px] py-[28px] ${i > 0 ? "border-t border-border" : "pt-0"}`}
          >
            <dt className="text-section font-bold leading-[26px] tracking-snug text-text">{item.q}</dt>
            <dd className="text-[15.5px] leading-[26px] text-muted">{item.a}</dd>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
