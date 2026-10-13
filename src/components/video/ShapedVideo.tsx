"use client";

// ShapedVideo
//
// Video (or its poster, under reduced motion) held inside a real shape:
// an arch, a circle, or a named blob, matching the primitives the shape
// vocabulary already promises for photographs (`ArchMedia`, `CircleMedia`,
// `BlobMedia` in composition/shape-vocabulary.md). A video in a rectangle,
// even a nicely cropped one, is still a rectangle; this component is what
// makes a moving clip sit in the same shape family the rest of the page's
// photography already commits to, rather than being the one element on the
// page that stays boxy because it happens to be the hard one.
//
// The clip-path is applied to the OUTER wrapper, never to the <video>
// element directly. A `<video>` with its own border-radius or clip-path
// still paints a rectangular hit-test region and, on some engines, a
// rectangular focus ring; clipping the wrapper instead means every child
// (the video, its poster fallback, any caption) is cut by the same shape
// with no seam between them.
//
// The shape is an inline SVG <clipPath> referenced by `url(#id)`, not a CSS
// `path()` function. `clip-path: path("M0 100 ...")` looks like it should
// work with a 0-100 path and scale to any box, but CSS path() coordinates
// are plain pixels in the element's own box, not a viewBox: a path drawn in
// 0-100 space clips a 100x96px sliver in the corner of a 400px-tall card and
// leaves the rest of the video showing through unclipped, which is a worse
// bug than the flat scrim this file's sibling exists to fix, because it is
// invisible until someone resizes the viewport past 100px. An SVG
// `<clipPath clipPathUnits="objectBoundingBox">` interprets its path in 0-1
// space relative to the clipped element's own bounding box, which is the
// actual "draw once, scale anywhere" behaviour every caller here wants.
// Each instance gets its own id via `useId` so two ShapedVideo components on
// one page never collide on the same clip-path id.
//
// The blob shape is picked from a small, NAMED set (`blobVariant`), never
// generated or randomised per render. composition/shape-vocabulary.md is
// explicit about this: "The shape is CHOSEN from a named set, never
// randomised, so two runs of the same build agree." A randomised blob would
// make two renders of the same page disagree with each other, which breaks
// visual regression review and makes "does this look right" a moving
// target.
//
// Reduced motion: the <video> element itself never mounts when the visitor
// has asked for reduced motion. This is the same test VideoHero already
// runs (window.matchMedia("(prefers-reduced-motion: reduce)")), duplicated
// here rather than shared, because this component has no dependency on
// VideoHero and should not gain one just to save four lines.

import { useEffect, useId, useState, type CSSProperties } from "react";
import Figure from "../sections/Figure";

export type ShapedVideoShape = "arch" | "circle" | "blob";
export type ShapedVideoBlobVariant = "drop" | "wave" | "pebble";

export interface ShapedVideoProps {
  shape: ShapedVideoShape;
  videoSrc?: string;
  posterSrc: string;
  posterAlt: string;
  /** Required when shape is "blob". Picks which named blob outline to clip to. */
  blobVariant?: ShapedVideoBlobVariant;
  /** "w/h" ratio the shape is drawn against, e.g. "1/1", "4/5". Circle defaults to "1/1". */
  aspect?: string;
  className?: string;
}

// Blob outlines as SVG path data in objectBoundingBox space (0 to 1 on both
// axes), matched to a <clipPath clipPathUnits="objectBoundingBox"> below.
// Three variants, named per the vocabulary's own rule against randomising a
// shape choice, each hand-eyeballed to stay within 0..1 with a touch of
// overshoot smoothed back in, never a coordinate outside the box.
const BLOB_PATHS: Record<ShapedVideoBlobVariant, string> = {
  drop:
    "M0.50 0.02C0.72 0.02 0.92 0.20 0.96 0.44C0.99 0.62 0.90 0.78 0.72 0.88C0.56 0.97 0.34 0.98 0.18 0.86C0.04 0.76 0.01 0.56 0.05 0.38C0.10 0.16 0.28 0.02 0.50 0.02Z",
  wave:
    "M0.20 0.06C0.42 -0.04 0.70 0.02 0.86 0.18C1.00 0.32 1.00 0.54 0.90 0.70C0.80 0.86 0.58 0.96 0.38 0.92C0.18 0.88 0.02 0.72 0.01 0.52C0.00 0.34 0.04 0.14 0.20 0.06Z",
  pebble:
    "M0.38 0.03C0.58 -0.02 0.82 0.10 0.92 0.30C1.02 0.50 0.96 0.74 0.78 0.86C0.60 0.98 0.34 0.98 0.16 0.84C-0.02 0.70 -0.04 0.44 0.08 0.26C0.16 0.14 0.24 0.07 0.38 0.03Z",
};

const ARCH_PATH = "M0 1 L0 0.34 C0 0.15 0.22 0 0.50 0 C0.78 0 1 0.15 1 0.34 L1 1 Z";

function pathDataFor(shape: ShapedVideoShape, blobVariant: ShapedVideoBlobVariant | undefined): string | null {
  if (shape === "circle") {
    return null;
  }
  if (shape === "arch") {
    return ARCH_PATH;
  }
  const variant = blobVariant ?? "drop";
  return BLOB_PATHS[variant];
}

export default function ShapedVideo({
  shape,
  videoSrc,
  posterSrc,
  posterAlt,
  blobVariant,
  aspect,
  className,
}: ShapedVideoProps) {
  const [allowVideo, setAllowVideo] = useState(false);
  const rawId = useId();
  const clipId = `shaped-video-clip-${rawId.replace(/[^a-zA-Z0-9]/g, "")}`;

  useEffect(() => {
    setAllowVideo(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const resolvedAspect = aspect ?? (shape === "circle" ? "1/1" : "4/5");
  const pathData = pathDataFor(shape, blobVariant);

  // Circle is left to CSS: clip-path: circle(50%) already scales correctly
  // to any box because circle()'s radius accepts a percentage natively.
  // Arch and blob need the SVG clipPath below because CSS path() does not
  // scale (see the header comment).
  const wrapperStyle: CSSProperties = pathData
    ? { clipPath: `url(#${clipId})`, WebkitClipPath: `url(#${clipId})` }
    : { clipPath: "circle(50% at 50% 50%)", WebkitClipPath: "circle(50% at 50% 50%)" };

  return (
    <div
      className={`relative overflow-hidden${className ? ` ${className}` : ""}`}
      data-video-treatment="shaped"
      data-shape={shape}
      data-blob-variant={shape === "blob" ? (blobVariant ?? "drop") : undefined}
      style={{ aspectRatio: resolvedAspect, ...wrapperStyle }}
    >
      {pathData ? (
        <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
          <defs>
            <clipPath id={clipId} clipPathUnits="objectBoundingBox">
              <path d={pathData} />
            </clipPath>
          </defs>
        </svg>
      ) : null}
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
          sizes="(min-width: 1024px) 50vw, 100vw"
          aspect="free"
          wrapperClassName="absolute inset-0 h-full w-full"
        />
      )}
    </div>
  );
}
