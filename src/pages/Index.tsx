import { HeroSection } from "@/components/HeroSection";
import { GiveawayList } from "@/components/GiveawayList";
import { WebhookSettings } from "@/components/WebhookSettings";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <WebhookSettings />
      </div>
      <GiveawayList />
      <Footer />
    </div>
  );
};

export default Index;
