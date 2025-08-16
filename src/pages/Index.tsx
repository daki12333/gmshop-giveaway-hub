import { useState, useEffect } from "react";
import { HeroSection } from "@/components/HeroSection";
import { GiveawayList } from "@/components/GiveawayList";
import { SingleGiveaway } from "@/components/SingleGiveaway";
import { Footer } from "@/components/Footer";

const Index = () => {
  const [selectedGiveawayId, setSelectedGiveawayId] = useState<string | null>(null);

  useEffect(() => {
    // Check URL for giveaway parameter
    const urlParams = new URLSearchParams(window.location.search);
    const giveawayId = urlParams.get('giveaway');
    
    if (giveawayId) {
      setSelectedGiveawayId(giveawayId);
    }
  }, []);

  const handleBackToList = () => {
    setSelectedGiveawayId(null);
    // Update URL without giveaway parameter
    const url = new URL(window.location.href);
    url.searchParams.delete('giveaway');
    window.history.pushState({}, '', url.toString());
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      {selectedGiveawayId ? (
        <SingleGiveaway 
          giveawayId={selectedGiveawayId} 
          onBack={handleBackToList}
        />
      ) : (
        <GiveawayList />
      )}
      <Footer />
    </div>
  );
};

export default Index;
