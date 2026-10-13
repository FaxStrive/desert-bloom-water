// bandGrid
//
// One rule for every band that lays a list of items into columns.
//
// A band that puts N items into C columns leaves a part empty final row
// whenever N is not a multiple of C, and that half empty row reads as a
// mistake rather than as a choice. It has now been sent back twice: five
// steps laid out as four and one, then seven crate items laid out as three
// rows of two and a seventh on its own. Fixing the instance each time is how
// the fault keeps moving, so the rule lives here and every band calls it.
//
// Given the item count and the widest column count the band wants:
//
//   1. If some column count from that maximum down to two divides the item
//      count exactly, use the largest one. Four cards become two by two
//      rather than three and one.
//   2. If none does, keep the maximum and let the trailing items span the
//      remainder, so the last row still covers the full width. Seven items in
//      three columns render as three, three, and a seventh spanning all three.
//
// Both column classes and span classes are written out as literal strings so
// the Tailwind scanner sees them; nothing here is composed at runtime from
// fragments.

export type BandBreakpoint = "sm" | "md" | "lg";

export interface BandGridOptions {
  /** the widest column count this band wants at the named breakpoint */
  max: number;
  /** the breakpoint the column count applies from. Default "md". */
  bp?: BandBreakpoint;
  /** columns below that breakpoint. Default 1, which cannot orphan. */
  mobile?: 1 | 2;
  /**
   * With `mobile: 2`, the FIRST item spans both columns below the breakpoint
   * (a flagship card, full width on a phone). The two-up count then runs over
   * the remaining items, so the last item spans both only when the REST is odd.
   */
  mobileLead?: boolean;
}

export interface BandGridResult {
  /** the column count actually used at the breakpoint */
  cols: number;
  /** the grid class for the container */
  gridClass: string;
  /** the span class for the item at this index, "" for most items */
  spanClass: (index: number) => string;
}

const COLS: Record<BandBreakpoint, Record<number, string>> = {
  sm: {
    1: "sm:grid-cols-1",
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-3",
    4: "sm:grid-cols-4",
    5: "sm:grid-cols-5",
    6: "sm:grid-cols-6",
  },
  md: {
    1: "md:grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
    5: "md:grid-cols-5",
    6: "md:grid-cols-6",
  },
  lg: {
    1: "lg:grid-cols-1",
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
    4: "lg:grid-cols-4",
    5: "lg:grid-cols-5",
    6: "lg:grid-cols-6",
  },
};

const SPAN: Record<BandBreakpoint, Record<number, string>> = {
  sm: {
    2: "sm:col-span-2",
    3: "sm:col-span-3",
    4: "sm:col-span-4",
    5: "sm:col-span-5",
    6: "sm:col-span-6",
  },
  md: {
    2: "md:col-span-2",
    3: "md:col-span-3",
    4: "md:col-span-4",
    5: "md:col-span-5",
    6: "md:col-span-6",
  },
  lg: {
    2: "lg:col-span-2",
    3: "lg:col-span-3",
    4: "lg:col-span-4",
    5: "lg:col-span-5",
    6: "lg:col-span-6",
  },
};

/** the span that ends a two column mobile span at the band's own breakpoint */
const ONE_AT: Record<BandBreakpoint, string> = {
  sm: "sm:col-span-1",
  md: "md:col-span-1",
  lg: "lg:col-span-1",
};

export function bandGrid(count: number, options: BandGridOptions): BandGridResult {
  const { max, bp = "md", mobile = 1 } = options;
  const base = mobile === 2 ? "grid grid-cols-2" : "grid grid-cols-1";
  const n = Math.max(0, Math.floor(count));

  if (n <= 1) {
    return { cols: 1, gridClass: `${base} ${COLS[bp][1]}`, spanClass: () => "" };
  }

  const ceiling = Math.min(Math.max(2, Math.floor(max)), 6, n);
  let cols = ceiling;
  if (n % ceiling !== 0) {
    // With only one item over a full row, a single card stretched across the
    // whole band looks like a mistake of its own, so step down to a column
    // count that divides: four cards become two by two, not three and a
    // full width fourth. With more items than that, the band keeps its width
    // and the trailing items share the last row instead, because dropping
    // eight cards from three columns to two wastes the whole desktop.
    if (n <= ceiling + 1) {
      for (let c = ceiling - 1; c >= 2; c -= 1) {
        if (n % c === 0) {
          cols = c;
          break;
        }
      }
    } else if (n % ceiling === 1 && ceiling > 3 && n % (ceiling - 1) !== 1) {
      // A lone card on the last row spans the whole band whatever the count,
      // so one column fewer wins when it leaves no lone card: nine cards at a
      // max of four measured a full width ninth card on usa-filtration-group
      // (2026-09-30), and three by three is the grid the band meant.
      cols = ceiling - 1;
    }
  }

  const spans = new Map<number, number>();
  const remainder = n % cols;
  if (remainder > 0) {
    const share = Math.floor(cols / remainder);
    const extra = cols % remainder;
    for (let i = 0; i < remainder; i += 1) {
      spans.set(n - remainder + i, share + (i < extra ? 1 : 0));
    }
  }

  // a two column mobile band orphans on its own terms, so the last item
  // spans both columns when the count is odd. With a lead item (a flagship
  // that takes the whole row on a phone) the count that matters is the rest.
  const lead = mobile === 2 && options.mobileLead === true && n > 2;
  const rest = lead ? n - 1 : n;
  const mobileSpan = mobile === 2 && rest % 2 === 1 ? "col-span-2" : "";

  return {
    cols,
    gridClass: `${base} ${COLS[bp][cols]}`,
    spanClass: (index: number) => {
      const parts: string[] = [];
      const isLead = lead && index === 0;
      if (isLead) parts.push("col-span-2");
      if (mobileSpan && index === n - 1) parts.push(mobileSpan);
      const s = spans.get(index);
      if (isLead && !(s && s > 1)) {
        // the lead's full-width row is a phone layout only
        parts.push(ONE_AT[bp]);
      }
      if (s && s > 1) {
        // No reset at a wider breakpoint. The column count this helper emits
        // applies from its breakpoint upward and is never taken over by a
        // second step, so a span that stops at the next breakpoint up puts the
        // orphan straight back: sm:col-span-2 plus md:col-span-1 measured 50
        // percent fill at 1440 on the live page. A band that genuinely has two
        // column steps calls bandGrid twice and resets its own spans.
        parts.push(SPAN[bp][s]);
      } else if (mobileSpan && index === n - 1) {
        // the mobile span must not survive into the multi column band. This used to skip bp "lg"
        // and let the orphan's col-span-2 carry up to desktop, so five cards at lg:grid-cols-5
        // drew the fifth two columns wide (2026-10-02, usa-water-company-gen). No caller had
        // asked for mobile 2 with an lg breakpoint before, which is why nothing noticed.
        parts.push(ONE_AT[bp]);
      }
      return parts.join(" ").trim();
    },
  };
}
