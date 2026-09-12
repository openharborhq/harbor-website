const ITEMS = [
  {
    n: "01",
    title: "Capture directly from your inbox",
    copy: "Harbor categorizes important documents directly from your Gmail inbox. Auto-tagging puts due bills into your Harbor task list.",
  },
  {
    n: "02",
    title: "Find anything, instantly",
    copy: "Full text indexing means instant access to any document with multi-language support. Search in English even if your docs are German.",
  },
  {
    n: "03",
    title: "Your data, on your device",
    copy: "With carrier-grade security, Harbor can be a self-hosted solution. Your data is not stored in the cloud, managed by a company. You control access, storage, and backup.",
  },
];

export function Positioning() {
  return (
    <section id="features" className="gutter flex flex-col gap-16 border-y border-border bg-surface pb-[104px] pt-[112px] lg:flex-row lg:gap-[120px]">
      <div className="flex max-w-[451px] shrink-0 flex-col gap-[26px]">
        <h2 className="text-section-head font-bold leading-section-head tracking-tight text-text">Ditch the filing cabinet.</h2>
        <p className="whitespace-pre-wrap text-lead leading-copy text-muted">
          Harbor was designed from the ground up to tame your document chaos. Connect your inbox, upload important
          documents, and have Harbor remind you of important deadlines. Passports expiring? Bills due? Harbor has got
          your back.
          {"\n\n"}
          As an open source solution, Harbor is community driven with a variety of connectors and integrations.
        </p>
      </div>
      <ol className="flex w-full max-w-[600px] flex-col">
        {ITEMS.map((it, i) => (
          <li key={it.n} className={`flex gap-[22px] ${i > 0 ? "border-t border-border" : ""} ${i === 0 ? "pb-[26px]" : i === ITEMS.length - 1 ? "pt-[26px]" : "py-[26px]"}`}>
            <span className="w-[34px] shrink-0 font-mono text-[12px] font-medium leading-[16px] tracking-[0.06em] text-accent">{it.n}</span>
            <div className="flex flex-col gap-[7px]">
              <h3 className="font-title text-section leading-[24px] tracking-snug text-text">{it.title}</h3>
              <p className="text-[15.5px] leading-[25px] text-muted">{it.copy}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
