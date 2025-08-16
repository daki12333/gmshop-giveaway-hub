import { useState, useEffect } from "react";
import { GiveawayCard } from "./GiveawayCard";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Giveaway {
  id: string;
  title: string;
  description: string;
  prize: string;
  end_date: string;
  max_participants: number;
  participant_count?: number;
}

interface SingleGiveawayProps {
  giveawayId: string;
  onBack: () => void;
}

export function SingleGiveaway({ giveawayId, onBack }: SingleGiveawayProps) {
  const [giveaway, setGiveaway] = useState<Giveaway | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGiveaway = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch the specific giveaway
      const { data: giveawayData, error: giveawayError } = await supabase
        .from("giveaways")
        .select("*")
        .eq("id", giveawayId)
        .eq("is_active", true)
        .single();

      if (giveawayError) {
        if (giveawayError.code === "PGRST116") {
          setError("Giveaway nije pronađen ili nije aktivan");
        } else {
          throw giveawayError;
        }
        return;
      }

      // Fetch participant count
      const { count: participantCount, error: countError } = await supabase
        .from("giveaway_participants")
        .select("*", { count: "exact", head: true })
        .eq("giveaway_id", giveawayId);

      if (countError) {
        console.error("Error fetching participant count:", countError);
      }

      setGiveaway({
        ...giveawayData,
        participant_count: participantCount || 0,
      });
    } catch (error) {
      console.error("Error fetching giveaway:", error);
      setError("Došlo je do greške prilikom učitavanja giveaway-ja");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGiveaway();
  }, [giveawayId]);

  if (loading) {
    return (
      <section id="single-giveaway" className="py-20 bg-gradient-to-b from-background to-secondary/20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Učitava se giveaway...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="single-giveaway" className="py-20 bg-gradient-to-b from-background to-secondary/20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-foreground mb-4">Greška</h2>
            <p className="text-muted-foreground mb-6">{error}</p>
            <Button onClick={onBack} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Nazad na sve giveaway-je
            </Button>
          </div>
        </div>
      </section>
    );
  }

  if (!giveaway) {
    return (
      <section id="single-giveaway" className="py-20 bg-gradient-to-b from-background to-secondary/20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-foreground mb-4">Giveaway nije pronađen</h2>
            <p className="text-muted-foreground mb-6">Izabrani giveaway ne postoji ili nije aktivan.</p>
            <Button onClick={onBack} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Nazad na sve giveaway-je
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="single-giveaway" className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-8">
          <Button onClick={onBack} variant="outline" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Nazad na sve giveaway-je
          </Button>
          
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
              {giveaway.title}
            </h2>
            <p className="text-xl text-muted-foreground">
              Prijavite se za ovaj ekskluzivni giveaway!
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            <GiveawayCard 
              giveaway={giveaway} 
              onParticipantAdded={fetchGiveaway}
            />
          </div>
        </div>
      </div>
    </section>
  );
}