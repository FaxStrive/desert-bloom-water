// CircleMedia
//
// Media isolated in a disc or an oval, sitting beside a text column. The
// clean-minimal family leans on this: a circle reads as a portrait or a
// detail shot rather than a product hero, and it is the cheapest way to
// break a page of rectangles without touching the surrounding grid at all.
//
// Same layering rule as ArchMedia: this component never reaches into
// Figure's own wrapper to set a radius. It wraps Figure in a div THIS file
// owns, gives that div a border-radius of 50% (a true circle only when the
// box is square, an oval otherwise, which is exactly what "circle" vs
// "oval" below controls) and overflow:hidden, and lets Figure keep its own
// --radius-media and --figure-inset contract completely alone underneath.
//
// The trap: a circle needs a 1:1 box to actually be circular. Passing this
// component a 16:9 source image inside a "circle" variant does not crop it
// to square first - object-fit: cover (Figure's own default) handles the
// crop, but only because Figure's own aspect prop is forced to "1/1" here
// regardless of what the caller passes for the image's real proportions.
// "oval" relaxes that to "4/5", wide enough that 50% radius reads as an
// oval rather than a circle, not so wide that it drifts back toward a plain
// rounded rectangle.
//
// NO PICTURE IS A LEGAL STATE. `imageSrc` is optional, as it already is on
// Bleed and AngledSplit: the asset layer hands a build an EMPTY slot when
// nothing honest fits, and the documented outcome is to render the slot
// without a photograph. Two cases, and they differ on purpose:
//   - `placeholderText` given: a named person's portrait slot. The disc is
//     still drawn, carrying that text (initials, never a stock face), so the
//     shape is real and is counted as one. It is aria-hidden, because the
//     text is a label for an empty slot and not a picture of anyone.
//   - no `placeholderText`: there is nothing to put in a circle, so this
//     renders as an ordinary padded band and does NOT claim
//     data-shape="circle-media". A shape census counts shapes that were drawn.
//
// Reduced motion: static shape, no animation to gate.

import type { CSSProperties } from "react";
import { CTA_ACTION } from "@/lib/industry";
import Figure from "../sections/Figure";
import PortraitStage from "./PortraitStage";
import type { ReactNode } from "react";

export interface CircleMediaProps {
  /** Omitted when the asset layer left this slot empty. See the header. */
  imageSrc?: string;
  imageAlt?: string;
  /** Text drawn in the disc when there is no picture, for a named person's portrait slot. */
  placeholderText?: string;
  variant?: "circle" | "oval";
  side?: "left" | "right";
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
  /** A plain inline text link under the body, for a pointer to another page.
   *  Unlike ctaLabel it is not a button and does not carry the conversion
   *  attribute, so a link to an about page is not counted as a booking. */
  linkLabel?: string;
  linkHref?: string;
  tone?: "light" | "alt";
  /** Max width of the disc/oval itself, so it never grows to swallow the column on a wide viewport. */
  maxWidth?: number;
  /** Draw the picture as a PortraitStage: the photo stays at `maxWidth` px (never enlarged) on a
   *  larger brand disc and ring, so a small portrait is a composition and not a thumbnail. The
   *  column is `stageSize` px wide. Off by default: every existing caller renders as it did. */
  stage?: boolean;
  stageSize?: number;
  /** CSS object-position for the picture inside the disc. A portrait supplied at 2:3 is cropped to the
   *  square, and the default centre crop takes the top of a head off: pass "top" or "50% 15%". */
  imagePosition?: string;
}

export default function CircleMedia({
  imageSrc,
  imageAlt,
  placeholderText,
  variant = "circle",
  side = "right",
  eyebrow,
  headline,
  body,
  ctaLabel,
  ctaHref,
  linkLabel,
  linkHref,
  tone = "light",
  maxWidth = 480,
  imagePosition,
  stage = false,
  stageSize = 340,
}: CircleMediaProps) {
  if (!headline) {
    return null;
  }

  const toneClass = tone === "alt" ? " on-alt" : "";
  const mediaIsRight = side === "right";
  const aspect = variant === "circle" ? "1/1" : "4/5";

  if (!imageSrc && !placeholderText) {
    return (
      <section className={`section${toneClass}`}>
        <div className="shell">
          <div className="max-w-2xl">
            {eyebrow ? <span className="eyebrow mb-4 block">{eyebrow}</span> : null}
            <h2>{headline}</h2>
            {body ? <p className="lede mt-4">{body}</p> : null}
            {linkLabel && linkHref ? (
              <a href={linkHref} className="mt-6 inline-block font-semibold" style={{ color: "var(--color-accent-text)" }}>
                {linkLabel}
              </a>
            ) : null}
            {ctaLabel && ctaHref ? (
              <div className="mt-8">
                <a href={ctaHref} className="btn btn-primary btn-sweep" data-cta={CTA_ACTION}>
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

  return (
    <section className={`section${toneClass}`} data-shape="circle-media">
      {/* The text column takes what the picture leaves. A 220px circle in one half
          of a 1200px band left the words a 550px column and a 900px band. */}
      <div
        className={`shell grid grid-cols-1 items-center ${stage ? "gap-6" : "gap-10"} lg:gap-16 ${mediaIsRight ? "lg:grid-cols-[minmax(0,1fr)_var(--circle-w)]" : "lg:grid-cols-[var(--circle-w)_minmax(0,1fr)]"}`}
        style={{ "--circle-w": `${stage && imageSrc ? stageSize : maxWidth}px` } as CSSProperties}
      >
        <div
          className={`mx-auto w-full ${mediaIsRight ? "order-1 lg:order-2" : "order-1 lg:order-1"}`}
          style={stage && imageSrc ? { maxWidth: stageSize } : { maxWidth, borderRadius: "50%", overflow: "hidden" }}
        >
          {stage && imageSrc ? (
            <PortraitStage src={imageSrc} alt={imageAlt ?? ""} size={stageSize} portrait={maxWidth} position={imagePosition} />
          ) : imageSrc ? (
            <Figure src={imageSrc} alt={imageAlt ?? ""} fill sizes={`(max-width: 1024px) 60vw, ${maxWidth}px`} wrapperClassName="relative w-full" aspect={aspect} wrapperStyle={{ "--figure-inset": "0px", "--image-frame": "0px" } as CSSProperties} style={imagePosition ? { objectPosition: imagePosition } : undefined} />
          ) : (
            <div
              aria-hidden="true"
              data-placeholder="true"
              className="flex w-full items-center justify-center font-heading"
              style={{
                aspectRatio: aspect,
                fontSize: "clamp(48px, 8vw, 96px)",
                color: "var(--color-ink-muted)",
                backgroundColor: tone === "alt" ? "var(--color-surface)" : "var(--color-surface-alt)",
                border: "1px solid var(--color-border)",
              }}
            >
              {placeholderText}
            </div>
          )}
        </div>
        <div className={`max-w-3xl ${mediaIsRight ? "order-2 lg:order-1" : "order-2 lg:order-2"}`}>
          {eyebrow ? <span className="eyebrow mb-4 block">{eyebrow}</span> : null}
          <h2>{headline}</h2>
          {body ? <p className="lede mt-4">{body}</p> : null}
          {linkLabel && linkHref ? (
            <a href={linkHref} className="mt-6 inline-block font-semibold" style={{ color: "var(--color-accent-text)" }}>
              {linkLabel}
            </a>
          ) : null}
          {ctaLabel && ctaHref ? (
            <div className="mt-8">
              <a href={ctaHref} className="btn btn-primary btn-sweep" data-cta={CTA_ACTION}>
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
