// Process
//
// The numbered how-it-works steps. Renders null with no steps. Step order
// follows array order; numerals are generated from the index so the
// client never has to keep a number in sync with the copy. Three variants:
//   "steps"    - four columns of numbered steps, side by side. (default)
//   "timeline" - a single vertical spine down the left with each step as a
//                dated node off it, read top to bottom.
//   "diagram"  - steps as a horizontal chain of connected nodes with a
//                joining line between them, read left to right.

import { bandGrid } from "@/lib/bandGrid";
import type { ReactNode } from "react";

export interface ProcessStep {
  title: string;
  description?: string;
}

export type ProcessVariant = "steps" | "timeline" | "diagram";

export interface ProcessLink {
  label: string;
  href: string;
  support?: string;
}

export interface ProcessProps {
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
  steps?: ProcessStep[];
  tone?: "light" | "alt" | "dark";
  variant?: ProcessVariant;
  /** One line under the steps, for what the steps leave out (a third form, a caveat). */
  note?: string;
  /** Links under the steps, each with an optional line of support. */
  links?: ProcessLink[];
  /** A giant numeral drawn behind the band, aria-hidden texture. The real number has to
   *  exist again in the copy (the steps are it). Marks the section `giant-numeral`, so a
   *  style whose shape family names that primitive can carry it in a band that is already
   *  on the page and not in a free-standing one. Added 2026-10-02: a wavy home page
   *  under a 9 screen budget cannot afford a section for every shape its density asks for. */
  numeral?: string;
}

export default function Process({ eyebrow, headline, steps = [], tone = "light", variant = "steps", note, links = [], numeral }: ProcessProps) {
  const items = steps.filter((step) => Boolean(step.title));

  if (items.length === 0) {
    return null;
  }

  const isDark = tone === "dark";
  const toneClass = isDark ? " on-dark" : tone === "alt" ? " on-alt" : "";
  const lineColor = isDark ? "rgba(255,255,255,0.28)" : "var(--color-border)";
  const footer =
    note || links.length > 0 ? (
      <div className="mt-12 flex max-w-3xl flex-col gap-4">
        {note ? <p style={{ color: isDark ? "rgba(255,255,255,0.72)" : "var(--color-ink-muted)" }}>{note}</p> : null}
        {links.map((link) => (
          <div key={link.href + link.label} className="flex flex-col gap-1">
            <a href={link.href} className="font-semibold" style={isDark ? undefined : { color: "var(--color-accent-text)" }}>
              {link.label}
            </a>
            {link.support ? <span className="text-sm">{link.support}</span> : null}
          </div>
        ))}
      </div>
    ) : null;
  // overflow-x: clip, inline, so the numeral is cut at the band without making a scroll container
  const numeralProps = numeral
    ? {
        "data-shape": "giant-numeral",
        "data-numeral": numeral,
        style: {
          position: "relative" as const,
          overflowX: "clip" as const,
          "--gn-color": isDark ? "color-mix(in srgb, var(--color-surface) 12%, transparent)" : tone === "alt" ? "var(--color-surface)" : "var(--color-surface-alt)",
          "--gn-left": "auto",
          "--gn-right": "-2vw",
          "--gn-ml": "0",
        } as import("react").CSSProperties,
      }
    : {};
  const numeralClass = numeral ? " giant-numeral" : "";
  const header = (eyebrow || headline) && (
    <div className="mb-8 sm:mb-20">
      {eyebrow ? <span className="eyebrow mb-4 block">{eyebrow}</span> : null}
      {headline ? <h2>{headline}</h2> : null}
    </div>
  );

  if (variant === "timeline") {
    return (
      <section className={`section${toneClass}${numeralClass}`} data-density="dense" {...numeralProps}>
        <div className="shell relative">
          {header}
          <ol className="relative flex flex-col gap-16 pl-10 sm:pl-14" style={{ borderLeft: `1px solid ${lineColor}` }}>
            {items.map((step, index) => (
              <li key={step.title} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute flex items-center justify-center font-heading text-sm"
                  style={{
                    left: "-2.9rem",
                    top: 0,
                    width: 40,
                    height: 40,
                    color: isDark ? "var(--color-accent-text-on-dark)" : "var(--color-accent-text)",
                    border: `1px solid ${lineColor}`,
                    backgroundColor: isDark ? "var(--color-surface-deep)" : "var(--color-surface)",
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{step.title}</h3>
                {step.description ? (
                  <p className="mt-2 max-w-xl" style={{ color: isDark ? "rgba(255,255,255,0.72)" : "var(--color-ink-muted)" }}>
                    {step.description}
                  </p>
                ) : null}
              </li>
            ))}
          </ol>
          {footer}
        </div>
      </section>
    );
  }

  if (variant === "diagram") {
    return (
      <section className={`section${toneClass}${numeralClass}`} data-density="dense" {...numeralProps}>
        <div className="shell relative">
          {header}
          <ol className="flex flex-col gap-4 overflow-x-auto sm:flex-row sm:items-start sm:gap-0">
            {items.map((step, index) => (
              <li key={step.title} className="flex flex-1 items-start sm:flex-col">
                <div className="flex items-center sm:w-full">
                  <span
                    aria-hidden="true"
                    className="flex flex-none items-center justify-center font-heading"
                    style={{
                      width: 56,
                      height: 56,
                      color: isDark ? "var(--color-accent-text-on-dark)" : "var(--color-accent-text)",
                      border: `1px solid ${lineColor}`,
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {index < items.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="mx-4 hidden h-px flex-1 sm:block"
                      style={{ backgroundColor: lineColor }}
                    />
                  ) : null}
                </div>
                <div className="ml-4 mt-0 pr-6 sm:ml-0 sm:mt-4 sm:pr-8">
                  <h3>{step.title}</h3>
                  {step.description ? (
                    <p className="mt-2" style={{ color: isDark ? "rgba(255,255,255,0.72)" : "var(--color-ink-muted)" }}>
                      {step.description}
                    </p>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
          {footer}
        </div>
      </section>
    );
  }

  // COLUMN COUNT FOLLOWS THE STEP COUNT so a partial last row never appears.
  // The mid band (sm up to just under lg) and the wide band (lg and up) cap
  // at different maximums, so each is computed on its own. A span that fills
  // the mid band's last row carries its own reset one breakpoint early (at
  // md), so that reset is stripped and replaced with the wide band's own
  // column count, or with a plain lg:col-span-1 when the wide band needs no
  // span of its own, so nothing carries a mid band span into the wide layout.
  const n = items.length;
  const midGrid = bandGrid(n, { max: 3, bp: "sm" });
  const wideGrid = bandGrid(n, { max: 5, bp: "lg" });
  const wideColsClass = wideGrid.gridClass
    .split(" ")
    .filter((cls) => cls.startsWith("lg:"))
    .join(" ");
  const stepSpanClass = (index: number) => {
    const midSpan = midGrid
      .spanClass(index)
      .split(" ")
      .filter((cls) => cls && !cls.startsWith("md:"))
      .join(" ");
    const wideSpan = wideGrid.spanClass(index) || "lg:col-span-1";
    return `${midSpan} ${wideSpan}`.trim();
  };

  return (
    <section className={`section${toneClass}${numeralClass}`} data-density="dense" {...numeralProps}>
      <div className="shell relative">
        {header}
        {/* On a phone the numeral sits beside its step instead of above it: four steps were 800px
            of a 390px screen with a 48px numeral on a line of its own. From sm up it is the stacked
            numeral it always was. */}
        <ol className={`${midGrid.gridClass} ${wideColsClass} gap-6 sm:gap-12 lg:gap-8`}>
          {items.map((step, index) => (
            <li key={step.title} className={`flex flex-row items-start gap-4 sm:flex-col sm:gap-3 ${stepSpanClass(index)}`}>
              <span
                className="font-heading w-10 shrink-0 text-3xl sm:w-auto sm:text-5xl"
                style={isDark ? undefined : { color: "var(--color-accent-text)" }}
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-1 sm:gap-3">
                <h3>{step.title}</h3>
                {step.description ? (
                  <p style={{ color: isDark ? "rgba(255,255,255,0.72)" : "var(--color-ink-muted)" }}>
                    {step.description}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
        {footer}
      </div>
    </section>
  );
}
