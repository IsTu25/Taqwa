import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Moon, Bell, Sun } from 'lucide-react-native';
import * as Location from 'expo-location';
import axios from 'axios';

interface PrayerTime {
  name: string;
  time: string;
  icon: any;
}

export default function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Time updater
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch location and prayer times
  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setLocationError('Permission to access location was denied');
          setLoading(false);
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        
        // Fetch from Aladhan API
        const response = await axios.get(
          `http://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`
        );
        
        const timings = response.data.data.timings;
        
        // Format to 12-hour string (basic implementation)
        const formatApiTime = (timeStr: string) => {
          const [h, m] = timeStr.split(':');
          const date = new Date();
          date.setHours(parseInt(h, 10));
          date.setMinutes(parseInt(m, 10));
          return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        };

        const fetchedTimes: PrayerTime[] = [
          { name: 'Fajr', time: formatApiTime(timings.Fajr), icon: Sun },
          { name: 'Dhuhr', time: formatApiTime(timings.Dhuhr), icon: Sun },
          { name: 'Asr', time: formatApiTime(timings.Asr), icon: Sun },
          { name: 'Maghrib', time: formatApiTime(timings.Maghrib), icon: Moon },
          { name: 'Isha', time: formatApiTime(timings.Isha), icon: Moon },
        ];
        
        setPrayerTimes(fetchedTimes);
      } catch (err) {
        console.error("Error fetching prayer times:", err);
        setLocationError('Failed to load prayer times');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Determine active prayer (simplistic approach based on current time)
  const getActivePrayer = () => {
    if (!prayerTimes.length) return null;
    // Real implementation would compare parsed Date objects.
    // We will just highlight Maghrib for demonstration purposes based on the mock.
    return 'Maghrib';
  };

  const activePrayerName = getActivePrayer();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Moon color="#D4AF37" size={32} />
          <Text style={styles.appName}>Takwa</Text>
        </View>
        <TouchableOpacity>
          <Bell color="#D4AF37" size={24} />
          <Text style={styles.bellText}>Azan</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.clockContainer}>
        <Text style={styles.clockText}>{formatTime(currentTime)}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.prayerCardsContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#D4AF37" />
        ) : locationError ? (
          <Text style={styles.errorText}>{locationError}</Text>
        ) : (
          <View style={styles.grid}>
            {prayerTimes.map((prayer) => {
              const Icon = prayer.icon;
              const isActive = prayer.name === activePrayerName;
              
              return (
                <View 
                  key={prayer.name} 
                  style={[
                    styles.prayerCard,
                    isActive && styles.activePrayerCard
                  ]}
                >
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F2F20',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appName: {
    color: '#D4AF37',
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  bellText: {
    color: '#D4AF37',
    fontSize: 12,
    marginTop: 4,
  },
  clockContainer: {
    alignItems: 'center',
    marginVertical: 40,
  },
  clockText: {
    color: '#FFFFFF',
    fontSize: 64,
    fontWeight: 'bold',
  },
  prayerCardsContainer: {
    paddingHorizontal: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  prayerCard: {
    width: '48%',
    backgroundColor: '#1B4332',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 15,
  },
  activePrayerCard: {
    backgroundColor: '#1B4332',
    borderColor: '#D4AF37',
    borderWidth: 2,
  },
  prayerName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
  },
  prayerTime: {
    color: '#A0A0A0',
    fontSize: 14,
    marginTop: 5,
  },
  activeText: {
    color: '#D4AF37',
  },
  errorText: {
    color: '#FF4444',
    textAlign: 'center',
    marginTop: 20,
  }
});
