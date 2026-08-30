import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '@/constants/Colors';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { AnimatedPressable } from '@/components/AnimatedPressable';

const LOGO_URL = 'https://prod-finalquest-user-projects-storage-bucket-aws.s3.amazonaws.com/user-projects/b786ed0f-b3a9-4fd9-a451-af874d7211fa/assets/images/7c2e5bc3-c614-429b-bb28-aa6d240f2cae.png';

function resolveImageSource(source: string | number | ImageSourcePropType | undefined): ImageSourcePropType {
  if (!source) return { uri: '' };
  if (typeof source === 'string') return { uri: source };
  return source as ImageSourcePropType;
}

const MY_PROFILE = {
  name: 'You',
  age: 27,
  bio: 'Living life one adventure at a time. Coffee lover, weekend hiker.',
  interests: ['Hiking', 'Coffee', 'Travel', 'Photography'],
  completeness: 75,
};

export default function ProfileScreen() {
  const router = useRouter();
  const { isPremium } = useSubscription();
  const avatarUri = 'https://picsum.photos/seed/myprofile/400/400';

  const handleEditProfile = () => {
    console.log('[Profile] Edit profile pressed');
    router.push('/edit-profile');
  };

  const handleSettings = () => {
    console.log('[Profile] Settings pressed');
    router.push('/settings');
  };

  const handleGoPremium = () => {
    console.log('[Profile] Go Premium pressed from profile tab');
    router.push('/premium');
  };

  const completenessWidth = `${MY_PROFILE.completeness}%` as `${number}%`;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={resolveImageSource(LOGO_URL)} style={styles.logoImg} resizeMode="contain" />
        <Text style={styles.headerTitle}>My Profile</Text>
        <TouchableOpacity onPress={handleSettings} style={styles.settingsBtn}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Profile photo + info */}
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <Image source={resolveImageSource(avatarUri)} style={styles.avatar} />
          {isPremium && (
            <View style={styles.premiumBadge}>
              <Text style={styles.premiumBadgeText}>⭐ Premium</Text>
            </View>
          )}
        </View>
        <Text style={styles.profileName}>{MY_PROFILE.name}</Text>
        <Text style={styles.profileAge}>{MY_PROFILE.age} years old</Text>
        <Text style={styles.profileBio}>{MY_PROFILE.bio}</Text>

        <View style={styles.interests}>
          {MY_PROFILE.interests.map((interest) => (
            <View key={interest} style={styles.interestPill}>
              <Text style={styles.interestText}>{interest}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Profile completeness */}
      <View style={styles.completenessCard}>
        <View style={styles.completenessHeader}>
          <Text style={styles.completenessTitle}>Profile Completeness</Text>
          <Text style={styles.completenessPercent}>{MY_PROFILE.completeness}%</Text>
        </View>
        <View style={styles.completenessBar}>
          <View style={[styles.completenessProgress, { width: completenessWidth }]} />
        </View>
        <Text style={styles.completenessHint}>Add more photos to boost your profile</Text>
      </View>

      {/* Stats */}
      <View style={styles.statsCard}>
        <Text style={styles.statsTitle}>Your Stats</Text>
        <View style={styles.statsRow}>
          {[
            { label: 'Likes', value: '47', icon: '❤️' },
            { label: 'Matches', value: '12', icon: '🔥' },
            { label: 'Views', value: '203', icon: '👀' },
          ].map((stat) => (
            <View key={stat.label} style={styles.statItem}>
              {isPremium ? (
                <>
                  <Text style={styles.statIcon}>{stat.icon}</Text>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </>
              ) : (
                <>
                  <Text style={styles.statIcon}>{stat.icon}</Text>
                  <View style={styles.blurredStat}>
                    <Text style={styles.blurredStatText}>••</Text>
                  </View>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </>
              )}
            </View>
          ))}
        </View>
        {!isPremium && (
          <TouchableOpacity style={styles.statsUnlockBtn} onPress={handleGoPremium}>
            <Text style={styles.statsUnlockText}>🔒 Unlock Stats with Premium</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Action buttons */}
      <AnimatedPressable onPress={handleEditProfile} style={styles.editBtn}>
        <Text style={styles.editBtnText}>✏️ Edit Profile</Text>
      </AnimatedPressable>

      {/* Premium card for free users */}
      {!isPremium && (
        <TouchableOpacity style={styles.premiumCard} onPress={handleGoPremium}>
          <LinearGradient
            colors={['#1A0008', '#2A0010']}
            style={styles.premiumCardGradient}
          >
            <Text style={styles.premiumCardIcon}>⭐</Text>
            <View style={styles.premiumCardContent}>
              <Text style={styles.premiumCardTitle}>Upgrade to Premium</Text>
              <Text style={styles.premiumCardSubtitle}>Zero ads · Unlimited likes · See who liked you</Text>
            </View>
            <Text style={styles.premiumCardArrow}>→</Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 12,
    gap: 10,
  },
  logoImg: {
    width: 32,
    height: 32,
    borderRadius: 8,
  },
  headerTitle: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: '800',
    flex: 1,
  },
  settingsBtn: {
    padding: 4,
  },
  settingsIcon: {
    fontSize: 22,
  },
  profileSection: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 14,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  premiumBadge: {
    position: 'absolute',
    bottom: -4,
    alignSelf: 'center',
    backgroundColor: COLORS.gold,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  premiumBadgeText: {
    color: '#000',
    fontSize: 10,
    fontWeight: '800',
  },
  profileName: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 2,
  },
  profileAge: {
    color: COLORS.textSecondary,
    fontSize: 15,
    marginBottom: 10,
  },
  profileBio: {
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 14,
  },
  interests: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
  interestPill: {
    backgroundColor: COLORS.primaryMuted,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'rgba(200,16,46,0.3)',
  },
  interestText: {
    color: COLORS.accent,
    fontSize: 13,
    fontWeight: '600',
  },
  completenessCard: {
    marginHorizontal: 16,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  completenessHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  completenessTitle: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '700',
  },
  completenessPercent: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '700',
  },
  completenessBar: {
    height: 6,
    backgroundColor: COLORS.surfaceElevated,
    borderRadius: 3,
    marginBottom: 8,
    overflow: 'hidden',
  },
  completenessProgress: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },
  completenessHint: {
    color: COLORS.textTertiary,
    fontSize: 12,
  },
  statsCard: {
    marginHorizontal: 16,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statsTitle: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 14,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    gap: 4,
  },
  statIcon: {
    fontSize: 22,
  },
  statValue: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: '800',
  },
  statLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  blurredStat: {
    backgroundColor: COLORS.surfaceElevated,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  blurredStatText: {
    color: COLORS.textTertiary,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 4,
  },
  statsUnlockBtn: {
    marginTop: 14,
    backgroundColor: COLORS.primaryMuted,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  statsUnlockText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '700',
  },
  editBtn: {
    marginHorizontal: 16,
    backgroundColor: COLORS.surfaceSecondary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  editBtnText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '700',
  },
  premiumCard: {
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.gold,
  },
  premiumCardGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  premiumCardIcon: {
    fontSize: 28,
  },
  premiumCardContent: {
    flex: 1,
  },
  premiumCardTitle: {
    color: COLORS.gold,
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 2,
  },
  premiumCardSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  premiumCardArrow: {
    color: COLORS.gold,
    fontSize: 20,
    fontWeight: '700',
  },
});
