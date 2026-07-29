import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';

// Helper to remove HTML tags like <p>, </p>, etc.
const stripHtml = (html: string) => {
  return html.replace(/<[^>]*>?/gm, '');
};

interface Chapter {
  id: number;
  name_simple: string;
  translated_name: { name: string };
}

interface TafsirVerse {
  id: number;
  verse_key: string;
  text: string;
}

export default function TafseerScreen() {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [tafsirData, setTafsirData] = useState<TafsirVerse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch chapters list on mount
  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await axios.get('https://api.quran.com/api/v4/chapters');
        setChapters(response.data.chapters);
      } catch (err) {
        console.log(err);
      }
    };
    fetchChapters();
  }, []);

  const loadTafsir = async (chapterId: number) => {
    setSelectedChapter(chapterId);
    setLoading(true);
    setError('');
    setTafsirData([]);
    try {
      // 169 is Ibn Kathir (English) in Quran.com API
      const response = await axios.get(`https://api.quran.com/api/v4/tafsirs/169/by_chapter/${chapterId}`);
      if (response.data && response.data.tafsirs) {
        setTafsirData(response.data.tafsirs);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to load Tafseer. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  if (selectedChapter) {
    const chapterInfo = chapters.find(c => c.id === selectedChapter);
    return (
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => setSelectedChapter(null)} style={styles.backBtn}>
            <Text style={styles.backBtnText}>← Back to Surahs</Text>
          </TouchableOpacity>
          <Text style={styles.surahTitle}>{chapterInfo?.name_simple}</Text>
        </View>

        {loading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#D4AF37" />
            <Text style={styles.loadingText}>Loading Tafseer Ibn Kathir...</Text>
          </View>
        ) : error ? (
          <View style={styles.centerContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={() => loadTafsir(selectedChapter)} style={styles.retryBtn}>
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.sourceText}>Source: Tafsir Ibn Kathir (Abridged)</Text>
            {tafsirData.map((verse) => (
              <View key={verse.id} style={styles.card}>
                <View style={styles.verseBadge}>
                  <Text style={styles.verseBadgeText}>Ayah {verse.verse_key}</Text>
                </View>
                <Text style={styles.body}>{stripHtml(verse.text)}</Text>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.introContainer}>
        <Text style={styles.intro}>
          Select a Surah to read its verse-by-verse commentary from Tafsir Ibn Kathir.
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.listContent}>
        {chapters.length === 0 ? (
          <ActivityIndicator size="large" color="#D4AF37" style={{ marginTop: 40 }} />
        ) : (
          chapters.map(chapter => (
            <TouchableOpacity
              key={chapter.id}
              style={styles.chapterCard}
              activeOpacity={0.7}
              onPress={() => loadTafsir(chapter.id)}
            >
              <View style={styles.chapterNumberBox}>
                <Text style={styles.chapterNumber}>{chapter.id}</Text>
              </View>
              <View style={styles.chapterInfo}>
                <Text style={styles.chapterName}>{chapter.name_simple}</Text>
                <Text style={styles.chapterTranslate}>{chapter.translated_name.name}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F2F20' },
  introContainer: { padding: 20, paddingBottom: 0 },
  content: { padding: 20 },
  listContent: { padding: 20, paddingTop: 10 },
  intro: { color: '#A0A0A0', fontSize: 14, lineHeight: 22, fontStyle: 'italic' },
  chapterCard: {
    backgroundColor: '#1B4332',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.15)',
  },
  chapterNumberBox: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(212, 175, 55, 0.2)',
    alignItems: 'center', justifyContent: 'center', marginRight: 16
  },
  chapterNumber: { color: '#D4AF37', fontWeight: 'bold' },
  chapterInfo: { flex: 1 },
  chapterName: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  chapterTranslate: { color: '#A0A0A0', fontSize: 13, marginTop: 4 },
  
  headerRow: { flexDirection: 'row', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)', justifyContent: 'space-between' },
  backBtn: { backgroundColor: 'rgba(212, 175, 55, 0.1)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
  backBtnText: { color: '#D4AF37', fontWeight: '600', fontSize: 14 },
  surahTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  
  centerContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  loadingText: { color: '#D4AF37', marginTop: 16, fontWeight: '600' },
  errorText: { color: '#E74C3C', textAlign: 'center', marginBottom: 20, fontSize: 16 },
  retryBtn: { backgroundColor: '#D4AF37', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 20 },
  retryText: { color: '#0F2F20', fontWeight: 'bold' },

  sourceText: { color: '#D4AF37', fontSize: 13, fontStyle: 'italic', marginBottom: 20, textAlign: 'center' },
  card: {
    backgroundColor: '#1B4332',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.15)',
  },
  verseBadge: { alignSelf: 'flex-start', backgroundColor: 'rgba(212, 175, 55, 0.15)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, marginBottom: 16 },
  verseBadgeText: { color: '#D4AF37', fontSize: 13, fontWeight: 'bold' },
  body: { color: '#FFF', fontSize: 15, lineHeight: 26, opacity: 0.9 },
});
