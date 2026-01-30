import OpenAI from 'openai';

const ZAI_API_KEY = import.meta.env.VITE_ZAI_API_KEY;

export interface Message {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

const client = ZAI_API_KEY ? new OpenAI({
    apiKey: ZAI_API_KEY,
    baseURL: 'https://api.z.ai/api/paas/v4/',
    dangerouslyAllowBrowser: true, // Required for frontend usage
}) : null;

export async function sendChatMessage(messages: Message[]): Promise<string> {
    if (!client) {
        console.error('OpenAI client not initialized. Missing API Key.');
        throw new Error('Missing API Key');
    }

    try {
        const completion = await client.chat.completions.create({
            model: 'glm-4.7-flash',
            messages: messages as OpenAI.Chat.ChatCompletionMessageParam[],
        });

        return completion.choices[0]?.message?.content || '';
    } catch (error) {
        console.error('Chat API Error:', error);
        throw error;
    }
}
