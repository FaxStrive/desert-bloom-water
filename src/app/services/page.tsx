import type { Metadata } from "next";
import { SpecDetail, InfoBand, ClosingCta } from "@/components/sections";
import { ArchMedia, ArchSeam, OverlapFigure } from "@/components/shapes";
import PageHero from "@/components/PageHero";
import { PHONE_HREF, PHONE_LABEL, CTA_HREF, CTA_LABEL, CLOSING_SUPPORT } from "@/lib/content";

export const metadata: Metadata = {
  title: "The K8 Water System | Desert Bloom Water Solutions",
  description:
    "The Enagic K8 has 8 platinum-coated titanium plates, advanced filtration and a 5-year warranty. See it close up, then talk with Kara.",
};

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        eyebrow="THE K8"
        headline="The K8 water system"
        lede="One system, shown close up. Everything on this page comes from the K8 itself."
        imageSrc="/images/stock/header-pour-glass.jpg"
        imageAlt="Water pouring into a glass tumbler, reference image"
        creditTag="Reference image"
      />

      <ArchMedia
        variant="pointed"
        side="left"
        tone="light"
        imageSrc="/images/client/gallery-k8-detail.jpg"
        imageAlt="The K8 unit, close view of the display"
        eyebrow="ENAGIC K8"
        headline="Enagic K8"
        body="Eight platinum-coated titanium plates, advanced filtration and multiple water options in one unit. It combines filtration with electrolysis and comes with a 5-year warranty."
        ctaLabel="See the K8 in detail"
        ctaHref="/services/k8-water-system"
      />

      <ArchSeam into="alt" />

      <SpecDetail
        tone="alt"
        cardShape="card"
        headline="What is in the K8"
        cards={[
          { title: "8 titanium plates", body: "Platinum-coated titanium plates sit at the center of the electrolysis step." },
          { title: "Advanced filtration", body: "The water is filtered before it reaches the plates." },
          { title: "Water options", body: "More than one kind of water from the same unit. Kara goes through them with you." },
          { title: "5-year warranty", body: "Backed by a 5-year warranty on the K8." },
        ]}
      />

      <InfoBand
        tone="light"
        density="base"
        itemStyle="plain"
        headline="What Kara reviews with you"
        intro="These are the things you decide, in the order you decide them."
        items={[
          "Your water, and which options suit it.",
          "Pricing, reviewed with you personally.",
          "Financing, available and explained in conversation.",
          "Installation, arranged afterward.",
        ]}
      />

      <OverlapFigure
        variant="figure"
        imageSrc="/images/client/gallery-k8-counter.jpg"
        imageAlt="The K8 on a kitchen counter beside the faucet"
      >
        <p className="mt-3 text-sm" style={{ color: "var(--color-ink-muted)" }}>
          The K8 on a counter beside a faucet.
        </p>
      </OverlapFigure>

      <ClosingCta
        variant="band"
        headline="Talk to Kara about the K8."
        subhead="Ask your questions and hear the options."
        primaryCtaLabel={CTA_LABEL}
        primaryCtaHref={CTA_HREF}
        primaryCtaSupport={CLOSING_SUPPORT.primary}
        secondaryCtaLabel={PHONE_LABEL}
        secondaryCtaHref={PHONE_HREF}
        secondaryCtaSupport={CLOSING_SUPPORT.secondary}
      />
    </main>
  );
}
