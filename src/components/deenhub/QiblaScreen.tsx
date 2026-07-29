import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { Navigation } from 'lucide-react-native';

const KAABA = { latitude: 21.4225, longitude: 39.8262 };

const toRad = (deg: number) => (deg * Math.PI) / 180;
const toDeg = (rad: number) => (rad * 180) / Math.PI;

/** Great-circle bearing from point A to point B, in degrees from true North. */
const calculateBearing = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const dLon = toRad(lon2 - lon1);
  const y = Math.sin(dLon) * Math.cos(toRad(lat2));
  const x =
    Math.cos(toRad(lat1)) * Math.sin(toRad(lat2)) -
    Math.sin(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.cos(dLon);
  const bearing = toDeg(Math.atan2(y, x));
  return (bearing + 360) % 360;
};

export default function QiblaScreen() {
  const [qiblaBearing, setQiblaBearing] = useState<number | null>(null);
  const [heading, setHeading] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const subscription = useRef<Location.LocationSubscription | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Location permission is required to find the Qiblah direction.');
        return;
      }

      try {
        const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
        const bearing = calculateBearing(
          loc.coords.latitude,
          loc.coords.longitude,
          KAABA.latitude,
          KAABA.longitude
        );
        setQiblaBearing(bearing);
      } catch {
        setError('Could not determine your location.');
      }

      subscription.current = await Location.watchHeadingAsync((h) => {
        setHeading(h.trueHeading >= 0 ? h.trueHeading : h.magHeading);
      });
    })();

    return () => {
      subscription.current?.remove();
    };
  }, []);

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (qiblaBearing === null) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#D4AF37" />
      </View>
    );
  }

  // Rotate the arrow relative to device heading so it always points to Kaaba
  const arrowRotation = (qiblaBearing - heading + 360) % 360;

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Point your device North, then align the arrow</Text>
      <View style={styles.compassCircle}>
        <View style={[styles.arrowWrapper, { transform: [{ rotate: `${arrowRotation}deg` }] }]}>
          <Navigation color="#D4AF37" size={72} fill="#D4AF37" />
        </View>
        <Text style={styles.nText}>N</Text>
      </View>
      <Text style={styles.bearingText}>Qiblah is {Math.round(qiblaBearing)}° from true North</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  subtitle: { color: '#A0A0A0', fontSize: 14, textAlign: 'center', marginBottom: 30 },
  compassCircle: {
    width: 260, height: 260, borderRadius: 130, backgroundColor: '#1B4332',
    borderWidth: 2, borderColor: '#D4AF37', alignItems: 'center', justifyContent: 'center',
  },
  arrowWrapper: { alignItems: 'center', justifyContent: 'center' },
  nText: { position: 'absolute', top: 10, color: '#FFFFFF', fontWeight: 'bold' },
  bearingText: { color: '#FFFFFF', fontSize: 16, marginTop: 24 },
  errorText: { color: '#FF4444', textAlign: 'center' },
});
