import type { Metadata } from "next";
import { OriginStory, SpecDetail, ClosingCta } from "@/components/sections";
import { ArchMedia, ArchSeam, Bleed } from "@/components/shapes";
import PageHero from "@/components/PageHero";
import { PHONE_HREF, PHONE_LABEL, CTA_HREF, CTA_LABEL, CLOSING_SUPPORT, CERTIFICATION } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Desert Bloom Water Solutions | Kara Contreras",
  description:
    "Desert Bloom is a specialist in water filtration systems. Kara Contreras meets each person, educates them on their water and reviews pricing.",
};

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="ABOUT"
        headline="About Desert Bloom"
        lede="A specialist in water filtration systems, serving the Coachella Valley."
        imageSrc="/images/stock/header-tumbler-wood.jpg"
        imageAlt="A tumbler of still water on a pale wood table, reference image"
        creditTag="Reference image"
      />

      <OriginStory
        tone="alt"
        eyebrow="HOW KARA WORKS"
        headline="One conversation, start to finish."
        body="Kara Contreras meets each person personally. She educates you on your water and the options available, answers your questions, and reviews pricing and financing with you. The approach is premium and education-first, focused on quality, technology, and wellness."
        ctaLabel={CTA_LABEL}
        ctaHref={CTA_HREF}
      />

      <SpecDetail
        tone="light"
        cardShape="card"
        headline="What guides the work"
        cards={[
          { title: "Education first", body: "You understand your water before you are asked to decide anything." },
          { title: "Quality", body: "A 5-year warranty and a unit with 8 platinum-coated titanium plates." },
          { title: "Technology", body: "Japanese-engineered ionization and filtration, combined with electrolysis." },
          { title: "Wellness", body: "Quality and technology, in service of the water you drink at home." },
        ]}
      />

      <ArchMedia
        variant="round"
        side="right"
        tone="alt"
        imageSrc="/images/client/about-k8-close.jpg"
        imageAlt="The K8 unit, close view of the display"
        headline="Made for the desert."
        body="Desert Bloom serves 13 communities across Greater Palm Springs."
      />

      <ArchSeam into="light" />

      <Bleed
        side="right"
        fallback="panel"
        tone="light"
        headline="Certification"
        body={CERTIFICATION}
      />

      <ClosingCta
        variant="quiet"
        headline="Start with a conversation."
        subhead="Ask Kara anything about your water."
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
