import type { Metadata } from "next";
import {
  VideoHero,
  WhySystems,
  Systems,
  StatOverImage,
  InfoBand,
  WaterHook,
  ArchVideoFeature,
  Process,
  ProofBand,
  OriginStory,
  Faq,
  ServiceAreas,
  ClosingCta,
} from "@/components/sections";
import { OverlapFigure, ArchSeam, Bleed } from "@/components/shapes";
import { VideoBehindType } from "@/components/video";
import Figure from "@/components/sections/Figure";
import JsonLd, { faqSchema } from "@/components/JsonLd";
import {
  PHONE_HREF,
  PHONE_LABEL,
  CTA_HREF,
  CTA_LABEL,
  CERTIFICATION,
  CITIES,
  UNINCORPORATED,
  CLOSING_SUPPORT,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Desert Bloom Water Solutions | Coachella Valley Water Systems",
  description:
    "The K8 combines filtration with electrolysis. Talk with Kara about your water, pricing and financing. Serving 13 Coachella Valley communities.",
};

const strip = [
  { src: "/images/client/home-strip-1.jpg", alt: "The K8 beside a black faucet on a kitchen counter" },
  { src: "/images/client/home-strip-2.jpg", alt: "The K8 hose and the front of the unit" },
  { src: "/images/client/home-strip-3.jpg", alt: "The K8 behind a glass with a houseplant" },
];

const faqItems = [
  {
    question: "What is the K8?",
    answer:
      "The K8 is a water ionization and filtration system. It has 8 platinum-coated titanium plates, advanced filtration and multiple water options, and it combines filtration with electrolysis.",
  },
  { question: "Is there a warranty?", answer: "Yes. The K8 comes with a 5-year warranty." },
  {
    question: "Where do you install?",
    answer: "In 13 Coachella Valley communities, from Palm Springs to Indio Hills. The full list is below.",
  },
  { question: "Is the K8 certified?", answer: CERTIFICATION },
];

export default function HomePage() {
  return (
    <main>
      <VideoHero
        variant="split"
        tone="light"
        mediaShape="arch"
        minHeightLg={640}
        eyebrow="COACHELLA VALLEY"
        headline={
          <>
            Going <em>beyond</em> traditional water filtration.
          </>
        }
        subhead="Japanese-engineered water ionization and filtration for your home, combining filtration with electrolysis."
        videoSrc="/video/hero-pour.mp4"
        posterSrc="/images/client/install-3.jpg"
        posterAlt="The K8 on a kitchen counter beside the faucet"
        primaryCtaLabel={CTA_LABEL}
        primaryCtaHref={CTA_HREF}
        secondaryCtaLabel="See how the K8 works"
        secondaryCtaHref="/learn/how-it-works"
        extra={
          <p>
            <a href={PHONE_HREF} className="font-semibold" style={{ color: "var(--color-accent-text)" }}>
              {PHONE_LABEL}
            </a>
          </p>
        }
      />

      <WhySystems
        variant="split-statement"
        tone="alt"
        eyebrow="WHY THE K8"
        headline="More than a filter."
        subhead="Bottled water is something you buy again and again. A standard filter does one job. The K8 takes a different route. It combines filtration with electrolysis, so the water you pour at home has been through both steps. Kara explains each one in plain words, with no pressure to decide."
        reasons={[
          { title: "Filtration", body: "Advanced filtration is the first thing the water meets inside the K8." },
          { title: "Electrolysis", body: "The water then passes over 8 platinum-coated titanium plates." },
          { title: "Water options", body: "The K8 offers more than one kind of water, and Kara walks you through them." },
        ]}
      />

      <Systems
        variant="alternating-rows"
        tone="light"
        eyebrow="THE K8"
        headline="Eight plates, one unit."
        systems={[
          {
            name: "Enagic K8",
            description:
              "Eight platinum-coated titanium plates, advanced filtration and multiple water options in one unit. Backed by a 5-year warranty.",
            imageSrc: "/images/client/install-4.jpg",
            imageAlt: "The K8 unit, close view of the display",
            ctaLabel: "How the K8 works",
            ctaHref: "/learn/how-it-works",
          },
        ]}
      />

      <StatOverImage
        fullBleed
        imageSrc="/images/stock/stat-glass-table.jpg"
        imageAlt="A glass of water on a white table in soft light, reference image"
        stat="5 years"
        statLabel="warranty on the K8"
        eyebrow="Reference image"
        maxHeight={300}
      />

      <InfoBand
        tone="alt"
        density="base"
        itemStyle="plain"
        headline="What is on the table"
        intro="Before any decision, this is what you get from the conversation."
        items={[
          "A personal conversation about your water.",
          "A K8 with a 5-year warranty.",
          "Financing, available and reviewed with you personally.",
          "Installation, arranged afterward.",
        ]}
      />

      <WaterHook
        eyebrow="KNOW YOUR WATER"
        headline="What is in the water you drink at home?"
        body="Water is not the same in every neighborhood or every house. The pipes, the supply and the age of a home all play a part. Before you think about any system, it helps to understand your own water. That is the first thing Kara talks through with you, and the guide below is a good place to start."
        linkLabel="Read the water guide"
        linkHref="/learn/your-water"
        imageSrc="/images/client/install-5.jpg"
        imageAlt="A glass jar of water held up in sunlight on a lawn"
        pictureAspect="4/3"
      />

      <ArchSeam into="alt" />

      <OverlapFigure
        variant="figure"
        imageSrc="/images/client/install-2.jpg"
        imageAlt="A glass in front of the K8 unit with a houseplant beside it"
      >
        <ul className="mt-3 grid grid-cols-3 gap-1 sm:gap-3 max-sm:[margin-inline:calc(var(--gutter)*-1)]">
          {strip.map((photo) => (
            <li key={photo.src}>
              <Figure src={photo.src} alt={photo.alt} width={320} height={240} sizes="130px" aspect="4/3" wrapperClassName="relative w-full overflow-hidden" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </li>
          ))}
        </ul>
      </OverlapFigure>

      <ArchVideoFeature
        tone="alt"
        eyebrow="HOW IT WORKS"
        headline="Two steps, in order."
        steps={[
          {
            title: "Filtration",
            text: "The K8 starts with advanced filtration. Water passes through it first, before anything else happens, so what reaches the next step has already been filtered.",
          },
          {
            title: "Electrolysis",
            text: "Then comes electrolysis. The water passes over the K8's 8 platinum-coated titanium plates, which is what sets this system apart from a standard filter.",
          },
        ]}
        linkLabel="The full explanation"
        linkHref="/learn/how-it-works"
        videoSrc="/video/arch-faucet.mp4"
        posterSrc="/images/stock/arch-faucet-poster.jpg"
        posterAlt="Water running from a kitchen tap, reference footage"
        creditTag="Reference footage"
      />

      <ArchSeam into="light" />

      <Process
        tone="light"
        eyebrow="WHAT HAPPENS NEXT"
        headline="Three steps, in this order."
        steps={[
          {
            title: "A personal conversation",
            description:
              "Kara talks with you about your water and the options available, answers your questions, and explains how the K8 works in plain language.",
          },
          {
            title: "Pricing and financing",
            description:
              "Pricing and financing, reviewed with you. Financing is available. No rate or term is published here, so you hear the details from Kara directly.",
          },
          {
            title: "Installation",
            description:
              "If you decide to go ahead, installation is arranged afterward. The conversation always comes first, and the decision is yours.",
          },
        ]}
      />

      <ProofBand
        variant="promise"
        items={[
          { value: "", label: "Japanese-engineered technology" },
          { value: "", label: "8 platinum-coated titanium plates" },
          { value: "", label: "Multiple water options" },
          { value: "", label: "5-year warranty" },
        ]}
      />

      <VideoBehindType
        videoSrc="/video/glass-band.mp4"
        posterSrc="/images/stock/glass-band-poster.jpg"
        posterAlt="A chrome faucet with a slow drip, reference footage"
        headline="Premium, education-first, focused on quality, technology, and wellness."
        anchor="bottom"
        minHeight={320}
      >
        <p>
          <a href="/contact" className="font-semibold" style={{ color: "var(--color-accent-text-on-dark)" }}>
            Start a conversation
          </a>
          <span className="ml-4 text-sm">Reference footage</span>
        </p>
      </VideoBehindType>

      <ArchSeam into="light" />

      <OriginStory
        tone="light"
        eyebrow="YOUR CONVERSATION"
        headline="You speak to one person."
        body="Kara Contreras meets each person personally. She starts with your water and the options available, answers your questions, and then reviews pricing and financing with you. You are not handed a brochure and left to decide alone."
        ctaLabel="Send a message"
        ctaHref="/contact"
        imageSrc="/images/client/origin-k8.jpg"
        imageAlt="The K8 hose and the front of the unit on a kitchen counter"
        pictureAspect="4/3"
      />

      <Faq headline="Questions people ask first" items={faqItems} />

      <Bleed
        side="right"
        fallback="panel"
        tone="light"
        eyebrow="THE VALLEY"
        headline="Across the Coachella Valley."
        body="Desert Bloom serves Greater Palm Springs and the surrounding communities in Riverside County. The full list follows."
      />

      <ServiceAreas
        variant="columns"
        tone="alt"
        eyebrow="WHERE WE SERVE"
        headline="Thirteen communities."
        areas={[
          { name: "Cities", places: CITIES },
          { name: "Unincorporated communities", places: UNINCORPORATED },
        ]}
        linkLabel="See ZIP codes and details"
        linkHref="/service-areas"
      />

      <ClosingCta
        variant="quiet"
        headline="Start with a conversation about your water."
        subhead="Installation $299. Financing is available."
        primaryCtaLabel={CTA_LABEL}
        primaryCtaHref={CTA_HREF}
        primaryCtaSupport="Kara reviews pricing and financing with you"
        secondaryCtaLabel={PHONE_LABEL}
        secondaryCtaHref={PHONE_HREF}
        secondaryCtaSupport={CLOSING_SUPPORT.secondary}
      />

      <JsonLd data={faqSchema(faqItems)} />
    </main>
  );
}
