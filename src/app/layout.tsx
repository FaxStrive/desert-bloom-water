import type { Metadata } from "next";
import { display, body } from "./fonts";
import "./globals.css";
import "./brand.css";
import { siteRobotsMeta } from "@/lib/siteUrl";

/* The house look loads two faces: a display face for headings and a plain sans
   for body. ./fonts.ts names which families: the seed's own default there, or
   the client's style faces once bin/stitch-brand-from-facts.mjs --css-out has
   overwritten it. The scale and weights in globals.css do not change with the
   face, because the scale is what the house-look gate measures. */

/* ROBOTS. `robots: siteRobotsMeta()` puts noindex on EVERY page while the site is on a
   test URL (no NEXT_PUBLIC_SITE_URL, or a vercel.app or local host) and adds nothing once
   NEXT_PUBLIC_SITE_URL names the client's own domain. The build stage keeps this line when
   it writes the client's own title and description: a layout without it ships a test
   deployment that search engines may index (bin/assert-indexing.mjs, gate 23). */
export const metadata: Metadata = {
  title: "Client Site Seed",
  description: "Placeholder metadata. The build stage replaces this with the client's own copy.",
  robots: siteRobotsMeta(),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
