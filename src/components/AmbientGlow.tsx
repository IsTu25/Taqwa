import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  interpolate,
} from 'react-native-reanimated';

/**
 * Lightweight, dependency-free replacement for the broken empty Lottie
 * files (fire.json / garden.json were placeholder stubs with no layers
 * and rendered nothing). This renders a soft pulsing radial glow —
 * green for "Jannat mode", red/orange for "Istighfar mode" — using
 * react-native-reanimated, which is already a project dependency.
 */
export default function AmbientGlow({ mode }: { mode: 'positive' | 'negative' }) {
  const pulse = useSharedValue(0);

  useEffect(() => {
    pulse.value = withRepeat(
      withTiming(1, { duration: 2800, easing: Easing.inOut(Easing.sin) }),
      -1,
      true
    );
  }, []);

  const orb1Style = useAnimatedStyle(() => ({
    opacity: interpolate(pulse.value, [0, 1], [0.15, 0.35]),
    transform: [{ scale: interpolate(pulse.value, [0, 1], [0.9, 1.15]) }],
  }));

  const orb2Style = useAnimatedStyle(() => ({
    opacity: interpolate(pulse.value, [0, 1], [0.3, 0.1]),
    transform: [{ scale: interpolate(pulse.value, [0, 1], [1.1, 0.85]) }],
  }));

  const positive = mode === 'positive';
  const primaryColor = positive ? '#2ECC71' : '#FF4444';
  const secondaryColor = positive ? '#D4AF37' : '#FF8C42';

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Animated.View
        style={[styles.orb, styles.orbTop, { backgroundColor: primaryColor }, orb1Style]}
      />
      <Animated.View
        style={[styles.orb, styles.orbBottom, { backgroundColor: secondaryColor }, orb2Style]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  orb: {
    position: 'absolute',
    width: 320,
    height: 320,
    borderRadius: 200,
  },
  orbTop: { top: -80, left: -60 },
  orbBottom: { bottom: -100, right: -80 },
});
