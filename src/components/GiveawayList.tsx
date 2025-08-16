import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { GiveawayCard } from "./GiveawayCard";
import { Loader2, Gift } from "lucide-react";

interface Giveaway {
  id: string;
  title: string;
  description: string;
  prize: string;
  end_date: string;
  max_participants: number;
  participant_count?: number;
}

export function GiveawayList() {
  const [giveaways, setGiveaways] = useState<Giveaway[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGiveaways = async () => {
    try {
      // Fetch active giveaways
      const { data: giveawayData, error: giveawayError } = await supabase
        .from("giveaways")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (giveawayError) throw giveawayError;

      // Fetch participant counts for each giveaway
      const giveawaysWithCounts = await Promise.all(
        (giveawayData || []).map(async (giveaway) => {
          const { count } = await supabase
            .from("giveaway_participants")
            .select("*", { count: "exact", head: true })
            .eq("giveaway_id", giveaway.id);

          return {
            ...giveaway,
            participant_count: count || 0,
          };
        })
      );

      setGiveaways(giveawaysWithCounts);
    } catch (error) {
      console.error("Error fetching giveaways:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGiveaways();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (giveaways.length === 0) {
    return (
      <div className="text-center py-20">
        <Gift className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Nema aktivnih giveaway-ja</h3>
        <p className="text-muted-foreground">Uskoro će biti dostupni novi giveaway-ji!</p>
      </div>
    );
  }

  return (
    <section id="giveaways" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Aktivni Giveaway-ji
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Pridružite se našim uzbudljivim giveaway-jima i osvojite neverovatne nagrade!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {giveaways.map((giveaway) => (
            <GiveawayCard
              key={giveaway.id}
              giveaway={giveaway}
              onParticipantAdded={fetchGiveaways}
            />
          ))}
        </div>
      </div>
    </section>
  );
}