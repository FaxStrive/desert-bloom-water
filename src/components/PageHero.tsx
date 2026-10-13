// PageHero: the interior page opening. One h1, copy beside an arch-shaped picture.
// Wraps VideoHero's split variant so the page carries its single h1 and an arch-media shape.
import type { ReactNode } from "react";
import { VideoHero } from "@/components/sections";

export interface PageHeroProps {
  eyebrow?: string;
  headline: ReactNode;
  lede?: string;
  imageSrc?: string;
  imageAlt?: string;
  videoSrc?: string;
  /** A small label under the copy, e.g. "Reference image", for a picture that is not the client's own. */
  creditTag?: string;
  tone?: "light" | "alt";
  ctaLabel?: string;
  ctaHref?: string;
}

export default function PageHero({
  eyebrow,
  headline,
  lede,
  imageSrc,
  imageAlt,
  videoSrc,
  creditTag,
  tone = "light",
  ctaLabel,
  ctaHref,
}: PageHeroProps) {
  return (
    <VideoHero
      variant="split"
      tone={tone}
      mediaShape="arch"
      eyebrow={eyebrow}
      headline={headline}
      subhead={lede}
      posterSrc={imageSrc}
      posterAlt={imageAlt}
      videoSrc={videoSrc}
      primaryCtaLabel={ctaLabel}
      primaryCtaHref={ctaHref}
      extra={
        creditTag ? (
          <p className="text-sm" style={{ color: "var(--color-ink-muted)" }}>
            {creditTag}
          </p>
        ) : undefined
      }
    />
  );
}
