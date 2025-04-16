
import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Leaf, Send, Bot, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

export function EcoChatAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "👋 Hi there! I'm your EcoSnap Assistant. I can help you with waste sorting questions, sustainability tips, or guide you through the app features. How can I assist you today?",
      sender: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "That's a great question about recycling! Generally, clean and dry plastic containers with recycling codes 1 and 2 are widely accepted. For detailed guidelines in your area, check your local recycling program's website.",
        "Yes, coffee cups are tricky! Most disposable coffee cups have a plastic lining that makes them difficult to recycle. Consider bringing a reusable cup to your local café instead.",
        "Electronic waste should never go in regular trash. Look for e-waste collection events in your community or drop-off points at electronics retailers. Many components contain valuable materials that can be recovered!",
        "Great environmental tip: Try a 'zero-waste challenge' for a week! Use reusable containers, avoid single-use plastics, and be mindful of packaging when shopping. Every small change makes a difference!",
        "Based on your recent waste identification, you might want to consider composting at home. It's easier than you think and great for garden soil!"
      ];
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
      
      toast({
        title: "New Message",
        description: "EcoSnap Assistant has replied to your question",
        duration: 3000,
      });
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-[500px] max-h-[500px] border rounded-lg bg-card overflow-hidden eco-border">
      {/* Chat Header */}
      <div className="p-3 border-b flex items-center bg-eco-primary text-eco-primary-foreground">
        <Bot className="h-5 w-5 mr-2" />
        <h3 className="font-medium">EcoSnap Assistant</h3>
      </div>
      
      {/* Messages Area */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`
                max-w-[80%] rounded-lg p-3 
                ${message.sender === 'user' 
                  ? 'bg-primary text-primary-foreground ml-12' 
                  : 'bg-muted text-foreground mr-12'
                }
              `}
            >
              <div className="flex items-start mb-1">
                {message.sender === 'assistant' && (
                  <Avatar className="h-6 w-6 mr-2 bg-eco-primary text-eco-primary-foreground">
                    <Leaf className="h-3 w-3" />
                  </Avatar>
                )}
                {message.sender === 'user' && (
                  <Avatar className="h-6 w-6 ml-2 order-last bg-primary/20">
                    <User className="h-3 w-3" />
                  </Avatar>
                )}
              </div>
              <p className="text-sm">{message.text}</p>
              <div className={`text-xs mt-1 ${message.sender === 'user' ? 'text-right text-primary-foreground/70' : 'text-muted-foreground'}`}>
                {formatTime(message.timestamp)}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-muted text-foreground rounded-lg p-3 max-w-[80%]">
              <div className="flex space-x-1">
                <div className="h-2 w-2 rounded-full bg-muted-foreground/30 animate-pulse"></div>
                <div className="h-2 w-2 rounded-full bg-muted-foreground/30 animate-pulse delay-75"></div>
                <div className="h-2 w-2 rounded-full bg-muted-foreground/30 animate-pulse delay-150"></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={endOfMessagesRef} />
      </div>
      
      {/* Input Area */}
      <div className="p-3 border-t bg-card">
        <div className="flex space-x-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about waste sorting or eco tips..."
            className="flex-grow"
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={!inputMessage.trim() || isTyping}
            size="icon"
            className="bg-eco-primary hover:bg-eco-600 text-eco-primary-foreground"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
