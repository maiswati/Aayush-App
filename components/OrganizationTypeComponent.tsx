import { FONTS } from '@/app/theme/fonts';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

interface TypeProps{
    organizationType:string;
    setType:(value:string) => void;
}

export default function OrganizationTypeComponent({organizationType, setType}:TypeProps) {
    return (
        <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-evenly"}}>
            <TouchableOpacity style={{padding:10, borderRadius:10, backgroundColor:organizationType === "Government" ? "#00AA5D": "#d9d9d9"}} onPress={()=>setType("Government")}>
                <Text style={{color:"white", fontFamily:FONTS.bold}}>Government</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{padding:10, borderRadius:10, backgroundColor:organizationType === "Private" ? "#00AA5D": "#d9d9d9"}} onPress={()=>setType("Private")}>
                <Text style={{color:"white", fontFamily:FONTS.bold}}>Private</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{padding:10, borderRadius:10,backgroundColor:organizationType === "Charity" ? "#00AA5D": "#d9d9d9"}} onPress={()=>setType("Charity")}>
                <Text style={{color:"white", fontFamily:FONTS.bold}}>Charity</Text>
            </TouchableOpacity>
        </View>
    )
}