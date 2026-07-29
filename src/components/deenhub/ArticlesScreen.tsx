import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const ARTICLES = [
  {
    id: '1',
    title: 'The Power of Gratitude (Shukr)',
    author: 'Takwa Editorial',
    date: 'Oct 15',
    content: 'Gratitude in Islam is not just a feeling, but a state of being. Allah says in the Quran: "If you are grateful, I will surely increase you [in favor]" (14:7). True Shukr involves recognizing the blessing in your heart, speaking of it with your tongue, and using it in ways that please the Creator.',
  },
  {
    id: '2',
    title: 'Understanding Sabr',
    author: 'Takwa Editorial',
    date: 'Oct 12',
    content: 'Sabr is often translated as patience, but it encompasses perseverance, endurance, and restraint. It is divided into three categories: patience in obeying Allah, patience in abstaining from sins, and patience during times of calamity. The Prophet (SAW) said, "And whoever remains patient, Allah will make him patient. Nobody can be given a blessing better and greater than patience." (Bukhari)',
  },
  {
    id: '3',
    title: 'The Importance of Good Character',
    author: 'Takwa Editorial',
    date: 'Oct 05',
    content: 'The Prophet Muhammad (SAW) was sent to perfect good character. He said, "The most perfect of the believers in faith are the best of them in moral character." (Tirmidhi). Good character involves treating others with respect, honesty, and kindness, regardless of their background or status.',
  },
];

export default function ArticlesScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {ARTICLES.map((article) => (
        <View key={article.id} style={styles.card}>
          <Text style={styles.title}>{article.title}</Text>
          <View style={styles.metaRow}>
            <Text style={styles.author}>{article.author}</Text>
            <Text style={styles.date}>{article.date}</Text>
          </View>
          <Text style={styles.body}>{article.content}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F2F20' },
  content: { padding: 20 },
  card: {
    backgroundColor: '#1B4332',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.1)',
  },
  title: { color: '#FFF', fontSize: 20, fontWeight: 'bold', marginBottom: 12, lineHeight: 28 },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)', paddingBottom: 12 },
  author: { color: '#D4AF37', fontSize: 12, fontWeight: '600' },
  date: { color: '#A0A0A0', fontSize: 12 },
  body: { color: '#FFF', fontSize: 15, lineHeight: 24, opacity: 0.9 },
});
