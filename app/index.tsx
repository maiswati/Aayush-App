import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import {
  Animated,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

const PRIMARY = "#00AA5D";
const ACCENT = "#ffffff";

export default function Index() {
  const router = useRouter();
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.spring(pulseAnim, {
          toValue: 1,
          friction: 5,
          tension: 40,
          useNativeDriver: true,
        }),
      ])
    );

    loop.start();
    return () => loop.stop();
  }, [pulseAnim]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <View style={styles.glossyBlob} />
      <View style={styles.content}>
        <Text style={styles.eyebrow}>Care that starts with you</Text>
        <Text style={styles.title}>My Aayush Book</Text>
        <Text style={styles.subtitle}>
          Build trusted connections between patients, doctors, and wellness partners
          with a refreshing, human-first experience.
        </Text>
        <Animated.View
          style={[styles.ctaCard, { transform: [{ scale: pulseAnim }] }]}
        >
          <Pressable
            style={styles.pressable}
            onPress={() => router.push({ pathname: "/sections" })}
            android_ripple={{ color: PRIMARY }}
          >
            <Text style={styles.ctaLabel}>Create an account</Text>
            <Text style={styles.ctaHelper}>
              Tap to choose your professional or organization path and begin onboarding.
            </Text>
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY,
    paddingHorizontal: 24,
    paddingTop: 32,
    justifyContent: "center",
  },
  glossyBlob: {
    position: "absolute",
    top: 40,
    right: -60,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: ACCENT,
    opacity: 0.15,
    transform: [{ rotate: "25deg" }],
  },
  content: {
    gap: 12,
  },
  eyebrow: {
    color: ACCENT,
    letterSpacing: 1,
    textTransform: "uppercase",
    fontSize: 14,
  },
  title: {
    color: ACCENT,
    fontSize: 42,
    fontWeight: "800",
  },
  subtitle: {
    color: ACCENT,
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.9,
    marginBottom: 16,
  },
  ctaCard: {
    backgroundColor: ACCENT,
    borderRadius: 24,
    shadowColor: "#1A1A1A",
    shadowOpacity: 0.25,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },
  pressable: {
    padding: 24,
  },
  ctaLabel: {
    fontSize: 22,
    fontWeight: "700",
    color: PRIMARY,
    marginBottom: 6,
  },
  ctaHelper: {
    color: "#3A3A3A",
    fontSize: 15,
    lineHeight: 22,
  },
});
