import Link from "next/link";

/**
 * The question the install guide starts with: where will Harbor run? Each answer is a guide of its
 * own, written for that machine from the first step, instead of one script with footnotes.
 */
const GROUPS: { label: string; options: { slug: string; title: string; copy: string }[] }[] = [
  {
    label: "At home",
    options: [
      {
        slug: "install-at-home",
        title: "Your own hardware",
        copy: "A mini PC, NUC, Protectli box or Raspberry Pi 5 in your house. The most private choice: the disk is yours and encrypted.",
      },
    ],
  },
  {
    label: "In the cloud",
    options: [
      { slug: "install-digitalocean", title: "DigitalOcean", copy: "A Droplet, with a Volume for the encrypted data." },
      { slug: "install-hetzner", title: "Hetzner Cloud", copy: "A cloud server, x86 or Arm, with a Volume for the encrypted data." },
      {
        slug: "install-vps",
        title: "Another cloud provider",
        copy: "Vultr, Akamai (Linode), OVHcloud, Scaleway, AWS Lightsail, or any server that runs Debian.",
      },
    ],
  },
  {
    label: "Something else",
    options: [
      {
        slug: "install-existing-server",
        title: "A server you already run",
        copy: "A home server or VPS that already runs Docker and other services, maybe behind a reverse proxy.",
      },
      { slug: "install-trial", title: "Try it on your computer", copy: "Docker Desktop on a Mac, to look around first. Not for real paperwork." },
    ],
  },
];

export function InstallChooser() {
  return (
    <nav className="doc-choose" aria-label="Where will Harbor run?">
      {GROUPS.map((g) => (
        <div key={g.label} className="doc-choose-group">
          <p className="doc-choose-label">{g.label}</p>
          <ul className="doc-choose-list">
            {g.options.map((o) => (
              <li key={o.slug}>
                <Link href={`/docs/${o.slug}`} className="doc-choose-card">
                  <span className="doc-choose-title">
                    {o.title} <span aria-hidden="true">→</span>
                  </span>
                  <span className="doc-choose-copy">{o.copy}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
