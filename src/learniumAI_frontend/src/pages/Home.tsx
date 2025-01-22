import Footer from "../components/Footer";
import BenefitsSection from "../components/landingPage/benefitsSection/BenefitsSection";
import CallToActionSection from "../components/landingPage/CallToActionSection";
import FeaturesSection from "../components/landingPage/featuresSection/FeaturesSection";
import HeroSection from "../components/landingPage/HeroSection";
import Navbar from "../components/landingPage/Navbar";

const Home = () => {
  return (
    <div className="bg-primary-backgorund text-white font-sans relative">
      <div className="absolute inset-0 bg-gradient-radial from-gradientStart via-gradientMiddle to-gradientEnd opacity-90 z-0"></div>
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
