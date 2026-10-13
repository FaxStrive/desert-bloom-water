"use client";

// VideoBand
//
// A full-bleed video running the width of the page as a band BETWEEN two
// sections, not inside either one: a few seconds of the plant floor, the
// install crew, the water itself, given room to be the whole story for one
// scroll-length rather than shrunk into a card. `FullBleedBand.tsx` is the
// still-photo version of this idea and this component deliberately mirrors
// its structure (no shell, no gutter, a `.full-bleed` wrapper as a DIRECT
// child of `.section`) so the two read as siblings, not as two unrelated
// ways of doing edge-to-edge media.
//
// The caption, when one is given, sits on a PANEL: a solid card floating
// over one edge of the band, not a scrim wash covering the video. This is
// the "panel" strategy from composition/shape-vocabulary.md's contrast
// section ("type on a solid panel BESIDE the image rather than over it"),
// picked deliberately for this component because a moving image is a worse
// place to darken-and-read text over than a still one: a scrim that reads
// fine on a static frame will visibly breathe and shift as the video plays
// underneath it, which is motion the caption did not ask for. A panel gives
// the caption a fixed, legible surface and leaves the entire video
// undimmed, which is also more honest to what a video band is for: showing
// motion, not carrying type.
//
// A DISCLAIMER IS A CREDIT, NOT A CAPTION (2026-10-02). The first
// usa-filtration-group-gen home carried a white card over a near black band
// that said only "Reference footage, not an install." It was honest and it
// read as a stray box: a panel is a statement about the footage, and a line
// that only says what the footage is not belongs in the corner as a credit.
// So there are two slots. `caption` is the panel and is for a statement worth
// a card. `credit` is a small tag in the band's lower corner, for the honesty
// line. A `caption` that is only a disclaimer ("reference footage", "not an
// install", "stock image") is routed to the credit tag by this component, so
// a build cannot put one on a card by writing it into the wrong prop.
//
// The trap this file exists to avoid: mounting the `.full-bleed` wrapper
// inside a `.shell` clips it back down to the container's max-width and the
// band silently stops being a band. See FullBleedBand.tsx's own note on
// this; the same physics apply here since this uses the identical utility.

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Figure from "../sections/Figure";

export interface VideoBandProps {
  videoSrc?: string;
  posterSrc: string;
  posterAlt: string;
  minHeight?: number;
  caption?: string;
  captionEyebrow?: string;
  /** Which edge of the band the caption panel sits on. Defaults to "left". */
  captionSide?: "left" | "right";
  /** A small tag in the lower corner opposite the caption: what the footage is. */
  credit?: string;
  /** The band's minimum height on a phone, px. Defaults to `minHeight`. A band that is 420px tall on a
   *  wide screen can be 240px on a phone and still be a band. Added 2026-10-07. */
  minHeightPhone?: number;
  /** CSS object-position for the poster and the clip, so a face stays in the crop. */
  position?: string;
}

/** A caption that only says what the footage is not. It is a credit, never a card. */
const DISCLAIMER = /\b(reference|illustrative|stock|sample)\s+(footage|image|images|scene|scenes|photo|photos|clip)\b|\bnot an?\s+(install|installation|job)\b/i;

export default function VideoBand({
  videoSrc,
  posterSrc,
  posterAlt,
  minHeight = 420,
  minHeightPhone,
  position,
  caption,
  captionEyebrow,
  captionSide = "left",
  credit,
}: VideoBandProps) {
  const [allowVideo, setAllowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const captionIsDisclaimer = Boolean(caption && DISCLAIMER.test(caption));
  const panelCaption = captionIsDisclaimer ? undefined : caption;
  const creditText = credit ?? (captionIsDisclaimer ? caption : undefined);

  useEffect(() => {
    setAllowVideo(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <section className="section relative overflow-hidden" style={{ padding: 0 }} data-video-treatment="band">
      <div
        className="full-bleed relative min-h-[var(--vb-min-phone)] sm:min-h-[var(--vb-min)]"
        data-aspect="free"
        style={{ "--vb-min": `${minHeight}px`, "--vb-min-phone": `${minHeightPhone ?? minHeight}px` } as CSSProperties}
      >
        {allowVideo && videoSrc ? (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            muted
            autoPlay
            loop
            playsInline
            poster={posterSrc}
            preload="metadata"
            style={position ? { objectPosition: position } : undefined}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          <Figure
            src={posterSrc}
            alt={posterAlt}
            fill
            sizes="100vw"
            aspect="free"
            wrapperClassName="absolute inset-0 h-full w-full"
            style={position ? { objectPosition: position } : undefined}
          />
        )}
        {creditText ? (
          <span
            className={`absolute bottom-3 z-10 px-3 py-1 text-sm ${panelCaption && captionSide === "right" ? "left-3" : "right-3"}`}
            data-band-credit=""
            style={{ backgroundColor: "var(--color-surface-deep)", color: "#FFFFFF" }}
          >
            {creditText}
          </span>
        ) : null}
      </div>
      {panelCaption ? (
        // A card over the footage from 640px up; on a phone a card over a 240px clip would cover it, so it
        // sits under the clip as an ordinary block. Positioned against the section, which is as tall as the clip.
        <div
          className={`relative z-10 p-5 sm:absolute sm:bottom-8 sm:max-w-sm sm:p-6 ${captionSide === "left" ? "sm:left-8" : "sm:right-8"}`}
          data-scrim="panel"
          style={{
            backgroundColor: "var(--color-surface)",
            color: "var(--color-ink)",
            borderRadius: "var(--radius-media)",
          }}
        >
          {captionEyebrow ? <span className="eyebrow mb-2 block">{captionEyebrow}</span> : null}
          <p className="lede" style={{ margin: 0 }}>{panelCaption}</p>
        </div>
      ) : null}
    </section>
  );
}
