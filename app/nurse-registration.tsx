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
  TextInput,
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
  WorkExperienceSection,
} from "../app/components";
import { ACCENT, PRIMARY, nurseRegistrationStyles as styles } from "../app/styles/nurseRegistrationStyles";
import { NURSE_EDUCATION_DOCUMENTS, NURSE_EXPERIENCE_DOCUMENTS, NURSE_QUALIFICATIONS, NURSE_SERVICES, PROFESSIONAL_STATUS } from "../data/dropdownOptions";


type DocumentEntry = {
  id: string;
  type: string;
  fileName?: string;
};

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
  employmentType?: string;
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

export default function NurseRegistration() {
  const router = useRouter();
  const heroAnim = useRef(new Animated.Value(0)).current;
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedQualification, setSelectedQualification] = useState("");
    const [selectedEducationDoc, setSelectedEducationDoc] = useState("");
  const [selectedExperienceDoc, setSelectedExperienceDoc] = useState("");
  const [selectedNurseService, setSelectedNurseService] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
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
    Animated.timing(heroAnim, {
      toValue: 1,
      duration: 600,
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
    setCurrentDateField(fieldId);
    if (currentValue) {
      const [day, month, year] = currentValue.split('-');
      setTempDate(new Date(parseInt(year), parseInt(month) - 1, parseInt(day)));
    } else {
      setTempDate(new Date());
    }
    setDatePickerVisible(true);
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
    setWorkExperienceEntries((prev) => [...prev, { id: newId, organization: "", role: "", employmentType: "", startDate: "", endDate: "", current: false, documents: [] }]);
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

  const handleAddEducationDocument = () => {
    if (!selectedEducationDoc) return;
    const newDoc: DocumentEntry = { id: `doc-${Date.now()}`, type: selectedEducationDoc };
    const updatedEntries = educationEntries.map(entry => 
      entry.id === educationEntries[0].id 
        ? { ...entry, documents: [...entry.documents, newDoc] }
        : entry
    );
    setEducationEntries(updatedEntries);
    setSelectedEducationDoc("");
    setActiveDropdown(null);
  };

  const handleAddExperienceDocument = () => {
    if (!selectedExperienceDoc) return;
    const newDoc: DocumentEntry = { id: `doc-${Date.now()}`, type: selectedExperienceDoc };
    const updatedEntries = workExperienceEntries.map(entry => 
      entry.id === workExperienceEntries[0].id 
        ? { ...entry, documents: [...entry.documents, newDoc] }
        : entry
    );
    setWorkExperienceEntries(updatedEntries);
    setSelectedExperienceDoc("");
    setActiveDropdown(null);
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
            <Text style={styles.title}>Nurse Registration</Text>
            <Text style={styles.subtitle}>Complete your professional profile</Text>
          </Animated.View>

          <Animated.View style={[styles.infoCard, styles.shadowed, fadeIn(1)]}>
            <View style={styles.infoAvatar}>
              <Ionicons name="person-circle" size={36} color={PRIMARY} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.infoTitle}>Registered via Referral Agent/Broker</Text>
              <Text style={styles.infoHighlight}>Ref byjupiterMike - ABCD@23</Text>
              <View style={styles.infoRow}>
                <Ionicons name="call-outline" size={16} color="#4D5E56" />
                <Text style={styles.infoMetaText}>XXXXXX</Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="mail-outline" size={16} color="#4D5E56" />
                <Text style={styles.infoMetaText}>abcd@gmail.com</Text>
              </View>
            </View>
          </Animated.View>

          <Animated.View style={[styles.card, styles.shadowed, fadeIn(2)]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>Create and manage patient profiles</Text>
              <Text style={styles.cardSubtitle}>Build trust with guided onboarding steps.</Text>
            </View>
            <Pressable style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Go to Patient Profile</Text>
            </Pressable>
          </Animated.View>

          <Animated.View style={[styles.card, styles.shadowed, fadeIn(3)]}>
            <Text style={styles.cardTitle}>Upload Document for Auto Fill</Text>
            <Text style={styles.cardSubtitle}>
              Upload your ID, certificate or any document. We'll automatically extract the information.
            </Text>
            <Pressable style={styles.dropZone}>
              <Ionicons name="cloud-upload-outline" size={28} color={PRIMARY} />
              <Text style={styles.dropZoneText}>Click to upload or drag and drop</Text>
            </Pressable>
          </Animated.View>

          <SectionCard index={4} title="Basic Information" subtitle="Your professional details and credentials" fadeIn={fadeIn}>
            <Field label="Full Name" placeholder="Ex: Ms. Sarah Johnson" required />
            <DropdownField
              label="Qualification"
              placeholder="Ex: B.Sc, GNM, ANM"
              options={NURSE_QUALIFICATIONS}
              value={selectedQualification}
              dropdownId="qualification"
              activeDropdownId={activeDropdown}
              onDropdownChange={setActiveDropdown}
              onSelect={(value) => {
                setSelectedQualification(value);
                setActiveDropdown(null);
              }}
            />
            <Field label="Nursing Council Registration Number" placeholder="Nursing Council Number" required />
            <Field label="Email" placeholder="nurse@example.com" required />
            <Field label="Phone Number" placeholder="+91-XXXXXXXXXX" required keyboardType="numeric" maxLength={10}/>
            <DropdownField
              label="Professional Status"
              placeholder="Select status"
              options={PROFESSIONAL_STATUS}
              value={selectedStatus}
              dropdownId="professional-status"
              activeDropdownId={activeDropdown}
              onDropdownChange={setActiveDropdown}
              onSelect={(value) => {
                setSelectedStatus(value);
                setActiveDropdown(null);
              }}
            />
          </SectionCard>

          <SectionCard index={5} title="Professional Introduction" subtitle="Write about yourself and your expertise" fadeIn={fadeIn}>
            <InputArea placeholder="Write about your background, experience, and approach to nursing" />
          </SectionCard>

          <EducationSection
            educationEntries={educationEntries}
            selectedEducationDoc={selectedEducationDoc}
            activeDropdown={activeDropdown}
            qualificationOptions={NURSE_QUALIFICATIONS}
            educationDocumentOptions={NURSE_EDUCATION_DOCUMENTS}
            educationIndex={6}
            fadeIn={fadeIn}
            onAddEducationEntry={addEducationEntry}
            onRemoveEducationEntry={removeEducationEntry}
            onUpdateEducationEntry={updateEducationEntry}
            onDropdownChange={setActiveDropdown}
            onSelectEducationDoc={setSelectedEducationDoc}
            onAddEducationDocument={handleAddEducationDocument}
            styles={styles}
            useQualificationDropdown={false}
            qualificationPlaceholder="Ex: BSc Nursing"
          />

          <WorkExperienceSection
            workExperienceEntries={workExperienceEntries}
            selectedExperienceDoc={selectedExperienceDoc}
            activeDropdown={activeDropdown}
            experienceDocumentOptions={NURSE_EXPERIENCE_DOCUMENTS}
            experienceIndex={7}
            fadeIn={fadeIn}
            onAddWorkExperienceEntry={addWorkExperienceEntry}
            onRemoveWorkExperienceEntry={removeWorkExperienceEntry}
            onUpdateWorkExperienceEntry={updateWorkExperienceEntry}
            onDropdownChange={setActiveDropdown}
            onSelectExperienceDoc={setSelectedExperienceDoc}
            onAddExperienceDocument={handleAddExperienceDocument}
            onShowDatePicker={showDatePicker}
            styles={styles}
            useEmploymentType={false}
            useDateFields={true}
            organizationLabel="Organization/Hospital"
            organizationPlaceholder="Organization/Hospital"
          />

          <SectionCard index={8} title="Standard Fees ₹" subtitle="Set your standard service rates (Min - Max)" fadeIn={fadeIn}>
            <View style={styles.feesRow}>
              <Text style={styles.label}>Per Day </Text>
              <View style={styles.feeInputs}>
                <TextInput
                  style={[styles.input, styles.feeInput]}
                  placeholder="Min"
                  placeholderTextColor="#7C8A83"
                />
                <TextInput
                  style={[styles.input, styles.feeInput]}
                  placeholder="Max"
                  placeholderTextColor="#7C8A83"
                />
              </View>
            </View>
            <View style={styles.feesRow}>
              <Text style={styles.label}>Night Day</Text>
              <View style={styles.feeInputs}>
                <TextInput
                  style={[styles.input, styles.feeInput]}
                  placeholder="Min"
                  placeholderTextColor="#7C8A83"
                />
                <TextInput
                  style={[styles.input, styles.feeInput]}
                  placeholder="Max"
                  placeholderTextColor="#7C8A83"
                />
              </View>
            </View>
            <View style={styles.feesRow}>
              <Text style={styles.label}>Per Hour</Text>
              <View style={styles.feeInputs}>
                <TextInput
                  style={[styles.input, styles.feeInput]}
                  placeholder="Min"
                  placeholderTextColor="#7C8A83"
                />
                <TextInput
                  style={[styles.input, styles.feeInput]}
                  placeholder="Max"
                  placeholderTextColor="#7C8A83"
                />
              </View>
            </View>
          </SectionCard>

          <SectionCard index={9} title="Special Services & Fees" subtitle="Add any services you provide" actionLabel="+ Add Service" onAction={addServiceEntry} fadeIn={fadeIn}>
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
                  <DropdownField
                    label="Service Name"
                    placeholder="Select service"
                    options={NURSE_SERVICES}
                    value={entry.name}
                    dropdownId={`nurse-service-${entry.id}`}
                    activeDropdownId={activeDropdown}
                    onDropdownChange={setActiveDropdown}
                    onSelect={(value) => {
                      updateServiceEntry(entry.id, "name", value);
                      setActiveDropdown(null);
                    }}
                  />
                  <Field
                    label="Min Fee (₹)"
                    placeholder="Minimum fee"
                    value={entry.minFee} keyboardType="numeric"
                    onChangeText={(value) => updateServiceEntry(entry.id, "minFee", value)}
                  />
                  <Field
                    label="Max Fee (₹)"
                    placeholder="Maximum fee"
                    value={entry.maxFee} keyboardType="numeric" 
                    onChangeText={(value) => updateServiceEntry(entry.id, "maxFee", value)}
                  />
                  <InputArea
                    placeholder="Describe the service in detail"
                    value={entry.description}
                    onChangeText={(value) => updateServiceEntry(entry.id, "description", value)}
                  />
                </View>
              </React.Fragment>
            ))}
          </SectionCard>

          <ContactAndSocialMedia contactIndex={10} socialIndex={11} fadeIn={fadeIn} />

          <Animated.View style={[styles.actionRow, fadeIn(12)]}>
            <Pressable style={styles.secondaryButton}>
              <Text style={styles.secondaryText}>Save as Draft</Text>
            </Pressable>
            <Pressable style={styles.ctaButton}>
              <Text style={styles.ctaText}>Continue to Review</Text>
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


