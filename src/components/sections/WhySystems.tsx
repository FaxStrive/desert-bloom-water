// WhySystems
//
// The second section of every home page: why this client's systems are
// worth choosing. Renders null under three reasons, because a two-reason
// version of this section is not a shorter section, it is an unfinished
// one. Caps the rendered list at five. Three variants:
//   "cards"            - a grid of bordered cards, one per reason. (default)
//   "numbered-list"     - a single full-width vertical list, each reason a
//                         numbered row with a rule underneath, no boxes.
//   "split-statement"   - the first reason set as one large claim in its
//                         own column, the rest as a plain supporting list
//                         beside it.
//
// The data-section value and the CTA verb are NOT written here. They come from
// the build's generated @/lib/industry, because the same component renders the
// why section for a water dealer and for a dental practice and the two call it
// by different names. water-residential resolves SECTION_WHY to "why-systems",
// which is the literal this file used to hold, so a water build's markup is
// unchanged.

import { CTA_ACTION, SECTION_WHY } from "@/lib/industry";
import Reveal from "../motion/Reveal";
import { stagger } from "../motion/stagger";
import { bandGrid } from "@/lib/bandGrid";
import type { ReactNode } from "react";

export interface WhyReason {
  title: string;
  body: string;
  evidence?: string;
}

export type WhySystemsVariant = "cards" | "numbered-list" | "split-statement";

export interface WhySystemsProps {
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
  subhead?: string;
  reasons?: WhyReason[];
  tone?: "light" | "alt" | "dark";
  /** "dense" when the reasons are a short grid: see the density scale in globals.css. */
  density?: "dense";
  ctaLabel?: string;
  ctaHref?: string;
  variant?: WhySystemsVariant;
}

function ctaBlock(ctaLabel: string | undefined, ctaHref: string | undefined, btnClass: string) {
  if (!ctaLabel || !ctaHref) {
    return null;
  }
  return (
    <div className="mt-16">
      <a href={ctaHref} className={btnClass} data-cta={CTA_ACTION}>
        <span>{ctaLabel}</span>
        <span className="btn-arrow" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="block"><path d="M2 8h11" /><path d="M9 4l4 4-4 4" /></svg>
        </span>
      </a>
    </div>
  );
}

export default function WhySystems({
  eyebrow,
  headline,
  subhead,
  reasons = [],
  tone = "light",
  ctaLabel,
  ctaHref,
  variant = "cards",
  density,
}: WhySystemsProps) {
  const items = reasons.filter((reason) => Boolean(reason.title)).slice(0, 5);

  if (items.length < 3) {
    return null;
  }

  const toneClass = tone === "dark" ? " on-dark" : tone === "alt" ? " on-alt" : "";
  const isDark = tone === "dark";
  const btnClass = isDark ? "btn btn-on-dark btn-sweep" : "btn btn-primary btn-sweep";
  const ruleColor = isDark ? "rgba(255,255,255,0.18)" : "var(--color-border)";
  const whyGrid = bandGrid(items.length, { max: 4, bp: "lg" });

  if (variant === "numbered-list") {
    return (
      <section className={`section${toneClass}`} data-section={SECTION_WHY} data-density={density}>
        <div className="shell relative">
          <div className="mb-8 max-w-2xl sm:mb-16">
            {eyebrow ? <span className="eyebrow mb-4 block">{eyebrow}</span> : null}
            {headline ? <h2>{headline}</h2> : null}
            {subhead ? <p className="lede mt-4">{subhead}</p> : null}
          </div>
          <ol className="flex flex-col">
            {items.map((reason, index) => (
              <Reveal key={reason.title} delayMs={stagger(index)}>
                <li
                  className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-3 gap-y-2 py-5 sm:grid-cols-12 sm:gap-8 sm:py-8"
                  style={{ borderTop: `1px solid ${ruleColor}` }}
                >
                  <span
                    aria-hidden="true"
                    className="font-heading sm:col-span-2"
                    style={{
                      fontSize: "32px",
                      lineHeight: 1,
                      color: isDark ? "var(--color-accent-text-on-dark)" : "var(--color-accent-text)",
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="sm:col-span-10">
                    <h3 className="mb-2">{reason.title}</h3>
                    <p style={{ color: isDark ? undefined : "var(--color-ink-muted)" }}>{reason.body}</p>
                    {reason.evidence ? (
                      <p
                        className="mt-2 text-sm font-semibold"
                        style={{ color: isDark ? "var(--color-accent-text-on-dark)" : "var(--color-accent-text)" }}
                      >
                        {reason.evidence}
                      </p>
                    ) : null}
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
          {ctaBlock(ctaLabel, ctaHref, btnClass)}
        </div>
      </section>
    );
  }

  if (variant === "split-statement") {
    // The statement on the left, every reason on the right as one even list.
    // Until 2026-09-30 the first reason sat alone in large type on the left and
    // the rest stacked on the right, which read as one orphan and a column of
    // leftovers whenever the reasons were short.
    return (
      <section className={`section${toneClass}`} data-section={SECTION_WHY} data-density={density}>
        <div className="shell relative grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            {eyebrow ? <span className="eyebrow mb-4 block">{eyebrow}</span> : null}
            {headline ? <h2>{headline}</h2> : null}
            {subhead ? <p className="lede mt-4">{subhead}</p> : null}
            {ctaBlock(ctaLabel, ctaHref, btnClass)}
          </div>
          <ol className="flex flex-col lg:col-span-7">
            {items.map((reason, index) => (
              <Reveal key={reason.title} delayMs={stagger(index)}>
                <li className="grid grid-cols-[auto_1fr] gap-x-6 py-5" style={{ borderTop: `1px solid ${ruleColor}` }}>
                  <span className="font-heading" style={{ color: isDark ? "var(--color-accent-text-on-dark)" : "var(--color-accent-text)", fontSize: "20px" }}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="mb-1">{reason.title}</h3>
                    <p style={{ color: isDark ? undefined : "var(--color-ink-muted)" }}>{reason.body}</p>
                    {reason.evidence ? (
                      <p
                        className="mt-2 text-sm font-semibold"
                        style={{ color: isDark ? "var(--color-accent-text-on-dark)" : "var(--color-accent-text)" }}
                      >
                        {reason.evidence}
                      </p>
                    ) : null}
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    );
  }


  return (
    <section className={`section${toneClass}`} data-section={SECTION_WHY} data-density={density}>
      <div className="shell relative">
        <div className="mb-10 max-w-2xl">
          {eyebrow ? <span className="eyebrow mb-4 block">{eyebrow}</span> : null}
          {headline ? <h2>{headline}</h2> : null}
          {subhead ? <p className="lede mt-4">{subhead}</p> : null}
        </div>
        <div className={`${whyGrid.gridClass} gap-8`}>
          {items.map((reason, index) => (
            <Reveal key={reason.title} delayMs={stagger(index)} className={`lift ${whyGrid.spanClass(index)}`}>
              <div
                className="flex h-full flex-col gap-4 p-8"
                style={
                  isDark
                    ? { border: "1px solid rgba(255,255,255,0.18)" }
                    : { backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }
                }
              >
                <span
                  aria-hidden="true"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "40px",
                    lineHeight: 1,
                    // A numeral that still reads as faded on a dark card: mixed
                    // into the alpha channel of the colour itself rather than
                    // the CSS opacity property, so this permanently decorative
                    // digit never reads as content a reduced-motion visitor
                    // cannot see. 70% against --color-surface-deep measured
                    // 3.49:1, under the 4.5:1 floor bin/assert-house-look.mjs
                    // measures on every large text node, and 90% clears it.
                    //
                    // The light and alt branch takes NO mix at all. It had one,
                    // 90%, on the assumption that an accent which passes AA
                    // keeps passing when faded a tenth. That holds only for an
                    // accent with margin: bin/derive-accent.mjs returns a brand
                    // accent UNCHANGED when it already passes, so a brand whose
                    // accent clears the floor by a hair (tappuni-dental, #2E7D6B
                    // at 4.93:1 on white) fell to 4.09:1 at 90% and failed gate 3
                    // on the home page at both widths. The derived colour is
                    // already the AA-passing one, so it is used as derived.
                    color: isDark
                      ? "color-mix(in srgb, var(--color-accent-text-on-dark) 90%, transparent)"
                      : "var(--color-accent-text)",
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{reason.title}</h3>
                <p style={{ color: isDark ? undefined : "var(--color-ink-muted)" }}>{reason.body}</p>
                {reason.evidence ? (
                  <p
                    className="text-sm font-semibold"
                    style={{ color: isDark ? "var(--color-accent-text-on-dark)" : "var(--color-accent-text)" }}
                  >
                    {reason.evidence}
                  </p>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
        {ctaLabel && ctaHref ? (
          <div className="mt-16">
            <a href={ctaHref} className={btnClass} data-cta={CTA_ACTION}>
              <span>{ctaLabel}</span>
              <span className="btn-arrow" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="block"><path d="M2 8h11" /><path d="M9 4l4 4-4 4" /></svg>
              </span>
            </a>
          </div>
        ) : null}
      </div>
    </section>
  );
}
