import { MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

const MotionLink = motion(Link);

const ChatBubble = () => {
    const [mounted, setMounted] = useState(false);
    const [translateY, setTranslateY] = useState(0); // px to translate up when footer overlaps

    useEffect(() => {
        setMounted(true);

        const updateOverlap = () => {
            const footer = document.querySelector('footer');
            if (!footer) {
                setTranslateY(0);
                return;
            }

            const rect = footer.getBoundingClientRect();
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

            if (rect.top < viewportHeight) {
                const overlap = Math.max(0, viewportHeight - rect.top);
                // Add small gap so the bubble isn't flush with the footer
                setTranslateY(Math.ceil(overlap + 12));
            } else {
                setTranslateY(0);
            }
        };

        // Use both an intersection observer and scroll/resize updates for responsiveness
        const footerEl = document.querySelector('footer');
        let obs: IntersectionObserver | null = null;
        if (footerEl && 'IntersectionObserver' in window) {
            obs = new IntersectionObserver(() => updateOverlap(), { root: null, threshold: [0, 0.01, 0.1] });
            obs.observe(footerEl);
        }

        updateOverlap();
        window.addEventListener('scroll', updateOverlap, { passive: true });
        window.addEventListener('resize', updateOverlap);

        return () => {
            window.removeEventListener('scroll', updateOverlap);
            window.removeEventListener('resize', updateOverlap);
            if (obs && footerEl) obs.unobserve(footerEl);
        };
    }, []);

    const bubble = (
        <MotionLink
            to="/ai-support"
            title="Open AI Support"
            className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-600 text-white shadow-2xl hover:scale-110 hover:shadow-3xl ring-2 ring-white/20"
            aria-label="Open AI Support Chat"
            style={{
                position: 'fixed',
                bottom: '1.5rem',
                right: '1.5rem',
                zIndex: 2147483647,
                transform: `translateY(-${translateY}px)`,
            }}
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 2.6, ease: 'easeInOut' }}
            whileHover={{ scale: 1.07 }}
        >
            <MessageCircle className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white/80 animate-pulse" />
        </MotionLink>
    );

    if (!mounted) return null;

    return createPortal(bubble, document.body);
};

export default ChatBubble;