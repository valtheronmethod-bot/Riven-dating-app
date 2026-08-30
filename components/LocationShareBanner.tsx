import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { COLORS } from '@/constants/Colors';

interface LocationShareBannerProps {
  partnerName: string;
  isSender: boolean;
  onViewLocation: () => void;
  onStopSharing: () => void;
}

export function LocationShareBanner({
  partnerName,
  isSender,
  onViewLocation,
  onStopSharing,
}: LocationShareBannerProps) {
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 0.4, duration: 800, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 800, useNativeDriver: true }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [pulse]);

  const handleViewLocation = () => {
    console.log('[LocationShareBanner] View location pressed for partner:', partnerName);
    onViewLocation();
  };

  const handleStopSharing = () => {
    console.log('[LocationShareBanner] Stop sharing pressed');
    onStopSharing();
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.dot, { opacity: pulse }]} />
      <Text style={styles.text}>
        📍 {isSender ? 'You are' : `${partnerName} is`} sharing location
      </Text>
      <TouchableOpacity onPress={handleViewLocation} style={styles.viewBtn}>
        <Text style={styles.viewBtnText}>View</Text>
      </TouchableOpacity>
      {isSender && (
        <TouchableOpacity onPress={handleStopSharing} style={styles.stopBtn}>
          <Text style={styles.stopBtnText}>Stop</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  text: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  viewBtn: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  viewBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  stopBtn: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  stopBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
});
