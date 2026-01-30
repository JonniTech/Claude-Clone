import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const thinkingSteps = [
    { text: 'Understanding your question...', icon: '🤔' },
    { text: 'Analyzing context...', icon: '🔍' },
    { text: 'Searching knowledge base...', icon: '📚' },
    { text: 'Processing information...', icon: '⚙️' },
    { text: 'Formulating response...', icon: '✍️' },
    { text: 'Refining answer...', icon: '✨' },
    { text: 'Almost ready...', icon: '🎯' },
];

export function ThinkingIndicator() {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep((prev) => (prev + 1) % thinkingSteps.length);
        }, 2000); // Change message every 2 seconds

        return () => clearInterval(interval);
    }, []);

    const step = thinkingSteps[currentStep];

    return (
        <div className="flex items-center gap-2">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-2"
                >
                    <span className="text-sm">{step.icon}</span>
                    <span className="text-xs sm:text-sm text-muted-foreground italic">
                        {step.text}
                    </span>
                </motion.div>
            </AnimatePresence>
            <motion.div
                className="flex gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                {[0, 1, 2].map((i) => (
                    <motion.span
                        key={i}
                        className="w-1.5 h-1.5 bg-primary/60 rounded-full"
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            delay: i * 0.2,
                        }}
                    />
                ))}
            </motion.div>
        </div>
    );
}
