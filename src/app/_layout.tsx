import { Stack, useRouter, useSegments } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider, useDispatch, useSelector } from 'react-redux';
import { store, RootState } from '../store/store';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { subscribeToAuthChanges } from '../services/firebase';
import { setUser, clearUser } from '../store/authSlice';

function AuthGate({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const segments = useSegments();
  const { user, initializing } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((firebaseUser) => {
      if (firebaseUser) {
        dispatch(setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
        }));
      } else {
        dispatch(clearUser());
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (initializing) return;
    const inAuthGroup = segments[0] === '(auth)';

    if (!user && !inAuthGroup) {
      router.replace('/(auth)/login');
    } else if (user && inAuthGroup) {
      router.replace('/(tabs)');
    }
  }, [user, initializing, segments]);

  if (initializing) {
    return (
      <View style={{ flex: 1, backgroundColor: '#0F2F20', alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#D4AF37" />
      </View>
    );
  }

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <AuthGate>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" />
          </Stack>
        </AuthGate>
        <StatusBar style="light" />
      </PaperProvider>
    </ReduxProvider>
  );
}
