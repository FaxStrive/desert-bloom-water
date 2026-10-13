import type { Metadata } from "next";
import { ContactConversation } from "@/components/sections";
import { ArchSeam, Bleed } from "@/components/shapes";
import PageHero from "@/components/PageHero";
import { PHONE, PHONE_HREF, EMAIL, HOURS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact Kara | Desert Bloom Water Solutions",
  description: "Book a water conversation with Kara Contreras. Call 760-812-9119, Monday to Saturday, 9am to 5pm Pacific, or send a message.",
};

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="CONTACT"
        headline="Book a water conversation"
        lede="Tell Kara a little about your home and she will get in touch."
        imageSrc="/images/client/contact-k8.jpg"
        imageAlt="The K8 on a kitchen counter beside the faucet"
      />

      <ContactConversation
        formHeading="Send a message"
        labels={{
          name: "Your name",
          phone: "Phone number",
          email: "Email address",
          zip: "ZIP code",
          message: "Anything you would like Kara to know",
        }}
        placeholders={{
          name: "Jane Smith",
          phone: "760 555 0100",
          email: "you@example.com",
          zip: "92260",
          message: "Tell us about your water or your questions",
        }}
        submitLabel="Book my water conversation"
        submitSupport="Kara gets in touch to talk through your water and the options"
        errors={{
          required: "Please fill in this field.",
          email: "Please enter a valid email address.",
          phone: "Please enter a valid phone number.",
          zip: "Please enter a 5 digit ZIP code.",
          send: "Something went wrong. Please call 760-812-9119 instead.",
        }}
        detailsHeading="Reach Kara directly"
        details={[
          { label: "Phone", value: PHONE, href: PHONE_HREF },
          { label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
          { label: "Hours", value: HOURS },
        ]}
      />

      <ArchSeam into="alt" />

      <Bleed
        side="right"
        fallback="panel"
        tone="alt"
        headline="What happens on the call"
        body="Kara asks about your home and your water. She explains how the K8 works and the options available. She reviews pricing and financing with you."
      />
    </main>
  );
}
