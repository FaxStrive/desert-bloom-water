// BlobMedia
//
// An organic mask over a photograph, for the "organic" family
// (warm-friendly, creative-experimental, wavy). The shape vocabulary
// contract is explicit that this shape is CHOSEN, never randomised: pass
// one of the four named values below and you get exactly that markup every
// time, on every run, for every build. A component that rolled its own
// random blob on each render would make two builds of the same style look
// like two different systems, and would make this file untestable - a
// snapshot test could never agree with itself.
//
// The four shapes are CSS border-radius "blob" values (the eight-value
// border-radius trick: horizontal radii before the slash, vertical after),
// not clip-path polygons. Border-radius blobs draw as real curves with no
// facets, they respond correctly to object-fit: cover cropping underneath,
// and unlike a clip-path they still clip a box-shadow or outline placed on
// the same element if a future style wants one. Same layering rule as
// ArchMedia and CircleMedia: the blob radius and overflow:hidden live on a
// div this component owns, wrapped around an untouched Figure, so Figure's
// own --radius-media contract never has to know a blob happened.
//
// The trap: border-radius percentages are relative to the box's OWN
// width/height, not to each other, so a blob tuned to look organic on a 1:1
// box can look like a plain rounded rectangle on a 4/5 box. All four named
// shapes below were picked against Figure's "free" aspect at a roughly
// square wrapper (see the default wrapperClassName), which is the aspect
// this component forces. Do not silently change that aspect per caller -
// if a page genuinely needs a taller blob, add a fifth named shape tuned
// for that ratio rather than stretching one of these four.

import { CTA_ACTION } from "@/lib/industry";
import Figure from "../sections/Figure";
import type { ReactNode } from "react";

export type BlobShape = "pebble" | "drop" | "wave-cell" | "lobe";

const BLOB_RADII: Record<BlobShape, string> = {
  pebble: "62% 38% 55% 45% / 45% 55% 45% 55%",
  drop: "60% 40% 45% 55% / 55% 60% 40% 45%",
  "wave-cell": "35% 65% 60% 40% / 55% 40% 60% 45%",
  lobe: "70% 30% 55% 45% / 40% 55% 45% 60%",
};

export interface BlobMediaProps {
  imageSrc: string;
  imageAlt: string;
  shape?: BlobShape;
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
  /** A plain text link under the copy, for a pointer to another page that is not the conversion
   *  action. CircleMedia already carried it; a BlobMedia that wanted to say "See the service" had
   *  only the quote button to do it with, which put data-cta on a link that is not a quote.
   *  Added 2026-10-02. */
  linkLabel?: string;
  linkHref?: string;
  tone?: "light" | "alt";
  /** The blob is at most 440px across instead of the whole half column (about 560px at 1440), so
   *  the section stands about 150px shorter. For a page whose budget cannot carry a square the
   *  width of half the page. Without it the component is what it was. Added 2026-10-02. */
  compact?: boolean;
}

export default function BlobMedia({
  imageSrc,
  imageAlt,
  shape = "pebble",
  side = "left",
  eyebrow,
  headline,
  body,
  ctaLabel,
  ctaHref,
  linkLabel,
  linkHref,
  tone = "light",
  compact = false,
}: BlobMediaProps) {
  if (!headline) {
    return null;
  }

  const toneClass = tone === "alt" ? " on-alt" : "";
  const mediaIsRight = side === "right";

  return (
    <section className={`section${toneClass}`} data-shape="blob-media" data-blob-shape={shape}>
      <div className="shell grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div
          className={`mx-auto w-full max-w-[220px] ${compact ? "sm:max-w-[440px]" : "sm:max-w-none"} ${mediaIsRight ? "order-1 lg:order-2" : "order-1 lg:order-1"}`}
          style={{ borderRadius: BLOB_RADII[shape], overflow: "hidden" }}
        >
          <Figure src={imageSrc} alt={imageAlt} fill sizes={compact ? "(max-width: 480px) 100vw, 440px" : "(max-width: 1024px) 100vw, 50vw"} wrapperClassName="relative aspect-[1/1] w-full" aspect="1/1" />
        </div>
        <div className={mediaIsRight ? "order-2 lg:order-1" : "order-2 lg:order-2"}>
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
