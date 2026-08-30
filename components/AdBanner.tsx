import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { COLORS } from '@/constants/Colors';

export function AdBanner() {
  const router = useRouter();

  const handlePress = () => {
    console.log('[AdBanner] User tapped upgrade ad banner');
    router.push('/premium');
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.85} style={styles.container}>
      <LinearGradient
        colors={['#8B0020', '#C8102E', '#F5A623']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <Text style={styles.adLabel}>Advertisement</Text>
        <Text style={styles.adText}>Upgrade to Riven Premium — Remove all ads forever →</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 10,
    overflow: 'hidden',
  },
  gradient: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  adLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  adText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    flex: 1,
  },
});
