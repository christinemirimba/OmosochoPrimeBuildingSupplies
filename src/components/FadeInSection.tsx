import { useState, useEffect, useRef } from 'react';

interface FadeInSectionProps {
    children: React.ReactNode;
    delay?: number;
}

const FadeInSection = ({ children, delay = 0 }: FadeInSectionProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        setIsVisible(true);
                    }, delay);
                }
            });
        });

        const currentRef = domRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [delay]);

    return (
        <div
            className={`fade-in ${isVisible ? 'visible' : ''}`}
            ref={domRef}
        >
            {children}
        </div>
    );
};

export default FadeInSection;
