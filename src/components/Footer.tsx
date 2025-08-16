import { Heart, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              GMShop Giveaway
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Vaša destinacija za ekskluzivne giveaway-je i neverovatne nagrade.
              Pridružite se našoj zajednici i budite deo uzbudljivih takmičenja.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Brzi linkovi</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#giveaways" className="hover:text-accent transition-colors">
                  Aktivni Giveaway-ji
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Pravila učešća
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Prethodnji pobednici
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Kontakt
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Pridružite se zajednici</h4>
            <p className="text-muted-foreground">
              Pratite nas za najnovije giveaway-je i ekskluzivne ponude!
            </p>
            <div className="flex items-center gap-2 text-accent">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm">Više od 50K zadovoljnih učesnika</span>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © 2024 GMShop Giveaway Hub. Sva prava zadržana.
            </p>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <span>Napravljeno sa</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>za gaming zajednicu</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}