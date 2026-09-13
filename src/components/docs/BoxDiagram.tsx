/**
 * The appliance, as a diagram: what is outside, what runs on the box, and which container may
 * talk to which outside thing. Drawn in HTML so it reads as text as well as it looks.
 */
const OUTSIDE = [
  { id: "you", label: "Your laptop or phone", via: "over your tailnet, your own network, or a VPN" },
  { id: "mail", label: "Your mailbox", via: "IMAP, read only" },
  { id: "model", label: "The model you chose", via: "text of each document" },
  { id: "backup", label: "Your backup target", via: "encrypted snapshots, nightly" },
];

const CONTAINERS: { name: string; does: string; talks: string | null }[] = [
  { name: "tailscale", does: "optional: serves the app on your tailnet", talks: "you" },
  { name: "web", does: "the app", talks: null },
  { name: "api", does: "HTTP API, sessions, migrations", talks: null },
  { name: "worker", does: "OCR and text extraction; the only process that opens a document", talks: "none" },
  { name: "suggester", does: "titles, categories, dates, summaries", talks: "model" },
  { name: "mailfetch", does: "reads connected mailboxes", talks: "mail" },
  { name: "backup", does: "nightly dump and snapshot, monthly restore test", talks: "backup" },
  { name: "postgres · redis", does: "state and queues", talks: null },
];

export function BoxDiagram() {
  return (
    <figure className="doc-box">
      <div className="doc-box-outside">
        <p className="doc-box-caption">Outside the house</p>
        <ul>
          {OUTSIDE.map((o) => (
            <li key={o.id} id={`box-out-${o.id}`}>
              <span className="doc-box-outside-name">{o.label}</span>
              <span className="doc-box-outside-via">{o.via}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="doc-box-machine">
        <p className="doc-box-caption">The box</p>
        <ul className="doc-box-containers">
          {CONTAINERS.map((c) => (
            <li key={c.name} className="doc-box-container">
              <span className="doc-box-name">{c.name}</span>
              <span className="doc-box-does">{c.does}</span>
              <span className={`doc-box-talks ${c.talks === "none" ? "is-none" : c.talks ? "is-out" : "is-in"}`}>
                {c.talks === "none"
                  ? "no route out"
                  : c.talks
                    ? `talks to ${OUTSIDE.find((o) => o.id === c.talks)?.label.toLowerCase()}`
                    : "internal only"}
              </span>
            </li>
          ))}
        </ul>
        <p className="doc-box-volume">
          <span className="doc-box-name">/data</span> one encrypted volume: documents, database, queues, secrets
        </p>
      </div>
      <figcaption className="doc-box-legend">
        Nothing on the box listens on the public internet. Each container that talks outside talks to one thing.
      </figcaption>
    </figure>
  );
}
