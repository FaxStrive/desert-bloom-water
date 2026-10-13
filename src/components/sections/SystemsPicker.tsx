"use client";

// SystemsPicker
//
// "What brought you in?" as a control, not a paragraph. A short list of starting
// points (a checkup, something that hurts, something to change); choosing one
// shows its picture, its one line and the link to the treatment page it leads
// to. It is the CHOOSE beat of the catalogue archetype (Systems, variant
// "picker"): the visitor says what they are here for before the page lists
// anything. Added 2026-10-07 as the interactive moment of the dental home page.
//
// Honest by construction. Every string is a prop from the record's copy. The
// first option is selected on first paint, so with no JavaScript, or before it
// loads, the server render shows one complete option with its link, and the
// rest are buttons that do nothing until the script arrives. Nothing is hidden
// behind a click that a visitor needs to read to act: each option's link is the
// treatment page itself.
//
// Built as a tab list (role="tablist" / "tab" / "tabpanel"), arrow keys move the
// selection, Home and End jump. Only the selected option's picture is in the
// page, so the picture floor counts what is on screen.
//
// Props: eyebrow, headline, options, tone. An option is a SystemItem: `name` is
// the button, `description` the line, `imageSrc` and `imageAlt` the picture,
// `ctaLabel` and `ctaHref` the link.

import { useId, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
import Figure from "./Figure";

export interface PickerOption {
  name: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export interface SystemsPickerProps {
  eyebrow?: string;
  headline?: ReactNode;
  options?: PickerOption[];
  tone?: "light" | "alt";
}

export default function SystemsPicker({ eyebrow, headline, options = [], tone = "light" }: SystemsPickerProps) {
  const items = options.filter((option) => Boolean(option.name));
  const [active, setActive] = useState(0);
  const base = useId();
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  if (items.length === 0) {
    return null;
  }

  const current = items[Math.min(active, items.length - 1)];

  function onKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % items.length;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index - 1 + items.length) % items.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = items.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    refs.current[next]?.focus();
  }

  return (
    <section className={`section${tone === "alt" ? " on-alt" : ""}`} data-section="treatment-picker" data-density="dense">
      <div className="shell">
        <div className="mb-8 max-w-2xl">
          {eyebrow ? <span className="eyebrow mb-4 block">{eyebrow}</span> : null}
          {headline ? <h2>{headline}</h2> : null}
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div role="tablist" aria-label={typeof headline === "string" ? headline : undefined} className="flex flex-row flex-wrap gap-2 lg:flex-col lg:gap-3">
            {items.map((option, index) => {
              const selected = index === active;
              return (
                <button
                  key={option.name}
                  ref={(node) => {
                    refs.current[index] = node;
                  }}
                  type="button"
                  role="tab"
                  id={`${base}-tab-${index}`}
                  aria-selected={selected}
                  aria-controls={`${base}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(index)}
                  onKeyDown={(event) => onKey(event, index)}
                  className="font-semibold"
                  style={
                    {
                      textAlign: "left",
                      padding: "12px 16px",
                      cursor: "pointer",
                      border: "1px solid " + (selected ? "var(--color-accent-fill)" : "var(--color-border)"),
                      backgroundColor: selected ? "var(--color-accent-fill)" : "var(--color-surface)",
                      color: selected ? "var(--color-accent-fill-ink)" : "var(--color-ink)",
                      borderRadius: "var(--radius-button, 2px)",
                      transition: "background-color var(--motion-fast), color var(--motion-fast), border-color var(--motion-fast)",
                    } as CSSProperties
                  }
                >
                  {option.name}
                </button>
              );
            })}
          </div>
          <div
            role="tabpanel"
            id={`${base}-panel`}
            aria-labelledby={`${base}-tab-${Math.min(active, items.length - 1)}`}
            className="grid grid-cols-1 items-stretch gap-0 sm:grid-cols-2"
            style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}
          >
            {current.imageSrc ? (
              <Figure
                key={current.imageSrc}
                src={current.imageSrc}
                alt={current.imageAlt ?? current.name}
                fill
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 30vw"
                wrapperClassName="relative h-[130px] w-full sm:h-auto sm:min-h-[240px]"
                wrapperStyle={{ "--figure-inset": "0px", "--image-frame": "0px" } as CSSProperties}
                aspect="free"
                style={current.imagePosition ? { objectPosition: current.imagePosition } : undefined}
              />
            ) : null}
            <div className="flex flex-col justify-center gap-3 p-5 sm:p-6">
              {current.description ? <p style={{ color: "var(--color-ink-muted)" }}>{current.description}</p> : null}
              {current.ctaLabel && current.ctaHref ? (
                <a href={current.ctaHref} className="font-semibold" style={{ color: "var(--color-accent-text)" }}>
                  {current.ctaLabel}
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
