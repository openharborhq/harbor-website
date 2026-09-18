import { SectionHead } from "./parts";

/*
 * The grid of reasons, each one a mechanism rather than an adjective.
 *
 * Every card here should survive a reader who checks it: the licence, the network, the cipher,
 * the restore test and the upgrade behaviour are all in the repository, and the cost line names
 * the household's own running costs rather than pretending there are none.
 */
const REASONS = [
  {
    head: "No company in between",
    copy: "AGPL-3.0, on hardware the household owns. Nobody can be compelled to hand over the records but the household, and nobody can change the terms.",
  },
  {
    head: "Reachable only on your tailnet",
    copy: "Given a Tailscale auth key, the vault answers on the tailnet over HTTPS and nothing listens on the machine's own interfaces. Without one it binds to localhost and you decide.",
  },
  {
    head: "Encrypted at rest, per file",
    copy: "AES-256-GCM under per-file keys, wrapped by a master key that lives on the encrypted volume and on the page you printed at install.",
  },
  {
    head: "Backups that are tested, not hoped for",
    copy: "A nightly restic snapshot to a second disk, an SFTP host or a B2 bucket, and a restore test that runs every month and tells you when it fails.",
  },
  {
    head: "Upgrades that back up first",
    copy: "harbor upgrade takes a backup, pulls the images and restarts — and refuses to go on if the backup failed.",
  },
  {
    head: "Pinned to a release tag",
    copy: "Installs pin to a tag rather than latest, so the box only moves when someone decides it should.",
  },
  {
    head: "Invitations, not seats",
    copy: "The household joins from Settings. There is no per-person price because there is nobody to pay.",
  },
  {
    head: "The costs are the ones you can see",
    copy: "The software is free. The box you already own or a VPS at $5 to $10 a month is not, and neither is a hosted model if you point the suggester at one.",
  },
];

export function WhyHarbor() {
  return (
    <section className="gutter flex flex-col gap-[56px] py-[88px]">
      <SectionHead
        eyebrow="Why Harbor"
        title="Every claim on this page is a mechanism"
        lead="The audience for a document vault reads the compose file before it trusts the copy. So each of these names the thing that makes it true."
        align="center"
        max="max-w-[640px]"
      />
      <ul className="grid gap-[20px] md:grid-cols-2 lg:grid-cols-4">
        {REASONS.map((r) => (
          <li key={r.head} className="flex flex-col gap-[10px] rounded-lg border border-border bg-surface-2 p-[24px]">
            <h3 className="font-title text-section leading-[26px] tracking-snug text-text">{r.head}</h3>
            <p className="text-body leading-[24px] text-muted">{r.copy}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
