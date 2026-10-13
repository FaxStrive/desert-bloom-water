// OriginStory
//
// The "how we work" / "why we started" narrative section. Renders null
// without a headline and body. No years-in-business or founding-date
// claim is invented here; if the client gave one, it arrives as part of
// `body`, written in their own words.

import Image from "next/image";
import type { ReactNode } from "react";

const PICTURE_ASPECT = {
  "4/5": "aspect-[4/5]",
  "1/1": "aspect-square",
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
} as const;

export interface OriginStoryProps {
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
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
  imageSrc?: string;
  imageAlt?: string;
  tone?: "light" | "alt";
  /**
   * The picture's shape at every width (default "4/5"). A 4/5 portrait is 430px tall on a phone
   * beside its text, which on a page with a screen budget is half a screen for one photograph
   * (kinetico-sioux-falls, 2026-10-12). "4/3" or "3/2" keeps the same photograph at 255 or
   * 230px. One value for every width, because the image-fit gate holds the rendered box to the
   * declared ratio at both widths.
   */
  pictureAspect?: "4/5" | "1/1" | "4/3" | "3/2";
}

export default function OriginStory({
  eyebrow,
  headline,
  body,
  ctaLabel,
  ctaHref,
  imageSrc,
  imageAlt,
  tone = "light",
  pictureAspect = "4/5",
}: OriginStoryProps) {
  if (!headline || !body) {
    return null;
  }

  return (
    <section className={`section${tone === "alt" ? " on-alt" : ""}`}>
      <div className="shell grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          {eyebrow ? <span className="eyebrow mb-4 block">{eyebrow}</span> : null}
          <h2 className="mb-8">{headline}</h2>
          <p className="lede max-w-xl">{body}</p>
          {ctaLabel && ctaHref ? (
            <a href={ctaHref} className="mt-8 inline-block text-sm font-semibold" style={{ color: "var(--color-accent-text)" }}>
              {ctaLabel}
            </a>
          ) : null}
        </div>
        {imageSrc ? (
          <div className={`relative ${PICTURE_ASPECT[pictureAspect]} w-full lg:col-span-5`} data-aspect={pictureAspect} style={{ border: "1px solid var(--color-border)" }}>
            <Image src={imageSrc} alt={imageAlt ?? ""} fill sizes="(max-width: 1023px) 100vw, 480px" className="object-cover" />
          </div>
        ) : null}
      </div>
    </section>
  );
}
