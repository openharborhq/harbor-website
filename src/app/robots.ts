import type { MetadataRoute } from "next";

/* Everything may be crawled; pages that should stay out of search say so in their own metadata. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: "https://openharbor.app/sitemap.xml",
  };
}
