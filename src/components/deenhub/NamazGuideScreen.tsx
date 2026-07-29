import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NAMAZ_GUIDE } from '../../config/islamicContent';

export default function NamazGuideScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {NAMAZ_GUIDE.map((section, i) => (
        <View key={i} style={styles.card}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          {section.steps.map((step, j) => (
            <View key={j} style={styles.stepRow}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{j + 1}</Text>
              </View>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 60 },
  card: {
    backgroundColor: '#1B4332', borderRadius: 14, padding: 18, marginBottom: 18,
    borderWidth: 1, borderColor: 'rgba(212, 175, 55, 0.3)',
  },
  sectionTitle: { color: '#D4AF37', fontSize: 18, fontWeight: 'bold', marginBottom: 14 },
  stepRow: { flexDirection: 'row', marginBottom: 12, alignItems: 'flex-start' },
  stepNumber: {
    width: 24, height: 24, borderRadius: 12, backgroundColor: '#D4AF37',
    alignItems: 'center', justifyContent: 'center', marginRight: 10, marginTop: 2,
  },
  stepNumberText: { color: '#0F2F20', fontWeight: 'bold', fontSize: 12 },
  stepText: { color: '#E5E7EB', fontSize: 14, lineHeight: 20, flex: 1 },
});
