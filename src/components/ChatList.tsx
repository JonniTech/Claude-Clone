import { ChatMessage } from './ChatMessage';
import { ClaudeLogo } from './ClaudeLogo';
import type { Message } from '@/lib/openai';

interface ChatListProps {
    messages: Message[];
    messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

export function ChatList({ messages, messagesEndRef }: ChatListProps) {
    if (messages.length === 0) {
        return (
            <div className="flex-1 flex items-center justify-center p-3 sm:p-4">
                <div className="text-center space-y-4 sm:space-y-6">
                    <div className="flex justify-center">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center">
                            <ClaudeLogo size="lg" className="text-primary" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-xl sm:text-2xl font-medium">How can I help you today?</h2>
                        <p className="text-sm sm:text-base text-muted-foreground">
                            Start a conversation by typing a message below.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto">
            {messages.map((message, index) => (
                <ChatMessage
                    key={index}
                    message={message}
                    isFirst={index === 0}
                />
            ))}
            <div ref={messagesEndRef} />
        </div>
    );
}
