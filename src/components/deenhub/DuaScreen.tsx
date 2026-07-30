import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';

interface HisnDua {
  ID: number;
  ARABIC_TEXT: string;
  TRANSLATED_TEXT: string;
}

interface HisnCategory {
  ID: number;
  TITLE: string;
  TEXT: HisnDua[];
}

export default function DuaScreen() {
  const [categories, setCategories] = useState<HisnCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<HisnCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDuas = async () => {
      try {
        const response = await axios.get(`${process.env.EXPO_PUBLIC_DUA_API_URL}/husn_en.json`);
        if (response.data && response.data.English) {
          setCategories(response.data.English);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load Duas. Please check your connection.');
      } finally {
        setLoading(false);
      }
    };
    fetchDuas();
  }, []);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#D4AF37" />
        <Text style={styles.loadingText}>Loading Hisnul Muslim Library...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (selectedCategory) {
    return (
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => setSelectedCategory(null)} style={styles.backBtn}>
            <Text style={styles.backBtnText}>← Back to Categories</Text>
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.categoryTitle}>{selectedCategory.TITLE}</Text>
          {selectedCategory.TEXT.map((dua, i) => (
            <View key={dua.ID || i} style={styles.card}>
              <Text style={styles.arabic}>{dua.ARABIC_TEXT}</Text>
              <Text style={styles.meaning}>{dua.TRANSLATED_TEXT}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.intro}>
        Explore authentic supplications from the renowned book Hisnul Muslim (Fortress of the Muslim).
      </Text>
      {categories.map((cat) => (
        <TouchableOpacity
          key={cat.ID}
          style={styles.categoryCard}
          activeOpacity={0.7}
          onPress={() => setSelectedCategory(cat)}
        >
          <Text style={styles.categoryName}>{cat.TITLE}</Text>
          <Text style={styles.categoryCount}>{cat.TEXT?.length || 0} Duas</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F2F20', padding: 20 },
  centerContainer: { flex: 1, backgroundColor: '#0F2F20', alignItems: 'center', justifyContent: 'center', padding: 20 },
  content: { paddingBottom: 40 },
  intro: { color: '#A0A0A0', fontSize: 14, lineHeight: 22, fontStyle: 'italic', marginBottom: 20 },
  loadingText: { color: '#D4AF37', marginTop: 16, fontWeight: '600' },
  errorText: { color: '#E74C3C', textAlign: 'center', fontSize: 16 },
  
  categoryCard: {
    backgroundColor: '#1B4332',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.15)',
  },
  categoryName: { color: '#FFF', fontSize: 16, fontWeight: 'bold', flex: 1, marginRight: 10 },
  categoryCount: { color: '#D4AF37', fontSize: 13, fontWeight: '600' },

  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  backBtn: { backgroundColor: 'rgba(212, 175, 55, 0.1)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
  backBtnText: { color: '#D4AF37', fontWeight: '600', fontSize: 14 },
  
  categoryTitle: { color: '#D4AF37', fontSize: 20, fontWeight: 'bold', marginBottom: 20, lineHeight: 28 },
  
  card: {
    backgroundColor: '#1B4332', borderRadius: 14, padding: 20, marginBottom: 16,
    borderWidth: 1, borderColor: 'rgba(212, 175, 55, 0.3)',
  },
  arabic: { color: '#FFFFFF', fontSize: 22, textAlign: 'right', marginBottom: 16, lineHeight: 36 },
  meaning: { color: '#E5E7EB', fontSize: 15, lineHeight: 24 },
});
