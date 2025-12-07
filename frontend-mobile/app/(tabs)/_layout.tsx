import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'dark'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}
    >
      {/* Main visible tabs */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          title: 'Login',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="signup"
        options={{
          title: 'Signup',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person.badge.plus" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="coffee"
        options={{
          title: 'Coffee',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="cup.and.saucer.fill" color={color} />
          ),
        }}
      />

      {/* Coffee flow screens: hidden from tab bar + no bottom bar */}
      <Tabs.Screen
        name="coffee-detail"
        options={{
          tabBarButton: () => null,          // hide from bar
          tabBarStyle: { display: 'none' },  // hide bar when active
        }}
      />
      <Tabs.Screen
        name="coffee-cart"
        options={{
          tabBarButton: () => null,
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="coffee-delivery"
        options={{
          tabBarButton: () => null,
          tabBarStyle: { display: 'none' },
        }}
      />
    </Tabs>
  );
}
