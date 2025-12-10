import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { useFonts,
  IBMPlexSans_400Regular,
  IBMPlexSans_500Medium,
  IBMPlexSans_700Bold
} from "@expo-google-fonts/ibm-plex-sans";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Image, View, Text } from 'react-native';
import { FONTS } from './theme/fonts';
export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const [loaded] = useFonts({
    IBMPlexSans_400Regular,
    IBMPlexSans_500Medium,
    IBMPlexSans_700Bold,
  });
  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;
  return (
      <Stack initialRouteName="(tabs)"
        screenOptions={{
          contentStyle:{backgroundColor:"white"},
          headerTitle:"",
          headerLeft: () => (
            <Image source={require("../assets/images/healthBazar.png")} style={{height:100, width:130}}/>
          ),
          headerRight: () => (
            <View style={{backgroundColor:"#00AA5D", padding:4, borderRadius:10}}>
            <Text style={{color:"white", fontFamily:FONTS.bold}}>Complete Profile</Text>
            </View>
          )
        }}
      >
        <Stack.Screen name="index" /> {/* default home */}
        <Stack.Screen name="homeSearch" options={{ headerShown: false }} />
        <Stack.Screen name='login' options={{contentStyle: {backgroundColor:"white"}}}/>
        <Stack.Screen name="(tabs)"/>
      </Stack>
  );
}