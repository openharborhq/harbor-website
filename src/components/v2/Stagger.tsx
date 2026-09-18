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
type Tag = "div" | "section" | "ul" | "ol" | "dl" | "li";

const TAGS = {
  div: motion.div,
  section: motion.section,
  ul: motion.ul,
  ol: motion.ol,
  dl: motion.dl,
  li: motion.li,
} as const;

/*
 * Eased rather than sprung, and slow enough to be watched.
 *
 * The spring this replaced was quick and slightly bouncy: it overshot its mark and settled in
 * under half a second, which on a marketing page reads as a flinch rather than an entrance. An
 * explicit duration and curve are also simply easier to reason about — two numbers, no physics.
 *
 * The curve is a moderate ease-out, deliberately not one of the dramatic ones. A curve like
 * (0.16, 1, 0.3, 1) spends almost the whole move in its opening quarter, and past that point
 * there is nothing left to see however long the duration says it runs — which is how an earlier
 * version of this effect managed to look like it was not running at all.
 */
const EASE = [0.22, 0.61, 0.36, 1] as const;

const group: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};

const child: Variants = {
  hidden: { y: 26, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      y: { duration: 0.8, ease: EASE },
      // Still shorter than the travel, so what you watch is the movement arriving rather than the
      // item resolving.
      opacity: { duration: 0.5, ease: EASE },
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

export function StaggerGroup({ as = "div", children, className, id, style }: Common) {
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
  const inView = useInView(ref, { once: true, amount: 0.16 });
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
      variants={group}
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
    <Comp id={id} className={className} style={style} variants={child}>
      {children}
    </Comp>
  );
}
