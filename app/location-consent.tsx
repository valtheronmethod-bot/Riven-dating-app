import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '@/constants/Colors';
import { AnimatedPressable } from '@/components/AnimatedPressable';

const LOCATION_CONSENT_KEY = '@riven_location_consent';

export default function LocationConsentScreen() {
  const router = useRouter();

  const handleAllow = async () => {
    console.log('[LocationConsent] User allowed approximate location');
    await AsyncStorage.setItem(LOCATION_CONSENT_KEY, 'true');
    router.back();
  };

  const handleNotNow = async () => {
    console.log('[LocationConsent] User declined location consent');
    await AsyncStorage.setItem(LOCATION_CONSENT_KEY, 'false');
    router.back();
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.icon}>🛡️</Text>
        <Text style={styles.title}>Privacy-First Location</Text>
        <Text style={styles.body}>
          Your exact location is never shown on Nearby. We use your approximate area to show people around you. Exact location can only be shared by you in a chat, for a time you choose.
        </Text>

        <View style={styles.featureList}>
          {[
            'Approximate area only on map',
            'Minimum 5 people per cluster',
            'No individual pins ever',
            'Chat sharing is time-limited & revocable',
          ].map((feature) => (
            <View key={feature} style={styles.featureRow}>
              <Text style={styles.featureCheck}>✓</Text>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        <AnimatedPressable onPress={handleAllow} style={styles.allowBtn}>
          <Text style={styles.allowBtnText}>Allow Approximate Location</Text>
        </AnimatedPressable>

        <TouchableOpacity onPress={handleNotNow} style={styles.notNowBtn}>
          <Text style={styles.notNowText}>Not Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 32,
    paddingTop: 80,
    alignItems: 'center',
  },
  icon: {
    fontSize: 72,
    marginBottom: 20,
  },
  title: {
    color: COLORS.text,
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 14,
  },
  body: {
    color: COLORS.textSecondary,
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 28,
  },
  featureList: {
    width: '100%',
    gap: 12,
    marginBottom: 36,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureCheck: {
    color: COLORS.success,
    fontSize: 18,
    fontWeight: '700',
  },
  featureText: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: '500',
  },
  allowBtn: {
    width: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  allowBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
  notNowBtn: {
    paddingVertical: 12,
  },
  notNowText: {
    color: COLORS.textSecondary,
    fontSize: 15,
    fontWeight: '500',
  },
});
