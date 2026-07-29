import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';

export default function DetailHeader({ title }: { title: string }) {
  const router = useRouter();
  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <ChevronLeft color="#D4AF37" size={26} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingTop: 16, paddingBottom: 8 },
  backBtn: { padding: 8 },
  title: { color: '#D4AF37', fontSize: 22, fontWeight: 'bold', marginLeft: 4 },
});
