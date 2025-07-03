
// Simple language detection and translation utilities
export const detectLanguage = (text: string): 'en' | 'my' => {
  // Simple Myanmar Unicode detection
  const myanmarRegex = /[\u1000-\u109F\uAA60-\uAA7F]/;
  return myanmarRegex.test(text) ? 'my' : 'en';
};

export const translateText = (text: string, targetLanguage: 'en' | 'my'): string => {
  // Simple translation mappings for common cybersecurity terms
  const translations: Record<string, Record<'en' | 'my', string>> = {
    'phishing': {
      en: 'phishing',
      my: 'ဖစ်ရှင်း (သတင်းအတုအယောင်များဖြင့် လှည့်ဖြားမှု)'
    },
    'malware': {
      en: 'malware',
      my: 'malware (ကွန်ပျူတာကို ထိခိုက်စေသော ဗိုင်းရပ်စ်များ)'
    },
    'password': {
      en: 'password',
      my: 'စကားဝှက်'
    },
    'security': {
      en: 'security',
      my: 'လုံခြုံရေး'
    },
    'privacy': {
      en: 'privacy',
      my: 'ကိုယ်ရေးကိုယ်တာ'
    }
  };

  // Simple word-by-word translation (in real app, use proper translation API)
  return text; // Return original text for now
};

export const getLocalizedContent = (key: string, language: 'en' | 'my'): string => {
  const content: Record<string, Record<'en' | 'my', string>> = {
    'welcome_message': {
      en: "Hello! I'm My Cyber, your AI cybersecurity assistant. How can I help you stay safe online?",
      my: "မင်္ဂလာပါ! ကျွန်တော် Mg Cyber ပါ၊ သင့်အတွက် AI လုံခြုံရေးအကူအညီပေးစနစ်ဖြစ်ပါတယ်တယ်။ အွန်လိုင်းလုံခြုံရေးတွင် ဘာများကူညီပေးရမလဲခင်ဗျရမလဲခင်ဗျ?"
    },
    'thinking': {
      en: 'Thinking...',
      my: 'စဉ်းစားနေသည်...'
    }
  };

  return content[key]?.[language] || key;
};
