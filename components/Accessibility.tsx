import React from 'react';
import { View, Text } from 'react-native';
import { Accessibility } from '@/data/data';
import CheckBox from './CheckBox';
import { FONTS } from '@/app/theme/fonts';

interface FeatureProps {
  access: string;
  setAccess: (value: string) => void;
}

export default function PopularFeatures({ access, setAccess }: FeatureProps) {
  return (
    <>
    <Text style={{fontFamily:FONTS.bold}}>Popular Features</Text>
      {Accessibility.map((accessibility) => (
        <View
          key={accessibility.id}
          style={{ flexDirection: "row", alignItems: "center", marginBottom: 10,marginTop:20}}
        >
          <CheckBox
            checked={access === accessibility.label}
            onPress={() => setAccess(accessibility.label)}
          />

          <Text style={{ marginLeft: 8, fontFamily:FONTS.medium }}>{accessibility.label}</Text>
        </View>
      ))}
    </>
  );
}
