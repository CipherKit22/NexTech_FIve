
import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Shield, Send, Bot, User, FileSearch, Database, Download, Volume2, Brain, Settings as SettingsIcon } from 'lucide-react';
import ChatMessage from '@/components/ChatMessage';
import ThreatScanner from '@/components/ThreatScanner';
import PrivacyTools from '@/components/PrivacyTools';
import PasswordGenerator from '@/components/PasswordGenerator';
import CrimeDashboard from '@/components/CrimeDashboard';
import QuickActions from '@/components/QuickActions';
import FloatingBackground from '@/components/FloatingBackground';
import LoadingSpinner from '@/components/LoadingSpinner';
import Settings from '@/components/Settings';
import { detectLanguage, translateText } from '@/utils/languageUtils';
import { generateChatResponse } from '@/utils/chatUtils';
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  language: 'en' | 'my';
  timestamp: Date;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'my' | null>(null);
  const [activeTab, setActiveTab] = useState('chat');
  const [isTabLoading, setIsTabLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (currentLanguage) {
      // Welcome message
      const welcomeMessage: Message = {
        id: '1',
        content: currentLanguage === 'en' 
          ? "Hello! I'm Mg Cyber, your AI-powered cybersecurity assistant for Myanmar created by Team NextTech Five from IT Major of Technological University (Hmawbi). I can help you stay safe online, scan threats, and protect your privacy. How can I help you today?"
          : "မင်္ဂလာပါ! ကျွန်တော် Mg Cyber ပါ၊ Technological University (Hmawbi) ၏ IT Major မှ Team NextTech Five မှ ဖန်တီးထားသော မြန်မာနိုင်ငံအတွက် AI-powered cybersecurity လုံခြုံရေးအကူအညီပေးစနစ်ပါ။ အွန်လိုင်းလုံခြုံရေး၊ ခြိမ်းခြောက်မှုများစစ်ဆေးခြင်း၊ ကိုယ်ရေးကိုယ်တာကာကွယ်ခြင်းတို့တွင် ကူညီပေးနိုင်ပါတယ်။ ဘယ်လိုကူညီရမလဲ?",
        isUser: false,
        language: currentLanguage,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [currentLanguage]);

  // Apply dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const speakText = (text: string, language: 'en' | 'my') => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'my' ? 'my-MM' : 'en-US';
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !currentLanguage) return;

    const detectedLanguage = detectLanguage(inputValue);
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      language: detectedLanguage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await generateChatResponse(inputValue, detectedLanguage, currentLanguage);
      
      // Simulate faster thinking time - reduced from previous timing
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        isUser: false,
        language: detectedLanguage, // Use detected language for response
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleTabChange = (value: string) => {
    setIsTabLoading(true);
    setTimeout(() => {
      setActiveTab(value);
      setIsTabLoading(false);
    }, 1200); // Longer loading time
  };

  const downloadChatHistory = () => {
    const chatHistory = messages.map(msg => ({
      timestamp: msg.timestamp.toISOString(),
      sender: msg.isUser ? 'User' : 'Mg Cyber',
      message: msg.content
    }));

    const dataStr = JSON.stringify(chatHistory, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `mg-cyber-chat-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Language selection dialog
  const LanguageSelection = () => (
    <Dialog open={currentLanguage === null} onOpenChange={() => {}}>
      <DialogContent className="max-w-md rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-center gradient-text text-xl mb-4">
            Choose Your Language / ဘာသာစကားရွေးချယ်ပါ
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Button
            onClick={() => setCurrentLanguage('en')}
            className="w-full p-6 text-lg rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg transition-all duration-300"
          >
            English
          </Button>
          <Button
            onClick={() => setCurrentLanguage('my')}
            className="w-full p-6 text-lg rounded-2xl bg-gradient-to-r from-green-500 to-blue-600 hover:shadow-lg transition-all duration-300"
          >
            မြန်မာ
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  if (currentLanguage === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
        <FloatingBackground />
        <LanguageSelection />
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-300 via-white to-purple-300 relative overflow-hidden ${isDarkMode ? 'dark' : ''}`}>
      <FloatingBackground />
      
      {/* Header */}
      <div className="border-b bg-white/50 backdrop-blur-sm sticky top-0 z-50 py-1">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="gradient-bg p-2 rounded-2xl">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text font-poppins">Mg Cyber</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-poppins">
                  AI Chatbot for Myanmar
                </p>
              </div>
            </div>
            <Button
              onClick={downloadChatHistory}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 rounded-full font-poppins dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              <Download className="h-4 w-4" />
              {currentLanguage === 'en' ? 'Download Chat' : 'စကားပြောမှုထုတ်ယူရန်'}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6 rounded-3xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <TabsTrigger value="chat" className="flex items-center gap-2 rounded-3xl font-poppins dark:text-gray-200 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white">
              <Bot className="h-4 w-4" />
              {currentLanguage === 'en' ? 'Chat' : 'စကားပြော'}
            </TabsTrigger>
            <TabsTrigger value="scanner" className="flex items-center gap-2 rounded-3xl font-poppins dark:text-gray-200 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white">
              <FileSearch className="h-4 w-4" />
              {currentLanguage === 'en' ? 'Scanner' : 'စစ်ဆေးရန်'}
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex items-center gap-2 rounded-3xl font-poppins dark:text-gray-200 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white">
              <Database className="h-4 w-4" />
              {currentLanguage === 'en' ? 'Dashboard' : 'ဒက်ရှ်ဘုတ်'}
            </TabsTrigger>
            <TabsTrigger value="tools" className="flex items-center gap-2 rounded-3xl font-poppins dark:text-gray-200 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white">
              <Shield className="h-4 w-4" />
              {currentLanguage === 'en' ? 'Tools' : 'ကိရိယာများ'}
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2 rounded-3xl font-poppins dark:text-gray-200 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white">
              <SettingsIcon className="h-4 w-4" />
              {currentLanguage === 'en' ? 'Settings' : 'ဆက်တင်'}
            </TabsTrigger>
          </TabsList>

          {isTabLoading && (
            <div className="flex justify-center items-center h-96 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-3xl">
              <LoadingSpinner size="lg" />
            </div>
          )}

          {!isTabLoading && (
            <>
              <TabsContent value="chat" className="space-y-4">
                {/* Chat Messages */}
                <Card className="h-96 overflow-y-auto p-4 space-y-4 rounded-3xl bg-white/70 dark:bg-gray-900/90 backdrop-blur-sm dark:border-gray-800">
                  {messages.map((message) => (
                    <div key={message.id} className="flex flex-col space-y-2">
                      <div className={`flex gap-3 ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                        {!message.isUser && (
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                              <Bot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            </div>
                          </div>
                        )}
                        
                        <div className={`max-w-[85%] px-4 py-3 rounded-2xl ${
                          message.isUser 
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                            : 'bg-white/90 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700'
                        }`}>
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm whitespace-pre-wrap font-poppins flex-1">{message.content}</p>
                            {!message.isUser && message.language === 'en' && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => speakText(message.content, message.language)}
                                className="h-6 w-6 p-0 flex-shrink-0 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                              >
                                <Volume2 className="h-3 w-3 dark:text-gray-300" />
                              </Button>
                            )}
                          </div>
                          
                          <div className="flex items-center justify-end mt-2">
                            <span className="text-xs opacity-70 font-poppins dark:text-gray-300">
                              {message.timestamp.toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </span>
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
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white/90 dark:bg-gray-800 rounded-3xl p-4 max-w-xs border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                          <LoadingSpinner size="sm" />
                          <Brain className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          <span className="text-sm text-blue-600 dark:text-blue-400 font-poppins">
                            {currentLanguage === 'en' ? 'Thinking...' : 'စဉ်းစားနေသည်...'}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </Card>

                {/* Input Area */}
                <div className="flex gap-3 items-center relative">
                  <QuickActions 
                    currentLanguage={currentLanguage}
                    onActionSelect={setInputValue}
                  />
                  <div className="gradient-border flex-1">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={currentLanguage === 'en' 
                        ? "Ask about cybersecurity, threats, or privacy..." 
                        : "လုံခြုံရေး၊ ခြိမ်းခြောက်မှု သို့မဟုတ် ကိုယ်ရေးကိုယ်တာအကြောင်း မေးပါ..."
                      }
                      disabled={isLoading}
                      className="rounded-3xl border-0 font-poppins dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500"
                    />
                  </div>
                  <Button 
                    onClick={handleSendMessage} 
                    disabled={isLoading || !inputValue.trim()}
                    className="rounded-full w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg transition-all duration-300 p-0"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="scanner" className="bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-3xl p-6">
                <ThreatScanner currentLanguage={currentLanguage} />
              </TabsContent>

              <TabsContent value="dashboard" className="bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-3xl p-6">
                <CrimeDashboard currentLanguage={currentLanguage} />
              </TabsContent>

              <TabsContent value="tools" className="bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-3xl p-6">
                <div className="space-y-6">
                  <PasswordGenerator currentLanguage={currentLanguage} />
                  <PrivacyTools currentLanguage={currentLanguage} />
                </div>
              </TabsContent>

              <TabsContent value="settings" className="bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-3xl p-6">
                <Settings 
                  currentLanguage={currentLanguage}
                  onLanguageChange={setCurrentLanguage}
                  isDarkMode={isDarkMode}
                  onDarkModeChange={setIsDarkMode}
                />
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
