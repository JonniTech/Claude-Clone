import { FiUser } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';
import type { Message } from '@/lib/openai';
import { CodeBlock } from './CodeBlock';
import { ThinkingIndicator } from './ThinkingIndicator';
import { ClaudeLogo } from './ClaudeLogo';

interface ChatMessageProps {
    message: Message;
    isFirst?: boolean;
}

export function ChatMessage({ message, isFirst = false }: ChatMessageProps) {
    const isUser = message.role === 'user';

    if (isUser) {
        // User message - aligned right
        return (
            <div className={`w-full px-3 sm:px-4 ${isFirst ? 'pt-6 sm:pt-8 pb-3 sm:pb-4' : 'py-3 sm:py-4'}`}>
                <div className="max-w-3xl mx-auto flex justify-end gap-2 sm:gap-3">
                    <div className="flex flex-col items-end max-w-[85%] sm:max-w-[70%] min-w-0">
                        <div className="bg-primary text-primary-foreground rounded-2xl px-3 sm:px-4 py-2 sm:py-3 max-w-full overflow-hidden">
                            <p className="text-xs sm:text-sm whitespace-pre-wrap break-words leading-relaxed">
                                {message.content}
                            </p>
                        </div>
                    </div>
                    <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                        <FiUser className="w-3 h-3 sm:w-4 sm:h-4" />
                    </div>
                </div>
            </div>
        );
    }

    // Assistant message - aligned left with markdown formatting
    return (
        <div className="w-full px-3 sm:px-4 py-3 sm:py-4">
            <div className="max-w-3xl mx-auto flex justify-start gap-2 sm:gap-3">
                <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <ClaudeLogo size="sm" className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="flex flex-col items-start max-w-[85%] sm:max-w-[70%] min-w-0 overflow-hidden">
                    <div className="bg-card text-card-foreground rounded-2xl px-3 sm:px-4 py-2 sm:py-3 shadow-sm border max-w-full overflow-hidden">
                        {message.content ? (
                            <div className="prose prose-sm dark:prose-invert max-w-none text-xs sm:text-sm text-card-foreground">
                                <ReactMarkdown
                                    components={{
                                        pre(props) {
                                            return <>{props.children}</>;
                                        },
                                        code(props) {
                                            const { children, className, ...rest } = props;
                                            const match = /language-(\w+)/.exec(className || '');
                                            const codeText = String(children).replace(/\n$/, '');

                                            if (match) {
                                                return (
                                                    <CodeBlock className={className || ''}>
                                                        {codeText}
                                                    </CodeBlock>
                                                );
                                            }

                                            return (
                                                <code className={className} {...rest}>
                                                    {children}
                                                </code>
                                            );
                                        },
                                    }}
                                >
                                    {message.content}
                                </ReactMarkdown>
                            </div>
                        ) : (
                            <ThinkingIndicator />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
