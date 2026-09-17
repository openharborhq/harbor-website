---
name: Harbor
description: Open-source, self-hosted document vault for a household; the site and its docs at openharbor.app.
colors:
  ground: "#ffffff"
  panel: "#ffffff"
  surface: "#f2f5f9"
  surface-2: "#f7f9fc"
  border: "#dce3ec"
  border-strong: "#c0cad8"
  muted: "#586471"
  faint: "#8894a6"
  text: "#0d1622"
  ink: "#0d1622"
  accent: "#123fa8"
  accent-soft: "#e5ebf8"
  accent-on-dark: "#7ea6ff"
  on-dark: "#a7b4c6"
  terminal: "#131e2d"
  hairline-dark: "#243349"
  warn: "#b06a12"
  warn-soft: "#fbf1e1"
  danger: "#a33125"
  dark-ground: "#0f1723"
  dark-surface: "#162031"
  dark-surface-2: "#1a2536"
  dark-border: "#243349"
  dark-border-strong: "#34475f"
  dark-muted: "#a7b4c6"
  dark-faint: "#7d8a9c"
  dark-text: "#e6ecf5"
  dark-accent: "#7ea6ff"
  dark-accent-soft: "#1c2c4d"
  dark-terminal: "#0a111b"
  dark-hairline-dark: "#2b3b52"
typography:
  display:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(42px, 5.28vw, 76px)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "44px"
    fontWeight: 700
    lineHeight: "48px"
    letterSpacing: "-0.03em"
  headline-docs:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "calc(36px * var(--ds))"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "19px"
    fontWeight: 650
    lineHeight: "24px"
    letterSpacing: "-0.02em"
  title-docs:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "calc(24px * var(--ds))"
    fontWeight: 650
    lineHeight: "calc(32px * var(--ds))"
    letterSpacing: "-0.02em"
  lead:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "21px"
    fontWeight: 400
    lineHeight: "32px"
    letterSpacing: "-0.011em"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: "22px"
    letterSpacing: "0em"
  body-docs:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "calc(17px * var(--ds))"
    fontWeight: 400
    lineHeight: "calc(28px * var(--ds))"
    letterSpacing: "0em"
  label:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: "14px"
    letterSpacing: "0.1em"
  code:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "calc(13.5px * var(--ds))"
    fontWeight: 400
    lineHeight: "calc(22px * var(--ds))"
    letterSpacing: "0em"
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
  pill: "999px"
spacing:
  hair: "8px"
  tight: "12px"
  base: "16px"
  stack: "22px"
  block: "34px"
  group: "52px"
  region: "64px"
  section: "104px"
  gutter: "120px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ground}"
    rounded: "{rounded.pill}"
    padding: "15px 26px"
  button-secondary:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.text}"
    rounded: "{rounded.pill}"
    padding: "15px 26px"
  button-nav:
    backgroundColor: "{colors.text}"
    textColor: "{colors.ground}"
    rounded: "{rounded.pill}"
    padding: "11px 20px"
  button-inverse:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.accent}"
    rounded: "{rounded.pill}"
    padding: "17px 30px"
  nav-link:
    textColor: "{colors.muted}"
    typography: "{typography.body}"
  nav-link-current:
    textColor: "{colors.text}"
    typography: "{typography.body}"
  docs-nav-link:
    textColor: "{colors.muted}"
    rounded: "6px"
    padding: "6px 10px"
  docs-nav-link-hover:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
  docs-nav-link-current:
    backgroundColor: "{colors.accent-soft}"
    textColor: "{colors.accent}"
  toc-link:
    textColor: "{colors.muted}"
    padding: "4px 0 4px 14px"
  toc-link-current:
    textColor: "{colors.accent}"
  code-block:
    backgroundColor: "{colors.terminal}"
    textColor: "#dfe6f1"
    rounded: "{rounded.lg}"
    padding: "16px 20px 18px"
  copy-button:
    backgroundColor: "{colors.terminal}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.pill}"
    padding: "6px 10px"
  copy-button-copied:
    textColor: "{colors.accent-on-dark}"
  inline-code:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.sm}"
    padding: "1px 3px"
  note:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.lg}"
    padding: "18px 22px 20px"
  card:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.text}"
    rounded: "14px"
  theme-option:
    textColor: "{colors.muted}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
  theme-option-selected:
    backgroundColor: "{colors.text}"
    textColor: "{colors.ground}"
  mono-label:
    textColor: "{colors.muted}"
    typography: "{typography.label}"
---

# Design System: Harbor

## Overview

**Creative North Star: "The Datasheet"**

Harbor's site looks the way its copy reads: plain, specific, and unafraid of the mechanism. The ground is white paper, division is a one-pixel hairline, and the only colour is one cobalt that marks what is current and what is actionable. Every label that names a region rather than reads as prose is set in IBM Plex Mono, uppercase and letterspaced, the way a datasheet labels its columns. Commands sit on a dark terminal slab with the copy control in a slim bar above them. Nothing casts a shadow at rest; the page is flat and reads by contrast, weight and spacing alone.

The landing page (exported from a Paper artboard) is the incumbent: a 1200px content column inside 120px gutters, alternating white and pale-grey sections separated by hairlines, Inter at 650 to 800 for titles, four looping product animations, and a cobalt promise band before the footer. The documentation section extends that world into the conventional documentation shell (full-width, left navigation tree, reading column, on-this-page list) without changing a single token. Its one addition is a dark theme, derived from the landing page's own terminal and on-dark tokens and applied across the whole site.

Density is generous but not airy: 15px body copy on 22px leading on the landing page, 17px on 28px in the docs' 800px reading column, and section padding of roughly 100px. The whole site renders at 1:1 (user decision, 2026-09-12): every declared size is its on-screen size, on the landing page and in the docs alike, with `--ds` held at 1 as a scale hook.

**Key Characteristics:**
- White ground, one grey surface step, hairline division; no shadows at rest
- One cobalt accent (#123fa8) reserved for the current thing, links and the primary action
- Inter for prose and titles (weights 400, 600, 650, 700, 800), IBM Plex Mono for labels, crumbs, numerals and every command
- Pill buttons; 4/8/12px radii on chips, cards and slabs
- Uppercase mono labels at 11–12px with 0.1em tracking for wayfinding
- Flat, code-led docs with a dark theme derived from the terminal palette

## Colors

A white page with one grey step and one blue: cobalt for the current page, the current heading, links and the primary action; everything else is ink, two greys and hairlines.

### Primary
- **Cobalt** (`{colors.accent}`): the current page in the docs nav, the current heading in the on-this-page list, prose links, the hero and inverse CTAs, the mark in the wordmark, the Harbor column head in the comparison table, and the full promise band. In the dark docs theme it becomes **Cobalt on dark** (`{colors.dark-accent}`, the same value as `{colors.accent-on-dark}`), which the light landing page already uses for the copied state on the terminal slab.
- **Cobalt wash** (`{colors.accent-soft}`): the soft field behind the current docs nav item, the selection highlight, and the resting fill of tag chips in the tagging animation. Dark theme: `{colors.dark-accent-soft}`.

### Neutral
- **Paper** (`{colors.ground}`, `{colors.panel}`): page and card background. Dark: `{colors.dark-ground}`.
- **Surface** (`{colors.surface}`): alternating landing sections (positioning, carousel, feature index), the docs note box, inline code, container boxes in the diagram, and the docs nav hover. **Surface 2** (`{colors.surface-2}`) is a lighter step used sparingly inside the animated tiles. Dark: `{colors.dark-surface}`, `{colors.dark-surface-2}`.
- **Hairline** (`{colors.border}`): every division: section borders, table rows, the docs column rule, the rule above every h2, card edges, the secondary button outline. **Hairline strong** (`{colors.border-strong}`): the box-diagram machine edge, breadcrumb separators, the dormant heading anchor, and the strikethrough on a proven checkpoint. Dark: `{colors.dark-border}`, `{colors.dark-border-strong}`.
- **Ink** (`{colors.text}`, `{colors.ink}`): headings, body copy, the black nav button and the selected theme option. Dark: `{colors.dark-text}`.
- **Muted** (`{colors.muted}`): lead paragraphs, secondary copy, nav links at rest, mono section labels in the docs. **Faint** (`{colors.faint}`): footer column heads, the landing's mono eyebrows, the comparison footnote. Dark: `{colors.dark-muted}`, `{colors.dark-faint}`.
- **Terminal** (`{colors.terminal}`): the code slab and its copy control; the Shiki theme's editor background. **Hairline on dark** (`{colors.hairline-dark}`) rules the slab's bar; **On dark** (`{colors.on-dark}`) is the slab's label and control colour. Dark: `{colors.dark-terminal}`, `{colors.dark-hairline-dark}`.
- **Warn / Warn wash / Danger** (`{colors.warn}`, `{colors.warn-soft}`, `{colors.danger}`): exported with the Paper tokens and used only inside the product mock visuals; no page-level component uses them yet.

### Named Rules
**The One Cobalt Rule.** Cobalt marks what is current (page, heading), what is a link, and the one primary action in view. It is never decoration, never a background behind prose, and never a second hue's partner; the promise band is the single place it fills a surface.

**The Hairline Rule.** Division is a 1px `{colors.border}` line. Sections alternate white and `{colors.surface}` as whole bands; a component never earns a tinted edge, a coloured left border or a shadow to separate itself.

**The Derived Dark Rule.** The dark theme lands on the root, covers the whole site, and redefines the same custom properties rather than adding new ones. Its values come from the landing page's terminal, hairline-dark and on-dark tokens; the promise band is the one surface that keeps its cobalt in both themes, through four tokens the dark block never touches.

## Typography

**Display Font:** Inter (variable; with `system-ui, sans-serif`), loaded through `next/font` as `--font-inter`
**Body Font:** Inter
**Label/Mono Font:** IBM Plex Mono (400, 500; with `ui-monospace, monospace`), loaded as `--font-plex-mono`

**Character:** Inter carries prose and every heading, tightening as it grows (-0.02em at title size, -0.035em at the hero). Plex Mono does the labelling: uppercase, letterspaced, small, and always tabular-numeric. The pairing reads as engineering documentation, not marketing.

### Hierarchy
- **Display** (800, `clamp(42px, 5.28vw, 76px)`, line-height 1, -0.035em): the landing hero only. The promise band uses the same weight and tracking at `clamp(36px, 3.9vw, 56px)` on cobalt.
- **Headline** (700, 44px/48px, -0.03em): landing section h2s. The docs page title is the same role at `36px × --ds` on 1.15 leading (30px under 640px).
- **Title** (650 via `font-title` variation settings, 19px/24px, -0.02em): tile and feature titles, the wordmark. In the docs, h2 is 24/32 × --ds and h3 is 19/26 × --ds at the same 650; h2 carries a hairline above it with 22px of padding and 52px above.
- **Lead** (400, 21px/32px, -0.011em, muted): the hero standfirst and section intros; 17px/28px (`--text-copy`) in the positioning copy. Docs description: 18px/28px × --ds, muted.
- **Body** (400, 15px/22px): landing copy, table cells, nav links. 15.5px/25px for tile and feature copy; 13.5px/18px for the small print.
- **Body, docs** (400, 17px/28px × --ds, 16px/26px under 640px): prose in the 800px reading column. Notes 15.5/25 × --ds, tables 15/23 × --ds, nav links 14/20 × --ds, on-this-page 13.5/19 × --ds.
- **Label** (Plex Mono 500, 11–12px/14–16px, 0.1em, uppercase): mono eyebrows and footer column heads on the landing page; nav section heads, "On this page", note labels, pager Previous/Next, the code bar's language and the copy control in the docs. A 0.06em variant sets the step numerals, release stamp and checkpoint count.
- **Code** (Plex Mono 400, 13.5px/22px × --ds, 13px under 640px): commands on the terminal slab, wrapped with a 2ch hanging indent. Inline code is 0.86em of the surrounding prose.

### Named Rules
**The Mono Label Rule.** Anything that names a region rather than reads as prose is Plex Mono, uppercase, 11–12px, 0.1em, in muted or faint. Prose, titles and buttons are never mono; commands and variable names are never sans.

**The Weight Ladder Rule.** 400 for prose, 600 for emphasis and buttons, 650 for titles, 700 for headlines, 800 for the hero. Nothing sits between the rungs.

**The 17px Rule.** Reading prose in the docs renders at 17px on screen. Docs sizes are declared as `calc(px * var(--ds))` with `--ds: 1`, a scale hook kept so a future adjustment is one variable away. The site renders at 1:1 throughout, so every declared size is the size it reads at.

## Layout

The landing page is a 1440px artboard with 120px gutters around a 1200px content column. `--gutter` is `max(clamp(20px, 8.333vw, 120px), calc((100% - 1200px) / 2))`, so the column never exceeds 1200px, stays centred on wider screens, and the gutters shrink with the viewport down to 20px. Backgrounds are full-bleed; content sits in the gutter. Sections alternate white and surface, separated by hairlines, with roughly 96–116px of vertical padding and 40–64px between a section head and its content. Grids are two columns for tiles (24px column gap, 48px row gap) and three for features (40/52px), collapsing to one below 768px. The carousel scrolls horizontally with snap points and `scroll-padding-inline` set to the gutter.

The docs replace the column with a full-width shell: the site nav and footer take 28px (36px from 768px) side padding instead of the gutter; below the nav a grid of `272px` left navigation and a fluid main area. The main area is itself a grid of an 800px reading column and a 232px on-this-page column with 64px between them, padded `44px 40px 96px 64px`. The left nav is sticky at the top with its own scroll, a hairline on its right, and the theme control at its foot. The on-this-page list is sticky 44px from the top.

Breakpoints, as used: 640px (docs prose drops to 16px, padding to 20px), 768px (nav links appear; tile grids go two-up), 1024px (feature grid three-up; below it the docs nav becomes a sticky bar carrying the current page name that opens the tree, and the pager stacks), 1280px (below it the on-this-page column folds into a disclosure above the prose). Content spacing rhythm: 8, 12, 16, 22, 34, 52, 64px, then section padding around 104px.

## Elevation & Depth

The system is flat. Depth is conveyed by the white-to-surface tonal step, hairlines and weight, never by shadows on resting elements. Cards, the app-window frame, notes, the terminal slab, the box diagram: all are a hairline or a darker fill on the page. The only shadows in the code appear inside the looping tile animations, as transient cues that an object is in motion or has been picked out; they vanish when the loop settles and are absent entirely under reduced motion. The dark docs theme adds a hairline border to the code slab so it still separates from the near-black ground.

### Shadow Vocabulary
- **Lift** (`box-shadow: 0 6px 16px rgba(18, 63, 168, 0.12)`): the matched document rising 8px in the search animation, with a cobalt border.
- **In flight** (`box-shadow: 0 3px 8px rgba(18, 63, 168, 0.25)`): the share token while it travels; removed when the link expires.
- **Rest card** (`box-shadow: 0 2px 6px rgba(13, 22, 34, 0.08)`): a single card inside a tile stage.

### Named Rules
**The Flat-At-Rest Rule.** No component carries a shadow at rest. A shadow may appear only inside an animation, tinted with the accent or the ink, and only while the element is moving or singled out.

## Shapes

Four radii, plus the pill. Pills (`999px`) are every button, the copy control, the theme toggle and its options, the skip link, and the settled tag chip. Small (`4px`) is inline code and the smallest chips; medium (`8px`) is the tile image frame and the box-diagram's containers; large (`12px`) is the terminal slab, notes, the checkpoint list and the box-diagram machine. Two container frames sit just above the scale: the carousel slide at 14px and the hero's app window at 16px, both hairline-bordered on white. Borders are always 1px solid `{colors.border}`; the diagram's data volume is the single dashed border, in `{colors.border-strong}`. Icons are 16–22px line SVGs at 1.6–1.9px stroke in the accent or currentColor, never a glyph font. The mark is a rounded shield with a downward anchor stroke, drawn in the accent.

## Components

### Buttons
Pill, semibold, no shadow — including on hover, which is never lifted by one. The hero pair (decision, 2026-09-17) rests bare: each button holds its mark hidden behind its own label and reveals it on hover — the primary's arrow, the secondary's GitHub logo. The button scales to 1.02 on hover and 0.99 on press over 180ms on the standard ease; the label slides 12.5px left over 260ms on the same ease while the mark fades from 0 and travels 14px right over 300ms on the overshoot curve, landing the pair optically centred. The mark is out of flow, so the button's layout width never changes and neither button moves the other. Under `prefers-reduced-motion: reduce` both revert to the static pair: the primary shows its arrow outright, the secondary offers a `{colors.surface}` wash, and nothing transforms — hiding a mark from these readers would cost them the content, not just the animation. The v2 "How it works" selector, being a control rather than a link, washes its unselected options to `{colors.panel}` at 60% on hover and drops the resting shadow its active card used to carry. The rest of the landing page's buttons carry no hover treatment beyond the cursor; the docs' controls do show hover.
- **Shape:** pill (`999px`)
- **Primary:** cobalt on white text, `15px 26px`, 16px/20px semibold, -0.01em, with a 15px arrow icon at 9px gap. Used once above the fold (hero "Get started").
- **Nav:** ink on white text, `11px 20px`, 14px/18px semibold. The header's "Get started".
- **Secondary:** hairline outline, ink text, same padding as primary. "See how it works".
- **Inverse (on the cobalt band):** white fill, cobalt text, `17px 30px`, 17px at weight 650, with a 16px arrow; outline variant with a `#5F82D2` border and white text.
- **Focus:** the global ring, 2px solid cobalt, 3px offset. On the terminal slab the ring is `{colors.accent-on-dark}`.

### Chips / Labels
- **Mono label:** Plex Mono 500, 11–12px, 0.1em, uppercase, muted or faint. Section eyebrows and footer heads on the landing; nav section heads, "On this page", note labels, pager labels and the code bar in the docs. Note labels alone are set in cobalt.
- **Tag chip (animation only):** cobalt wash fill, cobalt text, pill, `3px 11px`, 13px.
- **Copy control:** mono 11px × --ds, 0.08em, on-dark text on terminal, hairline-dark border, pill, `6px 10px`; hover turns the text white and the border on-dark; the copied state turns text and border `{colors.accent-on-dark}` for 1.8s.

### Cards / Containers
- **Corner style:** 8px for tile frames, 12px for slabs and notes, 14px for carousel slides, 16px for the hero window.
- **Background:** white on surface sections, surface on white sections.
- **Shadow strategy:** none; see Elevation.
- **Border:** 1px hairline.
- **Internal padding:** notes and the checkpoint list `18px 22px 20px` (16px all round under 640px); box-diagram cells `9px 12px`; slabs `16px 20px 18px`.
- **Note:** a surface-filled hairline box with a cobalt mono label above 15.5px × --ds body; never a coloured edge. Labels are the guide's own words ("Why", "Careful", "If you skip this").
- **Checkpoint list (Prove):** a hairline box, a mono count ("2 / 5 proven") with the numerals in cobalt and a "start over" link, then 18px checkboxes in `accent-color` cobalt; a ticked line goes muted with a border-strong strikethrough. State persists in the browser.
- **Box diagram:** two-column figure (200px outside list, fluid machine), mono captions, containers as surface cells with mono names and a colour-coded "talks to" line (cobalt for outbound, ink for "no route out", muted for internal).

### Code
- **Slab:** terminal fill, `#dfe6f1` text, 12px radius, overflow hidden. A slim bar (`7px 10px 7px 20px`, hairline-dark rule beneath) carries the language label in on-dark mono at 0.1em on the left and the copy control on the right. `pre` is 13.5/22 × --ds Plex Mono, pre-wrapped, with each line hanging 2ch so a wrapped command never reads as a new one. Selection on the slab is `rgba(126, 166, 255, 0.28)`.
- **Highlighting:** the Shiki theme "harbor-terminal" in `next.config.ts`: comments faint (#8894a6), strings #c3d2f5, keywords and constants cobalt-on-dark, commands white, variables and punctuation on-dark (#a7b4c6).
- **Inline code:** 0.86em Plex Mono on surface with a hairline border, 4px radius, `1px 3px`, no wrapping.

### Tables
- **Landing comparison:** 880px minimum, sticky question column on white, 2px ink rule under the head, hairline rows, 16px vertical cell padding; column heads 22px bold with a mono faint sub-label; Harbor's column head in cobalt.
- **Docs tables:** 15/23 × --ds, 2px ink rule under the head, hairline rows, `11px 20px 11px 0` cells, first column at weight 500; scroll sideways inside the column at 520px minimum when three or more columns.

### Navigation
- **Site header:** hairline beneath, `26px` vertical padding, wordmark left; links at 15px medium in muted, current in ink, hover ink; the GitHub link in mono with a 16px icon (the star count appears only above 50 stars); the ink pill "Get started". Links hide below 768px.
- **Docs left nav:** sections headed by a mono label (11px × --ds, 0.1em, muted, 10px inset, 28px between sections); links 14/20 × --ds in muted, `6px 10px`, 6px radius; hover ink on surface; current cobalt on cobalt wash at weight 600. Under 1024px it becomes a sticky bar (mono "Docs" label, current page title at 600, chevron rotating 180° when open) that opens the tree below a hairline at up to 70vh.
- **On this page:** mono heading in ink, then a hairline-left list; links 13.5/19 × --ds in muted, `4px 0 4px 14px`, depth-3 items at 26px; the current heading in cobalt with a cobalt left rule that replaces the hairline. Under 1280px the same list folds into a `details` disclosure with a 10px-radius hairline frame above the prose.
- **Breadcrumb:** 13.5/20 × --ds muted, separated by a border-strong slash; hover cobalt.
- **Pager:** hairline above, mono Previous/Next label, 16px × --ds semibold title that turns cobalt on hover; the next link is right-aligned, stacking left-aligned under 1024px.
- **Theme toggle:** at the foot of the docs nav under a hairline; mono "Theme" label, then a pill group (hairline border, 2px padding) of three pill options at 12.5px × --ds, muted, hover ink, the pressed one ink on white (white on ink in dark). Choice is stored in `localStorage` as `harbor-docs-theme` and resolved before paint by an inline script that writes `data-docs-theme` on `html`.
- **Footer:** wordmark and a 15px/24px muted description; three columns of mono faint heads and 15px ink links that turn cobalt on hover; a hairline-topped line with the copyright in 13.5px muted and the live release tag plus "SELF-HOSTED SINCE DAY ONE" in mono faint at 0.06em.

### Heading anchors
Every docs h2 and h3 appends a `#` anchor at 10px, in border-strong, invisible until the heading is hovered or the anchor is focused; hover turns it cobalt. On touch devices it is always visible. Headings carry `scroll-margin-top` of 28px (64px under the sticky mobile bar).

### Product animations (landing)
Four tile stages, drawn at 500px and scaled whole in narrower containers (0.84 at 540px down to 0.56 at 340px), loop for 8–9s on `cubic-bezier(0.4, 0, 0.2, 1)`, with one overshoot (`cubic-bezier(0.34, 1.56, 0.64, 1)`) for the share badge. Under `prefers-reduced-motion: reduce` every animation is removed and each element sits at its settled end state. The docs animate nothing; the only motion there is the skip link's 120ms slide and the browser's smooth scroll, both already governed by the reduced-motion query.

## Do's and Don'ts

### Do:
- **Do** use cobalt (`{colors.accent}`) for the current page, the current heading, links and the one primary action in view, and nowhere else (The One Cobalt Rule).
- **Do** separate with a 1px `{colors.border}` hairline or an alternating `{colors.surface}` band; keep every resting element shadowless (The Hairline Rule, The Flat-At-Rest Rule).
- **Do** set wayfinding labels in IBM Plex Mono, uppercase, 11–12px, 0.1em, muted or faint (The Mono Label Rule).
- **Do** declare docs sizes through `--ds` so prose renders at 17px, and read every declared px as its on-screen size (The 17px Rule).
- **Do** put every command on the terminal slab with its language label and copy control, and keep inline code on surface with a hairline.
- **Do** make buttons pills, 600 weight (650 on the promise band), with the arrow icon only on the primary action.
- **Do** keep the dark theme a redefinition of the same custom properties on the root, derived from the terminal, hairline-dark and on-dark tokens.
- **Do** give every animation a settled end state under `prefers-reduced-motion: reduce`.

### Don't:
- **Don't** add a second accent hue, a gradient, or a tinted background behind prose; the promise band is the only cobalt surface.
- **Don't** give notes, callouts or asides a coloured left edge or an icon; a note is a hairline box with a mono label.
- **Don't** put a shadow on a card, button, slab or nav at rest, or use a shadow to lift a hover state.
- **Don't** set prose, titles or buttons in the mono face, or commands and variable names in Inter.
- **Don't** use weights between the ladder rungs (400, 600, 650, 700, 800) or a glyph icon font; icons are 16–22px line SVGs.
- **Don't** hard-code a colour that assumes a white page; every surface and glyph reads from a token so both themes repaint together.
- **Don't** declare a docs type size in plain px above 640px; go through `--ds` so the scale stays adjustable in one place.
