// Shared strings and links. Every string here comes from copy.md or the client's record.
import { facts } from "@/lib/facts";

export const COMPANY = facts.companyName ?? "Desert Bloom Water Solutions";
export const PHONE = facts.phone ?? "760-812-9119";
export const PHONE_HREF = facts.phoneHref ?? "tel:7608129119";
export const PHONE_LABEL = `Call ${PHONE}`;
export const EMAIL = facts.email ?? "karancontreras@gmail.com";
export const HOURS = "Monday to Saturday, 9am to 5pm Pacific";

export const CTA_LABEL = "Book a water conversation";
export const CTA_HREF = "/contact";

export const CERTIFICATION =
  "Enagic K8 is certified to applicable NSF/ANSI standards and carries applicable certifications for the U.S. market.";

export const CITIES = [
  "Palm Springs",
  "Cathedral City",
  "Rancho Mirage",
  "Palm Desert",
  "Indian Wells",
  "La Quinta",
  "Indio",
  "Coachella",
  "Desert Hot Springs",
];
export const UNINCORPORATED = ["Bermuda Dunes", "Thousand Palms", "Sky Valley", "Indio Hills"];
export const ZIPS = [
  "92201", "92203", "92210", "92211", "92234", "92236", "92240",
  "92241", "92253", "92260", "92262", "92264", "92270", "92276",
];

export const NAV_LINKS = [
  { href: "/service-areas", label: "Service Area" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
export const LEARN_LINKS = [
  { href: "/learn/how-it-works", label: "How it works" },
  { href: "/services/k8-water-system", label: "The K8" },
  { href: "/learn/your-water", label: "Your water" },
];
export const FOOTER_LINKS = [
  { href: "/privacy", label: "Privacy" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
  { href: "/gallery", label: "Gallery" },
];

export const CLOSING_SUPPORT = {
  primary: "Pricing and financing reviewed with you",
  secondary: HOURS,
};
