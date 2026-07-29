import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RotateCcw } from 'lucide-react-native';

const DHIKR_OPTIONS = ['SubhanAllah', 'Alhamdulillah', 'Allahu Akbar', 'La ilaha illallah'];

export default function TasbihScreen() {
  const [dhikrIndex, setDhikrIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [target] = useState(33);

  const increment = () => setCount((c) => c + 1);
  const reset = () => setCount(0);
  const nextDhikr = () => {
    setDhikrIndex((i) => (i + 1) % DHIKR_OPTIONS.length);
    setCount(0);
  };

  const completedRounds = Math.floor(count / target);
  const inRound = count % target;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={nextDhikr}>
        <Text style={styles.dhikrText}>{DHIKR_OPTIONS[dhikrIndex]}</Text>
        <Text style={styles.hint}>Tap to change Dhikr</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.counterCircle} onPress={increment} activeOpacity={0.7}>
        <Text style={styles.countText}>{inRound}</Text>
        <Text style={styles.targetText}>/ {target}</Text>
      </TouchableOpacity>

      <Text style={styles.totalText}>Total: {count} · Rounds completed: {completedRounds}</Text>

      <TouchableOpacity style={styles.resetBtn} onPress={reset}>
        <RotateCcw color="#0F2F20" size={18} />
        <Text style={styles.resetText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  dhikrText: { color: '#D4AF37', fontSize: 26, fontWeight: 'bold', textAlign: 'center' },
  hint: { color: '#A0A0A0', fontSize: 12, textAlign: 'center', marginTop: 4, marginBottom: 40 },
  counterCircle: {
    width: 220, height: 220, borderRadius: 110, backgroundColor: '#1B4332',
    borderWidth: 3, borderColor: '#D4AF37', alignItems: 'center', justifyContent: 'center',
  },
  countText: { color: '#FFFFFF', fontSize: 64, fontWeight: 'bold' },
  targetText: { color: '#A0A0A0', fontSize: 18 },
  totalText: { color: '#FFFFFF', fontSize: 16, marginTop: 30 },
  resetBtn: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#D4AF37',
    paddingHorizontal: 20, paddingVertical: 12, borderRadius: 12, marginTop: 20,
  },
  resetText: { color: '#0F2F20', fontWeight: 'bold', marginLeft: 8 },
});
