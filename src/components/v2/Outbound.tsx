import Link from "next/link";
import { GITHUB } from "@/lib/github";
import { Arrow, Eyebrow } from "./parts";

/*
 * The honest section, and the reason this page can be read by someone who opens the compose file
 * afterwards.
 *
 * A self-hosted product is tempted to say "nothing leaves your house". For Harbor that is false:
 * the suggester talks to whichever model the owner pointed it at, mailfetch talks to IMAP hosts,
 * backup talks to the repository. Saying so here — and naming the one process that opens documents
 * as the one with no route out — is worth more than the claim it gives up.
 *
 * The rows are the container table from the repository's README. If that table changes, this
 * changes with it.
 */
const CONTAINERS = [
  { name: "worker", does: "OCR, thumbnails, text extraction — the only process that opens documents", net: "No route out", tone: "closed" },
  { name: "suggester", does: "Titles, categories and dates, from the model you chose, or none at all", net: "Out to that provider", tone: "open" },
  { name: "mailfetch", does: "Reads connected mailboxes; the only process that unseals mail passwords", net: "Out to IMAP hosts", tone: "open" },
  { name: "backup", does: "Nightly pg_dump and restic snapshot, monthly restore test", net: "Out to the repository", tone: "open" },
  { name: "tailscale", does: "Serves the app on your tailnet over HTTPS", net: "Your tailnet only", tone: "closed" },
  { name: "api", does: "HTTP API, migrations, sessions", net: "Internal, plus autodiscover", tone: "open" },
  { name: "web", does: "The app itself", net: "No host port of its own", tone: "closed" },
  { name: "postgres, redis", does: "State and queues, on the encrypted volume", net: "Internal", tone: "closed" },
] as const;

export function Outbound() {
  return (
    <section id="what-leaves" className="gutter flex flex-col gap-[52px] bg-terminal py-[88px]">
      <div className="flex flex-col gap-[18px]">
        <Eyebrow>What leaves the house</Eyebrow>
        <h2 className="max-w-[820px] text-section-head font-bold leading-[1.1] tracking-tight text-[#ffffff]">
          Three of the eight containers talk to the internet. Here they are.
        </h2>
        <p className="max-w-[700px] text-lead leading-copy text-on-dark">
          Harbor will not tell you that nothing leaves. It tells you what does, and to whom, because that is the
          version that survives someone reading the compose file afterwards.
        </p>
      </div>

      <ul className="flex flex-col">
        {CONTAINERS.map((c, i) => (
          <li
            key={c.name}
            className={`flex flex-col gap-[6px] py-[18px] md:flex-row md:items-baseline md:gap-[24px] ${i > 0 ? "border-t border-hairline-dark" : ""}`}
          >
            <span className="w-[160px] shrink-0 font-mono text-[13.5px] font-medium leading-[22px] text-accent-on-dark">
              {c.name}
            </span>
            <span className="flex-1 text-[15.5px] leading-[25px] text-on-dark">{c.does}</span>
            {/* The network column is the point of the table, so it keeps a fixed slot on the right
                rather than trailing the sentence at whatever width it lands. */}
            <span
              className={`w-[210px] shrink-0 font-mono text-[12.5px] leading-[20px] md:text-right ${
                c.tone === "open" ? "text-[#ffffff]" : "text-faint"
              }`}
            >
              {c.net}
            </span>
          </li>
        ))}
      </ul>

      <div className="flex flex-col items-start gap-[22px] rounded-lg border border-hairline-dark p-[28px] lg:flex-row lg:items-center lg:justify-between lg:gap-[48px]">
        <p className="max-w-[620px] text-[15.5px] leading-[25px] text-on-dark">
          Blobs are AES-256-GCM under per-file keys wrapped by a master key that lives on the encrypted volume and on
          a page you print. Postgres holds the OCR text in the clear, which is why the data directory has to sit on
          an encrypted volume — and why the install check refuses when it does not.
        </p>
        <Link
          href={`${GITHUB}#what-runs`}
          className="flex shrink-0 items-center gap-[9px] rounded-pill border border-on-dark px-[24px] py-[13px] text-body font-semibold leading-[18px] text-[#ffffff]"
        >
          Read the container table
          <Arrow size={15} />
        </Link>
      </div>
    </section>
  );
}
