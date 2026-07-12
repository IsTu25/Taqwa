import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  KeyboardAvoidingView, Platform, ActivityIndicator, ScrollView,
} from 'react-native';
import { Link } from 'expo-router';
import { Moon, Mail, Lock } from 'lucide-react-native';
import { logIn } from '../../services/firebase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await logIn(email, password);
      // No manual navigation needed — the AuthGate in root layout
      // detects the auth state change and redirects automatically
    } catch (err: any) {
      setError(mapFirebaseError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.logoContainer}>
          <Moon color="#D4AF37" size={48} />
          <Text style={styles.appName}>Takwa</Text>
          <Text style={styles.tagline}>Your Intelligent Companion for a Righteous Life</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputWrapper}>
            <Mail color="#D4AF37" size={20} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#A0A0A0"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Lock color="#D4AF37" size={20} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#A0A0A0"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity style={styles.primaryButton} onPress={handleLogin} disabled={loading}>
            {loading ? <ActivityIndicator color="#0F2F20" /> : <Text style={styles.primaryButtonText}>Log In</Text>}
          </TouchableOpacity>

          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <Link href="/(auth)/signup" asChild>
              <TouchableOpacity>
                <Text style={styles.footerLink}>Sign Up</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function mapFirebaseError(err: any) {
  console.log('Firebase Error:', err);
  switch (err.code) {
    case 'auth/invalid-email': return 'Invalid email address.';
    case 'auth/user-not-found': return 'No user found with this email.';
    case 'auth/wrong-password': return 'Incorrect password.';
    case 'auth/too-many-requests': return 'Too many attempts. Try again later.';
    default: return err.message || 'Something went wrong. Please try again.';
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F2F20' },
  scrollContent: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  logoContainer: { alignItems: 'center', marginBottom: 40 },
  appName: { color: '#D4AF37', fontSize: 36, fontWeight: 'bold', marginTop: 10 },
  tagline: { color: '#A0A0A0', fontSize: 14, marginTop: 8, textAlign: 'center' },
  form: { width: '100%' },
  inputWrapper: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#1B4332',
    borderRadius: 12, borderWidth: 1, borderColor: 'rgba(212, 175, 55, 0.3)',
    paddingHorizontal: 15, marginBottom: 16, height: 54,
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, color: '#FFFFFF', fontSize: 16 },
  errorText: { color: '#FF4444', marginBottom: 12, textAlign: 'center' },
  primaryButton: {
    backgroundColor: '#D4AF37', borderRadius: 12, height: 54,
    alignItems: 'center', justifyContent: 'center', marginTop: 8,
  },
  primaryButtonText: { color: '#0F2F20', fontSize: 16, fontWeight: 'bold' },
  footerRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
  footerText: { color: '#A0A0A0' },
  footerLink: { color: '#D4AF37', fontWeight: 'bold' },
});
