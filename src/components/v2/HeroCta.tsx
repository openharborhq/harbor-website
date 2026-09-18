"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Arrow, GitHubIcon } from "./parts";
import { doc } from "./routes";

const MotionLink = motion.create(Link);

/* The system's two curves: the standard ease for anything that travels a distance, and the one
   overshoot reserved for a thing arriving. The mark gets the overshoot; the scale and the label
   do not, because a button that bounces under the cursor is a toy. */
const EASE = [0.4, 0, 0.2, 1] as const;
const OVERSHOOT = [0.34, 1.56, 0.64, 1] as const;

const LIFT = { rest: { scale: 1 }, hover: { scale: 1.02 }, press: { scale: 0.99 } };

/* The label slides half the mark's footprint to the left while the mark walks out from under it,
   so the two finish optically centred in a button whose width never changed. Both marks happen to
   occupy 25px including their gap — a 16px arrow at 9px, a 17px logo at 8px — which is why one
   pair of numbers serves both buttons. */
const SHIFT = { rest: { x: 0 }, hover: { x: -12.5 }, press: { x: -12.5 } };
const REVEAL = { rest: { opacity: 0, x: -14 }, hover: { opacity: 1, x: 0 }, press: { opacity: 1, x: 0 } };

const PILL = "rounded-pill px-[24px] py-[12px] text-copy font-semibold leading-body tracking-[-0.01em]";
const PRIMARY = `${PILL} bg-accent text-ground`;
const SECONDARY = `${PILL} border border-border-strong bg-ground text-text`;

/*
 * The hero's two buttons, and the only client island above the fold.
 *
 * They used to lift on a drop shadow, which the design system forbids twice over: depth here is
 * carried by the tonal step, hairlines and weight, never by a shadow under a resting or hovered
 * element. What replaced it is a 2% scale, and then the thing the buttons actually have to say —
 * each one keeps its mark hidden behind its own label and hands it over on hover. The primary's
 * arrow says it leads onward; the secondary's logo says where it lands.
 *
 * Both answer in the same currency, so the pair reads as one control: same scale, same curve,
 * same press, same reveal. A darkening wash was tried on the secondary first and read as weak —
 * on a hairline button a tonal step is nearly the whole of the change, and it tells you nothing
 * you did not already know.
 */
export function HeroCta({ github }: { github: string }) {
  const still = useReducedMotion();

  /* Under `prefers-reduced-motion` the buttons revert to what they were before any of this: the
     primary showing its arrow outright, the secondary offering the `surface` wash, and neither
     transforming. A hover cannot animate a mark into view without motion, and hiding the arrow
     from these readers permanently would cost them the content rather than the animation. */
  if (still) {
    return (
      <Row>
        <Link href={doc("install")} className={`flex items-center gap-[9px] ${PRIMARY}`}>
          Get Started
          <Arrow />
        </Link>
        <Link href={github} className={`${SECONDARY} transition-colors duration-150 ease-out hover:bg-surface`}>
          Go to repo
        </Link>
      </Row>
    );
  }

  return (
    <Row>
      <Button href={doc("install")} className={PRIMARY} mask="bg-accent" gap="ml-[9px]" mark={<Arrow />}>
        Get Started
      </Button>
      <Button href={github} className={SECONDARY} mask="bg-ground" gap="ml-[8px]" mark={<GitHubIcon />}>
        Go to repo
      </Button>
    </Row>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col items-center gap-[14px] pt-[6px] sm:flex-row">{children}</div>;
}

/**
 * A pill whose mark is parked behind its label until the cursor arrives.
 *
 * The mark is taken out of flow (`absolute left-full`), which is what keeps the button's layout
 * width fixed: it grows only by the 2% scale, so the button beside it never moves. `mask` carries
 * the button's own fill onto the label and lifts it a layer, so the mark is genuinely hidden
 * behind it at rest rather than merely transparent beside it — the 22px line box covers both the
 * 16px arrow and the 17px logo outright.
 */
function Button({
  href,
  className,
  mask,
  gap,
  mark,
  children,
}: {
  href: string;
  className: string;
  mask: string;
  gap: string;
  mark: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <MotionLink
      href={href}
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileTap="press"
      variants={LIFT}
      transition={{ duration: 0.18, ease: EASE }}
      className={`relative flex origin-center items-center justify-center ${className}`}
    >
      <motion.span className="relative flex items-center" variants={SHIFT} transition={{ duration: 0.26, ease: EASE }}>
        <span className={`relative z-[1] ${mask}`}>{children}</span>
        <motion.span
          className={`absolute left-full flex ${gap}`}
          variants={REVEAL}
          transition={{ duration: 0.3, ease: OVERSHOOT }}
        >
          {mark}
        </motion.span>
      </motion.span>
    </MotionLink>
  );
}
