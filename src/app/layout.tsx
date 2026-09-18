import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-cormorant",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Water Ionization & Filtration | Desert Bloom Water Solutions | Palm Springs CA",
  description:
    "Enagic Kangen water ionizer installation in the Coachella Valley. Pay in full or finance. Serving Palm Springs, Palm Desert, La Quinta and surrounding communities. Call (760) 812-9119.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jakarta.variable} ${jetbrains.variable}`}
    >
      <body className="bg-[#F5EFE3] text-[#1A1A14] antialiased">
        {children}
      </body>
    </html>
  );
}
