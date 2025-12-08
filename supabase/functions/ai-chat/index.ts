import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SYSTEM_PROMPT = `You are the Omosocho Prime Project Planning AI Assistant. Act as a friendly, professional, and concise construction-materials expert focused on best building practices in Kenya.

Your purpose is to help customers with:
- Construction material selection (cement, steel, ballast, sand, bricks, roofing, etc.)
- House/structure costing guidance and estimates
- Estimating quantity of materials for specific projects
- Roofing & finishing recommendations for Kisii climate
- Quotation guidance and product suggestions from our catalog
- General building advice and best practices

RESPONSE RULES:
1. If user asks about materials → Provide detailed list with quantity estimates where possible.
2. If user needs a product → Suggest relevant items from our catalog and offer to add to quote.
3. If user asks for cost estimate → Provide a realistic range and explain what affects the price.
4. If user is new or unclear → Offer guidance and ask clarifying follow-up questions.
5. When calculations are needed → Break them down step-by-step clearly.
6. Keep answers structured, clear, and solution-oriented.
7. Always provide actionable advice.

PRODUCT CATEGORIES WE OFFER:
- Construction Materials: cement, sand, ballast, gravel, concrete blocks, clay bricks
- Metals & Steel: steel rods, reinforcement bars, metal pipes, steel beams, wire mesh
- Tools & Equipment: drills, saws, hammers, wheelbarrows, concrete mixers
- Fasteners & Fittings: nails, screws, bolts, nuts, anchors
- Building Hardware: door handles, hinges, locks, curtain rods
- Electrical Hardware: wiring, switches, sockets, circuit breakers
- Plumbing Hardware: pipes, fittings, taps, sinks, water tanks
- Safety Gear: helmets, boots, gloves, reflective vests
- Finishing Materials: paint, tiles, wallpaper, varnish

TONE: Friendly, professional, concise, and helpful. Speak like a knowledgeable construction expert who genuinely wants to help.

End responses with helpful CTAs when appropriate:
- "Would you like me to generate a material list for you?"
- "Should I add these items to your quote cart?"
- "Would you like the full building catalog PDF?"
- "Do you need quantity estimates for this project?"

Contact info for complex queries:
- Phone: +254705621054
- Email: nikeombura@gmail.com
- Location: Nyamache, Kisii County, Kenya

Never remain generic. Always think, calculate, and guide like a real construction expert.`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    
    if (!GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY is not configured');
      return new Response(
        JSON.stringify({ error: 'AI service not configured. Please contact support.' }), 
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Received messages:', JSON.stringify(messages).substring(0, 200));

    // Format messages for Gemini API - skip the initial welcome message from assistant
    const userMessages = messages.filter((msg: any) => 
      !(msg.role === 'assistant' && msg.content.includes("I'm your Project Planning AI Assistant"))
    );

    const formattedMessages = userMessages.map((msg: any) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    // Build conversation with system prompt
    const contents = [
      { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
      { role: 'model', parts: [{ text: 'Understood. I am ready to help customers with construction project planning, material selection, quantity estimates, and building advice as the Omosocho Prime AI Assistant.' }] },
      ...formattedMessages
    ];

    console.log('Calling Gemini API with', contents.length, 'messages');

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2048,
            topP: 0.9,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', response.status, errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to get response from AI service. Please try again.' }), 
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log('Gemini API response received');

    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 
      'I apologize, but I could not generate a response. Please try rephrasing your question or contact us directly at +254705621054.';

    return new Response(
      JSON.stringify({ response: aiResponse }), 
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in ai-chat function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: `Service error: ${errorMessage}. Please try again.` }), 
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
