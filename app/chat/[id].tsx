import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { COLORS } from '@/constants/Colors';
import { LocationShareBanner } from '@/components/LocationShareBanner';

function resolveImageSource(source: string | number | ImageSourcePropType | undefined): ImageSourcePropType {
  if (!source) return { uri: '' };
  if (typeof source === 'string') return { uri: source };
  return source as ImageSourcePropType;
}

const MATCH_NAMES: Record<string, string> = {
  m1: 'Sophia',
  m2: 'Luna',
  m3: 'Aria',
  m4: 'Zoe',
  m5: 'Mia',
  n1: 'Jordan',
  n2: 'Ethan',
  n3: 'Kai',
};

const MOCK_MESSAGES = [
  { id: '1', text: 'Hey! I saw you like hiking too 😊', sent: false, time: '2:30 PM' },
  { id: '2', text: "Yes! I go every weekend. Do you have a favorite trail?", sent: true, time: '2:31 PM' },
  { id: '3', text: 'I love the Appalachian Trail! Have you been?', sent: false, time: '2:32 PM' },
  { id: '4', text: "Not yet but it's on my list! Maybe we could go together sometime 😄", sent: true, time: '2:33 PM' },
  { id: '5', text: "I'd love that! Are you free this weekend?", sent: false, time: '2:34 PM' },
];

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [locationShareActive, setLocationShareActive] = useState(false);

  const matchName = MATCH_NAMES[id] ?? 'Match';
  const avatarUri = `https://picsum.photos/seed/${id}/200/200`;

  const handleSend = () => {
    if (!inputText.trim()) return;
    console.log('[Chat] Sending message to:', matchName, '| text:', inputText.trim());
    const newMsg = {
      id: String(Date.now()),
      text: inputText.trim(),
      sent: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, newMsg]);
    setInputText('');
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const handleLocationShare = () => {
    console.log('[Chat] Location share button pressed');
    router.push('/location-share');
  };

  const handleBack = () => {
    console.log('[Chat] Back button pressed');
    router.back();
  };

  const handleViewLocation = () => {
    console.log('[Chat] View location pressed');
  };

  const handleStopSharing = () => {
    console.log('[Chat] Stop location sharing pressed');
    setLocationShareActive(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={0}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Image source={resolveImageSource(avatarUri)} style={styles.headerAvatar} />
        <View style={styles.headerInfo}>
          <Text style={styles.headerName}>{matchName}</Text>
          <Text style={styles.headerStatus}>Online now</Text>
        </View>
        <TouchableOpacity style={styles.moreBtn}>
          <Text style={styles.moreIcon}>•••</Text>
        </TouchableOpacity>
      </View>

      {/* Location share banner */}
      {locationShareActive && (
        <LocationShareBanner
          partnerName={matchName}
          isSender={false}
          onViewLocation={handleViewLocation}
          onStopSharing={handleStopSharing}
        />
      )}

      {/* Messages */}
      <ScrollView
        ref={scrollRef}
        style={styles.messages}
        contentContainerStyle={styles.messagesContent}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: false })}
      >
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[styles.messageBubbleWrapper, msg.sent ? styles.sentWrapper : styles.receivedWrapper]}
          >
            <View style={[styles.bubble, msg.sent ? styles.sentBubble : styles.receivedBubble]}>
              <Text style={[styles.bubbleText, msg.sent ? styles.sentText : styles.receivedText]}>
                {msg.text}
              </Text>
            </View>
            <Text style={styles.messageTime}>{msg.time}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Input bar */}
      <View style={styles.inputBar}>
        <TouchableOpacity style={styles.attachBtn}>
          <Text style={styles.attachIcon}>📎</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
          placeholderTextColor={COLORS.textTertiary}
          multiline
          maxLength={500}
          onSubmitEditing={handleSend}
        />
        <TouchableOpacity style={styles.locationBtn} onPress={handleLocationShare}>
          <Text style={styles.locationIcon}>📍</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sendBtn, !inputText.trim() && styles.sendBtnDisabled]}
          onPress={handleSend}
          disabled={!inputText.trim()}
        >
          <Text style={styles.sendIcon}>↑</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 56,
    paddingBottom: 12,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    gap: 10,
  },
  backBtn: {
    padding: 4,
  },
  backIcon: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: '600',
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerInfo: {
    flex: 1,
  },
  headerName: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '700',
  },
  headerStatus: {
    color: COLORS.success,
    fontSize: 12,
  },
  moreBtn: {
    padding: 4,
  },
  moreIcon: {
    color: COLORS.textSecondary,
    fontSize: 14,
    letterSpacing: 1,
  },
  messages: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    gap: 8,
  },
  messageBubbleWrapper: {
    maxWidth: '80%',
    gap: 3,
  },
  sentWrapper: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  receivedWrapper: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  bubble: {
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  sentBubble: {
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 4,
  },
  receivedBubble: {
    backgroundColor: COLORS.surface,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  bubbleText: {
    fontSize: 15,
    lineHeight: 22,
  },
  sentText: {
    color: '#fff',
  },
  receivedText: {
    color: COLORS.text,
  },
  messageTime: {
    color: COLORS.textTertiary,
    fontSize: 11,
    marginHorizontal: 4,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 10,
    paddingBottom: Platform.OS === 'ios' ? 28 : 10,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    gap: 8,
  },
  attachBtn: {
    padding: 6,
  },
  attachIcon: {
    fontSize: 20,
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.surfaceSecondary,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: COLORS.text,
    fontSize: 15,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  locationBtn: {
    padding: 6,
  },
  locationIcon: {
    fontSize: 20,
  },
  sendBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnDisabled: {
    backgroundColor: COLORS.surfaceElevated,
  },
  sendIcon: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
