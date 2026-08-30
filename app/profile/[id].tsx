import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageSourcePropType,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { COLORS } from '@/constants/Colors';
import { AnimatedPressable } from '@/components/AnimatedPressable';
import { useSubscription } from '@/contexts/SubscriptionContext';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

function resolveImageSource(source: string | number | ImageSourcePropType | undefined): ImageSourcePropType {
  if (!source) return { uri: '' };
  if (typeof source === 'string') return { uri: source };
  return source as ImageSourcePropType;
}

const MOCK_PROFILES: Record<string, { name: string; age: number; distance: string; bio: string; interests: string[]; verified: boolean }> = {
  '1': { name: 'Sophia', age: 26, distance: '2 miles', bio: "Adventure seeker & coffee enthusiast. Let's explore the city together.", interests: ['Hiking', 'Coffee', 'Travel'], verified: true },
  '2': { name: 'Marcus', age: 29, distance: '5 miles', bio: 'Chef by day, musician by night. Looking for someone to share good food with.', interests: ['Cooking', 'Music', 'Art'], verified: false },
  '3': { name: 'Aria', age: 24, distance: '1 mile', bio: 'Yoga instructor & bookworm. Swipe right if you love deep conversations.', interests: ['Yoga', 'Books', 'Meditation'], verified: true },
};

export default function ViewProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { isPremium } = useSubscription();

  const profile = MOCK_PROFILES[id] ?? {
    name: 'Unknown',
    age: 25,
    distance: 'nearby',
    bio: 'No bio available.',
    interests: [],
    verified: false,
  };

  const imageUri = `https://picsum.photos/seed/${id}/400/600`;

  const handleLike = () => {
    console.log('[ViewProfile] Like pressed for profile:', id, profile.name);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.back();
  };

  const handlePass = () => {
    console.log('[ViewProfile] Pass pressed for profile:', id, profile.name);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  const handleSuperLike = () => {
    if (!isPremium) {
      console.log('[ViewProfile] Super like blocked — not premium');
      router.push('/premium');
      return;
    }
    console.log('[ViewProfile] Super like pressed for profile:', id, profile.name);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.back();
  };

  const handleReport = () => {
    console.log('[ViewProfile] Report/block pressed for profile:', id);
    Alert.alert('Report or Block', 'What would you like to do?', [
      { text: 'Report', style: 'destructive', onPress: () => console.log('[ViewProfile] Report confirmed for:', id) },
      { text: 'Block', style: 'destructive', onPress: () => console.log('[ViewProfile] Block confirmed for:', id) },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleBack = () => {
    console.log('[ViewProfile] Back pressed');
    router.back();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Hero image */}
      <View style={styles.heroContainer}>
        <Image source={resolveImageSource(imageUri)} style={styles.heroImage} />
        <LinearGradient
          colors={COLORS.gradientProfile as [string, string]}
          style={styles.heroGradient}
        />

        {/* Back button */}
        <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>

        {/* Report button */}
        <TouchableOpacity style={styles.reportBtn} onPress={handleReport}>
          <Text style={styles.reportIcon}>•••</Text>
        </TouchableOpacity>

        {/* Name overlay */}
        <View style={styles.heroInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.heroName}>{profile.name}</Text>
            <Text style={styles.heroAge}>{profile.age}</Text>
            {profile.verified && (
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedText}>✓</Text>
              </View>
            )}
          </View>
          <Text style={styles.heroDistance}>📍 {profile.distance}</Text>
        </View>
      </View>

      {/* Bio */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.bio}>{profile.bio}</Text>
      </View>

      {/* Interests */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Interests</Text>
        <View style={styles.interests}>
          {profile.interests.map((interest) => (
            <View key={interest} style={styles.interestPill}>
              <Text style={styles.interestText}>{interest}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Action buttons */}
      <View style={styles.actions}>
        <AnimatedPressable onPress={handlePass} style={styles.passBtn}>
          <Text style={styles.passBtnText}>✕ Pass</Text>
        </AnimatedPressable>

        <AnimatedPressable
          onPress={handleSuperLike}
          style={[styles.superLikeBtn, !isPremium && styles.lockedBtn]}
        >
          <Text style={styles.superLikeBtnText}>{isPremium ? '⭐ Super' : '🔒 Super'}</Text>
        </AnimatedPressable>

        <AnimatedPressable onPress={handleLike} style={styles.likeBtn}>
          <Text style={styles.likeBtnText}>♥ Like</Text>
        </AnimatedPressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingBottom: 40,
  },
  heroContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.6,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  backBtn: {
    position: 'absolute',
    top: 56,
    left: 16,
    backgroundColor: 'rgba(13,13,15,0.6)',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: '600',
  },
  reportBtn: {
    position: 'absolute',
    top: 56,
    right: 16,
    backgroundColor: 'rgba(13,13,15,0.6)',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reportIcon: {
    color: COLORS.text,
    fontSize: 14,
    letterSpacing: 1,
  },
  heroInfo: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    marginBottom: 4,
  },
  heroName: {
    color: COLORS.text,
    fontSize: 32,
    fontWeight: '800',
  },
  heroAge: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: '400',
  },
  verifiedBadge: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  heroDistance: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  bio: {
    color: COLORS.text,
    fontSize: 15,
    lineHeight: 24,
  },
  interests: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestPill: {
    backgroundColor: COLORS.primaryMuted,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: 'rgba(200,16,46,0.3)',
  },
  interestText: {
    color: COLORS.accent,
    fontSize: 13,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 28,
    gap: 12,
  },
  passBtn: {
    flex: 1,
    backgroundColor: COLORS.surfaceSecondary,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  passBtnText: {
    color: COLORS.textSecondary,
    fontSize: 15,
    fontWeight: '700',
  },
  superLikeBtn: {
    flex: 1,
    backgroundColor: COLORS.surfaceSecondary,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gold,
  },
  lockedBtn: {
    opacity: 0.6,
  },
  superLikeBtnText: {
    color: COLORS.gold,
    fontSize: 15,
    fontWeight: '700',
  },
  likeBtn: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  likeBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});
