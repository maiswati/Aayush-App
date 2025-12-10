import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomSlider from "./Slide";

type MinimumRatingSliderProps = {
  value: number;                     
  onChange: (value: number) => void; 
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
};

const MinimumRatingSlider: React.FC<MinimumRatingSliderProps> = ({
  value,
  onChange,
  minimumValue = 0,
  maximumValue = 5,
  step = 0.5,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minimum Rating</Text>
      <Text style={styles.subtitle}>{value.toFixed(1)} ★</Text>

      <CustomSlider
        value={value}
        onValueChange={onChange}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        step={step}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: "#6B6B6B",
    marginBottom: 8,
  },
});

export default MinimumRatingSlider;