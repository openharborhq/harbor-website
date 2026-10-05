import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TrackedLink } from "@/components/TrackedLink";
import { ClosingBand } from "@/components/v2/ClosingBand";
import { Faq } from "@/components/v2/Faq";
import { FooterV2 } from "@/components/v2/FooterV2";
import { NavV2 } from "@/components/v2/NavV2";
import { Arrow, Eyebrow, PRIMARY, SECONDARY } from "@/components/v2/parts";
import { doc } from "@/components/v2/routes";
import { StaggerGroup, StaggerItem } from "@/components/v2/Stagger";
import { StickyNav } from "@/components/v2/StickyNav";
import { siteConfig } from "@/lib/site-config";

/*
 * Pricing, in the v2 shell and on the features page's rhythm: every band the same padding and
 * 26px apart, the tone alternating grey, white, grey down the page.
 *
 * The plans sit inside the hero band rather than in a band of their own. That is what lands the
 * page's last two bands where the shared components already are — the FAQ on white, the closing
 * band on grey — so both are reused as they stand instead of re-drawn here in a second tone.
 */
export const metadata: Metadata = {
  title: "Pricing · Harbor",
  description: "Harbor is free and open source. Encrypted offsite backup, monitoring, and emergency access for your household are coming soon.",
  // Keep the coming-soon page out of search until the paid services launch.
  robots: { index: false, follow: true },
};

/** One value for every band's vertical padding, as on the features page. */
const PAD = "py-[60px] md:py-[80px]";

/*
 * `live` is the plan you can act on today. It gets the green chip and the one filled button: the
 * other two link down the page to a service that does not exist yet, and a filled button there
 * would out-shout the only real action on it. `featured` is the plan the page recommends, and
 * says so with an accent edge rather than a second filled button.
 */
const plans = [
  {
    name: "Harbor Free", price: "€0", period: "Free software", label: "Available now",
    description: "Your household vault, on hardware or hosting you control.",
    features: ["Open-source, self-hosted document vault", "Document organization, search, and sharing", "Use your own backup destination", "Choose your AI provider, or use no AI"],
    href: doc("install"), action: "Install Harbor", featured: false, live: true,
  },
  {
    name: "Harbor Backup", price: "€36", period: "per year", label: "Coming soon",
    description: "Offsite backup with monitoring, so a missed backup does not go unnoticed.",
    features: ["100 GB of encrypted offsite storage", "Monitoring for overdue backups", "Alerts when a restore test fails", "Your vault stays self-hosted"],
    href: "#backup", action: "Explore Backup", featured: false, live: false,
  },
  {
    name: "Backup + Legacy", price: "€72", period: "per year", label: "Coming soon",
    description: "Give someone you trust a way to recover your records if you die or become unable to respond.",
    features: ["Everything in Harbor Backup", "Up to five trusted recovery contacts", "Access arranged in advance, with a waiting period", "Guided recovery from your backup"],
    href: "#access", action: "Explore emergency access", featured: true, live: false,
  },
];

const questions = [
  { q: "Can I buy a paid plan today?", a: "Not yet. Harbor Backup and Backup + Legacy are coming soon. Annual plans start at €36, with Backup + Legacy at €72 per year or €299 for five years. Subscriptions will open at launch." },
  { q: "Will Harbor remain free?", a: "The self-hosted Harbor software is free and open source. The paid plans add managed backup and emergency access. You can continue using your own backup destination without subscribing." },
  { q: "Can Harbor Cloud read my documents?", a: "No. Your machine encrypts backups before upload, and Harbor Cloud stores them without the keys needed to read them. Backup status reports let the service monitor activity without reading document contents." },
  { q: "How does emergency access work?", a: "You authorize emergency access in advance by choosing your trusted contacts and a waiting period. When a contact requests access, we notify you. You can cancel the request during that period. If you do not cancel, access is released automatically when the period ends—no further approval from you is required." },
  { q: "What if I have died or cannot respond?", a: "Your trusted contact can start the recovery process without your help. Once they request access and the waiting period ends without cancellation, they receive access under the instructions you set up in advance. The trigger is an uncanceled request, not a determination that you have died. Choose your contacts and waiting period with that in mind." },
  { q: "What happens if a payment fails or the service closes?", a: "We will publish the retention, service closure, and data export policies before subscriptions open, so you can review how each situation is handled before choosing a plan." },
  { q: "Are there other costs?", a: "You provide the machine or hosting for Harbor. Any fees from your chosen AI provider are separate. With the free plan, any charges from your chosen backup provider are also separate." },
];

const steps = [
  ["Authorize access in advance", "Choose your trusted contacts, set the waiting period, and prepare their recovery information while you can. This authorizes access later without another approval from you."],
  ["A contact requests access", "We notify you when a trusted contact makes a request. The waiting period gives you time to cancel if access is not needed. Your contact does not need you to respond."],
  ["Access is released automatically", "If you do not cancel, access is released when the waiting period ends. A guided recovery tool helps your contact retrieve your records, even if your Harbor machine is offline."],
];

export default function Page() {
  return <PricingPage enabled={siteConfig.pricingEnabled} />;
}

function PricingPage({ enabled }: { enabled: boolean }) {
  if (!enabled) notFound();

  return (
    <div className="px-[24px]">
      <NavV2 pricingEnabled={enabled} />
      <main id="main" className="flex flex-col gap-[26px]">
        <section className={`flex flex-col items-center gap-[56px] rounded-[26px] bg-surface lane ${PAD}`}>
          <StaggerGroup className="flex flex-col items-center gap-[22px]">
            <StaggerItem>
              <Eyebrow>PRICING</Eyebrow>
            </StaggerItem>
            <StaggerItem as="h1" className="max-w-[900px] text-balance text-center text-display font-bold leading-[1.12] tracking-[-0.032em] text-text">
              Backup and emergency access with Harbor&nbsp;Cloud
            </StaggerItem>
            <StaggerItem as="p" className="max-w-[680px] text-center text-copy leading-copy text-muted">
              Harbor stays free and self-hosted. Encrypted offsite backup and emergency access are coming soon, helping you and your household recover what matters.
            </StaggerItem>
          </StaggerGroup>

          {/*
            On a wide screen each card is a five-row subgrid of the list, so the price, the
            description, the features and the button sit on the same line in all three cards
            whatever their copy's length. The subgrid's own `gap-y-0` keeps the list's 20px out
            from between a card's rows; the spacing inside a card is its margins.
          */}
          <StaggerGroup as="ul" delay={0.3} className="grid w-full gap-[20px] lg:grid-cols-3">
            {plans.map((plan) => (
              <StaggerItem
                as="li"
                key={plan.name}
                className={`flex flex-col rounded-[20px] border bg-panel p-[22px] sm:p-[28px] lg:row-span-5 lg:grid lg:grid-rows-subgrid lg:gap-y-0 ${
                  plan.featured ? "border-accent ring-1 ring-inset ring-accent" : "border-border"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-x-[12px] gap-y-[8px]">
                  <h2 className="text-section font-bold leading-[26px] tracking-snug text-text">{plan.name}</h2>
                  <Status live={plan.live}>{plan.label}</Status>
                </div>
                <p className="mt-[18px] flex flex-wrap items-baseline gap-x-[10px] gap-y-[4px]">
                  <span className="text-section-head font-bold leading-[1.1] tracking-tight text-text">{plan.price}</span>
                  <span className="text-row leading-row text-muted">{plan.period}</span>
                </p>
                <p className="mt-[14px] text-body leading-[24px] text-muted">{plan.description}</p>
                <ul className="mt-[24px] flex flex-col gap-[12px] border-t border-border pt-[24px]">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-[10px] text-body leading-[22px] text-text">
                      <Check />
                      {feature}
                    </li>
                  ))}
                </ul>
                <PlanAction plan={plan} />
              </StaggerItem>
            ))}
          </StaggerGroup>

          <StaggerGroup delay={0.5} className="flex w-full flex-col items-center gap-[24px]">
            <StaggerItem className="flex w-full flex-col items-start gap-[14px] rounded-[20px] border border-border p-[22px] sm:px-[28px] sm:py-[24px] md:flex-row md:items-center md:justify-between md:gap-[32px]">
              <div className="flex flex-col gap-[6px]">
                <h3 className="text-section font-bold leading-[26px] tracking-snug text-text">Planning further ahead?</h3>
                <p className="text-body leading-[24px] text-muted">Get five years of Backup + Legacy for €299 upfront, with fewer renewals to manage.</p>
              </div>
              <Status live={false}>Coming soon</Status>
            </StaggerItem>
            <StaggerItem as="p" className="max-w-[680px] text-balance text-center text-small leading-[20px] text-muted">
              Paid plans are coming soon. Subscriptions open at launch, with service terms and applicable taxes shown before you pay.
            </StaggerItem>
          </StaggerGroup>
        </section>

        {/* The pill arrives as the opening band's floor passes the top of the viewport, as on the
            features page; the negative margin cancels the gap the sentinel would add. */}
        <StickyNav sentinelClassName="h-0 w-full -mt-[26px]" pricingEnabled={enabled} />

        <ServiceBand
          id="backup"
          tone="ground"
          eyebrow="BACKUP · COMING SOON"
          title="Know when your backup needs attention."
          lead="A backup is only useful if you can recover it. Harbor Backup combines offsite storage with monitoring that helps you spot problems early."
        >
          <StaggerGroup as="ul" delay={0.24} className="flex flex-col gap-[36px]">
            <Point title="Encrypted before upload">Your machine encrypts the backup before sending it to storage. You keep the recovery keys.</Point>
            <Point title="Monitoring beyond your machine">If backups stop arriving or a restore test reports a failure, the service alerts you so you can investigate.</Point>
            <Point title="Your choice of destination">Managed backup is optional. Harbor’s existing backup destinations remain available if you prefer to manage storage yourself.</Point>
          </StaggerGroup>
        </ServiceBand>

        <ServiceBand
          id="access"
          tone="surface"
          eyebrow="EMERGENCY ACCESS · COMING SOON"
          title="Give your family access when an emergency happens."
          lead="Plan ahead so someone you trust can recover your household’s important records if you die or become unable to respond. Set up access now; no active approval is needed when the time comes."
        >
          <StaggerGroup as="ol" delay={0.24} className="flex flex-col gap-[36px]">
            {steps.map(([title, copy], i) => (
              <Point key={title} number={`0${i + 1}`} title={title}>
                {copy}
              </Point>
            ))}
          </StaggerGroup>
          <StaggerItem as="p" className="border-t border-border pt-[24px] text-row leading-[22px] text-muted">
            Scheduled check-ins will follow in a later release. Missed check-ins will start reminders and a waiting period before automatic release, without requiring a contact to make the initial request.
          </StaggerItem>
        </ServiceBand>

        <Faq title="Before you choose a plan" questions={questions} />

        <ClosingBand
          title="Start with a vault of your own."
          lead="You can install Harbor today and choose your own backup destination."
          placement="pricing_closing_band"
        />
      </main>
      <FooterV2 pricingEnabled={enabled} />
    </div>
  );
}

/** The plan's one button, in the hero's pill: filled for the plan you can install today. */
function PlanAction({ plan }: { plan: (typeof plans)[number] }) {
  const className = "mt-[28px] flex w-full items-center justify-center gap-[9px] self-end";

  if (plan.live) {
    return (
      <TrackedLink
        href={plan.href}
        analyticsEvent="installation_guide_opened"
        analyticsProperties={{ placement: "pricing_plan" }}
        className={`${className} ${PRIMARY}`}
      >
        {plan.action}
        <Arrow />
      </TrackedLink>
    );
  }

  return (
    <Link href={plan.href} className={`${className} ${SECONDARY} transition-colors duration-150 ease-out hover:bg-surface`}>
      {plan.action}
    </Link>
  );
}

/** A plan's availability: green for what ships today, a hairline for the services coming soon. */
function Status({ live, children }: { live: boolean; children: React.ReactNode }) {
  return (
    <span
      className={`shrink-0 rounded-pill border px-[9px] py-[3px] text-label font-medium leading-[14px] ${
        live ? "border-transparent bg-green-soft text-green" : "border-border bg-panel text-muted"
      }`}
    >
      {children}
    </span>
  );
}

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-[3px] shrink-0" aria-hidden="true">
      <path d="M3 8.5l3.2 3L13 4.5" stroke="var(--color-accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * An upcoming service, in the FeatureBand shape: the argument in a 360px column on the left, its
 * points down the right. Both services use it, so they read as a pair.
 */
function ServiceBand({
  id,
  tone,
  eyebrow,
  title,
  lead,
  children,
}: {
  id: string;
  tone: "ground" | "surface";
  eyebrow: string;
  title: string;
  lead: string;
  children: React.ReactNode;
}) {
  return (
    <StaggerGroup
      as="section"
      id={id}
      className={`flex scroll-mt-[96px] flex-col gap-[48px] rounded-[26px] lane ${PAD} lg:flex-row lg:gap-[80px] ${
        tone === "surface" ? "bg-surface" : "bg-ground"
      }`}
    >
      <StaggerItem className="flex shrink-0 flex-col gap-[18px] lg:w-[360px]">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="text-subhead font-bold leading-[1.17] tracking-tight text-text">{title}</h2>
        <p className="text-[16px] leading-section text-muted">{lead}</p>
      </StaggerItem>
      <div className="flex min-w-0 max-w-[640px] flex-1 flex-col gap-[36px]">{children}</div>
    </StaggerGroup>
  );
}

function Point({ number, title, children }: { number?: string; title: string; children: React.ReactNode }) {
  return (
    <StaggerItem as="li" className="flex flex-col gap-[10px]">
      {number && <span className="font-mono text-label font-medium leading-[14px] tracking-mono text-accent">{number}</span>}
      <h3 className="font-title text-section leading-[24px] tracking-snug text-text">{title}</h3>
      <p className="text-[15.5px] leading-[25px] text-muted">{children}</p>
    </StaggerItem>
  );
}
