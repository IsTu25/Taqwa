import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { getArticles, seedArticles, Article } from '../../services/dbService';

export default function ArticlesScreen() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    setLoading(true);
    const data = await getArticles();
    setArticles(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleSeed = async () => {
    setLoading(true);
    const success = await seedArticles();
    if (success) {
      Alert.alert("Success", "Articles have been added to your Firestore database!");
      fetchArticles(); // Refresh the list
    } else {
      Alert.alert("Notice", "Database already has articles, or an error occurred.");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#D4AF37" />
        <Text style={styles.loadingText}>Fetching articles from server...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerRow}>
        <Text style={styles.pageTitle}>Islamic Articles</Text>
        {articles.length === 0 && (
          <TouchableOpacity style={styles.seedBtn} onPress={handleSeed}>
            <Text style={styles.seedBtnText}>Seed Database</Text>
          </TouchableOpacity>
        )}
      </View>

      {articles.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No articles found.</Text>
          <Text style={styles.emptyStateSub}>Click "Seed Database" to populate your Firestore.</Text>
        </View>
      ) : (
        articles.map((article) => (
          <View key={article.id || article.title} style={styles.card}>
            <Text style={styles.title}>{article.title}</Text>
            <View style={styles.metaRow}>
              <Text style={styles.author}>{article.author}</Text>
              <Text style={styles.date}>{article.date}</Text>
            </View>
            <Text style={styles.body}>{article.content}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F2F20' },
  content: { padding: 20 },
  centerContainer: { flex: 1, backgroundColor: '#0F2F20', alignItems: 'center', justifyContent: 'center' },
  loadingText: { color: '#D4AF37', marginTop: 16, fontWeight: '600' },
  
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  pageTitle: { color: '#A0A0A0', fontSize: 14, fontStyle: 'italic' },
  seedBtn: { backgroundColor: '#E74C3C', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  seedBtnText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },

  emptyState: { alignItems: 'center', marginTop: 50 },
  emptyStateText: { color: '#FFF', fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  emptyStateSub: { color: '#A0A0A0', fontSize: 14, textAlign: 'center' },

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
