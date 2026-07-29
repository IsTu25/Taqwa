import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';

interface Hadith {
  hadithnumber: number;
  arabicnumber: number;
  text: string;
  reference: {
    book: number;
    hadith: number;
  };
}

interface Section {
  id: string;
  name: string;
}

export default function HadithScreen() {
  const [sections, setSections] = useState<Section[]>([]);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [hadiths, setHadiths] = useState<Hadith[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingHadiths, setLoadingHadiths] = useState(false);
  const [error, setError] = useState('');

  // Fetch Sahih al Bukhari sections on mount
  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.get('https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/info.json');
        if (response.data && response.data.bukhari && response.data.bukhari.metadata.sections) {
          const sectionsObj = response.data.bukhari.metadata.sections;
          const sectionsList: Section[] = Object.keys(sectionsObj)
            .filter(key => key !== "0" && sectionsObj[key].trim() !== "") // filter out empty
            .map(key => ({
              id: key,
              name: sectionsObj[key]
            }));
          setSections(sectionsList);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load chapters. Please check your connection.');
      } finally {
        setLoading(false);
      }
    };
    fetchSections();
  }, []);

  const loadHadiths = async (section: Section) => {
    setSelectedSection(section);
    setLoadingHadiths(true);
    setHadiths([]);
    setError('');
    
    try {
      const response = await axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/eng-bukhari/sections/${section.id}.json`);
      if (response.data && response.data.hadiths) {
        setHadiths(response.data.hadiths);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to load Hadiths.');
    } finally {
      setLoadingHadiths(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#D4AF37" />
        <Text style={styles.loadingText}>Loading Sahih al-Bukhari Library...</Text>
      </View>
    );
  }

  if (selectedSection) {
    return (
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => setSelectedSection(null)} style={styles.backBtn}>
            <Text style={styles.backBtnText}>← Back to Chapters</Text>
          </TouchableOpacity>
        </View>

        {loadingHadiths ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#D4AF37" />
            <Text style={styles.loadingText}>Fetching Hadiths...</Text>
          </View>
        ) : error ? (
          <View style={styles.centerContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.sectionTitle}>{selectedSection.name}</Text>
            <Text style={styles.sourceText}>Source: Sahih al-Bukhari</Text>
            
            {hadiths.map((h, i) => (
              <View key={h.hadithnumber || i} style={styles.card}>
                <View style={styles.hadithBadge}>
                  <Text style={styles.hadithBadgeText}>Hadith {h.hadithnumber}</Text>
                </View>
                <Text style={styles.text}>"{h.text}"</Text>
                <Text style={styles.narrator}>Narrated by various</Text>
                {h.reference && (
                  <Text style={styles.reference}>
                    Book {h.reference.book}, Hadith {h.reference.hadith}
                  </Text>
                )}
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.intro}>
        Read thousands of authentic narrations from Sahih al-Bukhari. Select a chapter below to begin.
      </Text>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        sections.map((section) => (
          <TouchableOpacity
            key={section.id}
            style={styles.chapterCard}
            activeOpacity={0.7}
            onPress={() => loadHadiths(section)}
          >
            <View style={styles.chapterNumberBox}>
              <Text style={styles.chapterNumber}>{section.id}</Text>
            </View>
            <Text style={styles.chapterName}>{section.name}</Text>
          </TouchableOpacity>
        ))
      )}
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
  chapterName: { color: '#FFF', fontSize: 16, fontWeight: 'bold', flex: 1 },

  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  backBtn: { backgroundColor: 'rgba(212, 175, 55, 0.1)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
  backBtnText: { color: '#D4AF37', fontWeight: '600', fontSize: 14 },
  
  sectionTitle: { color: '#D4AF37', fontSize: 20, fontWeight: 'bold', marginBottom: 6, lineHeight: 28 },
  sourceText: { color: '#A0A0A0', fontSize: 12, fontStyle: 'italic', marginBottom: 20 },

  card: {
    backgroundColor: '#1B4332', borderRadius: 14, padding: 20, marginBottom: 16,
    borderWidth: 1, borderColor: 'rgba(212, 175, 55, 0.3)',
  },
  hadithBadge: { alignSelf: 'flex-start', backgroundColor: 'rgba(212, 175, 55, 0.15)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, marginBottom: 16 },
  hadithBadgeText: { color: '#D4AF37', fontSize: 13, fontWeight: 'bold' },
  text: { color: '#FFFFFF', fontSize: 15, lineHeight: 24, fontStyle: 'italic', marginBottom: 16 },
  narrator: { color: '#D4AF37', fontSize: 13, fontWeight: '600', marginBottom: 4 },
  reference: { color: '#A0A0A0', fontSize: 12, marginTop: 2 },
});
