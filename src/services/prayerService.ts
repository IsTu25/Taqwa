import axios from 'axios';
import * as Location from 'expo-location';

export interface PrayerTimeEntry {
  name: string;
  time: string; // display string, e.g. "05:12 AM"
  date: Date;   // real Date object for comparisons
}

const PRAYER_ORDER = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

const to24hDate = (timeStr: string, base: Date): Date => {
  // Aladhan returns "HH:mm" (24h), sometimes with " (TZ)" suffix
  const clean = timeStr.split(' ')[0];
  const [h, m] = clean.split(':').map((n) => parseInt(n, 10));
  const d = new Date(base);
  d.setHours(h, m, 0, 0);
  return d;
};

const formatDisplay = (d: Date) =>
  d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

export const getCoords = async (): Promise<{ latitude: number; longitude: number }> => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    // Fallback to Mecca if permission denied
    return { latitude: 21.4225, longitude: 39.8262 };
  }
  try {
    let location = await Location.getLastKnownPositionAsync({});
    if (!location) {
      location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        timeout: 5000,
      } as any);
    }
    return { latitude: location.coords.latitude, longitude: location.coords.longitude };
  } catch {
    return { latitude: 21.4225, longitude: 39.8262 };
  }
};

export const fetchPrayerTimes = async (
  latitude: number,
  longitude: number
): Promise<PrayerTimeEntry[]> => {
  const response = await axios.get(
    `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`
  );
  const timings = response.data.data.timings;
  const now = new Date();

  return PRAYER_ORDER.map((name) => {
    const date = to24hDate(timings[name], now);
    return { name, time: formatDisplay(date), date };
  });
};

/**
 * Returns the name of the currently "active" prayer window (the most recent
 * prayer that has passed but the next one hasn't started yet), or null if
 * before Fajr / data not loaded. Handles the day-wrap for Isha -> Fajr.
 */
export const getActivePrayer = (prayerTimes: PrayerTimeEntry[]): string | null => {
  if (!prayerTimes.length) return null;
  const now = new Date();

  const sorted = [...prayerTimes].sort((a, b) => a.date.getTime() - b.date.getTime());
  let active: string | null = null;

  for (const p of sorted) {
    if (now.getTime() >= p.date.getTime()) {
      active = p.name;
    }
  }
  // If it's before Fajr today, the active window is still "Isha" (from yesterday)
  if (active === null) return 'Isha';
  return active;
};

/** Minutes remaining until the next prayer. Returns null if unknown. */
export const getNextPrayer = (
  prayerTimes: PrayerTimeEntry[]
): { name: string; minutesLeft: number } | null => {
  if (!prayerTimes.length) return null;
  const now = new Date();
  const sorted = [...prayerTimes].sort((a, b) => a.date.getTime() - b.date.getTime());

  for (const p of sorted) {
    if (p.date.getTime() > now.getTime()) {
      const minutesLeft = Math.round((p.date.getTime() - now.getTime()) / 60000);
      return { name: p.name, minutesLeft };
    }
  }
  // All prayers passed today -> next is tomorrow's Fajr
  const fajr = sorted[0];
  const tomorrowFajr = new Date(fajr.date);
  tomorrowFajr.setDate(tomorrowFajr.getDate() + 1);
  const minutesLeft = Math.round((tomorrowFajr.getTime() - now.getTime()) / 60000);
  return { name: 'Fajr', minutesLeft };
};
