import React, { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function PointerArrow() {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: -5,       // bounce up
          duration: 600,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
        Animated.timing(translateY, {
          toValue: 0,         // bounce down
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={{
        position: "absolute",
        right: 250,     // adjust arrow position
        top: 82,      // adjust based on your layout
        zIndex: 999,
        transform: [{ translateY }],
      }}
    >
      <Ionicons name="arrow-forward-circle" size={46} color="#00AA5D" />
    </Animated.View>
  );
}