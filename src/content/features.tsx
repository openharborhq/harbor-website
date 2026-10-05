import type { FeatureGroup } from "@/components/features/FeatureSection";
import type { Lang } from "@/lib/i18n";

/*
 * The six feature groups, and the one copy of them.
 *
 * They used to live inside `app/features/page.tsx`. When the v2 page arrived and wanted the same
 * six groups under a different layout, the choice was to copy 280 lines of prose into a second
 * file or to move them here; a second copy is a second thing to edit and the one that gets
 * forgotten. The layout belongs to each page, the words belong to both.
 *
 * One copy per language now. The icons are drawn once, below, and both languages point at the
 * same drawings; the ids are the same in both, so `/features#share` and `/de/features#share` land
 * on the same band.
 */

const ICON = {
  mailbox: (
    <>
      <path d="M2.5 5.5h17v11h-17z" strokeLinejoin="round" />
      <path d="M2.5 5.5L11 12l8.5-6.5" strokeLinejoin="round" />
    </>
  ),
  address: (
    <>
      <path d="M3 4.5h16v13h-16z" strokeLinejoin="round" />
      <path d="M7 9.5h8M7 13h5" strokeLinecap="round" />
    </>
  ),
  upload: <path d="M11 15.5V3.5M6.5 8L11 3.5 15.5 8M3.5 13.5v4a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-4" strokeLinecap="round" strokeLinejoin="round" />,
  ocr: (
    <>
      <path d="M4 3.5h9l5 5v10h-14z M13 3.5v5h5" strokeLinejoin="round" />
      <path d="M6.8 12h6M6.8 15h4" strokeLinecap="round" />
    </>
  ),
  summary: (
    <>
      <path d="M4 3.5h9l5 5v10h-14z M13 3.5v5h5" strokeLinejoin="round" />
      <path d="M6.8 12.5h8M6.8 15.5h5" strokeLinecap="round" />
    </>
  ),
  tag: (
    <>
      <path d="M3.5 10.6V4.5a1 1 0 0 1 1-1h6.1a1 1 0 0 1 .71.3l7.2 7.2a1 1 0 0 1 0 1.41l-6.1 6.1a1 1 0 0 1-1.41 0l-7.2-7.2a1 1 0 0 1-.3-.71z" strokeLinejoin="round" />
      <circle cx="7.4" cy="7.4" r="1.5" />
    </>
  ),
  categories: <path d="M3.5 6.5h6v6h-6z M12.5 6.5h6v6h-6z M3.5 15.5h6v3h-6z M12.5 15.5h6v3h-6z" strokeLinejoin="round" />,
  people: (
    <>
      <circle cx="8.4" cy="7.6" r="3.1" />
      <path d="M3.2 18.5c0-2.9 2.33-5.2 5.2-5.2s5.2 2.3 5.2 5.2" strokeLinecap="round" />
      <path d="M14.5 6.5h4.3v4.3h-4.3z M14.5 13.9h4.3v4.3h-4.3z" strokeLinejoin="round" />
    </>
  ),
  search: (
    <>
      <circle cx="10" cy="10" r="6.5" />
      <path d="M14.8 14.8L19 19" strokeLinecap="round" />
    </>
  ),
  globe: (
    <>
      <circle cx="11" cy="11" r="7.5" />
      <path d="M3.5 11h15M11 3.5c2 2.2 3 4.8 3 7.5s-1 5.3-3 7.5c-2-2.2-3-4.8-3-7.5s1-5.3 3-7.5z" strokeLinejoin="round" />
    </>
  ),
  filter: <path d="M3.5 5h15l-5.8 6.6v5.2l-3.4 2v-7.2z" strokeLinejoin="round" />,
  original: (
    <>
      <path d="M4.5 3.5h8l5 5v10h-13z" strokeLinejoin="round" />
      <path d="M12.5 3.5v5h5" strokeLinejoin="round" />
      <path d="M7.4 12.2l1.5 1.5 3.2-3.3" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  receipt: (
    <>
      <path d="M5 3.5h12v15l-2.4-1.6-2.4 1.6-2.4-1.6-2.4 1.6-2.4-1.6z" strokeLinejoin="round" />
      <path d="M8.4 8h5.2M8.4 11.4h3.4" strokeLinecap="round" />
    </>
  ),
  calendar: (
    <>
      <path d="M3.5 5.5h15v13h-15z M3.5 9.5h15M7.5 3v4M14.5 3v4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.6 13.6l1.6 1.6 3.4-3.4" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  money: (
    <>
      <circle cx="11" cy="11" r="7.5" />
      <path d="M13.4 8.2c-.6-.7-1.5-1.1-2.4-1.1-1.7 0-3.1 1.3-3.1 2.9s1.4 2.9 3.1 2.9 3.1 1.3 3.1 2.9M11 5.6v10.8" strokeLinecap="round" />
    </>
  ),
  list: (
    <>
      <circle cx="5.6" cy="6.6" r="2.1" />
      <circle cx="5.6" cy="14.8" r="2.1" />
      <path d="M10.2 6.6h8.3M10.2 14.8h8.3" strokeLinecap="round" />
    </>
  ),
  household: (
    <>
      <circle cx="7.8" cy="8" r="2.6" />
      <circle cx="15" cy="8.6" r="2.1" />
      <path d="M3.2 17.6c0-2.5 2.06-4.6 4.6-4.6s4.6 2.1 4.6 4.6M14.4 13.2c2.2.2 3.9 2 3.9 4.4" strokeLinecap="round" />
    </>
  ),
  link: (
    <>
      <path d="M9.2 12.8a3.4 3.4 0 0 0 5.1.37l2.4-2.4a3.4 3.4 0 0 0-4.8-4.8l-1.37 1.36" strokeLinecap="round" />
      <path d="M12.8 9.2a3.4 3.4 0 0 0-5.1-.37l-2.4 2.4a3.4 3.4 0 0 0 4.8 4.8l1.36-1.36" strokeLinecap="round" />
    </>
  ),
  breakGlass: (
    <>
      <path d="M3.5 6h15v11h-15z" strokeLinejoin="round" />
      <path d="M3.5 6l7.5 5.6L18.5 6" strokeLinejoin="round" />
      <circle cx="16.6" cy="15.4" r="3.1" fill="var(--color-ground)" />
    </>
  ),
  clock: (
    <>
      <circle cx="11" cy="11" r="7.5" />
      <path d="M11 6.4V11l3.2 2.2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  code: <path d="M8 14.5L4.5 11 8 7.5M14 7.5L17.5 11 14 14.5M12.4 5.4l-2.8 11.2" strokeLinecap="round" strokeLinejoin="round" />,
  server: (
    <>
      <path d="M3.5 4.5h15v5h-15z M3.5 12.5h15v5h-15z" strokeLinejoin="round" />
      <path d="M6.6 7h.01M6.6 15h.01" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  backup: (
    <>
      <ellipse cx="11" cy="5.5" rx="7.5" ry="2.8" />
      <path d="M3.5 5.5v11c0 1.55 3.36 2.8 7.5 2.8s7.5-1.25 7.5-2.8v-11M3.5 11c0 1.55 3.36 2.8 7.5 2.8s7.5-1.25 7.5-2.8" />
    </>
  ),
  lock: (
    <>
      <path d="M6.5 9.5V7a4.5 4.5 0 0 1 9 0v2.5" strokeLinecap="round" />
      <path d="M4.5 9.5h13v9h-13z" strokeLinejoin="round" />
    </>
  ),
};

const EN: FeatureGroup[] = [
  {
    id: "capture",
    number: "01",
    label: "CAPTURE",
    title: "File upload and email monitoring",
    lead: "Connect a mailbox, forward email, or upload files. Harbor extracts readable text and brings new documents into your Inbox.",
    items: [
      {
        icon: ICON.mailbox,
        title: "Connect your inbox",
        copy: "Connect a supported mailbox over IMAP. Approve senders for automatic filing and review mail from other senders.",
      },
      {
        icon: ICON.address,
        title: "One address for the household",
        copy: "Set up a dedicated mailbox for forwarded documents. Harbor collects them so you can review and file them in one place.",
      },
      {
        icon: ICON.upload,
        title: "Upload files and scans",
        copy: "Extract text from PDFs, scans, and photos, or upload a ZIP of documents. Word and Excel files can be stored, but their contents are not searchable.",
      },
      {
        icon: ICON.ocr,
        title: "OCR text recognition",
        copy: "Harbor extracts text from scans and photos using optical character recognition. Search the extracted text without opening each file.",
      },
    ],
  },
  {
    id: "analyze",
    number: "02",
    label: "ANALYZE",
    title: "File analysis and summarization",
    lead: "Connect a language model to get summaries and suggested categories, tags, people, and dates. Review the suggestions and correct them before accepting.",
    items: [
      {
        icon: ICON.summary,
        title: "Document summaries",
        copy: "See a short summary of a document and its key details. Check amounts and dates against the original before acting on them.",
      },
      {
        icon: ICON.tag,
        title: "Tags from the document itself",
        copy: "Use tags for details such as the insurer, year, or address. Harbor suggests existing tags; you can add or change them.",
      },
      {
        icon: ICON.categories,
        title: "Categories you decide",
        copy: "Start with Identity, Real Estate, Money, Taxes and Health. Rename them, nest them, add the ones your household actually uses.",
      },
      {
        icon: ICON.people,
        title: "People and things",
        copy: "Link records to household members, properties, vehicles, and accounts. Open an item to see the documents associated with it.",
      },
    ],
  },
  {
    id: "find",
    number: "03",
    label: "FIND",
    title: "Search inside your documents",
    lead: "Find a document by its title, tags, notes, or extracted text—even when you cannot remember the filename.",
    items: [
      {
        icon: ICON.search,
        title: "Full-text search",
        copy: "Search text extracted from documents, including scans. Results show the matching text to help you find the right record.",
      },
      {
        icon: ICON.globe,
        title: "Language-aware search",
        copy: "Configure OCR for the languages in your documents. Search supports English and German word forms, and a connected model can provide translated summaries.",
      },
      {
        icon: ICON.filter,
        title: "Narrow it to one person or one thing",
        copy: "Filter by person, property, category, tag, or date. Open a vehicle to see its linked receipts, policies, and other records.",
      },
      {
        icon: ICON.original,
        title: "The original, plus what it means",
        copy: "View the original document alongside its summary, tags, notes, versions, and change history.",
      },
    ],
  },
  {
    id: "get-notified",
    number: "04",
    label: "TRACK DEADLINES",
    title: "Keep track of important dates",
    lead: "Review upcoming expirations and tasks in Harbor. Reminders stay in the app; there is no email digest or calendar feed.",
    items: [
      {
        icon: ICON.receipt,
        title: "Invoices and bills that are due",
        copy: "Accept a suggested payment task with its due date and amount, or add one yourself. Each linked task leads back to its document.",
      },
      {
        icon: ICON.calendar,
        title: "Passports, licences and ID cards",
        copy: "Review expiration dates suggested from your documents. Home shows upcoming expirations for the people and things in your vault.",
      },
      {
        icon: ICON.money,
        title: "Keep payment details together",
        copy: "Keep a payment amount and its currency with the task, so the details stay alongside the deadline.",
      },
      {
        icon: ICON.list,
        title: "One list, in the order it is due",
        copy: "See overdue tasks, what is due today, and what comes next. Completed tasks remain in the record so you can check them later.",
      },
    ],
  },
  {
    id: "share",
    number: "05",
    label: "SHARE",
    title: "Secure sharing on your terms",
    lead: "Invite household members to your vault or share selected documents with someone outside it, such as your accountant.",
    items: [
      {
        icon: ICON.household,
        title: "The whole household",
        copy: "Give household members their own sign-in. Everyone you invite can see every filed document; use a shared link to send only selected records.",
      },
      {
        icon: ICON.link,
        title: "Links that expire on their own",
        copy: "Send selected documents through a shared link. Set an expiration date and download limit, or revoke access early.",
      },
      {
        icon: ICON.breakGlass,
        title: "Break-glass access",
        copy: "Keep a printed recovery sheet somewhere safe, separate from the server. It holds the keys and backup details needed to recover the vault.",
      },
      {
        icon: ICON.clock,
        title: "A record of who did what",
        copy: "Review document changes and sharing activity to see how records have been updated and accessed.",
      },
    ],
  },
  {
    id: "open-source",
    number: "06",
    label: "OPEN SOURCE",
    title: "An open-source vault you control",
    lead: "Run Harbor on hardware or hosting you control. Choose your backup destination and AI provider, and keep the recovery keys for your encrypted records.",
    items: [
      {
        icon: ICON.code,
        title: "Open source, AGPL-3.0",
        copy: "Read the source, follow development, and contribute changes. Harbor is available under the AGPL-3.0 license.",
      },
      {
        icon: ICON.server,
        title: "Fully self-hostable",
        copy: "Run Harbor on a Linux machine with Docker and an encrypted data volume. The setup guide explains the hardware and storage requirements.",
      },
      {
        icon: ICON.backup,
        title: "Backups you have actually restored",
        copy: "Configure encrypted nightly backups to Backblaze B2, an SFTP server, or a second disk. Harbor runs a monthly restore test and shows the result in Settings.",
      },
      {
        icon: ICON.lock,
        title: "Choose your AI provider",
        copy: "Use a local model or connect a hosted provider, which receives document text for suggestions. Harbor also works without AI summaries.",
      },
    ],
  },
];

const DE: FeatureGroup[] = [
  {
    id: "capture",
    number: "01",
    label: "ERFASSEN",
    title: "Datei-Upload und E-Mail-Überwachung",
    lead: "Verbinde ein Postfach, leite E-Mails weiter oder lade Dateien hoch. Harbor extrahiert lesbaren Text und legt neue Dokumente in deiner Inbox ab.",
    items: [
      {
        icon: ICON.mailbox,
        title: "Postfach verbinden",
        copy: "Verbinde ein unterstütztes Postfach über IMAP. Absender, die du freigibst, werden automatisch abgelegt; E-Mails von anderen Absendern prüfst du selbst.",
      },
      {
        icon: ICON.address,
        title: "Eine Adresse für den ganzen Haushalt",
        copy: "Richte ein eigenes Postfach für weitergeleitete Dokumente ein. Harbor sammelt sie, damit du sie an einer Stelle prüfen und ablegen kannst.",
      },
      {
        icon: ICON.upload,
        title: "Dateien und Scans hochladen",
        copy: "Harbor extrahiert Text aus PDFs, Scans und Fotos; du kannst auch ein ZIP mit Dokumenten hochladen. Word- und Excel-Dateien lassen sich speichern, ihr Inhalt ist aber nicht durchsuchbar.",
      },
      {
        icon: ICON.ocr,
        title: "Texterkennung (OCR)",
        copy: "Harbor extrahiert Text aus Scans und Fotos per optischer Zeichenerkennung. Du durchsuchst den extrahierten Text, ohne jede Datei einzeln öffnen zu müssen.",
      },
    ],
  },
  {
    id: "analyze",
    number: "02",
    label: "ANALYSIEREN",
    title: "Dateien analysieren und zusammenfassen",
    lead: "Verbinde ein Sprachmodell, um Zusammenfassungen und Vorschläge für Kategorien, Tags, Personen und Datumsangaben zu bekommen. Du prüfst die Vorschläge und korrigierst sie, bevor du sie übernimmst.",
    items: [
      {
        icon: ICON.summary,
        title: "Zusammenfassungen",
        copy: "Sieh dir eine kurze Zusammenfassung eines Dokuments und seine wichtigsten Angaben an. Gleiche Beträge und Datumsangaben mit dem Original ab, bevor du danach handelst.",
      },
      {
        icon: ICON.tag,
        title: "Tags aus dem Dokument selbst",
        copy: "Nutze Tags für Angaben wie Versicherer, Jahr oder Adresse. Harbor schlägt vorhandene Tags vor; du kannst sie ergänzen oder ändern.",
      },
      {
        icon: ICON.categories,
        title: "Kategorien, die du festlegst",
        copy: "Zum Start gibt es Identität, Immobilien, Finanzen, Steuern und Gesundheit. Benenne sie um, verschachtle sie, ergänze die, die dein Haushalt tatsächlich braucht.",
      },
      {
        icon: ICON.people,
        title: "Personen und Dinge",
        copy: "Verknüpfe Dokumente mit Haushaltsmitgliedern, Immobilien, Fahrzeugen und Konten. Öffne einen Eintrag, um die zugehörigen Dokumente zu sehen.",
      },
    ],
  },
  {
    id: "find",
    number: "03",
    label: "FINDEN",
    title: "Suche in deinen Dokumenten",
    lead: "Finde ein Dokument über Titel, Tags, Notizen oder extrahierten Text – auch wenn dir der Dateiname nicht mehr einfällt.",
    items: [
      {
        icon: ICON.search,
        title: "Volltextsuche",
        copy: "Durchsuche den aus Dokumenten extrahierten Text, auch bei Scans. Die Treffer zeigen die passende Textstelle, damit du das richtige Dokument findest.",
      },
      {
        icon: ICON.globe,
        title: "Suche mit Sprachunterstützung",
        copy: "Stell die Texterkennung auf die Sprachen deiner Dokumente ein. Die Suche berücksichtigt englische und deutsche Wortformen, und ein verbundenes Modell kann übersetzte Zusammenfassungen liefern.",
      },
      {
        icon: ICON.filter,
        title: "Auf eine Person oder eine Sache eingrenzen",
        copy: "Filtere nach Person, Immobilie, Kategorie, Tag oder Datum. Öffne ein Fahrzeug, um die verknüpften Belege, Policen und anderen Dokumente zu sehen.",
      },
      {
        icon: ICON.original,
        title: "Das Original und was es bedeutet",
        copy: "Sieh dir das Originaldokument neben Zusammenfassung, Tags, Notizen, Versionen und Änderungsverlauf an.",
      },
    ],
  },
  {
    id: "get-notified",
    number: "04",
    label: "FRISTEN IM BLICK",
    title: "Wichtige Termine im Blick behalten",
    lead: "Sieh dir anstehende Ablaufdaten und Aufgaben in Harbor an. Erinnerungen gibt es nur in der App; es gibt keine E-Mail-Zusammenfassung und keinen Kalender-Feed.",
    items: [
      {
        icon: ICON.receipt,
        title: "Fällige Rechnungen",
        copy: "Übernimm eine vorgeschlagene Zahlungsaufgabe mit Fälligkeitsdatum und Betrag oder leg selbst eine an. Jede verknüpfte Aufgabe führt zurück zu ihrem Dokument.",
      },
      {
        icon: ICON.calendar,
        title: "Reisepässe, Führerscheine und Ausweise",
        copy: "Prüfe Ablaufdaten, die Harbor aus deinen Dokumenten vorschlägt. Die Startseite zeigt, was bei den Personen und Dingen in deinem Tresor demnächst abläuft.",
      },
      {
        icon: ICON.money,
        title: "Zahlungsangaben beisammen",
        copy: "Speichere Betrag und Währung direkt an der Aufgabe, damit die Angaben bei der Frist bleiben.",
      },
      {
        icon: ICON.list,
        title: "Eine Liste, nach Fälligkeit sortiert",
        copy: "Sieh, was überfällig ist, was heute fällig wird und was als Nächstes kommt. Erledigte Aufgaben bleiben erhalten, sodass du sie später nachsehen kannst.",
      },
    ],
  },
  {
    id: "share",
    number: "05",
    label: "TEILEN",
    title: "Sicher teilen, zu deinen Bedingungen",
    lead: "Lade Haushaltsmitglieder in deinen Tresor ein oder teile ausgewählte Dokumente mit jemandem außerhalb, etwa mit deinem Steuerbüro.",
    items: [
      {
        icon: ICON.household,
        title: "Der ganze Haushalt",
        copy: "Gib Haushaltsmitgliedern eine eigene Anmeldung. Alle, die du einlädst, sehen jedes abgelegte Dokument; über einen Freigabelink verschickst du nur ausgewählte Dokumente.",
      },
      {
        icon: ICON.link,
        title: "Links, die von selbst ablaufen",
        copy: "Verschicke ausgewählte Dokumente über einen Freigabelink. Leg ein Ablaufdatum und ein Download-Limit fest oder widerrufe den Zugriff vorzeitig.",
      },
      {
        icon: ICON.breakGlass,
        title: "Notfallzugang (Break-Glass)",
        copy: "Bewahre ein ausgedrucktes Wiederherstellungsblatt an einem sicheren Ort auf, getrennt vom Server. Es enthält die Schlüssel und Backup-Angaben, die du brauchst, um den Tresor wiederherzustellen.",
      },
      {
        icon: ICON.clock,
        title: "Nachvollziehbar, wer was getan hat",
        copy: "Sieh dir Änderungen an Dokumenten und Freigaben an, um nachzuvollziehen, wie Dokumente bearbeitet und abgerufen wurden.",
      },
    ],
  },
  {
    id: "open-source",
    number: "06",
    label: "OPEN SOURCE",
    title: "Ein Open-Source-Tresor unter deiner Kontrolle",
    lead: "Betreibe Harbor auf eigener Hardware oder einem Hosting, das du kontrollierst. Wähle dein Backup-Ziel und deinen KI-Anbieter, und behalte die Wiederherstellungsschlüssel für deine verschlüsselten Daten selbst.",
    items: [
      {
        icon: ICON.code,
        title: "Open Source, AGPL-3.0",
        copy: "Lies den Quellcode, verfolge die Entwicklung und trag Änderungen bei. Harbor steht unter der Lizenz AGPL-3.0.",
      },
      {
        icon: ICON.server,
        title: "Vollständig selbst hostbar",
        copy: "Betreibe Harbor auf einem Linux-Rechner mit Docker und einem verschlüsselten Datenvolume. Die Installationsanleitung beschreibt die Anforderungen an Hardware und Speicher.",
      },
      {
        icon: ICON.backup,
        title: "Backups, die du wirklich wiederhergestellt hast",
        copy: "Richte verschlüsselte nächtliche Backups zu Backblaze B2, auf einen SFTP-Server oder auf eine zweite Festplatte ein. Harbor führt jeden Monat einen Wiederherstellungstest durch und zeigt das Ergebnis in den Einstellungen.",
      },
      {
        icon: ICON.lock,
        title: "Wähle deinen KI-Anbieter",
        copy: "Nutze ein lokales Modell oder verbinde einen gehosteten Anbieter, der dafür den Text deiner Dokumente erhält. Harbor funktioniert auch ohne KI-Zusammenfassungen.",
      },
    ],
  },
];

/** The six groups in each language. Same ids, same order, same icons; only the words differ. */
export const GROUPS: Record<Lang, FeatureGroup[]> = { en: EN, de: DE };
