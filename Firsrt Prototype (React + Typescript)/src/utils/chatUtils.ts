
// Chat response generation using OpenAI API
const API_KEY = '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';

// Function to generate chat response
export const generateChatResponse = async (
  userMessage: string, 
  detectedLanguage: 'en' | 'my',
  responseLanguage: 'en' | 'my'
): Promise<string> => {
  try {
    console.log("Generating chat response for:", userMessage);
    
    // Use detected language as response language for natural conversation
    const actualResponseLanguage = detectedLanguage;
    
    const systemPrompt = actualResponseLanguage === 'en' 
      ? `You are "Mg Cyber", an AI cybersecurity assistant specifically designed for Myanmar users, created by Team NextTech Five from Information Technology Major of Technological University (Hmawbi). You provide helpful, accurate information about:
        - Cybersecurity threats and protection
        - Online privacy and safety
        - Digital literacy for Myanmar context
        - Local scam awareness (KPay fraud, fake government sites, etc.)
        - Password security and 2FA
        - Social media privacy settings
        
        Keep responses concise, practical, and culturally appropriate for Myanmar users. Always prioritize user safety. Respond in English.`
      : `သင်သည် "Mg Cyber" ဖြစ်ပြီး၊ Technological University (Hmawbi) ၏ Information Technology Major မှ Team NextTech Five မှ ဖန်တီးထားသော မြန်မာနိုင်ငံသားများအတွက် အထူးဒီဇိုင်းထုတ်ထားသော AI လုံခြုံရေးအကူအညီပေးစနစ် ဖြစ်သည်။ သင်သည် အောက်ပါအချက်များအကြောင်း အကူအညီများပေးသည်:
        - ဆိုက်ဘာလုံခြုံရေးခြိမ်းခြောက်မှုများနှင့် ကာကွယ်မှု
        - အွန်လိုင်းကိုယ်ရေးကိုယ်တာနှင့် လုံခြုံရေး
        - မြန်မာ့အခြေအနေအတွက် ဒစ်ဂျစ်တယ်အသိပညာ
        - ဒေသန္တရလှည့်ဖြားမှုများ သတိပေးခြင်း (KPay လှည့်ဖြားမှု၊ အစိုးရဝက်ဘ်ဆိုက်အတုများ၊ စသည်)
        - စကားဝှက်လုံခြုံရေးနှင့် 2FA
        - လူမှုကွန်ယက်ကိုယ်ရေးကိုယ်တာသတ်မှတ်ချက်များ
        
        တုံ့ပြန်ချက်များကို တိုတောင်း၊ လက်တွေ့အသုံးချနိုင်၊ မြန်မာသုံးသူများအတွက် သင့်လျော်အောင် ပြုလုပ်ပါ။ အမြဲတမ်းသုံးသူများ၏လုံခြုံရေးကို ဦးစားပေးပါ။ မြန်မာဘာသာဖြင့် ပြန်ဖြေပါ။`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'Mg Cyber - Myanmar Cybersecurity Assistant by Team NextTech Five'
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-chat-v3-0324:free',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      throw new Error(`API response not ok: ${response.status}`);
    }

    const data = await response.json();
    const botResponse = data.choices[0]?.message?.content || 
      (actualResponseLanguage === 'en' 
        ? "I'm sorry, I couldn't generate a response. Please try again."
        : "ကျွန်တော် တုံ့ပြန်ချက်မထုတ်နိုင်ပါ။ ထပ်မံကြိုးစားပါ။");

    console.log("Generated response:", botResponse);
    return botResponse;

  } catch (error) {
    console.error('Chat API error:', error);
    return responseLanguage === 'en' 
      ? "I apologize, but I'm having trouble connecting right now. For immediate cybersecurity help, please contact MCPA at cybercrime@mcpa.org.mm"
      : "တုံ့ပြန်မှုပြဿနာရှိနေပါသည်။ လုံခြုံရေးအရေးပေါ်အကူအညီအတွက် MCPA (cybercrime@mcpa.org.mm) သို့ဆက်သွယ်ပါ။";
  }
};
