import { useState, type KeyboardEvent } from 'react';
import { FiSend, FiPlus } from 'react-icons/fi';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

interface ChatInputProps {
    onSend: (message: string) => void;
    disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (message.trim() && !disabled) {
            onSend(message);
            setMessage('');
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="border-t bg-background p-3 sm:p-4">
            <div className="max-w-3xl mx-auto">
                {/* Claude-style pill-shaped input container */}
                <div className="flex items-end gap-2 bg-card border border-border rounded-3xl px-3 sm:px-4 py-2 shadow-sm">
                    {/* Attachment button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0 rounded-full hover:bg-accent"
                        title="Add attachment"
                    >
                        <FiPlus className="w-4 h-4 sm:w-5 sm:h-5" />
                    </Button>

                    {/* Text input */}
                    <Textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Message Claude..."
                        disabled={disabled}
                        className="min-h-[40px] max-h-[200px] resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent px-0 py-2 text-sm"
                        rows={1}
                    />

                    {/* Send button */}
                    <Button
                        onClick={handleSend}
                        disabled={disabled || !message.trim()}
                        size="icon"
                        className="h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0 rounded-full bg-primary hover:bg-primary/90"
                    >
                        <FiSend className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
