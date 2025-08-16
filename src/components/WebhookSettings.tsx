import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Settings, Send, CheckCircle, AlertCircle } from "lucide-react";

export function WebhookSettings() {
  const [webhookUrl, setWebhookUrl] = useState("");
  const [isTestLoading, setIsTestLoading] = useState(false);
  const { toast } = useToast();

  // Load saved webhook URL from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('gmshop-webhook-url');
    if (saved) {
      setWebhookUrl(saved);
    }
  }, []);

  const saveWebhookUrl = () => {
    if (!webhookUrl.trim()) {
      toast({
        title: "Greška",
        description: "Unesite webhook URL",
        variant: "destructive",
      });
      return;
    }

    // Validate URL format
    try {
      new URL(webhookUrl);
    } catch {
      toast({
        title: "Greška",
        description: "Unesite valjan URL",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem('gmshop-webhook-url', webhookUrl);
    toast({
      title: "Sačuvano!",
      description: "Webhook URL je uspešno sačuvan",
    });
  };

  const testWebhook = async () => {
    if (!webhookUrl.trim()) {
      toast({
        title: "Greška",
        description: "Prvo sačuvajte webhook URL",
        variant: "destructive",
      });
      return;
    }

    setIsTestLoading(true);

    try {
      const response = await fetch('/functions/v1/send-webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          webhookUrl: webhookUrl,
          eventType: 'test',
          data: {
            message: 'Test webhook iz GMShop Giveaway Hub',
            timestamp: new Date().toISOString(),
            testData: {
              example: 'ovo je test poruka'
            }
          }
        })
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Test uspešan!",
          description: "Webhook je uspešno poslat na vaš URL",
        });
      } else {
        toast({
          title: "Test neuspešan",
          description: `Greška: ${result.error || 'Nepoznata greška'}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Test webhook error:', error);
      toast({
        title: "Test neuspešan",
        description: "Došlo je do greške prilikom testiranja",
        variant: "destructive",
      });
    }

    setIsTestLoading(false);
  };

  return (
    <Card className="border-0 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-primary" />
          <span>Webhook Podešavanja</span>
        </CardTitle>
        <p className="text-muted-foreground text-sm">
          Konfigurišite URL na koji ćete primati obaveštenja o giveaway aktivnostima
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="webhook-url">Webhook URL</Label>
          <Input
            id="webhook-url"
            placeholder="https://your-site.com/webhook"
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
            className="bg-secondary/50 border-border/50"
          />
          <p className="text-xs text-muted-foreground">
            URL na koji će biti poslana obaveštenja kada se neko prijavi za giveaway
          </p>
        </div>

        <div className="flex gap-2">
          <Button onClick={saveWebhookUrl} variant="default">
            <CheckCircle className="h-4 w-4 mr-2" />
            Sačuvaj URL
          </Button>
          
          <Button 
            onClick={testWebhook} 
            variant="outline"
            disabled={isTestLoading || !webhookUrl.trim()}
          >
            {isTestLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2" />
                Testira se...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Test Webhook
              </>
            )}
          </Button>
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-accent" />
            Webhook podaci
          </h4>
          <div className="text-xs text-muted-foreground space-y-1">
            <p><strong>Format:</strong> JSON POST zahtev</p>
            <p><strong>Eventi:</strong> giveaway_participation, test</p>
            <p><strong>Headers:</strong> Content-Type: application/json</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}