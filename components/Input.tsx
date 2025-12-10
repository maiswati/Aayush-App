import React from 'react';
import {View, Text, TextInput, Image} from 'react-native';
// import {
//   useFonts,
//   IBMPlexSans_400Regular,
//   IBMPlexSans_700Bold,
// } from "@expo-google-fonts/ibm-plex-sans";
interface LabelInputProps {
    label?: string;
    placeholder: string;
    require?: boolean;
    height?: number;
    width?: number;
    image?: any;
    color?:string;
    value?: string;
    onChange?: (text: string) => void;
}

export default function Input({label, require, placeholder, height, width, image, color, value, onChange}: LabelInputProps){
    // const [fontsLoaded] = useFonts({
    //     IBMPlexSans_400Regular,
    //     IBMPlexSans_700Bold,
    //   });
    return (
        <View style={{padding:10, marginTop:10}}>
            <View style={{flexDirection:"row", alignItems:"center"}}>
                {image && (<Image source={image} style={{height:30, width:30}}/>)}
                <Text style={{fontWeight:"bold", fontFamily:"IBMPlexSans_700Bold", color:color, marginBottom:6}}>{label}  
                {
                    require && <Text style={{color:"red"}}>  *</Text>
                }
                </Text>
            </View>
            <TextInput multiline={true} placeholder={placeholder} value={value} onChangeText={onChange} style={{backgroundColor:"white", borderRadius:10, width:width, height:height,  textAlignVertical: "top", fontFamily:"IBMPlexSans_400Regular", borderWidth:0.5}}/>
        </View>
    )
}