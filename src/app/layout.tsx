import type { Metadata } from "next";
import { display, body } from "./fonts";
import "./globals.css";
import "./brand.css";
import { siteRobotsMeta } from "@/lib/siteUrl";
import { Header, Footer } from "@/components/sections";
import StickyCallBar from "@/components/motion/StickyCallBar";
import {
  COMPANY,
  PHONE,
  PHONE_HREF,
  PHONE_LABEL,
  EMAIL,
  HOURS,
  CTA_HREF,
  CTA_LABEL,
  NAV_LINKS,
  LEARN_LINKS,
  FOOTER_LINKS,
  CERTIFICATION,
  CITIES,
  UNINCORPORATED,
} from "@/lib/content";

/* ROBOTS. `robots: siteRobotsMeta()` keeps every page noindex while the site is on a test URL. */
export const metadata: Metadata = {
  title: "Desert Bloom Water Solutions | Coachella Valley Water Systems",
  description:
    "The K8 combines filtration with electrolysis. Talk with Kara about your water, pricing and financing. Serving 13 Coachella Valley communities.",
  robots: siteRobotsMeta(),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <Header
          companyName={COMPANY}
          logoSrc="/images/client/logo.png"
          logoAlt={COMPANY}
          logoAspect="637/640"
          logoHeight={64}
          navLinks={NAV_LINKS}
          servicesLabel="Learn"
          servicesLinks={LEARN_LINKS}
          servicesIndex={0}
          phone={PHONE}
          phoneHref={PHONE_HREF}
          ctaLabel={CTA_LABEL}
          ctaHref={CTA_HREF}
        />
        {children}
        <Footer
          companyName={COMPANY}
          logoSrc="/images/client/logo.png"
          logoAlt={COMPANY}
          logoAspect="637/640"
          logoHeight={96}
          phone={PHONE}
          phoneHref={PHONE_HREF}
          email={EMAIL}
          navLinks={FOOTER_LINKS}
          blocks={[
            { lines: ["Premium home water ionization and filtration in the Coachella Valley."] },
            { heading: "Hours", lines: [HOURS] },
            { heading: "Where we serve", lines: [[...CITIES, ...UNINCORPORATED].join(", ")] },
            { lines: [CERTIFICATION] },
          ]}
          legalLine={`© 2026 ${COMPANY}`}
          ctaLabel={CTA_LABEL}
          ctaHref={CTA_HREF}
        />
        <StickyCallBar phone={PHONE_HREF.replace("tel:", "")} phoneLabel={PHONE_LABEL} quoteHref={CTA_HREF} quoteLabel={CTA_LABEL} />
      </body>
    </html>
  );
}
