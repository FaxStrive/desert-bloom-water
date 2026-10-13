"use client";

// StickyCallBar
//
// The phone-only sticky bar: call, and get a quote. Renders null unless
// both a phone and a quote href are given, because a bar with only one
// live action is not a smaller bar, it is a broken one.
//
// Visibility uses two IntersectionObservers, no scroll listener:
//   - shown once the hero has scrolled past (the `[data-hero-end]`
//     sentinel VideoHero renders after itself, or `main > section:first-of-type`
//     when that sentinel is absent, is no longer intersecting)
//   - hidden again whenever `[data-footer-cta]` is on screen, so the bar
//     never sits on top of the thing it duplicates.

import { CTA_ACTION } from "@/lib/industry";
import { useEffect, useRef, useState } from "react";

export interface StickyCallBarProps {
  phone?: string;
  phoneLabel?: string;
  quoteHref?: string;
  quoteLabel?: string;
}

export default function StickyCallBar({
  phone,
  phoneLabel = "Call",
  quoteHref,
  quoteLabel = "Get a quote",
}: StickyCallBarProps) {
  const [heroPassed, setHeroPassed] = useState(false);
  const [footerCtaVisible, setFooterCtaVisible] = useState(false);
  const observersRef = useRef<IntersectionObserver[]>([]);

  useEffect(() => {
    const heroSentinel =
      document.querySelector("[data-hero-end]") ?? document.querySelector("main > section:first-of-type");
    const footerCta = document.querySelector("[data-footer-cta]");

    const observers: IntersectionObserver[] = [];

    if (heroSentinel) {
      const heroObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            setHeroPassed(!entry.isIntersecting);
          }
        },
        { threshold: 0 },
      );
      heroObserver.observe(heroSentinel);
      observers.push(heroObserver);
    }

    if (footerCta) {
      const footerObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            setFooterCtaVisible(entry.isIntersecting);
          }
        },
        { threshold: 0 },
      );
      footerObserver.observe(footerCta);
      observers.push(footerObserver);
    }

    observersRef.current = observers;

    return () => {
      for (const observer of observersRef.current) {
        observer.disconnect();
      }
      observersRef.current = [];
    };
  }, []);

  if (!phone || !quoteHref) {
    return null;
  }

  const shown = heroPassed && !footerCtaVisible;
  const telHref = `tel:${phone.replace(/\D/g, "")}`;

  return (
    <div className="sticky-bar" data-shown={shown} data-sticky-bar="">
      <a href={telHref}>{phoneLabel}</a>
      <a href={quoteHref} data-cta={CTA_ACTION}>
        {quoteLabel}
      </a>
    </div>
  );
}
