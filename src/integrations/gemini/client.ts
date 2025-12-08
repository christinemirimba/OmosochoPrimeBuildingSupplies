import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

// Initialize Gemini API client
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY';

if (!API_KEY) {
    console.warn('Gemini API key not found. AI functionality will be limited.');
}

const genAI = new GoogleGenerativeAI(API_KEY);

// Configure model parameters
const modelParams = {
    model: 'gemini-1.5-flash',
    temperature: 0.7,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
};

// Safety Settings with proper types
const safetySettings = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
];

// Get the generative model
const model = genAI.getGenerativeModel({
    ...modelParams,
    safetySettings,
});

// System prompt for structured, professional responses following exact system requirements
const SYSTEM_PROMPT = `
You are a Project Planning AI Assistant for Omosocho Prime Building Supplies. Act as a friendly, professional, and concise construction-materials expert focused on Kenyan building practices.

## RULES:
1. Always produce short, clear, actionable answers (1-3 short paragraphs)
2. Format numerical answers with units (kg, m, m², bags) and show step-by-step math when estimating
3. End each reply with exactly one clear CTA from: "Shall I prepare a text quote list?" or "Would you like me to generate the text catalog list?"
4. If user supplies product SKU or exact dimension, reference it in answers (e.g., "Product S12-001 — 12mm steel bar")
5. If you know stock/price, state it. If not, label numbers as "estimate"
6. Language: primarily English. If user writes in Swahili, reply in Swahili
7. Do NOT claim to modify website or cart automatically. Simulate actions in text and offer payloads frontend can use
8. Keep tone local, helpful, confident, and accessible (avoid unexplained jargon)

## RESPONSE FORMAT:
- Start with clear answer (1-3 paragraphs)
- Use bullet points for lists
- Show calculations when estimating
- End with exactly one CTA from the approved list
- Optionally append ##ACTION## JSON block if relevant

## EXAMPLE RESPONSES:

For materials question:
"For a standard foundation, you'll need approximately 150 bags of cement (estimate). Each bag covers ~0.03m³ at standard mix ratio.

**Materials:**
- 150 x 50kg Bamburi Cement bags
- 2 tons of 12mm steel bars
- 10m³ of concrete mix

Shall I prepare a text quote list?"

For product SKU question:
"Product S12-001 is our 12mm steel bar, available in 6m lengths. Current stock: 500 pieces at KES 140 per kg.

Would you like me to generate the text catalog list?"

## ACTION FORMAT (when relevant):
##ACTION##
{"action":"add_to_quote","product_id":"S12-001","qty":10}
##ACTION##

## SAFETY:
- Avoid long technical tangents
- If uncertain, ask one clarifying question maximum
- Keep messages accessible and solution-oriented
`;

export const generateGeminiResponse = async (prompt: string, chatHistory: Array<{role: string, parts: string[]}> = []) => {
    try {
        if (!API_KEY || API_KEY.startsWith('YOUR_') || API_KEY.includes('YOUR_GEMINI')) {
            throw new Error('Gemini API key not configured');
        }

        // Start a new chat session or continue existing one
        const chat = model.startChat({
            history: chatHistory.map(msg => ({
                role: msg.role as 'user' | 'model',
                parts: [{ text: msg.parts[0] }]
            })),
            generationConfig: modelParams,
            systemInstruction: SYSTEM_PROMPT,
        });

        const result = await chat.sendMessage(prompt);
        const response = await result.response;
        let text = response.text();

        // Format the response for better readability
        text = formatResponse(text);

        return {
            success: true,
            response: text,
            chatHistory: chat.getHistory(),
        };
    } catch (error) {
        console.error('Gemini API error:', error);
        console.log('API Key being used:', API_KEY.substring(0, 10) + '...'); // Log first 10 chars for debugging
        return {
            success: false,
            response: 'I apologize, but I\'m having trouble connecting to the AI service right now. Please try again in a moment or contact our support team at +254 705621054 or nikeombura@gmail.com.',
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
};

// Format response for better visual presentation
const formatResponse = (text: string): string => {
    // Add proper spacing and formatting
    let formatted = text.trim();

    // Ensure proper paragraph spacing
    formatted = formatted.replace(/\n\n+/g, '\n\n');

    // Add professional structure if not present
    if (!formatted.startsWith('##') && !formatted.startsWith('#')) {
        formatted = `## ${getResponseTitle(formatted)}\n\n${formatted}`;
    }

    // Add contact info footer
    formatted += `\n\n**Need more help?** Contact us at +254 705621054 or nikeombura@gmail.com`;

    return formatted;
};

// Generate appropriate title based on response content
const getResponseTitle = (text: string): string => {
    const lowerText = text.toLowerCase();

    if (lowerText.includes('material') && lowerText.includes('need')) return 'Materials Recommendation';
    if (lowerText.includes('estimate') || lowerText.includes('cost')) return 'Cost Estimate';
    if (lowerText.includes('how to') || lowerText.includes('steps')) return 'Step-by-Step Guide';
    if (lowerText.includes('product') || lowerText.includes('catalog')) return 'Product Information';
    if (lowerText.includes('contact') || lowerText.includes('visit')) return 'Contact Information';

    return 'Construction Assistance';
};

// Helper function to format messages for Gemini
export const formatMessagesForGemini = (messages: Array<{role: string, content: string}>) => {
    return messages.map(message => ({
        role: message.role === 'user' ? 'user' : 'model',
        parts: [message.content],
    }));
};

export default {
    generateGeminiResponse,
    formatMessagesForGemini,
};