// PortraitStage
//
// A small portrait given a large composition. Added 2026-10-07 for the dental
// build: the practice supplies six portraits at 220 by 330 and nothing bigger,
// and a 220px circle in a 1200px band reads as a thumbnail. The portrait stays
// at its real size, never enlarged; the stage around it is what grows. A pale
// brand disc fills the box, a ring in the brand colour sits offset behind the
// face, a small solid brand disc balances them, and the portrait circle
// overlaps the lot at the lower right.
//
// The geometry is all percent of the stage, so the stage can shrink on a phone
// and the portrait shrinks with it (smaller than its source, never larger).
// `portrait` and `size` are the real pixel figures: portrait / size is the
// share of the stage the face takes, and the stage's own width is capped at
// `size`, so at full size the portrait is drawn at exactly `portrait` px.
//
// The picture is a face: the crop is object-position, anchored near the top by
// default, so the head stays in the circle (see CircleMedia imagePosition).
//
// Nothing here animates. The wrapper claims no data-shape: the caller
// (CircleMedia, ShapeWrapText) already does, once.
//
// Props: src, alt, size, portrait, position.

import type { CSSProperties } from "react";
import Figure from "../sections/Figure";

export interface PortraitStageProps {
  src: string;
  alt?: string;
  /** The stage's width at full size, px. */
  size?: number;
  /** The portrait's drawn width at full size, px. Keep it at or under the file's own width. */
  portrait?: number;
  /** CSS object-position for the face. Default keeps the head. */
  position?: string;
}

export default function PortraitStage({ src, alt = "", size = 340, portrait = 220, position = "50% 10%" }: PortraitStageProps) {
  const share = Math.min(0.8, portrait / size);
  const pct = (n: number) => `${Math.round(n * 1000) / 10}%`;

  return (
    <div
      data-portrait-stage=""
      className="relative mx-auto w-full"
      style={{ maxWidth: `min(${size}px, max(240px, 64vw))`, aspectRatio: "1 / 1" }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: "color-mix(in srgb, var(--color-accent-fill) 12%, var(--color-surface))" }}
      />
      <div
        aria-hidden="true"
        className="absolute rounded-full"
        style={{ left: "2%", top: "2%", width: pct(0.74), aspectRatio: "1 / 1", border: "2px solid var(--color-accent-fill)" }}
      />
      <div
        aria-hidden="true"
        className="absolute rounded-full"
        style={{ left: "10%", bottom: "9%", width: pct(0.13), aspectRatio: "1 / 1", backgroundColor: "var(--color-accent-fill)" }}
      />
      <div
        className="absolute overflow-hidden rounded-full"
        style={{ right: "3%", bottom: "3%", width: pct(share) }}
      >
        <Figure
          src={src}
          alt={alt}
          fill
          sizes={`(max-width: 640px) 60vw, ${portrait}px`}
          wrapperClassName="relative w-full"
          aspect="1/1"
          wrapperStyle={{ "--figure-inset": "0px", "--image-frame": "0px" } as CSSProperties}
          style={{ objectPosition: position }}
        />
      </div>
    </div>
  );
}
