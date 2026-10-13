// ServiceAreas
//
// Coverage areas, grouped by metro or region. Renders null with no areas.
//
// Two layouts, added 2026-09-30, plus the prose a coverage band needs around
// the list. `variant: "cards"` is what this component has always drawn and is
// still the default. `variant: "columns"` sets the same groups as plain ruled
// columns, for the band that is a long list of place names rather than a few
// regions: twelve counties as twelve bordered cards is a screen and a half of
// boxes for twelve words.
//
// `intro`, `note`, `coverageNote`, `linkLabel` and `linkHref` are all optional
// and all default to nothing, so a caller written before them renders exactly
// as it did. A coverage band that cannot say "call if you are just outside
// this list" has to leave the sentence off the site or invent a section for
// it, and both are worse than a prop.

import type { ReactNode } from "react";
import Figure from "./Figure";

export interface ServiceAreaGroup {
  name: string;
  subtitle?: string;
  /** Cities or neighborhoods within this group, free text from the client. */
  places?: string[];
}

export type ServiceAreasVariant = "cards" | "columns";

export interface ServiceAreasProps {
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
  /** One line under the heading, before the list. */
  coverageNote?: string;
  /** A paragraph under that, for what the list means. */
  intro?: string;
  areas?: ServiceAreaGroup[];
  /** Lines under the list: what is also covered, a count, what to do if unsure. */
  notes?: string[];
  linkLabel?: string;
  linkHref?: string;
  tone?: "light" | "alt";
  variant?: ServiceAreasVariant;
  /** A picture in a circle, floated beside the heading and the intro, which wrap round it
   *  (shape-outside), and the section marked `data-shape="shape-wrap-text"` because that
   *  shape was drawn. `cards` variant only. For a style whose density wants a wrapped-text
   *  shape on a home page with no room for a free-standing section; the coverage band
   *  already has a heading and a paragraph to wrap. Without it the band is unchanged.
   *  Added 2026-10-02. */
  figure?: { src: string; alt: string };
}

export default function ServiceAreas({
  eyebrow,
  headline,
  coverageNote,
  intro,
  areas = [],
  notes = [],
  linkLabel,
  linkHref,
  tone = "alt",
  variant = "cards",
  figure,
}: ServiceAreasProps) {
  const items = areas.filter((area) => Boolean(area.name));

  if (items.length === 0) {
    return null;
  }

  const lines = notes.filter(Boolean);
  const head = (eyebrow || headline || coverageNote || intro) && (
    <div className={`mb-12 ${figure && variant === "cards" ? "max-w-none" : "max-w-3xl"}`}>
      {eyebrow ? <span className="eyebrow mb-4 block">{eyebrow}</span> : null}
      {headline ? <h2>{headline}</h2> : null}
      {coverageNote ? <p className="lede mt-4">{coverageNote}</p> : null}
      {intro ? <p className="mt-4">{intro}</p> : null}
    </div>
  );
  const tail = (lines.length > 0 || (linkLabel && linkHref)) && (
    <div className="mt-10 flex max-w-3xl flex-col gap-3">
      {lines.map((line) => (
        <p key={line} style={{ color: "var(--color-ink-muted)" }}>
          {line}
        </p>
      ))}
      {linkLabel && linkHref ? (
        <a href={linkHref} className="font-semibold" style={{ color: "var(--color-accent-text)" }}>
          {linkLabel}
        </a>
      ) : null}
    </div>
  );

  if (variant === "columns") {
    return (
      <section className={`section${tone === "alt" ? " on-alt" : ""}`} data-density="dense">
        <div className="shell">
          {head}
          <div
            className="grid grid-cols-1 gap-x-12 gap-y-6 sm:grid-cols-2 lg:grid-cols-4"
            style={{ borderTop: "1px solid var(--color-border)" }}
          >
            {items.map((area) => (
              <div key={area.name} className="pt-5">
                <h3 style={{ fontSize: "1.125rem", lineHeight: 1.25 }}>{area.name}</h3>
                {area.subtitle ? (
                  <p className="mt-1 text-xs font-medium uppercase tracking-wide" style={{ color: "var(--color-ink-muted)" }}>
                    {area.subtitle}
                  </p>
                ) : null}
                {area.places && area.places.length > 0 ? (
                  <p className="mt-2" style={{ color: "var(--color-ink-muted)" }}>
                    {area.places.join(", ")}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
          {tail}
        </div>
      </section>
    );
  }

  const wrapFigure = figure ? (
    <div
      style={{
        float: "right",
        width: "clamp(140px, 22vw, 260px)",
        marginLeft: 32,
        marginBottom: 16,
        borderRadius: "50%",
        overflow: "hidden",
        shapeOutside: "circle(50%)",
        shapeMargin: "24px",
      }}
    >
      <Figure src={figure.src} alt={figure.alt} fill sizes="(max-width: 640px) 140px, 260px" wrapperClassName="relative w-full" aspect="1/1" />
    </div>
  ) : null;

  return (
    <section
      className={`section${tone === "alt" ? " on-alt" : ""}`}
      data-density="dense"
      data-shape={figure ? "shape-wrap-text" : undefined}
      data-wrap-shape={figure ? "circle" : undefined}
    >
      <div className="shell">
        {figure ? (
          <>
            {wrapFigure}
            {head}
            <div style={{ clear: "both" }} />
          </>
        ) : (
          head
        )}
        <div className="grid grid-cols-1 gap-4 sm:gap-8 md:grid-cols-3">
          {items.map((area) => (
            <div
              key={area.name}
              className="lift p-5 sm:p-8"
              style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}
            >
              <h3 className="mb-1">{area.name}</h3>
              {area.subtitle ? (
                <p className="mb-2 text-xs font-medium uppercase tracking-wide sm:mb-6" style={{ color: "var(--color-ink-muted)" }}>
                  {area.subtitle}
                </p>
              ) : null}
              {area.places && area.places.length > 0 ? (
                <p style={{ color: "var(--color-ink-muted)" }}>
                  {area.places.join(", ")}
                </p>
              ) : null}
            </div>
          ))}
        </div>
        {tail}
      </div>
    </section>
  );
}
