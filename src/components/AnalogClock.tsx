import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

interface AnalogClockProps {
  size?: number;
}

export default function AnalogClock({ size = 180 }: AnalogClockProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  // Calculate rotations
  const hrRotation = `${(hours * 30) + (minutes * 0.5)}deg`;
  const minRotation = `${minutes * 6}deg`;
  const secRotation = `${seconds * 6}deg`;

  const radius = size / 2;

  // Render a hand using the transparent-bottom trick for perfect center rotation
  const renderHand = (
    rotation: string,
    width: number,
    color: string,
    lengthMultiplier: number
  ) => {
    const handLength = radius * lengthMultiplier;
    return (
      <View
        style={[
          styles.handWrapper,
          {
            width: size,
            height: size,
            transform: [{ rotate: rotation }],
          },
        ]}
      >
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
          <View
            style={{
              width,
              height: handLength,
              backgroundColor: color,
              borderTopLeftRadius: width / 2,
              borderTopRightRadius: width / 2,
              // Pull it down slightly so it hides under the center pin
              marginBottom: -4, 
            }}
          />
        </View>
        <View style={{ flex: 1 }} /> {/* Transparent bottom half */}
      </View>
    );
  };

  return (
    <View style={[styles.clockContainer, { width: size, height: size, borderRadius: radius }]}>
      {/* Clock Face Dots */}
      <View style={[styles.dot, styles.dot12]} />
      <View style={[styles.dot, styles.dot3]} />
      <View style={[styles.dot, styles.dot6]} />
      <View style={[styles.dot, styles.dot9]} />

      {/* Hands */}
      {/* Hour Hand */}
      {renderHand(hrRotation, 6, '#D4AF37', 0.5)}
      {/* Minute Hand */}
      {renderHand(minRotation, 4, '#FFFFFF', 0.7)}
      {/* Second Hand */}
      {renderHand(secRotation, 2, '#E74C3C', 0.85)}

      {/* Center Pin */}
      <View style={styles.centerPin} />
    </View>
  );
}

const styles = StyleSheet.create({
  clockContainer: {
    backgroundColor: 'rgba(27, 67, 50, 0.8)', // Deep green, semi-transparent
    borderWidth: 4,
    borderColor: '#D4AF37', // Gold border
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  dot: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D4AF37',
  },
  dot12: { top: 10 },
  dot3: { right: 10 },
  dot6: { bottom: 10 },
  dot9: { left: 10 },
  handWrapper: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerPin: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#D4AF37',
    borderWidth: 2,
    borderColor: '#1B4332',
    zIndex: 10,
  },
});
