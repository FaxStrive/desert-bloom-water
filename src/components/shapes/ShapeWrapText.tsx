// ShapeWrapText
//
// Body copy that wraps around a circle or an arch, via CSS `shape-outside`
// on a floated figure, instead of wrapping around the figure's rectangular
// bounding box the way every other image-plus-text layout in this codebase
// does. clean-minimal and creative-experimental use this where a single
// paragraph needs to read as hugging a photograph rather than sitting next
// to it in a column.
//
// The float is load-bearing, `shape-outside` is the enhancement: this is a
// plain CSS float layout first (the image floats left or right, the
// paragraph's lines wrap around whatever box the image occupies), and
// `shape-outside` on top of that tells a supporting browser to wrap the
// text against the true silhouette of a circle or an arch instead of the
// float's rectangular box. A browser that does not support shape-outside
// (there is essentially none left, but the rule stands for any future
// engine that drops it, and for print or reader-mode stylesheets that
// strip it) simply keeps the float and wraps against the rectangle - the
// text stays readable, just not hugging a curve. That is rule 10 of the
// shape contract: degrade to a normal text block, never to broken layout.
// There is no JS fallback needed because there is no JS involved at all.
//
// `shape` picks the silhouette: "circle" sets both the float's border-radius
// (visual) and shape-outside: circle(50%) (wrap geometry) to the same
// curve, so what the eye sees matches what the text wraps against. "arch"
// reuses ArchMedia's round-arch border-radius for the visual and pairs it
// with an inset() shape-outside approximation, because shape-outside has no
// native "rounded-top rectangle" primitive - inset() with a border-radius
// argument is the documented way to wrap text around a shape that is
// mostly a box with one curved edge, and it is accurate enough that the
// wrap line will not visibly diverge from the arch's own curve.
//
// The trap: `shape-margin` is not optional decoration here, it is what
// stops the wrapped text from touching the curve's edge at its narrowest
// point (the very top of a circle, where the available line width would
// otherwise shrink to almost nothing and produce a single-character line
// that looks like a bug). Removing `shape-margin` "to tighten the layout"
// reintroduces exactly that.
//
// NO PICTURE IS A LEGAL STATE. `imageSrc` is optional, as it already is on
// Bleed: the asset layer hands a build an EMPTY slot when nothing honest fits.
// With no picture there is no silhouette to wrap against, so the copy renders
// as plain paragraphs in the same padded band and the section does NOT claim
// data-shape="shape-wrap-text". A shape census counts shapes that were drawn.
//
// Reduced motion: static layout, nothing animates.

import type { CSSProperties } from "react";
import type { ReactNode } from "react";
import Figure from "../sections/Figure";
import PortraitStage from "./PortraitStage";

export interface ShapeWrapTextProps {
  /** Omitted when the asset layer left this slot empty. See the header. */
  imageSrc?: string;
  imageAlt?: string;
  shape?: "circle" | "arch";
  float?: "left" | "right";
  figureWidth?: number;
  /** Draw the figure as a PortraitStage: the photo is `portrait` px (never enlarged) on a larger brand disc and
   *  ring, and the text wraps the disc. `figureWidth` is then the stage's width. Circle only. Off by default. */
  stage?: boolean;
  /** The photo's drawn width inside the stage, px. Default 220. Keep it at or under the file's own width. */
  portrait?: number;
  /** CSS object-position for the picture in the figure; see CircleMedia. */
  imagePosition?: string;
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
  /** One or more paragraphs, rendered in order, wrapping around the figure. */
  paragraphs: string[];
  tone?: "light" | "alt";
  children?: ReactNode;
}

export default function ShapeWrapText({
  imageSrc,
  imageAlt,
  shape = "circle",
  float = "left",
  figureWidth = 288,
  stage = false,
  portrait = 220,
  imagePosition,
  eyebrow,
  headline,
  paragraphs,
  tone = "light",
  children,
}: ShapeWrapTextProps) {
  if (!paragraphs || paragraphs.length === 0) {
    return null;
  }

  const toneClass = tone === "alt" ? " on-alt" : "";

  if (!imageSrc) {
    return (
      <section className={`section${toneClass}`}>
        <div className="shell max-w-3xl">
          {eyebrow ? <span className="eyebrow mb-4 block">{eyebrow}</span> : null}
          {headline ? <h2 className="mb-6">{headline}</h2> : null}
          {paragraphs.map((paragraph, index) => (
            <p key={index} className={index === 0 ? "lede" : "mt-4"}>
              {paragraph}
            </p>
          ))}
          {children}
        </div>
      </section>
    );
  }

  // On a phone a 320px figure left no room for the words to wrap beside it, so the figure and the
  // text simply stacked (755px for 332 characters at 390). 40vw is 156px there and figureWidth from
  // 800px up, so the circle still carries the wrap on a phone. Added 2026-10-02.
  const phoneWidth = `min(${figureWidth}px, max(120px, 40vw))`;
  const margin = float === "left" ? { marginRight: 32, marginBottom: 16 } : { marginLeft: 32, marginBottom: 16 };

  const figureStyle =
    shape === "circle"
      ? { float, width: phoneWidth, borderRadius: "50%", overflow: "hidden" as const, shapeOutside: "circle(50%)", shapeMargin: "24px", ...margin }
      : {
          float,
          width: phoneWidth,
          borderRadius: "50% 50% 0 0",
          overflow: "hidden" as const,
          shapeOutside: "inset(0 round 50% 50% 0 0)",
          shapeMargin: "24px",
          ...margin,
        };

  return (
    <section className={`section${toneClass}`} data-shape="shape-wrap-text" data-wrap-shape={shape}>
      <div className="shell max-w-5xl">
        {eyebrow ? <span className="eyebrow mb-4 block">{eyebrow}</span> : null}
        {headline ? <h2 className="mb-6">{headline}</h2> : null}
        <div>
          <div
            className={
              stage && shape === "circle"
                ? `mx-auto mb-4 w-[min(240px,64vw)] sm:w-[var(--stage-w)] ${float === "left" ? "sm:float-left sm:mr-8" : "sm:float-right sm:ml-8"}`
                : undefined
            }
            style={
              stage && shape === "circle"
                ? ({ "--stage-w": `${figureWidth}px`, shapeOutside: "circle(50%)", shapeMargin: "24px" } as CSSProperties)
                : figureStyle
            }
          >
            {stage && shape === "circle" ? (
              <PortraitStage src={imageSrc} alt={imageAlt ?? ""} size={figureWidth} portrait={portrait} position={imagePosition} />
            ) : (
            <Figure src={imageSrc} alt={imageAlt ?? ""} fill sizes={`(max-width: 640px) 40vw, ${figureWidth}px`} wrapperClassName="relative w-full" aspect="1/1" wrapperStyle={{ "--figure-inset": "0px", "--image-frame": "0px" } as CSSProperties} style={imagePosition ? { objectPosition: imagePosition } : undefined} />
            )}
          </div>
          {paragraphs.map((paragraph, index) => (
            <p key={index} className={index === 0 ? "lede" : "mt-4"}>
              {paragraph}
            </p>
          ))}
          {children}
          <div style={{ clear: "both" }} />
        </div>
      </div>
    </section>
  );
}
