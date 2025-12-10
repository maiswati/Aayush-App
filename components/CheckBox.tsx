import React from 'react';
import { View } from 'react-native';
import Checkbox from 'expo-checkbox';

interface CheckBoxProps {
  checked: boolean;
  onPress: () => void;
}

export default function CheckBox({ checked, onPress }: CheckBoxProps) {
  return (
    <View>
      <Checkbox
        value={checked}
        onValueChange={onPress}
        color={checked ? "#262943" : undefined}
      />
    </View>
  );
}
