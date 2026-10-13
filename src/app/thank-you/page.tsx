import type { Metadata } from "next";
import { PageHeader, ClosingCta } from "@/components/sections";
import { ArchSeam, Bleed, OverlapFigure } from "@/components/shapes";
import { PHONE_HREF, PHONE_LABEL } from "@/lib/content";

export const metadata: Metadata = {
  title: "Thank You | Desert Bloom Water Solutions",
  description: "Your message has reached Desert Bloom Water Solutions. Kara will be in touch.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <main>
      <PageHeader tone="alt" headline="Thank you." lede="Your message has reached Kara." />

      <Bleed
        side="right"
        fallback="panel"
        tone="light"
        headline="What happens next"
        body="Kara reads your message. She gets in touch to talk about your water and your questions. If you would like, pricing and financing are reviewed with you then."
      />

      <ArchSeam into="alt" />

      <OverlapFigure
        variant="figure"
        imageSrc="/images/client/thankyou-k8-counter.jpg"
        imageAlt="The K8 on a kitchen counter beside the faucet"
      />

      <ClosingCta
        variant="quiet"
        headline="Prefer to talk now?"
        subhead="Call Monday to Saturday, 9am to 5pm Pacific."
        primaryCtaLabel={PHONE_LABEL}
        primaryCtaHref={PHONE_HREF}
        primaryCtaSupport="Kara answers your questions"
      />
    </main>
  );
}
