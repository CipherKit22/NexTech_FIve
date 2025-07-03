
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Moon, Sun, Globe, Check } from 'lucide-react';

interface SettingsProps {
  currentLanguage: 'en' | 'my';
  onLanguageChange: (language: 'en' | 'my') => void;
  isDarkMode: boolean;
  onDarkModeChange: (enabled: boolean) => void;
}

const Settings = ({ currentLanguage, onLanguageChange, isDarkMode, onDarkModeChange }: SettingsProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);

  const handleLanguageSelect = (language: 'en' | 'my') => {
    setSelectedLanguage(language);
    onLanguageChange(language);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold gradient-text font-poppins mb-2">
          {currentLanguage === 'en' ? 'Settings' : 'ဆက်တင်များ'}
        </h1>
        <p className="text-gray-600 font-poppins">
          {currentLanguage === 'en' 
            ? 'Customize your Mg Cyber experience' 
            : 'သင့် Mg Cyber အတွေ့အကြုံကို စိတ်ကြိုက်ပြင်ဆင်ပါ'}
        </p>
      </div>

      {/* Language Settings */}
      <Card className="rounded-3xl bg-white/70 dark:bg-gray-900/90 backdrop-blur-sm border-2 border-purple-200 dark:border-purple-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-poppins">
            <Globe className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            {currentLanguage === 'en' ? 'Language' : 'ဘာသာစကား'}
          </CardTitle>
          <CardDescription className="font-poppins dark:text-gray-300">
            {currentLanguage === 'en' 
              ? 'Choose your preferred language for the interface'
              : 'အင်တာဖေ့စ်အတွက် သင်နှစ်သက်သော ဘာသာစကားကို ရွေးချယ်ပါ'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant={selectedLanguage === 'en' ? 'default' : 'outline'}
              onClick={() => handleLanguageSelect('en')}
              className={`p-4 rounded-2xl font-poppins transition-all duration-300 ${
                selectedLanguage === 'en' 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                  : 'hover:bg-purple-50'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span>English</span>
                {selectedLanguage === 'en' && <Check className="h-4 w-4" />}
              </div>
            </Button>
            <Button
              variant={selectedLanguage === 'my' ? 'default' : 'outline'}
              onClick={() => handleLanguageSelect('my')}
              className={`p-4 rounded-2xl font-myanmar transition-all duration-300 ${
                selectedLanguage === 'my' 
                  ? 'bg-gradient-to-r from-green-500 to-blue-600 text-white' 
                  : 'hover:bg-purple-50'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span>မြန်မာ</span>
                {selectedLanguage === 'my' && <Check className="h-4 w-4" />}
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Appearance Settings */}
      <Card className="rounded-3xl bg-white/70 dark:bg-gray-900/90 backdrop-blur-sm border-2 border-purple-200 dark:border-purple-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-poppins">
            {isDarkMode ? <Moon className="h-5 w-5 text-purple-600 dark:text-purple-400" /> : <Sun className="h-5 w-5 text-purple-600 dark:text-purple-400" />}
            {currentLanguage === 'en' ? 'Appearance' : 'အသွင်အပြင်'}
          </CardTitle>
          <CardDescription className="font-poppins dark:text-gray-300">
            {currentLanguage === 'en' 
              ? 'Customize the look and feel of your interface'
              : 'သင့်အင်တာဖေ့စ်၏ အသွင်အပြင်ကို စိတ်ကြိုက်ပြင်ဆင်ပါ'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-sm font-medium font-poppins dark:text-gray-200">
                {currentLanguage === 'en' ? 'Dark Mode' : 'မှောင်မိုက်မုဒ်'}
              </Label>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-poppins">
                {currentLanguage === 'en' 
                  ? 'Switch between light and dark themes'
                  : 'အလင်းနှင့် မှောင်မိုက်ပုံစံများကြား ပြောင်းလဲပါ'}
              </p>
            </div>
            <Switch
              checked={isDarkMode}
              onCheckedChange={onDarkModeChange}
              className="data-[state=checked]:bg-purple-600 dark:data-[state=checked]:bg-purple-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* About Section */}
      <Card className="rounded-3xl bg-white/70 dark:bg-gray-900/90 backdrop-blur-sm border-2 border-purple-200 dark:border-purple-900">
        <CardHeader>
          <CardTitle className="font-poppins">
            {currentLanguage === 'en' ? 'About Mg Cyber' : 'Mg Cyber အကြောင်း'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-gray-600 dark:text-gray-300 font-poppins">
            {currentLanguage === 'en' 
              ? 'AI-powered cybersecurity assistant for Myanmar'
              : 'မြန်မာနိုင်ငံအတွက် AI-powered လုံခြုံရေးအကူအညီပေးစနစ်'}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-poppins">
            {currentLanguage === 'en' 
              ? 'Created by Team NextTech Five from IT Major of Technological University (Hmawbi)'
              : 'Technological University (Hmawbi) ၏ IT Major မှ Team NextTech Five မှ ဖန်တီးထားသည်'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
