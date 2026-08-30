import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS } from '@/constants/Colors';
import { useSubscription } from '@/contexts/SubscriptionContext';

interface SettingsRowProps {
  icon: string;
  label: string;
  onPress: () => void;
  danger?: boolean;
  value?: string;
}

function SettingsRow({ icon, label, onPress, danger, value }: SettingsRowProps) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <Text style={styles.rowIcon}>{icon}</Text>
      <Text style={[styles.rowLabel, danger && styles.rowLabelDanger]}>{label}</Text>
      {value && <Text style={styles.rowValue}>{value}</Text>}
      <Text style={styles.rowArrow}>›</Text>
    </TouchableOpacity>
  );
}

export default function SettingsScreen() {
  const router = useRouter();
  const { isPremium } = useSubscription();

  const handleBack = () => {
    console.log('[Settings] Back pressed');
    router.back();
  };

  const handleEditProfile = () => {
    console.log('[Settings] Edit profile pressed');
    router.push('/edit-profile');
  };

  const handlePrivacySettings = () => {
    console.log('[Settings] Privacy settings pressed');
    router.push('/privacy-settings');
  };

  const handleNotifications = () => {
    console.log('[Settings] Notifications pressed');
    Alert.alert('Notifications', 'Notification settings coming soon.');
  };

  const handlePremium = () => {
    console.log('[Settings] Premium pressed — navigating to paywall');
    router.push('/paywall');
  };

  const handleHelpCenter = () => {
    console.log('[Settings] Help center pressed');
    Alert.alert('Help Center', 'Visit riven.app/help for support.');
  };

  const handleReportBug = () => {
    console.log('[Settings] Report a bug pressed');
    Alert.alert('Report a Bug', 'Email bugs@riven.app with details.');
  };

  const handleContactUs = () => {
    console.log('[Settings] Contact us pressed');
    Alert.alert('Contact Us', 'Email hello@riven.app');
  };

  const handlePrivacyPolicy = () => {
    console.log('[Settings] Privacy policy pressed');
  };

  const handleTerms = () => {
    console.log('[Settings] Terms of service pressed');
  };

  const handleDeleteAccount = () => {
    console.log('[Settings] Delete account pressed');
    Alert.alert(
      'Delete Account',
      'This will permanently delete your account and all data. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete Account',
          style: 'destructive',
          onPress: () => console.log('[Settings] Delete account confirmed'),
        },
      ]
    );
  };

  const handleSignOut = () => {
    console.log('[Settings] Sign out pressed');
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: () => {
          console.log('[Settings] Sign out confirmed');
          router.replace('/onboarding');
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      {/* Account */}
      <Text style={styles.sectionTitle}>Account</Text>
      <View style={styles.card}>
        <SettingsRow icon="✏️" label="Edit Profile" onPress={handleEditProfile} />
        <View style={styles.divider} />
        <SettingsRow icon="🔒" label="Privacy & Location" onPress={handlePrivacySettings} />
        <View style={styles.divider} />
        <SettingsRow icon="🔔" label="Notifications" onPress={handleNotifications} />
      </View>

      {/* Premium */}
      <Text style={styles.sectionTitle}>Premium</Text>
      <View style={styles.card}>
        <SettingsRow
          icon="⭐"
          label={isPremium ? 'Manage Subscription' : 'Upgrade to Premium'}
          onPress={handlePremium}
          value={isPremium ? 'Active' : '$19.99/mo'}
        />
      </View>

      {/* Support */}
      <Text style={styles.sectionTitle}>Support</Text>
      <View style={styles.card}>
        <SettingsRow icon="❓" label="Help Center" onPress={handleHelpCenter} />
        <View style={styles.divider} />
        <SettingsRow icon="🐛" label="Report a Bug" onPress={handleReportBug} />
        <View style={styles.divider} />
        <SettingsRow icon="✉️" label="Contact Us" onPress={handleContactUs} />
      </View>

      {/* Legal */}
      <Text style={styles.sectionTitle}>Legal</Text>
      <View style={styles.card}>
        <SettingsRow icon="📄" label="Privacy Policy" onPress={handlePrivacyPolicy} />
        <View style={styles.divider} />
        <SettingsRow icon="📋" label="Terms of Service" onPress={handleTerms} />
      </View>

      {/* Danger Zone */}
      <Text style={styles.sectionTitle}>Danger Zone</Text>
      <View style={styles.card}>
        <SettingsRow icon="🗑️" label="Delete Account" onPress={handleDeleteAccount} danger />
      </View>

      {/* Sign Out */}
      <TouchableOpacity style={styles.signOutBtn} onPress={handleSignOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 15,
    gap: 12,
  },
  rowIcon: {
    fontSize: 18,
    width: 24,
    textAlign: 'center',
  },
  rowLabel: {
    flex: 1,
    color: COLORS.text,
    fontSize: 15,
  },
  rowLabelDanger: {
    color: COLORS.danger,
  },
  rowValue: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  rowArrow: {
    color: COLORS.textTertiary,
    fontSize: 18,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.divider,
    marginHorizontal: 16,
  },
  signOutBtn: {
    marginHorizontal: 16,
    marginTop: 24,
    backgroundColor: COLORS.surfaceSecondary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  signOutText: {
    color: COLORS.danger,
    fontSize: 16,
    fontWeight: '700',
  },
});
