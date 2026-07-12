import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  KeyboardAvoidingView, Platform, ActivityIndicator, ScrollView,
} from 'react-native';
import { Link } from 'expo-router';
import { Moon, Mail, Lock, User } from 'lucide-react-native';
import { signUp } from '../../services/firebase';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async () => {
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await signUp(email, password, name);
      // AuthGate redirects automatically on success
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
          <Text style={styles.appName}>Create Account</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputWrapper}>
            <User color="#D4AF37" size={20} style={styles.inputIcon} />
            <TextInput style={styles.input} placeholder="Full Name" placeholderTextColor="#A0A0A0" value={name} onChangeText={setName} />
          </View>
          <View style={styles.inputWrapper}>
            <Mail color="#D4AF37" size={20} style={styles.inputIcon} />
            <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#A0A0A0" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
          </View>
          <View style={styles.inputWrapper}>
            <Lock color="#D4AF37" size={20} style={styles.inputIcon} />
            <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#A0A0A0" value={password} onChangeText={setPassword} secureTextEntry />
          </View>
          <View style={styles.inputWrapper}>
            <Lock color="#D4AF37" size={20} style={styles.inputIcon} />
            <TextInput style={styles.input} placeholder="Confirm Password" placeholderTextColor="#A0A0A0" value={confirm} onChangeText={setConfirm} secureTextEntry />
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity style={styles.primaryButton} onPress={handleSignup} disabled={loading}>
            {loading ? <ActivityIndicator color="#0F2F20" /> : <Text style={styles.primaryButtonText}>Sign Up</Text>}
          </TouchableOpacity>

          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <Link href="/(auth)/login" asChild>
              <TouchableOpacity>
                <Text style={styles.footerLink}>Log In</Text>
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
    case 'auth/email-already-in-use': return 'That email is already registered.';
    case 'auth/invalid-email': return 'That email address is invalid.';
    case 'auth/weak-password': return 'Password is too weak.';
    default: return err.message || 'Something went wrong. Please try again.';
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F2F20' },
  scrollContent: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  logoContainer: { alignItems: 'center', marginBottom: 40 },
  appName: { color: '#D4AF37', fontSize: 28, fontWeight: 'bold', marginTop: 10 },
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
