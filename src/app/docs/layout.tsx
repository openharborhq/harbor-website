import { DocsNav } from "@/components/docs/DocsNav";
import { FooterV2 } from "@/components/v2/FooterV2";
import { NavV2 } from "@/components/v2/NavV2";
import "./docs-v2.css";

/*
 * Docs under the v2 chrome.
 *
 * `docs-root` is kept on the wrapper because two dark-theme rules in `globals.css` are scoped to
 * it; drop the class and the code figures lose their border at night. The 24px inset and NavV2
 * are the rest of the site's, so a reader crossing from the home page into the docs does not
 * cross a seam.
 */
export default function V2DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="docs-root px-[24px]">
      <NavV2 />
      <div className="v2docs-band">
        <div className="v2docs-shell">
          <DocsNav />
          <main id="main" className="docs-main">
            {children}
          </main>
        </div>
      </div>
      <FooterV2 />
    </div>
  );
}
