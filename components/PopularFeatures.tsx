import React from 'react';
import { View, Text } from 'react-native';
import { popularFatures } from '@/data/data';
import CheckBox from './CheckBox';
import { FONTS } from '@/app/theme/fonts';

interface FeatureProps {
  popularFeature: string;
  setFeature: (value: string) => void;
}

export default function PopularFeatures({ popularFeature, setFeature }: FeatureProps) {
  return (
    <>
    <Text style={{fontFamily:FONTS.bold}}>Popular Features</Text>
      {popularFatures.map((feature) => (
        <View
          key={feature.id}
          style={{ flexDirection: "row", alignItems: "center", marginBottom: 10,marginTop:20}}
        >
          <CheckBox
            checked={popularFeature === feature.label}
            onPress={() => setFeature(feature.label)}
          />

          <Text style={{ marginLeft: 8, fontFamily:FONTS.medium }}>{feature.label}</Text>
        </View>
      ))}
    </>
  );
}
