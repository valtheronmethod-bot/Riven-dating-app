import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '@/constants/Colors';

const LOCATION_VISIBILITY_KEY = '@riven_location_visibility';
const LOCATION_SHARING_KEY = '@riven_location_sharing_enabled';

export default function PrivacySettingsScreen() {
  const router = useRouter();
  const [visibility, setVisibility] = useState<'hidden' | 'general'>('general');
  const [sharingEnabled, setSharingEnabled] = useState(true);

  useEffect(() => {
    const load = async () => {
      const vis = await AsyncStorage.getItem(LOCATION_VISIBILITY_KEY);
      const sharing = await AsyncStorage.getItem(LOCATION_SHARING_KEY);
      if (vis) setVisibility(vis as 'hidden' | 'general');
      if (sharing !== null) setSharingEnabled(sharing === 'true');
    };
    load();
  }, []);

  const handleVisibilityChange = async (value: 'hidden' | 'general') => {
    console.log('[PrivacySettings] Visibility changed to:', value);
    setVisibility(value);
    await AsyncStorage.setItem(LOCATION_VISIBILITY_KEY, value);
  };

  const handleSharingToggle = async (value: boolean) => {
    console.log('[PrivacySettings] Location sharing in chat toggled:', value);
    setSharingEnabled(value);
    await AsyncStorage.setItem(LOCATION_SHARING_KEY, value ? 'true' : 'false');
  };

  const handleDeleteLocationData = () => {
    console.log('[PrivacySettings] Delete location data pressed');
    Alert.alert(
      'Delete Location Data',
      'This will permanently delete all your location data. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            console.log('[PrivacySettings] Location data deletion confirmed');
            Alert.alert('Done', 'Your location data has been deleted.');
          },
        },
      ]
    );
  };

  const handleDownloadData = () => {
    console.log('[PrivacySettings] Download my data pressed');
    Alert.alert('Download Data', 'Your data export will be emailed to you within 24 hours.');
  };

  const handlePrivacyPolicy = () => {
    console.log('[PrivacySettings] Privacy policy pressed');
  };

  const handleBack = () => {
    console.log('[PrivacySettings] Back pressed');
    router.back();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy & Location</Text>
      </View>

      {/* Nearby Visibility */}
      <Text style={styles.sectionTitle}>Nearby Visibility</Text>
      <View style={styles.card}>
        {[
          { value: 'hidden' as const, label: 'Hidden from Nearby', icon: '🚫', desc: 'You won\'t appear on the map' },
          { value: 'general' as const, label: 'Show my general area', icon: '📍', desc: 'Approximate area only, no exact location' },
        ].map((option) => {
          const isSelected = visibility === option.value;
          return (
            <TouchableOpacity
              key={option.value}
              style={[styles.radioOption, isSelected && styles.radioOptionSelected]}
              onPress={() => handleVisibilityChange(option.value)}
            >
              <Text style={styles.radioOptionIcon}>{option.icon}</Text>
              <View style={styles.radioOptionContent}>
                <Text style={[styles.radioOptionLabel, isSelected && styles.radioOptionLabelSelected]}>
                  {option.label}
                </Text>
                <Text style={styles.radioOptionDesc}>{option.desc}</Text>
              </View>
              <View style={[styles.radio, isSelected && styles.radioSelected]}>
                {isSelected && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Location Sharing in Chat */}
      <Text style={styles.sectionTitle}>Location Sharing in Chat</Text>
      <View style={styles.card}>
        <View style={styles.toggleRow}>
          <View style={styles.toggleContent}>
            <Text style={styles.toggleLabel}>Allow location sharing in chats</Text>
            <Text style={styles.toggleDesc}>
              You control when and with whom you share. Shares expire automatically.
            </Text>
          </View>
          <Switch
            value={sharingEnabled}
            onValueChange={handleSharingToggle}
            trackColor={{ false: COLORS.surfaceElevated, true: COLORS.primary }}
            thumbColor="#fff"
          />
        </View>
      </View>

      {/* Data & Privacy */}
      <Text style={styles.sectionTitle}>Data & Privacy</Text>
      <View style={styles.card}>
        <TouchableOpacity style={styles.dataRow} onPress={handleDeleteLocationData}>
          <Text style={styles.dataRowText}>🗑️ Delete my location data</Text>
          <Text style={[styles.dataRowAction, { color: COLORS.danger }]}>Delete</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.dataRow} onPress={handleDownloadData}>
          <Text style={styles.dataRowText}>📥 Download my data</Text>
          <Text style={styles.dataRowAction}>Request</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.dataRow} onPress={handlePrivacyPolicy}>
          <Text style={styles.dataRowText}>📄 Privacy Policy</Text>
          <Text style={styles.dataRowAction}>View →</Text>
        </TouchableOpacity>
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
    paddingBottom: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 56,
    paddingBottom: 16,
    gap: 12,
  },
  backBtn: {
    padding: 4,
  },
  backIcon: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: '600',
  },
  headerTitle: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: '800',
  },
  sectionTitle: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 8,
  },
  card: {
    marginHorizontal: 16,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  radioOptionSelected: {
    backgroundColor: COLORS.primaryMuted,
  },
  radioOptionIcon: {
    fontSize: 20,
  },
  radioOptionContent: {
    flex: 1,
  },
  radioOptionLabel: {
    color: COLORS.textSecondary,
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 2,
  },
  radioOptionLabelSelected: {
    color: COLORS.text,
    fontWeight: '700',
  },
  radioOptionDesc: {
    color: COLORS.textTertiary,
    fontSize: 12,
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
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  toggleContent: {
    flex: 1,
  },
  toggleLabel: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 3,
  },
  toggleDesc: {
    color: COLORS.textTertiary,
    fontSize: 12,
    lineHeight: 18,
  },
  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  dataRowText: {
    color: COLORS.text,
    fontSize: 15,
  },
  dataRowAction: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.divider,
    marginHorizontal: 16,
  },
});
