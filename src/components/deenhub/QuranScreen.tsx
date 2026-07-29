import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { ChevronLeft } from 'lucide-react-native';

interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
}

interface Ayah {
  numberInSurah: number;
  text: string;
  translation?: string;
}

export default function QuranScreen() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingAyahs, setLoadingAyahs] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get('https://api.alquran.cloud/v1/surah')
      .then((res) => setSurahs(res.data.data))
      .catch(() => setError('Could not load the Surah list. Check your connection.'))
      .finally(() => setLoading(false));
  }, []);

  const openSurah = async (surah: Surah) => {
    setSelectedSurah(surah);
    setLoadingAyahs(true);
    try {
      const [arabicRes, translationRes] = await Promise.all([
        axios.get(`https://api.alquran.cloud/v1/surah/${surah.number}`),
        axios.get(`https://api.alquran.cloud/v1/surah/${surah.number}/en.asad`),
      ]);
      const arabicAyahs = arabicRes.data.data.ayahs;
      const translationAyahs = translationRes.data.data.ayahs;
      setAyahs(
        arabicAyahs.map((a: any, i: number) => ({
          numberInSurah: a.numberInSurah,
          text: a.text,
          translation: translationAyahs[i]?.text,
        }))
      );
    } catch {
      setError('Could not load this Surah. Check your connection.');
    } finally {
      setLoadingAyahs(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#D4AF37" />
      </View>
    );
  }

  if (error && !selectedSurah) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (selectedSurah) {
    return (
      <View style={styles.flex}>
        <TouchableOpacity style={styles.backRow} onPress={() => setSelectedSurah(null)}>
          <ChevronLeft color="#D4AF37" size={20} />
          <Text style={styles.backText}>All Surahs</Text>
        </TouchableOpacity>
        <Text style={styles.surahTitle}>
          {selectedSurah.englishName} — {selectedSurah.name}
        </Text>
        {loadingAyahs ? (
          <ActivityIndicator size="large" color="#D4AF37" style={{ marginTop: 40 }} />
        ) : (
          <FlatList
            data={ayahs}
            keyExtractor={(a) => String(a.numberInSurah)}
            contentContainerStyle={styles.ayahList}
            renderItem={({ item }) => (
              <View style={styles.ayahCard}>
                <Text style={styles.ayahNumber}>{item.numberInSurah}</Text>
                <Text style={styles.ayahArabic}>{item.text}</Text>
                {item.translation && <Text style={styles.ayahTranslation}>{item.translation}</Text>}
              </View>
            )}
          />
        )}
      </View>
    );
  }

  return (
    <FlatList
      data={surahs}
      keyExtractor={(s) => String(s.number)}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.surahRow} onPress={() => openSurah(item)}>
          <View style={styles.surahNumberBadge}>
            <Text style={styles.surahNumberText}>{item.number}</Text>
          </View>
          <View style={styles.surahInfo}>
            <Text style={styles.surahName}>{item.englishName}</Text>
            <Text style={styles.surahMeta}>
              {item.englishNameTranslation} · {item.numberOfAyahs} Ayahs
            </Text>
          </View>
          <Text style={styles.surahArabicName}>{item.name}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  errorText: { color: '#FF4444', textAlign: 'center' },
  list: { padding: 16 },
  surahRow: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#1B4332',
    borderRadius: 12, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(212, 175, 55, 0.2)',
  },
  surahNumberBadge: {
    width: 32, height: 32, borderRadius: 16, borderWidth: 1, borderColor: '#D4AF37',
    alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  surahNumberText: { color: '#D4AF37', fontSize: 12, fontWeight: 'bold' },
  surahInfo: { flex: 1 },
  surahName: { color: '#FFFFFF', fontSize: 15, fontWeight: '600' },
  surahMeta: { color: '#A0A0A0', fontSize: 12, marginTop: 2 },
  surahArabicName: { color: '#D4AF37', fontSize: 18 },
  backRow: { flexDirection: 'row', alignItems: 'center', padding: 12 },
  backText: { color: '#D4AF37', marginLeft: 4 },
  surahTitle: { color: '#D4AF37', fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  ayahList: { padding: 16 },
  ayahCard: {
    backgroundColor: '#1B4332', borderRadius: 12, padding: 14, marginBottom: 10,
    borderWidth: 1, borderColor: 'rgba(212, 175, 55, 0.15)',
  },
  ayahNumber: { color: '#D4AF37', fontSize: 12, marginBottom: 6 },
  ayahArabic: { color: '#FFFFFF', fontSize: 20, textAlign: 'right', lineHeight: 34, marginBottom: 8 },
  ayahTranslation: { color: '#A0A0A0', fontSize: 13, lineHeight: 19 },
});
