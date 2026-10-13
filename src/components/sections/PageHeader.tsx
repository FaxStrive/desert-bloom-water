// PageHeader
//
// The compact top of a page that is a tool rather than a statement: an
// eyebrow, the route's single h1, a lede, one primary action and one
// tap-to-call link. No media, no panel, no 100svh.
//
// Added 2026-09-30. Two things forced it and neither had another answer.
// VideoHero is the only component in the library that renders an h1, so any
// route without a VideoHero had no h1 at all. And VideoHero is a statement
// hero: it stands 600px on a phone before the page has said anything, which
// is the right trade on /about or /faq and the wrong one on top of a form or
// a calculator. On the routes that carry an interactive tool, that 600px is
// most of a screen of the route's own budget spent on a picture the visitor
// did not come for, and bin/assert-page-weight.mjs reads that budget.
//
// So this is the OTHER opening: it does the one job VideoHero's h1 does and
// nothing else, in roughly a third of the height. A route carries exactly one
// of the two, never both, because a page has one h1.
//
// Props are the contract. No string, number, phone or route is written here.
//   eyebrow      the small line above the heading
//   headline     the route's single h1. Renders null without it, because a
//                page opening with no heading is not a lighter opening, it is
//                a page with no title.
//   lede         one sentence under it
//   ctaLabel     the primary action. Carries data-cta from @/lib/industry, so
//                gate 8 counts it and a dental build gets "appointment"
//                without a second copy of this file.
//   ctaHref
//   phoneLabel   the number as it should read on screen
//   phoneHref    the tel: link. Gate 8 wants one on every core route and this
//                is the only element on a tool page that reliably carries it.
//   tone         "light" (default) or "alt" for the tinted band.
//
// No font-size or weight class on the h1: globals.css sizes headings with
// clamps solved for 390 and 1440, and bin/assert-house-look.mjs measures the
// rendered page. Setting one here fails h1_size at one viewport while looking
// correct at the other.

import { CTA_ACTION } from "@/lib/industry";
import type { CSSProperties, ReactNode } from "react";
import Figure from "./Figure";

export interface PageHeaderProps {
  eyebrow?: string;
  /** A node, so a caller can close it on an italic clause (see WhySystems). A plain string is unaffected. */
  headline?: ReactNode;
  lede?: string;
  ctaLabel?: string;
  ctaHref?: string;
  phoneLabel?: string;
  phoneHref?: string;
  tone?: "light" | "alt";
  /** A photograph the page opens on, beside the words on a wide screen and above them on a phone. Added
   *  2026-10-07 (a treatment page that opened on a heading and two buttons read as a brochure). Omitted by
   *  default: a header with no picture renders exactly as it did. */
  imageSrc?: string;
  imageAlt?: string;
  /** CSS object-position for the crop. */
  imagePosition?: string;
}

export default function PageHeader({
  eyebrow,
  headline,
  lede,
  ctaLabel,
  ctaHref,
  phoneLabel,
  phoneHref,
  tone = "light",
  imageSrc,
  imageAlt,
  imagePosition,
}: PageHeaderProps) {
  if (!headline) {
    return null;
  }

  const hasCta = Boolean(ctaLabel && ctaHref);
  const hasPhone = Boolean(phoneLabel && phoneHref);

  return (
    // data-density="dense" is the whole point of the component: 0.6 of the
    // house pad, top and bottom. Keep it a minority of the sections on the
    // route, which one opening out of five or six always is.
    <section
      className={`section${tone === "alt" ? " on-alt" : ""}`}
      data-section="page-header"
      data-density="dense"
    >
      <div className={`shell${imageSrc ? " grid grid-cols-1 items-center gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-14" : ""}`}>
        {imageSrc ? (
          <div className="relative order-first h-[140px] overflow-hidden sm:h-[220px] lg:order-last lg:h-[320px]" data-header-photo="">
            <Figure
              src={imageSrc}
              alt={imageAlt ?? ""}
              fill
              sizes="(max-width: 1023px) 100vw, 45vw"
              wrapperClassName="absolute inset-0"
              wrapperStyle={{ "--figure-inset": "0px", "--image-frame": "0px" } as CSSProperties}
              aspect="free"
              priority
              style={imagePosition ? { objectPosition: imagePosition } : undefined}
            />
          </div>
        ) : null}
        <div className="max-w-3xl">
          {eyebrow ? <span className="eyebrow mb-4 block">{eyebrow}</span> : null}
          <h1>{headline}</h1>
          {lede ? <p className="lede mt-5">{lede}</p> : null}
          {hasCta || hasPhone ? (
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              {hasCta ? (
                <a href={ctaHref} className="btn btn-primary btn-sweep" data-cta={CTA_ACTION}>
                  <span>{ctaLabel}</span>
                  <span className="btn-arrow" aria-hidden="true">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="block"
                    >
                      <path d="M2 8h11" />
                      <path d="M9 4l4 4-4 4" />
                    </svg>
                  </span>
                </a>
              ) : null}
              {hasPhone ? (
                <a
                  href={phoneHref}
                  className="font-semibold"
                  style={{ color: "var(--color-accent-text)" }}
                >
                  {phoneLabel}
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
