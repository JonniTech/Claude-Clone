import { SignIn, SignUp } from '@clerk/clerk-react';
import { useState } from 'react';

export function Auth() {
    const [mode, setMode] = useState<'signin' | 'signup'>('signin');

    // Listen for hash changes to switch between signin/signup
    if (window.location.hash === '#/signup' && mode !== 'signup') {
        setMode('signup');
    } else if (window.location.hash === '#/signin' && mode !== 'signin') {
        setMode('signin');
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            {mode === 'signin' ? (
                <SignIn
                    appearance={{
                        elements: {
                            rootBox: 'mx-auto',
                            card: 'shadow-lg',
                        },
                    }}
                    routing="hash"
                    signUpUrl="#/signup"
                />
            ) : (
                <SignUp
                    appearance={{
                        elements: {
                            rootBox: 'mx-auto',
                            card: 'shadow-lg',
                        },
                    }}
                    routing="hash"
                    signInUrl="#/signin"
                />
            )}
        </div>
    );
}
