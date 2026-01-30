interface ClaudeLogoProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10',
};

export function ClaudeLogo({ className = '', size = 'md' }: ClaudeLogoProps) {
    return (
        <svg
            className={`${sizeClasses[size]} ${className}`}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Claude AI Logo - Stylized Flower/Sun Symbol */}
            <path
                d="M12 2C12 2 14.5 4.5 14.5 7.5C14.5 9.5 13.5 11 12 12C10.5 11 9.5 9.5 9.5 7.5C9.5 4.5 12 2 12 2Z"
                fill="currentColor"
            />
            <path
                d="M22 12C22 12 19.5 14.5 16.5 14.5C14.5 14.5 13 13.5 12 12C13 10.5 14.5 9.5 16.5 9.5C19.5 9.5 22 12 22 12Z"
                fill="currentColor"
            />
            <path
                d="M12 22C12 22 9.5 19.5 9.5 16.5C9.5 14.5 10.5 13 12 12C13.5 13 14.5 14.5 14.5 16.5C14.5 19.5 12 22 12 22Z"
                fill="currentColor"
            />
            <path
                d="M2 12C2 12 4.5 9.5 7.5 9.5C9.5 9.5 11 10.5 12 12C11 13.5 9.5 14.5 7.5 14.5C4.5 14.5 2 12 2 12Z"
                fill="currentColor"
            />
            <path
                d="M19.07 4.93C19.07 4.93 17.5 8.5 14.5 10.5C12.9 11.6 11.2 11.9 10 11.5C10.4 10.3 11.1 8.9 12.5 7.5C15.5 4.5 19.07 4.93 19.07 4.93Z"
                fill="currentColor"
            />
            <path
                d="M19.07 19.07C19.07 19.07 15.5 17.5 13.5 14.5C12.4 12.9 12.1 11.2 12.5 10C13.7 10.4 15.1 11.1 16.5 12.5C19.5 15.5 19.07 19.07 19.07 19.07Z"
                fill="currentColor"
            />
            <path
                d="M4.93 19.07C4.93 19.07 6.5 15.5 9.5 13.5C11.1 12.4 12.8 12.1 14 12.5C13.6 13.7 12.9 15.1 11.5 16.5C8.5 19.5 4.93 19.07 4.93 19.07Z"
                fill="currentColor"
            />
            <path
                d="M4.93 4.93C4.93 4.93 8.5 6.5 10.5 9.5C11.6 11.1 11.9 12.8 11.5 14C10.3 13.6 8.9 12.9 7.5 11.5C4.5 8.5 4.93 4.93 4.93 4.93Z"
                fill="currentColor"
            />
            <circle cx="12" cy="12" r="2.5" fill="currentColor" />
        </svg>
    );
}
