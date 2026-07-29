import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { CheckSquare, Square } from 'lucide-react-native';

const RULINGS = [
  { id: '1', title: 'Intention (Niyyah)', content: 'The intention to fast must be made before Fajr for obligatory fasts. It is a state of mind and does not need to be uttered aloud.' },
  { id: '2', title: 'Things that break the fast', content: 'Eating, drinking, or engaging in intimate relations intentionally between Fajr and Maghrib. Induced vomiting also breaks the fast.' },
  { id: '3', title: 'Exemptions', content: 'The sick, travelers, pregnant or nursing women, and the elderly who cannot bear fasting are exempt but must make it up later or feed the poor (Fidyah).' },
];

export default function RozaScreen() {
  const [fastingChecklist, setFastingChecklist] = useState({
    suhoor: false,
    fajr: false,
    dhuhr: false,
    asr: false,
    iftar: false,
    maghrib: false,
    isha: false,
    taraweeh: false,
  });

  const toggleCheck = (key: keyof typeof fastingChecklist) => {
    setFastingChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const renderCheckItem = (key: keyof typeof fastingChecklist, label: string) => {
    const isChecked = fastingChecklist[key];
    return (
      <TouchableOpacity style={styles.checkItem} onPress={() => toggleCheck(key)} activeOpacity={0.7}>
        {isChecked ? <CheckSquare color="#D4AF37" size={24} /> : <Square color="#555" size={24} />}
        <Text style={[styles.checkLabel, isChecked && styles.checkLabelDone]}>{label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.sectionTitle}>Daily Ramadan Tracker</Text>
      <View style={styles.trackerCard}>
        {renderCheckItem('suhoor', 'Woke up for Suhoor')}
        {renderCheckItem('fajr', 'Fajr Prayer')}
        {renderCheckItem('dhuhr', 'Dhuhr Prayer')}
        {renderCheckItem('asr', 'Asr Prayer')}
        {renderCheckItem('iftar', 'Broke fast on time (Iftar)')}
        {renderCheckItem('maghrib', 'Maghrib Prayer')}
        {renderCheckItem('isha', 'Isha Prayer')}
        {renderCheckItem('taraweeh', 'Taraweeh Prayer')}
      </View>

      <Text style={[styles.sectionTitle, { marginTop: 30 }]}>Fasting Rulings (Fiqh)</Text>
      {RULINGS.map((rule) => (
        <View key={rule.id} style={styles.ruleCard}>
          <Text style={styles.ruleTitle}>{rule.title}</Text>
          <Text style={styles.ruleContent}>{rule.content}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F2F20' },
  content: { padding: 20 },
  sectionTitle: { color: '#D4AF37', fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  trackerCard: {
    backgroundColor: '#1B4332',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
  },
  checkItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  checkLabel: { color: '#FFF', fontSize: 16, marginLeft: 12 },
  checkLabelDone: { color: '#A0A0A0', textDecorationLine: 'line-through' },
  ruleCard: {
    backgroundColor: '#1B4332',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  ruleTitle: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  ruleContent: { color: '#A0A0A0', fontSize: 14, lineHeight: 22 },
});
