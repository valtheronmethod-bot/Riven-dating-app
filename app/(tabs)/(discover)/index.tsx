import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { COLORS } from '@/constants/Colors';
import { ProfileCard, Profile } from '@/components/ProfileCard';
import { AdBanner } from '@/components/AdBanner';
import { useSubscription } from '@/contexts/SubscriptionContext';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const MOCK_PROFILES: Profile[] = [
  { id: '1', name: 'Sophia', age: 26, distance: '2 miles', bio: "Adventure seeker & coffee enthusiast. Let's explore the city together.", interests: ['Hiking', 'Coffee', 'Travel'], verified: true },
  { id: '2', name: 'Marcus', age: 29, distance: '5 miles', bio: 'Chef by day, musician by night. Looking for someone to share good food with.', interests: ['Cooking', 'Music', 'Art'], verified: false },
  { id: '3', name: 'Aria', age: 24, distance: '1 mile', bio: 'Yoga instructor & bookworm. Swipe right if you love deep conversations.', interests: ['Yoga', 'Books', 'Meditation'], verified: true },
  { id: '4', name: 'Jordan', age: 31, distance: '8 miles', bio: 'Software engineer who loves the outdoors. Weekend hiker, weekday coder.', interests: ['Tech', 'Hiking', 'Gaming'], verified: false },
  { id: '5', name: 'Luna', age: 27, distance: '3 miles', bio: "Photographer capturing life's beautiful moments. Let's make memories.", interests: ['Photography', 'Travel', 'Art'], verified: true },
  { id: '6', name: 'Ethan', age: 28, distance: '6 miles', bio: 'Fitness coach & foodie. Looking for my adventure partner.', interests: ['Fitness', 'Food', 'Travel'], verified: false },
  { id: '7', name: 'Zoe', age: 25, distance: '4 miles', bio: 'Nurse with a big heart. Love animals, hiking, and lazy Sundays.', interests: ['Animals', 'Hiking', 'Movies'], verified: true },
  { id: '8', name: 'Kai', age: 30, distance: '7 miles', bio: "Architect designing spaces and experiences. Let's build something together.", interests: ['Design', 'Architecture', 'Coffee'], verified: false },
  { id: '9', name: 'Mia', age: 23, distance: '2 miles', bio: "Dance teacher spreading joy one step at a time. Life's too short to sit still.", interests: ['Dance', 'Music', 'Travel'], verified: true },
  { id: '10', name: 'Alex', age: 32, distance: '9 miles', bio: 'Entrepreneur & dog dad. Looking for someone who loves adventures and lazy mornings.', interests: ['Business', 'Dogs', 'Coffee'], verified: false },
];

export default function DiscoverScreen() {
  const router = useRouter();
  const { isPremium } = useSubscription();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [likedCount, setLikedCount] = useState(0);

  useEffect(() => {
    console.log('[Discover] Loading profiles...');
    const timer = setTimeout(() => {
      setProfiles([...MOCK_PROFILES]);
      setLoading(false);
      console.log('[Discover] Profiles loaded:', MOCK_PROFILES.length);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleLike = useCallback((id: string) => {
    const profile = profiles.find(p => p.id === id);
    console.log('[Discover] Liked profile:', id, profile?.name);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setProfiles(prev => prev.filter(p => p.id !== id));
    setLikedCount(prev => prev + 1);
  }, [profiles]);

  const handlePass = useCallback((id: string) => {
    const profile = profiles.find(p => p.id === id);
    console.log('[Discover] Passed profile:', id, profile?.name);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setProfiles(prev => prev.filter(p => p.id !== id));
  }, [profiles]);

  const handleSuperLike = useCallback((id: string) => {
    const profile = profiles.find(p => p.id === id);
    console.log('[Discover] Super liked profile:', id, profile?.name);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setProfiles(prev => prev.filter(p => p.id !== id));
  }, [profiles]);

  const handlePremiumPress = () => {
    console.log('[Discover] Go Premium button pressed');
    router.push('/premium');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Finding matches near you...</Text>
      </View>
    );
  }

  if (profiles.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>💫</Text>
        <Text style={styles.emptyTitle}>You've seen everyone!</Text>
        <Text style={styles.emptySubtitle}>Check back later for new matches in your area.</Text>
        <TouchableOpacity
          style={styles.refreshBtn}
          onPress={() => {
            console.log('[Discover] Refresh profiles pressed');
            setProfiles([...MOCK_PROFILES]);
          }}
        >
          <Text style={styles.refreshBtnText}>Refresh</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover</Text>
        <TouchableOpacity onPress={() => router.push('/settings')} style={styles.settingsBtn}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Ad banner for free users */}
      {!isPremium && <AdBanner />}

      {/* Card stack */}
      <View style={styles.cardStack}>
        {profiles.slice(0, 3).map((profile, index) => (
          <View
            key={profile.id}
            style={[
              styles.cardWrapper,
              {
                zIndex: profiles.length - index,
                transform: [
                  { scale: 1 - index * 0.03 },
                  { translateY: index * 8 },
                ],
              },
            ]}
          >
            <ProfileCard
              profile={profile}
              onLike={handleLike}
              onPass={handlePass}
              onSuperLike={handleSuperLike}
              isPremium={isPremium}
              isTop={index === 0}
            />
          </View>
        ))}
      </View>

      {/* Premium floating button for free users */}
      {!isPremium && (
        <TouchableOpacity style={styles.premiumFloatBtn} onPress={handlePremiumPress}>
          <Text style={styles.premiumFloatText}>⭐ Go Premium</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 56,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  loadingText: {
    color: COLORS.textSecondary,
    fontSize: 15,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 12,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 8,
  },
  emptyTitle: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
  },
  emptySubtitle: {
    color: COLORS.textSecondary,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
  refreshBtn: {
    marginTop: 16,
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingHorizontal: 32,
    paddingVertical: 14,
  },
  refreshBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  headerTitle: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: '800',
  },
  settingsBtn: {
    padding: 4,
  },
  settingsIcon: {
    fontSize: 22,
  },
  cardStack: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  cardWrapper: {
    position: 'absolute',
    alignItems: 'center',
  },
  premiumFloatBtn: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    backgroundColor: COLORS.gold,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: COLORS.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  premiumFloatText: {
    color: '#000',
    fontSize: 13,
    fontWeight: '800',
  },
});
