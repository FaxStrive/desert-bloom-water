// ArchAperture
//
// Promoted into templates/components/shapes/ from the Reliance build, where it
// was first written as a library candidate.
//
// WHY IT EXISTS. This style's shapes block asks for the `arches` family at
// `medium` density, which bin/assert-shapes.mjs resolves to five DISTINCT
// data-shape strings on the home page. The shared library yields exactly four
// values inside that family: `arch-media` from ArchMedia, `bleed` from Bleed,
// `overlap-figure` from OverlapFigure and `arch` from ShapedVideo. The spec
// proposed reaching five with a second ArchMedia variant, and that does not
// work: the gate counts distinct STRINGS, and a second variant of ArchMedia
// still renders data-shape="arch-media". A fifth value has to be a fifth
// primitive, and it has to stay inside the family rather than borrowing a
// circle or a diagonal from another one.
//
// WHAT IT IS. A deep band with an arch-topped aperture cut through its top
// edge, so the lighter section above shows through the cut. The type sits in
// the shell BELOW the aperture and never inside it: an arch is a doorway, and
// a paragraph set inside a doorway is a paragraph with a curve taken out of
// its first line.
//
// HOW THE CUT IS DRAWN, and why it is not a clip-path on the section. A
// clip-path on the band would take the band's own background away and leave
// the page behind it showing through, which is the right visual result and the
// wrong mechanism: the band also carries .on-dark, which sets the text colour
// for everything inside it, and a clipped section drops its own paint at the
// edges where the type is. So the band paints normally and ONE inline SVG
// path, filled with the colour of the section above, is laid over its top
// edge. The arch is the negative space. The path is aria-hidden and
// pointer-events-none, so it is not in the accessibility tree and cannot take
// a click off a link.
//
// The shape is drawn in a viewBox with preserveAspectRatio="none", so it
// stretches to whatever width it is given and needs no media query. Width is
// 100%, never 100vw: 100vw includes the scrollbar on a desktop browser that
// reserves one, which is one of the two ways a shape fails the horizontal
// overflow check at 390.
//
// MOTION. Nothing here animates. The aperture is a layout fact, like the
// bleed in Bleed, so there is nothing for prefers-reduced-motion to turn off
// and nothing that could animate a property outside transform and opacity.

import type { ReactNode } from "react";

export interface ArchApertureProps {
  /** The tone of the section ABOVE, which is what the cut shows through to. */
  from?: "light" | "tint" | "alt";
  /** How tall the aperture is drawn, as a proportion of its own width. */
  rise?: number;
  eyebrow?: string;
  headline?: ReactNode;
  body?: string;
  children?: ReactNode;
}

const FILL: Record<string, string> = {
  light: "var(--color-surface)",
  tint: "var(--color-surface-tint)",
  alt: "var(--color-surface-alt)",
};

// The aperture path, in a 100 by 100 box, stretched by preserveAspectRatio.
// Two mirrored shoulders meeting in a single round crown at the top centre,
// cut upward out of the band: the area OUTSIDE the arch is filled, so the
// filled region is the section above and the arch itself is the band showing
// through. Forty-one samples of the same power curve ArchMedia uses for its
// pointed variant, at a gentler exponent so this reads as a round doorway
// rather than a lancet, which keeps the two primitives distinguishable on
// one page.
const SAMPLES = 41;
const arch = Array.from({ length: SAMPLES }, (_, i) => {
  const x = (i / (SAMPLES - 1)) * 100;
  const t = Math.abs(1 - x / 50);
  const y = 100 - 100 * Math.pow(1 - t * t, 0.5);
  return `${x.toFixed(2)},${Math.min(100, Math.max(0, y)).toFixed(2)}`;
});
const APERTURE_PATH = `M0,0 L100,0 L100,100 L${arch.slice().reverse().join(" L")} L0,100 Z`;

export default function ArchAperture({
  from = "light",
  rise = 0.14,
  eyebrow,
  headline,
  body,
  children,
}: ArchApertureProps) {
  if (!headline) {
    return null;
  }

  const height = `clamp(72px, ${(rise * 100).toFixed(0)}vw, 220px)`;

  return (
    <section className="section on-dark" data-shape="arch-aperture" style={{ position: "relative", overflowX: "clip" }}>
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height,
          display: "block",
          pointerEvents: "none",
        }}
      >
        <path d={APERTURE_PATH} fill={FILL[from] ?? FILL.light} />
      </svg>
      <div className="shell" style={{ position: "relative", paddingTop: height }}>
        <div className="mb-10 max-w-2xl">
          {eyebrow ? (
            <span className="eyebrow mb-4 block" style={{ color: "var(--color-accent-text-on-dark)" }}>
              {eyebrow}
            </span>
          ) : null}
          <h2>{headline}</h2>
          {body ? <p className="lede mt-4">{body}</p> : null}
        </div>
        {children}
      </div>
    </section>
  );
}
