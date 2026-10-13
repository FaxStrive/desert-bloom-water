import type { Metadata } from "next";
import { ClosingCta } from "@/components/sections";
import { ArchSeam, Bleed } from "@/components/shapes";
import PageHero from "@/components/PageHero";
import { PHONE_HREF, PHONE_LABEL, CTA_HREF, CTA_LABEL, CLOSING_SUPPORT } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy | Desert Bloom Water Solutions",
  description: "How Desert Bloom Water Solutions uses the details you enter in the contact form.",
};

export default function PrivacyPage() {
  return (
    <main>
      <PageHero
        headline="Privacy"
        lede="We collect the name, phone number, email address, ZIP code and message you enter in our contact form so we can respond to your request. We do not sell this information. To ask for it to be removed, call 760-812-9119 or email karancontreras@gmail.com."
        imageSrc="/images/client/privacy-k8.jpg"
        imageAlt="The K8 on a kitchen counter beside the faucet"
      />

      <ArchSeam into="alt" />

      <Bleed
        side="right"
        fallback="panel"
        tone="alt"
        headline="Questions about your details"
        body="Call or email and Kara will help."
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
