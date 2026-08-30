import React, { useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '@/constants/Colors';
import { AnimatedPressable } from '@/components/AnimatedPressable';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 32;
const CARD_HEIGHT = SCREEN_HEIGHT * 0.62;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

function resolveImageSource(source: string | number | ImageSourcePropType | undefined): ImageSourcePropType {
  if (!source) return { uri: '' };
  if (typeof source === 'string') return { uri: source };
  return source as ImageSourcePropType;
}

export interface Profile {
  id: string;
  name: string;
  age: number;
  distance: string;
  bio: string;
  interests: string[];
  verified: boolean;
}

interface ProfileCardProps {
  profile: Profile;
  onLike: (id: string) => void;
  onPass: (id: string) => void;
  onSuperLike?: (id: string) => void;
  isPremium: boolean;
  isTop: boolean;
}

export function ProfileCard({ profile, onLike, onPass, onSuperLike, isPremium, isTop }: ProfileCardProps) {
  const position = useRef(new Animated.ValueXY()).current;
  const rotate = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp',
  });
  const likeOpacity = position.x.interpolate({
    inputRange: [0, SCREEN_WIDTH / 4],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const passOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 4, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => isTop,
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          console.log('[ProfileCard] Swiped right (like) on profile:', profile.id, profile.name);
          Animated.spring(position, {
            toValue: { x: SCREEN_WIDTH + 100, y: gesture.dy },
            useNativeDriver: true,
          }).start(() => onLike(profile.id));
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          console.log('[ProfileCard] Swiped left (pass) on profile:', profile.id, profile.name);
          Animated.spring(position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gesture.dy },
            useNativeDriver: true,
          }).start(() => onPass(profile.id));
        } else {
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
            friction: 5,
          }).start();
        }
      },
    })
  ).current;

  const cardStyle = {
    transform: [
      { translateX: position.x },
      { translateY: position.y },
      { rotate },
    ],
  };

  const imageUri = `https://picsum.photos/seed/${profile.id}/400/600`;

  const handleLike = useCallback(() => {
    console.log('[ProfileCard] Like button pressed for:', profile.id, profile.name);
    Animated.spring(position, {
      toValue: { x: SCREEN_WIDTH + 100, y: 0 },
      useNativeDriver: true,
    }).start(() => onLike(profile.id));
  }, [profile.id, profile.name, position, onLike]);

  const handlePass = useCallback(() => {
    console.log('[ProfileCard] Pass button pressed for:', profile.id, profile.name);
    Animated.spring(position, {
      toValue: { x: -SCREEN_WIDTH - 100, y: 0 },
      useNativeDriver: true,
    }).start(() => onPass(profile.id));
  }, [profile.id, profile.name, position, onPass]);

  const handleSuperLike = useCallback(() => {
    if (!isPremium) {
      console.log('[ProfileCard] Super like blocked — user is not premium');
      return;
    }
    console.log('[ProfileCard] Super like pressed for:', profile.id, profile.name);
    if (onSuperLike) onSuperLike(profile.id);
  }, [isPremium, profile.id, profile.name, onSuperLike]);

  return (
    <Animated.View
      style={[styles.card, cardStyle]}
      {...(isTop ? panResponder.panHandlers : {})}
    >
      <Image source={resolveImageSource(imageUri)} style={styles.image} />

      {/* Like / Pass overlays */}
      <Animated.View style={[styles.likeOverlay, { opacity: likeOpacity }]}>
        <Text style={styles.likeText}>LIKE</Text>
      </Animated.View>
      <Animated.View style={[styles.passOverlay, { opacity: passOpacity }]}>
        <Text style={styles.passText}>PASS</Text>
      </Animated.View>

      {/* Distance badge */}
      <View style={styles.distanceBadge}>
        <Text style={styles.distanceText}>📍 {profile.distance}</Text>
      </View>

      {/* Verified badge */}
      {profile.verified && (
        <View style={styles.verifiedBadge}>
          <Text style={styles.verifiedText}>✓ Verified</Text>
        </View>
      )}

      {/* Bottom gradient info */}
      <LinearGradient
        colors={['transparent', 'rgba(13,13,15,0.97)']}
        style={styles.gradient}
      >
        <View style={styles.nameRow}>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.age}>{profile.age}</Text>
        </View>
        <Text style={styles.bio} numberOfLines={2}>{profile.bio}</Text>
        <View style={styles.interests}>
          {profile.interests.map((interest) => (
            <View key={interest} style={styles.interestPill}>
              <Text style={styles.interestText}>{interest}</Text>
            </View>
          ))}
        </View>
      </LinearGradient>

      {/* Action buttons */}
      <View style={styles.actions}>
        <AnimatedPressable onPress={handlePass} style={styles.actionBtn}>
          <Text style={styles.passIcon}>✕</Text>
        </AnimatedPressable>

        <AnimatedPressable
          onPress={handleSuperLike}
          style={[styles.actionBtn, styles.superLikeBtn, !isPremium && styles.lockedBtn]}
        >
          {isPremium ? (
            <Text style={styles.superLikeIcon}>⭐</Text>
          ) : (
            <Text style={styles.lockIcon}>🔒</Text>
          )}
        </AnimatedPressable>

        <AnimatedPressable onPress={handleLike} style={[styles.actionBtn, styles.likeBtn]}>
          <Text style={styles.likeIcon}>♥</Text>
        </AnimatedPressable>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: COLORS.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  likeOverlay: {
    position: 'absolute',
    top: 40,
    left: 20,
    borderWidth: 3,
    borderColor: COLORS.success,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    zIndex: 10,
    transform: [{ rotate: '-15deg' }],
  },
  likeText: {
    color: COLORS.success,
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 2,
  },
  passOverlay: {
    position: 'absolute',
    top: 40,
    right: 20,
    borderWidth: 3,
    borderColor: COLORS.danger,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    zIndex: 10,
    transform: [{ rotate: '15deg' }],
  },
  passText: {
    color: COLORS.danger,
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 2,
  },
  distanceBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(13,13,15,0.75)',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    zIndex: 5,
  },
  distanceText: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: '600',
  },
  verifiedBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    zIndex: 5,
  },
  verifiedText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
  gradient: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    marginBottom: 4,
  },
  name: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: '800',
  },
  age: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: '400',
  },
  bio: {
    color: 'rgba(242,240,237,0.85)',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },
  interests: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  interestPill: {
    backgroundColor: 'rgba(200,16,46,0.25)',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(200,16,46,0.4)',
  },
  interestText: {
    color: COLORS.accent,
    fontSize: 12,
    fontWeight: '600',
  },
  actions: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  actionBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  likeBtn: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primaryLight,
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  superLikeBtn: {
    borderColor: COLORS.gold,
  },
  lockedBtn: {
    opacity: 0.6,
  },
  passIcon: {
    color: COLORS.textSecondary,
    fontSize: 22,
    fontWeight: '700',
  },
  likeIcon: {
    color: '#fff',
    fontSize: 26,
  },
  superLikeIcon: {
    fontSize: 22,
  },
  lockIcon: {
    fontSize: 18,
  },
});
