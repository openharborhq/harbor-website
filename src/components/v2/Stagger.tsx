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
 * **No fade, and no blur.** The items travel and that is all. Opacity is switched, not
 * transitioned — an item is solid the instant its turn arrives and then moves — because the point
 * is the movement, and a blur-and-fade over the top of it reads as mush. It is only here at all
 * because an item resting 26px below its place while it waits its turn is not "hidden", it is
 * "misaligned", and on a section that is already on screen at load it would look broken.
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

const group: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.075, delayChildren: 0.05 } },
};

const child: Variants = {
  hidden: { y: 26, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      y: { type: "spring", stiffness: 280, damping: 26, mass: 0.9 },
      opacity: { duration: 0.001 },
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
  // `once`: an entrance, not a tic that fires every time the section is scrolled past. The margin
  // holds it back from the very bottom edge so the build happens where it can be seen.
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
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
