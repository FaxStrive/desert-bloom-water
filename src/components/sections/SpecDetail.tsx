// SpecDetail
//
// A headline, a short introduction and a specification list, with a picture
// beside them when there is one. MacroDetail is the library's nearest section
// and it cannot do this: it is image-led, renders null without a picture, and
// carries a headline and one paragraph with no list. A treatment page and an
// infection-control band are lists of specific, sourced lines, and they have to
// show with or without a photograph, so this one renders on its own.
//
// Renders null without a headline, and without either an introduction or at
// least one spec line. A treatment whose record is one sentence gets the
// sentence and no list, not an invented list. Every string is a prop. `tone="dark"` is for the one dark band a page is allowed.
//
// layouts/archetypes.json names this component as the alternative to
// MacroDetail in the catalogue archetype's required beats, because MacroDetail
// renders null without a photograph and not every industry has a product to
// shoot close up.
//
// CARDS (2026-10-02). A list of hairline rules reads as a list of rules, not as
// content: on the first usa-filtration-group-gen system pages "what it does"
// was the first thing under the hero and it looked like a form. With `cards`
// the same material is a grid of cards, one per capability, each with a short
// title and its body, and `note` becomes the last card ("Worth knowing"). The
// card is the style's own shape: `cardShape="cut-corner"` for a facets style
// (a straight diagonal notch, no radius), `"card"` for every other style (the
// `.card` class, which reads --radius-card). The caller picks it from the
// build's shape family; this file does not know the style.
//
// Props: anchorId, tone, eyebrow, headline, intro, specs, note, imageSrc,
// imageAlt, cards, cardShape, noteTitle.

import Figure from "./Figure";
import Reveal from "../motion/Reveal";
import { stagger } from "../motion/stagger";
import { CutCorner } from "@/components/shapes";
import { bandGrid } from "@/lib/bandGrid";
import type { CSSProperties, ReactNode } from "react";

export interface SpecCard {
  title: string;
  body: string;
}

export interface SpecDetailProps {
  /** id on the section, so another page can link straight to it. */
  anchorId?: string;
  /** One quieter line under the list. */
  note?: string;
  tone?: "light" | "alt" | "dark";
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
  specs?: string[];
  imageSrc?: string;
  imageAlt?: string;
  /** One card per capability. When given, the list is not drawn. */
  cards?: SpecCard[];
  /** The card's shape: a notched corner for a facets style, the style's own card otherwise. */
  cardShape?: "cut-corner" | "card";
  /** The title of the card `note` becomes in the cards layout. */
  noteTitle?: string;
  /** "dense" is a third of a full section pad, "base" the full pad. A dark band
   *  that is one of a page's few deep sections reads as a band at the full pad.
   *  Dense by default: every existing caller renders as it did. */
  density?: "dense" | "base";
  /** CSS object-position for the card-layout picture. */
  imagePosition?: string;
}

const CORNERS = ["top-right", "bottom-left", "top-left", "bottom-right"] as const;

export default function SpecDetail({
  anchorId,
  note,
  tone = "light",
  eyebrow,
  headline,
  intro,
  specs = [],
  imageSrc,
  imageAlt,
  cards = [],
  cardShape = "card",
  noteTitle = "Worth knowing",
  density = "dense",
  imagePosition,
}: SpecDetailProps) {
  if (!headline || (specs.length === 0 && cards.length === 0 && !intro)) {
    return null;
  }

  const toneClass = tone === "dark" ? " on-dark" : tone === "alt" ? " on-alt" : "";
  const rule = tone === "dark" ? "rgba(255,255,255,0.22)" : "var(--color-border)";

  if (cards.length > 0) {
    const all = note ? [...cards, { title: noteTitle, body: note }] : cards;
    // Four across, three otherwise: bandGrid keeps the last row full.
    const grid = bandGrid(all.length, { max: all.length === 4 ? 4 : 3, bp: "md" });
    const cardTone = tone === "alt" ? "light" : "alt";
    return (
      <section id={anchorId} className={`section${toneClass}`} data-density={density === "dense" ? "dense" : undefined} data-section="spec-detail">
        <div className="shell">
          <div className={imageSrc ? "mb-8 grid grid-cols-1 items-center gap-6 sm:mb-10 lg:grid-cols-2 lg:gap-12" : ""}>
            <div className={imageSrc ? "max-w-2xl" : "mb-8 max-w-2xl sm:mb-10"}>
              {eyebrow ? <span className="eyebrow mb-4 block">{eyebrow}</span> : null}
              <h2>{headline}</h2>
              {intro ? <p className="lede mt-4">{intro}</p> : null}
            </div>
            {imageSrc ? (
              <Figure
                src={imageSrc}
                alt={imageAlt ?? ""}
                fill
                sizes="(max-width: 1023px) 100vw, 50vw"
                wrapperClassName="relative h-[120px] w-full sm:h-[200px] lg:h-[220px]"
                wrapperStyle={{ "--figure-inset": "0px", "--image-frame": "0px" } as CSSProperties}
                aspect="free"
                style={imagePosition ? { objectPosition: imagePosition } : undefined}
              />
            ) : null}
          </div>
          <div className={`${grid.gridClass} gap-4 sm:gap-6`}>
            {all.map((card, index) => (
              <Reveal key={card.title} delayMs={stagger(index)} className={`[&>*]:h-full ${grid.spanClass(index)}`}>
                {cardShape === "cut-corner" ? (
                  <CutCorner
                    corner={CORNERS[index % CORNERS.length]}
                    size={28}
                    tone={cardTone}
                    eyebrow={index < cards.length ? String(index + 1).padStart(2, "0") : "Note"}
                    headline={card.title}
                    body={card.body}
                  />
                ) : (
                  <div
                    className="card h-full p-3 sm:p-8"
                    // On the dark tone a light card would hold white type (the band's own ink), so
                    // the card is a hairline-ruled panel on the band instead and keeps the band's ink.
                    style={
                      tone === "dark"
                        ? { backgroundColor: "rgba(255,255,255,0.06)", border: `1px solid ${rule}` }
                        : {
                            backgroundColor: cardTone === "alt" ? "var(--color-surface-alt)" : "var(--color-surface)",
                            border: "1px solid var(--color-border)",
                          }
                    }
                  >
                    <span className="eyebrow mb-1 block sm:mb-2">{index < cards.length ? String(index + 1).padStart(2, "0") : "Note"}</span>
                    <h3 style={{ fontSize: "clamp(1.15rem, 1.7vw, 1.5rem)", lineHeight: 1.2 }}>{card.title}</h3>
                    <p className="mt-2" style={{ color: tone === "dark" ? "rgba(255,255,255,0.82)" : "var(--color-ink-muted)" }}>{card.body}</p>
                  </div>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id={anchorId} className={`section${toneClass}`} data-density="dense" data-section="spec-detail">
      {imageSrc ? (
        <div className="shell grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <Figure
            src={imageSrc}
            alt={imageAlt ?? ""}
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
            wrapperClassName="relative aspect-[3/2] w-full"
            aspect="3/2"
          />
          <div className="max-w-xl">
            {eyebrow ? <span className="eyebrow mb-4 block">{eyebrow}</span> : null}
            <h2>{headline}</h2>
            {intro ? <p className="lede mt-4">{intro}</p> : null}
            {specs.length > 0 ? (
              <ul className="mt-8 flex flex-col" style={{ borderTop: `1px solid ${rule}` }}>
                {specs.map((spec) => (
                  <li key={spec} className="py-4" style={{ borderBottom: `1px solid ${rule}` }}>
                    {spec}
                  </li>
                ))}
              </ul>
            ) : null}
            {note ? <p className="mt-6">{note}</p> : null}
          </div>
        </div>
      ) : (
        /* With no picture the band is two columns, the words and then the list,
           because a single max-w-3xl column left the right half of it empty. */
        <div className="shell grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className={specs.length > 0 ? "lg:col-span-5" : "max-w-3xl lg:col-span-12"}>
            {eyebrow ? <span className="eyebrow mb-4 block">{eyebrow}</span> : null}
            <h2>{headline}</h2>
            {intro ? <p className="lede mt-4">{intro}</p> : null}
            {note ? <p className="mt-6">{note}</p> : null}
          </div>
          {specs.length > 0 ? (
            <ul className="flex flex-col lg:col-span-7" style={{ borderTop: `1px solid ${rule}` }}>
              {specs.map((spec) => (
                <li key={spec} className="py-3" style={{ borderBottom: `1px solid ${rule}` }}>
                  {spec}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      )}
    </section>
  );
}
