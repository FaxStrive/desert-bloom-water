// Shared shape for the client facts these four components read from.
//
// In a generated site this is what `@/lib/facts` exports (or a subset of
// it). Nothing in this file is client-specific; it only describes the
// shape. A real build's `@/lib/facts` module should satisfy this type, or
// a build script maps the onboarding record (see
// fixtures/onboarding/*.json in this repo) onto it.
//
// Every field is optional on purpose. A missing field means the component
// renders without that piece, never a placeholder number or an invented
// claim standing in for it.

export type PricingOffer = {
  /** Short name for the offer, e.g. "Monthly plan", "Cash offer". */
  name: string;
  /** Upfront cost, as the client states it. Free text, not always a number. */
  upfront?: string;
  /** Monthly cost, as the client states it. Free text, not always a number. */
  monthly?: string;
  /** Who the offer suits. One sentence. */
  bestFor?: string;
};

/**
 * The figures the savings calculator may print, every one of them supplied by
 * the client's own record (its `savings` block). There are NO library defaults:
 * a rate the record does not carry is a row the calculator does not draw, and a
 * record with none of the three rates gets no calculator at all (the component
 * renders nothing and compose leaves it off). The rate names end in Rate on
 * purpose: bin/lib/record-figures.mjs reads a number under such a key as a
 * money figure the record holds, which is how gate 5 tells a client's own
 * figure from an invented one.
 */
export type SavingsFigures = {
  /** Dollars per gallon of bottled water, as the client states it. */
  bottledRatePerGallon?: number;
  /** Dollars per person per year of soap and detergent premium. */
  soapRatePerPerson?: number;
  /** Dollars per year of appliance wear. */
  applianceBaseRate?: number;
  /**
   * How hardness scales the soap and appliance figures. All three or none.
   * Absent means the calculator draws no hardness selector and scales by 1.
   */
  hardnessMultiplier?: { mild: number; moderate: number; severe: number };
};

export type ClientFacts = {
  company?: {
    name?: string;
    phone?: string;
    phoneHref?: string;
  };
  /**
   * The real offers this client sells. PricingTable renders exactly these
   * and nothing else. An empty or missing array means PricingTable shows
   * the free-test call to action only, never a fabricated price.
   */
  offers?: PricingOffer[];
  /**
   * The single offer line used to close the savings calculator, e.g.
   * "$NN a month, no money down" (the client's own figure). Free text because financing offers
   * do not reduce to one number. Missing means the calculator closes on a
   * plain "See your offer" call to action instead of a price line.
   */
  primaryOfferLabel?: string;
  /**
   * The calculator's rates, from the record's `savings` block. Missing means
   * SavingsCalculator renders nothing: it never fills a rate in itself.
   */
  savings?: SavingsFigures;
  contact?: {
    /** Path the concern router and CTAs send visitors to. Default "/contact". */
    path?: string;
    /** Anchor used by on-page CTAs that scroll to a form instead of navigating. Default "#lead-form". */
    formAnchor?: string;
  };
  gallery?: {
    /**
     * Category labels for gallery filtering, e.g. ["Whole home", "Under
     * sink", "Well systems"]. Falls back to a generic three-category set
     * when the client has not specified their own service lines.
     */
    categories?: string[];
  };
};
