import { Platform } from 'react-native';
import { PrayerTimeEntry } from './prayerService';
import Constants from 'expo-constants';

const isExpoGo = Constants.appOwnership === 'expo';

let Notifications: any = null;

const getNotifications = () => {
  if (isExpoGo) return null;
  if (!Notifications) {
    try {
      Notifications = require('expo-notifications');
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
          shouldShowBanner: true,
          shouldShowList: true,
        }),
      });
    } catch (e) {
      console.log('Notifications are not supported in this environment');
      return null;
    }
  }
  return Notifications;
};

export const requestNotificationPermission = async (): Promise<boolean> => {
  const notif = getNotifications();
  if (!notif) return false;

  const { status: existing } = await notif.getPermissionsAsync();
  let final = existing;
  if (existing !== 'granted') {
    const { status } = await notif.requestPermissionsAsync();
    final = status;
  }
  if (Platform.OS === 'android') {
    await notif.setNotificationChannelAsync('azan', {
      name: 'Azan Reminders',
      importance: notif.AndroidImportance.HIGH,
      sound: 'default',
    });
  }
  return final === 'granted';
};

/**
 * Cancels any previously scheduled Azan notifications and schedules new
 * ones for today's remaining prayer times. Call this once per day.
 */
export const scheduleAzanNotifications = async (prayerTimes: PrayerTimeEntry[]) => {
  const notif = getNotifications();
  if (!notif) {
    console.log("Cannot schedule notifications in Expo Go");
    return;
  }

  const granted = await requestNotificationPermission();
  if (!granted) return;

  await notif.cancelAllScheduledNotificationsAsync();

  const now = new Date();
  for (const prayer of prayerTimes) {
    if (prayer.date.getTime() <= now.getTime()) continue;
    await notif.scheduleNotificationAsync({
      content: {
        title: `${prayer.name} — Time for Prayer`,
        body: `It's time for ${prayer.name}. May Allah accept your Salah.`,
        sound: 'default',
      },
      trigger: {
        type: notif.SchedulableTriggerInputTypes.DATE,
        date: prayer.date,
      },
    });
  }
};
