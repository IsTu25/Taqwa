import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { DEEN_HUB_FEATURES } from '../../../config/deenHubFeatures';

export default function DeenHub() {
  const router = useRouter();

  return (
    <ImageBackground source={require('../../../../assets/images/2nd page.png')} style={styles.backgroundImage}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Deen Hub</Text>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.grid}>
            {DEEN_HUB_FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <TouchableOpacity
                  key={feature.slug}
                  style={styles.card}
                  onPress={() => router.push(`/(tabs)/deen-hub/${feature.slug}` as any)}
                >
                  <Icon color="#D4AF37" size={32} />
                  <Text style={styles.cardText} numberOfLines={2}>
                    {feature.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: { flex: 1, resizeMode: 'cover' },
  container: { flex: 1, backgroundColor: 'transparent' },
  header: {
    color: '#D4AF37', fontSize: 26, fontWeight: 'bold',
    paddingHorizontal: 20, paddingTop: 20,
  },
  scrollContent: { padding: 15, marginTop: 10 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: {
    width: '23%',
    aspectRatio: 0.8,
    backgroundColor: '#1B4332',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
  },
  cardText: { color: '#D4AF37', fontSize: 12, marginTop: 8, textAlign: 'center' },
});
