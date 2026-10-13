"use client";

// Reveal
//
// A scroll-reveal wrapper. The failure mode is a visible page: the server
// render carries no data-reveal attribute at all, so with no JavaScript, a
// dead IntersectionObserver, or reduced motion, the content is simply
// visible from the start. Only after mount, and only when the visitor has
// not asked for reduced motion, does this component arm itself (which
// globals.css hides) and then reveal on intersection. A 1200ms failsafe
// timer reveals unconditionally in case the observer never fires.
//
// Reveals once: the element is unobserved after its first intersection.
//
// The travel distance is not set here: this component only ever toggles the
// `data-reveal` attribute (armed -> shown) and carries the `.reveal` class.
// globals.css reads `--motion-reveal-travel` off that class to decide how
// far the element actually moves, so the distance changes with the style
// the same way every other motion value does, without this file knowing
// what style is active.

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

export interface RevealProps {
  children: ReactNode;
  as?: "div" | "section" | "li";
  delayMs?: number;
  className?: string;
}

export default function Reveal({ children, as = "div", delayMs = 0, className }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const setRef = (node: HTMLElement | null) => {
    ref.current = node;
  };

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      return;
    }

    node.setAttribute("data-reveal", "armed");

    let observer: IntersectionObserver | null = null;

    const reveal = () => {
      node.setAttribute("data-reveal", "shown");
    };

    const failsafe = setTimeout(reveal, 1200);

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal();
            clearTimeout(failsafe);
            observer?.unobserve(node);
          }
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(node);

    return () => {
      clearTimeout(failsafe);
      observer?.disconnect();
    };
  }, []);

  const style = { "--reveal-delay": `${delayMs}ms` } as CSSProperties;
  const revealClassName = `reveal${className ? ` ${className}` : ""}`;

  if (as === "section") {
    return (
      <section ref={setRef} className={revealClassName} style={style}>
        {children}
      </section>
    );
  }

  if (as === "li") {
    return (
      <li ref={setRef} className={revealClassName} style={style}>
        {children}
      </li>
    );
  }

  return (
    <div ref={setRef} className={revealClassName} style={style}>
      {children}
    </div>
  );
}
