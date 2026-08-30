import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  ImageSourcePropType,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS } from '@/constants/Colors';
import { AnimatedPressable } from '@/components/AnimatedPressable';

function resolveImageSource(source: string | number | ImageSourcePropType | undefined): ImageSourcePropType {
  if (!source) return { uri: '' };
  if (typeof source === 'string') return { uri: source };
  return source as ImageSourcePropType;
}

const ALL_INTERESTS = [
  'Hiking', 'Coffee', 'Travel', 'Photography', 'Music', 'Art', 'Cooking',
  'Yoga', 'Books', 'Meditation', 'Tech', 'Gaming', 'Fitness', 'Food',
  'Animals', 'Movies', 'Design', 'Dance', 'Business', 'Dogs',
];

export default function EditProfileScreen() {
  const router = useRouter();
  const [name, setName] = useState('You');
  const [age, setAge] = useState('27');
  const [bio, setBio] = useState('Living life one adventure at a time. Coffee lover, weekend hiker.');
  const [occupation, setOccupation] = useState('');
  const [education, setEducation] = useState('');
  const [height, setHeight] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Hiking', 'Coffee', 'Travel', 'Photography']);

  const handleInterestToggle = (interest: string) => {
    console.log('[EditProfile] Interest toggled:', interest);
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSave = () => {
    console.log('[EditProfile] Save pressed — name:', name, 'age:', age, 'interests:', selectedInterests);
    Alert.alert('Saved!', 'Your profile has been updated.');
    router.back();
  };

  const handleBack = () => {
    console.log('[EditProfile] Back pressed');
    router.back();
  };

  const handleAddPhoto = () => {
    console.log('[EditProfile] Add photo pressed');
    Alert.alert('Add Photo', 'Photo picker would open here.');
  };

  const photos = [
    'https://picsum.photos/seed/myprofile/200/200',
    null, null, null, null, null,
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* Photos grid */}
      <Text style={styles.sectionTitle}>Photos</Text>
      <View style={styles.photosGrid}>
        {photos.map((photo, index) => (
          <TouchableOpacity key={index} style={styles.photoSlot} onPress={handleAddPhoto}>
            {photo ? (
              <Image source={resolveImageSource(photo)} style={styles.photoImage} />
            ) : (
              <View style={styles.photoEmpty}>
                <Text style={styles.photoEmptyIcon}>+</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Basic info */}
      <Text style={styles.sectionTitle}>Basic Info</Text>
      <View style={styles.card}>
        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholderTextColor={COLORS.textTertiary}
          />
        </View>
        <View style={styles.divider} />
        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>Age</Text>
          <TextInput
            style={styles.input}
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
            placeholderTextColor={COLORS.textTertiary}
          />
        </View>
        <View style={styles.divider} />
        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>Height</Text>
          <TextInput
            style={styles.input}
            value={height}
            onChangeText={setHeight}
            placeholder="e.g. 5ft 10in"
            placeholderTextColor={COLORS.textTertiary}
          />
        </View>
        <View style={styles.divider} />
        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>Occupation</Text>
          <TextInput
            style={styles.input}
            value={occupation}
            onChangeText={setOccupation}
            placeholder="Your job"
            placeholderTextColor={COLORS.textTertiary}
          />
        </View>
        <View style={styles.divider} />
        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>Education</Text>
          <TextInput
            style={styles.input}
            value={education}
            onChangeText={setEducation}
            placeholder="Your school"
            placeholderTextColor={COLORS.textTertiary}
          />
        </View>
      </View>

      {/* Bio */}
      <Text style={styles.sectionTitle}>Bio</Text>
      <View style={styles.card}>
        <TextInput
          style={styles.bioInput}
          value={bio}
          onChangeText={setBio}
          multiline
          maxLength={300}
          placeholderTextColor={COLORS.textTertiary}
          placeholder="Tell people about yourself..."
        />
        <Text style={styles.charCount}>{bio.length}/300</Text>
      </View>

      {/* Interests */}
      <Text style={styles.sectionTitle}>Interests</Text>
      <View style={styles.interestsGrid}>
        {ALL_INTERESTS.map((interest) => {
          const isSelected = selectedInterests.includes(interest);
          return (
            <TouchableOpacity
              key={interest}
              style={[styles.interestChip, isSelected && styles.interestChipSelected]}
              onPress={() => handleInterestToggle(interest)}
            >
              <Text style={[styles.interestChipText, isSelected && styles.interestChipTextSelected]}>
                {interest}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Save button */}
      <AnimatedPressable onPress={handleSave} style={styles.saveBtn}>
        <Text style={styles.saveBtnText}>Save Changes</Text>
      </AnimatedPressable>
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
    flex: 1,
  },
  saveText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '700',
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
  photosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 8,
  },
  photoSlot: {
    width: '30%',
    aspectRatio: 0.75,
    borderRadius: 12,
    overflow: 'hidden',
  },
  photoImage: {
    width: '100%',
    height: '100%',
  },
  photoEmpty: {
    flex: 1,
    backgroundColor: COLORS.surfaceSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
    borderRadius: 12,
  },
  photoEmptyIcon: {
    color: COLORS.textTertiary,
    fontSize: 28,
    fontWeight: '300',
  },
  card: {
    marginHorizontal: 16,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  inputLabel: {
    color: COLORS.textSecondary,
    fontSize: 14,
    width: 90,
  },
  input: {
    flex: 1,
    color: COLORS.text,
    fontSize: 15,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.divider,
    marginHorizontal: 16,
  },
  bioInput: {
    color: COLORS.text,
    fontSize: 15,
    lineHeight: 22,
    padding: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  charCount: {
    color: COLORS.textTertiary,
    fontSize: 12,
    textAlign: 'right',
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 8,
  },
  interestChip: {
    backgroundColor: COLORS.surfaceSecondary,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  interestChipSelected: {
    backgroundColor: COLORS.primaryMuted,
    borderColor: COLORS.primary,
  },
  interestChipText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: '500',
  },
  interestChipTextSelected: {
    color: COLORS.accent,
    fontWeight: '700',
  },
  saveBtn: {
    marginHorizontal: 16,
    marginTop: 24,
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
});
