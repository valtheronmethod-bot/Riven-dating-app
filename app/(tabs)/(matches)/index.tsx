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

export default function MatchesScreen() {
  const router = useRouter();
  const { isPremium } = useSubscription();
  const [loading, setLoading] = useState(true);

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
    console.log('[Matches] Upgrade to see likes pressed');
    router.push('/premium');
  };

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
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.newMatchesScroll} contentContainerStyle={styles.newMatchesContent}>
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

      {/* Ad banner for free users */}
      {!isPremium && (
        <View style={styles.adSection}>
          <AdBanner />
        </View>
      )}

      {/* Who liked you — locked for free users */}
      {!isPremium && (
        <TouchableOpacity style={styles.lockedSection} onPress={handleUpgradePress}>
          <View style={styles.lockedHeader}>
            <Text style={styles.lockedTitle}>👀 People Who Liked You</Text>
            <View style={styles.lockBadge}>
              <Text style={styles.lockBadgeText}>Premium</Text>
            </View>
          </View>
          <View style={styles.blurredAvatars}>
            {['b1', 'b2', 'b3'].map((id) => (
              <View key={id} style={styles.blurredAvatarWrapper}>
                <Image
                  source={resolveImageSource(`https://picsum.photos/seed/${id}/100/100`)}
                  style={[styles.blurredAvatar, { opacity: 0.15 }]}
                  blurRadius={8}
                />
              </View>
            ))}
            <View style={styles.lockedOverlay}>
              <Text style={styles.lockedOverlayText}>🔒 Upgrade to See</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}

      {/* Messages section */}
      <Text style={styles.sectionTitle}>Messages</Text>
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
    marginTop: 8,
  },
  lockedSection: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  lockedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  lockedTitle: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: '700',
  },
  lockBadge: {
    backgroundColor: COLORS.gold,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  lockBadgeText: {
    color: '#000',
    fontSize: 11,
    fontWeight: '800',
  },
  blurredAvatars: {
    flexDirection: 'row',
    gap: 8,
    position: 'relative',
  },
  blurredAvatarWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
  },
  blurredAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  lockedOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockedOverlayText: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '700',
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
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
