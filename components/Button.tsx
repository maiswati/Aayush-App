import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  View,
} from "react-native";
import { FONTS } from "@/app/theme/fonts";

interface ButtonProps {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled = false,
  containerStyle,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled && styles.disabledButton,
        containerStyle,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
<Text style={[styles.title, { fontFamily: FONTS.bold }]}>
  {title}
</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 13,
    backgroundColor: "#00B878", 
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 12,
    flexDirection: "row",
  },
  disabledButton: {
    opacity: 0.6,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  iconWrapper: {
    marginLeft: 8,
  },
});