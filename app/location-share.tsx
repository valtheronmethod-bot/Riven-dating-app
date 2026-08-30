import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS } from '@/constants/Colors';
import { AnimatedPressable } from '@/components/AnimatedPressable';

const DURATION_OPTIONS = [
  { id: '15m', label: '15 minutes', icon: '⏱️' },
  { id: '1h', label: '1 hour', icon: '🕐' },
  { id: 'tonight', label: 'Until tonight (midnight)', icon: '🌙' },
  { id: 'custom', label: 'Custom', icon: '⚙️' },
];

export default function LocationShareScreen() {
  const router = useRouter();
  const [selectedDuration, setSelectedDuration] = useState('1h');

  const handleDurationSelect = (id: string) => {
    console.log('[LocationShare] Duration selected:', id);
    setSelectedDuration(id);
  };

  const handleStartSharing = () => {
    const selected = DURATION_OPTIONS.find(d => d.id === selectedDuration);
    console.log('[LocationShare] Start sharing pressed with duration:', selected?.label);
    router.back();
  };

  const handleCancel = () => {
    console.log('[LocationShare] Cancel pressed');
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.handle} />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.icon}>📍</Text>
        <Text style={styles.title}>Share Your Location</Text>
        <Text style={styles.subtitle}>Choose how long to share. You can stop anytime.</Text>

        <View style={styles.options}>
          {DURATION_OPTIONS.map((option) => {
            const isSelected = selectedDuration === option.id;
            return (
              <TouchableOpacity
                key={option.id}
                style={[styles.option, isSelected && styles.optionSelected]}
                onPress={() => handleDurationSelect(option.id)}
              >
                <Text style={styles.optionIcon}>{option.icon}</Text>
                <Text style={[styles.optionLabel, isSelected && styles.optionLabelSelected]}>
                  {option.label}
                </Text>
                <View style={[styles.radio, isSelected && styles.radioSelected]}>
                  {isSelected && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.privacyNote}>
          <Text style={styles.privacyNoteIcon}>🔒</Text>
          <Text style={styles.privacyNoteText}>
            Your exact location is only visible to your match while the share is active. It cannot be forwarded and expires automatically.
          </Text>
        </View>

        <AnimatedPressable onPress={handleStartSharing} style={styles.startBtn}>
          <Text style={styles.startBtnText}>Start Sharing</Text>
        </AnimatedPressable>

        <TouchableOpacity onPress={handleCancel} style={styles.cancelBtn}>
          <Text style={styles.cancelBtnText}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  handle: {
    width: 36,
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 4,
  },
  content: {
    padding: 24,
    paddingBottom: 40,
    alignItems: 'center',
  },
  icon: {
    fontSize: 52,
    marginBottom: 12,
  },
  title: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  options: {
    width: '100%',
    gap: 10,
    marginBottom: 24,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceSecondary,
    borderRadius: 14,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  optionSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryMuted,
  },
  optionIcon: {
    fontSize: 20,
  },
  optionLabel: {
    flex: 1,
    color: COLORS.textSecondary,
    fontSize: 15,
    fontWeight: '500',
  },
  optionLabelSelected: {
    color: COLORS.text,
    fontWeight: '700',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.textTertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: COLORS.primary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  privacyNote: {
    flexDirection: 'row',
    backgroundColor: COLORS.surfaceSecondary,
    borderRadius: 12,
    padding: 14,
    gap: 10,
    marginBottom: 24,
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  privacyNoteIcon: {
    fontSize: 16,
  },
  privacyNoteText: {
    flex: 1,
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 20,
  },
  startBtn: {
    width: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  startBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
  cancelBtn: {
    paddingVertical: 12,
  },
  cancelBtnText: {
    color: COLORS.textSecondary,
    fontSize: 15,
    fontWeight: '500',
  },
});
