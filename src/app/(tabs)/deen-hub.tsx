import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookOpen, Clock, Book, Heart, MessageCircle, HelpCircle, Video, List, DollarSign, Calendar, Navigation, PlusSquare, BookMarked, MessageSquare } from 'lucide-react-native';

const FEATURES = [
  { name: 'Tafseer', icon: BookOpen },
  { name: 'Prayer Times', icon: Clock },
  { name: 'Quran', icon: Book },
  { name: 'Dua', icon: Heart },
  { name: 'Books', icon: BookMarked },
  { name: 'Hadith', icon: BookOpen },
  { name: 'Masail', icon: MessageCircle },
  { name: 'Quiz', icon: HelpCircle },
  { name: 'Bayan', icon: Video },
  { name: 'Quran Learning', icon: Book },
  { name: 'Articles', icon: List },
  { name: 'Tasbih', icon: PlusSquare },
  { name: 'Namaz Guide', icon: Navigation },
  { name: 'Hajj & Umrah', icon: Navigation },
  { name: 'Roza', icon: Calendar },
  { name: 'Zakat', icon: DollarSign },
];

export default function DeenHub() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.grid}>
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <TouchableOpacity key={index} style={styles.card}>
                <Icon color="#D4AF37" size={32} />
                <Text style={styles.cardText} numberOfLines={2}>
                  {feature.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A192F', // Dark navy background
  },
  scrollContent: {
    padding: 15,
    marginTop: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '23%', // 4 items per row approximately
    aspectRatio: 0.8,
    backgroundColor: '#1B4332',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
  },
  cardText: {
    color: '#D4AF37',
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
  },
});
