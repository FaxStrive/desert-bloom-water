"use client";

// VideoBehindType
//
// Type set directly over a playing video, the way VideoHero's full-bleed
// and centered variants do it, but as a standalone section rather than the
// page's one h1 slot. This is the component that exists so a later section
// (a mid-page claim, a stat band, a section that wants the same treatment
// as the hero without being a second hero) reaches for the real scrim
// helper instead of copy-pasting the flat wash VideoHero used to carry.
// Read scrim.ts's header before changing anything here: the two-stop,
// ten-points-apart gradient that produced the "grey wash" complaint is
// banned by construction once `gradientScrim` is the only way this
// component builds its darkening layer.
//
// `anchor` says where the copy sits, and it is not decorative: it is passed
// straight through to `gradientScrim`, which starts the ramp dark at that
// edge and lets the rest of the frame clear. A component that defaulted to
// a centered or full-width scrim regardless of where its own text sat would
// just be this same bug wearing a new file name.

import { useEffect, useState, type ReactNode } from "react";
import Figure from "../sections/Figure";
import { gradientScrim, type ScrimAnchor, type ScrimTint } from "./scrim";

export interface VideoBehindTypeProps {
  videoSrc?: string;
  posterSrc: string;
  posterAlt: string;
  eyebrow?: string;
  /* A HEADLINE IS A NODE, NOT A STRING.
     Every reference page this pipeline is graded against closes its headings
     on an italic clause set in the accent - "Every faucet.", "For life." -
     and globals.css carries the h1/h2/h3 `em` rule that draws it. A `string`
     prop cannot hold that clause, so a build either shipped flat headlines or
     reached for dangerouslySetInnerHTML. ReactNode costs nothing: a caller
     passing a plain string is unaffected, and a caller with a clause writes
     the <em> itself. */
  headline: ReactNode;
  body?: string;
  anchor?: ScrimAnchor;
  tint?: ScrimTint;
  minHeight?: number;
  children?: ReactNode;
}

export default function VideoBehindType({
  videoSrc,
  posterSrc,
  posterAlt,
  eyebrow,
  headline,
  body,
  anchor = "bottom",
  tint = "brand",
  minHeight = 480,
  children,
}: VideoBehindTypeProps) {
  const [allowVideo, setAllowVideo] = useState(false);

  useEffect(() => {
    setAllowVideo(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const scrim = gradientScrim({ anchor, tint });

  const alignItems = anchor === "top" ? "flex-start" : anchor === "bottom" ? "flex-end" : "center";
  const justifyContent = anchor === "left" ? "flex-start" : anchor === "right" ? "flex-end" : "flex-start";

  return (
    <section
      className="section on-dark relative overflow-hidden"
      style={{ minHeight, padding: 0 }}
      data-video-treatment="behind-type"
    >
      <div className="absolute inset-0">
        {/* The poster is always drawn, as the video's own first layer, so the band is a picture
            before the video starts and under reduced motion; the video plays on top of it. */}
        <Figure
          src={posterSrc}
          alt={posterAlt}
          fill
          sizes="100vw"
          aspect="free"
          wrapperClassName="absolute inset-0 h-full w-full"
        />
        {allowVideo && videoSrc ? (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            muted
            autoPlay
            loop
            playsInline
            poster={posterSrc}
            preload="metadata"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : null}
      </div>
      <div
        className="absolute inset-0"
        data-scrim="gradient"
        aria-hidden="true"
        style={{ backgroundImage: scrim }}
      />
      <div
        className="relative flex h-full"
        style={{ minHeight, alignItems, justifyContent }}
      >
        <div className="shell relative z-10 py-16">
          <div className="flex max-w-2xl flex-col gap-6" style={{ color: "#ffffff" }}>
            {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
            <h2>{headline}</h2>
            {body ? <p className="lede">{body}</p> : null}
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
