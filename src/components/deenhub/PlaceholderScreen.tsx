import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Sparkles } from 'lucide-react-native';

export default function PlaceholderScreen({ name, description }: { name: string; description: string }) {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Sparkles color="#D4AF37" size={36} />
      </View>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>On the Roadmap</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  iconCircle: {
    width: 80, height: 80, borderRadius: 40, backgroundColor: '#1B4332',
    alignItems: 'center', justifyContent: 'center', marginBottom: 20,
    borderWidth: 1, borderColor: 'rgba(212, 175, 55, 0.4)',
  },
  title: { color: '#D4AF37', fontSize: 22, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
  description: { color: '#A0A0A0', fontSize: 14, textAlign: 'center', lineHeight: 21, marginBottom: 24 },
  badge: { backgroundColor: 'rgba(212, 175, 55, 0.15)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  badgeText: { color: '#D4AF37', fontSize: 12, fontWeight: '600' },
});
