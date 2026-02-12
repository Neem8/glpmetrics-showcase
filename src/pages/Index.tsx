import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PressBanner from "@/components/PressBanner";
import TreatmentCards from "@/components/TreatmentCards";
import PricingSection from "@/components/PricingSection";
import TrustSection from "@/components/TrustSection";
import WarningBanner from "@/components/WarningBanner";
import LifestyleSection from "@/components/LifestyleSection";
import ReviewsSection from "@/components/ReviewsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <PressBanner />
      <TreatmentCards />
      <PricingSection />
      <TrustSection />
      <WarningBanner />
      <LifestyleSection />
      <ReviewsSection />
      <Footer />
    </div>
  );
};

export default Index;
