import { Tabs } from 'expo-router';
import { Home, Grid, Heart } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1B4332',
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarActiveTintColor: '#D4AF37',
        tabBarInactiveTintColor: '#A0A0A0',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="deen-hub"
        options={{
          title: 'Deen Hub',
          tabBarIcon: ({ color }) => <Grid color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="taqwa"
        options={{
          title: 'Taqwa',
          tabBarIcon: ({ color }) => <Heart color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}
