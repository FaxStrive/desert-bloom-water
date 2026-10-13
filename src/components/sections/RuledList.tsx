// RuledList (library candidate)
//
// A short list of facts set as ruled rows with large numerals, the heading and intro in a
// left column. For a band that would otherwise be a heading and three short lines floating
// in the page. Props: tone, eyebrow, headline, intro, items. Renders null without items.

import type { ReactNode } from "react";

export interface RuledListProps {
  tone?: "light" | "alt";
  eyebrow?: string;
  headline?: ReactNode;
  intro?: string;
  items?: { title: string; text?: string }[];
}

export default function RuledList({ tone = "alt", eyebrow, headline, intro, items = [] }: RuledListProps) {
  if (!headline || items.length === 0) return null;
  return (
    <section className={`section${tone === "alt" ? " on-alt" : ""}`} data-density="dense">
      <div className="shell grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          {eyebrow ? <span className="eyebrow mb-4 block">{eyebrow}</span> : null}
          <h2>{headline}</h2>
          {intro ? <p className="lede mt-6">{intro}</p> : null}
        </div>
        <ol className="lg:col-span-7">
          {items.map((item, i) => (
            <li
              key={item.title}
              className="grid grid-cols-[auto_1fr] items-baseline gap-x-6 py-7"
              style={{ borderTop: "1px solid var(--color-rule, rgba(0,0,0,0.18))", borderBottom: i === items.length - 1 ? "1px solid var(--color-rule, rgba(0,0,0,0.18))" : undefined }}
            >
              <span
                className="font-heading"
                aria-hidden="true"
                style={{ fontSize: "clamp(40px, 5vw, 72px)", lineHeight: 1, color: "var(--color-accent-text)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-xl">{item.title}</h3>
                {item.text ? <p className="mt-1" style={{ color: "var(--color-ink-muted)" }}>{item.text}</p> : null}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
