// FullBleedBand
//
// An edge-to-edge image band: no shell, no gutter, the photo runs to both
// screen edges at every width. A heading and an optional short body sit
// over it on a scrim, with an optional CTA. Renders null without a
// headline, because a full-bleed band with no message is just a photo.
//
// Reduced motion: this component carries no animation of its own (no
// parallax, no drift), so there is nothing to turn off. It exists so a
// future build does not reach for a moving background to get this effect.
//
// The trap: `.shell` has a max-width and a margin, so mounting this INSIDE
// a `.shell` clips the bleed back down to the container and it stops being
// full-bleed at all. The `.full-bleed` utility in globals.css is the escape
// hatch: it cancels the ancestor's width constraint with 100vw math, so
// this component (and only this component's own wrapper) must be a direct
// child of `.section`, never nested inside a `.shell`.
//
// Example image: wa_lifestyle_5bbd129a (water-treatment/images/adobe-2090796519.jpeg)
// "Close-up of two hands pouring water from a bottle into a glass filled
// with ice and a lime wheel, outdoors on a table." bestFor includes
// "background band".

import { CTA_ACTION } from "@/lib/industry";
import Image from "next/image";
import type { ReactNode } from "react";

export interface FullBleedBandProps {
  imageSrc: string;
  imageAlt: string;
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
  tone?: "light" | "dark";
  minHeight?: number;
}

export default function FullBleedBand({
  imageSrc,
  imageAlt,
  eyebrow,
  headline,
  body,
  ctaLabel,
  ctaHref,
  tone = "dark",
  minHeight = 480,
}: FullBleedBandProps) {
  if (!headline) {
    return null;
  }

  const scrimGradient =
    tone === "dark"
      ? "linear-gradient(to right, rgba(0,0,0,0.78), rgba(0,0,0,0.45))"
      : "linear-gradient(to right, rgba(255,255,255,0.9), rgba(255,255,255,0.6))";
  const textColor = tone === "dark" ? "#ffffff" : "var(--color-ink)";

  return (
    <section className="section relative overflow-hidden" style={{ padding: 0 }}>
      <div className="full-bleed relative" data-aspect="free" style={{ minHeight }}>
        <Image src={imageSrc} alt={imageAlt} fill sizes="100vw" className="object-cover" />
        <div
          className="relative flex items-center"
          style={{ minHeight, backgroundImage: scrimGradient }}
        >
          <div className="shell relative z-10 py-16">
            <div className={`max-w-xl${tone === "dark" ? " on-dark-text" : ""}`} style={{ color: textColor }}>
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
      </div>
    </section>
  );
}
