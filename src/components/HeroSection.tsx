import { Button } from "@/components/ui/button";
import { Gift, Sparkles, Trophy } from "lucide-react";
import heroBackground from "@/assets/hero-bg.jpg";

export function HeroSection() {
  const scrollToGiveaways = () => {
    const giveawaysSection = document.getElementById('giveaways');
    giveawaysSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 animate-pulse">
          <Gift className="h-8 w-8 text-accent/30" />
        </div>
        <div className="absolute top-40 right-20 animate-bounce">
          <Trophy className="h-12 w-12 text-primary/40" />
        </div>
        <div className="absolute bottom-32 left-1/4 animate-pulse">
          <Sparkles className="h-6 w-6 text-accent/50" />
        </div>
        <div className="absolute bottom-40 right-1/3 animate-bounce delay-1000">
          <Gift className="h-10 w-10 text-primary/30" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 text-accent font-medium">
            <Sparkles className="h-4 w-4" />
            <span>Oficijalni GMShop Giveaway</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              GMShop
            </span>
            <br />
            <span className="text-foreground">Giveaway Hub</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Učestvujte u ekskluzivnim giveaway-jima i osvojite neverovatne nagrade!
            Pridružite se našoj zajednici i budite deo uzbudljivih takmičenja.
          </p>


          {/* CTA Button */}
          <div className="pt-4">
            <Button 
              variant="hero" 
              size="lg" 
              onClick={scrollToGiveaways}
              className="text-lg px-8 py-6 h-auto"
            >
              <Gift className="h-5 w-5" />
              Pogledajte Giveaway-je
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}