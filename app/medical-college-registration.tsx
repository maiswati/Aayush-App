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
import { ACCENT, PRIMARY, medicalCollegeRegistrationStyles as styles } from "../app/styles/medicalCollegeRegistrationStyles";
import { DESIGNATIONS, QUALIFICATIONS } from "../data/dropdownOptions";


type CourseEntry = {
  id: string;
  courseName: string;
  duration: string;
  seats: string;
  description: string;
};

type StaffMemberEntry = {
  id: string;
  name: string;
  designation: string;
  department: string;
  qualification: string;
  email: string;
  phone: string;
};

export default function MedicalCollegeRegistration() {
  const router = useRouter();
  const heroAnim = useRef(new Animated.Value(0)).current;
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showReview, setShowReview] = useState(false);
  const [courseEntries, setCourseEntries] = useState<CourseEntry[]>([
    { id: "course-1", courseName: "", duration: "", seats: "", description: "" },
  ]);
  const [staffMemberEntries, setStaffMemberEntries] = useState<StaffMemberEntry[]>([
    { id: "staff-1", name: "", designation: "Dean", department: "", qualification: "MBBS", email: "", phone: "" },
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

  const addCourseEntry = () => {
    const newId = `course-${Date.now()}`;
    setCourseEntries((prev) => [...prev, { id: newId, courseName: "", duration: "", seats: "", description: "" }]);
  };

  const removeCourseEntry = (id: string) => {
    if (courseEntries.length > 1) {
      setCourseEntries((prev) => prev.filter((e) => e.id !== id));
    }
  };

  const updateCourseEntry = (id: string, field: keyof CourseEntry, value: string) => {
    setCourseEntries((prev) => prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  };

  const addStaffMemberEntry = () => {
    const newId = `staff-${Date.now()}`;
    setStaffMemberEntries((prev) => [...prev, { id: newId, name: "", designation: "Dean", department: "", qualification: "MBBS", email: "", phone: "" }]);
  };

  const removeStaffMemberEntry = (id: string) => {
    if (staffMemberEntries.length > 1) {
      setStaffMemberEntries((prev) => prev.filter((e) => e.id !== id));
    }
  };

  const updateStaffMemberEntry = (id: string, field: keyof StaffMemberEntry, value: string) => {
    setStaffMemberEntries((prev) => prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
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
            <Text style={styles.title}>Medical College Registration</Text>
            <Text style={styles.subtitle}>Complete your college profile</Text>
          </Animated.View>

          <Animated.View style={[styles.infoCard, styles.shadowed, fadeIn(1)]}>
            <View style={styles.infoAvatar}>
              <Ionicons name="person-circle" size={38} color={PRIMARY} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.infoTitle}>Agent John - ABC2023</Text>
              <View style={styles.infoMetaRow}>
                <Ionicons name="call-outline" size={16} color="#365845" />
                <Text style={styles.infoMeta}>7123815198</Text>
              </View>
              <View style={styles.infoMetaRow}>
                <Ionicons name="mail-outline" size={16} color="#365845" />
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
              <Text style={styles.dropZoneText}>Click to upload or drag and drop</Text>
            </Pressable>
          </Animated.View>

          <SectionCard index={3} title="Basic Information" subtitle="Your medical college details" fadeIn={fadeIn}>
            <Field label="College Name" placeholder="ABC Medical College" required />
            <Field label="Affiliated University" placeholder="University Name" required />
            <Field label="Accreditation Year" placeholder="YYYY" keyboardType="numeric" maxLength={4} />
            <Field label="Email" placeholder="college@example.com" required />
            <Field label="Phone Number" placeholder="+91-XXXXXXXXXX" required keyboardType="numeric" maxLength={10} />
            <InputArea placeholder="Brief college introduction, history, and unique features" />
          </SectionCard>

          <SectionCard
            index={4}
            title="Courses Offered"
            subtitle="Add programs & courses available"
            actionLabel="+ Add Course"
            onAction={addCourseEntry}
            fadeIn={fadeIn}
          >
            {courseEntries.map((entry, index) => (
              <React.Fragment key={entry.id}>
                <View style={styles.entryCard}>
                  <View style={styles.entryHeader}>
                    <Badge text={`Course #${index + 1}`} />
                    {courseEntries.length > 1 && (
                      <Pressable style={styles.deleteButton} onPress={() => removeCourseEntry(entry.id)}>
                        <Ionicons name="remove-circle-outline" size={20} color="#FF5A5F" />
                      </Pressable>
                    )}
                  </View>
                  <Field
                    label="Course Name"
                    placeholder="Course Name (e.g., MBBS, MD)"
                    value={entry.courseName}
                    onChangeText={(value) => updateCourseEntry(entry.id, "courseName", value)}
                  />
                  <Field
                    label="Duration (Years)"
                    placeholder="e.g. 5"
                    value={entry.duration}
                    onChangeText={(value) => updateCourseEntry(entry.id, "duration", value)}
                    keyboardType="decimal-pad"
                  />
                  <Field
                    label="Available Seats"
                    placeholder="100"
                    required
                    keyboardType="numeric"
                    value={entry.seats}
                    onChangeText={(value) => updateCourseEntry(entry.id, "seats", value)}
                  />
                  <InputArea
                    placeholder="Course description and highlights..."
                    value={entry.description}
                    onChangeText={(value) => updateCourseEntry(entry.id, "description", value)}
                  />
                </View>
              </React.Fragment>
            ))}
          </SectionCard>

          <SectionCard index={5} title="Academic Excellence" subtitle="Showcase awards, credentials, and achievements" fadeIn={fadeIn}>
            <InputArea placeholder="List your achievements, awards, and recognitions..." />
          </SectionCard>

          <SectionCard
            index={6}
            title="Faculty & Staff"
            subtitle="Add your staff members"
            actionLabel="+ Add Staff Member"
            onAction={addStaffMemberEntry}
            fadeIn={fadeIn}
          >
            {staffMemberEntries.map((entry, index) => (
              <React.Fragment key={entry.id}>
                <View style={styles.entryCard}>
                  <View style={styles.entryHeader}>
                    <Badge text={`Staff Member #${index + 1}`} />
                    {staffMemberEntries.length > 1 && (
                      <Pressable style={styles.deleteButton} onPress={() => removeStaffMemberEntry(entry.id)}>
                        <Ionicons name="remove-circle-outline" size={20} color="#FF5A5F" />
                      </Pressable>
                    )}
                  </View>
                  <Field
                    label="Name"
                    placeholder="Name"
                    value={entry.name}
                    onChangeText={(value) => updateStaffMemberEntry(entry.id, "name", value)}
                  />
                  <DropdownField
                    label="Designation"
                    placeholder="Select designation"
                    options={DESIGNATIONS}
                    value={entry.designation}
                    dropdownId={`staff-designation-${entry.id}`}
                    activeDropdownId={activeDropdown}
                    onDropdownChange={setActiveDropdown}
                    onSelect={(value) => {
                      updateStaffMemberEntry(entry.id, "designation", value);
                      setActiveDropdown(null);
                    }}
                  />
                  <Field
                    label="Department"
                    placeholder="Department name"
                    value={entry.department}
                    onChangeText={(value) => updateStaffMemberEntry(entry.id, "department", value)}
                  />
                  <DropdownField
                    label="Qualification"
                    placeholder="Select qualification"
                    options={QUALIFICATIONS}
                    value={entry.qualification}
                    dropdownId={`staff-qualification-${entry.id}`}
                    activeDropdownId={activeDropdown}
                    onDropdownChange={setActiveDropdown}
                    onSelect={(value) => {
                      updateStaffMemberEntry(entry.id, "qualification", value);
                      setActiveDropdown(null);
                    }}
                  />
                  <Field
                    label="Email"
                    placeholder="staff@example.com"
                    value={entry.email}
                    onChangeText={(value) => updateStaffMemberEntry(entry.id, "email", value)}
                  />
                  <Field
                    label="Phone"
                    placeholder="+1 (XXX) XXX-XXXX"
                    required
                    keyboardType="numeric"
                    maxLength={10}
                    value={entry.phone}
                    onChangeText={(value) => updateStaffMemberEntry(entry.id, "phone", value)}
                  />
                </View>
              </React.Fragment>
            ))}
          </SectionCard>

          <ContactAndSocialMedia contactIndex={7} socialIndex={8} fadeIn={fadeIn} facebookPlaceholder="https://facebook.com/your-college" youtubePlaceholder="https://youtube.com/@your-college" instagramPlaceholder="https://instagram.com/your-college" />

          <Animated.View style={[styles.actionRow, fadeIn(9)]}>
            <Pressable style={styles.secondaryButton} >
              <Text style={styles.secondaryText}>Save as Draft</Text>
            </Pressable>
            <Pressable style={styles.ctaButton} >
              <Text style={styles.ctaText}>Review and Submit</Text>
            </Pressable>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
}

