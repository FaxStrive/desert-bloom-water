import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import EditorialSection from "@/components/EditorialSection";
import ServicesSection from "@/components/ServicesSection";
import CTAClose from "@/components/CTAClose";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navigation />
      <HeroSection />
      <EditorialSection />
      <ServicesSection />
      <CTAClose />
      <Footer />
    </main>
  );
}
