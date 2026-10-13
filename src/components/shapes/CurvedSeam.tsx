// CurvedSeam
//
// A real curve between two tones, used as the join between one section and
// the next. This is a sibling of `Divider` (in ../sections/CurvedEdge.tsx),
// not a replacement for it - Divider reads a style-wide `--divider-shape`
// variable and is the DEFAULT edge every section boundary gets for free.
// CurvedSeam is what a build reaches for when a specific seam needs a
// specific, named curve regardless of what the style's default divider is:
// the shape-vocabulary contract calls it out by name for the `organic` and
// `wavy` families, where the curve is not incidental chrome but the whole
// point of the section boundary.
//
// `curvature` picks convex (the curve bulges toward the section ABOVE it,
// like water cresting) or concave (it bulges toward the section BELOW,
// like a basin). `direction` then says which of the two sections the fill
// colour represents: "up" fills from the bottom of this element upward
// (this curve is the top edge of the section below), "down" fills from the
// top downward (this curve is the bottom edge of the section above). The
// four combinations are four genuinely different silhouettes, not two
// mirrored twice - see the four path strings below rather than trying to
// derive one from another with a transform, which is how Divider's old
// "curved" shape drifted into looking identical in both directions before
// the 2026-09-24 rewrite noted in that file.
//
// `amplitude` is a prop, not a hardcoded number, specifically so a style's
// own stylesheet can raise or lower it per rule 8 of the shape contract.
// Passing nothing falls back to the CSS custom property --seam-amplitude,
// with a 64px literal fallback below that in case a style never set the
// variable at all - three tiers deep, so this never renders a flat line by
// accident. The value is applied as the rendered SVG height in CSS, the
// same technique the wavy Divider branch uses, so the fixed 0-100 viewBox
// coordinates never need recalculating in JS; the browser stretches the
// same path taller or shorter as amplitude changes.
//
// aria-hidden always: this is a fill between two backgrounds, not content.
// Reduced motion: static shape, nothing here animates.

import type { CSSProperties } from "react";

export interface CurvedSeamProps {
  direction?: "up" | "down";
  curvature?: "convex" | "concave";
  /** Rendered height in px. Falls back to var(--seam-amplitude), then 64px. */
  amplitude?: number;
  /** The colour this curve fills, i.e. the tone of the section it represents the edge of. */
  fillTone?: "light" | "alt" | "dark";
}

const FILL: Record<string, string> = {
  light: "var(--color-surface)",
  alt: "var(--color-surface-alt)",
  dark: "var(--color-surface-deep)",
};

// Four fixed paths in a 0-100 x 0-100 viewBox, one per (direction, curvature)
// pair. Kept as literal strings rather than derived from each other: a
// convex-up curve and a concave-down curve are NOT the same path flipped,
// because "up" and "down" also swap which half of the box is filled.
const PATHS: Record<"up" | "down", Record<"convex" | "concave", string>> = {
  up: {
    convex: "M0 100 L0 46 Q50 -10 100 46 L100 100 Z",
    concave: "M0 100 L0 54 Q50 118 100 54 L100 100 Z",
  },
  down: {
    convex: "M0 0 L0 54 Q50 -10 100 54 L100 0 Z",
    concave: "M0 0 L0 46 Q50 118 100 46 L100 0 Z",
  },
};

export default function CurvedSeam({ direction = "up", curvature = "convex", amplitude, fillTone = "light" }: CurvedSeamProps) {
  const fill = FILL[fillTone] ?? FILL.light;
  const d = PATHS[direction][curvature];
  const style: CSSProperties = {
    display: "block",
    width: "100%",
    height: amplitude ? `${amplitude}px` : "var(--seam-amplitude, 64px)",
  };

  return (
    <div className="divider" data-shape="curved-seam" data-seam-direction={direction} data-seam-curvature={curvature} aria-hidden="true" style={{ lineHeight: 0, backgroundColor: "transparent", height: "auto", clipPath: "none" }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false" style={style}>
        <path d={d} fill={fill} />
      </svg>
    </div>
  );
}
