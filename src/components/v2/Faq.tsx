import { StaggerGroup, StaggerItem } from "./Stagger";

/*
 * The FAQ, in the position that answers the last objections before the final call to action.
 *
 * A plain list rather than an accordion: five questions is short enough to read straight through,
 * and collapsing them hides the two answers — cost and security — that the audience came for.
 */
const QUESTIONS: { q: string; a: string }[] = [
  {
    q: "What does Harbor cost?",
    a: "Harbor is free and open source. You host it on your own hardware. We are working on ways to make it easy to deploy Harbor to a cloud platform of your choice. We may also in the future introduce a hosted version, which we may charge for.",
  },
  {
    q: "How does it work?",
    a: "You install Harbor on your hardware. It runs on a Raspberry Pi or small form factor computers. Heck, you can even repurpose that old Mac mini and put it to good use. Install is easy — even if you're not technical. Within minutes, you have your own instance running.",
  },
  {
    q: "How does backup work?",
    a: "Harbor lets you configure different backup providers. We currently support Backblaze B2, which has a generous free tier to get started. Future versions will add support for S3 compatible storage such as Wasabi, Amazon S3, or any number of vendors following the open object storage standard.",
  },
  {
    q: "Is my data secure?",
    a: "The overall premise of Harbor is that you should be able to manage your data, not someone else. If you use a cloud provider, do you really know your data is secure? Employees often have access to hosted systems without your knowledge. Data in those systems often flows through third party providers with different security postures. Data breaches happen in the cloud, which is why Harbor can be hosted inside your four walls. With drive encryption, MFA access, and device tokens, Harbor is more secure out of the box than the vast majority of services you can subscribe to.",
  },
  {
    q: "Can you recommend inexpensive hardware to run Harbor on?",
    a: "Yes, sure. Harbor is tested on a Raspberry Pi running Ubuntu, and on small form factor servers like the Protectli Vault.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="flex flex-col items-center gap-[56px] bg-ground lane py-[60px] md:py-[88px]">
      <div className="flex w-full flex-col items-center gap-[18px]">
        <span className="font-mono text-label font-medium leading-[14px] tracking-mono text-faint">FAQ</span>
        <h2 className="max-w-[860px] text-center text-section-head font-bold leading-[1.1] tracking-tight text-text">
          Questions? We&rsquo;ve got answers.
        </h2>
      </div>

      <StaggerGroup as="dl" className="flex w-full max-w-[860px] flex-col">
        {QUESTIONS.map((item, i) => (
          <StaggerItem
            key={item.q}
            className={`flex flex-col gap-[10px] py-[28px] ${i > 0 ? "border-t border-border" : "pt-0"}`}
          >
            <dt className="text-section font-bold leading-[26px] tracking-snug text-text">{item.q}</dt>
            <dd className="text-[15.5px] leading-[26px] text-muted">{item.a}</dd>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
