// ProofBand
//
// A thin strip that sits right under the hero. Three variants:
//   "numbers"  - a row of real client numbers (years, jobs, whatever the
//                client actually gave us). Renders null with no items.
//   "promise"  - a row of short promise lines for a client with no real
//                numbers to show. Renders null with no items. This is the
//                honest fallback, not a numbers strip with invented figures.
//   "none"     - no strip at all. Renders null unconditionally. For a page
//                where the hero should run straight into the next section
//                with no proof band between them.
//
// Never pick which variant to use inside this component from a hardcoded
// default: the caller decides, based on whether the client has real
// numbers, and passes the matching variant plus its items.

import type { ReactNode } from "react";

export interface ProofItem {
  /** "numbers" variant: a stat like "12 yrs" or "400+". "promise" variant: a short claim line, from the client. */
  value: string;
  /** One line describing the value. */
  label: string;
}

export type ProofBandVariant = "numbers" | "promise" | "none";

export interface ProofBandProps {
  variant: ProofBandVariant;
  items?: ProofItem[];
  /** "numbers" only. Sets the strip as a band of its own on a wide screen:
   *  96px above and below and larger numerals, which is what lifts it past the
   *  200px a rendered section has to reach to be counted as one (gate 11).
   *  The padding clamps to the old 40px on a phone, so a phone page does not
   *  grow. Absent by default: every existing caller renders as it did. */
  roomy?: boolean;
  /** "numbers" only. "brand" sets the strip on the brand colour (white numerals); "alt" is the tint it
   *  always was. Default "alt": every existing caller renders as it did. */
  tone?: "alt" | "brand";
  /** Anything set under the strip inside the same section, on the strip's own colour: one more
   *  figure, a caption. Absent by default: every existing caller renders as it did. The
   *  "none" variant and an empty list still render nothing. */
  children?: ReactNode;
}

export default function ProofBand({ variant, items = [], roomy = false, tone = "alt", children }: ProofBandProps) {
  if (variant === "none") {
    return null;
  }

  if (items.length === 0) {
    return null;
  }

  if (variant === "promise") {
    return (
      <section className="section on-dark" style={{ paddingTop: "clamp(20px, 3vw, 40px)", paddingBottom: "clamp(20px, 3vw, 40px)" }}>
        <div className="shell">
          <ul className={`grid grid-cols-1 divide-y sm:divide-x sm:divide-y-0 ${items.length === 4 ? "sm:grid-cols-4" : "sm:grid-cols-3"}`} style={{ borderColor: "rgba(255,255,255,0.16)" }}>
            {items.map((item, index) => (
              <li
                key={`${item.label}-${index}`}
                className="flex items-center justify-center px-6 py-2 text-center text-sm tracking-wide sm:py-4"
                style={{ borderColor: "rgba(255,255,255,0.16)" }}
              >
                {item.value ? `${item.value}: ${item.label}` : item.label}
              </li>
            ))}
          </ul>
        </div>
        {children}
      </section>
    );
  }

  return (
    <section
      className={`section ${tone === "brand" ? "on-brand" : "on-alt"}`}
      style={roomy ? { paddingTop: "clamp(40px, 6vw, 96px)", paddingBottom: "clamp(40px, 6vw, 96px)" } : { paddingTop: "40px", paddingBottom: "40px" }}
    >
      <div className="shell">
        <ul className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {items.map((item, index) => (
            <li key={`${item.value}-${index}`} className="flex flex-col gap-1">
              <span className={`font-heading text-4xl${roomy ? " lg:text-5xl" : ""}`} style={tone === "brand" ? undefined : { color: "var(--color-ink)" }}>
                {item.value}
              </span>
              <span className="text-sm" style={tone === "brand" ? undefined : { color: "var(--color-ink-muted)" }}>
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
      {children}
    </section>
  );
}
