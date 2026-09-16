import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import StatBar from "@/components/StatBar";
import EducationBlock from "@/components/EducationBlock";
import K8FeatureCards from "@/components/K8FeatureCards";
import InstallationPricing from "@/components/InstallationPricing";
import TestimonialsSection from "@/components/TestimonialsSection";
import ServiceArea from "@/components/ServiceArea";
import MoreServices from "@/components/MoreServices";
import CTAClose from "@/components/CTAClose";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navigation />
      <HeroSection />
      <StatBar />
      <EducationBlock />
      <K8FeatureCards />
      <InstallationPricing />
      <TestimonialsSection />
      <ServiceArea />
      <MoreServices />
      <CTAClose />
      <Footer />
    </main>
  );
}
