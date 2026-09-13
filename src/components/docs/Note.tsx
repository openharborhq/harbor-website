import type { ReactNode } from "react";

/**
 * A boxed aside inside the reading column. `label` names what kind of note it is in the
 * guide's own words ("Why", "Careful", "If you skip this"). Hairline box, no coloured edge.
 */
export function Note({ label = "Note", children }: { label?: string; children: ReactNode }) {
  return (
    <aside className="doc-note" aria-label={label}>
      <p className="doc-note-label">{label}</p>
      <div className="doc-note-body">{children}</div>
    </aside>
  );
}
