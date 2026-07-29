import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const ALPHABETS = [
  { id: '1', ar: 'ا', en: 'Alif', tip: 'Pronounced from the emptiness of the mouth' },
  { id: '2', ar: 'ب', en: 'Ba', tip: 'Pronounced by bringing the two lips together' },
  { id: '3', ar: 'ت', en: 'Ta', tip: 'Pronounced from the tip of the tongue and the roots of the upper front teeth' },
  { id: '4', ar: 'ث', en: 'Tha', tip: 'Pronounced from the tip of the tongue and the edges of the upper front teeth' },
  { id: '5', ar: 'ج', en: 'Jeem', tip: 'Pronounced from the middle of the tongue and the hard palate' },
  { id: '6', ar: 'ح', en: 'Ha', tip: 'Pronounced from the middle of the throat' },
  { id: '7', ar: 'خ', en: 'Kha', tip: 'Pronounced from the top of the throat' },
];

export default function QuranLearningScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.sectionTitle}>Introduction to Tajweed</Text>
      <Text style={styles.description}>
        Tajweed refers to the rules governing pronunciation during recitation of the Quran. 
        The core of Tajweed is understanding "Makharij" (the emission points of the letters) 
        and "Sifaat" (the characteristics of the letters).
      </Text>

      <Text style={[styles.sectionTitle, { marginTop: 30 }]}>Basic Arabic Alphabets</Text>
      
      <View style={styles.grid}>
        {ALPHABETS.map((letter) => (
          <View key={letter.id} style={styles.card}>
            <Text style={styles.arabicText}>{letter.ar}</Text>
            <Text style={styles.englishText}>{letter.en}</Text>
            <Text style={styles.tipText}>{letter.tip}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F2F20' },
  content: { padding: 20 },
  sectionTitle: { color: '#D4AF37', fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  description: { color: '#A0A0A0', fontSize: 14, lineHeight: 22 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: {
    backgroundColor: '#1B4332',
    width: '48%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.15)',
    alignItems: 'center',
  },
  arabicText: { color: '#FFF', fontSize: 40, fontWeight: 'bold', marginBottom: 8 },
  englishText: { color: '#D4AF37', fontSize: 16, fontWeight: '600', marginBottom: 8 },
  tipText: { color: '#A0A0A0', fontSize: 11, textAlign: 'center' },
});
