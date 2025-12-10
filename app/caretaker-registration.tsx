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
  View,
  ViewStyle
} from "react-native";
import {
  Badge,
  ContactAndSocialMedia,
  DropdownField,
  Field,
  InputArea,
  SectionCard,
  WorkExperienceSection
} from "../app/components";
import { ACCENT, PRIMARY, caretakerRegistrationStyles as styles } from "../app/styles/caretakerRegistrationStyles";
import { CARETAKER_SERVICES, PROFESSIONAL_STATUS } from "../data/dropdownOptions";

const CARETAKER_EXPERIENCE_DOCUMENTS = [
  "Experience Certificate",
  "Previous Employment Letter", 
  "Service Certificate",
  "Reference Letter",
  "Work Portfolio",
  "Other",
];

type ExperienceEntry = {
  id: string;
  organization: string;
  role: string;
  employmentType: string;
  startDate: string;
  endDate: string;
  current: boolean;
  documents: any[];
};

type ServiceEntry = {
  id: string;
  serviceName: string;
  minFee: string;
  maxFee: string;
  description: string;
};

export default function CaretakerRegistration() {
  const router = useRouter();
  const heroAnim = useRef(new Animated.Value(0)).current;
  const [selectedStatus, setSelectedStatus] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedExperienceDoc, setSelectedExperienceDoc] = useState("");
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [currentDateField, setCurrentDateField] = useState<string>("");
  const [tempDate, setTempDate] = useState(new Date());
  const [experienceEntries, setExperienceEntries] = useState<ExperienceEntry[]>([
    { id: "exp-1", organization: "", role: "", employmentType: "", startDate: "", endDate: "", current: false, documents: [] },
  ]);
  const [serviceEntries, setServiceEntries] = useState<ServiceEntry[]>([
    { id: "service-1", serviceName: "", minFee: "", maxFee: "", description: "" },
  ]);

  useEffect(() => {
    Animated.spring(heroAnim, {
      toValue: 1,
      damping: 12,
      stiffness: 100,
      useNativeDriver: true,
    }).start();
  }, [heroAnim]);

  
  const fadeIn = (index: number): ViewStyle => ({
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

  const addExperienceEntry = () => {
    const newId = `exp-${Date.now()}`;
    setExperienceEntries((prev) => [...prev, { id: newId, organization: "", role: "", employmentType: "", startDate: "", endDate: "", current: false, documents: [] }]);
  };

  const removeExperienceEntry = (id: string) => {
    if (experienceEntries.length > 1) {
      setExperienceEntries((prev) => prev.filter((e) => e.id !== id));
    }
  };

  const updateExperienceEntry = (id: string, field: keyof ExperienceEntry, value: string | boolean | any[]) => {
    setExperienceEntries((prev) => prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  };

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
        updateExperienceEntry(entryId, "startDate", formattedDate);
      } else if (currentDateField.includes('endDate')) {
        const [entryId] = currentDateField.split('-');
        updateExperienceEntry(entryId, "endDate", formattedDate);
      }
    }
  };

  const addServiceEntry = () => {
    const newId = `service-${Date.now()}`;
    setServiceEntries((prev) => [...prev, { id: newId, serviceName: "", minFee: "", maxFee: "", description: "" }]);
  };

  const removeServiceEntry = (id: string) => {
    if (serviceEntries.length > 1) {
      setServiceEntries((prev) => prev.filter((e) => e.id !== id));
    }
  };

  const updateServiceEntry = (id: string, field: keyof ServiceEntry, value: string) => {
    setServiceEntries((prev) => prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  };

  const handleAddExperienceDocument = () => {
    if (!selectedExperienceDoc) return;
    const newDoc = { id: `doc-${Date.now()}`, type: selectedExperienceDoc };
    const updatedEntries = experienceEntries.map(entry => 
      entry.id === experienceEntries[0].id 
        ? { ...entry, documents: [...entry.documents, newDoc] }
        : entry
    );
    setExperienceEntries(updatedEntries);
    setSelectedExperienceDoc("");
    setActiveDropdown(null);
  };

  
  
  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sheet}>
          <Animated.View style={[styles.heroCard, fadeIn(0)]}>
            <Pressable style={styles.backRow} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={20} color={ACCENT} />
              <Text style={styles.backText}>Back</Text>
            </Pressable>
            <Text style={styles.title}>Caretaker / Aaya Registration</Text>
            <Text style={styles.subtitle}>Complete your professional profile</Text>
          </Animated.View>

          <Animated.View style={[styles.infoCard, styles.shadowed, fadeIn(1)]}>
            <View style={styles.infoAvatar}>
              <Ionicons name="person-circle" size={36} color={PRIMARY} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.infoTitle}>Registered via Referral Agent/Broker</Text>
              <Text style={styles.infoHighlight}>Ref byjupiterMike - ABCD@23</Text>
              <View style={styles.infoMetaRow}>
                <Ionicons name="call-outline" size={16} color="#1C5A38" />
                <Text style={styles.infoMetaText}>XXXXXX</Text>
              </View>
              <View style={styles.infoMetaRow}>
                <Ionicons name="mail-outline" size={16} color="#1C5A38" />
                <Text style={styles.infoMetaText}>abcd@gmail.com</Text>
              </View>
            </View>
          </Animated.View>

          <Animated.View style={[styles.dualCard, styles.shadowed, fadeIn(2)]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.dualTitle}>Create and manage patient profiles</Text>
              <Text style={styles.dualSubtitle}>Build trust with guided onboarding steps.</Text>
            </View>
            <Pressable style={styles.dualButton}>
              <Text style={styles.dualButtonText}>Go to Patient Profile</Text>
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

          <SectionCard
            index={4}
            title="Basic Information"
            subtitle="Your professional details and credentials"
            fadeIn={fadeIn}
          >
            <Field label="Full Name" placeholder="Ex: Mr. John Smith" required />
            <Field label="Skills & Specialization" placeholder="Ex: Elderly Care, Patient Handling" required />
            <Field label="Email" placeholder="caretaker@example.com" required />
            <Field label="Phone Number" placeholder="+91-XXXXXXXXX" required keyboardType="numeric" maxLength={10}/>
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

          <SectionCard
            index={5}
            title="Professional Introduction"
            subtitle="Write about yourself and your expertise"
            fadeIn={fadeIn}
          >
            <InputArea placeholder="Write about your background, experience, and approach to caregiving" />
          </SectionCard>

          <WorkExperienceSection
            workExperienceEntries={experienceEntries}
            selectedExperienceDoc={selectedExperienceDoc}
            activeDropdown={activeDropdown}
            experienceDocumentOptions={CARETAKER_EXPERIENCE_DOCUMENTS}
            experienceIndex={6}
            fadeIn={fadeIn}
            onAddWorkExperienceEntry={addExperienceEntry}
            onRemoveWorkExperienceEntry={removeExperienceEntry}
            onUpdateWorkExperienceEntry={updateExperienceEntry}
            onDropdownChange={setActiveDropdown}
            onSelectExperienceDoc={setSelectedExperienceDoc}
            onAddExperienceDocument={handleAddExperienceDocument}
            onShowDatePicker={showDatePicker}
            styles={styles}
            useEmploymentType={false}
            useDateFields={true}
            organizationLabel="Location/Organization or Family Name"
            organizationPlaceholder="Location/Organization or Family Name"
          />

          <SectionCard index={7} title="Standard Fees" subtitle="Set your standard service rates (Min - Max)" fadeIn={fadeIn}>
            <View style={styles.feesRow}>
              <Text style={styles.label}>Per Day ₹</Text>
              <View style={styles.feeInputs}>
                <Field label="Min Fee" placeholder="Min" />
                <Field label="Max Fee" placeholder="Max" />
              </View>
            </View>
            <View style={styles.feesRow}>
              <Text style={styles.label}>Night Day ₹</Text>
              <View style={styles.feeInputs}>
                <Field label="Min Fee" placeholder="Min" />
                <Field label="Max Fee" placeholder="Max" />
              </View>
            </View>
            <View style={styles.feesRow}>
              <Text style={styles.label}>Per Hour ₹</Text>
              <View style={styles.feeInputs}>
                <Field label="Min Fee" placeholder="Min" />
                <Field label="Max Fee" placeholder="Max" />
              </View>
            </View>
          </SectionCard>

          <SectionCard
            index={8}
            title="Special Services & Fees"
            subtitle="Add any services you provide"
            actionLabel="+ Add Service"
            onAction={addServiceEntry}
            fadeIn={fadeIn}
          >
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
                    options={CARETAKER_SERVICES}
                    value={entry.serviceName}
                    dropdownId={`caretaker-service-${entry.id}`}
                    activeDropdownId={activeDropdown}
                    onDropdownChange={setActiveDropdown}
                    onSelect={(value) => {
                      updateServiceEntry(entry.id, "serviceName", value);
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

          <ContactAndSocialMedia contactIndex={9} socialIndex={10} fadeIn={fadeIn} />

          <Animated.View style={[styles.actionRow, fadeIn(11)]}>
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


