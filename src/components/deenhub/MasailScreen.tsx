import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView,
  ActivityIndicator, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Send } from 'lucide-react-native';
import { askMasailBot } from '../../services/aiService';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

export default function MasailScreen() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: 'Assalamu Alaikum! Ask me any everyday Fiqh question, in English or Bangla.' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  const send = async () => {
    if (!input.trim() || loading) return;
    const question = input.trim();
    setMessages((m) => [...m, { role: 'user', text: question }]);
    setInput('');
    setLoading(true);

    const answer = await askMasailBot(question);
    setMessages((m) => [...m, { role: 'bot', text: answer }]);
    setLoading(false);
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <ScrollView ref={scrollRef} contentContainerStyle={styles.messages}>
        {messages.map((m, i) => (
          <View key={i} style={[styles.bubble, m.role === 'user' ? styles.userBubble : styles.botBubble]}>
            <Text style={[styles.bubbleText, m.role === 'user' && styles.userBubbleText]}>{m.text}</Text>
          </View>
        ))}
        {loading && <ActivityIndicator color="#D4AF37" style={{ marginTop: 8 }} />}
      </ScrollView>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Ask a Fiqh question..."
          placeholderTextColor="#A0A0A0"
          onSubmitEditing={send}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={send} disabled={loading}>
          <Send color="#0F2F20" size={20} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  messages: { padding: 16, paddingBottom: 24 },
  bubble: { maxWidth: '85%', borderRadius: 14, padding: 12, marginBottom: 10 },
  userBubble: { backgroundColor: '#D4AF37', alignSelf: 'flex-end' },
  botBubble: { backgroundColor: '#1B4332', alignSelf: 'flex-start', borderWidth: 1, borderColor: 'rgba(212, 175, 55, 0.3)' },
  bubbleText: { color: '#FFFFFF', fontSize: 14, lineHeight: 20 },
  userBubbleText: { color: '#0F2F20' },
  inputRow: {
    flexDirection: 'row', padding: 12, alignItems: 'center',
    borderTopWidth: 1, borderTopColor: 'rgba(212, 175, 55, 0.2)',
  },
  input: {
    flex: 1, backgroundColor: '#1B4332', color: '#FFFFFF', borderRadius: 20,
    paddingHorizontal: 16, paddingVertical: 10, marginRight: 10,
  },
  sendBtn: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: '#D4AF37',
    alignItems: 'center', justifyContent: 'center',
  },
});
