import { MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ChatBubble = () => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate('/ai-support')}
      className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      size="icon"
    >
      <MessageCircle className="h-6 w-6 text-primary-foreground" />
      <span className="sr-only">Open AI Support</span>
    </Button>
  );
};

export default ChatBubble;
