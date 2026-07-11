import axios from 'axios';

// Add this to your environment variables later (.env)
const OPENAI_API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY || '';

export const getDailyAISuggestion = async (score: number) => {
  if (!OPENAI_API_KEY) {
    // Fallback if no API key is provided
    return score >= 0
      ? "Today's suggestion: Give charity, however small."
      : "Today's must-do: Give Sadaqah, Read 10 Ayahs, Make Istighfar 100 times.";
  }

  try {
    const prompt = score >= 0 
      ? "The user has a positive Taqwa (piety) score today. Give a short, encouraging 1-sentence Islamic suggestion to do a good deed today."
      : "The user has a negative Taqwa (piety) score today, meaning they have sinned or missed prayers. Give a short, firm but merciful 1-sentence Islamic suggestion to repent and do specific good deeds today.";

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages: [{ role: 'system', content: prompt }],
        max_tokens: 50,
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error("AI Service Error:", error);
    return "Make Istighfar and renew your intentions today.";
  }
};
