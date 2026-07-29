import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking, Image } from 'react-native';
import { PlayCircle } from 'lucide-react-native';

interface BayanVideo {
  id: string;
  title: string;
  scholar: string;
  duration: string;
  thumbnail: string;
  url: string;
}

const VIDEOS: BayanVideo[] = [
  {
    id: '1',
    title: 'Finding Peace in Difficult Times',
    scholar: 'Mufti Menk',
    duration: '15:20',
    thumbnail: 'https://img.youtube.com/vi/d_r8qG2aJpE/mqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=d_r8qG2aJpE',
  },
  {
    id: '2',
    title: 'The Beauty of Patience (Sabr)',
    scholar: 'Omar Suleiman',
    duration: '12:45',
    thumbnail: 'https://img.youtube.com/vi/Zf3H-M7U7YI/mqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=Zf3H-M7U7YI',
  },
  {
    id: '3',
    title: 'How to Build Consistency in Prayer',
    scholar: 'Nouman Ali Khan',
    duration: '22:10',
    thumbnail: 'https://img.youtube.com/vi/9LqJc_R7X1w/mqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=9LqJc_R7X1w',
  },
];

export default function BayanScreen() {
  const renderItem = ({ item }: { item: BayanVideo }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => Linking.openURL(item.url)}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <View style={styles.overlay}>
        <PlayCircle color="#FFF" size={40} />
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.scholar}>{item.scholar}</Text>
          <Text style={styles.duration}>{item.duration}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Curated Reminders</Text>
      <FlatList
        data={VIDEOS}
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
  headerText: { color: '#D4AF37', fontSize: 18, fontWeight: '600', padding: 20, paddingBottom: 10 },
  listContent: { padding: 20, paddingTop: 0 },
  card: {
    backgroundColor: '#1B4332',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.1)',
  },
  thumbnail: { width: '100%', height: 180 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    height: 180,
  },
  info: { padding: 16 },
  title: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  scholar: { color: '#D4AF37', fontSize: 14, fontWeight: '500' },
  duration: { color: '#A0A0A0', fontSize: 12 },
});
