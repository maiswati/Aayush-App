import React from 'react';
import { View, Text, Image } from 'react-native';

interface IconNameProps {
  image: any;
  heading?: string;
  height?:number;
  width?:number;
}

export default function IconNameComponent({ image, heading , height, width}: IconNameProps) {
  return (
    <View style={{alignItems:"center"}}>
      <Image source={image} style={{height:height, width:width}} resizeMode="contain"/>
      <Text style={{textAlign:"center", marginTop:10}}>{heading}</Text>
    </View>
  );
}
