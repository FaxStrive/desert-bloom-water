// Figure
//
// The one image wrapper every section uses. It never decides a crop, a
// corner, a frame, or a background for itself: all of that comes from the
// `.figure` class in globals.css, which reads --image-treatment,
// --image-frame, --radius-media, --figure-inset, --figure-pad and
// --figure-bg. A style switch changes every photograph on the site by
// changing those variables; this component never branches on the treatment
// name, because a component that has to know the treatment to render
// correctly is a component the style system did not actually reach.
//
// Full-bleed, rounded-card and isolated-on-white are visual outcomes of the
// same markup, not three code paths. The only thing this component controls
// is layout: callers pass `wrapperClassName` / `wrapperStyle` for min-height
// and grid placement, exactly the utilities they already used on the raw
// positioning `<div>` before this component existed. Those are layout facts
// (how much space the image gets), not treatment facts (how the image fills
// that space), so they stay the caller's decision.
//
// The aspect ratio is now a declared layout fact this component owns, not a
// Tailwind utility a caller could forget. `aspect` is required: either a
// "w/h" ratio ("16/9", "4/3", "1/1", "3/4") or the literal "free" for a box
// that is intentionally viewport-height and has no fixed ratio (a full-bleed
// hero, a min-70vh portrait band). It lands on the wrapper as both
// `data-aspect` (what the image-fit gate reads) and `style.aspectRatio`.
//
// next/image renders an `<img>` inside its own wrapper when `fill` is used;
// `.figure` targets that inner element directly in globals.css, which is why
// this component never sets `object-fit`, `border-radius` or padding via a
// Tailwind utility or an inline style. Setting any of those here would win
// the cascade over the style's own class and silently break the contract.
// The one exception is `fit`: the treatment that applies is not knowable at
// render time (it lives in brand.css), so a caller that already knows which
// fit its image needs can pass `fit` to set `--figure-fit` inline on this
// wrapper, overriding the treatment default for that one image. Leaving it
// unset inherits whatever the treatment already set; `data-fit` always
// reflects which happened, so the gate can tell a declared override from an
// inherited default.
//
// `cutout` is the only honest reason to reach for contain. A cut-out is a
// subject already isolated on a transparent or white background: a product
// shot of a tank, a filter cartridge on white. It has no background to crop
// into, so cropping it would clip the subject, and contain is correct. A
// photograph is not a cut-out, and contain on a photograph is the white-bar
// bug: a 475x712 portrait sitting inside a 787x590 box with empty bars down
// both sides, which is what 16 of usa-water-v3's 19 images were doing.
// `cutout` sets fit to contain AND marks the wrapper data-cutout="true".
// Gate 12 (bin/assert-image-fit.mjs) fails any contain image that is not
// marked, so the mark is the claim and the gate audits it. Mark the library
// entry as a cut-out during the picture pass before you pass this.

import Image, { type ImageProps } from "next/image";
import type { CSSProperties } from "react";

export interface FigureProps extends ImageProps {
  /** Layout only: min-height, grid/order utilities. Never a corner, a crop, or a motion class. */
  wrapperClassName?: string;
  wrapperStyle?: CSSProperties;
  /** Declared aspect ratio ("16/9", "4/3", "1/1", "3/4") or "free" for an intentionally viewport-height box. */
  aspect: string;
  /** Optional override of the treatment's own object-fit, for the rare image that needs the other one. */
  fit?: "cover" | "contain";
  /** This image is a true cut-out (subject isolated on transparent or white). Forces contain and marks it for gate 12. */
  cutout?: boolean;
}

export default function Figure({ wrapperClassName, wrapperStyle, aspect, fit, cutout, className, ...imageProps }: FigureProps) {
  const resolvedFit = cutout ? "contain" : fit;

  const style: CSSProperties = {
    ...(aspect !== "free" ? { aspectRatio: aspect } : undefined),
    ...(resolvedFit ? ({ "--figure-fit": resolvedFit } as CSSProperties) : undefined),
    ...wrapperStyle,
  };

  return (
    <div
      className={`figure${wrapperClassName ? ` ${wrapperClassName}` : ""}`}
      data-aspect={aspect}
      data-fit={resolvedFit ?? "inherit"}
      data-cutout={cutout ? "true" : undefined}
      style={style}
    >
      <Image {...imageProps} className={className ? `figure-img ${className}` : "figure-img"} />
    </div>
  );
}
