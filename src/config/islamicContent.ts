export interface DuaEntry {
  title: string;
  arabic: string;
  meaning: string;
  reference: string;
}

export const DUAS: DuaEntry[] = [
  {
    title: 'Waking Up',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
    meaning: 'Praise be to Allah who gave us life after having taken it from us, and unto Him is the resurrection.',
    reference: 'Sahih al-Bukhari',
  },
  {
    title: 'Before Eating',
    arabic: 'بِسْمِ اللَّهِ',
    meaning: 'In the name of Allah.',
    reference: 'Sunan Abi Dawud',
  },
  {
    title: 'Entering the Home',
    arabic: 'بِسْمِ اللَّهِ وَلَجْنَا وَبِسْمِ اللَّهِ خَرَجْنَا وَعَلَى رَبِّنَا تَوَكَّلْنَا',
    meaning: 'In the name of Allah we enter, in the name of Allah we leave, and upon our Lord we place our trust.',
    reference: 'Sunan Abi Dawud',
  },
  {
    title: 'Leaving the Home',
    arabic: 'بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ',
    meaning: 'In the name of Allah, I place my trust in Allah.',
    reference: 'Sunan Abi Dawud, Sunan al-Tirmidhi',
  },
  {
    title: 'Before Sleeping',
    arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
    meaning: 'In Your name, O Allah, I die and I live.',
    reference: 'Sahih al-Bukhari',
  },
  {
    title: 'Seeking Forgiveness',
    arabic: 'أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ',
    meaning: 'I seek forgiveness from Allah the Mighty, besides whom there is no god, the Living, the Sustainer, and I turn to Him in repentance.',
    reference: 'Sunan Abi Dawud, Sunan al-Tirmidhi',
  },
  {
    title: 'For Ease in Difficulty',
    arabic: 'اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلًا',
    meaning: 'O Allah, nothing is easy except what You make easy, and You make the difficult easy if You will.',
    reference: 'Sahih Ibn Hibban',
  },
  {
    title: 'Traveling',
    arabic: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ',
    meaning: 'Glory to Him who has subjected this to us, and we could never have accomplished this by ourselves.',
    reference: 'Sahih Muslim',
  },
];

export interface HadithEntry {
  narrator: string;
  text: string;
  reference: string;
}

export const HADITHS: HadithEntry[] = [
  {
    narrator: 'Umar ibn al-Khattab (RA)',
    text: 'Actions are judged by intentions, and every person will get the reward according to what they intended.',
    reference: 'Sahih al-Bukhari & Sahih Muslim',
  },
  {
    narrator: 'Abu Hurairah (RA)',
    text: 'Whoever believes in Allah and the Last Day should speak good or remain silent.',
    reference: 'Sahih al-Bukhari & Sahih Muslim',
  },
  {
    narrator: 'Anas ibn Malik (RA)',
    text: 'None of you truly believes until he wishes for his brother what he wishes for himself.',
    reference: 'Sahih al-Bukhari & Sahih Muslim',
  },
  {
    narrator: 'Abu Hurairah (RA)',
    text: 'The strong person is not the one who overcomes others by strength, but the one who controls himself while in anger.',
    reference: 'Sahih al-Bukhari & Sahih Muslim',
  },
  {
    narrator: "Abdullah ibn 'Amr (RA)",
    text: 'The best among you are those who have the best manners and character.',
    reference: 'Sahih al-Bukhari',
  },
  {
    narrator: 'Abu Hurairah (RA)',
    text: 'Whoever removes a hardship from a believer in this world, Allah will remove from him one of the hardships of the Day of Judgment.',
    reference: 'Sahih Muslim',
  },
];

export interface NamazStep {
  title: string;
  steps: string[];
}

export const NAMAZ_GUIDE: NamazStep[] = [
  {
    title: 'Wudu (Ablution)',
    steps: [
      'Make the intention (niyyah) to purify yourself for prayer.',
      'Say "Bismillah" and wash both hands up to the wrists, three times.',
      'Rinse the mouth three times, then rinse the nose by sniffing water and blowing out, three times.',
      'Wash the face from hairline to chin, ear to ear, three times.',
      'Wash the arms up to and including the elbows, right then left, three times.',
      'Wipe the head once with wet hands, then wipe the ears.',
      'Wash the feet up to and including the ankles, right then left, three times.',
    ],
  },
  {
    title: 'Salah (Prayer) — Basic Structure',
    steps: [
      'Face the Qiblah and make the intention for the specific prayer.',
      'Say "Allahu Akbar" (Takbir) to begin, raising the hands to the shoulders or ears.',
      'Recite Surah Al-Fatiha, followed by another portion of the Quran (in the first two Rak\'ahs).',
      'Bow (Ruku) saying "Subhana Rabbiyal Adheem," then rise saying "Sami Allahu liman hamidah."',
      'Prostrate (Sujud) saying "Subhana Rabbiyal A\'la," sit briefly, then prostrate again.',
      'Repeat the cycle for the required number of Rak\'ahs, sitting for Tashahhud after the second and final Rak\'ah.',
      'Conclude with Salam, turning the head to the right and then the left.',
    ],
  },
];
