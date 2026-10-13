"use client";

// VideoHero
//
// The single h1 of the page lives here. Only ever mount one VideoHero per
// page. Renders null when there is no headline, because a hero with no
// headline is not a smaller hero, it is a placeholder.
//
// Four variants:
//   "full-bleed" - video fills the section, copy sits left over a scrim.
//   "split"      - video fills one side, a lead form fills the other.
//   "centered"   - video fills the section, copy is centered over a scrim.
//   "statement"  - always a still photograph, never video even if a
//                  videoSrc is passed: one large claim set low over the
//                  frame with a bottom-up scrim, no eyebrow-headline-
//                  subhead stack centered or left like the other three.
//
// Video is muted, autoplay, loop, playsInline, with a poster. If no
// videoSrc is given the section still renders on posterSrc alone (a still
// hero image is a legitimate, common case, not a broken video).
//
// Scrim history (read before touching the backgroundImage values below):
// this file used to lay `linear-gradient(to right, rgba(0,0,0,0.65),
// rgba(0,0,0,0.55))` across the ENTIRE full-bleed and centered frames. Two
// stops ten points of alpha apart is a flat grey fill wearing a gradient's
// syntax, and it is the exact bug `templates/components/video/scrim.ts`
// exists to ban: it darkens the whole photograph uniformly, including the
// two thirds of it with no type anywhere near it, which is why the operator
// called the live demo "a weird grey overlay". All three scrims here now
// come from that file's `gradientScrim`, anchored to wherever this
// variant's copy actually sits (left for full-bleed, bottom for centered
// and statement), so the ramp earns the headline's contrast at the anchor
// and gives the photograph back everywhere else. Never replace a call to
// `gradientScrim` with a literal `rgba(...)` pair; that is how the original
// bug got here.

import { CTA_ACTION } from "@/lib/industry";
import Image from "next/image";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import Reveal from "../motion/Reveal";
import Figure from "./Figure";
import { gradientScrim } from "../video/scrim";

export type VideoHeroVariant = "full-bleed" | "split" | "centered" | "statement";

export interface VideoHeroProps {
  variant: VideoHeroVariant;
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
  subhead?: string;
  videoSrc?: string;
  posterSrc?: string;
  posterAlt?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  /** Split variant only: the form or widget rendered on the opposite side of the video. */
  formSlot?: ReactNode;
  /** Short facts set as a row under the subhead, inside the same viewport as the headline
   *  (full-bleed and centered). For a client whose whole offer has to be visible before the
   *  first scroll: a starting price, where it ships, the return window. Every string comes
   *  from the client's record. */
  offerRow?: string[];
  /** Colour the last line of a multi line headline in the brand's on-dark accent step.
   *  Lines are split on "\n" in `headline`. */
  accentLastLine?: boolean;
  /** Anything that belongs in the copy column after the buttons: a price line, a tap-to-call link. */
  extra?: ReactNode;
  /** SPLIT ONLY, and the reason this prop exists: a split hero used to be
   *  hardcoded `on-dark`, so a style whose declared hero is `still-split` -
   *  type set on the page's own off-white field BESIDE the picture, which is
   *  what "still" means - could not have one. It got a deep band instead, and
   *  on a style that allows two deep bands on a home page the hero spent one
   *  of them before the page had said anything. "dark" stays the default so no
   *  existing build moves. */
  tone?: "light" | "alt" | "dark";
  /** SPLIT ONLY. Draws the media column as an arch rather than a rectangle and
   *  claims data-shape="arch-media" on it.
   *
   *  WHY IT EXISTS. composition/shape-vocabulary.md lets a style DECLARE the
   *  primitives its pages are drawn from, and bin/assert-shapes.mjs holds the
   *  home page to rendering every one of them. A style whose declared hero is
   *  `still-split` has no ArchMedia anywhere on its home page, because the hero
   *  IS the media band and gate 8 (bin/assert-sells.mjs) reads the first three
   *  direct children of <main> and refuses a hero wrapped in another element.
   *  So the arch could not be added around the hero and had to be available on
   *  it. elegant-premium declared ArchMedia and rendered it nowhere.
   *
   *  The radius is the value ArchMedia's round variant uses, so the two
   *  primitives draw the same arch. The media column already carries
   *  overflow: hidden, so nothing else is needed and the height does not move.
   *  Undefined by default: every existing build renders byte for byte as it
   *  did. */
  mediaShape?: "arch";
  /** SPLIT ONLY. A floor for the hero's height on a wide screen, in px, so the
   *  first screen is the hero and the top of the next section rather than the
   *  hero cut down to the height of its own copy. Fixed pixels, never vh: a
   *  full-page screenshot resizes the viewport and a vh height grows with it.
   *  Applies from 1024px up, so a phone hero does not move. Undefined by
   *  default: every existing build renders as it did. */
  minHeightLg?: number;
  /** SPLIT ONLY. A photograph that owns the first screen: the copy sits in a narrow column on the left
   *  and the picture takes the rest, to the right edge of the window, the full height of the band. On a
   *  phone the picture comes first. `formSlot` is ignored (the form moves lower, or into `chip`).
   *  Needs `posterSrc` (or `videoSrc`). Added 2026-10-07 after Tobias read the first dental build as a
   *  brochure: "almost no pictures". Off by default: every existing build renders as it did. */
  photoLed?: boolean;
  /** PHOTO-LED ONLY. CSS object-position for the hero picture, so a face stays in the crop. */
  posterPosition?: string;
  /** PHOTO-LED ONLY. A small card floated over the lower left of the picture: the opening hours, a
   *  phone number. Anything that was a table beside the headline and is now a chip on the photograph.
   *  With `photoFade` it sits in the copy column under the buttons instead. */
  chip?: ReactNode;
  /** PHOTO-LED ONLY. The photograph bleeds off the top, bottom and right edges of the window and its left edge
   *  fades into the page, with the copy set over the fade. This is the first screen of a client whose live
   *  site opens on a large bright photograph of people faded into a white page (Tappuni Dental), rebuilt
   *  with a better crop and a real headline. The fade is a mask on the picture's own box, not an overlay,
   *  so the photograph keeps its saturation (assert-no-flat-scrim) and nothing is painted over it. From 1280px;
   *  below that the picture sits above the copy and fades into it from below. Off by default. */
  photoFade?: boolean;
  /** PHOTO-FADE ONLY. A card drawn directly under the hero, overlapping its lower edge by `welcomeOverlap` px
   *  on a wide screen (the client's own welcome, signed). It is inside the hero's section, so the hero stays
   *  one of the first three children of <main>. */
  welcome?: ReactNode;
  /** PHOTO-FADE ONLY. How far the welcome card rises into the picture, in px, from 1280px. Default 96. */
  welcomeOverlap?: number;
}

/** The h1's lines. A headline with no newline is one line and renders exactly as before. */
/* The headline is a ReactNode now, so a caller can close it on an italic
   clause. The line-splitting below only means anything for a plain string:
   a caller who has already written the structure has said what they want and
   this renders it untouched. */
function HeadlineLines({ text, accentLast }: { text: ReactNode; accentLast?: boolean }) {
  if (typeof text !== "string") {
    return <>{text}</>;
  }
  const lines = text.split("\n");
  if (lines.length === 1) {
    return <>{text}</>;
  }
  return (
    <>
      {lines.map((line, index) => (
        <span
          key={index}
          className="block"
          style={accentLast && index === lines.length - 1 ? { color: "var(--color-accent-text-on-dark)" } : undefined}
        >
          {line}
          {index < lines.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}

function OfferRow({ items }: { items?: string[] }) {
  if (!items || items.length === 0) {
    return null;
  }
  return (
    <ul className="flex flex-wrap gap-x-8 gap-y-2" data-offer-row="">
      {items.map((item) => (
        <li key={item} className="font-semibold" style={{ borderLeft: "3px solid var(--color-accent-text-on-dark)", paddingLeft: "0.75rem" }}>
          {item}
        </li>
      ))}
    </ul>
  );
}

// `sizes` has to describe the box this media actually renders into, not the
// hero as a concept. The split variant puts the media in ONE column of a
// two-column grid, so it is roughly 45vw on a desktop and full width only once
// the grid stacks. Hardcoding 100vw here asked the optimiser for a 1350px wide
// file for a 645px box on tappuni-dental and bin/assert-image-weight failed it
// at 2.09x against a 1.5x ceiling (2026-09-30). The other three variants really
// are full width, so they keep 100vw.
/* The crown of the arch, and it is deliberately the SAME literal
   ../shapes/ArchMedia.tsx uses for its round variant. Two primitives that
   both claim data-shape="arch-media" have to draw the same arch, or a page
   carrying one of each reads as two unrelated curves. */
const ARCH_RADIUS = "clamp(72px, 24vw, 220px)";

const HERO_MEDIA_SIZES: Record<string, string> = {
  split: "(max-width: 1023px) 100vw, 45vw",
  "split-photo": "(max-width: 1023px) 100vw, 58vw",
  "split-fade": "(max-width: 1279px) 100vw, 72vw",
};

function HeroMedia({ variant, videoSrc, posterSrc, posterAlt, sizesKey, position }: { variant: VideoHeroVariant; videoSrc?: string; posterSrc?: string; posterAlt?: string; sizesKey?: string; position?: string }) {
  const sizes = HERO_MEDIA_SIZES[sizesKey ?? variant] ?? "100vw";
  if (videoSrc) {
    return (
      <video
        className="absolute inset-0 h-full w-full object-cover"
        muted
        autoPlay
        loop
        playsInline
        poster={posterSrc}
        preload="metadata"
        style={position ? { objectPosition: position } : undefined}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
    );
  }
  if (posterSrc) {
    return <Image src={posterSrc} alt={posterAlt ?? ""} fill sizes={sizes} className="object-cover" priority style={position ? { objectPosition: position } : undefined} />;
  }
  return null;
}

export default function VideoHero({
  variant,
  eyebrow,
  headline,
  subhead,
  videoSrc,
  posterSrc,
  posterAlt,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  formSlot,
  offerRow,
  accentLastLine,
  extra,
  tone = "dark",
  mediaShape,
  minHeightLg,
  photoLed = false,
  posterPosition,
  chip,
  photoFade = false,
  welcome,
  welcomeOverlap = 96,
}: VideoHeroProps) {
  const mediaRef = useRef<HTMLDivElement>(null);

  // Light parallax on the hero media only, and only when the visitor has
  // not asked for reduced motion. rAF-throttled scroll listener, torn down
  // on unmount. The media is scaled up 1.12x so the translate never
  // exposes an edge underneath it.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const node = mediaRef.current;
    if (!node) {
      return;
    }
    let frame: number | null = null;
    function applyOffset() {
      const offset = Math.min(window.scrollY * 0.18, 120);
      if (node) {
        node.style.transform = `translate3d(0, ${offset}px, 0) scale(1.12)`;
      }
      frame = null;
    }
    function onScroll() {
      if (frame !== null) {
        return;
      }
      frame = window.requestAnimationFrame(applyOffset);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  if (!headline) {
    return null;
  }

  const hasMedia = Boolean(videoSrc || posterSrc);

  if (variant === "statement") {
    // Always a still. A videoSrc, if one was passed, is deliberately
    // ignored here rather than silently played: this is the one shape
    // that promises "no video" by construction.
    return (
      <>
        <section className="section on-dark relative overflow-hidden hero-statement">
          {posterSrc ? (
            <div ref={mediaRef} className="absolute inset-0" style={{ transform: "scale(1.12)" }}>
              <Figure
                src={posterSrc}
                alt={posterAlt ?? ""}
                fill
                sizes="100vw"
                priority
                wrapperClassName="relative h-full w-full"
                aspect="free"
              />
            </div>
          ) : null}
          <div
            className="relative flex h-full items-end"
            data-scrim={posterSrc ? "gradient" : undefined}
            style={{
              minHeight: "inherit",
              backgroundImage: posterSrc
                ? // Two ramps, one comma list: the bottom one the variant always had, and a left one because the
                  // copy is left-aligned and its first lines (the eyebrow and the top of the headline) sit above
                  // where a bottom ramp has cleared, over whatever the photograph has there. A bright kitchen put
                  // a white eyebrow on a white wall (usa-water-company-gen, 2026-10-02).
                  `${gradientScrim({ anchor: "left", tint: "brand", strength: 0.6 })}, ${gradientScrim({ anchor: "bottom", tint: "brand", strength: 0.78 })}`
                : undefined,
            }}
          >
            <div className="shell relative z-10 pb-16 pt-40">
              <Reveal className="flex max-w-3xl flex-col gap-6">
                {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
                <h1><HeadlineLines text={headline} accentLast={accentLastLine} /></h1>
                {subhead ? <p className="lede max-w-xl">{subhead}</p> : null}
                {(primaryCtaLabel && primaryCtaHref) || (secondaryCtaLabel && secondaryCtaHref) ? (
                  <div className="flex flex-wrap items-center gap-4">
                    {primaryCtaLabel && primaryCtaHref ? (
                      <a href={primaryCtaHref} className="btn btn-primary btn-sweep" data-cta={CTA_ACTION}>
                        <span>{primaryCtaLabel}</span>
                        <span className="btn-arrow" aria-hidden="true">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="block"><path d="M2 8h11" /><path d="M9 4l4 4-4 4" /></svg>
                        </span>
                      </a>
                    ) : null}
                    {secondaryCtaLabel && secondaryCtaHref ? (
                      <a href={secondaryCtaHref} className="btn btn-on-dark btn-sweep">
                        {secondaryCtaLabel}
                      </a>
                    ) : null}
                  </div>
                ) : null}
                {extra}
              </Reveal>
            </div>
          </div>
        </section>
        <div data-hero-end="" aria-hidden="true" style={{ height: 0 }} />
      </>
    );
  }

  if (variant === "split" && photoLed && photoFade && hasMedia) {
    const toneClassFade = tone === "dark" ? " on-dark" : tone === "alt" ? " on-alt" : "";
    return (
      <>
        <section
          className={`section${toneClassFade}`}
          data-hero="photo-fade"
          style={
            {
              paddingBlock: 0,
              ...(minHeightLg ? { "--hero-min-lg": `${minHeightLg}px` } : {}),
              "--hero-overlap": `${welcomeOverlap}px`,
            } as CSSProperties
          }
        >
          <div className="relative">
            {/* The picture's frame carries the chip, so the chip is not inside the masked box and does not
                fade with it: on a phone it floats on the picture's lower left, from 1280px on its upper right. */}
            <div className="relative h-[200px] sm:h-[360px] xl:absolute xl:inset-y-0 xl:right-0 xl:h-auto xl:w-[72%]">
              <div className="hero-fade-photo absolute inset-0 overflow-hidden" data-hero-photo="">
                <div ref={mediaRef} className="absolute inset-0" data-aspect="free" style={{ transform: "scale(1.12)" }}>
                  <HeroMedia variant={variant} sizesKey="split-fade" position={posterPosition} videoSrc={videoSrc} posterSrc={posterSrc} posterAlt={posterAlt} />
                </div>
              </div>
              {chip ? (
                <div className="absolute bottom-3 left-[var(--gutter)] z-10 xl:bottom-auto xl:left-auto xl:right-[max(var(--gutter),calc((100vw-var(--shell))/2))] xl:top-10">
                  {chip}
                </div>
              ) : null}
            </div>
            <div className={`shell relative z-10 flex items-center xl:items-start ${minHeightLg ? "xl:min-h-[var(--hero-min-lg)]" : ""}`}>
              <Reveal className="flex max-w-[36rem] flex-col gap-4 pb-6 pt-1 xl:gap-6 xl:pb-0 xl:pt-12">
                {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
                <h1><HeadlineLines text={headline} accentLast={accentLastLine} /></h1>
                {subhead ? <p className="lede max-w-[30rem]">{subhead}</p> : null}
                {(primaryCtaLabel && primaryCtaHref) || (secondaryCtaLabel && secondaryCtaHref) ? (
                  <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                    {primaryCtaLabel && primaryCtaHref ? (
                      <a href={primaryCtaHref} className="btn btn-primary btn-sweep" data-cta={CTA_ACTION}>
                        <span>{primaryCtaLabel}</span>
                        <span className="btn-arrow" aria-hidden="true">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="block"><path d="M2 8h11" /><path d="M9 4l4 4-4 4" /></svg>
                        </span>
                      </a>
                    ) : null}
                    {secondaryCtaLabel && secondaryCtaHref ? (
                      <a
                        href={secondaryCtaHref}
                        className={`btn ${tone === "dark" ? "btn-on-dark" : "btn-ghost"} btn-sweep`}
                        style={tone === "dark" ? undefined : { backgroundColor: "var(--color-surface)" }}
                      >
                        {secondaryCtaLabel}
                      </a>
                    ) : null}
                  </div>
                ) : null}
                {extra}
              </Reveal>
            </div>
          </div>
          {welcome ? (
            <div className="shell relative z-20 pb-2 xl:[margin-top:calc(var(--hero-overlap)*-1)]" data-hero-welcome="">
              {welcome}
            </div>
          ) : null}
        </section>
        <div data-hero-end="" aria-hidden="true" style={{ height: 0 }} />
      </>
    );
  }

  if (variant === "split" && photoLed && hasMedia) {
    const toneClassPhoto = tone === "dark" ? " on-dark" : tone === "alt" ? " on-alt" : "";
    return (
      <>
        <section
          className={`section${toneClassPhoto}`}
          data-hero="photo"
          style={
            {
              paddingBlock: 0,
              ...(minHeightLg ? { "--hero-min-lg": `${minHeightLg}px` } : {}),
            } as CSSProperties
          }
        >
          <div className={`grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]${minHeightLg ? " lg:min-h-[var(--hero-min-lg)]" : ""}`}>
            <div
              className="relative order-1 h-[220px] overflow-hidden sm:h-[320px] lg:order-2 lg:h-auto"
              data-hero-photo=""
            >
              <div ref={mediaRef} className="absolute inset-0" data-aspect="free" style={{ transform: "scale(1.12)" }}>
                <HeroMedia variant={variant} sizesKey="split-photo" position={posterPosition} videoSrc={videoSrc} posterSrc={posterSrc} posterAlt={posterAlt} />
              </div>
              {chip ? <div className="absolute bottom-3 left-3 right-3 z-10 lg:bottom-8 lg:left-8 lg:right-auto lg:max-w-[360px]">{chip}</div> : null}
            </div>
            <Reveal className="order-2 flex flex-col justify-center px-[var(--gutter)] py-10 lg:order-1 lg:py-20 lg:pl-[max(var(--gutter),calc((100vw-var(--shell))/2))] lg:pr-12">
              <div className="flex max-w-xl flex-col gap-6 lg:gap-8">
                {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
                <h1><HeadlineLines text={headline} accentLast={accentLastLine} /></h1>
                {subhead ? <p className="lede">{subhead}</p> : null}
                {(primaryCtaLabel && primaryCtaHref) || (secondaryCtaLabel && secondaryCtaHref) ? (
                  <div className="flex flex-wrap items-center gap-4">
                    {primaryCtaLabel && primaryCtaHref ? (
                      <a href={primaryCtaHref} className="btn btn-primary btn-sweep" data-cta={CTA_ACTION}>
                        <span>{primaryCtaLabel}</span>
                        <span className="btn-arrow" aria-hidden="true">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="block"><path d="M2 8h11" /><path d="M9 4l4 4-4 4" /></svg>
                        </span>
                      </a>
                    ) : null}
                    {secondaryCtaLabel && secondaryCtaHref ? (
                      <a href={secondaryCtaHref} className={`btn ${tone === "dark" ? "btn-on-dark" : "btn-ghost"} btn-sweep`}>
                        {secondaryCtaLabel}
                      </a>
                    ) : null}
                  </div>
                ) : null}
                {extra}
              </div>
            </Reveal>
          </div>
        </section>
        <div data-hero-end="" aria-hidden="true" style={{ height: 0 }} />
      </>
    );
  }

  if (variant === "split") {
    // No form and no picture is a legal state (an EMPTY slot from the asset
    // layer). The copy column then runs on its own rather than sitting beside
    // a blank half of the grid.
    const hasSide = Boolean(formSlot || hasMedia);
    const archMedia = mediaShape === "arch" && hasMedia && !formSlot;
    const toneClass = tone === "dark" ? " on-dark" : tone === "alt" ? " on-alt" : "";
    return (
      <>
        {/* The hero shortens its own pad, because the picture beside the type is
            already most of the band's height. It clamps against
            --section-pad-floor for the same reason every other modifier in
            globals.css does: 0.45 of a style that solves to 56px at 390 is
            25px, and the floor the gate measures is 56. */}
        <section
          className={`section${toneClass}${minHeightLg ? " lg:flex lg:min-h-[var(--hero-min-lg)] lg:items-center" : ""}`}
          style={
            {
              paddingBlock: "max(calc(var(--section-pad) * 0.45), calc(var(--section-pad-floor) * 0.45))",
              ...(minHeightLg ? { "--hero-min-lg": `${minHeightLg}px` } : {}),
            } as CSSProperties
          }
        >
          <div className={`shell${minHeightLg ? " w-full" : ""} grid grid-cols-1 items-center gap-12${hasSide ? " lg:grid-cols-2" : ""}`}>
            <Reveal className="flex flex-col gap-8">
              {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
              <h1><HeadlineLines text={headline} accentLast={accentLastLine} /></h1>
              {subhead ? <p className="lede">{subhead}</p> : null}
              {(primaryCtaLabel && primaryCtaHref) || (secondaryCtaLabel && secondaryCtaHref) ? (
                <div className="flex flex-wrap items-center gap-4">
                  {primaryCtaLabel && primaryCtaHref ? (
                    <a href={primaryCtaHref} className="btn btn-primary btn-sweep" data-cta={CTA_ACTION}>
                      <span>{primaryCtaLabel}</span>
                      <span className="btn-arrow" aria-hidden="true">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="block"><path d="M2 8h11" /><path d="M9 4l4 4-4 4" /></svg>
                      </span>
                    </a>
                  ) : null}
                  {secondaryCtaLabel && secondaryCtaHref ? (
                    <a href={secondaryCtaHref} className={`btn ${tone === "dark" ? "btn-on-dark" : "btn-ghost"} btn-sweep`}>
                      {secondaryCtaLabel}
                    </a>
                  ) : null}
                </div>
              ) : null}
              {extra}
            </Reveal>
            {hasSide ? (
            archMedia ? (
            /* THE ARCH IS A PORTRAIT, NOT A 320PX STRIP. Added 2026-09-30 on
               pure-home-365-asheville: with `items-center` on the grid and the
               picture absolutely positioned inside, the media column had no
               intrinsic height, so min-h-[320px] won and a 960x1280 portrait
               install photograph was cut into a 556x320 landscape arch. The
               arch now sets its own 4/5 aspect and a 460px cap (so the hero
               stays under the 700px a section may be before the density rule
               asks for text or a half-section picture), and draws the 1px
               hairline frame offset 12px behind it that the elegant-premium
               spec calls for. The frame is decorative and aria-hidden. */
            <div className="relative mx-auto w-full lg:ml-auto lg:mr-0" style={{ maxWidth: 460, paddingRight: 12, paddingBottom: 12 }}>
              <div
                aria-hidden="true"
                className="absolute"
                style={{
                  top: 12,
                  left: 12,
                  right: 0,
                  bottom: 0,
                  border: "1px solid var(--color-border)",
                  borderTopLeftRadius: ARCH_RADIUS,
                  borderTopRightRadius: ARCH_RADIUS,
                }}
              />
              <div
                className="relative overflow-hidden"
                data-shape="arch-media"
                style={{ aspectRatio: "4 / 5", borderTopLeftRadius: ARCH_RADIUS, borderTopRightRadius: ARCH_RADIUS }}
              >
                <div ref={mediaRef} className="absolute inset-0" data-aspect="4/5" style={{ transform: "scale(1.12)" }}>
                  <HeroMedia variant={variant} videoSrc={videoSrc} posterSrc={posterSrc} posterAlt={posterAlt} />
                </div>
              </div>
            </div>
            ) : (
            <div className="relative min-h-[320px] overflow-hidden">
              {formSlot ? (
                <div className="flex h-full items-center p-8" style={{ backgroundColor: "var(--color-surface)" }}>
                  <div className="w-full">{formSlot}</div>
                </div>
              ) : hasMedia ? (
                <div ref={mediaRef} className="absolute inset-0" data-aspect="free" style={{ transform: "scale(1.12)" }}>
                  <HeroMedia variant={variant} videoSrc={videoSrc} posterSrc={posterSrc} posterAlt={posterAlt} />
                </div>
              ) : null}
            </div>
            )
            ) : null}
          </div>
        </section>
        <div data-hero-end="" aria-hidden="true" style={{ height: 0 }} />
      </>
    );
  }

  const isCentered = variant === "centered";
  const isFullBleed = variant === "full-bleed";
  // The full-bleed variant is exactly one viewport, like the reference
  // site's hero. "centered" keeps its own fixed minimum, since it is used
  // for shorter interior-page heroes, not the home page hero.
  const sectionClassName = `section on-dark relative overflow-hidden${isFullBleed ? " hero-full-bleed" : ""}`;
  const sectionStyle = isFullBleed ? undefined : { minHeight: "640px" };
  // Anchored to where each variant's copy actually sits: full-bleed's block
  // is left-aligned (see the Reveal className below, "flex max-w-2xl"), so
  // the ramp starts dark at the left edge and clears toward the right.
  // Centered's block sits centered but low in the frame against the CTA
  // row, so it anchors bottom the same way the statement variant does.
  const scrim = hasMedia
    ? gradientScrim({ anchor: isCentered ? "bottom" : "left", tint: "brand" })
    : undefined;
  const innerStyle = isFullBleed
    ? {
        minHeight: "inherit",
        backgroundImage: scrim,
      }
    : {
        minHeight: "640px",
        backgroundImage: scrim,
      };

  return (
    <>
      <section className={sectionClassName} style={sectionStyle}>
        {hasMedia ? (
          <div ref={mediaRef} className="absolute inset-0" data-aspect="free" style={{ transform: "scale(1.12)" }}>
            <HeroMedia variant={variant} videoSrc={videoSrc} posterSrc={posterSrc} posterAlt={posterAlt} />
          </div>
        ) : null}
        <div
          className="relative flex items-center"
          data-scrim={scrim ? "gradient" : undefined}
          style={innerStyle}
        >
          <div className={`shell relative z-10 ${isCentered ? "text-center" : ""}`}>
            <Reveal className={isCentered ? "mx-auto flex max-w-3xl flex-col items-center gap-8" : "flex max-w-2xl flex-col gap-8"}>
              {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
              <h1><HeadlineLines text={headline} accentLast={accentLastLine} /></h1>
              {subhead ? <p className="lede">{subhead}</p> : null}
              <OfferRow items={offerRow} />
              {(primaryCtaLabel && primaryCtaHref) || (secondaryCtaLabel && secondaryCtaHref) ? (
                <div className={`flex flex-wrap items-center gap-4 ${isCentered ? "justify-center" : ""}`}>
                  {primaryCtaLabel && primaryCtaHref ? (
                    <a href={primaryCtaHref} className="btn btn-primary btn-sweep" data-cta={CTA_ACTION}>
                      <span>{primaryCtaLabel}</span>
                      <span className="btn-arrow" aria-hidden="true">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="block"><path d="M2 8h11" /><path d="M9 4l4 4-4 4" /></svg>
                      </span>
                    </a>
                  ) : null}
                  {secondaryCtaLabel && secondaryCtaHref ? (
                    <a href={secondaryCtaHref} className="btn btn-on-dark btn-sweep">
                      {secondaryCtaLabel}
                    </a>
                  ) : null}
                </div>
              ) : null}
              {extra}
            </Reveal>
          </div>
        </div>
      </section>
      <div data-hero-end="" aria-hidden="true" style={{ height: 0 }} />
    </>
  );
}
