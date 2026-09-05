import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '@/constants/Colors';
import { AnimatedPressable } from '@/components/AnimatedPressable';
import { useVerification, HARDCODED_USER_ID, VerificationTier } from '@/contexts/VerificationContext';
import { useSubscription } from '@/contexts/SubscriptionContext';

const VERIFIED_GREEN = '#22C55E';
const PREMIUM_GOLD = '#F59E0B';

function StatusPill({ status }: { status: string }) {
  if (status === 'none') return null;

  let pillColor = COLORS.warning;
  let pillText = 'In Progress';

  if (status === 'pending' || status === 'created') {
    pillColor = '#F59E0B';
    pillText = 'In Progress';
  } else if (status === 'completed') {
    pillColor = '#3B82F6';
    pillText = 'Under Review';
  } else if (status === 'approved') {
    pillColor = VERIFIED_GREEN;
    pillText = '✓ Verified';
  } else if (status === 'declined' || status === 'failed') {
    pillColor = COLORS.danger;
    pillText = 'Verification Failed';
  }

  return (
    <View style={[styles.statusPill, { backgroundColor: pillColor + '22', borderColor: pillColor }]}>
      <Text style={[styles.statusPillText, { color: pillColor }]}>{pillText}</Text>
    </View>
  );
}

function ChecklistItem({ text }: { text: string }) {
  return (
    <View style={styles.checklistItem}>
      <View style={styles.checkCircle}>
        <Text style={styles.checkMark}>✓</Text>
      </View>
      <Text style={styles.checklistText}>{text}</Text>
    </View>
  );
}

export default function VerificationScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { verificationStatus, verificationTier, isVerified, isLoading, checkStatus, startVerification } = useVerification();
  const { isPremium } = useSubscription();
  const [actionLoading, setActionLoading] = useState(false);

  const handleBack = () => {
    console.log('[Verification] Back button pressed');
    router.back();
  };

  const handleSkip = () => {
    console.log('[Verification] Skip for now pressed — navigating to discover');
    router.replace('/(tabs)/(discover)');
  };

  const handleRefreshStatus = async () => {
    console.log('[Verification] Refresh Status pressed');
    await checkStatus(HARDCODED_USER_ID);
  };

  const handleStartVerification = async (tier: VerificationTier) => {
    console.log('[Verification] Start Verification pressed — tier:', tier);
    setActionLoading(true);
    try {
      const result = await startVerification(HARDCODED_USER_ID, tier);
      if (result?.verification_url) {
        console.log('[Verification] Opening verification URL:', result.verification_url);
        await Linking.openURL(result.verification_url);
      } else {
        console.warn('[Verification] No verification_url returned');
      }
    } finally {
      setActionLoading(false);
    }
  };

  const isDeclinedOrFailed = verificationStatus === 'declined' || verificationStatus === 'failed';
  const isPendingOrInProgress = verificationStatus === 'pending' || verificationStatus === 'created' || verificationStatus === 'completed';

  const tierLabel = verificationTier === 'premium' ? 'Premium' : verificationTier === 'free' ? 'Free' : '';

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backBtn} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Identity Verification</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Status pill */}
        {verificationStatus !== 'none' && (
          <View style={styles.statusRow}>
            <StatusPill status={verificationStatus} />
            <TouchableOpacity onPress={handleRefreshStatus} style={styles.refreshBtn} disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator size="small" color={COLORS.textSecondary} />
              ) : (
                <Text style={styles.refreshText}>↻ Refresh</Text>
              )}
            </TouchableOpacity>
          </View>
        )}

        {/* APPROVED STATE */}
        {isVerified ? (
          <View style={styles.approvedContainer}>
            <LinearGradient
              colors={['rgba(34,197,94,0.15)', 'rgba(34,197,94,0.05)']}
              style={styles.approvedCard}
            >
              <View style={styles.approvedIconCircle}>
                <Text style={styles.approvedIcon}>✓</Text>
              </View>
              <Text style={styles.approvedTitle}>You're Verified! 🎉</Text>
              <Text style={styles.approvedSubtitle}>
                Your identity has been verified
                {tierLabel ? ` (${tierLabel} tier)` : ''}.
                Your profile now shows a verified badge.
              </Text>
              <TouchableOpacity onPress={handleRefreshStatus} style={styles.refreshStatusBtn} disabled={isLoading}>
                <Text style={styles.refreshStatusText}>↻ Refresh Status</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        ) : (
          <>
            {/* Hero */}
            <View style={styles.heroSection}>
              <View style={styles.heroIconCircle}>
                <Text style={styles.heroIcon}>🛡️</Text>
              </View>
              <Text style={styles.heroTitle}>Build Trust & Safety</Text>
              <Text style={styles.heroSubtitle}>
                Verified profiles get 3x more matches. Verification takes under 2 minutes.
              </Text>
            </View>

            {/* Declined / Failed message */}
            {isDeclinedOrFailed && (
              <View style={styles.failedBanner}>
                <Text style={styles.failedIcon}>⚠️</Text>
                <View style={styles.failedContent}>
                  <Text style={styles.failedTitle}>Verification Failed</Text>
                  <Text style={styles.failedSubtitle}>
                    Your verification was not successful. Please try again with a valid government-issued ID.
                  </Text>
                </View>
              </View>
            )}

            {/* In-progress message */}
            {isPendingOrInProgress && !isDeclinedOrFailed && (
              <View style={styles.pendingBanner}>
                <Text style={styles.pendingIcon}>⏳</Text>
                <View style={styles.pendingContent}>
                  <Text style={styles.pendingTitle}>Verification In Progress</Text>
                  <Text style={styles.pendingSubtitle}>
                    Complete the verification in your browser, then tap "Refresh Status" above.
                  </Text>
                </View>
              </View>
            )}

            {/* FREE VERIFICATION CARD */}
            <View style={styles.verificationCard}>
              <View style={styles.cardHeader}>
                <View style={styles.cardTitleRow}>
                  <Text style={styles.cardIcon}>🪪</Text>
                  <Text style={styles.cardTitle}>Identity Verification</Text>
                </View>
                <Text style={styles.cardBadge}>FREE</Text>
              </View>

              <Text style={styles.cardDescription}>
                Verify your identity with a government-issued ID and selfie to get your verified badge. Required before your profile goes live.
              </Text>

              <View style={styles.checklist}>
                <ChecklistItem text="Government ID (passport, driver's license, state ID)" />
                <ChecklistItem text="Selfie photo match" />
                <ChecklistItem text="Real-time liveness check" />
              </View>

              <AnimatedPressable
                onPress={() => handleStartVerification('free')}
                style={styles.ctaWrapper}
                disabled={actionLoading || isLoading}
              >
                <LinearGradient
                  colors={COLORS.gradientPrimary as [string, string]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.ctaBtn}
                >
                  {actionLoading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.ctaBtnText}>
                      {isDeclinedOrFailed ? 'Retry Verification' : 'Start Verification'}
                    </Text>
                  )}
                </LinearGradient>
              </AnimatedPressable>
            </View>

            {/* PREMIUM VERIFICATION CARD */}
            {isPremium && (
              <View style={[styles.verificationCard, styles.premiumCard]}>
                <View style={styles.cardHeader}>
                  <View style={styles.cardTitleRow}>
                    <Text style={styles.cardIcon}>⭐</Text>
                    <Text style={[styles.cardTitle, { color: PREMIUM_GOLD }]}>Enhanced Verification</Text>
                  </View>
                  <View style={styles.goldBadge}>
                    <Text style={styles.goldBadgeText}>⭐ PREMIUM</Text>
                  </View>
                </View>

                <Text style={styles.cardDescription}>
                  Premium members get an additional database check for maximum trust.
                </Text>

                <View style={styles.checklist}>
                  <ChecklistItem text="Government ID (passport, driver's license, state ID)" />
                  <ChecklistItem text="Selfie photo match" />
                  <ChecklistItem text="Real-time liveness check" />
                  <View style={[styles.checklistItem, styles.premiumChecklistItem]}>
                    <View style={[styles.checkCircle, styles.goldCheckCircle]}>
                      <Text style={styles.checkMark}>✓</Text>
                    </View>
                    <Text style={[styles.checklistText, { color: PREMIUM_GOLD }]}>Database background check</Text>
                  </View>
                </View>

                <AnimatedPressable
                  onPress={() => handleStartVerification('premium')}
                  style={styles.ctaWrapper}
                  disabled={actionLoading || isLoading}
                >
                  <LinearGradient
                    colors={['#F59E0B', '#D97706']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.ctaBtn}
                  >
                    {actionLoading ? (
                      <ActivityIndicator color="#000" />
                    ) : (
                      <Text style={[styles.ctaBtnText, { color: '#000' }]}>
                        Start Enhanced Verification
                      </Text>
                    )}
                  </LinearGradient>
                </AnimatedPressable>
              </View>
            )}

            {/* Refresh status button (when status is not none) */}
            {verificationStatus !== 'none' && (
              <TouchableOpacity
                onPress={handleRefreshStatus}
                style={styles.refreshStatusBtnOutline}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color={COLORS.textSecondary} />
                ) : (
                  <Text style={styles.refreshStatusOutlineText}>↻ Refresh Status</Text>
                )}
              </TouchableOpacity>
            )}
          </>
        )}

        {/* Skip for now */}
        <TouchableOpacity onPress={handleSkip} style={styles.skipBtn}>
          <Text style={styles.skipText}>Skip for now</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: '600',
  },
  headerTitle: {
    flex: 1,
    color: COLORS.text,
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
  },
  headerRight: {
    width: 40,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statusPill: {
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  statusPillText: {
    fontSize: 13,
    fontWeight: '700',
  },
  refreshBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    minWidth: 90,
    alignItems: 'center',
  },
  refreshText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  // Approved state
  approvedContainer: {
    marginBottom: 24,
  },
  approvedCard: {
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(34,197,94,0.3)',
  },
  approvedIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(34,197,94,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#22C55E',
  },
  approvedIcon: {
    fontSize: 36,
    color: '#22C55E',
    fontWeight: '800',
  },
  approvedTitle: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 10,
    textAlign: 'center',
  },
  approvedSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 20,
  },
  refreshStatusBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'rgba(34,197,94,0.15)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(34,197,94,0.4)',
  },
  refreshStatusText: {
    color: '#22C55E',
    fontSize: 14,
    fontWeight: '600',
  },
  // Hero
  heroSection: {
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  heroIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.primaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(200,16,46,0.3)',
  },
  heroIcon: {
    fontSize: 34,
  },
  heroTitle: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 8,
    textAlign: 'center',
  },
  heroSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
  },
  // Banners
  failedBanner: {
    flexDirection: 'row',
    backgroundColor: 'rgba(239,68,68,0.12)',
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.3)',
    gap: 12,
    alignItems: 'flex-start',
  },
  failedIcon: {
    fontSize: 20,
  },
  failedContent: {
    flex: 1,
  },
  failedTitle: {
    color: COLORS.danger,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  failedSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 19,
  },
  pendingBanner: {
    flexDirection: 'row',
    backgroundColor: 'rgba(245,158,11,0.1)',
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(245,158,11,0.3)',
    gap: 12,
    alignItems: 'flex-start',
  },
  pendingIcon: {
    fontSize: 20,
  },
  pendingContent: {
    flex: 1,
  },
  pendingTitle: {
    color: '#F59E0B',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  pendingSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 19,
  },
  // Verification card
  verificationCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  premiumCard: {
    borderColor: 'rgba(245,158,11,0.35)',
    backgroundColor: 'rgba(245,158,11,0.05)',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  cardIcon: {
    fontSize: 22,
  },
  cardTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '800',
  },
  cardBadge: {
    backgroundColor: COLORS.primaryMuted,
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: '800',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(200,16,46,0.3)',
    overflow: 'hidden',
  },
  goldBadge: {
    backgroundColor: 'rgba(245,158,11,0.15)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: 'rgba(245,158,11,0.4)',
  },
  goldBadgeText: {
    color: '#F59E0B',
    fontSize: 11,
    fontWeight: '800',
  },
  cardDescription: {
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 16,
  },
  checklist: {
    gap: 10,
    marginBottom: 20,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  premiumChecklistItem: {},
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(34,197,94,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(34,197,94,0.5)',
  },
  goldCheckCircle: {
    backgroundColor: 'rgba(245,158,11,0.2)',
    borderColor: 'rgba(245,158,11,0.5)',
  },
  checkMark: {
    color: '#22C55E',
    fontSize: 12,
    fontWeight: '800',
  },
  checklistText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
  ctaWrapper: {
    borderRadius: 14,
    overflow: 'hidden',
  },
  ctaBtn: {
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 14,
  },
  ctaBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  // Refresh outline button
  refreshStatusBtnOutline: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: COLORS.surface,
    minHeight: 50,
    justifyContent: 'center',
  },
  refreshStatusOutlineText: {
    color: COLORS.textSecondary,
    fontSize: 15,
    fontWeight: '600',
  },
  // Skip
  skipBtn: {
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 4,
  },
  skipText: {
    color: COLORS.textTertiary,
    fontSize: 15,
    fontWeight: '500',
  },
});
