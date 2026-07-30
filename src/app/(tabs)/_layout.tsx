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
          height: 85,
          paddingBottom: 20,
          paddingTop: 12,
        },
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: '500',
        },
        tabBarActiveTintColor: '#D4AF37',
        tabBarInactiveTintColor: '#A0A0A0',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home color={color} size={28} />,
        }}
      />
      <Tabs.Screen
        name="deen-hub/index"
        options={{
          title: 'Deen Hub',
          tabBarIcon: ({ color }) => <Grid color={color} size={28} />,
        }}
      />
      <Tabs.Screen
        name="deen-hub/[slug]"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="taqwa"
        options={{
          title: 'Taqwa',
          tabBarIcon: ({ color }) => <Heart color={color} size={28} />,
        }}
      />
    </Tabs>
  );
}
