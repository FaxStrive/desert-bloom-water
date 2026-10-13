// AngledSplit
//
// A section divided on a diagonal, content on both sides of the cut. The
// dark-luxury family's signature move: a straight vertical seam between an
// image and a panel reads as two boxes pushed together, and a diagonal one
// reads as a single deliberate composition, for the cost of one clip-path.
//
// The cut is drawn on the MEDIA side only, not on the text side. Clipping
// text with clip-path is how a future editor loses a descender or a wide
// character off a headline the first time the copy changes length - rule 4
// of this whole shape system is "never clip a text node", and the only way
// to guarantee that is to never put clip-path anywhere near the element
// that holds text. So the image column gets a diagonal edge via clip-path,
// and the text column is a completely ordinary padded box that never has a
// shape applied to it at all - the diagonal reads as a single cut because
// the two columns sit flush against each other with no gap, not because
// both were clipped to match.
//
// `skew` is the horizontal distance, in percent of the image column's own
// width, that the top of the cut is offset from the bottom. 0 is a plumb
// vertical seam (not actually angled - callers should not pass 0, but nothing
// breaks if they do). The default of 12 reads as a confident diagonal
// without eating so much of the image column that a portrait-oriented photo
// loses its subject off the clipped edge; anything past about 25 starts
// doing that on a narrow image.
//
// The trap: this only clips a straight edge cleanly when the column heights
// are known, which on this two-column grid they are (both columns stretch
// to the row's height via items-stretch). Do not lift this markup into a
// context where the two columns could end up different heights - the
// polygon points are 0%/100% of THIS element's own box, so if the box
// height changes independently of its sibling the seam no longer lines up
// with the sibling's edge.
//
// NO PICTURE IS A LEGAL STATE. `imageSrc` is optional, because the asset layer
// is allowed to hand a build an EMPTY slot and the documented correct outcome
// is to render that slot without a photograph (build stage brain, "An empty
// slot is the correct outcome, not a build failure"). Without an image there is
// no media column, so there is no diagonal either: the section renders as an
// ordinary padded text band and does NOT claim `data-shape="angled-split"`.
// Declaring a shape value for a section that draws no shape would inflate the
// shape census that gate 3 audits, which is worse than the missing picture.
//
// Reduced motion: no animation, the diagonal is a static layout fact.

import { CTA_ACTION } from "@/lib/industry";
import Figure from "../sections/Figure";
import type { ReactNode } from "react";

export interface AngledSplitProps {
  /** Omitted when the asset layer left this slot empty. No image, no diagonal. */
  imageSrc?: string;
  imageAlt?: string;
  side?: "left" | "right";
  /** Horizontal offset of the cut's top from its bottom, in percent of the image column width. */
  skew?: number;
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
  ctaLabel?: string;
  ctaHref?: string;
  tone?: "light" | "alt" | "dark";
}

export default function AngledSplit({
  imageSrc,
  imageAlt,
  side = "left",
  skew = 12,
  eyebrow,
  headline,
  body,
  ctaLabel,
  ctaHref,
  tone = "dark",
}: AngledSplitProps) {
  if (!headline) {
    return null;
  }

  const toneClass = tone === "alt" ? " on-alt" : tone === "dark" ? " on-dark" : "";

  if (!imageSrc) {
    return (
      <section
        className={`section${toneClass}`}
        style={{ backgroundColor: tone === "dark" ? "var(--color-surface-deep)" : undefined }}
      >
        <div className="shell">
          <div className="max-w-2xl">
            {eyebrow ? <span className="eyebrow mb-4 block">{eyebrow}</span> : null}
            <h2>{headline}</h2>
            {body ? <p className="lede mt-4">{body}</p> : null}
            {ctaLabel && ctaHref ? (
              <div className="mt-8">
                <a href={ctaHref} className={tone === "dark" ? "btn btn-on-dark btn-sweep" : "btn btn-primary btn-sweep"} data-cta={CTA_ACTION}>
                  <span>{ctaLabel}</span>
                  <span className="btn-arrow" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="block"><path d="M2 8h11" /><path d="M9 4l4 4-4 4" /></svg>
                  </span>
                </a>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    );
  }

  const mediaIsRight = side === "right";
  // When the media sits on the right, the cut leans the other way so the
  // point of the diagonal still faces the text column rather than facing
  // out toward the viewport edge.
  const clipPath = mediaIsRight
    ? `polygon(${skew}% 0, 100% 0, 100% 100%, 0% 100%)`
    : `polygon(0% 0, 100% 0, ${100 - skew}% 100%, 0% 100%)`;

  return (
    <section
      className={`section${toneClass}${tone === "dark" ? "" : " overflow-hidden"}`}
      data-shape="angled-split"
      style={{
        backgroundColor: tone === "dark" ? "var(--color-surface-deep)" : undefined,
        overflow: "hidden",
      }}
    >
      <div className="grid grid-cols-1 items-stretch gap-0 lg:grid-cols-2">
        <div
          className={`relative min-h-[280px] ${mediaIsRight ? "order-1 lg:order-2" : "order-1 lg:order-1"}`}
          style={{ clipPath }}
        >
          <Figure src={imageSrc} alt={imageAlt ?? ""} fill sizes="(max-width: 1024px) 100vw, 50vw" wrapperClassName="absolute inset-0 h-full w-full" aspect="free" />
        </div>
        <div
          className={`flex flex-col justify-center ${mediaIsRight ? "order-2 lg:order-1" : "order-2 lg:order-2"}`}
          style={{ paddingInline: "var(--gutter)", paddingBlock: "calc(var(--section-pad) * 0.45)" }}
        >
          <div className="mx-auto w-full max-w-lg">
            {eyebrow ? <span className="eyebrow mb-4 block">{eyebrow}</span> : null}
            <h2>{headline}</h2>
            {body ? <p className="lede mt-4">{body}</p> : null}
            {ctaLabel && ctaHref ? (
              <div className="mt-8">
                <a href={ctaHref} className={tone === "dark" ? "btn btn-on-dark btn-sweep" : "btn btn-primary btn-sweep"} data-cta={CTA_ACTION}>
                  <span>{ctaLabel}</span>
                  <span className="btn-arrow" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="block"><path d="M2 8h11" /><path d="M9 4l4 4-4 4" /></svg>
                  </span>
                </a>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
