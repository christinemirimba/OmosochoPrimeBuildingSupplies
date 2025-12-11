import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

const ScrollToTopButton = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setVisible(window.scrollY > 300);
        };

        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    if (!visible) return null;

    return (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
            title="Scroll to top"
            className="fixed right-6 bottom-28 z-[9998] w-12 h-12 rounded-full bg-white/95 dark:bg-background shadow-md flex items-center justify-center text-primary hover:scale-105 transition-transform duration-150"
        >
            <ChevronUp className="w-5 h-5" />
        </button>
    );
};

export default ScrollToTopButton;
