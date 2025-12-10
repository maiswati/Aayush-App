import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View
} from "react-native";
import {
  Badge,
  ContactAndSocialMedia,
  DropdownField,
  EducationSection,
  Field,
  InputArea,
  SectionCard,
  WorkExperienceSection
} from "../app/components";
import { ACCENT, PRIMARY, doctorRegistrationStyles as styles } from "../app/styles/doctorRegistrationStyles";

import {
  DOCTOR_SPECIALIZATIONS,
  EDUCATION_DOCUMENT_OPTIONS_doc,
  EMPLOYMENT_TYPES,
  EXPERIENCE_DOCUMENT_OPTIONS_doc,
  PROFESSIONAL_STATUS,
  QUALIFICATIONS
} from "../data/dropdownOptions";


type EducationEntry = {
  id: string;
  qualification: string;
  institution: string;
  year: string;
  documents: DocumentEntry[];
};

type WorkExperienceEntry = {
  id: string;
  organization: string;
  role: string;
  employmentType: string;
  startDate: string;
  endDate: string;
  current: boolean;
  documents: DocumentEntry[];
};

type ServiceEntry = {
  id: string;
  name: string;
  minFee: string;
  maxFee: string;
  description: string;
};


type DocumentEntry = {
  id: string;
  type: string;
  fileName?: string;
};

export default function DoctorRegistration() {
  const router = useRouter();
  const heroAnim = useRef(new Animated.Value(0)).current;
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>("");
  const [customSpecialization, setCustomSpecialization] = useState<string>("");
  const [professionalStatus, setProfessionalStatus] = useState<string>("");
  const [educationQualification, setEducationQualification] = useState<string>("");
  const [employmentType, setEmploymentType] = useState<string>("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedEducationDoc, setSelectedEducationDoc] = useState("");
  const [selectedExperienceDoc, setSelectedExperienceDoc] = useState("");
    const [educationEntries, setEducationEntries] = useState<EducationEntry[]>([
    { id: "edu-1", qualification: "", institution: "", year: "", documents: [] },
  ]);
  const [workExperienceEntries, setWorkExperienceEntries] = useState<WorkExperienceEntry[]>([
    { id: "exp-1", organization: "", role: "", employmentType: "", startDate: "", endDate: "", current: false, documents: [] },
  ]);
  const [serviceEntries, setServiceEntries] = useState<ServiceEntry[]>([
    { id: "svc-1", name: "", minFee: "", maxFee: "", description: "" },
  ]);

  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [currentDateField, setCurrentDateField] = useState<string>("");
  const [tempDate, setTempDate] = useState(new Date());

  useEffect(() => {
    Animated.spring(heroAnim, {
      toValue: 1,
      damping: 12,
      stiffness: 100,
      useNativeDriver: true,
    }).start();
  }, [heroAnim]);

  const fadeIn = (index: number) => ({
    opacity: heroAnim,
    transform: [
      {
        translateY: heroAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [24 + index * 5, 0],
        }),
      },
    ],
  });

  const showDatePicker = (fieldId: string, currentValue: string) => {
    console.log('showDatePicker called with:', fieldId, currentValue);
    setCurrentDateField(fieldId);
    if (currentValue) {
      const [day, month, year] = currentValue.split('-');
      setTempDate(new Date(parseInt(year), parseInt(month) - 1, parseInt(day)));
    } else {
      setTempDate(new Date());
    }
    setDatePickerVisible(true);
    console.log('DatePicker should now be visible');
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setDatePickerVisible(false);
    if (selectedDate) {
      const formattedDate = `${selectedDate.getDate().toString().padStart(2, '0')}-${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}-${selectedDate.getFullYear()}`;
      
      if (currentDateField.includes('startDate')) {
        const [entryId] = currentDateField.split('-');
        updateWorkExperienceEntry(entryId, "startDate", formattedDate);
      } else if (currentDateField.includes('endDate')) {
        const [entryId] = currentDateField.split('-');
        updateWorkExperienceEntry(entryId, "endDate", formattedDate);
      }
    }
  };

  const addEducationEntry = () => {
    const newId = `edu-${Date.now()}`;
    setEducationEntries((prev) => [...prev, { id: newId, qualification: "", institution: "", year: "", documents: [] }]);
  };

  const removeEducationEntry = (id: string) => {
    if (educationEntries.length > 1) {
      setEducationEntries((prev) => prev.filter((e) => e.id !== id));
    }
  };

  const updateEducationEntry = (id: string, field: keyof EducationEntry, value: string | DocumentEntry[]) => {
    setEducationEntries((prev) => prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  };

  const addWorkExperienceEntry = () => {
    const newId = `exp-${Date.now()}`;
    setWorkExperienceEntries((prev) => [
      ...prev,
      { id: newId, organization: "", role: "", employmentType: "", startDate: "", endDate: "", current: false, documents: [] },
    ]);
  };

  const removeWorkExperienceEntry = (id: string) => {
    if (workExperienceEntries.length > 1) {
      setWorkExperienceEntries((prev) => prev.filter((e) => e.id !== id));
    }
  };

  const updateWorkExperienceEntry = (id: string, field: keyof WorkExperienceEntry, value: string | boolean | DocumentEntry[]) => {
    setWorkExperienceEntries((prev) => prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  };

  const addServiceEntry = () => {
    const newId = `svc-${Date.now()}`;
    setServiceEntries((prev) => [...prev, { id: newId, name: "", minFee: "", maxFee: "", description: "" }]);
  };

  const removeServiceEntry = (id: string) => {
    if (serviceEntries.length > 1) {
      setServiceEntries((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const updateServiceEntry = (id: string, field: keyof ServiceEntry, value: string) => {
    setServiceEntries((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const addDocumentToEducation = (entryId: string, docType: string) => {
    const newDoc: DocumentEntry = { id: `doc-${Date.now()}`, type: docType };
    updateEducationEntry(entryId, "documents", [...(educationEntries.find(e => e.id === entryId)?.documents || []), newDoc]);
  };

  const removeDocumentFromEducation = (entryId: string, docId: string) => {
    const currentDocs = educationEntries.find(e => e.id === entryId)?.documents || [];
    updateEducationEntry(entryId, "documents", currentDocs.filter(doc => doc.id !== docId));
  };

  const addDocumentToWorkExperience = (entryId: string, docType: string) => {
    const newDoc: DocumentEntry = { id: `doc-${Date.now()}`, type: docType };
    updateWorkExperienceEntry(entryId, "documents", [...(workExperienceEntries.find(e => e.id === entryId)?.documents || []), newDoc]);
  };

  const removeDocumentFromWorkExperience = (entryId: string, docId: string) => {
    const currentDocs = workExperienceEntries.find(e => e.id === entryId)?.documents || [];
    updateWorkExperienceEntry(entryId, "documents", currentDocs.filter(doc => doc.id !== docId));
  };

  const handleAddEducationDocument = (entryId: string) => {
    if (selectedEducationDoc) {
      addDocumentToEducation(entryId, selectedEducationDoc);
      setSelectedEducationDoc("");
    }
  };

  const handleAddExperienceDocument = (entryId: string) => {
    if (selectedExperienceDoc) {
      addDocumentToWorkExperience(entryId, selectedExperienceDoc);
      setSelectedExperienceDoc("");
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.heroAccent} />
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.sheet}>
          <Animated.View style={[styles.heroCard, fadeIn(0)]}>
            <Pressable style={styles.backRow} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={20} color={ACCENT} />
              <Text style={styles.backText}>Back</Text>
            </Pressable>
            <Text style={styles.title}>Doctor Registration</Text>
            <Text style={styles.subtitle}>Complete your professional profile</Text>
          </Animated.View>

          <Animated.View style={[styles.infoCard, styles.shadowed, fadeIn(0)]}>
          <View style={styles.infoAvatar}>
            <Ionicons name="person-circle" size={36} color={PRIMARY} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.infoTitle}>Registered via Referral Agent/Broker</Text>
            <Text style={styles.infoHighlight}>Ref byjupiterMike - ABCD@23</Text>
            <View style={styles.infoMetaRow}>
              <Ionicons name="call-outline" size={16} color="#4D5E56" />
              <Text style={styles.infoMetaText}>XXXXXX</Text>
            </View>
            <View style={styles.infoMetaRow}>
              <Ionicons name="mail-outline" size={16} color="#4D5E56" />
              <Text style={styles.infoMetaText}>abcd@gmail.com</Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View style={[styles.dualCard, styles.shadowed, fadeIn(1)]}>
          <View style={{ flex: 1 }}>
            <Text style={styles.dualTitle}>Create and manage patient profiles</Text>
            <Text style={styles.dualSubtitle}>Build trust with guided onboarding steps.</Text>
          </View>
          <Pressable style={styles.dualButton}>
            <Text style={styles.dualButtonText}>Go to Patient Profile</Text>
          </Pressable>
        </Animated.View>

        <Animated.View style={[styles.card, styles.shadowed, fadeIn(2)]}>
          <Text style={styles.cardTitle}>Upload Document for Auto Fill</Text>
          <Text style={styles.cardSubtitle}>
            Upload your ID, certificate or any document. We'll automatically extract details.
          </Text>
          <Pressable style={styles.dropZone}>
            <Ionicons name="cloud-upload-outline" size={28} color={PRIMARY} />
            <Text style={styles.dropZoneText}>Click to upload or drag and drop</Text>
          </Pressable>
        </Animated.View>

        <SectionCard index={3} title="Basic Information" subtitle="Your professional details and credentials" fadeIn={fadeIn}>
          <Field placeholder="Ex: Dr. Arun Kumar" label="Full Name" required />
          <DropdownField
            label="Specialization"
            placeholder="Select specialization"
            options={DOCTOR_SPECIALIZATIONS}
            value={selectedSpecialization}
            dropdownId="specialization"
            activeDropdownId={activeDropdown}
            onDropdownChange={setActiveDropdown}
            onSelect={(value) => {
              setSelectedSpecialization(value);
              if (value !== "Other") {
                setCustomSpecialization("");
              }
            }}
          />
          {selectedSpecialization === "Other" && (
            <Field
              placeholder="Enter specialization"
              label="Your Specialization"
              value={customSpecialization}
              onChangeText={setCustomSpecialization}
              required
            />
          )}
          <Field placeholder="MCI/SMC Number" label="Medical Registration Number" required />
          <Field placeholder="doctor@example.com" label="Email" />
          <Field placeholder="+91-XXXXXXXXXX" label="Phone Number"  keyboardType="numeric" maxLength={6}/>
          <DropdownField
            label="Professional Status"
            placeholder="Select status"
            options={PROFESSIONAL_STATUS}
            value={professionalStatus}
            dropdownId="professional-status"
            activeDropdownId={activeDropdown}
            onDropdownChange={setActiveDropdown}
            raiseOnOpen
            onSelect={setProfessionalStatus}
          />
        </SectionCard>

        <SectionCard index={4} title="Professional Introduction" subtitle="Write about yourself and your expertise" fadeIn={fadeIn}>
          <InputArea placeholder="Write about your background, experience, and approach to patient care" />
        </SectionCard>

        <EducationSection
          educationEntries={educationEntries}
          selectedEducationDoc={selectedEducationDoc}
          activeDropdown={activeDropdown}
          qualificationOptions={QUALIFICATIONS}
          educationDocumentOptions={EDUCATION_DOCUMENT_OPTIONS_doc}
          educationIndex={5}
          fadeIn={fadeIn}
          onAddEducationEntry={addEducationEntry}
          onRemoveEducationEntry={removeEducationEntry}
          onUpdateEducationEntry={updateEducationEntry}
          onDropdownChange={setActiveDropdown}
          onSelectEducationDoc={setSelectedEducationDoc}
          onAddEducationDocument={handleAddEducationDocument}
          styles={styles}
          useQualificationDropdown={true}
        />

        <WorkExperienceSection
          workExperienceEntries={workExperienceEntries}
          selectedExperienceDoc={selectedExperienceDoc}
          activeDropdown={activeDropdown}
          experienceDocumentOptions={EXPERIENCE_DOCUMENT_OPTIONS_doc}
          employmentTypeOptions={EMPLOYMENT_TYPES}
          experienceIndex={6}
          fadeIn={fadeIn}
          onAddWorkExperienceEntry={addWorkExperienceEntry}
          onRemoveWorkExperienceEntry={removeWorkExperienceEntry}
          onUpdateWorkExperienceEntry={updateWorkExperienceEntry}
          onDropdownChange={setActiveDropdown}
          onSelectExperienceDoc={setSelectedExperienceDoc}
          onAddExperienceDocument={handleAddExperienceDocument}
          onShowDatePicker={showDatePicker}
          styles={styles}
          useEmploymentType={true}
          useDateFields={true}
        />

        <SectionCard index={7} title="Fees & Services" subtitle="Add your consultation charges" actionLabel="+ Add Service" onAction={addServiceEntry} fadeIn={fadeIn}>
          {serviceEntries.map((entry, index) => (
            <React.Fragment key={entry.id}>
              <View style={styles.entryCard}>
                <View style={styles.entryHeader}>
                  <Badge text={`Service #${index + 1}`} />
                  {serviceEntries.length > 1 && (
                    <Pressable style={styles.deleteButton} onPress={() => removeServiceEntry(entry.id)}>
                      <Ionicons name="remove-circle-outline" size={20} color="#FF5A5F" />
                    </Pressable>
                  )}
                </View>
                <Field
                  placeholder="Service Name (e.g., Consultation)"
                  label="Service Name"
                  value={entry.name}
                  onChangeText={(value) => updateServiceEntry(entry.id, "name", value)}
                />
                <Field
                  placeholder="500"
                  label="Minimum Fee (₹)"
                  value={entry.minFee}  keyboardType="numeric"
                  onChangeText={(value) => updateServiceEntry(entry.id, "minFee", value)}
                />
                <Field
                  placeholder="1000"
                  label="Maximum Fee (₹)"
                  value={entry.maxFee}  keyboardType="numeric"
                  onChangeText={(value) => updateServiceEntry(entry.id, "maxFee", value)}
                />
                <InputArea
                  placeholder="Describe what this service includes..."
                  value={entry.description}
                  onChangeText={(value) => updateServiceEntry(entry.id, "description", value)}
                />
              </View>
            </React.Fragment>
          ))}
        </SectionCard>

        <ContactAndSocialMedia contactIndex={8} socialIndex={9} fadeIn={fadeIn} />

          <Animated.View style={[styles.actionRow, fadeIn(10)]}>
            <Pressable style={styles.secondaryButton}>
              <Text style={styles.secondaryText}>Save as Draft</Text>
            </Pressable>
            <Pressable style={styles.ctaButton}>
              <Text style={styles.ctaText}>Review and Submit</Text>
            </Pressable>
          </Animated.View>
        </View>
      </ScrollView>

      {datePickerVisible && (
        <DateTimePicker
          value={tempDate}
          mode="date"
          display="calendar"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
}

