import React from 'react';
import {View, Text} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { FONTS } from '@/app/theme/fonts';
interface FeatureProps {
    icon: any;
    title: string;
    subtitle: string;
}

export default function FeatureCard({icon, title, subtitle}: FeatureProps){
    return (
        <>
        <View style={{alignItems:"center", margin:10, padding:15, backgroundColor:"#F2FFF8", borderRadius:6, shadowColor: "#0E1F18",
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 16,
    elevation: 3,}}>
            <Ionicons name={icon} size={26} color="#00AA5D" />
            <Text style={{fontFamily:FONTS.bold}}>{title}</Text>
            <Text style={{fontFamily:FONTS.regular}}>{subtitle}</Text>
        </View>
        </>
    )
}