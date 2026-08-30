import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { COLORS } from '@/constants/Colors';
import { NearbyMap, Cluster } from '@/components/NearbyMap';
import { useSubscription } from '@/contexts/SubscriptionContext';

const LOCATION_CONSENT_KEY = '@riven_location_consent';
const LOCATION_VISIBILITY_KEY = '@riven_location_visibility';

const MOCK_CLUSTERS: Cluster[] = [
  { id: 'c1', lat: 40.7589, lng: -73.9851, count: 7, label: '5–10 nearby', distance: 'within 1 mile' },
  { id: 'c2', lat: 40.7614, lng: -73.9776, count: 14, label: '10–20 nearby', distance: 'within 2 miles' },
  { id: 'c3', lat: 40.7549, lng: -73.9840, count: 23, label: '20+ nearby', distance: 'within 1 mile' },
  { id: 'c4', lat: 40.7680, lng: -73.9820, count: 6, label: '5–10 nearby', distance: 'within 3 miles' },
  { id: 'c5', lat: 40.7520, lng: -73.9900, count: 11, label: '10–20 nearby', distance: 'within 2 miles' },
];

const CENTER_LAT = 40.7580;
const CENTER_LNG = -73.9855;

export default function NearbyScreen() {
  const router = useRouter();
  const { isPremium } = useSubscription();
  const [hasConsent, setHasConsent] = useState<boolean | null>(null);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [selectedCluster, setSelectedCluster] = useState<Cluster | null>(null);
  const [visibility, setVisibility] = useState<'hidden' | 'general'>('general');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      console.log('[Nearby] Initializing location consent check');
      const consent = await AsyncStorage.getItem(LOCATION_CONSENT_KEY);
      const vis = await AsyncStorage.getItem(LOCATION_VISIBILITY_KEY);
      if (vis) setVisibility(vis as 'hidden' | 'general');
      if (consent === null) {
        setShowConsentModal(true);
      } else {
        setHasConsent(consent === 'true');
      }
      setTimeout(() => setLoading(false), 800);
    };
    init();
  }, []);

  const handleAllowConsent = async () => {
    console.log('[Nearby] User allowed approximate location');
    await AsyncStorage.setItem(LOCATION_CONSENT_KEY, 'true');
    setHasConsent(true);
    setShowConsentModal(false);
  };

  const handleDenyConsent = async () => {
    console.log('[Nearby] User denied location consent');
    await AsyncStorage.setItem(LOCATION_CONSENT_KEY, 'false');
    setHasConsent(false);
    setShowConsentModal(false);
  };

  const handleClusterTap = (cluster: Cluster) => {
    console.log('[Nearby] Cluster tapped:', cluster.id, cluster.label);
    setSelectedCluster(cluster);
  };

  const handlePrivacySettings = () => {
    console.log('[Nearby] Privacy settings button pressed');
    router.push('/privacy-settings');
  };

  const visibilityLabel = visibility === 'hidden' ? 'Hidden from Nearby' : 'Showing general area';
  const visibilityColor = visibility === 'hidden' ? COLORS.textSecondary : COLORS.success;

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading nearby map...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Nearby</Text>
          <View style={styles.visibilityRow}>
            <View style={[styles.visibilityDot, { backgroundColor: visibilityColor }]} />
            <Text style={[styles.visibilityText, { color: visibilityColor }]}>{visibilityLabel}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={handlePrivacySettings} style={styles.privacyBtn}>
          <Text style={styles.privacyBtnText}>🔒 Privacy</Text>
        </TouchableOpacity>
      </View>

      {/* Map */}
      {hasConsent ? (
        <NearbyMap
          clusters={MOCK_CLUSTERS}
          centerLat={CENTER_LAT}
          centerLng={CENTER_LNG}
          onClusterTap={handleClusterTap}
        />
      ) : (
        <View style={styles.noConsentContainer}>
          <Text style={styles.noConsentIcon}>🗺️</Text>
          <Text style={styles.noConsentTitle}>Location Access Needed</Text>
          <Text style={styles.noConsentText}>
            Enable approximate location to see people nearby. Your exact location is never shown.
          </Text>
          <TouchableOpacity style={styles.enableBtn} onPress={() => {
            console.log('[Nearby] Enable location pressed from no-consent state');
            setShowConsentModal(true);
          }}>
            <Text style={styles.enableBtnText}>Enable Nearby</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Privacy disclaimer */}
      <View style={styles.disclaimer}>
        <Text style={styles.disclaimerText}>
          🛡️ Approximate areas only · No individual pins · Min. 5 people per cluster
        </Text>
      </View>

      {/* Location Consent Modal */}
      <Modal visible={showConsentModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.consentModal}>
            <Text style={styles.consentIcon}>🛡️</Text>
            <Text style={styles.consentTitle}>Privacy-First Location</Text>
            <Text style={styles.consentBody}>
              Your exact location is never shown on Nearby. We use your approximate area to show people around you. Exact location can only be shared by you in a chat, for a time you choose.
            </Text>
            <View style={styles.featureList}>
              {[
                'Approximate area only on map',
                'Minimum 5 people per cluster',
                'No individual pins ever',
                'Chat sharing is time-limited & revocable',
              ].map((feature) => (
                <View key={feature} style={styles.featureRow}>
                  <Text style={styles.featureCheck}>✓</Text>
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
            <TouchableOpacity style={styles.allowBtn} onPress={handleAllowConsent}>
              <Text style={styles.allowBtnText}>Allow Approximate Location</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.notNowBtn} onPress={handleDenyConsent}>
              <Text style={styles.notNowText}>Not Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Cluster bottom sheet */}
      {selectedCluster && (
        <TouchableOpacity
          style={styles.clusterSheetOverlay}
          activeOpacity={1}
          onPress={() => setSelectedCluster(null)}
        >
          <View style={styles.clusterSheet}>
            <View style={styles.clusterSheetHandle} />
            <Text style={styles.clusterSheetTitle}>
              {selectedCluster.count} people nearby in this area
            </Text>
            <Text style={styles.clusterSheetDist}>{selectedCluster.distance}</Text>
            <Text style={styles.clusterSheetNote}>
              These are approximate areas only. Exact locations are never shared.
            </Text>
            {isPremium && (
              <TouchableOpacity
                style={styles.chatShareBtn}
                onPress={() => {
                  console.log('[Nearby] Start chat to share location pressed');
                  setSelectedCluster(null);
                }}
              >
                <Text style={styles.chatShareBtnText}>Start a chat to share your location privately</Text>
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 12,
    backgroundColor: COLORS.background,
    zIndex: 10,
  },
  headerTitle: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: '800',
  },
  visibilityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  visibilityDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  visibilityText: {
    fontSize: 12,
    fontWeight: '600',
  },
  privacyBtn: {
    backgroundColor: COLORS.surfaceSecondary,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  privacyBtnText: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: '600',
  },
  noConsentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 12,
  },
  noConsentIcon: {
    fontSize: 64,
    marginBottom: 8,
  },
  noConsentTitle: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
  },
  noConsentText: {
    color: COLORS.textSecondary,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
  enableBtn: {
    marginTop: 16,
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingHorizontal: 32,
    paddingVertical: 14,
  },
  enableBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  disclaimer: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  disclaimerText: {
    color: COLORS.textTertiary,
    fontSize: 11,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  consentModal: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 28,
    paddingBottom: 40,
    alignItems: 'center',
  },
  consentIcon: {
    fontSize: 56,
    marginBottom: 16,
  },
  consentTitle: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 12,
    textAlign: 'center',
  },
  consentBody: {
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 20,
  },
  featureList: {
    width: '100%',
    gap: 10,
    marginBottom: 24,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  featureCheck: {
    color: COLORS.success,
    fontSize: 16,
    fontWeight: '700',
  },
  featureText: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '500',
  },
  allowBtn: {
    width: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  allowBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  notNowBtn: {
    paddingVertical: 12,
  },
  notNowText: {
    color: COLORS.textSecondary,
    fontSize: 15,
    fontWeight: '500',
  },
  clusterSheetOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    justifyContent: 'flex-end',
  },
  clusterSheet: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  clusterSheetHandle: {
    width: 36,
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  clusterSheetTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  clusterSheetDist: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  clusterSheetNote: {
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  chatShareBtn: {
    marginTop: 16,
    backgroundColor: COLORS.primaryMuted,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  chatShareBtnText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});
