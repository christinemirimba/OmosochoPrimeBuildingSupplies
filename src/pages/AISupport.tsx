import { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Send, Bot, User, Loader2, MessageCircle, X, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import FadeInSection from '@/components/FadeInSection';
import ExitButton from '@/components/ExitButton';
import { toast } from 'sonner';
import { generateGeminiResponse, formatMessagesForGemini } from '@/integrations/gemini/client';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const WELCOME_MESSAGE = `Hello! I'm your Project Planning AI Assistant for Omosocho Prime Building Supplies. I can help with construction planning, material selection, project estimates, and any questions about building supplies in Kenya. How can I assist you today?`;

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
      // Format messages for Gemini API
      const formattedMessages = formatMessagesForGemini([
        ...messages,
        { role: 'user', content: userMessage }
      ]);

      // Call Gemini API
      const result = await generateGeminiResponse(userMessage, formattedMessages);

      if (!result.success) {
        throw new Error(result.error || 'Failed to get Gemini response');
      }

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: result.response },
      ]);
    } catch (error) {
      console.error('Gemini API Error:', error);
      toast.error('Failed to get AI response');
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "I apologize, but I'm having trouble connecting to the AI service right now. Please try again in a moment or contact our support team directly at +254705621054 or email nikeombura@gmail.com.",
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

      <div className="container mx-auto px-4 py-4 sm:py-8 h-[calc(100vh-theme(spacing.16))] flex flex-col relative">
          {/* Exit Button - Close type for AI Support page */}
          <div className="absolute top-4 right-4 z-10">
              <ExitButton type="close" className="relative" />
          </div>
          <FadeInSection>
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl sm:text-2xl font-heading font-bold">AI Support Assistant</h1>
          </div>
        </FadeInSection>

        <Card className="flex-1 flex flex-col overflow-hidden border-2 relative">
          {/* Exit Button - Close type for AI Support modal - INSIDE the modal */}
          <div className="absolute top-4 right-4 z-10">
            <ExitButton type="close" className="relative" />
          </div>

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
                      {message.role === 'assistant' ? (
                        <div className="ai-response">
                          {message.content.split('\n\n').map((paragraph, i) => (
                            <div key={i} className="mb-3 last:mb-0">
                              {paragraph.startsWith('## ') ? (
                                <h3 className="text-base sm:text-lg font-semibold mb-2 text-primary">{paragraph.replace('## ', '')}</h3>
                              ) : paragraph.startsWith('**') ? (
                                <div className="ml-0 pl-0 border-l-2 border-primary">
                                  {paragraph.split('\n').map((line, j) => (
                                    <p key={j} className="mb-1 last:mb-0">{line}</p>
                                  ))}
                                </div>
                              ) : (
                                <p className="mb-1 last:mb-0">{paragraph}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        message.content.split('\n').map((line, i) => (
                          <p key={i} className="mb-1 last:mb-0">{line}</p>
                        ))
                      )}
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
