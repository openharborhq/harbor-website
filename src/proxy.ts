import { NextResponse, type NextRequest } from "next/server";
import { LANG_COOKIE, localize, type Lang } from "@/lib/i18n";

/*
 * Sends a first-time visitor whose browser prefers German from an English page to its German twin.
 *
 * The browser's language setting, not the visitor's IP address: it is what the person chose, it
 * is right for an English speaker living in Berlin and a German speaker abroad, it is not fooled
 * by a VPN or a Tailscale exit node, and it needs no geolocation lookup — a third party in the
 * loop on the first request would be an odd thing for this site of all sites to add.
 *
 * Once someone picks a language in the footer, the cookie wins over the browser. German addresses
 * are never redirected, so a shared `/de/...` link opens in German for everyone, and the English
 * pages only ever move a visitor towards German, never the other way.
 */
export function proxy(request: NextRequest) {
  const chosen = request.cookies.get(LANG_COOKIE)?.value;
  const lang: Lang = chosen === "de" || chosen === "en" ? chosen : preferred(request.headers.get("accept-language"));
  if (lang !== "de") return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = localize(request.nextUrl.pathname, "de");
  return NextResponse.redirect(url, 307);
}

/** German only if the browser ranks it above English; anything else gets the English site. */
function preferred(header: string | null): Lang {
  if (!header) return "en";
  let best: { lang: Lang; q: number } | null = null;
  for (const part of header.split(",")) {
    const [tag, ...params] = part.trim().toLowerCase().split(";");
    const base = tag.split("-")[0];
    if (base !== "de" && base !== "en") continue;
    const qParam = params.find((p) => p.trim().startsWith("q="));
    const q = qParam ? Number(qParam.trim().slice(2)) : 1;
    if (!Number.isFinite(q) || q <= 0) continue;
    // Strictly greater: on a tie the language listed first keeps its place.
    if (!best || q > best.q) best = { lang: base, q };
  }
  return best?.lang ?? "en";
}

/* Only the English pages that have a German twin. Docs, assets and the API never pass through. */
export const config = {
  matcher: ["/", "/features", "/pricing"],
};
