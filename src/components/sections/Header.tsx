"use client";

// Header
//
// Sticky site header with an animated mobile menu and an animated Services
// dropdown. Renders null when there is no company name to show: a header
// with nothing to say for itself is not a smaller header, it is a bug.
//
// Every string and every link is a prop. No client name, phone number or
// service name is written here. The mobile menu and the Services dropdown
// both animate open and closed with a CSS grid-template-rows transition
// (0fr -> 1fr), which never causes layout shift because the collapsed
// track measures 0 and the browser interpolates the row size on its own,
// no JS height measurement needed. The track only measures 0 if its direct
// child has min-h-0 and no padding or border of its own; padding on that
// child kept the closed mobile menu 48px tall with "Home" showing through.
// Closed menus are also visibility hidden so their links cannot take focus.
//
// The full desktop nav needs about 1200px; at 1024 it wrapped the logo, the
// phone and the call to action onto two lines, so it switches at xl (1280).

import { CTA_ACTION } from "@/lib/industry";
import { useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export interface NavLink {
  href: string;
  label: string;
}

export interface HeaderProps {
  /** Company name shown as text if no logoSrc is given. Required to render anything. */
  companyName?: string;
  logoSrc?: string;
  logoAlt?: string;
  /** The mark's own width/height ratio, e.g. "2.09/1". Measure the ink, not the file. */
  logoAspect?: string;
  /** Rendered height of the mark in CSS px. The box width follows from logoAspect. */
  logoHeight?: number;
  /** Set the company name in type beside the mark, as one lockup. For a mark
   *  that is a symbol with no wordmark of its own, where showing the mark alone
   *  would leave the company unnamed in the header. The name is kept on one
   *  line, so a long name must be checked against bin/assert-header-fits.mjs at
   *  390 before it ships. */
  lockupName?: boolean;
  /** Plain nav links, rendered in order. Does not include Services. */
  navLinks?: NavLink[];
  /** Services dropdown entries. Omit or leave empty to skip the dropdown entirely. */
  servicesLabel?: string;
  servicesLinks?: NavLink[];
  /** How many plain links come before the Services dropdown. Default 1, which is
   *  where every build has always put it. 0 leads the nav with the dropdown, for a
   *  client whose copy names its treatments or services first. */
  servicesIndex?: number;
  phone?: string;
  phoneHref?: string;
  ctaLabel?: string;
  ctaHref?: string;
  /** THE CLIENT'S LIVE WORDMARK, SET IN TYPE. Two words in two weights: a light word in the case the client
   *  uses and a bold one beside it (Tappuni Dental's live header reads a light lowercase "tappuni" beside a
   *  bold "DENTAL"). Used when the client's logo file is too small or too plain to reuse: the rebuild sets
   *  the same form crisply and does not invent a mark. The bold word is set in capitals. `companyName` stays
   *  the accessible name. Ignored when a `logoSrc` is given. */
  wordmark?: { light: string; bold: string };
  /** A line under the wordmark, the client's own tagline. Hidden under 640px so a phone header stays one
   *  row. Only drawn with `wordmark`. */
  tagline?: string;
  /** "dark" sets the bar in the page's dark field (`--color-surface-deep`) with white type, the way a
   *  client whose live site has a charcoal header band keeps it. "light" is the default and changes nothing. */
  tone?: "light" | "dark";
}

/** Parse a "w/h" ratio string. Falls back to 4/1, the old hardcoded box. */
function ratioOf(aspect: string): number {
  const m = /^\s*(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)\s*$/.exec(aspect);
  if (!m) return 4;
  const w = parseFloat(m[1]);
  const h = parseFloat(m[2]);
  if (!w || !h) return 4;
  return w / h;
}

export default function Header({
  companyName,
  logoSrc,
  logoAlt,
  logoAspect = "4/1",
  logoHeight = 56,
  lockupName = false,
  navLinks = [],
  servicesLabel,
  servicesLinks = [],
  servicesIndex = 1,
  phone,
  phoneHref,
  ctaLabel,
  ctaHref,
  wordmark,
  tagline,
  tone = "light",
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const menuId = useId();
  const servicesId = useId();

  if (!companyName && !logoSrc) {
    return null;
  }

  const hasServices = servicesLinks.length > 0;
  const logoBoxWidth = Math.round(logoHeight * ratioOf(logoAspect));
  const dark = tone === "dark";
  // On the dark bar every colour that was the ink is white, the muted sub-links are a solid light step (not a
  // translucent one, so the contrast gate reads a real colour), and the services panel stays a light card
  // with its own ink, because a white link on a white card is the failure this prop must not cause.
  const barInk = dark ? "#ffffff" : "var(--color-ink)";
  const subInk = dark ? "#d9dcde" : "var(--color-ink-muted)";

  return (
    <header
      className={`sticky top-0 z-50${dark ? " on-dark" : ""}`}
      data-header-tone={tone}
      style={{
        backgroundColor: dark ? "var(--color-surface-deep)" : "var(--color-surface)",
        borderBottom: dark ? "1px solid rgba(255,255,255,0.14)" : "1px solid var(--color-border)",
      }}
    >
      {/* THE WORDMARK GETS ITS OWN COLUMN AND A REAL GAP.
          justify-between alone lets the brand and the nav meet in the middle
          and, with a text wordmark, overlap: measured at 1440 on a build with
          a long name, "RELIANCE WATER CO" ended at x=320 and the first nav
          item began at x=317. A text wordmark is not a fixed-width image, so
          this is a permanent layout problem rather than one client's bad luck.
          shrink-0 stops the brand being compressed, min-w-0 lets the nav be
          the thing that gives, and gap-12 is the 48px of air between them
          that bin/assert-header-fits.mjs wants at every width. */}
      <div className="shell flex h-20 items-center justify-between gap-12">
        <Link href="/" className="flex shrink-0 items-center gap-3" style={{ color: barInk }}>
          {logoSrc ? (
            /* A client mark that has been through bin/logo-prepare.mjs is a
               true cut-out: the ink on transparency, nothing else. That is the
               one kind of image allowed object-fit: contain
               (bin/assert-image-fit.mjs gate 12 exempts a declared cut-out and
               nothing else). It is marked data-cutout here so the claim is
               auditable.

               The box is SIZED FROM THE MARK, not from a fixed 4/1 guess. A
               logo plate almost always ships with padding baked in, and a box
               wider than the mark does not make the mark bigger: contain fits
               by the long side, so a 2.19/1 mark in a 4/1 box renders at half
               the header height with dead space beside it. logoAspect is the
               mark's own ratio, printed by bin/logo-prepare.mjs, and the width
               follows from it, so the mark fills the height it was given on
               every client. */
            <span
              className="relative block"
              style={{ height: logoHeight + "px", width: logoBoxWidth + "px" }}
              data-aspect={logoBoxWidth + "/" + logoHeight}
              data-cutout="true"
            >
              <Image
                src={logoSrc}
                alt={lockupName ? "" : logoAlt ?? companyName ?? ""}
                fill
                sizes={logoBoxWidth + "px"}
                className="object-contain object-left"
              />
            </span>
          ) : wordmark ? (
            <span className="flex flex-col" data-wordmark="">
              <span className="font-heading whitespace-nowrap text-[1.625rem] leading-none sm:text-[1.875rem]">
                <span style={{ fontWeight: 300, letterSpacing: "-0.02em" }}>{wordmark.light}</span>
                <span className="uppercase" style={{ fontWeight: 700, letterSpacing: "0.01em", marginLeft: "0.1em" }}>{wordmark.bold}</span>
              </span>
              {tagline ? (
                <span className="mt-1.5 hidden whitespace-nowrap text-[0.75rem] leading-none sm:block" style={{ color: subInk, letterSpacing: "0.02em" }}>
                  {tagline}
                </span>
              ) : null}
            </span>
          ) : (
            <span className="font-heading text-lg font-semibold uppercase tracking-tight">{companyName}</span>
          )}
          {/* A symbol-only mark leaves the company unnamed. lockupName sets the
              name in type beside it so the two read as one lockup: same
              baseline, one gap, no rule or plate between them. The alt text
              becomes empty in that case, because the name is already in the
              document as text and a screen reader should not hear it twice.
              The name never wraps: bin/assert-header-fits.mjs fails a text run
              that occupies two lines, so the size steps down at 390 instead. */}
          {logoSrc && lockupName && companyName ? (
            <span
              className="font-heading whitespace-nowrap text-[0.8125rem] font-semibold uppercase leading-none tracking-tight sm:text-base xl:text-lg"
              data-lockup-name="true"
            >
              {companyName}
            </span>
          ) : null}
        </Link>

        <nav className="hidden items-center gap-8 whitespace-nowrap xl:flex" aria-label="Primary">
          {navLinks.slice(0, servicesIndex).map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium">
              {link.label}
            </Link>
          ))}

          {hasServices ? (
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1 text-sm font-medium"
                aria-expanded={servicesOpen}
                aria-controls={servicesId}
                onClick={() => setServicesOpen((value) => !value)}
              >
                {servicesLabel ?? "Services"}
                {/* An inline SVG chevron, not a text glyph. The caret used to
                    be the small triangle characters that face up and down, which
                    inherit whatever the font fallback chain happens to give
                    them: a different weight, a different baseline, sometimes a
                    box. The house rule is no stray glyphs in output, and a
                    caret drawn as a path renders identically on every machine
                    and rotates rather than swapping to a second character. */}
                <span
                  aria-hidden="true"
                  className="block"
                  style={{
                    transform: servicesOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform var(--motion-fast) var(--motion-ease, ease)",
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" focusable="false" className="block">
                    <path d="M2 3.75 L5 6.75 L8 3.75" />
                  </svg>
                </span>
              </button>
              <div
                id={servicesId}
                className="menu-anim absolute left-0 top-full grid w-64"
                style={{
                  gridTemplateRows: servicesOpen ? "1fr" : "0fr",
                  transition: "grid-template-rows var(--motion-base) ease, visibility var(--motion-base)",
                  overflow: "hidden",
                  visibility: servicesOpen ? "visible" : "hidden",
                }}
              >
                <div
                  className="min-h-0"
                  style={{
                    backgroundColor: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    color: "var(--color-ink)",
                  }}
                >
                  <ul className="flex flex-col p-2">
                    {servicesLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="block px-4 py-3 text-sm"
                          onClick={() => setServicesOpen(false)}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : null}

          {navLinks.slice(servicesIndex).map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-6 whitespace-nowrap xl:flex">
          {phone ? (
            <a href={phoneHref ?? `tel:${phone}`} className="text-sm font-medium">
              {phone}
            </a>
          ) : null}
          {ctaLabel && ctaHref ? (
            <Link href={ctaHref} className="btn btn-primary btn-sweep" data-cta={CTA_ACTION}>
              <span>{ctaLabel}</span>
              <span className="btn-arrow" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="block"><path d="M2 8h11" /><path d="M9 4l4 4-4 4" /></svg>
              </span>
            </Link>
          ) : null}
        </div>

        <button
          type="button"
          className="flex h-11 w-11 flex-col items-end justify-center gap-[6px] xl:hidden"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span
            aria-hidden="true"
            className="block h-[2px] w-6"
            style={{
              backgroundColor: barInk,
              transform: menuOpen ? "translateY(8px) rotate(45deg)" : "none",
              transition: "transform var(--motion-base) ease",
            }}
          />
          <span
            aria-hidden="true"
            className="block h-[2px] w-4"
            style={{ backgroundColor: barInk, opacity: menuOpen ? 0 : 1, transition: "opacity var(--motion-base) ease" }}
          />
          <span
            aria-hidden="true"
            className="block h-[2px] w-6"
            style={{
              backgroundColor: barInk,
              transform: menuOpen ? "translateY(-8px) rotate(-45deg)" : "none",
              transition: "transform var(--motion-base) ease",
            }}
          />
        </button>
      </div>

      <nav
        id={menuId}
        aria-label="Primary, mobile"
        className="menu-anim grid xl:hidden"
        style={{
          gridTemplateRows: menuOpen ? "1fr" : "0fr",
          transition: "grid-template-rows var(--motion-base) ease, visibility var(--motion-base)",
          overflow: "hidden",
          visibility: menuOpen ? "visible" : "hidden",
          borderTop: menuOpen ? (dark ? "1px solid rgba(255,255,255,0.14)" : "1px solid var(--color-border)") : "none",
        }}
      >
        <div className="min-h-0 overflow-hidden">
        <ul className="shell flex flex-col gap-5 py-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="text-base font-medium" onClick={() => setMenuOpen(false)}>
                {link.label}
              </Link>
            </li>
          ))}
          {hasServices ? (
            <li className="flex flex-col gap-4">
              <span className="text-base font-medium">{servicesLabel ?? "Services"}</span>
              <ul className="flex flex-col gap-4 pl-4">
                {servicesLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm"
                      style={{ color: subInk }}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ) : null}
          {phone ? (
            <li>
              <a href={phoneHref ?? `tel:${phone}`} className="text-base font-medium">
                {phone}
              </a>
            </li>
          ) : null}
          {ctaLabel && ctaHref ? (
            <li>
              <Link href={ctaHref} className="btn btn-primary btn-sweep" data-cta={CTA_ACTION} onClick={() => setMenuOpen(false)}>
                <span>{ctaLabel}</span>
                <span className="btn-arrow" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="block"><path d="M2 8h11" /><path d="M9 4l4 4-4 4" /></svg>
                </span>
              </Link>
            </li>
          ) : null}
        </ul>
        </div>
      </nav>
    </header>
  );
}
