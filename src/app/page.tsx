import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import EducationBlock from "@/components/EducationBlock";
import WaterQualityQuiz from "@/components/WaterQualityQuiz";
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
      <EducationBlock />
      <section className="py-32 lg:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mx-auto mb-10 text-center">
            <h2 className="font-['Playfair_Display'] text-3xl lg:text-4xl font-bold text-[#2A3E1A] tracking-[0.02em]">What does your water need?</h2>
          </div>
          <div className="max-w-xl mx-auto">
            <WaterQualityQuiz />
          </div>
        </div>
      </section>
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
