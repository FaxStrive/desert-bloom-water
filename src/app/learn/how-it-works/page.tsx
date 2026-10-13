import type { Metadata } from "next";
import { WaterHook, Process, ArchVideoFeature, ClosingCta } from "@/components/sections";
import { ArchSeam } from "@/components/shapes";
import PageHero from "@/components/PageHero";
import { PHONE_HREF, PHONE_LABEL, CTA_HREF, CTA_LABEL, CLOSING_SUPPORT } from "@/lib/content";

export const metadata: Metadata = {
  title: "How the K8 Works | Desert Bloom Water Solutions",
  description: "Filtration first, then electrolysis. A plain explanation of how the K8 treats water, with no jargon.",
};

export default function HowItWorksPage() {
  return (
    <main>
      <PageHero
        eyebrow="LEARN"
        headline="How the K8 works"
        lede="Two steps, explained in plain words."
        imageSrc="/images/stock/header-water-macro.jpg"
        imageAlt="Water pouring into a glass, close up, reference image"
        creditTag="Reference image"
      />

      <WaterHook
        eyebrow="THE SHORT VERSION"
        headline="Filtration, then electrolysis."
        body="Most home systems do one job: they filter. The K8 does that, then adds electrolysis. The technology is Japanese-engineered and backed by 50+ years of research and development. Here is each step."
      />

      <Process
        tone="alt"
        headline="Three steps"
        steps={[
          {
            title: "Filtration",
            description: "Water first goes through the K8's advanced filtration. This stage happens before anything else, so the next step starts with filtered water.",
          },
          {
            title: "Electrolysis",
            description: "The filtered water then passes over 8 platinum-coated titanium plates. Combining filtration with electrolysis is what takes the K8 beyond a traditional filter.",
          },
          {
            title: "Water options",
            description: "The K8 offers more than one kind of water. Kara explains the options and which ones suit your home when you talk.",
          },
        ]}
      />

      <ArchSeam into="light" />

      <ArchVideoFeature
        eyebrow="SEE IT"
        headline="Water, poured."
        text="A short look at water running from a tap into a glass."
        videoSrc="/video/learn-tap.mp4"
        posterSrc="/images/stock/learn-tap-poster.jpg"
        posterAlt="Water running from a tap"
      />

      <ClosingCta
        variant="band"
        headline="Want it explained for your home?"
        subhead="Kara walks you through it."
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
