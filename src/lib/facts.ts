// facts.ts
//
// Typed, empty facts module. The build stage fills every value in from the
// client's onboarding record. Nothing in this file may ship with a value
// belonging to any other client. If a build ever leaves one of these null or
// empty and deploys anyway, that is a bug in the build stage, not a default
// to quietly accept.

export type ServiceArea = {
  city: string;
  state: string;
};

export type Service = {
  name: string;
  description: string;
};

export type Offer = {
  headline: string;
  detail: string;
};

export type Hours = {
  day: string;
  open: string | null;
  close: string | null;
};

// HOW THE CLIENT SELLS. Read off the onboarding record's salesModel block, the
// same block bin/assert-sales-model.mjs (gate 14) reads. "online-only" means no
// territory, no van, no showroom and no appointment: the customer buys on the
// site and the system ships. Any other kind is a client who visits.
//
// `kind` is null until the build stage fills it in, and null means NEITHER
// story is told: a page that does not know how the client sells says only that
// the request arrived and that a person will reply.
export type SalesModelKind = "online-only" | "visit-based";

// `orderBy` is how an order is actually placed. "booked-call" means the site
// sells the systems (prices, specs, shipping) but takes no order itself: the
// visitor books a phone call and the order is taken on that call. null means
// the record does not say.
export type SalesModelOrderBy = "booked-call" | "site" | null;

export type SalesModel = {
  kind: SalesModelKind | null;
  orderBy?: SalesModelOrderBy;
  /** How a booked call happens: "zoom" for a Zoom call, otherwise a phone call. */
  callVia?: "phone" | "zoom" | null;
  shipsTo: string | null;
  installedBy: string | null;
};

// WHAT HAPPENS AFTER THE ORDER. Also off the record. Every field is optional
// because a claim we cannot source is not made: a null returnsWindowDays means
// the thank-you page says nothing about returns rather than inventing a window.
export type Fulfilment = {
  deliveryPromise: string | null;
  returnsWindowDays: number | null;
  returnsNote: string | null;
  supportChannels: string[];
  supportNote: string | null;
};

export type ClientFacts = {
  companyName: string | null;
  phone: string | null;
  email: string | null;
  city: string | null;
  state: string | null;
  serviceAreas: ServiceArea[];
  services: Service[];
  offers: Offer[];
  hours: Hours[];
  logoPath: string | null;
};

// Every field starts empty or null. The build stage populates this from the
// client's onboarding record before the site is ever deployed.
export const facts: ClientFacts = {
  companyName: null,
  phone: null,
  email: null,
  city: null,
  state: null,
  serviceAreas: [],
  services: [],
  offers: [],
  hours: [],
  logoPath: null,
};

// Empty on purpose, like every other value in this file. The build stage copies
// the client's own salesModel and fulfilment blocks in from the record.
export const salesModel: SalesModel = {
  kind: null,
  orderBy: null,
  callVia: null,
  shipsTo: null,
  installedBy: null,
};

export const fulfilment: Fulfilment = {
  deliveryPromise: null,
  returnsWindowDays: null,
  returnsNote: null,
  supportChannels: [],
  supportNote: null,
};
