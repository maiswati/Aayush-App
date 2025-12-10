import React, { useState } from 'react';
import {View, Text, Image} from 'react-native';
import { FONTS } from './theme/fonts';
import { COLORS } from './theme/colors';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { Link } from 'expo-router';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
    const [mobileNumber, setMobileNumber] = useState("");
    const router = useRouter()
    return(
        <>
        <View style={{padding:80}}>
            <Text style={{textAlign:"center", fontFamily: FONTS.bold, fontSize:32, color:COLORS.title}}>Welcome to {"\n"} MyAayush</Text>
            <Image source={require("../assets/images/logo.png")} style={{height:60, width:40, margin:"auto", marginTop:25}}/>
            <Text style={{fontFamily:FONTS.medium, textAlign:"center", marginTop:18, fontSize:15}}>Pls enter your Mobile Number to continue</Text>
            <Input placeholder='Mobile Number' value={mobileNumber} onChange={setMobileNumber} label='Enter Your Mobile Number-:'/>
            <Button title='Login' onPress={()=> router.push("/home")}/>
        </View>
        </>
    )
}