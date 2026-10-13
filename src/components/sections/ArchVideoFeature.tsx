// ArchVideoFeature
//
// A video moment: one arch-shaped looping video beside a short explanation. The video is drawn by
// ShapedVideo in the arch shape, so the section claims data-shape="arch". Muted, looping, with a
// poster, and the poster alone under prefers-reduced-motion (ShapedVideo handles that).
// Prop-only: every string arrives from copy.md. Renders null without a headline or a video poster.
// Library candidate for templates/components/sections.
import type { ReactNode } from "react";
import ShapedVideo from "../video/ShapedVideo";
import Reveal from "../motion/Reveal";
import { stagger } from "../motion/stagger";

export interface ArchVideoStep {
  title: string;
  text: string;
}

export interface ArchVideoFeatureProps {
  eyebrow?: string;
  headline?: ReactNode;
  text?: string;
  steps?: ArchVideoStep[];
  linkLabel?: string;
  linkHref?: string;
  videoSrc?: string;
  posterSrc: string;
  posterAlt: string;
  /** A small label under the video, e.g. "Reference footage". */
  creditTag?: string;
  tone?: "light" | "alt";
  side?: "left" | "right";
}

export default function ArchVideoFeature({
  eyebrow,
  headline,
  text,
  steps = [],
  linkLabel,
  linkHref,
  videoSrc,
  posterSrc,
  posterAlt,
  creditTag,
  tone = "light",
  side = "left",
}: ArchVideoFeatureProps) {
  if (!headline || !posterSrc) {
    return null;
  }
  const mediaFirst = side === "left";
  return (
    <section className={`section${tone === "alt" ? " on-alt" : ""}`} data-section="arch-video-feature">
      <div className="shell grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className={`lg:col-span-5 ${mediaFirst ? "lg:order-1" : "lg:order-2"}`}>
          <div className="mx-auto w-full" style={{ maxWidth: 300 }}>
            <ShapedVideo shape="arch" videoSrc={videoSrc} posterSrc={posterSrc} posterAlt={posterAlt} />
            {creditTag ? (
              <p className="mt-3 text-sm" style={{ color: "var(--color-ink-muted)" }}>
                {creditTag}
              </p>
            ) : null}
          </div>
        </div>
        <div className={`lg:col-span-7 ${mediaFirst ? "lg:order-2" : "lg:order-1"}`}>
          {eyebrow ? <span className="eyebrow mb-4 block">{eyebrow}</span> : null}
          <h2>{headline}</h2>
          {text ? <p className="lede mt-4">{text}</p> : null}
          {steps.length > 0 ? (
            <ol className="mt-8 flex flex-col">
              {steps.map((step, index) => (
                <Reveal key={step.title} delayMs={stagger(index)}>
                  <li className="grid grid-cols-[auto_1fr] gap-x-6 py-5" style={{ borderTop: "1px solid var(--color-border)" }}>
                    <span className="font-heading" style={{ color: "var(--color-accent-text)", fontSize: "20px" }} aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="mb-1">{step.title}</h3>
                      <p style={{ color: "var(--color-ink-muted)" }}>{step.text}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          ) : null}
          {linkLabel && linkHref ? (
            <p className="mt-6">
              <a href={linkHref} className="font-semibold" style={{ color: "var(--color-accent-text)" }}>
                {linkLabel}
              </a>
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
