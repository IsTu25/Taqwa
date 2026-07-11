import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '../store/store';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { loginAnonymously } from '../services/firebase';

export default function RootLayout() {
  useEffect(() => {
    // Authenticate user anonymously on app launch
    // This allows them to start logging deeds immediately
    loginAnonymously();
  }, []);

  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="light" />
      </PaperProvider>
    </ReduxProvider>
  );
}
