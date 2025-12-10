import { Tabs } from "expo-router";
import { Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FONTS } from "../theme/fonts";
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#00AA5D",


        sceneStyle: {
          backgroundColor: "white",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
tabBarLabel: ({ focused, color }) => (
      <Text style={{ fontFamily: FONTS.bold, color: color, fontSize: 12 }}>
        Home
      </Text>
    ),          tabBarIcon: ({ color, size }) =>
            <Ionicons name="home-outline" size={size} color={color} />
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
tabBarLabel: ({ focused, color }) => (
      <Text style={{ fontFamily: FONTS.bold, color: color, fontSize: 12 }}>
        Search
      </Text>
    ),          tabBarIcon: ({ color, size }) =>
            <Ionicons name="search-outline" size={size} color={color} />
        }}
      />

      <Tabs.Screen
        name="appointment"
        options={{
tabBarLabel: ({ focused, color }) => (
      <Text style={{ fontFamily: FONTS.bold, color: color, fontSize: 12 }}>
        Appointment
      </Text>
    ),          tabBarIcon: ({ color, size }) =>
            <Ionicons name="calendar-outline" size={size} color={color} />
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
tabBarLabel: ({ focused, color }) => (
      <Text style={{ fontFamily: FONTS.bold, color: color, fontSize: 12 }}>
        Profile
      </Text>
    ),          tabBarIcon: ({ color, size }) =>
            <Ionicons name="person-outline" size={size} color={color} />
        }}
      />
    </Tabs>
  );
}
