import { useLocalSearchParams } from "expo-router";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FONTS } from "./theme/fonts";
import { useEffect } from "react";
import HospitalCard from "@/components/HospitalCard";
import { useState } from "react";
import { hospitals } from "@/data/data";
import SortPanel, { SortOption } from "@/components/SortPanel";
import FiltePanel from "@/components/FilterPanel";

export default function HomeSearch() {
  const [sortOption, setSortOption] = useState<SortOption>("recommended");
  const [showSort, setShowSort] = useState(false);
  const [sortData, setSortData] = useState(hospitals);
  const [priceRange, setPriceRange] = useState(0);
  const [minimumRating, setMinimumRating] = useState(0);
  const [organizationType, setOrganizationType] = useState("Government")
  const [popularFeature, setPopularFeature] = useState("");
  const [access, setAccess] = useState("");
  const [selectedGovernmentInsurances, setSelectedGovernmentInsurances] = useState<string[]>([]);
  const [selectedPrivateInsurances, setSelectedPrivateInsurances] = useState<string[]>([]);
const [showFilter, setShowFilter] = useState(false);

  

  const router = useRouter();
  const params = useLocalSearchParams();
  const search = (params.search as string) || "";

  const applySorting = (option: SortOption) => {
    let sorted = [...hospitals];

    switch (option) {
      case "priceLowHigh":
        sorted = sorted.sort((a, b) => a.opdPrice - b.opdPrice);
        break;

      case "priceHighLow":
        sorted = sorted.sort((a, b) => b.opdPrice - a.opdPrice);
        break;

      case "ratingHighLow":
        sorted = sorted.sort((a, b) => b.rating - a.rating);
        break;

      case "nearest":
        sorted = sorted.sort((a, b) => a.distanceKm - b.distanceKm);
        break;

      default:
        sorted = hospitals;
    }

    setSortData(sorted);
  };

  const applyFilters = () => {
  let filtered = [...hospitals];

  filtered = filtered.filter(h => h.opdPrice <= priceRange);
  filtered = filtered.filter(h => h.rating >= minimumRating);

  if (organizationType) {
    filtered = filtered.filter(h => h.type === organizationType);
  }

  if (popularFeature) {
    filtered = filtered.filter(h => h.features.includes(popularFeature));
  }

  if (access) {
    filtered = filtered.filter(h => h.accessibility.includes(access));
  }

  if (
    organizationType === "Government" &&
    selectedGovernmentInsurances.length > 0
  ) {
    filtered = filtered.filter(h =>
      selectedGovernmentInsurances.every(company =>
        h.features.includes("Insurance")
      )
    );
  }

  if (
    organizationType === "Private" &&
    selectedPrivateInsurances.length > 0
  ) {
    filtered = filtered.filter(h =>
      selectedPrivateInsurances.every(company =>
        h.features.includes("Insurance")
      )
    );
  }

  setSortData(filtered);
};

useEffect(() => {
  applyFilters();
}, [
  priceRange,
  minimumRating,
  organizationType,
  popularFeature,
  access,
  selectedGovernmentInsurances,
  selectedPrivateInsurances
]);


  return (
    <>
    <ScrollView>
      <View style={{ padding: 30, borderBottomWidth: 0.1, borderRadius: 20 }}>
        <TextInput
          value={search}
          editable={false}
          style={{ borderBottomWidth: 0.2, padding: 15, borderColor: "gray" }}
        />

        <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setShowSort(true)}
          >
            <Ionicons name="swap-vertical" size={18} color="#00AA5D" />
            <Text style={styles.buttonText}>Sort</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={()=>setShowFilter(true)}>
            <Ionicons name="options" size={18} color="#00AA5D" />
            <Text style={styles.buttonText}>Filter</Text>
          </TouchableOpacity>
        </View>
              <FiltePanel visible={showFilter}
  onClose={() => setShowFilter(false)} priceRange={priceRange} setPrice={setPriceRange} rating={minimumRating} setRating={setMinimumRating} organizationType={organizationType} setType={setOrganizationType} popularFeature={popularFeature} setFeature={setPopularFeature} access={access} setAccess={setAccess} search={search} selectedGovernmentInsurances={selectedGovernmentInsurances} setSelectedGovernmentInsurances={setSelectedGovernmentInsurances} selectedPrivateInsurances={selectedPrivateInsurances} setSelectedPrivateInsurances={setSelectedPrivateInsurances}/>
    
        <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 10, marginBottom: 100 }}>
          {sortData.map((hospital) => (
            <HospitalCard
              key={hospital.id}
              hospitalImage={hospital.image}
              hospitalType={hospital.type}
              hospitalName={hospital.name}
              rating={hospital.rating}
              opdprice={hospital.opdPrice}
              surgeryprice={hospital.surgeryPrice}
            />
          ))}
        </ScrollView>

        <SortPanel
          visible={showSort}
          onClose={() => setShowSort(false)}
          search={search}
          sort={(option) => {
            setSortOption(option);
            applySorting(option);
          }}
          sortOption={sortOption}
        />
      </View>
      </ScrollView>
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    gap: 10,
    marginTop: 20,
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F7FF",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: "#D6E4FF",
    width: 150,
  },

  buttonText: {
    marginLeft: 6,
    fontSize: 14,
    fontFamily: "IBMPlexSans_700Bold",
    color: "#00AA5D",
  },
});
