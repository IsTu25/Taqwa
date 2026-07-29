import axios from 'axios';

// Add this to your environment variables later (.env)
const OPENAI_API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY || '';
const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY || '';

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

export const askMasailBot = async (question: string): Promise<string> => {
  if (!GEMINI_API_KEY) {
    return 'Please add your Gemini API Key in .env to enable the Masail chatbot.';
  }

  try {
    const prompt = `
      You are "Masail", a knowledgeable and humble Islamic assistant embedded in the Takwa app.
      Answer the user's everyday Fiqh / Islamic question below, in whichever language they asked
      in (English or Bangla). Keep the answer concise (3-6 sentences), practical, and where
      relevant mention that different schools of thought (madhahib) may differ and recommend
      consulting a local scholar for rulings with significant personal consequences.
      Do not fabricate Quran verse numbers or Hadith references you are not confident about;
      speak in general terms if unsure.

      Question: "${question}"
    `;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      { contents: [{ parts: [{ text: prompt }] }] },
      { headers: { 'Content-Type': 'application/json' } }
    );

    return response.data.candidates[0].content.parts[0].text.trim();
  } catch (error) {
    console.error('Masail bot error:', error);
    return "I couldn't reach the AI service right now. Please try again in a moment.";
  }
};

export interface DeedEvaluation {
  type: 'good' | 'bad';
  points: number;
  reference: string;
}

export const evaluateDeedWithGemini = async (userDeed: string): Promise<DeedEvaluation> => {
  if (!GEMINI_API_KEY) {
    // Fallback if no API key is provided
    return {
      type: 'good',
      points: 10,
      reference: 'Please add your Gemini API Key in .env to get AI evaluations.'
    };
  }

  try {
    const prompt = `
      You are an Islamic assistant. The user has logged a daily activity: "${userDeed}".
      Evaluate this activity based on Islamic teachings.
      1. Determine if it is a good deed (good) or a sin/bad deed (bad).
      2. Assign points from 10 to 200. Good deeds should be positive points, sins should be positive points that will be subtracted later (just return a positive absolute number).
      3. Provide a short, inspiring Quranic verse or Hadith reference relating to this action (max 2 sentences).
      
      You must respond strictly in JSON format without any markdown wrappers or code blocks.
      Example format:
      {
        "type": "good",
        "points": 50,
        "reference": "Allah multiplies the reward of charity from 70 to 700 times! (Quran 2:261)"
      }
    `;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const textResult = response.data.candidates[0].content.parts[0].text;
    const parsed = JSON.parse(textResult);
    return parsed as DeedEvaluation;
  } catch (error) {
    console.error("Gemini AI Service Error:", error);
    return {
      type: 'good',
      points: 10,
      reference: 'Error connecting to AI. May Allah reward your intention.'
    };
  }
};