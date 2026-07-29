import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { CheckSquare, Square } from 'lucide-react-native';

const UMRAH_STEPS = [
  { id: '1', title: 'Ihram', desc: 'Perform Ghusl, wear the Ihram garments, and make the intention (Niyyah) for Umrah at the Miqat. Start reciting Talbiyah.' },
  { id: '2', title: 'Tawaf', desc: 'Circle the Kaaba seven times counter-clockwise, starting from the Black Stone. Pray 2 Rakats at Maqam Ibrahim.' },
  { id: '3', title: 'Sa\'i', desc: 'Walk seven times between the hills of Safa and Marwah, starting at Safa and ending at Marwah.' },
  { id: '4', title: 'Halq/Taqsir', desc: 'Men shave their heads (Halq) or trim their hair (Taqsir). Women trim a fingertip\'s length of their hair. Ihram ends.' },
];

export default function HajjUmrahScreen() {
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  const toggleStep = (id: string) => {
    setCompletedSteps((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Umrah Step-by-Step</Text>
      <Text style={styles.subtitle}>Track your Umrah rites and progress.</Text>
      
      {UMRAH_STEPS.map((step, index) => {
        const isDone = completedSteps[step.id];
        return (
          <TouchableOpacity 
            key={step.id} 
            style={[styles.stepCard, isDone && styles.stepCardDone]}
            onPress={() => toggleStep(step.id)}
            activeOpacity={0.8}
          >
            <View style={styles.stepHeader}>
              <View style={styles.numberBadge}>
                <Text style={styles.numberText}>{index + 1}</Text>
              </View>
              <Text style={[styles.stepTitle, isDone && styles.textDone]}>{step.title}</Text>
              <View style={{ flex: 1 }} />
              {isDone ? <CheckSquare color="#D4AF37" size={24} /> : <Square color="#555" size={24} />}
            </View>
            <Text style={[styles.stepDesc, isDone && styles.textDone]}>{step.desc}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F2F20' },
  content: { padding: 20 },
  title: { color: '#D4AF37', fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  subtitle: { color: '#A0A0A0', fontSize: 14, marginBottom: 24 },
  stepCard: {
    backgroundColor: '#1B4332',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
  },
  stepCardDone: { opacity: 0.6, borderColor: 'transparent' },
  stepHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  numberBadge: { width: 28, height: 28, borderRadius: 14, backgroundColor: 'rgba(212, 175, 55, 0.2)', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  numberText: { color: '#D4AF37', fontSize: 14, fontWeight: 'bold' },
  stepTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  stepDesc: { color: '#FFF', fontSize: 14, lineHeight: 22, paddingLeft: 40 },
  textDone: { color: '#A0A0A0', textDecorationLine: 'line-through' },
});
