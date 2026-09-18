"use client";

import { motion, useInView, useReducedMotion, type Variants } from "motion/react";
import { useRef, type CSSProperties, type ReactNode } from "react";

/**
 * A group whose children build in one after another when it comes into view.
 *
 * Orchestration is Motion's rather than hand-rolled: the group holds the variant and
 * `staggerChildren` spaces the children, so the timing is one number in one place instead of a
 * delay computed per item and handed down.
 *
 * **A fade, but no blur.** The blur was the weak part: softening the edges of something that is
 * already moving and already changing opacity leaves nothing crisp to read the motion against, and
 * three overlapping effects at once average out to mush. So the item travels and fades, and its
 * edges stay sharp the whole way.
 *
 * The fade is shorter than the travel on purpose — it is up to full opacity while the item is
 * still moving, so what you watch is the movement arriving rather than the item resolving.
 */
type Tag = "div" | "section" | "ul" | "ol" | "dl" | "li" | "h1" | "p";

const TAGS = {
  div: motion.div,
  section: motion.section,
  ul: motion.ul,
  ol: motion.ol,
  dl: motion.dl,
  li: motion.li,
  h1: motion.h1,
  p: motion.p,
} as const;

/*
 * Numbers taken from 21st.dev's Stagger Reveal Grid, which does this for a living.
 *
 * Theirs: 40px of travel, a 0.9 scale, 0.5s, 0.08s apart. Mine had been 26px, no scale, 0.8s,
 * 0.12s apart — two thirds the distance over one and a half times the duration, with nothing
 * changing but position and opacity. That is what made it read as odd: a slow drift is not a
 * slower version of a build, it is a different and worse thing. Distance and scale are what make
 * it land; duration on its own only makes it float.
 *
 * So the distance and the scale come from the reference and the timing stays a little softer than
 * it: 0.62s rather than 0.5, 0.09s apart rather than 0.08. Their `back.out(1.2)` overshoots, and
 * that stays out — the spring version of this was already rejected for flinching.
 *
 * The curve is a moderate ease-out, deliberately not one of the dramatic ones. Something like
 * (0.16, 1, 0.3, 1) spends almost the whole move in its opening quarter, and past that there is
 * nothing left to see however long the duration claims — which is how an earlier version of this
 * managed to look like it was not running at all.
 */
const EASE = [0.22, 0.61, 0.36, 1] as const;

const STAGGER = 0.09;
const DELAY = 0.06;

const variantsFor = (stagger: number, delay: number): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

const group = variantsFor(STAGGER, DELAY);

const child: Variants = {
  hidden: { y: 40, opacity: 0, scale: 0.96 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      y: { duration: 0.62, ease: EASE },
      scale: { duration: 0.62, ease: EASE },
      // Still shorter than the travel, so what you watch is the movement arriving rather than the
      // item resolving.
      opacity: { duration: 0.4, ease: EASE },
    },
  },
};

type Common = {
  as?: Tag;
  children: ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
};

export function StaggerGroup({
  as = "div",
  children,
  className,
  id,
  style,
  /** Seconds between children. Widen it where a group's children are big enough to need room. */
  stagger = STAGGER,
  /** Seconds before the first child moves. */
  delay = DELAY,
}: Common & { stagger?: number; delay?: number }) {
  const ref = useRef<HTMLElement>(null);
  /*
   * `amount` rather than `margin`.
   *
   * `once`, because an entrance that replayed every time the section was scrolled past would be a
   * tic. The trigger is a plain threshold: a sixth of the group has to be on screen. A negative
   * `margin` did the same job in principle and did not fire at all in practice — a group sitting
   * at 407px in a 905px viewport stayed at rest indefinitely — and Motion documents that margin is
   * ignored in some embedding contexts. A threshold has no such caveat.
   */
  const inView = useInView(ref, { once: true, amount: 0.12 });
  const reduced = useReducedMotion();
  const Comp = TAGS[as];

  // Nothing attached at all under reduced motion, rather than an animation with its distances
  // zeroed: nothing to fail, and nothing that can leave the content somewhere it should not be.
  if (reduced) {
    return (
      <Comp id={id} className={className} style={style}>
        {children}
      </Comp>
    );
  }

  return (
    <Comp
      ref={ref as never}
      id={id}
      className={className}
      style={style}
      variants={stagger === STAGGER && delay === DELAY ? group : variantsFor(stagger, delay)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({ as = "div", children, className, id, style }: Common) {
  const reduced = useReducedMotion();
  const Comp = TAGS[as];

  if (reduced) {
    return (
      <Comp id={id} className={className} style={style}>
        {children}
      </Comp>
    );
  }

  return (
    // `data-motion` is what the layout's <noscript> rule targets. Motion renders its initial
    // variant as inline styles on the server, so without it a scripting-off visitor gets a hero
    // that is there in the markup and invisible on the screen.
    <Comp data-motion id={id} className={className} style={style} variants={child}>
      {children}
    </Comp>
  );
}
