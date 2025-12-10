import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
  ViewStyle
} from "react-native";
import {
  Badge,
  ContactAndSocialMedia,
  DropdownField,
  Field,
  InputArea,
  SectionCard
} from "../app/components";
import { ACCENT, PRIMARY, gymCenterRegistrationStyles as styles } from "../app/styles/gymCenterRegistrationStyles";
import { GYM_FACILITIES, PLAN_DURATIONS, TRAINER_SPECIALTIES } from "../data/dropdownOptions";


type PlanEntry = {
  id: string;
  planName: string;
  duration: string;
  minFee: string;
  maxFee: string;
  description: string;
};

type TrainerEntry = {
  id: string;
  trainerName: string;
  specialization: string;
  certification: string;
  experience: string;
  email: string;
  phone: string;
};

export default function GymCenterRegistration() {
  const router = useRouter();
  const heroAnim = useRef(new Animated.Value(0)).current;
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [customFacility, setCustomFacility] = useState("");
  const [planDuration, setPlanDuration] = useState("Monthly");
  const [trainerSpecialty, setTrainerSpecialty] = useState("Strength Training");
  const [planEntries, setPlanEntries] = useState<PlanEntry[]>([
    { id: "plan-1", planName: "", duration: "Monthly", minFee: "", maxFee: "", description: "" },
  ]);
  const [trainerEntries, setTrainerEntries] = useState<TrainerEntry[]>([
    { id: "trainer-1", trainerName: "", specialization: "Strength Training", certification: "", experience: "", email: "", phone: "" },
  ]);

  useEffect(() => {
    Animated.spring(heroAnim, {
      toValue: 1,
      damping: 12,
      stiffness: 120,
      useNativeDriver: true,
    }).start();
  }, [heroAnim]);

  const fadeIn = (index: number): ViewStyle => ({
    opacity: heroAnim,
    transform: [
      {
        translateY: heroAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [26 + index * 4, 0],
        }),
      },
    ],
  });

  const handleFacilitySelect = (facility: string) => {
    if (selectedFacilities.includes(facility)) return;
    setSelectedFacilities((prev) => [...prev, facility]);
  };

  const handleAddCustomFacility = () => {
    const value = customFacility.trim();
    if (!value || selectedFacilities.includes(value)) return;
    setSelectedFacilities((prev) => [...prev, value]);
    setCustomFacility("");
  };

  const facilityDisplay = selectedFacilities.length
    ? `${selectedFacilities.length} selected`
    : "";

  const addPlanEntry = () => {
    const newId = `plan-${Date.now()}`;
    setPlanEntries((prev) => [...prev, { id: newId, planName: "", duration: "Monthly", minFee: "", maxFee: "", description: "" }]);
  };

  const removePlanEntry = (id: string) => {
    if (planEntries.length > 1) {
      setPlanEntries((prev) => prev.filter((e) => e.id !== id));
    }
  };

  const updatePlanEntry = (id: string, field: keyof PlanEntry, value: string) => {
    setPlanEntries((prev) => prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  };

  const addTrainerEntry = () => {
    const newId = `trainer-${Date.now()}`;
    setTrainerEntries((prev) => [...prev, { id: newId, trainerName: "", specialization: "Strength Training", certification: "", experience: "", email: "", phone: "" }]);
  };

  const removeTrainerEntry = (id: string) => {
    if (trainerEntries.length > 1) {
      setTrainerEntries((prev) => prev.filter((e) => e.id !== id));
    }
  };

  const updateTrainerEntry = (id: string, field: keyof TrainerEntry, value: string) => {
    setTrainerEntries((prev) => prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  };

  
  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.sheet}>
          <Animated.View style={[styles.heroCard, fadeIn(0)]}>
            <Pressable style={styles.backRow} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={20} color={ACCENT} />
              <Text style={styles.backText}>Back</Text>
            </Pressable>
            <Text style={styles.title}>Gym Center Registration</Text>
            <Text style={styles.subtitle}>Complete your gym center profile</Text>
          </Animated.View>

          <Animated.View style={[styles.infoCard, styles.shadowed, fadeIn(1)]}>
            <View style={styles.infoAvatar}>
              <Ionicons name="person-circle" size={38} color={PRIMARY} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.infoTitle}>Registered via Referral Agent/Broker</Text>
              <Text style={styles.infoHighlight}>Ref Agent John - ABC2023</Text>
              <View style={styles.infoMetaRow}>
                <Ionicons name="call-outline" size={16} color="#3F5E4E" />
                <Text style={styles.infoMetaText}>XXXXXX</Text>
              </View>
              <View style={styles.infoMetaRow}>
                <Ionicons name="mail-outline" size={16} color="#3F5E4E" />
                <Text style={styles.infoMetaText}>abcd@gym.com</Text>
              </View>
            </View>
          </Animated.View>

          <Animated.View style={[styles.uploadCard, styles.shadowed, fadeIn(2)]}>
            <Text style={styles.cardTitle}>Upload Document for Auto Fill</Text>
            <Text style={styles.cardSubtitle}>
              Upload your ID, certificate or any document. We'll automatically extract the information.
            </Text>
            <Pressable style={styles.dropZone}>
              <Ionicons name="cloud-upload-outline" size={30} color={PRIMARY} />
              <Text style={styles.dropText}>Click to upload or drag and drop</Text>
            </Pressable>
          </Animated.View>

          <SectionCard
            index={3}
            title="Basic Information"
            subtitle="Your gym center details"
            fadeIn={fadeIn}
          >
            <Field label="Gym/Fitness Center Name" placeholder="Fitness Club Name" required />
            <Field label="Owner Name" placeholder="Owner Full Name" required />
            <Field label="Email" placeholder="gym@example.com" required />
            <Field label="Phone Number" placeholder="+91-XXXXXXXXXX" keyboardType="numeric" maxLength={10} required />
            <Field label="Location/Address" placeholder="123 GYM ROAD" required />
            <DropdownField
              label="Facilities Available"
              placeholder="Select facilities"
              options={GYM_FACILITIES}
              value={facilityDisplay}
              dropdownId="facilities"
              activeDropdownId={activeDropdown}
              onDropdownChange={setActiveDropdown}
              onSelect={(value) => {
                handleFacilitySelect(value);
                setActiveDropdown(null);
              }}
              raiseOnOpen
            />
            {selectedFacilities.length > 0 && (
              <View style={styles.chipWrap}>
                {selectedFacilities.map((facility) => (
                  <Pressable
                    key={facility}
                    style={styles.facilityChip}
                    onPress={() => setSelectedFacilities((prev) => prev.filter((item) => item !== facility))}
                  >
                    <Text style={styles.facilityChipText}>{facility}</Text>
                    <Ionicons name="close" size={14} color={ACCENT} />
                  </Pressable>
                ))}
              </View>
            )}
            <View style={styles.facilityInputRow}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Add custom facility"
                placeholderTextColor="#6D8B7F"
                value={customFacility}
                onChangeText={setCustomFacility}
              />
              <Pressable style={styles.addButton} onPress={handleAddCustomFacility}>
                <Ionicons name="add" size={18} color={ACCENT} />
                <Text style={styles.addButtonText}>Add</Text>
              </Pressable>
            </View>
            <InputArea placeholder="Provide gym details, special offerings, and philosophy" />
          </SectionCard>

          <SectionCard index={4} title="Operating Hours" subtitle="Set your gym timings" fadeIn={fadeIn}>
            <Field label="Weekday Opening Time" placeholder="--:--" />
            <Field label="Weekday Closing Time" placeholder="--:--" />
            <Field label="Weekend Opening Time" placeholder="--:--" />
            <Field label="Weekend Closing Time" placeholder="--:--" />
          </SectionCard>

          <SectionCard index={5} title="Membership Plans" subtitle="Add membership options& pricing" actionLabel="+ Add Plan" onAction={addPlanEntry} fadeIn={fadeIn}>
            {planEntries.map((entry, index) => (
              <React.Fragment key={entry.id}>
                <View style={styles.entryCard}>
                  <View style={styles.entryHeader}>
                    <Badge text={`Plan #${index + 1}`} />
                    {planEntries.length > 1 && (
                      <Pressable style={styles.deleteButton} onPress={() => removePlanEntry(entry.id)}>
                        <Ionicons name="remove-circle-outline" size={20} color="#FF5A5F" />
                      </Pressable>
                    )}
                  </View>
                  <Field
                    label="Plan Name"
                    placeholder="Plan Name (e.g., Monthly, Quarterly)"
                    value={entry.planName}
                    onChangeText={(value) => updatePlanEntry(entry.id, "planName", value)}
                  />
                  <DropdownField
                    label="Duration"
                    placeholder="Select duration"
                    options={PLAN_DURATIONS}
                    value={entry.duration}
                    dropdownId={`plan-duration-${entry.id}`}
                    activeDropdownId={activeDropdown}
                    onDropdownChange={setActiveDropdown}
                    onSelect={(value) => {
                      updatePlanEntry(entry.id, "duration", value);
                      setActiveDropdown(null);
                    }}
                  />
                  <Field
                    label="Min Fee (₹)"
                    placeholder="Minimum fee"
                    value={entry.minFee} keyboardType="numeric"
                    onChangeText={(value) => updatePlanEntry(entry.id, "minFee", value)}
                  />
                  <Field
                    label="Max Fee (₹)"
                    placeholder="Maximum fee"
                    value={entry.maxFee} keyboardType="numeric"
                    onChangeText={(value) => updatePlanEntry(entry.id, "maxFee", value)}
                  />
                  <InputArea
                    placeholder="Describe what's included in this plan"
                    value={entry.description}
                    onChangeText={(value) => updatePlanEntry(entry.id, "description", value)}
                  />
                </View>
              </React.Fragment>
            ))}
          </SectionCard>

          <SectionCard index={6} title="Trainers" subtitle="Add your certified trainers" actionLabel="+ Add Trainer" onAction={addTrainerEntry} fadeIn={fadeIn}>
            {trainerEntries.map((entry, index) => (
              <React.Fragment key={entry.id}>
                <View style={styles.entryCard}>
                  <View style={styles.entryHeader}>
                    <Badge text={`Trainer #${index + 1}`} />
                    {trainerEntries.length > 1 && (
                      <Pressable style={styles.deleteButton} onPress={() => removeTrainerEntry(entry.id)}>
                        <Ionicons name="remove-circle-outline" size={20} color="#FF5A5F" />
                      </Pressable>
                    )}
                  </View>
                  <Field
                    label="Trainer Name"
                    placeholder="Trainer Name"
                    value={entry.trainerName}
                    onChangeText={(value) => updateTrainerEntry(entry.id, "trainerName", value)}
                  />
                  <DropdownField
                    label="Specialization"
                    placeholder="Select specialization"
                    options={TRAINER_SPECIALTIES}
                    value={entry.specialization}
                    dropdownId={`trainer-specialty-${entry.id}`}
                    activeDropdownId={activeDropdown}
                    onDropdownChange={setActiveDropdown}
                    onSelect={(value) => {
                      updateTrainerEntry(entry.id, "specialization", value);
                      setActiveDropdown(null);
                    }}
                  />
                  <Field
                    label="Certification"
                    placeholder="Certification (e.g., ACE, ISSA)"
                    value={entry.certification}
                    onChangeText={(value) => updateTrainerEntry(entry.id, "certification", value)}
                  />
                  <Field
                    label="Experience"
                    placeholder="Experience (e.g., 5 years)"
                    value={entry.experience} keyboardType="decimal-pad"
                    onChangeText={(value) => updateTrainerEntry(entry.id, "experience", value)}
                  />
                  <Field
                    label="Email"
                    placeholder="trainer@example.com"
                    value={entry.email}
                    onChangeText={(value) => updateTrainerEntry(entry.id, "email", value)}
                  />
                  <Field
                    label="Phone"
                    placeholder="+91-XXXXXXXXXX" keyboardType="numeric" maxLength={10}
                    value={entry.phone}
                    onChangeText={(value) => updateTrainerEntry(entry.id, "phone", value)}
                  />
                </View>
              </React.Fragment>
            ))}
          </SectionCard>

          <ContactAndSocialMedia contactIndex={7} socialIndex={8} fadeIn={fadeIn} facebookPlaceholder="https://facebook.com/yourpage" instagramPlaceholder="https://instagram.com/yourpage" />

          <Animated.View style={[styles.actionRow, fadeIn(9)]}>
            <Pressable style={styles.secondaryButton}>
              <Text style={styles.secondaryText}>Save as Draft</Text>
            </Pressable>
            <Pressable style={styles.ctaButton}>
              <Text style={styles.ctaText}>Continue to Review</Text>
            </Pressable>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
}
