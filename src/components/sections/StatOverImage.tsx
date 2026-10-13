// StatOverImage
//
// A number and its label sitting ON TOP of the image it describes, not
// underneath it in a separate box. The stat is positioned over the photo
// with its own scrim behind just the text, so the number is legible
// without a full-image tint muddying the photo it is proving a point
// about.
//
// Renders null without a stat, because an image with no number over it is
// just an image; use `FullBleedBand` or `MacroDetail` for that case
// instead.
//
// Reduced motion: no animation of its own. If a future build wants the
// number to count up, that is a client component elsewhere in the
// motion layer's spirit (checked against `prefers-reduced-motion` the same
// way `Reveal` does); do not add an uncontrolled count-up animation here.
//
// The trap: the scrim sits behind the stat block only (a small rectangle),
// not the whole image, on purpose, so most of the photo stays visible. Do
// not "fix" low contrast by widening the scrim to the full image: that
// turns this into a `FullBleedBand` with extra steps and defeats the point
// of the numbers overlapping the photo rather than sitting over a tinted
// wash of it. If the photo itself is too busy for AA contrast in that
// corner, pick a calmer corner of a different photo instead.
//
// Example image: portfolio_pure_agua_344839a1
// (water-filtration/portfolio-harvest/pure-agua/lifestyle/enjoy-pure-water.jpg)
// "Two cupped hands catch a stream of splashing water outdoors over
// gravel, backlit by soft sunlight." bestFor includes "background band"
// and "people close-up"; the lower-left corner here is plain gravel, calm
// enough for the scrim.

import Figure from "./Figure";
import { gradientScrim } from "../video/scrim";

export interface StatOverImageProps {
  imageSrc: string;
  imageAlt: string;
  stat: string;
  statLabel?: string;
  corner?: "bottom-left" | "bottom-right";
  aspect?: string;
  /* THE PROOF BAND, AND WHY THIS IS NOT A SECOND COMPONENT.
     The default render is a media block: a div the caller drops into a column,
     which is what every build using it so far does. An archetype that names
     this as the page's PROOF element wants something else - one fact, edge to
     edge, over a photograph that is genuinely the full width of the viewport,
     because that is what satisfies FULL-BLEED-CADENCE and what a proof beat
     looks like on a page that has no ratings to show. Same component, same
     props, one flag: it renders its own zero-padding `.section` at 100vw, so
     it is a direct child of <main> and every gate can see it.
     The corner scrim is replaced by the real bottom-anchored ramp from
     video/scrim.ts, because a full-bleed picture with a solid block in the
     corner reads as a caption stuck on, and because a flat wash across a
     photograph is what bin/assert-no-flat-scrim.mjs exists to fail. */
  fullBleed?: boolean;
  /** fullBleed only: the small caps label above the fact. */
  eyebrow?: string;
  /** fullBleed only: the one sentence the number is evidence for. */
  line?: string;
  /** fullBleed only: the tallest the band stands at a wide viewport, in px. Default 620. The band
   *  is still 420px on a phone. A page that cannot afford 620px asks for less. Added 2026-10-02. */
  maxHeight?: number;
  /** fullBleed only: CSS object-position for the crop, e.g. "50% 62%". */
  focus?: string;
}

export default function StatOverImage({
  imageSrc,
  imageAlt,
  stat,
  statLabel,
  corner = "bottom-left",
  aspect = "4/3",
  fullBleed = false,
  eyebrow,
  line,
  maxHeight = 620,
  focus,
}: StatOverImageProps) {
  if (!stat) {
    return null;
  }

  const isLeft = corner === "bottom-left";

  if (fullBleed) {
    return (
      /* on-dark IS THE CONTRAST FLOOR, NOT A TINT. The type here is white over a
         photograph, and bin/assert-house-look.mjs measures a text node against
         the nearest ancestor BACKGROUND COLOUR, never against the picture under
         it. With no background colour on this section that was white on white,
         1.00:1, at both widths (found on pure-home-365-asheville, 2026-09-30).
         The deep field is also what the visitor sees for the instant before the
         photograph decodes, so white type never sits on a white page. The
         picture and its bottom ramp paint over it exactly as before. */
      <section
        className="section on-dark"
        data-density="dense"
        style={{ paddingTop: 0, paddingBottom: 0, position: "relative", width: "100vw", marginLeft: "calc(50% - 50vw)", overflow: "hidden" }}
      >
        <div className="relative w-full" style={{ minHeight: `clamp(${Math.min(420, maxHeight)}px, 48vw, ${maxHeight}px)` }}>
          <Figure
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="100vw"
            quality={92}
            style={focus ? { objectPosition: focus } : undefined}
            wrapperClassName="absolute inset-0"
            aspect="16/7"
          />
          {/* A real ramp: dark where the type sits, clear by 65 percent of the
              frame, three stops. Never an rgba() pair written by hand. It is 78
              percent of the frame tall, not 38, because the type block (an eyebrow,
              the stat, its label and a line) is about 200px and stood above a ramp
              of 175px on a 460px band: the blue eyebrow read on bare concrete
              (kinetico-sioux-falls, 2026-10-12). */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0"
            style={{ height: "78%", backgroundImage: gradientScrim({ anchor: "bottom", tint: "shadow" }) }}
          />
          <div className="absolute inset-x-0 bottom-0">
            <div className="shell flex flex-col gap-3 pb-10">
              {eyebrow ? (
                <span className="eyebrow" style={{ color: "var(--color-accent-text-on-dark)" }}>
                  {eyebrow}
                </span>
              ) : null}
              <span
                className="font-heading"
                style={{ color: "#FFFFFF", fontSize: "clamp(48px, 7vw, 104px)", lineHeight: 1 }}
              >
                {stat}
              </span>
              {statLabel ? (
                <span className="eyebrow" style={{ color: "var(--color-accent-text-on-dark)" }}>
                  {statLabel}
                </span>
              ) : null}
              {line ? <p style={{ color: "#FFFFFF" }}>{line}</p> : null}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="relative overflow-hidden" style={{ aspectRatio: aspect }}>
      <Figure src={imageSrc} alt={imageAlt} fill sizes="(max-width: 1024px) 100vw, 50vw" wrapperClassName="absolute inset-0" aspect={aspect} />
      <div
        className="absolute flex flex-col gap-1 px-6 py-4"
        style={{
          bottom: 0,
          [isLeft ? "left" : "right"]: 0,
          backgroundColor: "var(--color-surface-deep)",
        }}
      >
        <span className="font-heading text-4xl" style={{ color: "#ffffff" }}>
          {stat}
        </span>
        {statLabel ? (
          <span className="text-sm" style={{ color: "#FFFFFF" }}>
            {statLabel}
          </span>
        ) : null}
      </div>
    </div>
  );
}
