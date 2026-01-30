import { FiMessageSquare, FiFolderPlus, FiStar, FiBook, FiMoon, FiSun } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { useChatStore } from '@/lib/store';
import { ClaudeLogo } from '@/components/ClaudeLogo';
import { Footer } from '@/components/Footer';
import { useTheme } from '@/components/theme-provider';

export function Welcome() {
    const { createConversation } = useChatStore();
    const { theme, toggleTheme } = useTheme();

    const handleStartChat = () => {
        createConversation();
        window.location.hash = '#/chat';
    };

    const handleFeatureClick = () => {
        window.location.hash = '#/not-implemented';
    };

    const features = [
        {
            icon: FiMessageSquare,
            title: 'Chat',
            description: 'Start a conversation with Claude',
            onClick: handleStartChat,
        },
        {
            icon: FiFolderPlus,
            title: 'Projects',
            description: 'Organize your work into projects',
            onClick: handleFeatureClick,
        },
        {
            icon: FiStar,
            title: 'Starred',
            description: 'Access your favorite chats',
            onClick: handleFeatureClick,
        },
        {
            icon: FiBook,
            title: 'Library',
            description: 'Browse saved conversations',
            onClick: handleFeatureClick,
        },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-background">
            {/* Navbar */}
            <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="flex h-12 sm:h-14 items-center justify-between px-4 sm:px-6 max-w-7xl mx-auto">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <ClaudeLogo size="sm" className="text-primary" />
                        <h1 className="text-sm sm:text-base font-medium">
                            <span className="text-primary">claude</span>
                        </h1>
                    </div>

                    {/* Theme Toggle */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleTheme}
                        className="h-8 w-8 sm:h-9 sm:w-9"
                    >
                        {theme === 'dark' ? (
                            <FiSun className="h-4 w-4 sm:h-5 sm:w-5" />
                        ) : (
                            <FiMoon className="h-4 w-4 sm:h-5 sm:w-5" />
                        )}
                    </Button>
                </div>
            </header>

            {/* Hero Section */}
            <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
                <div className="max-w-4xl w-full text-center space-y-6 sm:space-y-8">
                    {/* Logo/Icon */}
                    <div className="flex justify-center">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
                            <ClaudeLogo size="xl" className="text-primary" />
                        </div>
                    </div>

                    {/* Title */}
                    <div className="space-y-3 sm:space-y-4">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight">
                            Welcome to <span className="text-primary">Claude</span>
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
                            Your AI assistant for thoughtful conversation, analysis, coding, and creative work.
                        </p>
                    </div>

                    {/* CTA Button */}
                    <div className="pt-2 sm:pt-4">
                        <Button
                            onClick={handleStartChat}
                            size="lg"
                            className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 h-auto rounded-full bg-primary hover:bg-primary/90"
                        >
                            <FiMessageSquare className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                            Start a conversation
                        </Button>
                    </div>

                    {/* Feature Grid */}
                    <div className="pt-8 sm:pt-12 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                        {features.map((feature) => (
                            <button
                                key={feature.title}
                                onClick={feature.onClick}
                                className="p-4 sm:p-6 rounded-2xl border border-border bg-card hover:bg-accent transition-colors text-left"
                            >
                                <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary mb-2 sm:mb-3" />
                                <h3 className="text-sm sm:text-base font-medium mb-1">
                                    {feature.title}
                                </h3>
                                <p className="text-xs sm:text-sm text-muted-foreground">
                                    {feature.description}
                                </p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer - same as Chat page */}
            <Footer />
        </div>
    );
}
