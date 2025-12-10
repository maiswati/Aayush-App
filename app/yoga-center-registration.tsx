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
import { ACCENT, PRIMARY, yogaCenterRegistrationStyles as styles } from "../app/styles/yogaCenterRegistrationStyles";
import { CLASS_DURATIONS, CLASS_STYLES, INSTRUCTOR_SPECIALTIES, YOGA_FACILITIES } from "../data/dropdownOptions";


type ClassEntry = {
  id: string;
  style: string;
  duration: string;
  price: string;
  description: string;
};

type InstructorEntry = {
  id: string;
  name: string;
  certification: string;
  experience: string;
  email: string;
  phone: string;
};

export default function YogaCenterRegistration() {
  const router = useRouter();
  const heroAnim = useRef(new Animated.Value(0)).current;
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [customFacility, setCustomFacility] = useState("");
  const [classStyle, setClassStyle] = useState("Hatha");
  const [classDuration, setClassDuration] = useState("60 Minutes");
  const [instructorSpecialty, setInstructorSpecialty] = useState("Hatha Yoga");
  const [classEntries, setClassEntries] = useState<ClassEntry[]>([
    { id: "class-1", style: "Hatha", duration: "60 Minutes", price: "", description: "" },
  ]);
  const [instructorEntries, setInstructorEntries] = useState<InstructorEntry[]>([
    { id: "instructor-1", name: "", certification: "", experience: "", email: "", phone: "" },
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
          outputRange: [24 + index * 4, 0],
        }),
      },
    ],
  });

  const handleFacilitySelect = (facility: string) => {
    if (selectedFacilities.includes(facility)) return;
    setSelectedFacilities((prev) => [...prev, facility]);
  };

  const handleAddFacility = () => {
    const value = customFacility.trim();
    if (!value || selectedFacilities.includes(value)) return;
    setSelectedFacilities((prev) => [...prev, value]);
    setCustomFacility("");
  };

  const facilitiesLabel = selectedFacilities.length
    ? `${selectedFacilities.length} selected`
    : "";

  const addClassEntry = () => {
    const newId = `class-${Date.now()}`;
    setClassEntries((prev) => [...prev, { id: newId, style: "Hatha", duration: "60 Minutes", price: "", description: "" }]);
  };

  const removeClassEntry = (id: string) => {
    if (classEntries.length > 1) {
      setClassEntries((prev) => prev.filter((e) => e.id !== id));
    }
  };

  const updateClassEntry = (id: string, field: keyof ClassEntry, value: string) => {
    setClassEntries((prev) => prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  };

  const addInstructorEntry = () => {
    const newId = `instructor-${Date.now()}`;
    setInstructorEntries((prev) => [...prev, { id: newId, name: "", certification: "", experience: "", email: "", phone: "" }]);
  };

  const removeInstructorEntry = (id: string) => {
    if (instructorEntries.length > 1) {
      setInstructorEntries((prev) => prev.filter((e) => e.id !== id));
    }
  };

  const updateInstructorEntry = (id: string, field: keyof InstructorEntry, value: string) => {
    setInstructorEntries((prev) => prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
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
            <Text style={styles.title}>Yoga Center Registration</Text>
            <Text style={styles.subtitle}>Complete your yoga center profile</Text>
          </Animated.View>

          <Animated.View style={[styles.infoCard, styles.shadowed, fadeIn(1)]}>
            <View style={styles.infoAvatar}>
              <Ionicons name="person-circle" size={38} color={PRIMARY} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.infoTitle}>Registered via Referral Agent/Broker</Text>
              <Text style={styles.infoHighlight}>Ref Agent John - ABC2023</Text>
              <View style={styles.infoMetaRow}>
                <Ionicons name="call-outline" size={16} color="#385746" />
                <Text style={styles.infoMeta}>XXXXXX</Text>
              </View>
              <View style={styles.infoMetaRow}>
                <Ionicons name="mail-outline" size={16} color="#385746" />
                <Text style={styles.infoMeta}>abcd@yoga.com</Text>
              </View>
            </View>
          </Animated.View>

          <Animated.View style={[styles.card, styles.shadowed, fadeIn(2)]}>
            <Text style={styles.cardTitle}>Upload Document for Auto Fill</Text>
            <Text style={styles.cardSubtitle}>
              Upload your ID, certificate or any document. We'll automatically extract the information.
            </Text>
            <Pressable style={styles.dropZone}>
              <Ionicons name="cloud-upload-outline" size={30} color={PRIMARY} />
              <Text style={styles.dropText}>Click to upload or drag and drop</Text>
            </Pressable>
          </Animated.View>

          <SectionCard index={3} title="Basic Information" subtitle="Your yoga center details" fadeIn={fadeIn}>
            <Field label="Yoga Center Name" placeholder="Yoga Center Name" required />
            <Field label="Owner Name" placeholder="Owner Full Name" required />
            <Field label="Email" placeholder="yoga@example.com" required />
            <Field label="Phone Number" placeholder="+91-XXXXXXXXXX" required keyboardType="numeric" maxLength={10}/>
            <Field label="Location/Address" placeholder="123 YOGA STREET" required />
            <Field label="Established Year" placeholder="YYYY" keyboardType="numeric" maxLength={4}/>
            <DropdownField
              label="Facilities Available"
              placeholder="Select facilities"
              options={YOGA_FACILITIES}
              value={facilitiesLabel}
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
                    onPress={() =>
                      setSelectedFacilities((prev) => prev.filter((item) => item !== facility))
                    }
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
                placeholderTextColor="#648778"
                value={customFacility}
                onChangeText={setCustomFacility}
              />
              <Pressable style={styles.addButton} onPress={handleAddFacility}>
                <Ionicons name="add" size={18} color={ACCENT} />
                <Text style={styles.addButtonText}>Add</Text>
              </Pressable>
            </View>
            <InputArea placeholder="Provide yoga center details, philosophy, and approach" />
          </SectionCard>

          <SectionCard index={4} title="Operating Hours" subtitle="Set your center timings" fadeIn={fadeIn}>
            <Field label="Weekday Opening Time" placeholder="--:--" keyboardType="numeric" maxLength={4}/>
            <Field label="Weekday Closing Time" placeholder="--:--" keyboardType="numeric" maxLength={4}/>
            <Field label="Weekend Opening Time" placeholder="--:--" keyboardType="numeric" maxLength={4}/>
            <Field label="Weekend Closing Time" placeholder="--:--" keyboardType="numeric" maxLength={4}/>
          </SectionCard>

          <SectionCard
            index={5}
            title="Yoga Classes & Styles"
            subtitle="Add yoga classes you offer"
            actionLabel="+ Add Class"
            onAction={addClassEntry}
            fadeIn={fadeIn}
          >
            {classEntries.map((entry, index) => (
              <React.Fragment key={entry.id}>
                <View style={styles.entryCard}>
                  <View style={styles.entryHeader}>
                    <Badge text={`Class #${index + 1}`} />
                    {classEntries.length > 1 && (
                      <Pressable style={styles.deleteButton} onPress={() => removeClassEntry(entry.id)}>
                        <Ionicons name="remove-circle-outline" size={20} color="#FF5A5F" />
                      </Pressable>
                    )}
                  </View>
                  <DropdownField
                    label="Class/Style Name"
                    placeholder="Select yoga class/style"
                    options={CLASS_STYLES}
                    value={entry.style}
                    dropdownId={`class-style-${entry.id}`}
                    activeDropdownId={activeDropdown}
                    onDropdownChange={setActiveDropdown}
                    onSelect={(value) => {
                      updateClassEntry(entry.id, "style", value);
                      setActiveDropdown(null);
                    }}
                  />
                  <DropdownField
                    label="Duration"
                    placeholder="Select duration"
                    options={CLASS_DURATIONS}
                    value={entry.duration}
                    dropdownId={`class-duration-${entry.id}`}
                    activeDropdownId={activeDropdown}
                    onDropdownChange={setActiveDropdown}
                    onSelect={(value) => {
                      updateClassEntry(entry.id, "duration", value);
                      setActiveDropdown(null);
                    }}
                  />
                  <Field
                    label="Min Fee (₹)"
                    placeholder="Minimum fee"
                    value={entry.price} keyboardType="numeric"
                    onChangeText={(value) => updateClassEntry(entry.id, "price", value)}
                  />
                  <Field
                    label="Max Fee (₹)"
                    placeholder="Maximum fee"
                    value={entry.price} keyboardType="numeric"
                    onChangeText={(value) => updateClassEntry(entry.id, "price", value)}
                  />
                  <InputArea
                    placeholder="Describe the class, benefits, and what students will learn"
                    value={entry.description}
                    onChangeText={(value) => updateClassEntry(entry.id, "description", value)}
                  />
                </View>
              </React.Fragment>
            ))}
          </SectionCard>

          <SectionCard
            index={6}
            title="Instructors"
            subtitle="Add your yoga instructors"
            actionLabel="+ Add Instructor"
            onAction={addInstructorEntry}
            fadeIn={fadeIn}
          >
            {instructorEntries.map((entry, index) => (
              <React.Fragment key={entry.id}>
                <View style={styles.entryCard}>
                  <View style={styles.entryHeader}>
                    <Badge text={`Instructor #${index + 1}`} />
                    {instructorEntries.length > 1 && (
                      <Pressable style={styles.deleteButton} onPress={() => removeInstructorEntry(entry.id)}>
                        <Ionicons name="remove-circle-outline" size={20} color="#FF5A5F" />
                      </Pressable>
                    )}
                  </View>
                  <Field
                    label="Instructor Name"
                    placeholder="Instructor Name"
                    value={entry.name}
                    onChangeText={(value) => updateInstructorEntry(entry.id, "name", value)}
                  />
                  <DropdownField
                    label="Specialization"
                    placeholder="Select specialization"
                    options={INSTRUCTOR_SPECIALTIES}
                    value={instructorSpecialty}
                    dropdownId={`instructor-specialty-${entry.id}`}
                    activeDropdownId={activeDropdown}
                    onDropdownChange={setActiveDropdown}
                    onSelect={(value) => {
                      setInstructorSpecialty(value);
                      setActiveDropdown(null);
                    }}
                  />
                  <Field
                    label="Certification"
                    placeholder="Certification (e.g., RYT 200)"
                    value={entry.certification}
                    onChangeText={(value) => updateInstructorEntry(entry.id, "certification", value)}
                  />
                  <Field
                    label="Experience"
                    placeholder="Experience (e.g., 5 years)"
                    value={entry.experience} keyboardType="decimal-pad" 
                    onChangeText={(value) => updateInstructorEntry(entry.id, "experience", value)}
                  />
                  <Field
                    label="Email"
                    placeholder="instructor@example.com"
                    value={entry.email}
                    onChangeText={(value) => updateInstructorEntry(entry.id, "email", value)}
                  />
                  <Field
                    label="Phone"
                    placeholder="+91-XXXXXXXXXX"
                    value={entry.phone} keyboardType="numeric" maxLength={10}
                    onChangeText={(value) => updateInstructorEntry(entry.id, "phone", value)}
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

