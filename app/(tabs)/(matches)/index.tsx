import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS } from '@/constants/Colors';
import { AdBanner } from '@/components/AdBanner';
import { useSubscription } from '@/contexts/SubscriptionContext';

function resolveImageSource(source: string | number | ImageSourcePropType | undefined): ImageSourcePropType {
  if (!source) return { uri: '' };
  if (typeof source === 'string') return { uri: source };
  return source as ImageSourcePropType;
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = (SCREEN_WIDTH - 48) / 2;
const CARD_HEIGHT = 160;

const MOCK_MATCHES = [
  { id: 'm1', name: 'Sophia', age: 26, lastMessage: 'Hey! I love hiking too 😊', time: '2m', unread: 2, online: true },
  { id: 'm2', name: 'Luna', age: 27, lastMessage: 'That photo spot sounds amazing!', time: '1h', unread: 0, online: false },
  { id: 'm3', name: 'Aria', age: 24, lastMessage: "What's your favorite book?", time: '3h', unread: 1, online: true },
  { id: 'm4', name: 'Zoe', age: 25, lastMessage: 'Haha yes! Dogs are the best 🐕', time: '1d', unread: 0, online: false },
  { id: 'm5', name: 'Mia', age: 23, lastMessage: "I'd love to show you that dance move", time: '2d', unread: 0, online: false },
];

const NEW_MATCHES = [
  { id: 'n1', name: 'Jordan', age: 31 },
  { id: 'n2', name: 'Ethan', age: 28 },
  { id: 'n3', name: 'Kai', age: 30 },
];

const LIKED_ME = [
  { id: 'lm1', name: 'Chloe', age: 24 },
  { id: 'lm2', name: 'Isabelle', age: 27 },
  { id: 'lm3', name: 'Nadia', age: 25 },
  { id: 'lm4', name: 'Priya', age: 26 },
  { id: 'lm5', name: 'Tara', age: 23 },
  { id: 'lm6', name: 'Yuki', age: 28 },
];

const I_LIKED = [
  { id: 'il1', name: 'Marcus', age: 29 },
  { id: 'il2', name: 'Finn', age: 26 },
  { id: 'il3', name: 'Leo', age: 31 },
  { id: 'il4', name: 'Remy', age: 27 },
  { id: 'il5', name: 'Soren', age: 30 },
];

const VIEWED_ME = [
  { id: 'vm1', name: 'Amara', age: 25 },
  { id: 'vm2', name: 'Bianca', age: 28 },
  { id: 'vm3', name: 'Celeste', age: 24 },
  { id: 'vm4', name: 'Diana', age: 27 },
  { id: 'vm5', name: 'Elena', age: 26 },
  { id: 'vm6', name: 'Freya', age: 23 },
  { id: 'vm7', name: 'Gina', age: 29 },
  { id: 'vm8', name: 'Hana', age: 25 },
];

type TabKey = 'liked_me' | 'i_liked' | 'viewed_me' | 'messages';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'liked_me', label: 'Liked Me' },
  { key: 'i_liked', label: 'I Liked' },
  { key: 'viewed_me', label: 'Viewed Me' },
  { key: 'messages', label: 'Messages' },
];

interface Profile {
  id: string;
  name: string;
  age: number;
}

interface ProfileCardProps {
  profile: Profile;
  locked: boolean;
  showPending?: boolean;
  onPress: () => void;
  onUpgrade: () => void;
}

function ProfileCard({ profile, locked, showPending, onPress, onUpgrade }: ProfileCardProps) {
  const imageUri = `https://picsum.photos/seed/${profile.id}/400/400`;
  const nameAge = `${profile.name}, ${profile.age}`;

  if (locked) {
    return (
      <View style={[styles.card, { width: CARD_WIDTH, height: CARD_HEIGHT }]}>
        <Image
          source={resolveImageSource(imageUri)}
          style={styles.cardImage}
          blurRadius={10}
        />
        <View style={styles.cardLockedOverlay}>
          <Text style={styles.cardLockEmoji}>🔒</Text>
          <Text style={styles.cardLockText}>Premium</Text>
          <TouchableOpacity style={styles.goPremiumButton} onPress={onUpgrade}>
            <Text style={styles.goPremiumText}>Go Premium</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.card, { width: CARD_WIDTH, height: CARD_HEIGHT }]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Image source={resolveImageSource(imageUri)} style={styles.cardImage} />
      <View style={styles.cardGradient} />
      <View style={styles.cardInfo}>
        <Text style={styles.cardName}>{nameAge}</Text>
        {showPending && (
          <View style={styles.pendingBadge}>
            <Text style={styles.pendingText}>Pending</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default function MatchesScreen() {
  const router = useRouter();
  const { isPremium } = useSubscription();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabKey>('messages');

  useEffect(() => {
    console.log('[Matches] Loading matches...');
    const timer = setTimeout(() => {
      setLoading(false);
      console.log('[Matches] Matches loaded');
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleMatchPress = (matchId: string, matchName: string) => {
    console.log('[Matches] Opening chat with match:', matchId, matchName);
    router.push(`/chat/${matchId}`);
  };

  const handleNewMatchPress = (matchId: string, matchName: string) => {
    console.log('[Matches] New match tapped:', matchId, matchName);
    router.push(`/chat/${matchId}`);
  };

  const handleUpgradePress = () => {
    console.log('[Matches] Upgrade to premium pressed from tab:', activeTab);
    router.push('/paywall');
  };

  const handleTabPress = (tab: TabKey) => {
    console.log('[Matches] Tab switched to:', tab);
    setActiveTab(tab);
  };

  const handleCardPress = (profileId: string, profileName: string) => {
    console.log('[Matches] Profile card tapped:', profileId, profileName);
    router.push(`/chat/${profileId}`);
  };

  const tabData: Record<Exclude<TabKey, 'messages'>, Profile[]> = {
    liked_me: LIKED_ME,
    i_liked: I_LIKED,
    viewed_me: VIEWED_ME,
  };

  const isTabLocked = (tab: TabKey): boolean => {
    if (tab === 'i_liked' || tab === 'messages') return false;
    return !isPremium;
  };

  const isGridTab = activeTab !== 'messages';
  const currentProfiles = isGridTab ? tabData[activeTab as Exclude<TabKey, 'messages'>] : [];
  const locked = isTabLocked(activeTab);

  // Pair profiles into rows of 2
  const rows: Profile[][] = [];
  for (let i = 0; i < currentProfiles.length; i += 2) {
    rows.push(currentProfiles.slice(i, i + 2));
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading matches...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Matches</Text>
      </View>

      {/* New Matches horizontal scroll */}
      <Text style={styles.sectionTitle}>New Matches</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.newMatchesScroll}
        contentContainerStyle={styles.newMatchesContent}
      >
        {NEW_MATCHES.map((match) => {
          const imageUri = `https://picsum.photos/seed/${match.id}/200/200`;
          return (
            <TouchableOpacity
              key={match.id}
              style={styles.newMatchItem}
              onPress={() => handleNewMatchPress(match.id, match.name)}
            >
              <View style={styles.newMatchAvatarWrapper}>
                <Image source={resolveImageSource(imageUri)} style={styles.newMatchAvatar} />
                <View style={styles.newMatchDot} />
              </View>
              <Text style={styles.newMatchName}>{match.name}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Tabbed section */}
      <View style={styles.tabSection}>
        {/* Tab bar */}
        <View style={styles.tabBar}>
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <TouchableOpacity
                key={tab.key}
                style={[styles.tabItem, isActive && styles.tabItemActive]}
                onPress={() => handleTabPress(tab.key)}
                activeOpacity={0.8}
              >
                <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Messages tab content */}
        {activeTab === 'messages' && (
          <View>
            {/* Ad banner for free users */}
            {!isPremium && (
              <View style={styles.adSection}>
                <AdBanner />
              </View>
            )}
            {MOCK_MATCHES.map((match) => {
              const imageUri = `https://picsum.photos/seed/${match.id}/200/200`;
              return (
                <TouchableOpacity
                  key={match.id}
                  style={styles.messageItem}
                  onPress={() => handleMatchPress(match.id, match.name)}
                >
                  <View style={styles.avatarWrapper}>
                    <Image source={resolveImageSource(imageUri)} style={styles.avatar} />
                    {match.online && <View style={styles.onlineDot} />}
                  </View>
                  <View style={styles.messageContent}>
                    <View style={styles.messageHeader}>
                      <Text style={styles.matchName}>{match.name}</Text>
                      <Text style={styles.messageTime}>{match.time}</Text>
                    </View>
                    <Text style={styles.lastMessage} numberOfLines={1}>{match.lastMessage}</Text>
                  </View>
                  {match.unread > 0 && (
                    <View style={styles.unreadBadge}>
                      <Text style={styles.unreadText}>{match.unread}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Grid tab content (Liked Me / I Liked / Viewed Me) */}
        {isGridTab && (
          <View style={styles.grid}>
            {rows.map((row, rowIndex) => {
              const rowKey = `row-${rowIndex}`;
              return (
                <View key={rowKey} style={styles.gridRow}>
                  {row.map((profile) => (
                    <ProfileCard
                      key={profile.id}
                      profile={profile}
                      locked={locked}
                      showPending={activeTab === 'i_liked'}
                      onPress={() => handleCardPress(profile.id, profile.name)}
                      onUpgrade={handleUpgradePress}
                    />
                  ))}
                  {/* Fill empty slot if odd number */}
                  {row.length === 1 && <View style={{ width: CARD_WIDTH }} />}
                </View>
              );
            })}
          </View>
        )}
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
    paddingBottom: 100,
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
  header: {
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 8,
  },
  headerTitle: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: '800',
  },
  sectionTitle: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 12,
  },
  newMatchesScroll: {
    paddingLeft: 20,
  },
  newMatchesContent: {
    paddingRight: 20,
    gap: 16,
  },
  newMatchItem: {
    alignItems: 'center',
    gap: 6,
  },
  newMatchAvatarWrapper: {
    position: 'relative',
  },
  newMatchAvatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  newMatchDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: COLORS.success,
    borderWidth: 2,
    borderColor: COLORS.background,
  },
  newMatchName: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: '600',
  },
  adSection: {
    marginBottom: 8,
  },
  // Tab section
  tabSection: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 4,
    marginBottom: 16,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 9,
    alignItems: 'center',
    borderRadius: 20,
  },
  tabItemActive: {
    backgroundColor: COLORS.primary,
  },
  tabLabel: {
    color: COLORS.textSecondary,
    fontSize: 11,
    fontWeight: '600',
  },
  tabLabelActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  grid: {
    gap: 12,
  },
  gridRow: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'flex-start',
  },
  // Profile card
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: COLORS.surface,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  cardGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: 'transparent',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  cardInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'rgba(13,13,15,0.6)',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  cardName: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  pendingBadge: {
    marginTop: 3,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(245,166,35,0.25)',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: COLORS.gold,
  },
  pendingText: {
    color: COLORS.gold,
    fontSize: 10,
    fontWeight: '700',
  },
  // Locked card
  cardLockedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(13,13,15,0.72)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  cardLockEmoji: {
    fontSize: 22,
  },
  cardLockText: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: '700',
  },
  goPremiumButton: {
    marginTop: 6,
    backgroundColor: COLORS.gold,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  goPremiumText: {
    color: '#000000',
    fontSize: 11,
    fontWeight: '800',
  },
  // Messages
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 12,
    gap: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.success,
    borderWidth: 2,
    borderColor: COLORS.background,
  },
  messageContent: {
    flex: 1,
    gap: 3,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  matchName: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '700',
  },
  messageTime: {
    color: COLORS.textTertiary,
    fontSize: 12,
  },
  lastMessage: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  unreadBadge: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  unreadText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
});
