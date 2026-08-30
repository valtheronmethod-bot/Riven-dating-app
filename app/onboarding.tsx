import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '@/constants/Colors';
import { AnimatedPressable } from '@/components/AnimatedPressable';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const LOGO_URL = 'https://prod-finalquest-user-projects-storage-bucket-aws.s3.amazonaws.com/user-projects/b786ed0f-b3a9-4fd9-a451-af874d7211fa/assets/images/7c2e5bc3-c614-429b-bb28-aa6d240f2cae.png';

function resolveImageSource(source: string | number | ImageSourcePropType | undefined): ImageSourcePropType {
  if (!source) return { uri: '' };
  if (typeof source === 'string') return { uri: source };
  return source as ImageSourcePropType;
}

const SLIDES = [
  {
    id: '1',
    icon: '❤️',
    title: 'Find Your Match',
    subtitle: 'Real connections, real privacy',
    description: 'Riven helps you discover meaningful connections with people who share your passions — no games, no gimmicks.',
  },
  {
    id: '2',
    icon: '🛡️',
    title: 'Privacy First',
    subtitle: 'Your location, your rules',
    description: 'Our privacy-first Nearby map never shows your exact location. Only approximate areas with minimum 5 people per cluster.',
  },
  {
    id: '3',
    icon: '🔑',
    title: 'Your Rules',
    subtitle: 'Free to connect, premium to unlock',
    description: 'Start for free and upgrade to Riven Premium for zero ads, unlimited likes, and exclusive features.',
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slideRef = useRef<Animated.Value[]>(
    SLIDES.map((_, i) => new Animated.Value(i === 0 ? 1 : 0))
  ).current;

  const goToSlide = (index: number) => {
    console.log('[Onboarding] Navigating to slide:', index);
    Animated.parallel([
      Animated.timing(slideRef[currentSlide], { toValue: 0, duration: 250, useNativeDriver: true }),
      Animated.timing(slideRef[index], { toValue: 1, duration: 250, useNativeDriver: true }),
    ]).start();
    setCurrentSlide(index);
  };

  const handleNext = () => {
    if (currentSlide < SLIDES.length - 1) {
      goToSlide(currentSlide + 1);
    } else {
      handleGetStarted();
    }
  };

  const handleGetStarted = async () => {
    console.log('[Onboarding] Get Started pressed — marking onboarding complete');
    await AsyncStorage.setItem('@riven_has_onboarded', 'true');
    router.replace('/(tabs)/(discover)');
  };

  const handleSkip = () => {
    console.log('[Onboarding] Skip pressed');
    handleGetStarted();
  };

  const slide = SLIDES[currentSlide];
  const isLast = currentSlide === SLIDES.length - 1;

  return (
    <LinearGradient colors={['#0D0D0F', '#1A0008', '#0D0D0F']} style={styles.container}>
      {/* Skip button */}
      <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image source={resolveImageSource(LOGO_URL)} style={styles.logo} resizeMode="contain" />
        <Text style={styles.appName}>RIVEN</Text>
      </View>

      {/* Slide content */}
      <View style={styles.slideContent}>
        <Text style={styles.slideIcon}>{slide.icon}</Text>
        <Text style={styles.slideTitle}>{slide.title}</Text>
        <Text style={styles.slideSubtitle}>{slide.subtitle}</Text>
        <Text style={styles.slideDescription}>{slide.description}</Text>
      </View>

      {/* Dot indicators */}
      <View style={styles.dots}>
        {SLIDES.map((_, i) => (
          <TouchableOpacity key={i} onPress={() => goToSlide(i)}>
            <View style={[styles.dot, i === currentSlide && styles.dotActive]} />
          </TouchableOpacity>
        ))}
      </View>

      {/* CTA Button */}
      <AnimatedPressable onPress={handleNext} style={styles.ctaWrapper}>
        <LinearGradient
          colors={COLORS.gradientPrimary as [string, string]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.ctaBtn}
        >
          <Text style={styles.ctaText}>{isLast ? 'Get Started' : 'Next'}</Text>
        </LinearGradient>
      </AnimatedPressable>

      {isLast && (
        <TouchableOpacity onPress={handleSkip} style={styles.laterBtn}>
          <Text style={styles.laterText}>Maybe Later</Text>
        </TouchableOpacity>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 50,
    paddingHorizontal: 24,
  },
  skipBtn: {
    position: 'absolute',
    top: 60,
    right: 24,
    zIndex: 10,
  },
  skipText: {
    color: COLORS.textSecondary,
    fontSize: 15,
    fontWeight: '600',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 18,
  },
  appName: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 6,
    marginTop: 8,
  },
  slideContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  slideIcon: {
    fontSize: 80,
    marginBottom: 28,
  },
  slideTitle: {
    color: COLORS.text,
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
  },
  slideSubtitle: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
  },
  slideDescription: {
    color: COLORS.textSecondary,
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'center',
  },
  dots: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 32,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.surfaceElevated,
  },
  dotActive: {
    backgroundColor: COLORS.primary,
    width: 24,
  },
  ctaWrapper: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
  },
  ctaBtn: {
    paddingVertical: 18,
    alignItems: 'center',
    borderRadius: 16,
  },
  ctaText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  laterBtn: {
    paddingVertical: 12,
  },
  laterText: {
    color: COLORS.textSecondary,
    fontSize: 15,
    fontWeight: '500',
  },
});
