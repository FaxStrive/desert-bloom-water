"use client";

// Faq
//
// Accordion of question/answer pairs. Renders null with no items. Each
// panel animates its height with a CSS grid-template-rows transition
// (0fr -> 1fr), same technique as the Header dropdown, so there is no
// layout shift and no instant show/hide.
//
// Added 2026-09-30, both optional and both defaulting to the old behaviour:
// `variant: "two-column"` sets the heading beside the accordion instead of
// above it, for the page whose whole body is the questions and which
// otherwise runs a 3xl column down the left of a 1200px band; and a plain
// link under the rows, for the short lead-in set of questions on a home page
// that has to point at the page carrying the rest.

import { useId, useState } from "react";
import type { ReactNode } from "react";

export interface FaqItem {
  question: string;
  answer: string;
}

export type FaqVariant = "list" | "two-column";

export interface FaqProps {
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
  items?: FaqItem[];
  linkLabel?: string;
  linkHref?: string;
  variant?: FaqVariant;
}

export function FaqRow({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div style={{ borderBottom: "1px solid var(--color-border)" }}>
      <button
        type="button"
        className="flex w-full items-center justify-between gap-6 py-8 text-left"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <h3>{item.question}</h3>
        <span
          aria-hidden="true"
          className="shrink-0 text-2xl"
          style={{
            color: "var(--color-ink-muted)",
            transform: open ? "rotate(45deg)" : "none",
            transition: "transform var(--motion-base) ease",
          }}
        >
          +
        </span>
      </button>
      <div
        id={panelId}
        className="menu-anim grid"
        style={{ gridTemplateRows: open ? "1fr" : "0fr", transition: "grid-template-rows var(--motion-base) ease", overflow: "hidden" }}
      >
        <div className="min-h-0">
          <p className="pb-8" style={{ color: "var(--color-ink-muted)" }}>
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Faq({
  eyebrow,
  headline,
  items = [],
  linkLabel,
  linkHref,
  variant = "list",
}: FaqProps) {
  const rows = items.filter((item) => Boolean(item.question) && Boolean(item.answer));

  if (rows.length === 0) {
    return null;
  }

  const head = (eyebrow || headline) && (
    <div>
      {eyebrow ? <span className="eyebrow mb-4 block">{eyebrow}</span> : null}
      {headline ? <h2>{headline}</h2> : null}
    </div>
  );
  const accordion = (
    <>
      <div style={{ borderTop: "1px solid var(--color-border)" }}>
        {rows.map((item) => (
          <FaqRow key={item.question} item={item} />
        ))}
      </div>
      {linkLabel && linkHref ? (
        <a
          href={linkHref}
          className="mt-8 inline-block font-semibold"
          style={{ color: "var(--color-accent-text)" }}
        >
          {linkLabel}
        </a>
      ) : null}
    </>
  );

  if (variant === "two-column") {
    return (
      <section className="section" data-density="dense">
        <div className="shell grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-4">{head}</div>
          <div className="lg:col-span-8">{accordion}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="section" data-density="dense">
      <div className="shell">
        {head ? <div className="mb-12">{head}</div> : null}
        <div className="max-w-3xl">{accordion}</div>
      </div>
    </section>
  );
}
