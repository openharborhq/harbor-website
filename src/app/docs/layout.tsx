import { DocsNav } from "@/components/docs/DocsNav";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="docs-root">
      <Nav current="docs" wide />
      <div className="docs-shell">
        <DocsNav />
        <main id="main" className="docs-main">
          {children}
        </main>
      </div>
      <Footer wide />
    </div>
  );
}
