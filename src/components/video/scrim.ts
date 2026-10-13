// scrim.ts
//
// The gate that exists because of one specific mistake: `tidewater-pure`
// laid `linear-gradient(to right, rgba(0,0,0,0.65), rgba(0,0,0,0.55))` over
// its entire hero photograph. Read that string slowly. Two stops, ten
// points of alpha apart, spanning the full width. That is not a gradient,
// it is a flat grey fill wearing a gradient's syntax so it can slip past a
// reviewer who is scanning for the word "linear-gradient" and calling it
// safe. It exists because the house-look contrast gate needs the white
// headline to clear its floor, and covering the whole frame in one flat
// value is the cheapest possible way to get there. It also means every
// pixel of the photograph, including the two thirds of it nowhere near any
// text, is darkened by roughly the same amount. That is why the operator's
// word for it was "grey wash": the picture is not lit and shadowed the way
// a real photograph is, it is uniformly dimmed, which reads as an overlay
// sitting on TOP of the image rather than tonal work done WITH it.
//
// The fix is not "use a gradient instead of a flat colour", because the
// banned string already claims to be a gradient. The fix is what a real
// scrim actually does: it is dark where the type sits and it lets the
// photograph back in everywhere else, all the way to full transparency,
// well before the far edge of the frame. `bin/assert-no-flat-scrim.mjs`
// enforces exactly that: it fails any element covering more than 40 percent
// of a media element with a flat, single-stop, near-neutral fill above 0.25
// opacity, and it fails a hero whose rendered saturation has fallen below a
// stated fraction of the source image's. This file is the one place that
// builds the CSS string, so every caller earns contrast the same, legitimate
// way instead of reinventing (or re-flattening) it per component.
//
// Three rules this function enforces by construction, not by convention:
//
//   1. The ramp reaches alpha 0 by at most 65 percent of the frame. A scrim
//      that is still dark at 90 percent of the way across is a plateau with
//      soft edges, which is the same bug the gate exists to catch, just
//      blurred instead of hard-stopped. 65 percent means at least a third of
//      the frame is genuinely, fully the photograph.
//   2. At least three stops. Two stops is a straight line between two
//      values, which is exactly what produced the banned string: pick any
//      two close alpha values and CSS will happily draw a "gradient"
//      between them that looks, to the eye, like a flat tint. Three stops
//      forces an actual curve: dark at the anchor, a real midpoint, then
//      gone.
//   3. Anchored to where the copy sits, not centred on the frame or spread
//      across its full width. A hero with left-aligned type needs a
//      left-anchored ramp, not a wash that also darkens the right two
//      thirds of the photo where nothing is written.
//
// tint: "brand" mixes the fleet's own dark surface token into the ramp with
// color-mix, so the scrim reads as the site's own shadow tone, not a
// generic grey laid over any photo on any site. tint: "shadow" is for a
// still that needs to stay a true near-black (a night shot, a high-contrast
// product still) without going pure #000, which prints as a dead hole in a
// photograph rather than a shadow within one; it leans slightly warm so it
// still reads as light falling away rather than an inserted rectangle.
// tint: "neutral" exists for the rare caller that genuinely cannot access a
// brand token (an isolated preview, a test fixture) and should not be the
// default choice on a real page.

export type ScrimKind = "gradient" | "panel" | "crop";
export type ScrimAnchor = "bottom" | "left" | "right" | "top";
export type ScrimTint = "brand" | "shadow" | "neutral";

export interface GradientScrimOptions {
  /** Which edge of the frame the type sits at. The ramp starts dark there. */
  anchor: ScrimAnchor;
  /** Peak alpha at the anchor, 0 to 1. Defaults to 0.72: dark enough to clear
   * the contrast floor at the anchor without needing the whole frame dimmed. */
  strength?: number;
  /** Which dark value the ramp is built from. Defaults to "brand". */
  tint?: ScrimTint;
}

// The fraction of the frame, along the ramp's own axis, where the scrim has
// fully cleared. 0.65 means the far 35 percent of the frame is untouched
// photograph. This is the number `bin/assert-no-flat-scrim.mjs` checks a
// rendered scrim against; do not raise it to buy more coverage; anchor the
// component instead, per the hero fix below.
const CLEAR_BY = 0.65;

const DIRECTION: Record<ScrimAnchor, string> = {
  bottom: "to top",
  top: "to bottom",
  left: "to right",
  right: "to left",
};

function darkValue(tint: ScrimTint, alpha: number): string {
  if (tint === "brand") {
    // color-mix against the site's own deep-surface token: the scrim is
    // literally made of the brand's dark, at a strength that lands at
    // `alpha`, rather than a hardcoded rgba(0,0,0,N) that looks the same on
    // every client regardless of palette.
    return `color-mix(in srgb, var(--color-surface-deep) ${Math.round(alpha * 100)}%, transparent)`;
  }
  if (tint === "shadow") {
    // A near-black with a one-degree warm lean (a touch of red, a touch
    // less blue than true grey) so it reads as shadow falling across a
    // photograph rather than a synthetic rectangle stamped on top of one.
    // rgb(12, 9, 8) is "near black, warm" the way rgb(0,0,0) never is.
    return `rgba(12, 9, 8, ${alpha})`;
  }
  return `rgba(17, 17, 17, ${alpha})`;
}

/**
 * Builds a legitimate scrim: dark at the anchor, fully transparent by
 * CLEAR_BY of the frame, at least three stops so the ramp is a real curve.
 * Returns a CSS `linear-gradient(...)` string, ready for `backgroundImage`.
 */
export function gradientScrim(opts: { anchor: ScrimAnchor; strength?: number; tint?: ScrimTint }): string {
  const anchor = opts.anchor;
  const strength = opts.strength ?? 0.72;
  const tint = opts.tint ?? "brand";

  const direction = DIRECTION[anchor];
  const peak = darkValue(tint, strength);
  const mid = darkValue(tint, strength * 0.55);
  const clear = darkValue(tint, 0);

  const midStop = `${Math.round(CLEAR_BY * 55)}%`;
  const clearStop = `${Math.round(CLEAR_BY * 100)}%`;

  return `linear-gradient(${direction}, ${peak} 0%, ${mid} ${midStop}, ${clear} ${clearStop})`;
}
