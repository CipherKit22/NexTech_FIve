// Define types used throughout the application

export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  language?: 'en' | 'my';
}