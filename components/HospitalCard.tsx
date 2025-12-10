import React from 'react';
import {View, Text, Image} from 'react-native';
import { FONTS } from '@/app/theme/fonts';
import Button from './Button';
interface HospitalCardProps {
    hospitalImage: any;
    hospitalType: string;
    hospitalName: string;
    rating: number;
    opdprice: number;
    surgeryprice: number
}

export default function HospitalCard({hospitalImage, hospitalType, hospitalName, rating, opdprice, surgeryprice}:HospitalCardProps) {
    return(
        <>
            <View style={{padding:20,}}>
                <View>
                    <Image source={hospitalImage} style={{width:280, height:280,borderRadius:8}}/>
                </View>
                <View style={{flexDirection:"row", alignItems:"flex-start", justifyContent:"space-between"}}>
                <View>
                <Text style={{fontFamily:FONTS.bold, fontSize:18}}>{hospitalName}</Text>
                <Text style={{fontFamily:FONTS.medium, color:"gray"}}><Text style={{fontFamily:FONTS.medium, color:"black"}}>Type:</Text>   {hospitalType}</Text>
                <Text style={{fontFamily:FONTS.medium, color:"gray"}}><Text style={{fontFamily:FONTS.medium, color:"black"}}>OPD:</Text>   Starting  ₹{opdprice}</Text>
                <Text style={{fontFamily:FONTS.medium, color:"gray"}}><Text style={{fontFamily:FONTS.medium, color:"black"}}>Surgery:</Text>   Starting  ₹{surgeryprice}</Text>
                </View>
                <View style={{flexDirection:"row", alignItems:"center",}}>
                    <Text style={{fontFamily:FONTS.medium}}>{rating}</Text>
                    {
                        rating >= 4.5 ? <Text style={{fontFamily:FONTS.medium, marginLeft:10}}>Excellent</Text> : <Text style={{fontFamily:FONTS.medium, marginLeft:10}}>Very Good</Text>
                    }
                </View>
                </View>
                <Button title="View Details"/>
            </View>
        </>
    )
}