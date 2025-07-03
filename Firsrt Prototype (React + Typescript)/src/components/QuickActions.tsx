
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

interface QuickActionsProps {
  currentLanguage: string;
  onActionSelect: (action: string) => void;
}

const QuickActions = ({ currentLanguage, onActionSelect }: QuickActionsProps) => {
  const [isVisible, setIsVisible] = useState(false);
  
  const actions = {
    en: [
      "What is phishing?",
      "How to secure my Facebook account?",
      "Latest cyber threats in Myanmar",
      "How to protect from ransomware?",
      "What is two-factor authentication?",
      "How to create a strong password?"
    ],
    my: [
      "Phishing ဆိုတာ ဘာလဲ?",
      "Facebook အကောင့်ကို ဘယ်လိုလုံခြုံအောင်ထားမလဲ?",
      "မြန်မာနိုင်ငံမှာ နောက်ဆုံးဖြစ်ပေါ်နေတဲ့ ဆိုက်ဘာခြိမ်းခြောက်မှုများ",
      "Ransomware ကနေ ဘယ်လိုကာကွယ်မလဲ?",
      "Two-factor authentication ဆိုတာ ဘာလဲ?",
      "Password ကောင်းတစ်ခု ဘယ်လိုဖန်တီးမလဲ?"
    ]
  };

  const currentActions = currentLanguage === 'en' ? actions.en : actions.my;
  
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="relative mr-2">
      <Button
        variant="ghost"
        size="sm"
        className="rounded-full p-2 hover:bg-purple-50 dark:hover:bg-gray-700 bg-purple-100 dark:bg-gray-800 border border-purple-200 dark:border-gray-700"
        onClick={toggleVisibility}
        title={currentLanguage === 'en' ? 'Show suggestions' : 'အကြံပြုချက်များပြပါ'}
      >
        <MessageSquare className="h-5 w-5 text-purple-500 dark:text-purple-400" />
      </Button>
      
      {isVisible && (
        <div className="absolute bottom-full left-0 mb-2 p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl border border-purple-100 dark:border-gray-700 shadow-lg z-10 max-w-md">
          <div className="flex flex-wrap gap-2">
            {currentActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="rounded-full text-xs bg-white/80 dark:bg-gray-800/80 hover:bg-purple-50 dark:hover:bg-gray-700 border border-purple-100 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                onClick={() => {
                  onActionSelect(action);
                  setIsVisible(false);
                }}
              >
                {action}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickActions;
