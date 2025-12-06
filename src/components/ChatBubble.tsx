import { MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ChatBubble = () => {
    return (
        <Link
            to="/ai-support"
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-110 transition-transform duration-200 hover:shadow-xl"
            aria-label="Open AI Support Chat"
        >
            <MessageCircle className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background animate-pulse" />
        </Link>
    );
};

export default ChatBubble;