import {
    FiPlus,
    FiMessageSquare,
    FiTrash2,
    FiFolderPlus,
    FiSettings,
    FiHelpCircle,
    FiStar,
    FiChevronsLeft,
    FiChevronsRight
} from 'react-icons/fi';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { useChatStore } from '@/lib/store';
import { cn } from '@/lib/utils';

interface SidebarProps {
    isMobileOpen?: boolean;
    isDesktopCollapsed?: boolean;
    onMobileClose?: () => void;
    onDesktopToggle?: () => void;
}

export function Sidebar({
    isMobileOpen = false,
    isDesktopCollapsed = false,
    onMobileClose,
    onDesktopToggle
}: SidebarProps) {
    const {
        conversations,
        activeConversationId,
        createConversation,
        setActiveConversation,
        deleteConversation,
    } = useChatStore();

    const handleNewChat = () => {
        createConversation();
        onMobileClose?.();
    };

    const handleSelectConversation = (id: string) => {
        setActiveConversation(id);
        onMobileClose?.();
    };

    const handleDeleteConversation = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        deleteConversation(id);
    };

    const handleFeatureClick = () => {
        window.location.hash = '#/not-implemented';
        onMobileClose?.();
    };

    return (
        <>
            {/* Mobile overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
                    onClick={onMobileClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    'fixed md:relative inset-y-0 left-0 z-50 bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 ease-in-out',
                    // Mobile: slide in/out
                    isMobileOpen ? 'translate-x-0' : '-translate-x-full',
                    // Desktop: always visible, but collapse width
                    'md:translate-x-0',
                    isDesktopCollapsed ? 'md:w-16' : 'md:w-64',
                    // Mobile width
                    'w-64'
                )}
            >
                {/* Top Actions */}
                <div className="p-2 sm:p-3 space-y-1.5 sm:space-y-2 border-b border-sidebar-border">
                    {/* Collapse Toggle Button - Desktop only */}
                    <Button
                        onClick={onDesktopToggle}
                        className="hidden md:flex w-full justify-center gap-2 text-xs sm:text-sm h-8 sm:h-10 mb-2"
                        variant="ghost"
                        title={isDesktopCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        {isDesktopCollapsed ? (
                            <FiChevronsRight className="w-4 h-4" />
                        ) : (
                            <FiChevronsLeft className="w-4 h-4" />
                        )}
                    </Button>

                    {/* New Chat Button - Claude's pill-shaped style */}
                    <Button
                        onClick={handleNewChat}
                        className={cn(
                            "w-full gap-2 text-xs sm:text-sm h-9 sm:h-11 rounded-full bg-primary text-primary-foreground hover:bg-primary/90",
                            isDesktopCollapsed ? "md:justify-center md:px-2" : "justify-start px-4"
                        )}
                        title="New Chat"
                    >
                        <FiPlus className="w-4 h-4 flex-shrink-0" />
                        <span className={cn(isDesktopCollapsed && "md:hidden")}>New chat</span>
                    </Button>

                    {/* Feature Buttons */}
                    <Button
                        onClick={handleFeatureClick}
                        className={cn(
                            "w-full gap-2 text-xs sm:text-sm h-7 sm:h-9",
                            isDesktopCollapsed ? "md:justify-center md:px-2" : "justify-start"
                        )}
                        variant="ghost"
                        title="Projects"
                    >
                        <FiFolderPlus className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span className={cn(isDesktopCollapsed && "md:hidden")}>Projects</span>
                    </Button>

                    <Button
                        onClick={handleFeatureClick}
                        className={cn(
                            "w-full gap-2 text-xs sm:text-sm h-7 sm:h-9",
                            isDesktopCollapsed ? "md:justify-center md:px-2" : "justify-start"
                        )}
                        variant="ghost"
                        title="Starred"
                    >
                        <FiStar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span className={cn(isDesktopCollapsed && "md:hidden")}>Starred</span>
                    </Button>
                </div>

                {/* Recent Chats */}
                <div className={cn(
                    "flex-1 flex flex-col min-h-0 overflow-hidden",
                    isDesktopCollapsed && "md:hidden"
                )}>
                    <div className="px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs font-medium text-sidebar-foreground/60 flex-shrink-0">
                        RECENTS
                    </div>

                    <ScrollArea className="flex-1 overflow-y-auto">
                        <div className="px-1.5 sm:px-2 pb-2 space-y-0.5 sm:space-y-1">
                            {conversations.length === 0 ? (
                                <div className="px-2 sm:px-3 py-4 sm:py-6 text-center text-xs sm:text-sm text-sidebar-foreground/50">
                                    No conversations yet
                                </div>
                            ) : (
                                conversations.map((conversation) => (
                                    <div
                                        key={conversation.id}
                                        className={cn(
                                            'group relative flex items-start gap-1.5 sm:gap-2 rounded-lg px-2 sm:px-3 py-2 text-xs sm:text-sm cursor-pointer hover:bg-sidebar-accent transition-colors',
                                            activeConversationId === conversation.id && 'bg-sidebar-accent'
                                        )}
                                        onClick={() => handleSelectConversation(conversation.id)}
                                    >
                                        <FiMessageSquare className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 text-sidebar-foreground mt-0.5" />
                                        <span className="flex-1 break-words text-sidebar-foreground leading-snug">
                                            {conversation.title}
                                        </span>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-5 w-5 sm:h-6 sm:w-6 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 -mr-1"
                                            onClick={(e) => handleDeleteConversation(conversation.id, e)}
                                        >
                                            <FiTrash2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                        </Button>
                                    </div>
                                ))
                            )}
                        </div>
                    </ScrollArea>
                </div>

                {/* Bottom Links */}
                <div className="p-1.5 sm:p-2 border-t border-sidebar-border space-y-0.5 sm:space-y-1">
                    <Button
                        onClick={handleFeatureClick}
                        className={cn(
                            "w-full gap-2 text-xs sm:text-sm h-7 sm:h-9",
                            isDesktopCollapsed ? "md:justify-center md:px-2" : "justify-start"
                        )}
                        variant="ghost"
                        title="Settings"
                    >
                        <FiSettings className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span className={cn(isDesktopCollapsed && "md:hidden")}>Settings</span>
                    </Button>

                    <Button
                        onClick={handleFeatureClick}
                        className={cn(
                            "w-full gap-2 text-xs sm:text-sm h-7 sm:h-9",
                            isDesktopCollapsed ? "md:justify-center md:px-2" : "justify-start"
                        )}
                        variant="ghost"
                        title="Help & Support"
                    >
                        <FiHelpCircle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span className={cn(isDesktopCollapsed && "md:hidden")}>Help & Support</span>
                    </Button>
                </div>
            </aside>
        </>
    );
}
