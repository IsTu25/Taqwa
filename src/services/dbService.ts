import { doc, setDoc, getDoc } from 'firebase/firestore';
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
