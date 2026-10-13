// ArchSeam
//
// Promoted into templates/components/shapes/ from the Reliance build, where it
// was first written as a library candidate. Read ArchAperture.tsx's header
// first, it explains why a fifth data-shape value has to be a fifth primitive.
//
// WHY IT EXISTS. bin/assert-shapes.mjs resolves this style's `medium` density
// to FIVE distinct data-shape strings on the home page. The shared library
// yields three inside the `arches` family that this build can draw without a
// photograph it does not have: `bleed` from Bleed with fallback="panel",
// `overlap-figure` from OverlapFigure, and `arch-media` from the hero's own
// media column. ArchAperture is the fourth. This is the fifth, and it is the
// only one of the five that costs nothing at all: it replaces a Divider, so
// the page is not one pixel taller for having it.
//
// WHAT IT IS. The seam between two tones, drawn as an arch instead of a
// straight edge. It is the arches-family sibling of
// templates/components/shapes/CurvedSeam.tsx, which belongs to `organic` and
// `wavy` and may not ship here: composition/shape-vocabulary.md line 39, "A
// style picks ONE family and stays inside it."
//
// HOW IT IS DRAWN. One inline SVG path, filled with the colour of the section
// BELOW, so the dome rising through the middle reads as that section arching up
// into the one above it. The curve is the same sampled power curve ArchMedia
// uses for its pointed variant and ArchAperture for its crown, at ArchAperture's
// gentler exponent, so all three arches on a page are recognisably one arch.
//
// It keeps `class="divider"`, so every globals.css adjacency rule about the
// space around a seam still applies to it, and so gate 11's DIVIDERS-RENDER
// rule still counts it. Height is --divider-height, the same token every other
// seam on the site reads, which is why swapping one in changes no height.
// Width is 100%, never 100vw: 100vw includes a reserved scrollbar and that is
// one of the two ways a shape fails the horizontal overflow check at 390.
//
// aria-hidden always: this is a fill between two backgrounds, not content.
// MOTION. Nothing here animates, exactly like Divider and CurvedSeam.

const FILL: Record<string, string> = {
  light: "var(--color-surface)",
  tint: "var(--color-surface-tint)",
  alt: "var(--color-surface-alt)",
  dark: "var(--color-surface-deep)",
};

// Forty-one samples of the curve, in a 100 by 100 box stretched by
// preserveAspectRatio="none". y = 0 is the top of the seam, so the dome peaks
// at the centre and lands on both bottom corners. The area UNDER the curve is
// the filled region, which is the section below.
const SAMPLES = 41;
const dome = Array.from({ length: SAMPLES }, (_, i) => {
  const x = (i / (SAMPLES - 1)) * 100;
  const t = Math.abs(1 - x / 50);
  const y = 100 - 100 * Math.pow(1 - t * t, 0.5);
  return `${x.toFixed(2)},${Math.min(100, Math.max(0, y)).toFixed(2)}`;
});
const SEAM_PATH = `M0,100 L${dome.join(" L")} L100,100 Z`;

export interface ArchSeamProps {
  /** The tone of the section BELOW, which is the colour the arch is filled in. */
  into?: "light" | "tint" | "alt" | "dark";
}

export default function ArchSeam({ into = "light" }: ArchSeamProps) {
  return (
    <div
      className="divider"
      data-shape="arch-seam"
      aria-hidden="true"
      style={{ lineHeight: 0, backgroundColor: "transparent" }}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        focusable="false"
        style={{ display: "block", width: "100%", height: "100%" }}
      >
        <path d={SEAM_PATH} fill={FILL[into] ?? FILL.light} />
      </svg>
    </div>
  );
}
