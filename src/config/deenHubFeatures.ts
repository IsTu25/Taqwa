import {
  BookOpen, Clock, Book, Heart, MessageCircle, HelpCircle, Video, List,
  DollarSign, Calendar, Navigation, PlusSquare, BookMarked, MessageSquare,
} from 'lucide-react-native';

export type FeatureType =
  | 'quran' | 'prayertimes' | 'dua' | 'hadith' | 'masail' | 'tasbih'
  | 'qibla' | 'zakat' | 'namazguide' | 'tafseer' | 'books' | 'quiz'
  | 'bayan' | 'quranlearning' | 'articles' | 'hajjumrah' | 'roza' | 'placeholder';

export interface DeenHubFeature {
  slug: string;
  name: string;
  icon: any;
  type: FeatureType;
  description: string; // used on placeholder / detail header
}

export const DEEN_HUB_FEATURES: DeenHubFeature[] = [
  { slug: 'tafseer', name: 'Tafseer', icon: BookOpen, type: 'tafseer', description: 'Verse-by-verse Quranic commentary from classical and contemporary scholars.' },
  { slug: 'prayer-times', name: 'Prayer Times', icon: Clock, type: 'prayertimes', description: 'Full daily prayer schedule for your current location.' },
  { slug: 'quran', name: 'Quran', icon: Book, type: 'quran', description: 'Browse and read all 114 Surahs with Arabic text and translation.' },
  { slug: 'dua', name: 'Dua', icon: Heart, type: 'dua', description: 'A curated collection of daily supplications from the Quran and Sunnah.' },
  { slug: 'books', name: 'Books', icon: BookMarked, type: 'books', description: 'A digital library of foundational Islamic texts and modern reads.' },
  { slug: 'hadith', name: 'Hadith', icon: BookOpen, type: 'hadith', description: 'Authentic narrations from Sahih Bukhari, Sahih Muslim, and other collections.' },
  { slug: 'masail', name: 'Masail', icon: MessageCircle, type: 'masail', description: 'Ask everyday Fiqh questions and get AI-assisted, context-aware answers.' },
  { slug: 'quiz', name: 'Quiz', icon: HelpCircle, type: 'quiz', description: 'Test and reinforce your Islamic knowledge with bite-sized quizzes.' },
  { slug: 'bayan', name: 'Bayan', icon: Video, type: 'bayan', description: 'Curated video lectures and reminders from trusted scholars.' },
  { slug: 'quran-learning', name: 'Quran Learning', icon: Book, type: 'quranlearning', description: 'Structured Tajweed lessons and recitation practice, with AI feedback (roadmap).' },
  { slug: 'articles', name: 'Articles', icon: List, type: 'articles', description: 'Short reads on faith, character, and daily practice.' },
  { slug: 'tasbih', name: 'Tasbih', icon: PlusSquare, type: 'tasbih', description: 'A digital counter for Dhikr — Subhanallah, Alhamdulillah, Allahu Akbar.' },
  { slug: 'namaz-guide', name: 'Namaz Guide', icon: Navigation, type: 'namazguide', description: 'Step-by-step guide to Wudu and Salah for every prayer.' },
  { slug: 'hajj-umrah', name: 'Hajj & Umrah', icon: Navigation, type: 'hajjumrah', description: 'A complete rites-of-passage guide for Hajj and Umrah pilgrims.' },
  { slug: 'roza', name: 'Roza', icon: Calendar, type: 'roza', description: 'Fasting rulings, Sehri/Iftar timing, and Ramadan planning tools.' },
  { slug: 'zakat', name: 'Zakat', icon: DollarSign, type: 'zakat', description: 'Calculate your annual Zakat obligation on cash, gold, and savings.' },
];

export const getFeatureBySlug = (slug: string) =>
  DEEN_HUB_FEATURES.find((f) => f.slug === slug);
