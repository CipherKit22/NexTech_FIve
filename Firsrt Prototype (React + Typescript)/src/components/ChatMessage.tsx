
import { useState, useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { cn } from '@/lib/utils';
import { Message } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface ChatMessageProps {
  message: Message;
  isTTSEnabled: boolean;
  onTTSToggle: () => void;
}

const ChatMessage = ({ message, isTTSEnabled, onTTSToggle }: ChatMessageProps) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [displayedContent, setDisplayedContent] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<number | null>(null);
  const { toast } = useToast();
  const utterance = new SpeechSynthesisUtterance(message.content);
  
  const handleTTSToggle = () => {
    setIsSpeaking(!isSpeaking);
    onTTSToggle();
  };
  
  useEffect(() => {
    if (isSpeaking) {
      speechSynthesis.speak(utterance);
    } else {
      speechSynthesis.cancel();
    }

    return () => {
      speechSynthesis.cancel();
    };
  }, [isSpeaking, utterance]);
  
  // Letter-by-letter animation effect for bot messages
  useEffect(() => {
    // Only animate bot messages
    if (!message.isUser) {
      let currentIndex = 0;
      const content = message.content;
      setIsAnimating(true);
      
      const animateText = () => {
        if (currentIndex <= content.length) {
          setDisplayedContent(content.substring(0, currentIndex));
          currentIndex++;
          animationRef.current = requestAnimationFrame(animateText);
        } else {
          setIsAnimating(false);
          animationRef.current = null;
        }
      };
      
      animationRef.current = requestAnimationFrame(animateText);
      
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }
      };
    } else {
      // For user messages, show content immediately
      setDisplayedContent(message.content);
    }
  }, [message]);
  return (
    <div className={`flex gap-3 ${message.isUser ? 'justify-end' : 'justify-start'}`}>
      {!message.isUser && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
            <Bot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      )}
      
      <div className={cn(
        "flex-1 px-4 py-2 rounded-3xl max-w-[85%] break-words",
        message.isUser 
          ? "bg-purple-500 text-white ml-auto rounded-br-none" 
          : "bg-white dark:bg-gray-800 dark:text-gray-100 mr-auto rounded-bl-none"
      )}>
        <div className="mb-1 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="font-medium text-xs">
              {message.isUser ? 'You' : 'Mg Cyber'}
            </span>
            {message.language && (
              <Badge variant="outline" className={cn(
                "text-[10px] px-1 py-0 h-4",
                message.isUser 
                  ? "text-purple-200 border-purple-300" 
                  : "text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-600"
              )}>
                {message.language === 'en' ? 'English' : 'Burmese'}
              </Badge>
            )}
          </div>
          
          {/* TTS Button for Bot Messages */}
          {!message.isUser && isTTSEnabled && message.language === 'en' && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 w-6 p-0 rounded-full" 
              onClick={handleTTSToggle}
            >
              {isSpeaking ? (
                <VolumeX className="h-3 w-3 text-gray-500 dark:text-gray-400" />
              ) : (
                <Volume2 className="h-3 w-3 text-gray-500 dark:text-gray-400" />
              )}
            </Button>
          )}
        </div>
        
        <div className="prose prose-sm dark:prose-invert max-w-none min-h-[50px]">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({node, inline, className, children, ...props}) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <SyntaxHighlighter
                    {...props}
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code {...props} className={className}>
                    {children}
                  </code>
                )
              }
            }}
          >
            {!message.isUser ? displayedContent : message.content}
          </ReactMarkdown>
        </div>
      </div>

      {message.isUser && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
            <User className="h-4 w-4 text-green-600 dark:text-green-400" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
