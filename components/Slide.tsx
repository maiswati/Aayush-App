// components/Slider.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";

type SliderProps = {
  value: number;
  onValueChange: (value: number) => void;
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
};

const CustomSlider: React.FC<SliderProps> = ({
  value,
  onValueChange,
  minimumValue = 0,
  maximumValue = 100,
  step = 1,
}) => {
  return (
    <View style={styles.container}>
      <Slider
        value={value}
        onValueChange={onValueChange}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        step={step}
        minimumTrackTintColor="#00B386"
        maximumTrackTintColor="#E5E5E5"
        thumbTintColor="#00B386"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});

export default CustomSlider;