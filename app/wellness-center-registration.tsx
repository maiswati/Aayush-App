import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
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
import { ACCENT, PRIMARY, wellnessCenterRegistrationStyles as styles } from "../app/styles/wellnessCenterRegistrationStyles";
import { WELLNESS_TREATMENTS } from "../data/dropdownOptions";


type TreatmentEntry = {
  id: string;
  treatmentName: string;
  minFee: string;
  maxFee: string;
  description: string;
  customTreatmentName?: string;
};

type PractitionerEntry = {
  id: string;
  practitionerName: string;
  qualification: string;
  experience: string;
  email: string;
  phone: string;
  customQualification?: string;
};

export default function WellnessCenterRegistration() {
  const router = useRouter();
  const heroAnim = useRef(new Animated.Value(0)).current;
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [treatmentEntries, setTreatmentEntries] = useState<TreatmentEntry[]>([
    { id: "treatment-1", treatmentName: "", minFee: "", maxFee: "", description: "" },
  ]);
  const [practitionerEntries, setPractitionerEntries] = useState<PractitionerEntry[]>([
    { id: "practitioner-1", practitionerName: "", qualification: "BAMS", experience: "", email: "", phone: "" },
  ]);

  useEffect(() => {
    Animated.spring(heroAnim, {
      toValue: 1,
      damping: 12,
      stiffness: 110,
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

  const addTreatmentEntry = () => {
    const newId = `treatment-${Date.now()}`;
    setTreatmentEntries((prev) => [...prev, { id: newId, treatmentName: "", minFee: "", maxFee: "", description: "" }]);
  };

  const removeTreatmentEntry = (id: string) => {
    if (treatmentEntries.length > 1) {
      setTreatmentEntries((prev) => prev.filter((e) => e.id !== id));
    }
  };

  const updateTreatmentEntry = (id: string, field: keyof TreatmentEntry, value: string) => {
    setTreatmentEntries((prev) => prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  };

  const addPractitionerEntry = () => {
    const newId = `practitioner-${Date.now()}`;
    setPractitionerEntries((prev) => [...prev, { id: newId, practitionerName: "", qualification: "BAMS", experience: "", email: "", phone: "" }]);
  };

  const removePractitionerEntry = (id: string) => {
    if (practitionerEntries.length > 1) {
      setPractitionerEntries((prev) => prev.filter((e) => e.id !== id));
    }
  };

  const updatePractitionerEntry = (id: string, field: keyof PractitionerEntry, value: string) => {
    setPractitionerEntries((prev) => prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  };

  
  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.sheet}>
          <Animated.View style={[styles.heroCard, fadeIn(0)]}>
            <Pressable style={styles.backRow} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={20} color={ACCENT} />
              <Text style={styles.backText}>Back</Text>
            </Pressable>
            <Text style={styles.title}>
              Wellness & Alternative Medicine Center Registration
            </Text>
            <Text style={styles.subtitle}>Complete your center or practice profile</Text>
          </Animated.View>

          <Animated.View style={[styles.infoCard, styles.shadowed, fadeIn(1)]}>
            <View style={styles.infoAvatar}>
              <Ionicons name="person-circle" size={38} color={PRIMARY} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.infoTitle}>Ref Agent John - ABC2023</Text>
              <View style={styles.infoMetaRow}>
                <Ionicons name="call-outline" size={16} color="#365743" />
                <Text style={styles.infoMeta}>7123815198</Text>
              </View>
              <View style={styles.infoMetaRow}>
                <Ionicons name="mail-outline" size={16} color="#365743" />
                <Text style={styles.infoMeta}>abcd@gmail.com</Text>
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

          <SectionCard index={3} title="Basic Information" subtitle="Your center details" fadeIn={fadeIn}>
            <Field label="Center Name" placeholder="Wellness & Healing Center" required />
            <Field label="Owner Name" placeholder="Owner" required />
            <Field label="Established Year" placeholder="YYYY" keyboardType="numeric" maxLength={4}/>
            <Field label="Email" placeholder="wellness@example.com" required />
            <Field label="Phone Number" placeholder="+91-XXXXXXXXXX" required keyboardType="numeric" maxLength={10}/>
            <InputArea placeholder="Tell us about your center, treatments, offerings" />
          </SectionCard>

          <SectionCard index={4} title="Operating Hours" subtitle="Set your center timings" fadeIn={fadeIn}>
            <Field label="Weekday Opening Time" placeholder="--:--" keyboardType="numeric" maxLength={4}/>
            <Field label="Weekday Closing Time" placeholder="--:--" keyboardType="numeric" maxLength={4}/>
            <Field label="Weekend Opening Time" placeholder="--:--" keyboardType="numeric" maxLength={4}/>
            <Field label="Weekend Closing Time" placeholder="--:--" keyboardType="numeric" maxLength={4}/>
          </SectionCard>

          <SectionCard
            index={5}
            title="Treatments & Therapies"
            subtitle="Add your treatments & pricing"
            actionLabel="+ Add Treatment"
            onAction={addTreatmentEntry}
            fadeIn={fadeIn}
          >
            {treatmentEntries.map((entry, index) => (
              <React.Fragment key={entry.id}>
                <View style={styles.entryCard}>
                  <View style={styles.entryHeader}>
                    <Badge text={`Treatment #${index + 1}`} />
                    {treatmentEntries.length > 1 && (
                      <Pressable style={styles.deleteButton} onPress={() => removeTreatmentEntry(entry.id)}>
                        <Ionicons name="remove-circle-outline" size={20} color="#FF5A5F" />
                      </Pressable>
                    )}
                  </View>
                  <DropdownField
                    label="Treatment Name"
                    placeholder="Select treatment"
                    options={WELLNESS_TREATMENTS}
                    value={entry.treatmentName}
                    dropdownId={`treatment-${entry.id}`}
                    activeDropdownId={activeDropdown}
                    onDropdownChange={setActiveDropdown}
                    onSelect={(value) => {
                      updateTreatmentEntry(entry.id, "treatmentName", value);
                      setActiveDropdown(null);
                    }}
                  />
                  
                  {entry.treatmentName === "Other" && (
                    <Field
                      label="Custom Treatment Name"
                      placeholder="Enter custom treatment name"
                      value={entry.customTreatmentName || ""}
                      onChangeText={(value) => updateTreatmentEntry(entry.id, "customTreatmentName", value)}
                    />
                  )}
                  <Field
                    label="Minimum Fee (₹)"
                    placeholder="500"
                    required
                    keyboardType="numeric"
                    value={entry.minFee}
                    onChangeText={(value) => updateTreatmentEntry(entry.id, "minFee", value)}
                  />
                  <Field
                    label="Maximum Fee (₹)"
                    placeholder="1000"
                    required
                    keyboardType="numeric"                  
                    value={entry.maxFee}
                    
                    onChangeText={(value) => updateTreatmentEntry(entry.id, "maxFee", value)}
                  />
                  <InputArea
                    placeholder="Treatment description"
                    value={entry.description}
                    onChangeText={(value) => updateTreatmentEntry(entry.id, "description", value)}
                  />
                </View>
              </React.Fragment>
            ))}
          </SectionCard>

          <SectionCard
            index={6}
            title="Practitioners"
            subtitle="Add your practitioners"
            actionLabel="+ Add Practitioner"
            onAction={addPractitionerEntry}
            fadeIn={fadeIn}
          >
            {practitionerEntries.map((entry, index) => (
              <React.Fragment key={entry.id}>
                <View style={styles.entryCard}>
                  <View style={styles.entryHeader}>
                    <Badge text={`Practitioner #${index + 1}`} />
                    {practitionerEntries.length > 1 && (
                      <Pressable style={styles.deleteButton} onPress={() => removePractitionerEntry(entry.id)}>
                        <Ionicons name="remove-circle-outline" size={20} color="#FF5A5F" />
                      </Pressable>
                    )}
                  </View>
                  <Field
                    label="Practitioner Name"
                    placeholder="Name" required 
                    value={entry.practitionerName}
                    onChangeText={(value) => updatePractitionerEntry(entry.id, "practitionerName", value)}
                  />
                  <DropdownField
                    label="Qualifications"
                    placeholder="Select qualification"
                    options={["BAMS", "MD (Ayurveda)", "BNYS", "DNYS", "Other"]}
                    value={entry.qualification}
                    dropdownId={`qualification-${entry.id}`}
                    activeDropdownId={activeDropdown}
                    onDropdownChange={setActiveDropdown}
                    onSelect={(value) => {
                      updatePractitionerEntry(entry.id, "qualification", value);
                      setActiveDropdown(null);
                    }}
                  />
                  {entry.qualification === "Other" && (
                    <Field
                      label="Custom Qualification"
                      placeholder="Enter custom qualification"
                      value={entry.customQualification || ""}
                      onChangeText={(value) => updatePractitionerEntry(entry.id, "customQualification", value)}
                    />
                  )}
                  <Field
                    label="Experience (Years)"
                    placeholder="5"
                    keyboardType="numeric"
                    value={entry.experience}
                    onChangeText={(value) => updatePractitionerEntry(entry.id, "experience", value)}
                  />
                  <Field
                    label="Email"
                    placeholder="practitioner@example.com"
                    value={entry.email}
                    onChangeText={(value) => updatePractitionerEntry(entry.id, "email", value)}
                  />
                  <Field
                    label="Phone"
                    placeholder="+91-xxxxx-xxxx "
                    keyboardType="numeric"
                    maxLength={10}
                    value={entry.phone}
                    onChangeText={(value) => updatePractitionerEntry(entry.id, "phone", value)}
                    required
                  />
                </View>
              </React.Fragment>
            ))}
          </SectionCard>

          <ContactAndSocialMedia contactIndex={7} socialIndex={8} fadeIn={fadeIn} facebookPlaceholder="https://facebook.com/your-center" youtubePlaceholder="https://youtube.com/@your-center" instagramPlaceholder="https://instagram.com/your-center" />

          <Animated.View style={[styles.actionRow, fadeIn(9)]}>
            <Pressable style={styles.secondaryButton}>
              <Text style={styles.secondaryText}>Save as Draft</Text>
            </Pressable>
            <Pressable style={styles.ctaButton}>
              <Text style={styles.ctaText}>Review and Submit</Text>
            </Pressable>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
}
  
