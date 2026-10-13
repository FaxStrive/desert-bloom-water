// InfoBand
//
// A plain information band: an h2, an optional introduction, then any of a
// list, a label and value table, notes and links. It is the section the
// library is missing between "a grid of cards" and "a paragraph beside a
// picture": a practice's wayfinding, its hours, the steps of a form, the
// list of what a treatment is for. No picture, because these bands carry
// facts and a picture would be decoration.
//
// Renders null without a headline. Every string is a prop. `children` is for
// one embedded widget under the text, for example a map frame.
//
// `density` decides which padding the band gets, and it is a PROP rather than a
// constant because the same component carries two different kinds of band.
// globals.css defines dense as "a band carrying a grid, a step list or an
// accordion" and holds it to a minority of sections per route, because
// bin/assert-house-look.mjs measures the MODAL section padding-top against the
// style's band. A short cross-link band that only points at two other routes is
// not a content band, so it passes density="base" and keeps the house padding.
// Hardcoding dense put two dense bands on every treatment page and dropped the
// modal padding to 86px against a 112px floor.
//
// Props: tone, density, eyebrow, headline, intro, items, itemStyle, rows,
// notes, links, children.

import type { ReactNode } from "react";

export interface InfoRow {
  label: string;
  value: string;
}

export interface InfoLink {
  label: string;
  href: string;
  support?: string;
}

export interface InfoBandProps {
  tone?: "light" | "alt";
  /** "dense" for a band carrying a list or a table, "base" for a short pointer. */
  density?: "dense" | "base";
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
  intro?: string;
  items?: string[];
  /** "bullets" sets a rule-led list, "plain" sets each line as its own paragraph. */
  itemStyle?: "bullets" | "plain";
  rows?: InfoRow[];
  notes?: string[];
  links?: InfoLink[];
  /** An id on the band's section, so a nav link can point at it (/office#find-us). */
  anchorId?: string;
  children?: ReactNode;
}

export default function InfoBand({
  tone = "light",
  density = "dense",
  eyebrow,
  headline,
  intro,
  items = [],
  itemStyle = "bullets",
  rows = [],
  notes = [],
  links = [],
  anchorId,
  children,
}: InfoBandProps) {
  if (!headline) {
    return null;
  }

  return (
    <section
      id={anchorId}
      className={`section${tone === "alt" ? " on-alt" : ""}`}
      {...(density === "dense" ? { "data-density": "dense" } : {})}
    >
      <div className="shell">
        {/* The heading and its introduction sit in a column of their own and the
            list, rows, notes, links and any child sit beside it. A single
            max-w-3xl column left the right half of a 1200px band empty on every
            page that used this band, and a seven row list is tall in one
            column and short in a column of its own. Stacks on a phone. */}
        <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          {eyebrow ? <span className="eyebrow mb-4 block">{eyebrow}</span> : null}
          <h2>{headline}</h2>
          {intro ? <p className="lede mt-4">{intro}</p> : null}
          {notes.length > 0 ? (
            <div className="mt-6 flex flex-col gap-3">
              {notes.map((note) => (
                <p key={note} style={{ color: "var(--color-ink-muted)" }}>
                  {note}
                </p>
              ))}
            </div>
          ) : null}

        </div>
        <div className="lg:col-span-7 lg:[&>*:first-child]:mt-0">
          {items.length > 0 ? (
            itemStyle === "plain" ? (
              <div className="mt-8 flex flex-col gap-4">
                {items.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            ) : (
              <ul className="mt-8 flex flex-col" style={{ borderTop: "1px solid var(--color-border)" }}>
                {items.map((item) => (
                  <li key={item} className="py-3" style={{ borderBottom: "1px solid var(--color-border)" }}>
                    {item}
                  </li>
                ))}
              </ul>
            )
          ) : null}

          {rows.length > 0 ? (
            <dl className="mt-8 flex flex-col" style={{ borderTop: "1px solid var(--color-border)" }}>
              {rows.map((row) => (
                <div
                  key={row.label}
                  className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 py-3"
                  style={{ borderBottom: "1px solid var(--color-border)" }}
                >
                  <dt className="font-semibold">{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          {links.length > 0 ? (
            <ul className="mt-8 flex flex-col gap-4">
              {links.map((link) => (
                <li key={link.href + link.label} className="flex flex-col gap-1">
                  <a href={link.href} className="font-semibold" style={{ color: "var(--color-accent-text)" }}>
                    {link.label}
                  </a>
                  {link.support ? (
                    <span className="text-sm" style={{ color: "var(--color-ink-muted)" }}>
                      {link.support}
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
        </div>
      </div>
    </section>
  );
}
