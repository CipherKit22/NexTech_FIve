
import { Button } from "@/components/ui/button";
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  currentLanguage: 'en' | 'my';
  onLanguageChange: (lang: 'en' | 'my') => void;
}

const LanguageToggle = ({ currentLanguage, onLanguageChange }: LanguageToggleProps) => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => onLanguageChange(currentLanguage === 'en' ? 'my' : 'en')}
      className="flex items-center gap-2"
    >
      <Globe className="h-4 w-4" />
      {currentLanguage === 'en' ? 'မြန်မာ' : 'English'}
    </Button>
  );
};

export default LanguageToggle;
