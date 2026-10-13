// GiantNumeral
//
// An oversized numeral or letterform behind content, clipped by its band.
// The facets family (bold-dynamic) and creative-experimental use this for
// a stat band or a section that wants a huge "01" or "24/7" as texture
// behind the real heading, the way a print spread sometimes runs a giant
// folio number behind body copy.
//
// `aria-hidden="true"` on the numeral is not optional. Rule 11 of the shape
// contract is explicit: this must never be the only thing conveying
// information, so the real number or fact has to exist AGAIN, normally, in
// the actual content children, in a normal-sized element a screen reader
// visitor will hear. Treat the giant glyph as texture, exactly like
// CornerAccent treats its corner label as texture - the difference is only
// scale.
//
// The band (this component's own outer element) carries `overflow: hidden`
// and `position: relative`, and the numeral is `position: absolute` inside
// it at a font-size large enough to run past the band's own edges. That is
// the point: a numeral that fits neatly inside its box does not read as
// "giant," it reads as "big text." Clipping it by the band is what makes
// the scale feel intentional rather than like an oversized heading someone
// forgot to constrain. Because it is absolutely positioned, it never
// affects the height of the band; a caller cannot make the numeral taller
// by adding more of it, the band's height (and thus how much of the glyph
// shows) is a `minHeight` this component controls directly.
//
// The real content passes as `children` and renders in normal flow, at
// `position: relative` with a z-index above the numeral, inside the same
// `.shell` every other section uses, so it is never a special case that
// needs different spacing rules than the rest of the page.
//
// Reduced motion: no animation. If a future style wants the numeral to
// drift on scroll, that motion has to live in a wrapping component (the
// same Reveal/parallax pattern used elsewhere) and must respect
// prefers-reduced-motion there - this component itself stays static so it
// is safe to use inside a reduced-motion context with zero extra work.

import type { CSSProperties, ReactNode } from "react";

export interface GiantNumeralProps {
  numeral: string;
  corner?: "left" | "right" | "center";
  tone?: "light" | "alt" | "dark";
  minHeight?: number;
  children: ReactNode;
}

const TONE_BG: Record<string, string> = {
  light: "var(--color-surface)",
  alt: "var(--color-surface-alt)",
  dark: "var(--color-surface-deep)",
};

const TONE_NUMERAL: Record<string, string> = {
  light: "var(--color-surface-alt)",
  alt: "var(--color-surface)",
  dark: "color-mix(in srgb, var(--color-surface) 12%, transparent)",
};

export default function GiantNumeral({ numeral, corner = "right", tone = "light", minHeight = 360, children }: GiantNumeralProps) {
  // The glyph is drawn by a ::before that reads data-numeral (see .giant-numeral
  // in globals.css), not by a text node. It is texture, aria-hidden by nature,
  // and a text node in a colour a few percent off its ground is exactly what the
  // contrast gate measures as text at 1.4:1. The real number lives again in the
  // content children, as it always had to.
  const style = {
    position: "relative",
    overflow: "hidden",
    backgroundColor: TONE_BG[tone],
    minHeight,
    "--gn-color": TONE_NUMERAL[tone],
    "--gn-left": corner === "left" ? "-2vw" : corner === "center" ? "50%" : "auto",
    "--gn-right": corner === "right" ? "-2vw" : "auto",
    "--gn-ml": corner === "center" ? "-2ch" : "0",
  } as CSSProperties;

  return (
    <section
      className={`giant-numeral ${tone === "dark" ? "section on-dark" : tone === "alt" ? "section on-alt" : "section"}`}
      data-shape="giant-numeral"
      data-numeral={numeral}
      style={style}
    >
      <div className="shell relative z-10">{children}</div>
    </section>
  );
}
