import { HeroSection } from "@/components/HeroSection";
import { GiveawayList } from "@/components/GiveawayList";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <GiveawayList />
      <Footer />
    </div>
  );
};

export default Index;
