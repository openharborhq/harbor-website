import type { Figure } from "./types";

/*
 * What every versus page says about Harbor itself, in one place, so the pages cannot drift apart
 * on the facts that do not depend on the other product.
 */

/** The opening line under every versus page's headline. */
export const HERO_LEAD = "Open source vs hosted. See how Harbor stacks up.";

/** Harbor's line in a ten-year cost chart: a $250 computer plus about $80 of electricity. */
export const HARBOR_TEN_YEARS: Figure = { label: "Harbor at home", value: "about $330", amount: 330, harbor: true };

/** The Harbor half of the small print under a cost chart. */
export const HARBOR_COST_NOTE =
  "Harbor assumes a $250 computer with storage, drawing 5 W at $0.188 per kWh: about $80 in electricity. Backup storage, optional hosted AI and any hardware replacements are extra.";

/** The questions about Harbor that follow each page's own "can I move my documents" question. */
export const HARBOR_FAQ = [
  {
    q: "What do I need to run Harbor?",
    a: "A Linux machine with Docker, such as a Raspberry Pi 5 with an SSD or a small PC, an encrypted disk, somewhere for backups, and some comfort with the command line.",
  },
  {
    q: "How long does it take to set up Harbor?",
    a: "Download Harbor and run a single script. It asks a few simple questions: which drive should hold your documents, how you want to reach Harbor and where your backups should go. Harbor does the rest. On a typical home connection it is ready in minutes. Then open Harbor in your browser and create your account.",
  },
];
