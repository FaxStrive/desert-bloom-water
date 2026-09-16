import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import StatBar from "@/components/StatBar";
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
      <StatBar />
      <EducationBlock />
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mx-auto mb-10 text-center">
            <p className="text-xs font-medium tracking-[0.1em] uppercase text-[#5A7040] mb-3">FIND YOUR FIT</p>
            <h2 className="font-['Playfair_Display'] text-3xl lg:text-4xl font-bold text-[#2A3E1A] tracking-tight">What does your water need?</h2>
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
