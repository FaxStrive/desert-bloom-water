// OverlapFigure
//
// A card, figure or number sitting across the seam between two bands, using
// a negative top margin plus a raised z-index to pull it up over whatever
// comes below. This is the general version of ../sections/OverlapCard.tsx
// (image-plus-copy only); read that file's header for the full explanation
// of the negative-margin trick and its trap, which applies here unchanged.
// This component adds the "figure" and "numeral" variants OverlapCard never
// needed: a bare Figure straddling the seam with no card chrome around it,
// and a large stat number in a small pill, for a build that wants the seam
// broken by a number rather than a photograph.
//
// Mount this as the LAST child of the section ABOVE the seam, exactly like
// OverlapCard - the negative margin pulls it up and OVER the section that
// follows, so it has to already be positioned at the bottom of the earlier
// section's DOM order for the stacking to read correctly. Mounting it at
// the top of the section below puts it under that section's own content in
// paint order, which looks like the overlap silently failed even though
// the CSS is identical.
//
// `overlap` is a desktop figure. Below 1024px it is capped to what the band
// below can absorb in its own top padding: 0.6 of --section-pad (the dense
// band's top padding, the smallest a band opens with) less 8px of air. Before
// that cap a 124px overlap on a 390px phone, where --section-pad is 72px, laid
// the numeral over the next band's eyebrow and the top of its headline
// (2026-10-02, usa-filtration-group-gen). The cap is in the margin itself
// (`overlapPull`), so a caller cannot forget it: from 1024px up the margin is
// the number passed, below it the margin is the smaller of the two.
//
// Reduced motion: no animation on the component itself. A caller wanting a
// reveal wraps the mount site in `Reveal` rather than this component
// growing its own transition, matching CornerAccent's stated policy.

import type { ReactNode } from "react";
import Figure from "../sections/Figure";

export interface OverlapFigureProps {
  variant?: "figure" | "card" | "numeral";
  imageSrc?: string;
  imageAlt?: string;
  numeral?: string;
  numeralLabel?: string;
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
  overlap?: number;
  children?: ReactNode;
}

/** The negative bottom margin for an overlap of `overlap` px: the whole figure from 1024px up, and below that no more than the next band's padding can absorb. */
export function overlapPull(overlap: number): string {
  return `calc(-1 * min(${overlap}px, var(--section-pad) * 0.6 - 8px + max(0px, (100vw - 1024px) * 10)))`;
}

export default function OverlapFigure({
  variant = "figure",
  imageSrc,
  imageAlt,
  numeral,
  numeralLabel,
  eyebrow,
  headline,
  body,
  overlap = 96,
  children,
}: OverlapFigureProps) {
  if (variant === "numeral" && !numeral) {
    return null;
  }
  if (variant !== "numeral" && !imageSrc) {
    return null;
  }

  if (variant === "numeral") {
    return (
      <div className="shell relative z-10" style={{ marginBottom: overlapPull(overlap) }} data-shape="overlap-figure" data-overlap-variant="numeral">
        <div
          className="inline-flex flex-col items-start gap-1 px-8 py-6"
          style={{ backgroundColor: "var(--color-accent-fill)", color: "var(--color-accent-fill-ink)", borderRadius: "var(--radius-card)" }}
        >
          <span style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 700, lineHeight: 1 }}>{numeral}</span>
          {numeralLabel ? <span className="eyebrow" style={{ color: "inherit" }}>{numeralLabel}</span> : null}
        </div>
      </div>
    );
  }

  if (variant === "figure") {
    return (
      <div className="shell relative z-10" style={{ marginBottom: overlapPull(overlap), maxWidth: 420 }} data-shape="overlap-figure" data-overlap-variant="figure">
        <div style={{ borderRadius: "var(--radius-media)", overflow: "hidden", border: "1px solid var(--color-border)" }}>
          <Figure src={imageSrc as string} alt={imageAlt ?? ""} fill sizes="(max-width: 640px) 80vw, 30vw" wrapperClassName="relative aspect-[4/3] w-full" aspect="4/3" />
        </div>
        {children}
      </div>
    );
  }

  if (!headline) {
    return null;
  }

  return (
    <div className="shell relative z-10" style={{ marginBottom: overlapPull(overlap) }} data-shape="overlap-figure" data-overlap-variant="card">
      <div
        className="card grid grid-cols-1 gap-0 overflow-hidden sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]"
        style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}
      >
        <div className="card-media relative aspect-[4/3] sm:aspect-auto sm:min-h-[280px]" data-aspect="free">
          <Figure src={imageSrc as string} alt={imageAlt ?? ""} fill sizes="(max-width: 640px) 100vw, 45vw" wrapperClassName="absolute inset-0 h-full w-full" aspect="free" />
        </div>
        <div className="flex flex-col justify-center gap-3 p-8">
          {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
          <h3>{headline}</h3>
          {body ? <p style={{ color: "var(--color-ink-muted)" }}>{body}</p> : null}
        </div>
      </div>
    </div>
  );
}
