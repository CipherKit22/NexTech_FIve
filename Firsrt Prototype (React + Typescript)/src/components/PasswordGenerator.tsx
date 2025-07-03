import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Copy, RefreshCw, Shield, Key } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface PasswordGeneratorProps {
  currentLanguage: 'en' | 'my';
}

const PasswordGenerator = ({ currentLanguage }: PasswordGeneratorProps) => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState([12]);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const { toast } = useToast();

  const generatePassword = () => {
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (charset === '') {
      toast({
        title: currentLanguage === 'en' ? "Error" : "အမှား",
        description: currentLanguage === 'en' 
          ? "Please select at least one character type" 
          : "အက္ခရာအမျိုးအစားတစ်ခုထက်မကိုရွေးပါ",
        variant: "destructive",
      });
      return;
    }

    let result = '';
    for (let i = 0; i < length[0]; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    setPassword(result);
    console.log("Generated password:", result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    toast({
      title: currentLanguage === 'en' ? "Password Copied!" : "စကားဝှက်ကူးပြီးပါပြီ!",
      description: currentLanguage === 'en' ? "Password copied to clipboard" : "စကားဝှက်ကို clipboard သို့ ကူးပြီးပါပြီ",
    });
  };

  const getPasswordStrength = (pwd: string) => {
    if (pwd.length < 8) return { 
      strength: 'weak', 
      color: 'red', 
      score: 1,
      text: { 'en': 'Weak', 'my': 'အားနည်း' } as Record<'en' | 'my', string>
    };
    if (pwd.length < 12) return { 
      strength: 'medium', 
      color: 'orange', 
      score: 2,
      text: { 'en': 'Medium', 'my': 'အလယ်အလတ်' } as Record<'en' | 'my', string>
    };
    if (pwd.length < 16) return { 
      strength: 'strong', 
      color: 'green', 
      score: 3,
      text: { 'en': 'Strong', 'my': 'အားကောင်း' } as Record<'en' | 'my', string>
    };
    return { 
      strength: 'very-strong', 
      color: 'green', 
      score: 4,
      text: { 'en': 'Very Strong', 'my': 'အလွန်အားကောင်း' } as Record<'en' | 'my', string>
    };
  };

  const strength = getPasswordStrength(password);

  return (
    <Card className="rounded-3xl bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-950 border-2 border-purple-200 dark:border-purple-900 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-3xl">
        <CardTitle className="flex items-center gap-2 font-poppins">
          <Key className="h-5 w-5" />
          {currentLanguage === 'en' ? 'Password Generator' : 'စကားဝှက်ထုတ်စက်'}
        </CardTitle>
        <CardDescription className="text-purple-100 font-poppins">
          {currentLanguage === 'en' 
            ? 'Create strong, secure passwords for your accounts'
            : 'သင့်အကောင့်များအတွက် ခိုင်မာလုံခြုံသော စကားဝှက်များ ဖန်တီးပါ'}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Generated Password Display */}
        <div className="space-y-3">
          <Label className="text-sm font-medium font-poppins dark:text-gray-200">
            {currentLanguage === 'en' ? 'Generated Password' : 'ထုတ်လုပ်ထားသောစကားဝှက်'}
          </Label>
          <div className="flex gap-2">
            <Input
              value={password}
              readOnly
              className="font-mono text-sm rounded-2xl bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 border-2 border-blue-200 dark:border-blue-900 dark:text-gray-200"
              placeholder={currentLanguage === 'en' ? 'Click generate to create password' : 'စကားဝှက်ဖန်တီးရန် Generate ကိုနှိပ်ပါ'}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
              disabled={!password}
              className="rounded-2xl border-2 hover:bg-blue-50 dark:hover:bg-gray-800 dark:border-gray-700"
            >
              <Copy className="h-4 w-4 dark:text-gray-300" />
            </Button>
          </div>
          
          {password && (
            <div className="flex items-center gap-2">
              <Shield className={`h-4 w-4 ${
                strength.score >= 4 ? 'text-green-500' : 
                strength.score >= 3 ? 'text-yellow-500' : 'text-red-500'
              }`} />
              <span className={`text-sm font-poppins ${
                strength.score >= 4 ? 'text-green-600' : 
                strength.score >= 3 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {strength.text[currentLanguage]}
              </span>
            </div>
          )}
        </div>

        {/* Password Length */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium font-poppins dark:text-gray-200">
              {currentLanguage === 'en' ? 'Password Length' : 'စကားဝှက်အရှည်'}
            </Label>
            <span className="text-sm text-purple-600 dark:text-purple-400 font-semibold bg-purple-50 dark:bg-purple-900/50 px-2 py-1 rounded-full">
              {length[0]}
            </span>
          </div>
          <Slider
            value={length}
            onValueChange={setLength}
            max={50}
            min={4}
            step={1}
            className="gradient-slider"
          />
        </div>

        {/* Character Options */}
        <div className="space-y-4">
          <Label className="text-sm font-medium font-poppins dark:text-gray-200">
            {currentLanguage === 'en' ? 'Include Characters' : 'ပါဝင်သောအက္ခရာများ'}
          </Label>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2 p-3 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 border border-blue-200 dark:border-blue-800">
              <Checkbox
                id="uppercase"
                checked={includeUppercase}
                onCheckedChange={(checked) => setIncludeUppercase(checked === true)}
                className="border-2 border-blue-300 dark:border-blue-700"
              />
              <Label htmlFor="uppercase" className="text-sm font-poppins dark:text-gray-300">
                {currentLanguage === 'en' ? 'Uppercase (A-Z)' : 'စာလုံးကြီး (A-Z)'}
              </Label>
            </div>
            
            <div className="flex items-center space-x-2 p-3 rounded-2xl bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 border border-green-200 dark:border-green-800">
              <Checkbox
                id="lowercase"
                checked={includeLowercase}
                onCheckedChange={(checked) => setIncludeLowercase(checked === true)}
                className="border-2 border-green-300 dark:border-green-700"
              />
              <Label htmlFor="lowercase" className="text-sm font-poppins dark:text-gray-300">
                {currentLanguage === 'en' ? 'Lowercase (a-z)' : 'စာလုံးငယ် (a-z)'}
              </Label>
            </div>
            
            <div className="flex items-center space-x-2 p-3 rounded-2xl bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/30 dark:to-red-900/30 border border-orange-200 dark:border-orange-800">
              <Checkbox
                id="numbers"
                checked={includeNumbers}
                onCheckedChange={(checked) => setIncludeNumbers(checked === true)}
                className="border-2 border-orange-300 dark:border-orange-700"
              />
              <Label htmlFor="numbers" className="text-sm font-poppins dark:text-gray-300">
                {currentLanguage === 'en' ? 'Numbers (0-9)' : 'ဂဏန်းများ (0-9)'}
              </Label>
            </div>
            
            <div className="flex items-center space-x-2 p-3 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 border border-purple-200 dark:border-purple-800">
              <Checkbox
                id="symbols"
                checked={includeSymbols}
                onCheckedChange={(checked) => setIncludeSymbols(checked === true)}
                className="border-2 border-purple-300 dark:border-purple-700"
              />
              <Label htmlFor="symbols" className="text-sm font-poppins dark:text-gray-300">
                {currentLanguage === 'en' ? 'Symbols (!@#$)' : 'သင်္ကေတများ (!@#$)'}
              </Label>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <Button
          onClick={generatePassword}
          className="w-full rounded-2xl bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-poppins py-3 shadow-lg hover:shadow-xl transition-all duration-300"
          disabled={!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          {currentLanguage === 'en' ? 'Generate Password' : 'စကားဝှက်ထုတ်လုပ်ရန်'}
        </Button>

        {/* Password Tips */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-2xl border-2 border-blue-200 dark:border-blue-900">
          <h4 className="font-semibold mb-2 text-blue-800 dark:text-blue-300 font-poppins">
            {currentLanguage === 'en' ? 'Password Security Tips:' : 'စကားဝှက်လုံခြုံရေးအကြံပြုချက်များ:'}
          </h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-blue-700 dark:text-blue-300 font-poppins">
            {currentLanguage === 'en' ? (
              <>
                <li>Use at least 12 characters for better security</li>
                <li>Include a mix of uppercase, lowercase, numbers, and symbols</li>
                <li>Don't use personal information in passwords</li>
                <li>Use unique passwords for different accounts</li>
                <li>Consider using a password manager</li>
              </>
            ) : (
              <>
                <li>လုံခြုံရေးကောင်းအောင် အနည်းဆုံး စာလုံး ၁၂ လုံးသုံးပါ</li>
                <li>စာလုံးကြီး၊ စာလုံးငယ်၊ ဂဏန်းများနှင့် သင်္ကေတများ ရောနှောသုံးပါ</li>
                <li>ကိုယ်ရေးကိုယ်တာအချက်အလက်များကို စကားဝှက်တွင် မသုံးပါနှင့်</li>
                <li>အကောင့်မတူညီသန့်အတွက် ကွဲပြားသောစကားဝှက်များသုံးပါ</li>
                <li>စကားဝှက်စီမံခန့်ခွဲမှုအက်ပ်သုံးရန် စဉ်းစားပါ</li>
              </>
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default PasswordGenerator;
