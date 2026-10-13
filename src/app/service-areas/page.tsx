import type { Metadata } from "next";
import { ServiceAreas, ClosingCta } from "@/components/sections";
import { ArchSeam, Bleed } from "@/components/shapes";
import PageHero from "@/components/PageHero";
import { PHONE_HREF, PHONE_LABEL, CTA_HREF, CTA_LABEL, CLOSING_SUPPORT, CITIES, UNINCORPORATED, ZIPS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Service Area | Desert Bloom Water Solutions",
  description: "Desert Bloom serves 13 Coachella Valley communities and 14 ZIP codes in Riverside County, California. See the full list.",
};

export default function ServiceAreasPage() {
  return (
    <main>
      <PageHero
        eyebrow="SERVICE AREA"
        headline="Coachella Valley and Greater Palm Springs"
        lede="13 communities in Riverside County, California."
        imageSrc="/images/stock/header-faucet-granite.jpg"
        imageAlt="A chrome kitchen faucet running over a granite counter, reference image"
        creditTag="Reference image"
      />

      <ServiceAreas
        variant="cards"
        tone="alt"
        headline="Where Desert Bloom serves"
        areas={[
          { name: "Cities", places: CITIES.map((city) => `${city}, Riverside County, CA`) },
          { name: "Unincorporated communities", places: UNINCORPORATED.map((place) => `${place}, Riverside County, CA`) },
        ]}
        notes={["Not sure whether your home is in the area? Call and ask."]}
      />

      <ArchSeam into="light" />

      <Bleed side="right" fallback="panel" tone="light" headline="ZIP codes we serve" body="These 14 ZIP codes are in the service area.">
        <ul className="flex flex-wrap gap-3">
          {ZIPS.map((zip) => (
            <li key={zip} className="px-4 py-2 text-sm" style={{ border: "1px solid var(--color-border)" }}>
              {zip}
            </li>
          ))}
        </ul>
      </Bleed>

      <ClosingCta
        variant="band"
        headline="In the area? Start the conversation."
        subhead="Kara answers your questions about your water."
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
