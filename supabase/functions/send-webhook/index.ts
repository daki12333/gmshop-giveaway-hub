import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface WebhookRequest {
  webhookUrl: string;
  eventType: string;
  data: any;
  timestamp?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { webhookUrl, eventType, data }: WebhookRequest = await req.json();

    if (!webhookUrl || !eventType) {
      return new Response(
        JSON.stringify({ error: 'webhookUrl and eventType are required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Prepare webhook payload
    const webhookPayload = {
      event: eventType,
      timestamp: new Date().toISOString(),
      source: 'GMShop Giveaway Hub',
      data: data
    };

    console.log('Sending webhook to:', webhookUrl);
    console.log('Payload:', webhookPayload);

    // Send webhook
    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'GMShop-Giveaway-Webhook/1.0'
      },
      body: JSON.stringify(webhookPayload)
    });

    const responseData = {
      success: webhookResponse.ok,
      status: webhookResponse.status,
      statusText: webhookResponse.statusText,
      sentAt: new Date().toISOString()
    };

    if (!webhookResponse.ok) {
      console.error('Webhook failed:', webhookResponse.status, webhookResponse.statusText);
      const errorText = await webhookResponse.text().catch(() => 'Unknown error');
      responseData.error = errorText;
    } else {
      console.log('Webhook sent successfully');
    }

    return new Response(
      JSON.stringify(responseData),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error: any) {
    console.error('Error in webhook function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to send webhook',
        details: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
};

serve(handler);