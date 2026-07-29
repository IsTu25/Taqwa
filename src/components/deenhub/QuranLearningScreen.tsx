import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const ALPHABET_GROUPS = [
  {
    title: 'The Empty Space (Al-Jawf)',
    desc: 'The empty space in the mouth and throat. Produces the 3 long vowel sounds.',
    letters: [
      { id: '1', ar: 'ا', en: 'Alif Maddah', tip: 'Prolonged \'A\' sound' },
      { id: '2', ar: 'و', en: 'Waw Maddah', tip: 'Prolonged \'U\' sound' },
      { id: '3', ar: 'ي', en: 'Ya Maddah', tip: 'Prolonged \'I\' sound' },
    ]
  },
  {
    title: 'The Throat (Al-Halq)',
    desc: 'These 6 letters are pronounced from three different parts of the throat.',
    letters: [
      { id: '4', ar: 'ء', en: 'Hamzah', tip: 'Bottom of the throat' },
      { id: '5', ar: 'ه', en: 'Ha', tip: 'Bottom of the throat' },
      { id: '6', ar: 'ع', en: '\'Ayn', tip: 'Middle of the throat' },
      { id: '7', ar: 'ح', en: 'Haa', tip: 'Middle of the throat (sharp)' },
      { id: '8', ar: 'غ', en: 'Ghayn', tip: 'Top of the throat' },
      { id: '9', ar: 'خ', en: 'Kha', tip: 'Top of the throat' },
    ]
  },
  {
    title: 'The Tongue (Al-Lisan)',
    desc: 'The largest articulation point, producing 18 letters from various parts of the tongue touching the palate or teeth.',
    letters: [
      { id: '10', ar: 'ق', en: 'Qaf', tip: 'Back of tongue touching soft palate' },
      { id: '11', ar: 'ك', en: 'Kaf', tip: 'Back of tongue touching hard palate' },
      { id: '12', ar: 'ج', en: 'Jeem', tip: 'Middle of tongue to hard palate' },
      { id: '13', ar: 'ش', en: 'Sheen', tip: 'Middle of tongue to hard palate' },
      { id: '14', ar: 'ي', en: 'Ya (Consonant)', tip: 'Middle of tongue to hard palate' },
      { id: '15', ar: 'ض', en: 'Daad', tip: 'Edge of tongue to upper molars' },
      { id: '16', ar: 'ل', en: 'Lam', tip: 'Tip of tongue to front gums' },
      { id: '17', ar: 'ن', en: 'Noon', tip: 'Tip of tongue to front gums' },
      { id: '18', ar: 'ر', en: 'Ra', tip: 'Tip of tongue to front gums (with slight trill)' },
      { id: '19', ar: 'ط', en: 'Taa', tip: 'Tip of tongue to roots of upper incisors' },
      { id: '20', ar: 'د', en: 'Dal', tip: 'Tip of tongue to roots of upper incisors' },
      { id: '21', ar: 'ت', en: 'Ta', tip: 'Tip of tongue to roots of upper incisors' },
      { id: '22', ar: 'ص', en: 'Saad', tip: 'Tip of tongue approaching lower incisors' },
      { id: '23', ar: 'س', en: 'Seen', tip: 'Tip of tongue approaching lower incisors' },
      { id: '24', ar: 'ز', en: 'Zay', tip: 'Tip of tongue approaching lower incisors' },
      { id: '25', ar: 'ظ', en: 'Dhaa', tip: 'Tip of tongue to edges of upper incisors' },
      { id: '26', ar: 'ذ', en: 'Thal', tip: 'Tip of tongue to edges of upper incisors' },
      { id: '27', ar: 'ث', en: 'Tha', tip: 'Tip of tongue to edges of upper incisors' },
    ]
  },
  {
    title: 'The Lips (Ash-Shatan)',
    desc: 'These 4 letters are pronounced using the lips.',
    letters: [
      { id: '28', ar: 'ف', en: 'Fa', tip: 'Upper incisors to lower lip' },
      { id: '29', ar: 'و', en: 'Waw (Consonant)', tip: 'Rounding both lips' },
      { id: '30', ar: 'ب', en: 'Ba', tip: 'Closing both lips firmly' },
      { id: '31', ar: 'م', en: 'Meem', tip: 'Closing both lips (with nasal sound)' },
    ]
  }
];

export default function QuranLearningScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.introBox}>
        <Text style={styles.sectionTitle}>Makharij Al-Huroof</Text>
        <Text style={styles.description}>
          Tajweed refers to the rules governing pronunciation during recitation of the Quran. 
          The core of Tajweed is understanding "Makharij" (the emission points of the letters).
          There are 5 main articulation points that produce the 28 Arabic letters.
        </Text>
      </View>

      {ALPHABET_GROUPS.map((group, index) => (
        <View key={index} style={styles.groupContainer}>
          <Text style={styles.groupTitle}>{group.title}</Text>
          <Text style={styles.groupDesc}>{group.desc}</Text>
          
          <View style={styles.grid}>
            {group.letters.map((letter) => (
              <View key={letter.id} style={styles.card}>
                <Text style={styles.arabicText}>{letter.ar}</Text>
                <Text style={styles.englishText}>{letter.en}</Text>
                <Text style={styles.tipText}>{letter.tip}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F2F20' },
  content: { padding: 20 },
  introBox: { marginBottom: 24 },
  sectionTitle: { color: '#D4AF37', fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  description: { color: '#A0A0A0', fontSize: 14, lineHeight: 22 },
  
  groupContainer: { marginBottom: 32 },
  groupTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold', marginBottom: 6, borderBottomWidth: 1, borderBottomColor: 'rgba(212, 175, 55, 0.2)', paddingBottom: 8 },
  groupDesc: { color: '#A0A0A0', fontSize: 13, marginBottom: 16, fontStyle: 'italic' },
  
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
  englishText: { color: '#D4AF37', fontSize: 15, fontWeight: '600', marginBottom: 8 },
  tipText: { color: '#A0A0A0', fontSize: 11, textAlign: 'center', lineHeight: 16 },
});
