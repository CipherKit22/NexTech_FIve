import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, TrendingUp, Shield, Users, Share2, Copy, Facebook, Twitter, MessageCircle, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface CrimeDashboardProps {
  currentLanguage: 'en' | 'my';
}

const CrimeDashboard = ({ currentLanguage }: CrimeDashboardProps) => {
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'list' | 'gallery'>('list');
  const { toast } = useToast();

  // Stats section removed as requested

  const posts = [
    {
      id: "1",
      title: {
        en: "KBZ Pay Security Issues Resurface",
        my: "KBZ Pay ပြဿနာ ထပ်ဖြစ်ကြပြန်ပြီ",
      },
      description: {
        en: "New security concerns with KBZ Pay and network operators. Unauthorized transactions occurring without OTP verification.",
        my: "KBZ Pay နဲ့ Network Operator တွေရဲ့ လုပ်ပိုင်ခွင့်ရ ဝန်ထမ်းတွေထဲမှာ 'ကျားဖြန့်' တွေရောက်နေပြီလား? မဟုတ်ရင်တော့ သူတို့တွေရဲ့ Infrastructure တွေကို တစ်ခုပြီး တစ်ခု reset လုပ်ဖို့ လိုနေပြီ။",
      },
      fullDescription: {
        en: "New security concerns have emerged with KBZ Pay. Users report unauthorized transactions where someone logs into their account remotely, receives the OTP, and transfers money without the user's knowledge. KBZ Pay's customer service has been unhelpful in resolving these issues. The pattern is consistent: 1) Someone logs into your account, causing you to be logged out and receive an OTP. 2) They use this OTP to access your KBZ Pay and transfer money to another account. 3) Even if you notice the login OTP within a minute, it's too late to prevent the transaction. Filing a police report requires leaving your phone, SIM card, and account details at the police station. KBZ Pay will only block the recipient's account for 3 days. There's a black market for KBZ Pay accounts registered with Myanmar IDs.",
        my: "KBZ Pay ပြဿနာ ထပ်ဖြစ်ကြပြန်ပြီ။ KBZ Pay နဲ့ Network Operator တွေရဲ့ လုပ်ပိုင်ခွင့်ရ ဝန်ထမ်းတွေထဲမှာ 'ကျားဖြန့်' တွေရောက်နေပြီလား? မဟုတ်ရင်တော့ သူတို့တွေရဲ့ Infrastructure တွေကို တစ်ခုပြီး တစ်ခု reset လုပ်ဖို့ လိုနေပြီ။ ကျားဖြန့်ရဲ့ Data mining အင်အားကို အထင်မသေးပါနဲ့။ ဖြစ်လိုက်တဲ့ သူတော်တော်များများက ပုံစံတူတူပဲ။ ပြန်မရတာချင်းလည်း ပုံစံတူတယ်။ KBZ Pay ရဲ့ Customer care ကလည်း အားရစရာပဲဆိုတော့ ဖြစ်ပြီဆိုရင် 'တာ့တာ' 'ဘိုင့်ဘိုင်' 'ပလုံ' ပါ။ ဖြစ်တဲ့ပုံစံက - ၁။ တဖက်မှာ Login ဝင်တာကြောင့် ကိုယ့်ဆီမှာ Logout ဖြစ်မယ်၊ OTP ဝင်လာမယ်။ အဲ့ဒီ OTP နဲ့ပဲ တဖက်က ကိုယ့်ရဲ့ KBZ Pay ကို Login ဝင်လိုက်ပြီ။ ၂။ ကိုယ့် KBZ Pay က ငွေကို အခြားသူဆီကို လွှဲတယ်။ KBZ Pay ထဲမှာ မရှိရင် ချိတ်ထားတဲ့ Banking Account ထဲကနေ ဆွဲထုတ်ပြီး လွှဲမယ်။ ကိုယ်လည်း မလုပ်ဘူးနော်။ ကိုယ့်ဆီမှာလည်း KBZ Pay Number ဆိုတာလောက်ပဲ Access ရှိတော့တာပါ။ ၃။ Login OTP ကျလာတာကို ချက်ချင်းသိလို့ ၁မိနစ်အတွင်း ပြန်ဝင်နိုင်ရင်တောင် အချိန်မမှီပါဘူး။ Login OTP အဆင့်မှာကတည်းက မဟုတ်တော့ဘူး။ ကျန်တာတွေတော့ ဆက်ပြောစရာမရှိတော့ပေ .. ပေါ့။ အမှုဖွင့်မယ်ဆိုရင် Kpay သုံးတဲ့ဖုန်း၊ SIM Card, Account တွေနဲ့ ဆက်စပ် အချက်အလက်တွေအကုန်လုံးကို ရဲစခန်းမှာ ထားခဲ့ပေးရမယ်။ KBZ Pay ကလည်း ငွေလက်ခံအကောင့်ကို (၃)ရက်အထိပဲ ပိတ်ပေးထားမယ်။ ထပ်ဆင့်ပြန်လွှဲလိုက်တဲ့အကောင့်တွေကိုလည်း လိုက်ဖို့ မစဉ်းစားနဲ့။ ကိုယ့်မှတ်ပုံတင်နဲ့လုပ်ထားတဲ့ KBZ Pay အကောင့်ကို မြန်မာငွေ သောင်းဂဏန်းနဲ့ရောင်းစားနေတဲ့စျေးကွက်က သပ်သပ်ရှိတယ်။ Privacy Knowledge က အနှုတ်ပြနေပြီ။ ဆိုတော့ကာ ... ပြန်မရတဲ့သူတွေချည်းပဲ 99% ဖြစ်ပါတယ်။",
      },
      type: { en: "Banking Fraud", my: "ဘဏ်လိမ်လည်မှု" },
      severity: { en: "High", my: "အမြင့်" },
      date: "2024-06-25",
      prevention: {
        en: [
          "Don't keep large amounts in KBZ Pay for extended periods.",
          "Unlink your KBZ Bank Account from KBZ Pay.",
          "Consider changing your SIM card.",
          "Avoid clicking on suspicious links or installing unofficial apps.",
          "Consider a factory reset of your phone if necessary.",
          "Use a trusted VPN.",
          "Visit the bank to change your KBZ Pay number to a new SIM.",
          "Consider using KBZ Pay SIM in a basic keypad phone for better security."
        ],
        my: [
          "KBZ Pay ထဲမှာ ပမာဏများများကို (အချိန်ကြာကြာ) ထည့်မထားနဲ့။",
          "KBZ Pay နဲ့ KBZ Bank Account ချိတ်ထားတာကို Unlink လုပ်ထား။",
          "SIM card အသစ် သွားပြန်လဲ (ဒီအချက်ကတော့ လိုရမယ်ရပါပဲ)",
          "တွေ့ကရာ Link တွေကို နှိပ်ထားမိသလား? Official App Store တွေကမဟုတ်တဲ့ App တွေ ထည့်ထားမိသလား?",
          "ဖုန်းကို Factory Reset လုပ်သင့်ရင် လုပ်",
          "စိတ်ချရတဲ့သူဆီက VPN ဝယ်သုံး",
          "ဘဏ်ကိုသွားပြီး KBZ Pay Number ကို ကိုယ့်မှတ်ပုံတင်နဲ့ မှတ်ပုံတင်ထားတဲ့ နောက်ထပ် SIM Number အသစ်တစ်ခုနဲ့ ပြန်ပြောင်း",
          "KBZ Pay SIM card ကို Keypad ထဲမှာ ထည့်သုံး"
        ],
      },
    },
    {
      id: "2",
      title: {
        en: "KBZ Mobile Banking (Individual account) Unauthorized Withdrawal",
        my: "KBZ Mobile Banking (Individual account) မှ ငွေခိုးယူထုတ်ခြင်း",
      },
      description: {
        en: "A user reported that 189 lakhs was transferred from their KBZ account to an unknown account without their authorization or OTP verification.",
        my: "သိန်း ၁၉၀ ရှိသော အကောင့်မှ OTP မရှိဘဲ အမည်မသိအကောင့်သို့ ငွေလွှဲမှုဖြစ်ပွားခဲ့ကြောင်း အသုံးပြုသူတစ်ဦးမှ တင်ပြခဲ့သည်။",
      },
      fullDescription: {
        en: "A user reported that 189 lakhs was transferred from their KBZ Mobile Banking account to an unknown account (WAI ZAW KO KO, Acc No: 06930106902829001) without their authorization. The user was overseas and had only shared their SIM card with their spouse for receiving OTP codes when needed. However, no OTP was received for this transaction. The user has contacted KBZ Bank's customer service and filed a police report, but was informed that the money has already been withdrawn from the recipient's account.",
        my: "ကျွန်တော် Mobli banking ထဲမှာ သိန်း ၁၉၀ ရှိပါတယ်။ သုံးစရာရှိလိူ့ acc စစ်ကြည့်လိုက်ချိန်မှာ ၉သောင်းကျော်ပဲ ရှိတော့လို့ activity တွေထဲ ဝင်စစ်ကြည့်တော့ NAME _WAI ZAW KO KO Acc No_ 06930106902829001 ကို ကျွန်တော် acc နဲ့ Fast Transfer သိန်း တစ်ရာရှစ်ဆယ့်ကိုးသိန်း တိတိ လွဲထားတာ တွေ့ရပါတယ်။ ကျွန်တော်က ခု oversea မှာ နေတာပါ Mobile Banking ရဲ့ Username နဲ့ password သည် ကျွန်တော်က လွဲ၍ ကျွန်တော်ဇနီးတောင်မသိပါ။ နောက်တစ်ခုက နိုင်ငံခြားမှာ ဖုန်းလိုင်းအဆင်မပြေမှာဆိူး၍ ဇနီးကို MPT sim card ပေးခဲ့ပြီး ငွေလွဲစရာ လိုအပ်မှ သာ ဖုန်းထဲကို OTP code ရောက်တဲ့အခါ ကျွန်တော်ကိုပြောပြပေးသည်ပဲ ရှိပါတယ်။ ခုဖြစ်စဥ်က ကျွန်တော်လည်း မသုံးသလို အမျိုးသမီး ရဲ့ ဖုန်းမှာလည်း OTP ဝင်ခြင်းမရှိဘဲ ကျွန်တော် ပိုက်ဆံ သိန်း ၁၈၀ကျော်သည် ထို WAI ZAW KO KO ဆိုသည့် Account ပိုင်ရှင်သို့ ရောက်ရှိခဲ့ပါသည်။ ဘဏ်ရဲ့ Customer Services ကို email ပို့ပြီး ဆက်လက်လုပ်ဆောင်ချက်တွေ လုပ်နေပါတယ်။ ယခု update WAI ZAW KO KO အကောင့်မှငွေများအကုန်ထုတ်သွားပီးဟု KBZ Bank ကပြောပါတယ်။",
      },
      type: { en: "Banking Fraud", my: "ဘဏ်လိမ်လည်မှု" },
      severity: { en: "High", my: "အမြင့်" },
      date: "2024-06-20",
      prevention: {
        en: [
          "Never share your mobile banking credentials with anyone.",
          "Enable biometric authentication if available.",
          "Regularly check your account for unauthorized transactions.",
          "Contact your bank immediately if you notice suspicious activity.",
        ],
        my: [
          "သင့် mobile banking အချက်အလက်များကို မည်သူ့ကိုမျှ မမျှဝေပါနှင့်။",
          "ရရှိနိုင်ပါက biometric အထောက်အထားစိစစ်မှုကို ဖွင့်ထားပါ။",
          "ခွင့်ပြုချက်မရှိသော ငွေလွှဲမှုများအတွက် သင့်အကောင့်ကို ပုံမှန်စစ်ဆေးပါ။",
          "သံသယဖြစ်ဖွယ် လှုပ်ရှားမှုကို သတိပြုမိပါက သင့်ဘဏ်ကို ချက်ချင်းဆက်သွယ်ပါ။",
        ],
      },
    },
    {
      id: "3",
      title: {
        en: "Increase in Social Media Account Hacking",
        my: "လူမှုမီဒီယာအကောင့် ဟက်ခံရမှုများ တိုးလာခြင်း",
      },
      description: {
        en: "Hackers are increasingly targeting social media accounts. Secure your accounts with strong passwords and two-factor authentication.",
        my: "ဟက်ကာများသည် လူမှုမီဒီယာအကောင့်များကို ပိုမိုပစ်မှတ်ထားလာကြသည်။ ခိုင်မာသော စကားဝှက်များနှင့် နှစ်ထပ်အထောက်အထားများဖြင့် သင့်အကောင့်များကို လုံခြုံအောင်ထားပါ။",
      },
      fullDescription: {
        en: "Cybercriminals are using phishing and brute force attacks to gain access to social media accounts. Once hacked, they can spread misinformation or steal personal data.",
        my: "ဆိုက်ဘာရာဇ၀တ်ကောင်များသည် လူမှုမီဒီယာအကောင့်များကို ဝင်ရောက်ရန်အတွက် ဖစ်ရှင်းနှင့် ရက်စက်ကြမ်းကြုတ်သော တိုက်ခိုက်မှုများကို အသုံးပြုနေကြသည်။ ဟက်ခံရပြီးသည်နှင့် ၎င်းတို့သည် သတင်းအမှားများ ဖြန့်ဝေနိုင်သည် သို့မဟုတ် ကိုယ်ရေးကိုယ်တာအချက်အလက်များကို ခိုးယူနိုင်သည်။",
      },
      type: { en: "Account Hacking", my: "အကောင့်ဟက်ကင်း" },
      severity: { en: "Medium", my: "အလယ်အလတ်" },
      date: "2024-08-05",
      prevention: {
        en: [
          "Use strong, unique passwords for each account.",
          "Enable two-factor authentication.",
          "Be cautious of suspicious links and messages.",
        ],
        my: [
          "အကောင့်တစ်ခုစီအတွက် ခိုင်မာပြီး ထူးခြားသော စကားဝှက်များကို အသုံးပြုပါ။",
          "နှစ်ထပ်အထောက်အထားကို ဖွင့်ပါ။",
          "သံသယဖြစ်ဖွယ်လင့်ခ်များနှင့် မက်ဆေ့ချ်များကို သတိထားပါ။",
        ],
      },
    },
  ];

  const sharePost = (post: any, platform?: string) => {
    const shareUrl = `https://mg-cyber.com/report/${post.id}`;
    const shareText = currentLanguage === 'en' 
      ? `🚨 Cybercrime Alert: ${post.title}\n\nStay safe online! Learn more about this threat and how to protect yourself.`
      : `🚨 ဆိုက်ဘာရာဇ၀တ်မှု သတိပေးချက်: ${post.title}\n\nအွန်လိုင်းလုံခြုံအောင် နေပါ! ဒီခြိမ်းခြောက်မှုနှင့် ဘယ်လိုကာကွယ်ရမည်အကြောင်း ပိုမိုလေ့လာပါ။`;

    if (platform === 'copy') {
      navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
      toast({
        title: currentLanguage === 'en' ? "Link Copied!" : "လင့်ကူးပြီးပါပြီ!",
        description: currentLanguage === 'en' ? "The link has been copied to your clipboard." : "လင့်ကို clipboard သို့ ကူးပြီးပါပြီ။",
      });
    } else {
      // Handle other platform sharing
      let platformUrl = '';
      if (platform === 'facebook') {
        platformUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
      } else if (platform === 'twitter') {
        platformUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
      } else if (platform === 'telegram') {
        platformUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
      }
      
      if (platformUrl) {
        window.open(platformUrl, '_blank');
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Dashboard Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl  font-bold gradient-text font-poppins">
          {currentLanguage === 'en' ? 'Cybercrime Dashboard' : 'ဆိုက်ဘာရာဇ၀တ်မှု ဒက်ရှ်ဘုတ်'}
        </h1>
        <p className="text-gray-600 font-poppins">
          {currentLanguage === 'en'
            ? 'Stay updated on the latest cyber threats and statistics in Myanmar'
            : 'မြန်မာနိုင်ငံရှိ နောက်ဆုံး ဆိုက်ဘာခြိမ်းခြောက်မှုများနှင့် စာရင်းအင်းများကို သိရှိပါ'}
        </p>
      </div>

      {/* Key Statistics section removed as requested */}

      {/* Recent Cybercrime Reports */}
      <Card className="rounded-3xl bg-white/70 dark:bg-gray-900/90 backdrop-blur-sm border-2 border-purple-200 dark:border-purple-900">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2 font-poppins">
                <AlertTriangle className="h-5 w-5 text-red-500 dark:text-red-400" />
                {currentLanguage === 'en' ? 'Recent Cybercrime Reports' : 'လတ်တလော ဆိုက်ဘာရာဇ၀တ်မှု သတင်းများ'}
              </CardTitle>
              <CardDescription className="font-poppins dark:text-gray-300">
                {currentLanguage === 'en' 
                  ? 'Stay informed about the latest cyber threats in Myanmar'
                  : 'မြန်မာနိုင်ငံတွင်းရှိ နောက်ဆုံးဆိုက်ဘာခြိမ်းခြောက်မှုများကို သိရှိထားပါ'}
              </CardDescription>
            </div>
            
            {/* View Mode Toggle */}
            <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'list' | 'gallery')} className="w-auto">
              <TabsList className="grid w-auto grid-cols-2 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <TabsTrigger value="list" className="rounded-xl font-poppins dark:text-gray-200 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white px-3 py-1">
                  {currentLanguage === 'en' ? 'List' : 'စာရင်း'}
                </TabsTrigger>
                <TabsTrigger value="gallery" className="rounded-xl font-poppins dark:text-gray-200 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white px-3 py-1">
                  {currentLanguage === 'en' ? 'Gallery' : 'ပြခန်း'}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* List View */}
          {viewMode === 'list' && (
            <div className="space-y-4">
              {posts.map((post) => (
                <div 
                  key={post.id} 
                  className="border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-4 hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300 bg-white/50 dark:bg-gray-800/50"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 font-poppins">
                        {post.title[currentLanguage]}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 font-poppins line-clamp-2">
                        {post.description[currentLanguage]}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="secondary" className="text-xs font-poppins dark:bg-gray-700 dark:text-blue-300">
                          {post.type[currentLanguage]}
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className={cn(
                            "text-xs font-poppins",
                            post.severity[currentLanguage] === 'High' || post.severity[currentLanguage] === 'အမြင့်' 
                              ? "text-red-600 dark:text-red-400 border-red-300 dark:border-red-800" 
                              : "text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-800"
                          )}
                        >
                          {post.severity[currentLanguage]}
                        </Badge>
                        <Badge variant="outline" className="text-xs text-gray-500 dark:text-gray-400 font-poppins dark:border-gray-700">
                          {post.date}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-700">
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="rounded-2xl font-poppins"
                          onClick={() => setSelectedPost(post)}
                        >
                          {currentLanguage === 'en' ? 'Read More' : 'ပိုမိုဖတ်ရှုရန်'}
                        </Button>
                      </SheetTrigger>
                      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
                        <SheetHeader className="mb-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-1 pr-4">
                              <SheetTitle className="font-poppins text-left">
                                {selectedPost?.title[currentLanguage]}
                              </SheetTitle>
                              <SheetDescription className="font-poppins text-left">
                                {selectedPost?.type[currentLanguage]} • {selectedPost?.date}
                              </SheetDescription>
                            </div>
                          </div>
                        </SheetHeader>
                        
                        <div className="space-y-4 mb-6">
                          <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950 p-4 rounded-2xl border border-red-200 dark:border-red-800">
                            <p className="text-sm font-poppins dark:text-gray-100">
                              {selectedPost?.fullDescription[currentLanguage]}
                            </p>
                          </div>
                          
                          <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-2xl border border-blue-200 dark:border-blue-800">
                            <h4 className="font-semibold mb-2 font-poppins dark:text-gray-100">
                              {currentLanguage === 'en' ? 'Prevention Tips:' : 'ကာကွယ်နည်းများ:'}
                            </h4>
                            <ul className="list-disc list-inside space-y-1 text-sm font-poppins dark:text-gray-200">
                              {selectedPost?.prevention[currentLanguage].map((tip: string, index: number) => (
                                <li key={index}>{tip}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Share Section */}
                        <div className="border-t pt-4">
                          <div className="flex items-center gap-2 mb-3">
                            <Share2 className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                            <span className="font-medium text-sm font-poppins dark:text-gray-200">
                              {currentLanguage === 'en' ? 'Share this alert:' : 'ဒီသတိပေးချက်ကို မျှဝေပါ:'}
                            </span>
                          </div>
                          
                          {/* Copyable Link */}
                          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-2xl mb-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-600 dark:text-gray-300 font-mono truncate flex-1 mr-2">
                                https://mg-cyber.com/report/{selectedPost?.id}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => sharePost(selectedPost, 'copy')}
                                className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>

                          {/* Scrollable Share Options */}
                          <div className="flex gap-2 overflow-x-auto pb-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => sharePost(selectedPost, 'facebook')}
                              className="flex items-center gap-2 rounded-2xl whitespace-nowrap font-poppins hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200"
                            >
                              <Facebook className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                              Facebook
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => sharePost(selectedPost, 'twitter')}
                              className="flex items-center gap-2 rounded-2xl whitespace-nowrap font-poppins hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200"
                            >
                              <Twitter className="h-4 w-4 text-blue-400" />
                              Twitter
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => sharePost(selectedPost, 'telegram')}
                              className="flex items-center gap-2 rounded-2xl whitespace-nowrap font-poppins hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200"
                            >
                              <MessageCircle className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                              Telegram
                            </Button>
                          </div>
                        </div>
                      </SheetContent>
                    </Sheet>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => sharePost(post)}
                      className="rounded-full hover:bg-purple-50 transition-colors duration-200"
                    >
                      <Share2 className="h-4 w-4 text-purple-600" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Gallery View */}
          {viewMode === 'gallery' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {posts.map((post) => (
                <div 
                  key={post.id} 
                  className="border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-4 hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300 bg-white/50 dark:bg-gray-800/50 flex flex-col h-full"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 font-poppins">
                      {post.title[currentLanguage]}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 font-poppins line-clamp-3">
                      {post.description[currentLanguage]}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="secondary" className="text-xs font-poppins dark:bg-gray-700 dark:text-blue-300">
                        {post.type[currentLanguage]}
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "text-xs font-poppins",
                          post.severity[currentLanguage] === 'High' || post.severity[currentLanguage] === 'အမြင့်' 
                            ? "text-red-600 dark:text-red-400 border-red-300 dark:border-red-800" 
                            : "text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-800"
                        )}
                      >
                        {post.severity[currentLanguage]}
                      </Badge>
                      <Badge variant="outline" className="text-xs text-gray-500 dark:text-gray-400 font-poppins dark:border-gray-700">
                        {post.date}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t border-gray-100 dark:border-gray-700 mt-auto">
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="rounded-2xl font-poppins w-full"
                          onClick={() => setSelectedPost(post)}
                        >
                          {currentLanguage === 'en' ? 'Read More' : 'ပိုမိုဖတ်ရှုရန်'}
                        </Button>
                      </SheetTrigger>
                      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
                        <SheetHeader className="mb-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-1 pr-4">
                              <SheetTitle className="font-poppins text-left">
                                {selectedPost?.title[currentLanguage]}
                              </SheetTitle>
                              <SheetDescription className="font-poppins text-left">
                                {selectedPost?.type[currentLanguage]} • {selectedPost?.date}
                              </SheetDescription>
                            </div>
                          </div>
                        </SheetHeader>
                        
                        <div className="space-y-4 mb-6">
                          <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950 p-4 rounded-2xl border border-red-200 dark:border-red-800">
                            <p className="text-sm font-poppins dark:text-gray-100">
                              {selectedPost?.fullDescription[currentLanguage]}
                            </p>
                          </div>
                          
                          <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-2xl border border-blue-200 dark:border-blue-800">
                            <h4 className="font-semibold mb-2 font-poppins dark:text-gray-100">
                              {currentLanguage === 'en' ? 'Prevention Tips:' : 'ကာကွယ်နည်းများ:'}
                            </h4>
                            <ul className="list-disc list-inside space-y-1 text-sm font-poppins dark:text-gray-200">
                              {selectedPost?.prevention[currentLanguage].map((tip: string, index: number) => (
                                <li key={index}>{tip}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Share Section */}
                        <div className="border-t pt-4">
                          <div className="flex items-center gap-2 mb-3">
                            <Share2 className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                            <span className="font-medium text-sm font-poppins dark:text-gray-200">
                              {currentLanguage === 'en' ? 'Share this alert:' : 'ဒီသတိပေးချက်ကို မျှဝေပါ:'}
                            </span>
                          </div>
                          
                          {/* Copyable Link */}
                          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-2xl mb-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-600 dark:text-gray-300 font-mono truncate flex-1 mr-2">
                                https://mg-cyber.com/report/{selectedPost?.id}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => sharePost(selectedPost, 'copy')}
                                className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>

                          {/* Scrollable Share Options */}
                          <div className="flex gap-2 overflow-x-auto pb-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => sharePost(selectedPost, 'facebook')}
                              className="flex items-center gap-2 rounded-2xl whitespace-nowrap font-poppins hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200"
                            >
                              <Facebook className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                              Facebook
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => sharePost(selectedPost, 'twitter')}
                              className="flex items-center gap-2 rounded-2xl whitespace-nowrap font-poppins hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200"
                            >
                              <Twitter className="h-4 w-4 text-blue-400" />
                              Twitter
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => sharePost(selectedPost, 'telegram')}
                              className="flex items-center gap-2 rounded-2xl whitespace-nowrap font-poppins hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200"
                            >
                              <MessageCircle className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                              Telegram
                            </Button>
                          </div>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CrimeDashboard;
