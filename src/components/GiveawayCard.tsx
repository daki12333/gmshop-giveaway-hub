import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Gift, Users, Calendar, Trophy } from "lucide-react";

interface Giveaway {
  id: string;
  title: string;
  description: string;
  prize: string;
  end_date: string;
  max_participants: number;
  participant_count?: number;
}

interface GiveawayCardProps {
  giveaway: Giveaway;
  onParticipantAdded?: () => void;
}

export function GiveawayCard({ giveaway, onParticipantAdded }: GiveawayCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [telegramUsername, setTelegramUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleParticipate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!telegramUsername.trim()) {
      toast({
        title: "Greška",
        description: "Telegram username je obavezan",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("giveaway_participants")
        .insert({
          giveaway_id: giveaway.id,
          telegram_username: telegramUsername.trim(),
          email: email.trim() || null,
        });

      if (error) {
        if (error.code === "23505") {
          toast({
            title: "Već ste učestvovali",
            description: "Već ste se prijavili za ovaj giveaway",
            variant: "destructive",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Uspešno!",
          description: "Uspešno ste se prijavili za giveaway",
        });
        setIsDialogOpen(false);
        setTelegramUsername("");
        setEmail("");
        onParticipantAdded?.();
      }
    } catch (error) {
      console.error("Error participating in giveaway:", error);
      toast({
        title: "Greška",
        description: "Došlo je do greške prilikom prijave",
        variant: "destructive",
      });
    }

    setIsSubmitting(false);
  };

  const isExpired = new Date(giveaway.end_date) < new Date();
  const daysLeft = Math.ceil((new Date(giveaway.end_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <Card className="relative overflow-hidden border-0 bg-card/50 backdrop-blur-sm hover:shadow-glow-primary transition-all duration-300 group">
      <div className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-primary">
                <Gift className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {giveaway.title}
                </CardTitle>
                <div className="flex items-center gap-4 mt-1 text-muted-foreground text-sm">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{giveaway.participant_count || 0}/{giveaway.max_participants}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{isExpired ? "Završen" : `${daysLeft} dana`}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium">
              <Trophy className="h-4 w-4" />
              <span>Nagrada</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">{giveaway.description}</p>
          
          <div className="p-4 rounded-lg bg-gradient-secondary/10 border border-accent/20">
            <h4 className="font-semibold text-accent mb-2">🎁 Nagrada:</h4>
            <p className="text-foreground">{giveaway.prize}</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="default" 
                size="lg" 
                className="w-full bg-gradient-primary hover:shadow-glow-primary transition-all duration-300"
                disabled={isExpired}
              >
                {isExpired ? "Giveaway završen" : "Prijavite se"}
              </Button>
            </DialogTrigger>
            
            <DialogContent className="border-0 bg-card/95 backdrop-blur-sm">
              <DialogHeader>
                <DialogTitle className="text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Prijavite se za giveaway
                </DialogTitle>
              </DialogHeader>
              
              <form onSubmit={handleParticipate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="telegram">Telegram Username *</Label>
                  <Input
                    id="telegram"
                    placeholder="@username"
                    value={telegramUsername}
                    onChange={(e) => setTelegramUsername(e.target.value)}
                    className="bg-secondary/50 border-border/50"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email (opciono)</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-secondary/50 border-border/50"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-primary hover:shadow-glow-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Šalje se..." : "Prijavite se"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardContent>
      </div>
    </Card>
  );
}