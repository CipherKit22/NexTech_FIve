
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, Shield, Eye, Settings } from 'lucide-react';

interface PrivacyToolsProps {
  currentLanguage: 'en' | 'my';
}

const PrivacyTools = ({ currentLanguage }: PrivacyToolsProps) => {
  const privacyGuides = [
    {
      platform: "Facebook",
      icon: "📘",
      steps: {
        en: [
          "Go to Settings & Privacy > Settings",
          "Click on Privacy in the left menu",
          "Set 'Who can see your posts' to Friends",
          "Limit past posts visibility",
          "Turn off face recognition",
          "Review app permissions"
        ],
        my: [
          "Settings & Privacy > Settings သို့သွားပါ",
          "ဘယ်ဘက်မီနူးရှိ Privacy ကိုနှိပ်ပါ",
          "'Who can see your posts' ကို Friends အဖြစ်သတ်မှတ်ပါ",
          "ယခင်ပို့စ်များ မြင်ရမှုကန့်သတ်ပါ",
          "မျက်နှာအသိအမှတ်ပြုမှုပိတ်ပါ",
          "အက်ပ်ခွင့်ပြုချက်များစစ်ဆေးပါ"
        ]
      }
    },
    {
      platform: "Telegram",
      icon: "📱",
      steps: {
        en: [
          "Go to Settings > Privacy and Security",
          "Set Phone Number visibility to Nobody",
          "Enable Two-Step Verification",
          "Turn on Secret Chat for sensitive conversations",
          "Set Auto-Delete Timer for messages",
          "Review Active Sessions regularly"
        ],
        my: [
          "Settings > Privacy and Security သို့သွားပါ",
          "ဖုန်းနံပါတ် မြင်ရမှုကို Nobody အဖြစ်သတ်မှတ်ပါ",
          "Two-Step Verification ဖွင့်ပါ",
          "အရေးကြီးသောစကားပြောချက်များအတွက် Secret Chat သုံးပါ",
          "မက်ဆေ့များအတွက် Auto-Delete Timer သတ်မှတ်ပါ",
          "Active Sessions များကို ပုံမှန်စစ်ဆေးပါ"
        ]
      }
    }
  ];

  const quickTips = [
    {
      en: "Use unique passwords for each account",
      my: "အကောင့်တစ်ခုချင်းစီအတွက် ကွဲပြားသောစကားဝှက်သုံးပါ"
    },
    {
      en: "Enable 2FA whenever possible",
      my: "တတ်နိုင်သမျှ 2FA ဖွင့်ထားပါ"
    },
    {
      en: "Be cautious with public Wi-Fi",
      my: "အများသုံး Wi-Fi သုံးရာတွင် သတိထားပါ"
    },
    {
      en: "Regularly update your apps",
      my: "အက်ပ်များကို ပုံမှန်အပ်ဒိတ်လုပ်ပါ"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="dark:bg-gray-900 dark:border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 dark:text-gray-200">
            <Settings className="h-5 w-5 dark:text-gray-300" />
            {currentLanguage === 'en' ? 'Privacy Settings Guide' : 'ကိုယ်ရေးကိုယ်တာ လုံခြုံရေးလမ်းညွှန်'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {privacyGuides.map((guide, idx) => (
              <Card key={idx} className="border-l-4 border-l-blue-500 dark:bg-gray-800 dark:border-l-blue-600 dark:border-gray-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2 dark:text-gray-200">
                    <span className="text-2xl">{guide.icon}</span>
                    {guide.platform}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-2">
                    {guide.steps[currentLanguage].map((step, stepIdx) => (
                      <li key={stepIdx} className="flex items-start gap-2 text-sm dark:text-gray-300">
                        <Badge variant="outline" className="mt-0.5 text-xs min-w-[24px] justify-center dark:border-gray-600 dark:text-gray-300">
                          {stepIdx + 1}
                        </Badge>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="dark:bg-gray-900 dark:border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 dark:text-gray-200">
            <Shield className="h-5 w-5 dark:text-gray-300" />
            {currentLanguage === 'en' ? 'Quick Security Tips' : 'လျင်မြန်သောလုံခြုံရေးအကြံပြုချက်များ'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {quickTips.map((tip, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center flex-shrink-0">
                  <Lock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-sm dark:text-gray-300">{tip[currentLanguage]}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="dark:bg-gray-900 dark:border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 dark:text-gray-200">
            <Eye className="h-5 w-5 dark:text-gray-300" />
            {currentLanguage === 'en' ? 'Report Cybercrime' : 'ဆိုက်ဘာရာဇ၀တ်မှုတိုင်ကြားရန်'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {currentLanguage === 'en' 
                ? "If you encounter cybercrime, report it to the Myanmar Computer Professionals Association (MCPA):"
                : "ဆိုက်ဘာရာဇ၀တ်မှုတွေ့ကြုံရပါက Myanmar Computer Professionals Association (MCPA) သို့တိုင်ကြားပါ:"
              }
            </p>
            <div className="space-y-2 text-sm dark:text-gray-300">
              <p><strong>Email:</strong> cybercrime@mcpa.org.mm</p>
              <p><strong>Hotline:</strong> +95-1-123-4567</p>
              <p><strong>Website:</strong> www.mcpa.org.mm/report</p>
            </div>
            <Button className="w-full dark:bg-blue-700 dark:hover:bg-blue-600">
              <Shield className="h-4 w-4 mr-2" />
              {currentLanguage === 'en' ? 'Report Incident' : 'ဖြစ်စဉ်တိုင်ကြားရန်'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacyTools;
