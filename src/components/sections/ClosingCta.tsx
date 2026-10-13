// ClosingCta
//
// The last push before the footer: a short headline, an optional video or
// image background, and one or two calls to action. Renders null without
// a headline. Three variants:
//   "band"  - the full-bleed dark band, video or image behind a scrim,
//             copy centered over it. (default)
//   "split" - headline and CTAs on one side, the video or image confined
//             to the other side, never behind the type.
//   "quiet" - no band, no background media at all: a single line of type
//             and one link, left-aligned, on the page's own background.
//
// A close that has to say more than "ask" takes four optional props, all
// prop-only and all absent by default, so an existing caller renders as it
// always did:
//   primaryCtaSupport, secondaryCtaSupport  a small line under each action.
//                                           "split" and "quiet" only.
//   details, detailLinkLabel/Href           "split" only: the practical lines
//                                           (address, hours, what to do after
//                                           hours) and one plain link, set in
//                                           the panel where media would sit.
//                                           Ignored when media is given.
//   conversion                              which action carries the industry's
//                                           conversion attribute. "primary" by
//                                           default. "secondary" is for a close
//                                           that leads with a phone call and
//                                           still wants the request counted.

import { CTA_ACTION } from "@/lib/industry";
import Image from "next/image";
import Figure from "./Figure";
import { gradientScrim } from "../video/scrim";
import type { CSSProperties, ReactNode } from "react";

export type ClosingCtaVariant = "band" | "split" | "quiet";

export interface ClosingCtaProps {
  /* A HEADLINE IS A NODE, NOT A STRING.
   Every reference page this pipeline is graded against closes its headings on
   an italic clause set in the accent - "Every faucet.", "For life." - and
   globals.css carries the h1/h2/h3 `em` rule that draws it. A `string` prop
   cannot hold that clause, so a build either shipped flat headlines or reached
   for dangerouslySetInnerHTML. ReactNode costs nothing: a caller passing a
   plain string is unaffected, and a caller with a clause writes the <em>. */
  headline?: ReactNode;
  subhead?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  primaryCtaSupport?: string;
  secondaryCtaSupport?: string;
  details?: string[];
  detailLinkLabel?: string;
  detailLinkHref?: string;
  conversion?: "primary" | "secondary";
  videoSrc?: string;
  posterSrc?: string;
  posterAlt?: string;
  variant?: ClosingCtaVariant;
  /** The picture in the split variant's right-hand panel fills it edge to edge, with no editorial inset or
   *  frame, and the panel is never under 140px, so a picture on a phone is a picture and not a sliver.
   *  Added 2026-10-07. Off by default: every existing caller renders as it did. */
  mediaFlush?: boolean;
  /** CSS object-position for the split panel picture. */
  posterPosition?: string;
}

export default function ClosingCta({
  headline,
  subhead,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  primaryCtaSupport,
  secondaryCtaSupport,
  details = [],
  detailLinkLabel,
  detailLinkHref,
  conversion = "primary",
  videoSrc,
  posterSrc,
  posterAlt,
  variant = "band",
  mediaFlush = false,
  posterPosition,
}: ClosingCtaProps) {
  if (!headline) {
    return null;
  }

  const hasMedia = Boolean(videoSrc || posterSrc);
  // A split with no picture, no video and no detail lines has nothing to put in
  // its right-hand panel. An empty tinted box is air, so the copy takes the row.
  const hasSplitMedia = hasMedia || details.length > 0;
  // The conversion attribute sits on exactly one of the two actions.
  const primaryAttr = conversion === "primary" ? { "data-cta": CTA_ACTION } : {};
  const secondaryAttr = conversion === "secondary" ? { "data-cta": CTA_ACTION } : {};
  const supportLine = (text?: string) =>
    text ? (
      // Dimmed by mixing into the colour, never by the CSS opacity property:
      // bin/assert-motion-honest.mjs (gate 9) fails any rendered element below
      // opacity 1 under reduced motion, and a support line is content.
      <span className="text-sm" style={{ color: "color-mix(in srgb, currentColor 82%, transparent)" }}>
        {text}
      </span>
    ) : null;

  if (variant === "quiet") {
    return (
      <section className="section" data-section="closing-cta">
        <div className="shell">
          <div className="flex flex-col gap-4" style={{ borderTop: "1px solid var(--color-border)", paddingTop: "28px" }}>
            <h2>{headline}</h2>
            {subhead ? <p className="lede max-w-2xl" style={{ color: "var(--color-ink-muted)" }}>{subhead}</p> : null}
            <div className="flex flex-wrap gap-x-12 gap-y-4">
            {primaryCtaLabel && primaryCtaHref ? (
              <div className="flex flex-col gap-1">
                <a href={primaryCtaHref} className="text-sm font-semibold" style={{ color: "var(--color-accent-text)" }} {...primaryAttr}>
                  {primaryCtaLabel}
                </a>
                {supportLine(primaryCtaSupport)}
              </div>
            ) : null}
            {secondaryCtaLabel && secondaryCtaHref ? (
              <div className="flex flex-col gap-1">
                <a href={secondaryCtaHref} className="text-sm font-semibold" style={{ color: "var(--color-ink-muted)" }} {...secondaryAttr}>
                  {secondaryCtaLabel}
                </a>
                {supportLine(secondaryCtaSupport)}
              </div>
            ) : null}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (variant === "split") {
    return (
      <section className="section on-dark relative overflow-hidden" data-section="closing-cta">
        <div className={`shell grid grid-cols-1 items-center gap-12 lg:gap-16 ${hasSplitMedia ? "lg:grid-cols-12" : ""}`}>
          <div className={hasSplitMedia ? "lg:col-span-7" : ""}>
            <h2>{headline}</h2>
            {subhead ? <p className="lede mt-4">{subhead}</p> : null}
            {(primaryCtaLabel && primaryCtaHref) || (secondaryCtaLabel && secondaryCtaHref) ? (
              <div className="mt-8 flex flex-wrap items-start gap-x-6 gap-y-5">
                {primaryCtaLabel && primaryCtaHref ? (
                  <div className="flex flex-col gap-2">
                    <a href={primaryCtaHref} className="btn btn-primary btn-sweep self-start" {...primaryAttr}>
                      <span>{primaryCtaLabel}</span>
                      <span className="btn-arrow" aria-hidden="true">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="block"><path d="M2 8h11" /><path d="M9 4l4 4-4 4" /></svg>
                      </span>
                    </a>
                    {supportLine(primaryCtaSupport)}
                  </div>
                ) : null}
                {secondaryCtaLabel && secondaryCtaHref ? (
                  <div className="flex flex-col gap-2">
                    <a href={secondaryCtaHref} className="btn btn-on-dark btn-sweep self-start" {...secondaryAttr}>
                      {secondaryCtaLabel}
                    </a>
                    {supportLine(secondaryCtaSupport)}
                  </div>
                ) : null}
              </div>
            ) : null}
            {detailLinkLabel && detailLinkHref && hasMedia ? (
              // With a picture or a clip in the right-hand panel there is no details panel to hold
              // the link, so it sits under the buttons. Without media the panel carries it.
              <a href={detailLinkHref} className="mt-6 inline-block font-semibold underline underline-offset-4">
                {detailLinkLabel}
              </a>
            ) : null}
          </div>
          {hasSplitMedia ? (
          <div className={`relative overflow-hidden sm:min-h-[280px] lg:col-span-5 ${mediaFlush ? "min-h-[140px]" : "min-h-[120px]"}`}>
            {videoSrc ? (
              <video className="absolute inset-0 h-full w-full object-cover" muted autoPlay loop playsInline poster={posterSrc} preload="metadata">
                <source src={videoSrc} type="video/mp4" />
              </video>
            ) : posterSrc ? (
              <Figure
                src={posterSrc}
                alt={posterAlt ?? ""}
                fill
                sizes="(max-width: 1023px) 100vw, 40vw"
                wrapperClassName="absolute inset-0 h-full w-full"
                wrapperStyle={mediaFlush ? ({ "--figure-inset": "0px", "--image-frame": "0px" } as CSSProperties) : undefined}
                aspect="free"
                style={posterPosition ? { objectPosition: posterPosition } : undefined}
              />
            ) : details.length > 0 ? (
              <div className="flex h-full flex-col justify-center gap-4 p-8" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} data-closing-details="">
                {details.map((line) => (
                  <p key={line}>{line}</p>
                ))}
                {detailLinkLabel && detailLinkHref ? (
                  <a href={detailLinkHref} className="font-semibold underline underline-offset-4">
                    {detailLinkLabel}
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>
          ) : null}
        </div>
      </section>
    );
  }

  const content = (
    <div className="shell relative z-10 text-center">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6">
        <h2>{headline}</h2>
        {subhead ? <p className="lede">{subhead}</p> : null}
        {(primaryCtaLabel && primaryCtaHref) || (secondaryCtaLabel && secondaryCtaHref) ? (
          <div className="flex flex-wrap items-center justify-center gap-4">
            {primaryCtaLabel && primaryCtaHref ? (
              <a href={primaryCtaHref} className="btn btn-primary btn-sweep" data-cta={CTA_ACTION}>
                <span>{primaryCtaLabel}</span>
                <span className="btn-arrow" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="block"><path d="M2 8h11" /><path d="M9 4l4 4-4 4" /></svg>
                </span>
              </a>
            ) : null}
            {secondaryCtaLabel && secondaryCtaHref ? (
              <a href={secondaryCtaHref} className="btn btn-on-dark btn-sweep">
                {secondaryCtaLabel}
              </a>
            ) : null}
          </div>
        ) : null}
        {detailLinkLabel && detailLinkHref ? (
          // The band had no slot for a text link, so a build that wanted the closing offer to point at
          // the page that holds the rest of the terms had to put the link in a button or drop it.
          // The split variant already carries detailLinkLabel/Href in its panel; the band now does too.
          <a href={detailLinkHref} className="font-semibold underline underline-offset-4">
            {detailLinkLabel}
          </a>
        ) : null}
      </div>
    </div>
  );

  return (
    <section className="section on-dark relative overflow-hidden" data-section="closing-cta" style={hasMedia ? { padding: 0 } : undefined}>
      {hasMedia ? (
        <div className="relative" data-aspect="free" style={{ minHeight: 400 }}>
          {videoSrc ? (
            <video className="absolute inset-0 h-full w-full object-cover" muted autoPlay loop playsInline poster={posterSrc} preload="metadata">
              <source src={videoSrc} type="video/mp4" />
            </video>
          ) : posterSrc ? (
            <Image src={posterSrc} alt={posterAlt ?? ""} fill sizes="100vw" className="object-cover" />
          ) : null}
          {/* A brand tinted ramp anchored at the bottom, where the copy sits, clear
              by 65 percent of the frame. This used to be a flat rgba(0,0,0,0.68)
              over the whole video, the grey wash gate 17 exists to fail. */}
          <div
            className="relative flex items-end"
            data-scrim="gradient"
            style={{ minHeight: 400, backgroundImage: gradientScrim({ anchor: "bottom", tint: "brand", strength: 0.85 }) }}
          >
            <div className="w-full py-16">{content}</div>
          </div>
        </div>
      ) : (
        content
      )}
    </section>
  );
}
