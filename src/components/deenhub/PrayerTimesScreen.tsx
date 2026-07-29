import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { getCoords, fetchPrayerTimes, getActivePrayer, PrayerTimeEntry } from '../../services/prayerService';

export default function PrayerTimesScreen() {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimeEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { latitude, longitude } = await getCoords();
        setPrayerTimes(await fetchPrayerTimes(latitude, longitude));
      } catch {
        setError('Could not load prayer times.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#D4AF37" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const active = getActivePrayer(prayerTimes);

  return (
    <View style={styles.container}>
      {prayerTimes.map((p) => (
        <View key={p.name} style={[styles.row, p.name === active && styles.activeRow]}>
          <Text style={[styles.name, p.name === active && styles.activeText]}>{p.name}</Text>
          <Text style={[styles.time, p.name === active && styles.activeText]}>{p.time}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  errorText: { color: '#FF4444' },
  row: {
    flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#1B4332',
    padding: 16, borderRadius: 12, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(212, 175, 55, 0.2)',
  },
  activeRow: { borderColor: '#D4AF37', borderWidth: 2 },
  name: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  time: { color: '#A0A0A0', fontSize: 16 },
  activeText: { color: '#D4AF37' },
});
