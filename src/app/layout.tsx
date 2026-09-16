import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
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
    "Enagic K8 ionizer installation in the Coachella Valley. 8 platinum-coated plates, 5-year warranty, $299 installation. Serving Palm Springs, Palm Desert, La Quinta and 11 surrounding communities. Call (760) 812-9119.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jakarta.variable} ${jetbrains.variable}`}
    >
      <body className="bg-[#F5EFE3] text-[#1A1A14] antialiased">
        {children}
      </body>
    </html>
  );
}
