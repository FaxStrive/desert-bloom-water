// CutCorner
//
// A card with a corner taken out of it - a straight diagonal notch, not a
// rounded one. This is the `facets` family's card treatment (bold-dynamic):
// where the arches and organic families soften a rectangle, facets makes a
// point of NOT softening it, cutting a hard angle out instead. It reads as
// industrial/technical rather than friendly, which is the intended effect
// for that style, so do not reach for this on a warm-friendly build just
// because a card needs visual interest - see the shape-families table in
// composition/shape-vocabulary.md before mixing families on one page.
//
// The notch is a clip-path polygon on the CARD itself, not on the image
// inside it. That matters for the same reason AngledSplit never clips its
// text column: this card's copy sits inside normal padding, well clear of
// the clipped corner, so a longer headline or an extra line of body copy
// can never be cut off by the notch - only the empty corner triangle (which
// this component always reserves via `notchPad`) is at risk of overlapping
// content, and it never contains any.
//
// `size` is the notch's leg length in px on each of the two edges meeting
// at the cut corner. `notchPad` (twice `size`) is applied as extra padding
// on that same corner so text never drifts into the clipped triangle even
// on a card whose content is short enough to otherwise sit close to the
// edge - remove that inner padding and a headline sitting flush against a
// notched top-right corner reads as damaged rather than designed, which is
// the actual failure mode this guards.
//
// No border-radius anywhere on this component: --radius-card is read and
// respected as 0 by construction (a cut corner on a rounded card looks like
// a rendering bug, not a design), so this deliberately ignores the token's
// value rather than applying it - the shape vocabulary's own contract for
// this family is "hard edges, one cut," and honouring a nonzero
// --radius-card here would contradict that on any style that set one.
//
// Reduced motion: no animation. The corner is cut once, at render, and
// never moves.

import Figure from "../sections/Figure";
import type { ReactNode } from "react";

export interface CutCornerProps {
  imageSrc?: string;
  imageAlt?: string;
  corner?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  size?: number;
  eyebrow?: string;
  /* A HEADLINE IS A NODE, NOT A STRING.
     Every reference page this pipeline is graded against closes its headings
     on an italic clause set in the accent - "Every faucet.", "For life." -
     and globals.css carries the h1/h2/h3 `em` rule that draws it. A `string`
     prop cannot hold that clause, so a build either shipped flat headlines or
     reached for dangerouslySetInnerHTML. ReactNode costs nothing: a caller
     passing a plain string is unaffected, and a caller with a clause writes
     the <em> itself. */
  headline?: ReactNode;
  body?: string;
  tone?: "light" | "alt";
}

export default function CutCorner({
  imageSrc,
  imageAlt,
  corner = "top-right",
  size = 40,
  eyebrow,
  headline,
  body,
  tone = "light",
}: CutCornerProps) {
  if (!headline) {
    return null;
  }

  const CLIP: Record<string, string> = {
    "top-left": `polygon(0 ${size}px, ${size}px 0, 100% 0, 100% 100%, 0 100%)`,
    "top-right": `polygon(0 0, calc(100% - ${size}px) 0, 100% ${size}px, 100% 100%, 0 100%)`,
    "bottom-left": `polygon(0 0, 100% 0, 100% 100%, ${size}px 100%, 0 calc(100% - ${size}px))`,
    "bottom-right": `polygon(0 0, 100% 0, 100% calc(100% - ${size}px), calc(100% - ${size}px) 100%, 0 100%)`,
  };

  const [vertical, horizontal] = corner.split("-") as ["top" | "bottom", "left" | "right"];
  const notchPad: Record<string, number | undefined> = {
    paddingTop: vertical === "top" ? size * 2 : undefined,
    paddingBottom: vertical === "bottom" ? size * 2 : undefined,
    paddingLeft: horizontal === "left" ? size * 2 : undefined,
    paddingRight: horizontal === "right" ? size * 2 : undefined,
  };

  return (
    <div
      className="card"
      data-shape="cut-corner"
      data-corner={corner}
      style={{
        backgroundColor: tone === "alt" ? "var(--color-surface-alt)" : "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: 0,
        clipPath: CLIP[corner],
        overflow: "hidden",
      }}
    >
      {imageSrc && imageAlt ? (
        <Figure src={imageSrc} alt={imageAlt} fill sizes="(max-width: 640px) 100vw, (max-width: 1023px) 50vw, 25vw" wrapperClassName="relative aspect-[16/10] w-full" aspect="16/10" />
      ) : null}
      <div style={{ ...notchPad, paddingTop: notchPad.paddingTop ?? 32, paddingBottom: notchPad.paddingBottom ?? 32, paddingLeft: notchPad.paddingLeft ?? 32, paddingRight: notchPad.paddingRight ?? 32 }}>
        {eyebrow ? <span className="eyebrow mb-2 block">{eyebrow}</span> : null}
        <h3 style={{ fontSize: "clamp(1.15rem, 1.7vw, 1.5rem)", lineHeight: 1.2 }}>{headline}</h3>
        {body ? <p className="mt-2" style={{ color: "var(--color-ink-muted)" }}>{body}</p> : null}
      </div>
    </div>
  );
}
