"use client";

import { useId, useMemo, useState } from "react";
import Image from "next/image";
import type { ClientFacts } from "./facts";
import { bandGrid } from "@/lib/bandGrid";

// Filtered, single-photo gallery. This is NOT a before/after component and
// never becomes one: the pipeline forbids before/after pairs and sliders,
// even for water filtration demos (see NO-BEFORE-AFTER). Every slot here is
// one photo with one caption.
//
// No visitor copy lives in this file. The heading and the subhead are props
// written in copy.md, because only the page knows whether the photos on it
// are the client's own jobs or reference scenes, and the words have to match
// the pictures. A component that hard-codes "Photos from real jobs" will one
// day be handed stock, and then the site lies to the visitor.
//
// With nothing to show it renders null. An empty gallery is not a layout to
// fill with pending slots or substitutes; it is a section the page does not
// have yet.

type FilterValue = "All" | string;

export type GalleryItem = {
  id: string;
  category: string;
  caption: string;
  /**
   * Present only once the client has supplied a real photo. A slot with no
   * src stays empty (a "photography pending" state), never filled with
   * stock or generated imagery, and never captioned as this client's work
   * when it is not.
   */
  src?: string;
  alt?: string;
};

export default function Gallery({
  heading,
  subhead,
  items = [],
  facts,
}: {
  /** Written in copy.md. Must describe the photos that are actually here. */
  heading?: string;
  subhead?: string;
  items?: GalleryItem[];
  facts?: ClientFacts;
}) {
  const categories = facts?.gallery?.categories?.length
    ? facts.gallery.categories
    : Array.from(new Set(items.map((item) => item.category))).filter(Boolean);
  const filters: FilterValue[] = ["All", ...categories];

  const [filter, setFilter] = useState<FilterValue>("All");
  const headingId = useId();

  const visible = useMemo(
    () => (filter === "All" ? items : items.filter((item) => item.category === filter)),
    [items, filter],
  );

  if (items.length === 0) {
    return null;
  }

  const galleryGrid = bandGrid(visible.length, { max: 3, bp: "sm", mobile: 2 });

  return (
    <section aria-labelledby={heading ? headingId : undefined} className="border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-6 sm:p-10">
      {heading ? (
        <h2 id={headingId} className="font-heading text-[var(--color-ink)]">
          {heading}
        </h2>
      ) : null}
      {subhead ? (
        <p className="mt-2 max-w-xl font-body text-[var(--color-ink-muted)]">{subhead}</p>
      ) : null}

      <div role="group" aria-label="Filter gallery by category" className="mt-8 flex flex-wrap gap-2">
        {filters.map((option) => {
          const active = filter === option;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(option)}
              className={`min-h-[44px] border px-4 py-2 font-body text-sm font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)] ${
                active
                  ? "border-[var(--color-accent-fill)] bg-[var(--color-accent-fill)] text-white"
                  : "border-[var(--color-border)] bg-white text-[var(--color-ink)] hover:border-[var(--color-accent-fill)]"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>

      <div className={`mt-8 ${galleryGrid.gridClass} gap-4`}>
        {visible.map((item, i) =>
          item.src ? (
            <figure
              key={item.id}
              className={`aspect-square overflow-hidden border border-[var(--color-border)] bg-white ${galleryGrid.spanClass(i)}`}
              data-aspect="1/1"
            >
              <div className="relative h-full w-full">
                <Image
                  src={item.src}
                  alt={item.alt ?? item.caption}
                  fill
                  sizes="(max-width: 768px) 100vw, 360px"
                  className="object-cover"
                />
              </div>
              <figcaption className="sr-only">{item.caption}</figcaption>
            </figure>
          ) : (
            <div
              key={item.id}
              className={`flex aspect-square flex-col items-center justify-center border border-dashed border-[var(--color-border)] bg-white p-4 text-center ${galleryGrid.spanClass(i)}`}
            >
              <span className="font-body text-xs font-semibold tracking-wide text-[var(--color-ink-muted)] uppercase">
                {item.caption}
              </span>
              <span className="mt-2 font-body text-sm text-[var(--color-ink)]">{item.category}</span>
            </div>
          ),
        )}
      </div>
    </section>
  );
}
