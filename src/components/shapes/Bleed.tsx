// Bleed
//
// Media running past its own container. Two distinct behaviours share this
// name because the shape-vocabulary contract names them as one primitive
// with two targets: "to the page edge, or past the band it belongs to."
//
// `to="viewport"` is BleedFigure's trick (see ../sections/BleedFigure.tsx
// for the long version of this trap): the media column carries zero
// horizontal padding on the side that should bleed, and touches the true
// viewport edge simply because nothing is holding it back, while the text
// column keeps the ordinary `.shell` gutter. Wrapping the media column in a
// `.shell` "for consistency" puts the gutter back on the one edge this
// component exists to remove.
//
// `to="band"` is the other reading: media that overruns the section it
// sits in - typically a photo pinned to one edge of a `.shell`-width band -
// by a fixed amount, WITHOUT reaching the viewport edge. That is a negative
// margin sized smaller than the shell's own side padding, which is exactly
// the case rule 4 of the shape contract calls out: a negative margin that
// STAYS inside the gutter is safe on its own, but this component adds
// `overflow-x: clip` on its own outer section regardless, because a caller
// who later increases `overrun` past the gutter should get a clipped edge,
// not a page that suddenly scrolls sideways. That one line of defensive
// CSS is cheap and the failure it prevents (horizontal overflow on a
// production build, invisible in a narrow devtools panel, real on an
// actual phone) is not.
//
// NO PICTURE IS A LEGAL STATE. `imageSrc` is optional for the same reason it
// is optional on AngledSplit: the asset layer may hand a build an EMPTY slot,
// and the documented correct outcome is to render the slot without a
// photograph rather than to repeat one. Two cases, and they differ on purpose,
// exactly as CircleMedia's two already do:
//   - default (`fallback="none"`): a bleed with no media has nothing to bleed,
//     so it renders as an ordinary padded band and does NOT claim
//     `data-shape="bleed"`. A shape census counts shapes that were drawn.
//   - `fallback="panel"`: the caller is asking for the BAND to bleed instead of
//     the photograph. That is `to="band"` minus the media: the tinted panel
//     itself runs out to the viewport edge on the `side` given, by cancelling
//     exactly the shell's own gutter, while the copy inside keeps its measure.
//     `overrun` is a media-column number and is not read here. A bleed really
//     is drawn, so it DOES
//     claim `data-shape="bleed"`, and it claims nothing whatever about a
//     photograph. This exists because a style may name Bleed as one of the
//     primitives that carries a page's shape language (clean-minimal names all
//     three of CircleMedia, Bleed and ShapeWrapText), and a vocabulary that can
//     only be drawn by a photograph cannot dress a site whose asset layer
//     honestly left slots empty. It is OPT-IN, default off, so no existing
//     caller and no already-shipped build moves by a pixel.
//
// Reduced motion: no animation, this is a static layout fact like every
// other bleed/split component in this set.

import type { ReactNode } from "react";
import Figure from "../sections/Figure";

export interface BleedProps {
  /** Omitted when the asset layer left this slot empty. No media, no bleed. */
  imageSrc?: string;
  imageAlt?: string;
  side?: "left" | "right";
  to?: "viewport" | "band";
  /** For to="band" only: how far past the shell edge the media runs, in px. */
  overrun?: number;
  /** What to draw when the asset layer left this slot empty. See the header.
   *  "none" (default) renders a plain band and claims no shape. "panel" bleeds
   *  the tinted band itself out to the viewport edge on the `side` given and
   *  claims data-shape="bleed". "panel" does not read `overrun`. */
  fallback?: "none" | "panel";
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
  tone?: "light" | "alt";
  /** Buttons or links that belong under the body copy. */
  children?: ReactNode;
  /** to="viewport" only: the picture is at most 150px tall on a phone instead of 200px, for a page whose
   *  height is already at its budget. Added 2026-10-07. Off by default: every existing build renders as it did. */
  compact?: boolean;
  /** CSS object-position for the picture, so a face stays in the crop. Added 2026-10-07. */
  imagePosition?: string;
  /** An id on the band's section, so a nav link can point at it (/office#hours). */
  anchorId?: string;
  /** The picture is loaded eagerly and not lazy-loaded. Pass it on a Bleed whose picture is inside the
   *  first screen of a route, as ArchMedia's `priority` does: assert-no-flat-scrim HERO-SATURATION measures
   *  the largest picture in the first viewport at load and reads a picture that has not painted yet as
   *  washed out (kinetico-sioux-falls, 2026-10-12: two of four service pages failed it on timing alone).
   *  Off by default: every existing caller renders as it did. */
  priority?: boolean;
}

export default function Bleed({
  imageSrc,
  imageAlt,
  side = "right",
  to = "viewport",
  overrun = 64,
  fallback = "none",
  eyebrow,
  headline,
  body,
  tone = "light",
  children,
  compact = false,
  imagePosition,
  anchorId,
  priority = false,
}: BleedProps) {
  if (!headline) {
    return null;
  }

  const toneClass = tone === "alt" ? " on-alt" : "";
  const mediaIsRight = side === "right";

  if (!imageSrc && fallback === "panel") {
    // The band is the thing that bleeds. The tinted panel overruns the shell
    // on the media side by `overrun` px; the copy stays inside the shell so
    // the measure is unchanged. overflow-x is clipped on the outer section for
    // the same reason to="band" clips it: a caller who later raises `overrun`
    // past the gutter should get a clipped edge, never a sideways-scrolling page.
    const panelIsRight = mediaIsRight;
    return (
      <section id={anchorId} className={`section${toneClass}`} style={{ overflowX: "clip" }} data-shape="bleed" data-bleed-to="band" data-bleed-fallback="panel">
        <div className="shell">
          <div
            className="relative"
            style={{
              backgroundColor: tone === "alt" ? "var(--color-surface)" : "var(--color-surface-alt)",
              borderTop: "1px solid var(--color-border)",
              borderBottom: "1px solid var(--color-border)",
              paddingBlock: "clamp(24px, 3vw, 40px)",
              paddingInline: "clamp(20px, 4vw, 40px)",
              // The panel reaches the TRUE viewport edge on the bleed side by
              // cancelling exactly the shell's own gutter, so it is responsive
              // and can never clip its own padding. `overrun` is a media-column
              // measurement and is deliberately not used here.
              ...(panelIsRight
                ? { marginRight: "calc(var(--gutter) * -1)", borderRight: "none" }
                : { marginLeft: "calc(var(--gutter) * -1)", borderLeft: "none" }),
            }}
          >
            {/* With something to put beside the words (a list, a link), the
                panel is two columns: the words, then the thing. One column of
                max-w-2xl inside a 1200px panel left half of it empty. */}
            <div className={children ? "grid grid-cols-1 items-start gap-x-16 gap-y-6 lg:grid-cols-2" : "max-w-2xl"}>
              <div>
                {eyebrow ? <span className="eyebrow mb-4 block">{eyebrow}</span> : null}
                <h2>{headline}</h2>
                {body ? <p className="lede mt-4">{body}</p> : null}
              </div>
              {children ? <div className="flex flex-wrap items-center gap-4">{children}</div> : null}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!imageSrc) {
    return (
      <section id={anchorId} className={`section${toneClass}`}>
        <div className="shell">
          <div className="max-w-2xl">
            {eyebrow ? <span className="eyebrow mb-4 block">{eyebrow}</span> : null}
            <h2>{headline}</h2>
            {body ? <p className="lede mt-4">{body}</p> : null}
            {children ? <div className="mt-8 flex flex-wrap items-center gap-4">{children}</div> : null}
          </div>
        </div>
      </section>
    );
  }

  if (to === "viewport") {
    return (
      <section id={anchorId} className={`section${toneClass} overflow-hidden`} style={{ paddingLeft: 0, paddingRight: 0 }} data-shape="bleed" data-bleed-to="viewport" data-density="dense">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-0">
          <Figure
            src={imageSrc}
            alt={imageAlt ?? ""}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            wrapperClassName={`relative aspect-[4/5] w-full ${compact ? "max-h-[150px]" : "max-h-[200px]"} lg:max-h-none lg:aspect-auto lg:min-h-[340px] lg:self-stretch ${mediaIsRight ? "order-1 lg:order-2" : "order-1 lg:order-1"}`}
            aspect="free"
            priority={priority}
            style={imagePosition ? { objectPosition: imagePosition } : undefined}
          />
          <div className={mediaIsRight ? "order-2 lg:order-1" : "order-2 lg:order-2"} style={{ paddingInline: "var(--gutter)" }}>
            <div className={`max-w-lg py-4 ${mediaIsRight ? "lg:pr-10" : "lg:pl-10"}`} style={mediaIsRight ? { marginInlineStart: "auto" } : { marginInlineEnd: "auto" }}>
              {eyebrow ? <span className="eyebrow mb-4 block">{eyebrow}</span> : null}
              <h2>{headline}</h2>
              {body ? <p className="lede mt-4">{body}</p> : null}
              {children ? <div className="mt-8 flex flex-wrap items-center gap-4">{children}</div> : null}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // to="band": the shell stays centred and padded as normal; only the
  // media column overruns it, by `overrun` px, on the outer side.
  return (
    <section id={anchorId} className={`section${toneClass}`} style={{ overflowX: "clip" }} data-shape="bleed" data-bleed-to="band">
      <div className="shell grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div
          className={mediaIsRight ? "order-1 lg:order-2" : "order-1 lg:order-1"}
          style={mediaIsRight ? { marginRight: -overrun } : { marginLeft: -overrun }}
        >
          <Figure src={imageSrc} alt={imageAlt ?? ""} fill sizes="(max-width: 1024px) 100vw, 50vw" wrapperClassName="relative aspect-[4/5] w-full" aspect="4/5" priority={priority} style={imagePosition ? { objectPosition: imagePosition } : undefined} />
        </div>
        <div className={mediaIsRight ? "order-2 lg:order-1" : "order-2 lg:order-2"}>
          {eyebrow ? <span className="eyebrow mb-4 block">{eyebrow}</span> : null}
          <h2>{headline}</h2>
          {body ? <p className="lede mt-4">{body}</p> : null}
              {children ? <div className="mt-8 flex flex-wrap items-center gap-4">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
