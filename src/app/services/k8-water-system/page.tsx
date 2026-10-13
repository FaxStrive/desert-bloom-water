import type { Metadata } from "next";
import { SpecDetail, InfoBand, FullBleedBand, ClosingCta } from "@/components/sections";
import { ArchSeam, OverlapFigure } from "@/components/shapes";
import PageHero from "@/components/PageHero";
import { PHONE_HREF, PHONE_LABEL, CTA_HREF, CTA_LABEL, CLOSING_SUPPORT, CERTIFICATION } from "@/lib/content";

export const metadata: Metadata = {
  title: "Enagic K8 Water System | Desert Bloom Water Solutions",
  description:
    "Eight platinum-coated titanium plates, advanced filtration, multiple water options and a 5-year warranty. Installation $299.",
};

export default function K8Page() {
  return (
    <main>
      <PageHero
        eyebrow="WHAT IT IS"
        headline="Enagic K8"
        lede="Premium Japanese-engineered water ionization and filtration technology. The K8 goes beyond filtration by combining it with electrolysis."
        imageSrc="/images/client/service-k8-front.jpg"
        imageAlt="The Enagic K8 unit with a houseplant beside it"
        ctaLabel={CTA_LABEL}
        ctaHref={CTA_HREF}
      />

      <ArchSeam into="alt" />

      <SpecDetail
        tone="alt"
        cardShape="card"
        headline="What the K8 does"
        cards={[
          { title: "Filters", body: "Advanced filtration is the first step the water goes through." },
          { title: "Electrolysis", body: "The water then passes over the platinum-coated titanium plates." },
          { title: "Offers options", body: "The K8 gives you more than one kind of water." },
        ]}
      />

      <SpecDetail
        tone="light"
        cardShape="card"
        headline="What stands behind it"
        cards={[
          { title: "8 plates", body: "Platinum-coated titanium, at the center of the electrolysis step." },
          { title: "Advanced filtration", body: "The filtration stage before the plates." },
          { title: "Water options", body: "Choices Kara explains in conversation." },
          { title: "5-year warranty", body: "A 5-year warranty covers the K8." },
        ]}
      />

      <InfoBand
        tone="alt"
        density="base"
        headline="How the price is set"
        intro="Pricing is reviewed with you personally, because it depends on the conversation. Financing is available, and Kara explains it when you talk."
        rows={[
          { label: "Pricing", value: "Reviewed with you." },
          { label: "Financing", value: "Available, no rate or term published." },
          { label: "Installation", value: "$299." },
        ]}
      />

      <FullBleedBand
        imageSrc="/images/stock/band-faucet-marble.jpg"
        imageAlt="A chrome tap over a sink with a marble splashback, reference image"
        eyebrow="Reference image"
        headline="How it installs"
        body="Installation is arranged after your conversation with Kara."
        tone="dark"
        minHeight={420}
      />

      <InfoBand
        tone="light"
        density="base"
        itemStyle="plain"
        headline="The warranty and certification"
        items={["The K8 comes with a 5-year warranty.", CERTIFICATION]}
      />

      <OverlapFigure variant="numeral" numeral="5" numeralLabel="year warranty" />

      <ClosingCta
        variant="band"
        headline="See whether the K8 suits your home."
        subhead="One conversation, with Kara."
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
