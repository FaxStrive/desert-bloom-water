// Footer
//
// Static, server-rendered. Renders null when there is no company name,
// since a footer with nothing to say is not a smaller footer, it is a
// broken one. Every string is a prop; nothing here is a client fact.

import { CTA_ACTION } from "@/lib/industry";
import Image from "next/image";
import Link from "next/link";

export interface FooterNavLink {
  href: string;
  label: string;
}

/** A titled block of plain lines under the address: hours, a caveat, an after-hours note. */
export interface FooterBlock {
  heading?: string;
  lines: string[];
}

export interface FooterProps {
  companyName?: string;
  /** The client's mark. Shown in place of the text wordmark when given. */
  logoSrc?: string;
  logoAlt?: string;
  /** The mark's own width/height ratio, e.g. "2.09/1". Measure the ink, not the file. */
  logoAspect?: string;
  /** Rendered height of the mark in CSS px. The box width follows from logoAspect. */
  logoHeight?: number;
  /** Set the company name in type beside the mark, as one lockup. Use it when
   *  the mark is a symbol with no wordmark of its own. */
  lockupName?: boolean;
  address?: string;
  phone?: string;
  phoneHref?: string;
  email?: string;
  navLinks?: FooterNavLink[];
  /** Extra titled blocks of plain lines, rendered in order under the contact lines.
   *  For a business whose hours belong in the footer. Every string is the client's. */
  blocks?: FooterBlock[];
  /** Outbound links to the client's own profiles. Each opens in place, with a rel. */
  socialLinks?: FooterNavLink[];
  /** A short legal line, e.g. the registered business name. Free text, from the client. */
  legalLine?: string;
  ctaLabel?: string;
  ctaHref?: string;
  /** The client's live wordmark set in type, the same form Header takes: a light word and a bold word in
   *  capitals. Ignored when a `logoSrc` is given. */
  wordmark?: { light: string; bold: string };
  /** A line under the wordmark: the client's tagline. */
  tagline?: string;
}

/** Parse a "w/h" ratio string. Falls back to 4/1. */
function ratioOf(aspect: string): number {
  const m = /^\s*(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)\s*$/.exec(aspect);
  if (!m) return 4;
  const w = parseFloat(m[1]);
  const h = parseFloat(m[2]);
  if (!w || !h) return 4;
  return w / h;
}

export default function Footer({
  companyName,
  logoSrc,
  logoAlt,
  logoAspect = "4/1",
  logoHeight = 72,
  lockupName = false,
  address,
  phone,
  phoneHref,
  email,
  navLinks = [],
  blocks = [],
  socialLinks = [],
  legalLine,
  ctaLabel,
  ctaHref,
  wordmark,
  tagline,
}: FooterProps) {
  if (!companyName) {
    return null;
  }

  // A long link list is two columns, not one 480px tower. Added 2026-09-30 on
  // pure-home-365-asheville: eleven links in a single column made the footer
  // 584px tall, which was most of the home page's overrun against its screen
  // budget. Six or fewer links keep the original single column and widths.
  const twoColumnLinks = navLinks.length > 6;

  return (
    <footer className="on-dark">
      <div className="shell flex flex-col gap-6 py-8 sm:gap-8 sm:py-12">
        <div className="grid grid-cols-1 gap-8 sm:gap-12 md:grid-cols-12">
          <div className="flex flex-col gap-3 md:col-span-4">
            {logoSrc ? (
              /* lockupName sets the company name in type beside the mark, for a
                 symbol-only mark. The wrapper is the lockup: one row, one gap,
                 no rule or plate between the two. */
              <span className="flex items-center gap-3">
              {/* The footer is dark. A mark prepared as ink-on-transparency
                 by bin/logo-prepare.mjs needs no plate here, but a mark whose
                 ink is dark needs the light-mark-on-dark treatment the style
                 declares (.mark-on-dark in globals.css): the ground inverts and
                 is dropped by screen blending, and the ink comes back near
                 white. Either way there is no plate, no panel and no border
                 behind it, which is the thing that must never ship. */}
              <span
                className="relative block"
                style={{ height: logoHeight + "px", width: Math.round(logoHeight * ratioOf(logoAspect)) + "px" }}
                data-aspect={Math.round(logoHeight * ratioOf(logoAspect)) + "/" + logoHeight}
                data-cutout="true"
              >
                <Image
                  src={logoSrc}
                  alt={lockupName ? "" : logoAlt ?? companyName ?? ""}
                  fill
                  sizes={Math.round(logoHeight * ratioOf(logoAspect)) + "px"}
                  className="object-contain object-left"
                />
              </span>
              {lockupName && companyName ? (
                <span
                  className="font-heading text-lg font-semibold uppercase leading-none tracking-tight"
                  data-lockup-name="true"
                >
                  {companyName}
                </span>
              ) : null}
              </span>
            ) : wordmark ? (
              <span className="flex flex-col gap-1.5" data-wordmark="">
                <span className="font-heading whitespace-nowrap text-[1.75rem] leading-none">
                  <span style={{ fontWeight: 300, letterSpacing: "-0.02em" }}>{wordmark.light}</span>
                  <span className="uppercase" style={{ fontWeight: 700, letterSpacing: "0.01em", marginLeft: "0.1em" }}>{wordmark.bold}</span>
                </span>
                {tagline ? <span className="text-[0.8125rem]" style={{ color: "#d9dcde" }}>{tagline}</span> : null}
              </span>
            ) : (
              <span className="font-heading text-lg font-semibold uppercase tracking-tight">
                {companyName}
              </span>
            )}
            {address ? <p style={{ color: "rgba(255,255,255,0.72)" }}>{address}</p> : null}
            <div className="flex flex-col gap-1" style={{ color: "rgba(255,255,255,0.72)" }}>
              {phone ? (
                <span>
                  Phone: <a href={phoneHref ?? `tel:${phone}`}>{phone}</a>
                </span>
              ) : null}
              {email ? (
                <span>
                  Email: <a href={`mailto:${email}`}>{email}</a>
                </span>
              ) : null}
            </div>
            {socialLinks.length > 0 ? (
              <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
                {socialLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} rel="noopener noreferrer" className="text-sm" style={{ color: "rgba(255,255,255,0.72)" }}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
            {ctaLabel && ctaHref ? (
              <div className="mt-4" data-footer-cta="">
                <a href={ctaHref} className="btn btn-on-dark btn-sweep" data-cta={CTA_ACTION}>
                  <span>{ctaLabel}</span>
                  <span className="btn-arrow" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="block"><path d="M2 8h11" /><path d="M9 4l4 4-4 4" /></svg>
                  </span>
                </a>
              </div>
            ) : null}
          </div>

          {blocks.length > 0 ? (
            <div className={`flex flex-col gap-3 ${twoColumnLinks ? "md:col-span-4" : "md:col-span-5"}`} data-footer-blocks="">
            {blocks.map((block, index) => (
              <div key={block.heading ?? index} className="flex flex-col gap-1" style={{ color: "rgba(255,255,255,0.72)" }}>
                {block.heading ? <span className="eyebrow">{block.heading}</span> : null}
                {block.lines.map((line) => (
                  <span key={line} className="text-sm">
                    {line}
                  </span>
                ))}
              </div>
            ))}
            </div>
          ) : null}

          {navLinks.length > 0 ? (
            <div className={`flex ${twoColumnLinks ? "md:col-span-4" : "md:col-span-3"} md:justify-end`}>
              <ul className={twoColumnLinks ? "grid grid-cols-2 gap-x-8 gap-y-3 sm:gap-x-10" : "flex flex-col gap-3"}>
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm" style={{ color: "rgba(255,255,255,0.72)" }}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        {legalLine ? (
          <div className="pt-8 text-xs" style={{ borderTop: "1px solid rgba(255,255,255,0.16)", color: "rgba(255,255,255,0.78)" }}>
            {legalLine}
          </div>
        ) : null}
      </div>
    </footer>
  );
}
