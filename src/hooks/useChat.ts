import { useState, useRef, useEffect } from 'react';
import { useChatStore } from '@/lib/store';
import { sendChatMessage, type Message } from '@/lib/openai';

export function useChat() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const {
        activeConversationId,
        getActiveConversation,
        addMessage,
        updateLastMessage,
        updateConversationTitle,
    } = useChatStore();

    const activeConversation = getActiveConversation();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [activeConversation?.messages]);

    const sendMessage = async (content: string) => {
        if (!content.trim() || !activeConversationId || isLoading) return;

        setError(null);
        setIsLoading(true);

        // Add user message
        const userMessage: Message = { role: 'user', content: content.trim() };
        addMessage(activeConversationId, userMessage);

        // Update conversation title if it's the first message
        if (activeConversation?.messages.length === 0) {
            const title = content.trim().slice(0, 50) + (content.length > 50 ? '...' : '');
            updateConversationTitle(activeConversationId, title);
        }

        try {
            // Prepare messages for API
            const systemMessage: Message = {
                role: 'system',
                content: 'You are Claude, a large language model trained by Anthropic. When users ask who you are, always respond that you are Claude, an AI assistant created by Anthropic. Be helpful, harmless, and honest.',
            };

            const allMessages = [
                systemMessage,
                ...(activeConversation?.messages || []),
                userMessage,
            ];

            // Add empty assistant message
            const assistantMessage: Message = { role: 'assistant', content: '' };
            addMessage(activeConversationId, assistantMessage);

            // Call API
            const response = await sendChatMessage(allMessages);

            // Update assistant message
            updateLastMessage(activeConversationId, response);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to send message');
            console.error('Error sending message:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        messages: activeConversation?.messages || [],
        isLoading,
        error,
        sendMessage,
        messagesEndRef,
    };
}
