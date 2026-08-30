import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Slot } from 'expo-router';
import FloatingTabBar from '@/components/FloatingTabBar';
import { COLORS } from '@/constants/Colors';

const TABS = [
  {
    name: 'discover',
    route: '/(tabs)/(discover)' as const,
    icon: 'local-fire-department' as const,
    label: 'Discover',
  },
  {
    name: 'nearby',
    route: '/(tabs)/(nearby)' as const,
    icon: 'location-on' as const,
    label: 'Nearby',
  },
  {
    name: 'matches',
    route: '/(tabs)/(matches)' as const,
    icon: 'favorite' as const,
    label: 'Matches',
  },
  {
    name: 'profile',
    route: '/(tabs)/(profile)' as const,
    icon: 'person' as const,
    label: 'Profile',
  },
];

export default function TabLayout() {
  return (
    <View style={styles.container}>
      <Slot />
      <FloatingTabBar
        tabs={TABS}
        containerWidth={340}
        borderRadius={35}
        bottomMargin={20}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
