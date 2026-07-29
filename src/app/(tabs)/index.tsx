import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Moon, Bell, Sun, Sunrise, Sunset } from 'lucide-react-native';
import { getCoords, fetchPrayerTimes, getActivePrayer, getNextPrayer, PrayerTimeEntry } from '../../services/prayerService';
import { scheduleAzanNotifications } from '../../services/notificationService';

const PRAYER_ICONS: Record<string, any> = {
  Fajr: Sunrise,
  Dhuhr: Sun,
  Asr: Sun,
  Maghrib: Sunset,
  Isha: Moon,
};

export default function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimeEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [notificationsOn, setNotificationsOn] = useState(false);

  // Time updater
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch location and prayer times
  useEffect(() => {
    (async () => {
      try {
        const { latitude, longitude } = await getCoords();
        const fetchedTimes = await fetchPrayerTimes(latitude, longitude);
        setPrayerTimes(fetchedTimes);
      } catch (err) {
        console.error('Error fetching prayer times:', err);
        setLocationError('Failed to load prayer times');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const formatTime = (date: Date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const activePrayerName = getActivePrayer(prayerTimes);
  const nextPrayer = getNextPrayer(prayerTimes);

  const toggleAzanReminders = async () => {
    if (notificationsOn) {
      setNotificationsOn(false);
      return;
    }
    if (prayerTimes.length === 0) return;
    await scheduleAzanNotifications(prayerTimes);
    setNotificationsOn(true);
  };

  return (
    <ImageBackground source={require('../../../assets/images/homepage.png')} style={styles.backgroundImage}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Moon color="#D4AF37" size={32} />
            <Text style={styles.appName}>Takwa</Text>
          </View>
          <TouchableOpacity onPress={toggleAzanReminders}>
            <Bell color={notificationsOn ? '#4ADE80' : '#D4AF37'} size={24} />
            <Text style={styles.bellText}>{notificationsOn ? 'Azan On' : 'Azan'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.clockContainer}>
          <Text style={styles.clockText}>{formatTime(currentTime)}</Text>
          {nextPrayer && (
            <Text style={styles.nextPrayerText}>
              {nextPrayer.name} in {Math.max(nextPrayer.minutesLeft, 0)} min
            </Text>
          )}
        </View>

        <ScrollView contentContainerStyle={styles.prayerCardsContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#D4AF37" />
          ) : locationError ? (
            <Text style={styles.errorText}>{locationError}</Text>
          ) : (
            <View style={styles.grid}>
              {prayerTimes.map((prayer) => {
                const Icon = PRAYER_ICONS[prayer.name] || Sun;
                const isActive = prayer.name === activePrayerName;

                return (
                  <View key={prayer.name} style={[styles.prayerCard, isActive && styles.activePrayerCard]}>
                    <Icon color={isActive ? '#D4AF37' : '#FFFFFF'} size={32} />
                    <Text style={[styles.prayerName, isActive && styles.activeText]}>{prayer.name}</Text>
                    <Text style={[styles.prayerTime, isActive && styles.activeText]}>{prayer.time}</Text>
                  </View>
                );
              })}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: { flex: 1, resizeMode: 'cover' },
  container: { flex: 1, backgroundColor: 'transparent' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, marginTop: 20 },
  logoContainer: { flexDirection: 'row', alignItems: 'center' },
  appName: { color: '#D4AF37', fontSize: 28, fontWeight: 'bold', marginLeft: 10 },
  bellText: { color: '#D4AF37', fontSize: 12, marginTop: 4, textAlign: 'center' },
  clockContainer: { alignItems: 'center', marginVertical: 30 },
  clockText: { color: '#FFFFFF', fontSize: 64, fontWeight: 'bold' },
  nextPrayerText: { color: '#D4AF37', fontSize: 16, marginTop: 8, fontWeight: '600' },
  prayerCardsContainer: { paddingHorizontal: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  prayerCard: {
    width: '48%', backgroundColor: '#1B4332', padding: 20, borderRadius: 16,
    alignItems: 'center', marginBottom: 15,
  },
  activePrayerCard: { backgroundColor: '#1B4332', borderColor: '#D4AF37', borderWidth: 2 },
  prayerName: { color: '#FFFFFF', fontSize: 18, fontWeight: '600', marginTop: 10 },
  prayerTime: { color: '#A0A0A0', fontSize: 14, marginTop: 5 },
  activeText: { color: '#D4AF37' },
  errorText: { color: '#FF4444', textAlign: 'center', marginTop: 20 },
});
