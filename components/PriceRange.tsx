import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomSlider from "./Slide";

type PriceRangeSliderProps = {
  value: number;                   
  onChange: (value: number) => void;
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
};

const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
  value,
  onChange,
  minimumValue = 0,
  maximumValue = 10000,
  step = 100,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Price Range</Text>
      <Text style={styles.subtitle}>Up to ₹{value}</Text>

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
    color: "#6b6b6b",
    marginBottom: 8,
  },
});

export default PriceRangeSlider;