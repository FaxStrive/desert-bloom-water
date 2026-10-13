import type { Metadata } from "next";
import { Faq, ClosingCta } from "@/components/sections";
import { ArchSeam, Bleed } from "@/components/shapes";
import PageHero from "@/components/PageHero";
import JsonLd, { faqSchema } from "@/components/JsonLd";
import { PHONE, PHONE_HREF, PHONE_LABEL, CTA_HREF, CTA_LABEL, CLOSING_SUPPORT, CERTIFICATION, HOURS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Desert Bloom Water Solutions",
  description: "Answers about the K8, its warranty, financing, installation and where Desert Bloom serves in the Coachella Valley.",
};

const items = [
  { question: "What does the K8 do?", answer: "The K8 combines advanced filtration with electrolysis. It is a water ionization and filtration system with multiple water options." },
  { question: "What is inside it?", answer: "Eight platinum-coated titanium plates, along with advanced filtration." },
  { question: "Where is the K8 engineered?", answer: "The K8 uses Japanese-engineered water ionization and filtration technology." },
  { question: "How long is the warranty?", answer: "The K8 comes with a 5-year warranty." },
  { question: "What happens in a water conversation?", answer: "Kara talks with you about your water and the options available, answers your questions, and reviews pricing and financing with you." },
  { question: "Is financing available?", answer: "Yes. Financing is available, and Kara reviews it with you personally. No rate or term is published on this site." },
  { question: "How much does installation cost?", answer: "Installation is $299." },
  {
    question: "Which areas do you serve?",
    answer: "Palm Springs, Cathedral City, Rancho Mirage, Palm Desert, Indian Wells, La Quinta, Indio, Coachella, Desert Hot Springs, Bermuda Dunes, Thousand Palms, Sky Valley and Indio Hills.",
  },
  { question: "Is the K8 certified?", answer: CERTIFICATION },
  { question: "How do I reach Kara?", answer: `Call ${PHONE}, ${HOURS}, or use the contact form.` },
];

export default function FaqPage() {
  return (
    <main>
      <PageHero
        eyebrow="FAQ"
        headline="Frequently asked questions"
        lede="Short answers. For anything else, talk with Kara."
        imageSrc="/images/client/faq-k8.jpg"
        imageAlt="The K8 unit, close view of the display"
      />

      <Faq headline="Your questions, answered" items={items} />

      <ArchSeam into="light" />

      <Bleed side="right" fallback="panel" tone="light" headline="Reach Kara directly" body={`Call ${PHONE}, ${HOURS}, or use the contact form.`} />

      <ClosingCta
        variant="band"
        headline="Still have a question?"
        subhead="Kara is happy to talk it through."
        primaryCtaLabel={CTA_LABEL}
        primaryCtaHref={CTA_HREF}
        primaryCtaSupport={CLOSING_SUPPORT.primary}
        secondaryCtaLabel={PHONE_LABEL}
        secondaryCtaHref={PHONE_HREF}
        secondaryCtaSupport={CLOSING_SUPPORT.secondary}
      />
      <JsonLd data={faqSchema(items)} />
    </main>
  );
}
