import type { Metadata } from "next";
import { WaterHook, SpecDetail, Process, ClosingCta } from "@/components/sections";
import { ArchSeam, OverlapFigure } from "@/components/shapes";
import PageHero from "@/components/PageHero";
import { PHONE_HREF, PHONE_LABEL, CTA_HREF, CTA_LABEL, CLOSING_SUPPORT } from "@/lib/content";

export const metadata: Metadata = {
  title: "Your Water | Desert Bloom Water Solutions",
  description: "Water differs from home to home. A plain guide to understanding the water you drink before you choose any system.",
};

export default function YourWaterPage() {
  return (
    <main>
      <PageHero
        eyebrow="LEARN"
        headline="Understanding your water"
        lede="Start here, before you think about any system."
        imageSrc="/images/stock/header-kitchen-island.jpg"
        imageAlt="A bright kitchen with a black faucet over the island sink, reference image"
        creditTag="Reference image"
      />

      <WaterHook
        eyebrow="WHY IT VARIES"
        headline="Water differs from home to home."
        body="Where your water comes from, how it travels and the pipes inside your house all shape what comes out of the tap. Two neighbors can have different water. That is why a conversation about your own home is more useful than a general answer."
      />

      <ArchSeam into="alt" />

      <SpecDetail
        tone="alt"
        cardShape="card"
        headline="Where to start"
        cards={[
          { title: "Read your utility report", body: "Many water utilities publish a yearly water quality report. Ask yours, or look on its website." },
          { title: "Notice the clues", body: "Taste, smell and marks on glassware are clues, but they are not a test." },
          { title: "Ask questions", body: "Write down what you want to know about your water and bring it to a conversation with Kara." },
        ]}
      />

      <OverlapFigure
        variant="figure"
        imageSrc="/images/stock/your-water-sink.jpg"
        imageAlt="Water running into a kitchen sink, reference image"
      />

      <Process
        tone="light"
        headline="How to choose"
        steps={[
          { title: "Learn about your own water first." },
          { title: "Ask how a system treats it, step by step." },
          { title: "Ask about the warranty, the pricing and the financing before you decide." },
        ]}
      />

      <ClosingCta
        variant="band"
        headline="Ready to talk about your water?"
        subhead="Kara answers your questions."
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
