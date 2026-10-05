# harbor-website

The marketing site for [Harbor](https://github.com/openharborhq/harbor), an open-source, self-hosted home for a household's important documents.

Next.js (App Router) + Tailwind v4. The design lives in Paper; the tokens in `src/app/globals.css` are the Paper export.

```bash
pnpm install
pnpm dev
```

Product screenshots in `public/mock/` are exported from the Paper design, with invented sample data (the Weber household). Nothing in this repo is real household data.

### Pricing page visibility

Set `siteConfig.pricingEnabled` in `src/lib/site-config.ts` to control the pricing
page and its header, sticky-navigation, and footer links. It is currently enabled
for review. Set it to `false` and rebuild to hide the links and return 404 for
`/pricing`. The shared navigation components also accept a `pricingEnabled` prop.

The pricing page describes proposed services, has no checkout, and is marked
`noindex` while the paid offering is a preview. Confirm prices, inclusions, and
service terms before removing the preview wording and enabling indexing.
