// Systems
//
// Shows the client's real product or system lineup. Renders null with no
// systems. Four variants:
//   "grid"             - a grid of cards, each with a photo, name,
//                         description, CTA. (default, was "cards")
//   "alternating-rows"  - alternating image/copy rows, one system per row,
//                         the way a flagship-system page reads. (was "rows")
//   "comparison"        - the systems laid out as parallel columns in a
//                         single comparison table, so a visitor reads them
//                         side by side rather than one after another.
//   "stacked-cards"      - each system is a full-width band stacked on top
//                         of the next, photo behind a scrim with the copy
//                         overlaid, so the page reads as one system at a
//                         time rather than a grid or a table.
//
// The old literal names "cards" and "rows" are accepted too, and resolved
// to "grid" and "alternating-rows" respectively, so a caller written before
// this component had a `variant` union keeps compiling and rendering
// exactly as it did before.
//
// A system with no photo still renders (text card / text row); a system
// with no name is dropped from the list rather than shown blank.
//
// THE SECTION NAME AND THE CARD ATTRIBUTE COME FROM @/lib/industry, not from
// this file. Added 2026-09-30, for a genuine collision between two gates that
// had no other resolution: assert-layout-variety check 2a reads the archetype's
// fixed opening, and proof-led-local-trade names Systems as home section three,
// while assert-sells (gate 8) counts [data-system-card] inside
// [data-section="systems-grid"] at that same position. Before this change only
// SystemsGrid.tsx emitted either attribute, so Systems at three failed gate 8
// and SystemsGrid at three failed gate 13. Both attributes are read from the
// generated industry module exactly as SystemsGrid.tsx reads them, so a dental
// build gets [data-treatment-card] inside [data-section="services-grid"] with
// no second copy of this component.

import { SECTION_GRID, cardAttr } from "@/lib/industry";
import Reveal from "../motion/Reveal";
import { stagger } from "../motion/stagger";
import Figure from "./Figure";
import SystemsPicker from "./SystemsPicker";
import { bandGrid } from "@/lib/bandGrid";
import type { ReactNode } from "react";

export interface SystemItem {
  name: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  /** picker variant: CSS object-position for the picture. */
  imagePosition?: string;
  /** alternating-rows: short fact list under the description. */
  points?: string[];
  ctaLabel?: string;
  ctaHref?: string;
}

/** The current, canonical shapes for this section. */
export type SystemsVariant = "grid" | "alternating-rows" | "comparison" | "stacked-cards" | "picker";

/** Pre-variant names, still accepted so an older caller keeps compiling. */
type SystemsLegacyVariant = "cards" | "rows";

export interface SystemsProps {
  variant?: SystemsVariant | SystemsLegacyVariant;
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
  systems?: SystemItem[];
  tone?: "light" | "alt";
  /**
   * The same two treatments SystemsGrid.tsx implements, with the same
   * semantics.
   *
   * "photo" is the original: a cropped scene filling the frame.
   * "product" is the reference site's treatment: the equipment isolated on a
   * white panel with air around it, so a row of systems reads as a catalogue
   * of things you can buy rather than a mood board. Prefer "product" when the
   * pictures are isolated equipment shots; stay on "photo" when they are
   * in-situ scenes, because letterboxing a kitchen photograph onto white looks
   * broken. The picture bar applies either way: this changes how a picture is
   * presented and not which pictures are allowed.
   */
  cardMedia?: "photo" | "product";
  /**
   * The text-only columns layout (alternating-rows with no picture on any row)
   * is set dense, a third of a full section pad, because it was written as a
   * list between two heavier bands. A page whose list is one of its own
   * sections, and whose rhythm needs that section to read as one, passes
   * "base" for the full pad. Dense by default: every existing caller renders
   * as it did.
   */
  density?: "dense" | "base";
  /**
   * "grid" only. The widest column count at lg (default 3). Four services at a
   * default of 3 sit two by two and stand 1,480px tall at 1440 and 1,954px at 390
   * (kinetico-sioux-falls, 2026-10-12), more than a fifth of a nine-screen home.
   * `columns={4}` puts four in one row from lg. bandGrid still steps down on its
   * own when the count does not divide.
   */
  columns?: number;
  /**
   * "grid" only. 2 puts two cards across on a phone instead of one (default 1).
   * The last card of an odd count spans both, as bandGrid decides.
   */
  mobileColumns?: 1 | 2;
  /** "grid" only. Smaller card padding and gap, cards of equal height with the link at the foot: the cards of a band that must stay short. */
  tight?: boolean;
}

function resolveVariant(variant: SystemsProps["variant"]): SystemsVariant {
  if (variant === "cards") return "grid";
  if (variant === "rows") return "alternating-rows";
  return variant ?? "grid";
}

const COMPARISON_LG_COLS: Record<number, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
};

export default function Systems({
  variant,
  eyebrow,
  headline,
  systems = [],
  tone = "light",
  cardMedia = "photo",
  density = "dense",
  columns = 3,
  mobileColumns = 1,
  tight = false,
}: SystemsProps) {
  const items = systems.filter((system) => Boolean(system.name));

  if (items.length === 0) {
    return null;
  }

  const resolved = resolveVariant(variant);
  const sectionClass = `section${tone === "alt" ? " on-alt" : ""}`;
  // Product treatment, identical to SystemsGrid: a white panel with air round
  // the equipment and object-fit contain, because a cut-out cropped with cover
  // loses the thing it is a picture of.
  const isProduct = cardMedia === "product";
  const mediaWrapperStyle = isProduct
    ? { backgroundColor: "#FFFFFF", padding: "1rem" }
    : undefined;
  const mediaFit = isProduct ? ("contain" as const) : undefined;
  const header = (eyebrow || headline) && (
    <div>
      {eyebrow ? <span className="eyebrow mb-4 block">{eyebrow}</span> : null}
      {headline ? <h2>{headline}</h2> : null}
    </div>
  );

  // Alternating rows exist to trade a picture from side to side. With no
  // picture on any row, every row is half text and half nothing, and three
  // rows stack to a page and a half of empty right-hand space. A set of rows
  // that has nothing to alternate with is laid out as columns instead, each
  // one a rule, a name, the description and the link.
  // "picker": the systems as a control. The name is a button, the description, picture and link
  // show when it is chosen (see SystemsPicker.tsx). Needs at least two to be a choice.
  if (resolved === "picker" && items.length >= 2) {
    return (
      <SystemsPicker
        eyebrow={eyebrow}
        headline={headline}
        tone={tone}
        options={items.map((item) => ({
          name: item.name,
          description: item.description,
          imageSrc: item.imageSrc,
          imageAlt: item.imageAlt,
          imagePosition: item.imagePosition,
          ctaLabel: item.ctaLabel,
          ctaHref: item.ctaHref,
        }))}
      />
    );
  }

  if (resolved === "alternating-rows" && !items.some((system) => Boolean(system.imageSrc))) {
    const textOnly = bandGrid(items.length, { max: 3, bp: "lg" });
    return (
      <section className={sectionClass} data-section={SECTION_GRID} data-density={density === "dense" ? "dense" : undefined}>
        <div className="shell">
          {header ? <div className="mb-10">{header}</div> : null}
          <div className={`${textOnly.gridClass} gap-x-12 gap-y-10`}>
            {items.map((system, index) => (
              <div
                key={system.name}
                className={`flex flex-col gap-3 pt-6 ${textOnly.spanClass(index)}`}
                style={{ borderTop: "1px solid var(--color-border)" }}
                {...cardAttr}
              >
                <h3>{system.name}</h3>
                {system.description ? (
                  <p style={{ color: "var(--color-ink-muted)" }}>{system.description}</p>
                ) : null}
                {system.ctaLabel && system.ctaHref ? (
                  <a href={system.ctaHref} className="mt-auto font-semibold" style={{ color: "var(--color-accent-text)" }}>
                    {system.ctaLabel}
                  </a>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (resolved === "alternating-rows") {
    return (
      <section className={sectionClass} data-section={SECTION_GRID} data-density="dense">
        <div className="shell flex flex-col gap-20">
          {header}
          {items.map((system, index) => {
            const reversed = index % 2 === 1;
            return (
              <div
                key={system.name}
                className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16"
                {...cardAttr}
              >
                <div className={`lg:col-span-6 ${reversed ? "lg:order-2" : "lg:order-1"}`}>
                  <h3 className="mb-4">{system.name}</h3>
                  {system.description ? (
                    <p className="mb-8 max-w-md" style={{ color: "var(--color-ink-muted)" }}>
                      {system.description}
                    </p>
                  ) : null}
                  {system.points && system.points.length > 0 ? (
                    <ul className="mb-8 max-w-md" style={{ borderTop: "1px solid var(--color-border)" }}>
                      {system.points.map((point) => (
                        <li key={point} className="py-3 font-medium" style={{ borderBottom: "1px solid var(--color-border)" }}>
                          {point}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {system.ctaLabel && system.ctaHref ? (
                    <a href={system.ctaHref} className="btn btn-ghost btn-sweep">
                      {system.ctaLabel}
                    </a>
                  ) : null}
                </div>
                <div className={`lg:col-span-6 ${reversed ? "lg:order-1" : "lg:order-2"}`}>
                  {system.imageSrc ? (
                    <Figure
                      src={system.imageSrc}
                      alt={system.imageAlt ?? system.name}
                      fill
                      sizes="(max-width: 1023px) 100vw, 50vw"
                      wrapperClassName="card-media relative w-full"
                      wrapperStyle={{ border: "1px solid var(--color-border)", ...mediaWrapperStyle }}
                      aspect="4/3"
                      fit={mediaFit}
                    />
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  if (resolved === "comparison") {
    // The columns follow the count, up to four: three systems in a four column
    // row left a quarter of the band empty on usa-filtration-group (2026-09-30).
    // Parallel columns: every system reads at the same row (photo, name,
    // description, CTA) so the visitor compares across the row rather than
    // scrolling through one system after another.
    return (
      <section className={sectionClass} data-section={SECTION_GRID} data-density="dense">
        <div className="shell">
          {header ? <div className="mb-10">{header}</div> : null}
          <div
            className={"grid grid-cols-1 divide-y sm:grid-cols-2 sm:divide-x sm:divide-y-0 " + COMPARISON_LG_COLS[Math.min(items.length, 4)]}
            style={{ borderTop: "1px solid var(--color-border)", borderColor: "var(--color-border)" }}
          >
            {items.map((system, index) => (
              <div key={system.name} className="flex flex-col gap-4 px-6 py-8 first:pl-0 last:pr-0" {...cardAttr}>
                {system.imageSrc ? (
                  <Figure
                    src={system.imageSrc}
                    alt={system.imageAlt ?? system.name}
                    fill
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                    wrapperClassName="card-media relative w-full"
                    wrapperStyle={mediaWrapperStyle}
                    aspect="3/2"
                    fit={mediaFit}
                  />
                ) : null}
                <span
                  aria-hidden="true"
                  className="text-sm font-semibold"
                  style={{ color: "var(--color-accent-text)" }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{system.name}</h3>
                {system.description ? (
                  <p className="text-sm" style={{ color: "var(--color-ink-muted)" }}>
                    {system.description}
                  </p>
                ) : null}
                {system.ctaLabel && system.ctaHref ? (
                  <a
                    href={system.ctaHref}
                    className="mt-auto text-sm font-semibold"
                    style={{ color: "var(--color-accent-text)" }}
                  >
                    {system.ctaLabel}
                  </a>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (resolved === "stacked-cards") {
    // Full-width bands, one system per screen-width slab, photo behind a
    // scrim with the copy laid over it. Reads as one system at a time,
    // never a grid of small cards or a side-by-side row.
    return (
      <section className={sectionClass} data-section={SECTION_GRID} data-density="dense">
        <div className="shell mb-16">{header}</div>
        <div className="flex flex-col gap-4">
          {items.map((system, index) => (
            <Reveal key={system.name} delayMs={stagger(index)}>
              <div className="relative w-full overflow-hidden" style={{ minHeight: 420 }} {...cardAttr}>
                {system.imageSrc ? (
                  <Figure
                    src={system.imageSrc}
                    alt={system.imageAlt ?? system.name}
                    fill
                    sizes="100vw"
                    wrapperClassName="absolute inset-0 h-full w-full"
                    aspect="free"
                  />
                ) : (
                  <div className="absolute inset-0" style={{ backgroundColor: "var(--color-surface-deep)" }} />
                )}
                <div
                  className="relative flex h-full min-h-[420px] items-end"
                  style={{ backgroundImage: "linear-gradient(to top, rgba(0,0,0,0.72), rgba(0,0,0,0.1))" }}
                >
                  <div className="shell py-10 text-white">
                    <div className="max-w-lg">
                      <h3 className="mb-3" style={{ color: "#ffffff" }}>
                        {system.name}
                      </h3>
                      {system.description ? (
                        <p className="mb-6" style={{ color: "rgba(255,255,255,0.82)" }}>
                          {system.description}
                        </p>
                      ) : null}
                      {system.ctaLabel && system.ctaHref ? (
                        <a href={system.ctaHref} className="btn btn-on-dark btn-sweep">
                          {system.ctaLabel}
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    );
  }

  // "grid" (default)
  const gridSystemsGrid = bandGrid(items.length, { max: columns, bp: columns > 3 ? "lg" : "md", mobile: mobileColumns });
  return (
    <section className={sectionClass} data-section={SECTION_GRID} data-density="dense">
      <div className="shell">
        {(eyebrow || headline) && (
          <div className="mb-16">
            {eyebrow ? <span className="eyebrow mb-4 block">{eyebrow}</span> : null}
            {headline ? <h2>{headline}</h2> : null}
          </div>
        )}
        {/* Columns follow the item count: two products in a three column grid
            left a third of the row empty on USA Water. Four sit two by two. */}
        <div className={`${gridSystemsGrid.gridClass} ${tight ? "gap-3 sm:gap-4 lg:gap-6" : "gap-8"}`}>
          {items.map((system, index) => (
            <Reveal key={system.name} delayMs={stagger(index)} className={`lift ${gridSystemsGrid.spanClass(index)}`}>
              <article
                className={`card flex flex-col ${tight ? "h-full gap-3 p-3 sm:p-4 lg:p-5" : "gap-4 p-6"}`}
                style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}
                {...cardAttr}
              >
                {system.imageSrc ? (
                  <Figure
                    src={system.imageSrc}
                    alt={system.imageAlt ?? system.name}
                    fill
                    sizes={columns > 3 ? "(max-width: 1023px) 50vw, 240px" : mobileColumns === 2 ? "(max-width: 767px) 50vw, 33vw" : "(max-width: 768px) 100vw, 33vw"}
                    wrapperClassName="card-media relative w-full"
                    wrapperStyle={mediaWrapperStyle}
                    aspect="4/3"
                    fit={mediaFit}
                  />
                ) : null}
                <h3>{system.name}</h3>
                {system.description ? (
                  <p className="text-sm" style={{ color: "var(--color-ink-muted)" }}>
                    {system.description}
                  </p>
                ) : null}
                {system.ctaLabel && system.ctaHref ? (
                  <a href={system.ctaHref} className={`text-sm font-semibold${tight ? " mt-auto" : ""}`} style={{ color: "var(--color-accent-text)" }}>
                    {system.ctaLabel}
                  </a>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
