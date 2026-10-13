import type { Metadata } from "next";
import { ClosingCta } from "@/components/sections";
import Figure from "@/components/sections/Figure";
import { ArchSeam, Bleed } from "@/components/shapes";
import PageHero from "@/components/PageHero";
import { PHONE_HREF, PHONE_LABEL, CTA_HREF, CTA_LABEL, CLOSING_SUPPORT } from "@/lib/content";

export const metadata: Metadata = {
  title: "Gallery | Desert Bloom Water Solutions",
  description:
    "Photographs of the K8 supplied by Desert Bloom Water Solutions. Reference images elsewhere on the site are labeled as such.",
};

// The five photographs the client supplied, each a derived copy with its own file name.
const photos = [
  { src: "/images/client/gallery-k8-counter.jpg", caption: "The K8 on a counter beside a faucet", alt: "The K8 on a kitchen counter beside a black faucet and a plant", aspect: "4/3" },
  { src: "/images/client/gallery-k8-detail.jpg", caption: "A close view of the K8 display", alt: "The K8 unit, close view of the display", aspect: "4/5" },
  { src: "/images/client/gallery-glass-hose.jpg", caption: "A glass filling from the K8 hose", alt: "A glass filling from the K8 hose", aspect: "4/5" },
  { src: "/images/client/gallery-glass-plant.jpg", caption: "A glass in front of the K8 with a houseplant beside it", alt: "A glass in front of the K8 unit with a houseplant beside it", aspect: "4/5" },
  { src: "/images/client/gallery-jar.jpg", caption: "A glass jar of water in sunlight", alt: "A glass jar of water held up in sunlight on a lawn", aspect: "4/5" },
];

export default function GalleryPage() {
  return (
    <main>
      <PageHero
        eyebrow="GALLERY"
        headline="The K8 in photographs"
        lede="Five photographs of the K8, shown as supplied."
        imageSrc="/images/client/gallery-hero.jpg"
        imageAlt="A glass in front of the K8 unit with a houseplant beside it"
      />

      <section className="section on-alt">
        <div className="shell">
          <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((photo) => (
              <li key={photo.src} className="flex flex-col gap-3">
                <Figure
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.aspect === "4/3" ? 1400 : 800}
                  height={photo.aspect === "4/3" ? 1050 : 1000}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                  aspect={photo.aspect}
                  wrapperClassName="relative w-full overflow-hidden"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <p className="text-sm" style={{ color: "var(--color-ink-muted)" }}>
                  {photo.caption}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ArchSeam into="light" />

      <Bleed
        side="right"
        fallback="panel"
        tone="light"
        headline="About these photographs"
        body="These photographs were supplied by Desert Bloom Water Solutions. Other pictures on this site are reference images and are labeled as such."
      />

      <ClosingCta
        variant="quiet"
        headline="Want to see the K8 in person?"
        subhead="Ask Kara in a water conversation."
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
