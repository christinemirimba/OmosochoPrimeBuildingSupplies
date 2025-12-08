import { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Send, Bot, User, Loader2, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import FadeInSection from '@/components/FadeInSection';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const WELCOME_MESSAGE = `Hello! I'm your Project Planning AI Assistant from Omosocho Prime Building Supplies. I can help you with:

• **Construction material selection** - cement, steel, ballast, sand, etc.
• **House/structure costing guidance** - estimates for different project sizes
• **Estimating quantity of materials** - accurate calculations for your project
• **Roofing & finishing recommendations** - best options for Kisii climate
• **Quotation guidance** - product suggestions and quote preparation

How can I assist you today?`;

const SUGGESTED_QUESTIONS = [
  "What materials do I need for a 3-bedroom house?",
  "How much cement is needed for a 100 sqm floor?",
  "Best roofing materials for Kisii climate?",
  "Price estimate for building a perimeter wall?",
  "Steel bar requirements for foundation?",
  "What's in your product catalog?"
];

const AiSupport = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: WELCOME_MESSAGE },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { 
          messages: [...messages, { role: 'user', content: userMessage }]
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.response },
      ]);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to get response');
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment or contact our support team directly at +254705621054 or email nikeombura@gmail.com.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <>
      <Helmet>
        <title>AI Support Assistant | Omosocho Prime</title>
        <meta name="description" content="Get instant AI-powered assistance for your construction questions at Omosocho Prime Building Supplies." />
      </Helmet>

      <div className="container mx-auto px-4 py-4 sm:py-8 h-[calc(100vh-theme(spacing.16))] flex flex-col">
        <FadeInSection>
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-heading font-bold">AI Support Assistant</h1>
              <p className="text-xs sm:text-sm text-muted-foreground">Powered by Omosocho Prime</p>
            </div>
          </div>
        </FadeInSection>

        <Card className="flex-1 flex flex-col overflow-hidden border-2">
          {/* Chat Area */}
          <ScrollArea className="flex-1 p-4 sm:p-6" ref={scrollRef}>
            <div className="space-y-4 sm:space-y-6">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-2 sm:gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base ${message.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-md'
                      : 'bg-secondary text-secondary-foreground rounded-bl-md'
                      }`}
                  >
                    <div className="whitespace-pre-wrap prose prose-sm dark:prose-invert max-w-none">
                      {message.content.split('\n').map((line, i) => (
                        <p key={i} className="mb-1 last:mb-0">{line}</p>
                      ))}
                    </div>
                  </div>
                  {message.role === 'user' && (
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-3 h-3 sm:w-4 sm:h-4 text-accent-foreground" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-2 sm:gap-4">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                  </div>
                  <div className="bg-secondary rounded-2xl rounded-bl-md px-3 py-2 sm:px-4 sm:py-3">
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin text-muted-foreground" />
                  </div>
                </div>
              )}
            </div>

            {/* Suggested Questions */}
            {messages.length === 1 && (
              <div className="mt-6 sm:mt-8">
                <p className="text-xs sm:text-sm text-muted-foreground mb-3 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Try asking:
                </p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_QUESTIONS.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestedQuestion(question)}
                      className="text-xs sm:text-sm bg-secondary hover:bg-secondary/80 text-secondary-foreground px-3 py-1.5 sm:px-4 sm:py-2 rounded-full transition-colors border border-border hover:border-primary/50"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t border-border bg-card p-3 sm:p-4">
            <form onSubmit={handleSubmit} className="flex gap-2 sm:gap-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about materials, estimates, or project planning..."
                className="flex-1 rounded-full px-4 sm:px-6 text-sm sm:text-base"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                className="rounded-full h-9 w-9 sm:h-10 sm:w-10 shrink-0"
                disabled={!input.trim() || isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </>
  );
};

export default AiSupport;
