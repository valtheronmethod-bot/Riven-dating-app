import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '@/constants/Colors';
import { AnimatedPressable } from '@/components/AnimatedPressable';
import { useSubscription } from '@/contexts/SubscriptionContext';

const FEATURES = [
  { icon: '✦', title: 'Zero Advertisements', description: 'Completely ad-free experience, forever' },
  { icon: '♥', title: 'Unlimited Likes & Super Likes', description: 'Like as many people as you want' },
  { icon: '👁', title: 'See Who Liked You', description: 'View everyone who swiped right on you' },
  { icon: '✓', title: 'Everything Included', description: 'No coins, no gifts, no hidden fees — flat monthly price' },
];

export default function PaywallScreen() {
  const router = useRouter();
  const { isPremium, packages, purchasePackage, restorePurchases, currentPrice, isLoading } = useSubscription();
  const [purchasing, setPurchasing] = useState(false);
  const [restoring, setRestoring] = useState(false);

  const priceDisplay = packages.length > 0 ? (packages[0].product?.priceString ?? currentPrice) + '/mo' : currentPrice;

  const handleSubscribe = async () => {
    console.log('[Paywall] Start Premium pressed —', priceDisplay);
    if (packages.length > 0) {
      setPurchasing(true);
      try {
        const success = await purchasePackage(packages[0]);
        if (success) {
          console.log('[Paywall] Purchase successful — navigating to tabs');
          Alert.alert('Welcome to Premium! 👑', 'You now have access to all premium features.', [
            { text: 'Let\'s Go!', onPress: () => router.replace('/(tabs)') },
          ]);
        }
      } catch (err: unknown) {
        const e = err as { message?: string };
        console.log('[Paywall] Purchase failed:', e?.message ?? err);
        Alert.alert('Purchase Failed', e?.message ?? 'Something went wrong. Please try again.');
      } finally {
        setPurchasing(false);
      }
    } else {
      // No RC packages — fallback simulation for dev
      console.log('[Paywall] No RC packages available, using fallback purchase flow');
      Alert.alert(
        'Start Premium',
        `Subscribe to Riven Premium for ${priceDisplay}?`,
        [
          { text: 'Cancel', style: 'cancel', onPress: () => console.log('[Paywall] Fallback purchase cancelled') },
          {
            text: 'Subscribe',
            onPress: async () => {
              console.log('[Paywall] Fallback subscription confirmed');
              setPurchasing(true);
              try {
                await purchasePackage({} as never);
                Alert.alert('Welcome to Premium! 👑', 'You now have access to all premium features.', [
                  { text: 'Let\'s Go!', onPress: () => router.replace('/(tabs)') },
                ]);
              } finally {
                setPurchasing(false);
              }
            },
          },
        ]
      );
    }
  };

  const handleRestore = async () => {
    console.log('[Paywall] Restore purchases pressed');
    setRestoring(true);
    try {
      const success = await restorePurchases();
      if (success) {
        Alert.alert('Restored!', 'Your premium subscription has been restored.', [
          { text: 'Continue', onPress: () => router.replace('/(tabs)') },
        ]);
      } else {
        Alert.alert('No Purchases Found', 'No previous premium subscription was found for this account.');
      }
    } catch (err) {
      console.log('[Paywall] Restore error:', err);
      Alert.alert('Restore Failed', 'Could not restore purchases. Please try again.');
    } finally {
      setRestoring(false);
    }
  };

  const handleMaybeLater = () => {
    console.log('[Paywall] Maybe Later pressed');
    router.back();
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false, presentation: 'modal' }} />
      <View style={styles.container}>
        <LinearGradient
          colors={['#0D0D0F', '#1A0008', '#0D0D0F']}
          style={StyleSheet.absoluteFill}
        />

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {/* Gold accent bar */}
          <View style={styles.accentBar} />

          {/* Crown + title */}
          <Text style={styles.crown}>👑</Text>
          <Text style={styles.title}>Riven Premium</Text>

          {/* Price */}
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{priceDisplay}</Text>
          </View>
          <Text style={styles.pricePeriod}>Cancel anytime · No hidden fees</Text>

          {/* Features */}
          <View style={styles.featureList}>
            {FEATURES.map((feature) => (
              <View key={feature.title} style={styles.featureRow}>
                <View style={styles.featureIconWrapper}>
                  <Text style={styles.featureIcon}>{feature.icon}</Text>
                </View>
                <View style={styles.featureTextBlock}>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>{feature.description}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* CTA */}
          {isPremium ? (
            <View style={styles.alreadyPremium}>
              <Text style={styles.alreadyPremiumText}>⭐ You're already Premium!</Text>
            </View>
          ) : (
            <AnimatedPressable
              onPress={handleSubscribe}
              style={styles.subscribeWrapper}
              disabled={purchasing || isLoading}
            >
              <LinearGradient
                colors={['#F5A623', '#E8940A']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.subscribeBtn}
              >
                {purchasing ? (
                  <ActivityIndicator color="#000" />
                ) : (
                  <Text style={styles.subscribeBtnText}>
                    Start Premium — {priceDisplay}
                  </Text>
                )}
              </LinearGradient>
            </AnimatedPressable>
          )}

          {/* Restore */}
          <TouchableOpacity onPress={handleRestore} style={styles.restoreBtn} disabled={restoring}>
            {restoring ? (
              <ActivityIndicator size="small" color={COLORS.textTertiary} />
            ) : (
              <Text style={styles.restoreText}>Restore Purchases</Text>
            )}
          </TouchableOpacity>

          {/* Maybe Later */}
          <TouchableOpacity onPress={handleMaybeLater} style={styles.laterBtn}>
            <Text style={styles.laterText}>Maybe Later</Text>
          </TouchableOpacity>

          <Text style={styles.finePrint}>
            Cancel anytime. Billed monthly. No hidden fees.
          </Text>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 60,
    alignItems: 'center',
  },
  accentBar: {
    width: 48,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.gold,
    marginBottom: 32,
    opacity: 0.8,
  },
  crown: {
    fontSize: 64,
    marginBottom: 12,
  },
  title: {
    color: COLORS.gold,
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 16,
    textAlign: 'center',
  },
  priceContainer: {
    marginBottom: 4,
  },
  price: {
    color: COLORS.text,
    fontSize: 36,
    fontWeight: '900',
    textAlign: 'center',
  },
  pricePeriod: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginBottom: 32,
    textAlign: 'center',
  },
  featureList: {
    width: '100%',
    gap: 16,
    marginBottom: 36,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
  },
  featureIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(245,166,35,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(245,166,35,0.3)',
    marginTop: 2,
  },
  featureIcon: {
    fontSize: 16,
    color: COLORS.gold,
  },
  featureTextBlock: {
    flex: 1,
    gap: 2,
  },
  featureTitle: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: '700',
  },
  featureDescription: {
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 18,
  },
  alreadyPremium: {
    width: '100%',
    backgroundColor: 'rgba(245,166,35,0.15)',
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gold,
    marginBottom: 12,
  },
  alreadyPremiumText: {
    color: COLORS.gold,
    fontSize: 17,
    fontWeight: '800',
  },
  subscribeWrapper: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: COLORS.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  subscribeBtn: {
    paddingVertical: 18,
    alignItems: 'center',
    borderRadius: 16,
  },
  subscribeBtnText: {
    color: '#000',
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: 0.3,
  },
  restoreBtn: {
    paddingVertical: 10,
    marginBottom: 4,
  },
  restoreText: {
    color: COLORS.textTertiary,
    fontSize: 13,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  laterBtn: {
    paddingVertical: 12,
    marginBottom: 8,
  },
  laterText: {
    color: COLORS.textSecondary,
    fontSize: 15,
    fontWeight: '500',
  },
  finePrint: {
    color: COLORS.textTertiary,
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 16,
    marginTop: 8,
  },
});
