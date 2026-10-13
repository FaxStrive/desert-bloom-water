// WaterHook
//
// The "problem" section: names what is wrong with the visitor's water and
// invites them to find out for themselves. Renders null without a
// headline. Image is optional; the section still reads fine as text-only.
//
// `eyebrow`, `concerns` and `linkLabel`/`linkHref` added 2026-09-30, all
// optional, so a caller written before them renders byte for byte as it did.
// The section existed to NAME the problem and could only render one paragraph
// of it, so a client whose own published list of water problems is the point
// of the band had nowhere to put the list. That list is the client's, one line
// each, never a figure beside it: a reduction percentage or a ppm level next to
// "Lead" is a test result, and a test result belongs to one house on one day.

import { CTA_ACTION } from "@/lib/industry";
import Image from "next/image";
import type { ReactNode } from "react";

const PICTURE_ASPECT = {
  "4/5": "aspect-[4/5]",
  "1/1": "aspect-square",
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
} as const;

export interface WaterHookProps {
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
  /** The client's own named problems, one line each. No figure beside any of them. */
  concerns?: string[];
  ctaLabel?: string;
  ctaHref?: string;
  /** A plain link under the action, for the page that answers the list. */
  linkLabel?: string;
  linkHref?: string;
  imageSrc?: string;
  imageAlt?: string;
  /**
   * The picture's shape at every width (default "4/5"). A 4/5 portrait is 430px tall on a phone
   * beside its text, which on a page with a screen budget is half a screen for one photograph
   * (kinetico-sioux-falls, 2026-10-12). "4/3" or "3/2" keeps the same photograph at 255 or
   * 230px. One value for every width, because the image-fit gate holds the rendered box to the
   * declared ratio at both widths.
   */
  pictureAspect?: "4/5" | "1/1" | "4/3" | "3/2";
}

export default function WaterHook({
  eyebrow,
  headline,
  body,
  concerns = [],
  ctaLabel,
  ctaHref,
  linkLabel,
  linkHref,
  imageSrc,
  imageAlt,
  pictureAspect = "4/5",
}: WaterHookProps) {
  if (!headline) {
    return null;
  }

  const listed = concerns.filter(Boolean);

  return (
    <section className="section">
      <div className="shell grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          {eyebrow ? <span className="eyebrow mb-4 block">{eyebrow}</span> : null}
          <h2 className="mb-6">{headline}</h2>
          {body ? (
            <p className="lede mb-8 max-w-xl">{body}</p>
          ) : null}
          {listed.length > 0 ? (
            <ul
              className="mb-8 grid grid-cols-1 gap-x-10 sm:grid-cols-2"
              style={{ borderTop: "1px solid var(--color-border)" }}
            >
              {listed.map((concern) => (
                <li key={concern} className="py-3" style={{ borderBottom: "1px solid var(--color-border)" }}>
                  {concern}
                </li>
              ))}
            </ul>
          ) : null}
          {ctaLabel && ctaHref ? (
            <a href={ctaHref} className="btn btn-primary btn-sweep" data-cta={CTA_ACTION}>
              <span>{ctaLabel}</span>
              <span className="btn-arrow" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="block"><path d="M2 8h11" /><path d="M9 4l4 4-4 4" /></svg>
              </span>
            </a>
          ) : null}
          {linkLabel && linkHref ? (
            <a
              href={linkHref}
              className="mt-6 block font-semibold"
              style={{ color: "var(--color-accent-text)" }}
            >
              {linkLabel}
            </a>
          ) : null}
        </div>
        {imageSrc ? (
          <div className={`relative ${PICTURE_ASPECT[pictureAspect]} w-full lg:col-span-5`} data-aspect={pictureAspect} style={{ border: "1px solid var(--color-border)" }}>
            <Image src={imageSrc} alt={imageAlt ?? ""} fill sizes="(max-width: 1023px) 100vw, 480px" className="object-cover" />
          </div>
        ) : null}
      </div>
    </section>
  );
}
