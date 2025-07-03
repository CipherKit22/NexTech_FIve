
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Search, Shield } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import LoadingSpinner from './LoadingSpinner';

interface ThreatScannerProps {
  currentLanguage: 'en' | 'my';
}

interface VirusTotalAnalysis {
  category: string;
  engine_name: string;
  engine_version: string;
  result: string;
  method: string;
  engine_update: string;
}

interface VirusTotalResponse {
  data: {
    attributes: {
      stats: {
        harmless: number;
        malicious: number;
        suspicious: number;
        undetected: number;
        timeout: number;
      };
      last_analysis_results: {
        [key: string]: VirusTotalAnalysis;
      };
      last_analysis_date: number;
      url: string;
      reputation: number;
    };
  };
}

interface ScanResult {
  url: string;
  safe: boolean;
  malicious: number;
  suspicious: number;
  clean: number;
  timeout: number;
  reputation: number;
  scanDate: string;
  threats: string[];
}

const ThreatScanner = ({ currentLanguage }: ThreatScannerProps) => {
  const [url, setUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const { toast } = useToast();

  const API_KEY = 'bc0c4f6c7cf8a2c00ee29a1a0bf8073b99108f487d53b6f3a56f3e52b653c245';

  const scanURL = async () => {
    if (!url.trim()) {
      toast({
        title: currentLanguage === 'en' ? "Error" : "အမှား",
        description: currentLanguage === 'en' 
          ? "Please enter a URL to scan" 
          : "စစ်ဆေးရန် URL ထည့်ပါ",
        variant: "destructive",
      });
      return;
    }

    setIsScanning(true);
    console.log("Scanning URL with VirusTotal API v3:", url);

    try {
      // First, submit the URL for scanning
      const submitResponse = await fetch('https://www.virustotal.com/api/v3/urls', {
        method: 'POST',
        headers: {
          'x-apikey': API_KEY,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          url: url
        })
      });

      if (!submitResponse.ok) {
        throw new Error(`HTTP error! status: ${submitResponse.status}`);
      }

      const submitData = await submitResponse.json();
      console.log('Submit response:', submitData);

      // Get the URL ID from the response
      const urlId = btoa(url).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
      
      // Wait a bit for the scan to process
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Then get the report using API v3
      const reportResponse = await fetch(`https://www.virustotal.com/api/v3/urls/${urlId}`, {
        method: 'GET',
        headers: {
          'x-apikey': API_KEY,
        }
      });
      
      if (!reportResponse.ok) {
        throw new Error(`HTTP error! status: ${reportResponse.status}`);
      }

      const reportData = await reportResponse.json() as VirusTotalResponse;
      console.log('Report response:', reportData);

      if (reportData.data && reportData.data.attributes) {
        const attrs = reportData.data.attributes;
        const threats: string[] = [];
        
        if (attrs.last_analysis_results) {
          for (const [engine, result] of Object.entries(attrs.last_analysis_results)) {
            if (result.category === 'malicious' || result.category === 'suspicious') {
              threats.push(result.result || result.category);
            }
          }
        }

        const result: ScanResult = {
          url: attrs.url || url,
          safe: attrs.stats.malicious === 0 && attrs.stats.suspicious === 0,
          malicious: attrs.stats.malicious || 0,
          suspicious: attrs.stats.suspicious || 0,
          clean: attrs.stats.harmless + attrs.stats.undetected || 0,
          timeout: attrs.stats.timeout || 0,
          reputation: attrs.reputation || 0,
          scanDate: new Date(attrs.last_analysis_date * 1000).toISOString(),
          threats: [...new Set(threats)]
        };

        setScanResult(result);
        
        toast({
          title: currentLanguage === 'en' ? "Scan Complete" : "စစ်ဆေးမှုပြီးစီး",
          description: currentLanguage === 'en' 
            ? `Scan completed. ${result.malicious > 0 ? 'Threats detected!' : 'URL appears safe.'}` 
            : `စစ်ဆေးမှုပြီးစီး။ ${result.malicious > 0 ? 'ခြိမ်းခြောက်မှုတွေ့ရှိ!' : 'URL လuံခြုံပုံရသည်။'}`,
          variant: result.malicious > 0 ? "destructive" : "default"
        });
      } else {
        throw new Error('Invalid response format from VirusTotal API');
      }
    } catch (error) {
      console.error('Scan error:', error);
      toast({
        title: currentLanguage === 'en' ? "Scan Error" : "စစ်ဆေးမှုအမှား",
        description: currentLanguage === 'en' 
          ? "Failed to scan URL. This might be due to API limits or network issues." 
          : "URL စစ်ဆေးမှု မအောင်မြင်ပါ။ API ကန့်သတ်ချက် သို့မဟုတ် ကွန်ယက်ပြဿနာကြောင့်ဖြစ်နိုင်သည်။",
        variant: "destructive",
      });
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="gradient-border-thick rounded-3xl dark:bg-gray-900 dark:border-gray-800">
        <div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 gradient-text dark:text-gray-200">
              <Search className="h-10 w-6 dark:text-gray-300" />
              {currentLanguage === 'en' ? 'Advanced URL Threat Scanner' : 'အဆင့်မြင့် URL ခြိမ်းခြောက်မှုစစ်ဆေးစနစ်'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={currentLanguage === 'en' 
                  ? "Enter URL to scan (e.g., https://example.com)" 
                  : "စစ်ဆေးရန် URL ထည့်ပါ (ဥပမာ၊ https://example.com)"
                }
                className="flex-1 rounded-2xl dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:placeholder:text-gray-500"
              />
              <Button 
                onClick={scanURL} 
                disabled={isScanning}
                className="px-6 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg transition-all duration-300"
              >
                {isScanning ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
              </Button>
            </div>

            {scanResult && (
              <Card className={`border-4 rounded-3xl ${scanResult.safe ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20' : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'}`}>
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      {scanResult.safe ? (
                        <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                      ) : (
                        <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
                      )}
                      <div>
                        <h3 className={`font-bold text-lg ${scanResult.safe ? 'text-green-800 dark:text-green-400' : 'text-red-800 dark:text-red-400'}`}>
                          {scanResult.safe 
                            ? (currentLanguage === 'en' ? 'Safe' : 'လုံခြုံသည်')
                            : (currentLanguage === 'en' ? 'Threats Detected' : 'ခြိမ်းခြောက်မှုများတွေ့ရှိ')
                          }
                        </h3>
                        <p className="text-sm text-muted-foreground dark:text-gray-400">{scanResult.url}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-2xl">
                        <div className="text-2xl font-bold text-red-600 dark:text-red-400">{scanResult.malicious}</div>
                        <div className="text-xs text-muted-foreground dark:text-gray-400">
                          {currentLanguage === 'en' ? 'Malicious' : 'အန္တရာယ်'}
                        </div>
                      </div>
                      <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-2xl">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">{scanResult.clean}</div>
                        <div className="text-xs text-muted-foreground dark:text-gray-400">
                          {currentLanguage === 'en' ? 'Clean' : 'သန့်ရှင်း'}
                        </div>
                      </div>
                      <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-2xl">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{scanResult.reputation}</div>
                        <div className="text-xs text-muted-foreground dark:text-gray-400">
                          {currentLanguage === 'en' ? 'Reputation' : 'ယုံကြည်မှု'}
                        </div>
                      </div>
                      <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-2xl">
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{scanResult.malicious + scanResult.clean}</div>
                        <div className="text-xs text-muted-foreground dark:text-gray-400">
                          {currentLanguage === 'en' ? 'Total Scans' : 'စုစုပေါင်း'}
                        </div>
                      </div>
                    </div>

                    {scanResult.threats.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2 dark:text-gray-300">
                          {currentLanguage === 'en' ? 'Detected Threats:' : 'တွေ့ရှိသောခြိမ်းခြောက်မှုများ:'}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {scanResult.threats.slice(0, 5).map((threat, idx) => (
                            <Badge key={idx} variant="destructive" className="text-xs rounded-full">
                              {threat}
                            </Badge>
                          ))}
                          {scanResult.threats.length > 5 && (
                            <Badge variant="outline" className="text-xs rounded-full dark:text-gray-300 dark:border-gray-600">
                              +{scanResult.threats.length - 5} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="text-xs text-muted-foreground dark:text-gray-400">
                      <p>
                        <strong className="dark:text-gray-300">{currentLanguage === 'en' ? 'Scan Date:' : 'စစ်ဆေးသည့်ရက်:'}</strong> {new Date(scanResult.scanDate).toLocaleString()}
                      </p>
                      <p className="mt-1">
                        {currentLanguage === 'en' 
                          ? 'Powered by VirusTotal API v3 - Real-time threat detection'
                          : 'VirusTotal API v3 မှ ပံ့ပိုးထားသော - အချိန်နှင့်တပြေးညီ ခြိမ်းခြောက်မှုရှာဖွေမှု'
                        }
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </div>
      </Card>

      {/* Security Tips */}
      <Card className="rounded-3xl dark:bg-gray-900 dark:border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 dark:text-gray-200">
            <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            {currentLanguage === 'en' ? 'URL Safety Tips' : 'URL လုံခြုံရေးအကြံပြုချက်များ'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            {[
              {
                en: "Always check URLs before clicking, especially in emails or messages",
                my: "အီးမေးလ် သို့မဟုတ် မက်ဆေ့ချ်များတွင် URL များကို မနှိပ်မီ အမြဲစစ်ဆေးပါ"
              },
              {
                en: "Look for HTTPS (secure connection) when entering sensitive information",
                my: "အရေးကြီးသောအချက်အလက်များထည့်သွင်းသည့်အခါ HTTPS (လုံခြုံသောချိတ်ဆက်မှု) ကိုရှာပါ"
              },
              {
                en: "Be suspicious of shortened URLs from unknown sources",
                my: "အမည်မသိအရင်းအမြစ်များမှ ချုံ့ထားသော URL များကို အထူးသတိထား၍ကြည့်ပါ"
              },
              {
                en: "Use this scanner regularly to check suspicious links",
                my: "သံသယရှိလင့်များကို စစ်ဆေးရန် ဤစကင်နာကို ပုံမှန်အသုံးပြုပါ"
              }
            ].map((tip, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
                <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="dark:text-gray-300">{tip[currentLanguage]}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThreatScanner;
