import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet
} from "react-native";
import { partnerOrgs } from "@/data/data";
import IconNameComponent from "@/components/IconName";
import { FONTS } from "../theme/fonts";
import { hotDeals } from "@/data/data";
import HospitalCard from "@/components/HospitalCard";
import { whyMyAayush } from "@/data/data";
import FeatureCard from "@/components/FeatureCard";
import { recentlyViewed } from "@/data/data";
import { popularSearches } from "@/data/data";
import { Ionicons } from "@expo/vector-icons";
import { popularLocations } from "@/data/data";
import { hospitals } from "@/data/data";
import { useRouter } from "expo-router";
import { changingData } from "@/data/data";
import PointerArrow from "@/components/PointerArrow";
export default function Home() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % changingData.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <ScrollView>
        <View>
          <Text style={{ fontFamily: FONTS.bold, fontSize: 25, padding: 15 }}>
            Your Complete Health Hub.....
          </Text>
          <Text
            style={{
              fontFamily: FONTS.regular,
              marginBottom: 5,
              fontSize: 14,
              paddingLeft: 15,
            }}
          >
            Everything you need - from medical care to fitness - right at your
            fingertip.
          </Text>
        </View>
        <View style={{ margin: 20 }}>
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 10,
              padding: 20,
              shadowColor: "#0E1F18",
              shadowOpacity: 0.08,
              shadowOffset: { width: 0, height: 10 },
              shadowRadius: 16,
              elevation: 6,
            }}
          >
            <View style={styles.inputContainer}>
              <Ionicons
                name="search"
                size={20}
                color="#555"
                style={{ marginRight: 8 }}
              />

              <TextInput placeholder={`Search ${changingData[currentIndex]}`} style={styles.input} value={search} onChangeText={setSearch}/>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: "black",
                width: 300,
                marginTop: 20,
                margin: "auto",
                padding: 10,
                borderRadius: 10,
              }}
             onPress={() =>
                router.push({
                    pathname: "/homeSearch",
                    params: { search: search }
                })
                }
            >
              <Text
                style={{
                  marginLeft: 5,
                  color: "white",
                  fontFamily: FONTS.bold,
                  textAlign: "center",
                }}
              >
                Seacrh & Compare
              </Text>
            </TouchableOpacity>
          </View>
          <PointerArrow />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          {partnerOrgs.map((partner) => {
            return (
              <IconNameComponent
                key={partner.id}
                image={partner.logo}
                height={partner.height}
                width={partner.width}
              />
            );
          })}
        </View>
        <Text style={{ paddingLeft: 25, fontSize: 20, fontFamily: FONTS.bold }}>
          Recently Viewed
        </Text>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          style={{ marginTop: 10, marginBottom: 20 }}
        >
          {hotDeals.map((hospital) => {
            return (
              <HospitalCard
                key={hospital.id}
                hospitalImage={hospital.image}
                hospitalType={hospital.type}
                hospitalName={hospital.name}
                rating={hospital.rating}
                opdprice={hospital.opdPrice}
                surgeryprice={hospital.surgeryPrice}
              />
            );
          })}
        </ScrollView>
        <Text style={{ paddingLeft: 25, fontSize: 20, fontFamily: FONTS.bold }}>
          Why families trust MyAayush
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 10,
            marginBottom: 20,
          }}
        >
          {whyMyAayush.map((item) => {
            return (
              <FeatureCard
                key={item.id}
                icon={item.icon}
                title={item.title}
                subtitle={item.description}
              />
            );
          })}
        </ScrollView>
        <Text style={{ paddingLeft: 25, fontSize: 20, fontFamily: FONTS.bold }}>
          Quick Picks
        </Text>
        <Text
          style={{
            paddingLeft: 25,
            paddingTop: 5,
            fontSize: 13,
            fontFamily: FONTS.regular,
          }}
        >
          Recently viewed
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 10,
            marginBottom: 10,
          }}
        >
          {recentlyViewed.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  backgroundColor: "#00AA5D",
                  padding: 10,
                  margin: 8,
                  borderRadius: 20,
                }}
              >
                <Text style={{ fontFamily: FONTS.bold, color: "white" }}>
                  {item}
                </Text>
              </View>
            );
          })}
        </ScrollView>
        <Text
          style={{
            paddingLeft: 25,
            paddingTop: 5,
            fontSize: 13,
            fontFamily: FONTS.regular,
          }}
        >
          Popular specialities
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 10,
            marginBottom: 10,
          }}
        >
          {popularSearches.map((item, index) => {
            return (
              <View
                key={item.id}
                style={{
                  padding: 10,
                  alignItems: "center",
                  backgroundColor: "#F2FFF8",
                  margin: 8,
                  borderRadius: 10,
                }}
              >
                <Ionicons name={item.icon} size={26} color="#00AA5D" />
                <Text style={{ fontFamily: FONTS.medium }}>{item.title}</Text>
              </View>
            );
          })}
        </ScrollView>
        <Text
          style={{
            paddingLeft: 25,
            paddingTop: 5,
            fontSize: 13,
            fontFamily: FONTS.regular,
          }}
        >
          Popular locations
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 10,
            marginBottom: 10,
          }}
        >
          {popularLocations.map((item, index) => {
            return (
              <View
                key={item.id}
                style={{
                  padding: 10,
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  backgroundColor: "#F2FFF8",
                  margin: 8,
                  borderRadius: 10,
                }}
              >
                <Ionicons name={item.icon} size={26} color="#00AA5D" />
                <Text style={{ fontFamily: FONTS.medium, marginLeft: 8 }}>
                  {item.title}
                </Text>
              </View>
            );
          })}
        </ScrollView>
        <Text style={{ paddingLeft: 25, fontSize: 20, fontFamily: FONTS.bold }}>
          Hot Deals
        </Text>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          style={{ marginTop: 10, marginBottom: 20 }}
        >
          {hospitals.map((hospital) => {
            return (
              <HospitalCard
                key={hospital.id}
                hospitalImage={hospital.image}
                hospitalType={hospital.type}
                hospitalName={hospital.name}
                rating={hospital.rating}
                opdprice={hospital.opdPrice}
                surgeryprice={hospital.surgeryPrice}
              />
            );
          })}
        </ScrollView>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    borderRadius: 10,
    height: 45,
    borderWidth:0.2
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
});


