"use client";

// SeamLoop
//
// A short loop of moving water used AS the seam between two bands, in place
// of the SVG curve `Divider` draws. Divider fills the join with a flat
// colour shaped like a curve; SeamLoop fills it with a few seconds of real
// footage, masked top and bottom by the same curve shapes Divider already
// knows how to draw, so the water reads as carrying one section's tone into
// the next rather than as an unrelated clip dropped between them.
//
// This is deliberately a shallow STRIP, not a section: `heightPx` defaults
// to 180, which is short enough on a 1440-wide render to stay a seam and
// not accidentally become a second VideoBand. If a build wants a full-height
// video band, that component already exists; reaching for SeamLoop and
// stretching it tall is the wrong tool for that job.
//
// The mask is a single inline SVG `<mask>` holding one path (see REVEAL_PATH
// below, drawn in the same quadratic curve family Divider uses for its
// "curved" shape, see CurvedEdge.tsx's underlying Divider component), not a
// CSS `mask-image: linear-gradient(...)`. A gradient mask can only fade,
// never carve a genuine curved edge; a curve needs a path, which is exactly
// what an SVG mask is for. `bin/assert-no-flat-scrim.mjs` does not apply
// here (a mask that reveals video is not a scrim that darkens one), but this
// file still carries `data-scrim="crop"` on the wrapper, because a curved
// mask that reveals only part of the frame is exactly the "crop" strategy
// the shape vocabulary names: contrast, and shape, earned by what the frame
// already shows rather than by a layer painted over it.
//
// `toneFrom` and `toneTo` tint the two curved caps (the sliver of solid
// colour above and below the masked video) so the strip visually hands off
// from the section above's surface colour to the section below's, the same
// job Divider's own `into` prop does for a flat edge.

import { useEffect, useId, useState } from "react";
import Figure from "../sections/Figure";

export interface SeamLoopProps {
  videoSrc?: string;
  posterSrc: string;
  posterAlt: string;
  heightPx?: number;
  /** Surface colour token (e.g. "var(--color-surface)") of the section above. */
  toneFrom?: string;
  /** Surface colour token of the section below. */
  toneTo?: string;
}

// Same curve family as Divider's "curved" shape (a single quadratic bump),
// used as both the top and bottom edge of the reveal path below (in
// objectBoundingBox 0-1 space, matching ShapedVideo's clipPath convention):
// concave at the top, convex at the bottom, so the masked video reads as
// water rising out of one curve and settling into the next rather than a
// rectangle with rounded corners.
const REVEAL_PATH =
  "M0 0.22 C0.5 0 1 0 1 0.22 L1 0.78 C0.5 1 0 1 0 0.78 Z";

export default function SeamLoop({
  videoSrc,
  posterSrc,
  posterAlt,
  heightPx = 180,
  toneFrom = "var(--color-surface)",
  toneTo = "var(--color-surface-alt)",
}: SeamLoopProps) {
  const [allowVideo, setAllowVideo] = useState(false);
  const rawId = useId();
  const maskId = `seam-loop-mask-${rawId.replace(/[^a-zA-Z0-9]/g, "")}`;

  useEffect(() => {
    setAllowVideo(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <div
      className="full-bleed relative overflow-hidden"
      data-video-treatment="seam"
      data-scrim="crop"
      aria-hidden="true"
      style={{ height: heightPx }}
    >
      <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
        <defs>
          <mask id={maskId} maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox">
            <path d={REVEAL_PATH} fill="#ffffff" />
          </mask>
        </defs>
      </svg>
      <div className="absolute inset-0" style={{ backgroundColor: toneFrom }} />
      <div className="absolute inset-0" style={{ backgroundColor: toneTo, clipPath: "inset(50% 0 0 0)" }} />
      <div className="absolute inset-0" style={{ mask: `url(#${maskId})`, WebkitMask: `url(#${maskId})` }}>
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
        ) : (
          <Figure
            src={posterSrc}
            alt={posterAlt}
            fill
            sizes="100vw"
            aspect="free"
            wrapperClassName="absolute inset-0 h-full w-full"
          />
        )}
      </div>
    </div>
  );
}
