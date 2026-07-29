import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking } from 'react-native';
import { BookMarked } from 'lucide-react-native';

interface BookItem {
  id: string;
  title: string;
  author: string;
  description: string;
  url: string;
}

const BOOKS: BookItem[] = [
  {
    id: '1',
    title: 'The Sealed Nectar (Ar-Raheeq Al-Makhtum)',
    author: 'Safiur Rahman Mubarakpuri',
    description: 'A complete authoritative book on the life of Prophet Muhammad (SAW) which was honored by the World Muslim League as first prize winner.',
    url: 'https://kalamullah.com/sealed-nectar.html',
  },
  {
    id: '2',
    title: 'Riyad as-Salihin (The Meadows of the Righteous)',
    author: 'Imam Nawawi',
    description: 'A highly acclaimed compilation of verses from the Qur\'an and Hadith by Imam an-Nawawi, covering various aspects of Islamic morals and etiquette.',
    url: 'https://sunnah.com/riyadussalihin',
  },
  {
    id: '3',
    title: 'Fortress of the Muslim (Hisnul Muslim)',
    author: 'Sa\'id bin Ali bin Wahf Al-Qahtani',
    description: 'A widely popular collection of authentic invocations and supplications (Du\'as) for daily use from the Quran and Sunnah.',
    url: 'https://sunnah.com/hisn',
  },
];

export default function BooksScreen() {
  const renderItem = ({ item }: { item: BookItem }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => Linking.openURL(item.url)}
    >
      <View style={styles.iconContainer}>
        <BookMarked color="#D4AF37" size={32} />
      </View>
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.author}>by {item.author}</Text>
        <Text style={styles.description} numberOfLines={3}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={BOOKS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F2F20' },
  listContent: { padding: 20 },
  card: {
    backgroundColor: '#1B4332',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.15)',
    flexDirection: 'row',
  },
  iconContainer: {
    width: 60,
    height: 80,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  info: { flex: 1, justifyContent: 'center' },
  title: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  author: { color: '#D4AF37', fontSize: 14, marginBottom: 8, fontStyle: 'italic' },
  description: { color: '#A0A0A0', fontSize: 12, lineHeight: 18 },
});
