import Footer from "../components/Footer";
import BenefitsSection from "../components/home/benefitsSection/BenefitsSection";
import CallToActionSection from "../components/home/CallToActionSection";
import FeaturesSection from "../components/home/featuresSection/FeaturesSection";
import HeroSection from "../components/home/HeroSection";
import Navbar from "../components/home/Navbar";

const Home = () => {
  return (
    <div className="bg-primary-backgorund text-white relative">
      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <FeaturesSection />
        <BenefitsSection />
        <CallToActionSection />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
