import { doc, setDoc, getDoc, collection, getDocs, addDoc } from 'firebase/firestore';
import { db, auth } from './firebase';

export const syncScoreToFirestore = async (score: number) => {
  if (!auth.currentUser) return;
  
  const userId = auth.currentUser.uid;
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  
  try {
    const userDocRef = doc(db, 'users', userId, 'daily_scores', today);
    await setDoc(userDocRef, {
      score: score,
      lastUpdated: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    console.error("Error syncing score to Firestore:", error);
  }
};

export const fetchTodayScoreFromFirestore = async (): Promise<number | null> => {
  if (!auth.currentUser) return null;

  const userId = auth.currentUser.uid;
  const today = new Date().toISOString().split('T')[0];
  
  try {
    const userDocRef = doc(db, 'users', userId, 'daily_scores', today);
    const docSnap = await getDoc(userDocRef);
    
    if (docSnap.exists()) {
      return docSnap.data().score;
    }
  } catch (error) {
    console.error("Error fetching score from Firestore:", error);
  }
  
  return null;
};

export interface Article {
  id?: string;
  title: string;
  author: string;
  date: string;
  content: string;
}

export const getArticles = async (): Promise<Article[]> => {
  try {
    const articlesCol = collection(db, 'articles');
    const articleSnapshot = await getDocs(articlesCol);
    const articleList = articleSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Article));
    return articleList;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
};

export const seedArticles = async () => {
  const INITIAL_ARTICLES = [
    {
      title: 'The Power of Gratitude (Shukr)',
      author: 'Takwa Editorial',
      date: 'Oct 15',
      content: 'Gratitude in Islam is not just a feeling, but a state of being. Allah says in the Quran: "If you are grateful, I will surely increase you [in favor]" (14:7). True Shukr involves recognizing the blessing in your heart, speaking of it with your tongue, and using it in ways that please the Creator.',
    },
    {
      title: 'Understanding Sabr',
      author: 'Takwa Editorial',
      date: 'Oct 12',
      content: 'Sabr is often translated as patience, but it encompasses perseverance, endurance, and restraint. It is divided into three categories: patience in obeying Allah, patience in abstaining from sins, and patience during times of calamity. The Prophet (SAW) said, "And whoever remains patient, Allah will make him patient. Nobody can be given a blessing better and greater than patience." (Bukhari)',
    },
    {
      title: 'The Importance of Good Character',
      author: 'Takwa Editorial',
      date: 'Oct 05',
      content: 'The Prophet Muhammad (SAW) was sent to perfect good character. He said, "The most perfect of the believers in faith are the best of them in moral character." (Tirmidhi). Good character involves treating others with respect, honesty, and kindness, regardless of their background or status.',
    },
  ];

  try {
    const articlesCol = collection(db, 'articles');
    // Check if empty first
    const snapshot = await getDocs(articlesCol);
    if (snapshot.empty) {
      for (const article of INITIAL_ARTICLES) {
        await addDoc(articlesCol, article);
      }
      return true; // Successfully seeded
    }
    return false; // Already has data
  } catch (error) {
    console.error("Error seeding articles:", error);
    return false;
  }
};
