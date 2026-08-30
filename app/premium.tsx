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
import { useRouter } from 'expo-router';
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

export default function PremiumScreen() {
  const router = useRouter();
  const { isPremium, packages, purchasePackage, restorePurchases, currentPrice, isLoading } = useSubscription();
  const [purchasing, setPurchasing] = useState(false);
  const [restoring, setRestoring] = useState(false);

  const priceDisplay = packages.length > 0 ? packages[0].product.priceString + '/mo' : currentPrice;

  const handleSubscribe = async () => {
    console.log('[Premium] Subscribe button pressed —', priceDisplay);
    if (packages.length > 0) {
      setPurchasing(true);
      try {
        const success = await purchasePackage(packages[0]);
        if (success) {
          console.log('[Premium] Purchase successful — navigating back');
          Alert.alert('Welcome to Premium! 👑', 'You now have access to all premium features.');
          router.back();
        }
      } catch (err: any) {
        console.log('[Premium] Purchase failed:', err?.message ?? err);
        Alert.alert('Purchase Failed', err?.message ?? 'Something went wrong. Please try again.');
      } finally {
        setPurchasing(false);
      }
    } else {
      // No RC packages — fallback simulation
      console.log('[Premium] No RC packages, using fallback purchase flow');
      Alert.alert(
        'Start Premium',
        `Subscribe to Riven Premium for ${priceDisplay}?`,
        [
          { text: 'Cancel', style: 'cancel', onPress: () => console.log('[Premium] Fallback purchase cancelled') },
          {
            text: 'Subscribe',
            onPress: async () => {
              console.log('[Premium] Fallback subscription confirmed');
              // Use purchasePackage which handles the fallback internally
              setPurchasing(true);
              try {
                await purchasePackage({} as any);
                Alert.alert('Welcome to Premium! 👑', 'You now have access to all premium features.');
                router.back();
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
    console.log('[Premium] Restore purchases pressed');
    setRestoring(true);
    try {
      const success = await restorePurchases();
      if (success) {
        Alert.alert('Restored!', 'Your premium subscription has been restored.');
        router.back();
      } else {
        Alert.alert('No Purchases Found', 'No previous premium subscription was found for this account.');
      }
    } catch (err) {
      console.log('[Premium] Restore error:', err);
      Alert.alert('Restore Failed', 'Could not restore purchases. Please try again.');
    } finally {
      setRestoring(false);
    }
  };

  const handleMaybeLater = () => {
    console.log('[Premium] Maybe Later pressed');
    router.back();
  };

  const handleBack = () => {
    console.log('[Premium] Back pressed');
    router.back();
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0D0D0F', '#1A0008', '#0D0D0F']}
        style={StyleSheet.absoluteFill}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Back button */}
        <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>

        {/* Crown + title */}
        <Text style={styles.crown}>👑</Text>
        <Text style={styles.title}>Riven Premium</Text>
        <Text style={styles.price}>{priceDisplay}</Text>
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

        {/* Subscribe / Already Premium */}
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

        <TouchableOpacity onPress={handleMaybeLater} style={styles.laterBtn}>
          <Text style={styles.laterText}>Maybe Later</Text>
        </TouchableOpacity>

        {/* Restore purchases */}
        <TouchableOpacity onPress={handleRestore} style={styles.restoreBtn} disabled={restoring}>
          {restoring ? (
            <ActivityIndicator size="small" color={COLORS.textTertiary} />
          ) : (
            <Text style={styles.restoreText}>Restore Purchases</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.finePrint}>
          Subscription auto-renews monthly. Cancel anytime in App Store settings.
        </Text>
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
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 60,
    alignItems: 'center',
  },
  backBtn: {
    alignSelf: 'flex-start',
    padding: 4,
    marginBottom: 16,
  },
  backIcon: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: '600',
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
    marginBottom: 8,
    textAlign: 'center',
  },
  price: {
    color: COLORS.text,
    fontSize: 36,
    fontWeight: '900',
    marginBottom: 4,
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
    marginBottom: 12,
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
  laterBtn: {
    paddingVertical: 12,
    marginBottom: 4,
  },
  laterText: {
    color: COLORS.textSecondary,
    fontSize: 15,
    fontWeight: '500',
  },
  restoreBtn: {
    paddingVertical: 10,
    marginBottom: 16,
  },
  restoreText: {
    color: COLORS.textTertiary,
    fontSize: 13,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  finePrint: {
    color: COLORS.textTertiary,
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 16,
  },
});
