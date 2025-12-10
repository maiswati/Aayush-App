import React, { useEffect, useRef } from "react";
import {
  View,
  Modal,
  Animated,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ScrollView,
  Text
} from "react-native";

import PriceRangeSlider from "./PriceRange";
import MinimumRatingSlider from "./MinimumRatingSlider";
import OrganizationTypeComponent from "./OrganizationTypeComponent";
import PopularFeatures from "./PopularFeatures";
import Accessibility from "./Accessibility";
import Government from "./Government";
import Private from "./Private";
import { FONTS } from "@/app/theme/fonts";

const SCREEN_HEIGHT = Dimensions.get("window").height;

interface FilterProps {
  visible: boolean;
  onClose: () => void;

  priceRange: number;
  setPrice: (value: number) => void;

  rating: number;
  setRating: (value: number) => void;

  organizationType: string;
  setType: (value: string) => void;

  popularFeature: string;
  setFeature: (value: string) => void;

  access: string;
  setAccess: (value: string) => void;

  search: string;

  selectedGovernmentInsurances: string[];
  setSelectedGovernmentInsurances: React.Dispatch<React.SetStateAction<string[]>>;

  selectedPrivateInsurances: string[];
  setSelectedPrivateInsurances: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function FilterPanel(props: FilterProps) {
  const {
    visible,
    onClose,

    priceRange,
    setPrice,
    rating,
    setRating,
    organizationType,
    setType,
    popularFeature,
    setFeature,
    access,
    setAccess,
    search,
    selectedGovernmentInsurances,
    setSelectedGovernmentInsurances,
    selectedPrivateInsurances,
    setSelectedPrivateInsurances,
  } = props;

  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: SCREEN_HEIGHT,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Modal transparent visible={visible} animationType="none">
      {/* Background overlay */}
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        style={styles.overlay}
      />

      {/* Bottom Sheet */}
      <Animated.View
        style={[
          styles.panel,
          {
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.handleContainer}>
          <View style={styles.handle} />
        </View>

        <ScrollView
          style={{ paddingHorizontal: 25 }}
          showsVerticalScrollIndicator={false}
        >
          <PriceRangeSlider value={priceRange} onChange={setPrice} />
          <MinimumRatingSlider value={rating} onChange={setRating} />

          <View style={{ marginTop: 20 }}>
            <Text style={{ fontFamily: FONTS.bold, marginBottom: 8 }}>
              Organization Type
            </Text>
            <OrganizationTypeComponent
              organizationType={organizationType}
              setType={setType}
            />
          </View>

          <Text style={{ marginTop: 20 }}>Services & Facilities</Text>

          {search === "Hospital" && organizationType === "Government" && (
            <Government
              selectedGovernmentInsurances={selectedGovernmentInsurances}
              setSelectedGovernmentInsurances={setSelectedGovernmentInsurances}
            />
          )}

          {search === "Hospital" && organizationType === "Private" && (
            <Private
              selectedPrivateInsurances={selectedPrivateInsurances}
              setSelectedPrivateInsurances={setSelectedPrivateInsurances}
            />
          )}

          <PopularFeatures
            popularFeature={popularFeature}
            setFeature={setFeature}
          />

          <Accessibility access={access} setAccess={setAccess} />

          <View style={{ height: 50 }} /> {/* space at bottom */}
        </ScrollView>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  panel: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: SCREEN_HEIGHT * 0.75,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 10,
  },
  handleContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  handle: {
    width: 50,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#ccc",
  },
});
