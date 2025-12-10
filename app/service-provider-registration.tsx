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
  SectionCard
} from "../app/components";
import { ACCENT, PRIMARY, serviceProviderRegistrationStyles as styles } from "../app/styles/serviceProviderRegistrationStyles";
import { INSURANCE_COMPANIES, INSURANCE_TYPES, WORK_MODES } from "../data/dropdownOptions";


type InsuranceEntry = {
  id: string;
  type: string;
  companies: string[];
  customCompany?: string;
};

export default function ServiceProviderRegistration() {
  const router = useRouter();
  const heroAnim = useRef(new Animated.Value(0)).current;
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [workMode, setWorkMode] = useState("");
  const [insuranceEntries, setInsuranceEntries] = useState<InsuranceEntry[]>([
    { id: "insurance-1", type: "", companies: [] },
  ]);

  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [currentDateField, setCurrentDateField] = useState<string>("");
  const [tempDate, setTempDate] = useState(new Date());

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
          outputRange: [24 + index * 5, 0],
        }),
      },
    ],
  });

  const addInsuranceEntry = () => {
    const newId = `insurance-${Date.now()}`;
    setInsuranceEntries((prev) => [...prev, { id: newId, type: "", companies: [] }]);
  };

  const removeInsuranceEntry = (id: string) => {
    if (insuranceEntries.length > 1) {
      setInsuranceEntries((prev) => prev.filter((e) => e.id !== id));
    }
  };

  const updateInsuranceEntry = (id: string, field: keyof InsuranceEntry, value: string | string[]) => {
    setInsuranceEntries((prev) => prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  };

  const getAvailableInsuranceTypes = () => {
    const selectedTypes = insuranceEntries
      .filter(entry => entry.type !== "")
      .map(entry => entry.type);
    return Object.keys(INSURANCE_TYPES).filter(type => !selectedTypes.includes(type));
  };

  const addCompanyToEntry = (entryId: string, company: string) => {
    const entry = insuranceEntries.find(e => e.id === entryId);
    if (!entry) return;
    
    if (company === "Other") {
      updateInsuranceEntry(entryId, "customCompany", "");
    } else {
      const currentCompanies = entry.companies || [];
      if (!currentCompanies.includes(company) && currentCompanies.length < 3) {
        updateInsuranceEntry(entryId, "companies", [...currentCompanies, company]);
      }
    }
  };

  const removeCompanyFromEntry = (entryId: string, company: string) => {
    const entry = insuranceEntries.find(e => e.id === entryId);
    if (!entry) return;
    
    const currentCompanies = entry.companies || [];
    updateInsuranceEntry(entryId, "companies", currentCompanies.filter(c => c !== company));
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
      // Handle date updates based on field type
      if (currentDateField.includes('date')) {
        // Update the appropriate field based on the field ID
        console.log('Date updated:', currentDateField, formattedDate);
      }
    }
  };

  
  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
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
            <Text style={styles.title}>Insurance Provider Registration</Text>
            <Text style={styles.subtitle}>Complete your professional profile</Text>
          </Animated.View>

          <Animated.View style={[styles.infoCard, styles.shadowed, fadeIn(1)]}>
            <View style={styles.infoAvatar}>
              <Ionicons name="person-circle" size={36} color={PRIMARY} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.infoTitle}>Agent John - ABC2023</Text>
              <Text style={styles.infoHighlight}>7123815198   abcd@gmail.com</Text>
            </View>
          </Animated.View>

          <Animated.View style={[styles.card, styles.shadowed, fadeIn(2)]}>
            <Text style={styles.cardTitle}>Upload Document for Auto Fill</Text>
            <Text style={styles.cardSubtitle}>
              Upload your ID, certificate or any document. We'll automatically extract the information.
            </Text>
            <Pressable style={styles.dropZone}>
              <Ionicons name="cloud-upload-outline" size={28} color={PRIMARY} />
              <Text style={styles.dropZoneText}>Click to upload or drag and drop</Text>
            </Pressable>
          </Animated.View>

          <SectionCard index={3} title="Basic Information" subtitle="Your professional details" fadeIn={fadeIn}>
            <Field label="Full Name" placeholder="Full Name" required />
            <DropdownField
              label="Work Mode"
              placeholder="Select work mode"
              options={WORK_MODES}
              value={workMode}
              dropdownId="work-mode"
              activeDropdownId={activeDropdown}
              onDropdownChange={setActiveDropdown}
              onSelect={(value) => {
                setWorkMode(value);
                setActiveDropdown(null);
              }}
            />
            <Field label="Email" placeholder="insurance@example.com" required />
            <Field label="Phone Number" placeholder="+91-XXXXXXXXXX" keyboardType="numeric" maxLength={10} required />
            <Field label="IRDAI License Number" placeholder="XXXXX-XXXXXX" required />
            <Field label="License Validity Date" placeholder="dd-mm-yyyy" required />
          </SectionCard>

          <SectionCard index={4} title="Professional Introduction" subtitle="Tell us about yourself and your expertise" fadeIn={fadeIn}>
            <InputArea placeholder="Write about your background, experience, and areas of expertise in insurance..." />
          </SectionCard>

          <SectionCard index={5} title="Associated Companies" subtitle="Add tie-up insurance companies" actionLabel="+ Add Type" onAction={addInsuranceEntry} fadeIn={fadeIn}>
            {insuranceEntries.map((entry, index) => (
              <React.Fragment key={entry.id}>
                <View style={styles.entryCard}>
                  <View style={styles.entryHeader}>
                    <Badge text={`Insurance Type #${index + 1}`} />
                    {insuranceEntries.length > 1 && (
                      <Pressable style={styles.deleteButton} onPress={() => removeInsuranceEntry(entry.id)}>
                        <Ionicons name="remove-circle-outline" size={20} color="#FF5A5F" />
                      </Pressable>
                    )}
                  </View>
                  <DropdownField
                    label="Insurance Type"
                    placeholder="Select insurance type"
                    options={getAvailableInsuranceTypes()}
                    value={entry.type}
                    dropdownId={`insurance-type-${entry.id}`}
                    activeDropdownId={activeDropdown}
                    onDropdownChange={setActiveDropdown}
                    onSelect={(value) => {
                      updateInsuranceEntry(entry.id, "type", value);
                      setActiveDropdown(null);
                    }}
                  />
                  {entry.type && (
                    <>
                      <Text style={styles.sectionHint}>Select up to 3 companies (Optional)</Text>
                      <DropdownField
                        label="Select Companies"
                        placeholder="Select companies"
                        options={INSURANCE_COMPANIES[entry.type as keyof typeof INSURANCE_COMPANIES] || []}
                        value=""
                        dropdownId={`company-${entry.id}`}
                        activeDropdownId={activeDropdown}
                        onDropdownChange={setActiveDropdown}
                        onSelect={(value) => {
                          addCompanyToEntry(entry.id, value);
                          setActiveDropdown(null);
                        }}
                      />
                      {entry.companies.length > 0 && (
                        <View style={styles.selectedCompaniesList}>
                          {entry.companies.map((company) => (
                            <View key={company} style={styles.selectedCompanyItem}>
                              <Text style={styles.selectedCompanyText}>{company}</Text>
                              <Pressable
                                style={styles.removeCompanyButton}
                                onPress={() => removeCompanyFromEntry(entry.id, company)}
                              >
                                <Ionicons name="close-circle" size={16} color="#FF5A5F" />
                              </Pressable>
                            </View>
                          ))}
                        </View>
                      )}
                      {entry.customCompany !== undefined && (
                        <Field
                          label="Custom Company Name"
                          placeholder="Enter company name"
                          value={entry.customCompany || ""}
                          onChangeText={(value) => updateInsuranceEntry(entry.id, "customCompany", value)}
                        />
                      )}
                                          </>
                  )}
                </View>
              </React.Fragment>
            ))}
          </SectionCard>

          <SectionCard index={6} title="Documents" subtitle="Upload your certificates and credentials" fadeIn={fadeIn}>
            <View style={styles.documentUploadContainer}>
              <Text style={styles.documentLabel}>IRDAI Certificate</Text>
              <Pressable style={styles.uploadButton}>
                <Ionicons name="cloud-upload-outline" size={24} color={PRIMARY} />
                <Text style={styles.uploadButtonText}>Click to upload IRDAI Certificate</Text>
              </Pressable>
              <Text style={styles.uploadHint}>PDF, JPG, PNG (Max 5MB)</Text>
            </View>
            
            <View style={styles.documentUploadContainer}>
              <Text style={styles.documentLabel}>Business Card</Text>
              <Pressable style={styles.uploadButton}>
                <Ionicons name="cloud-upload-outline" size={24} color={PRIMARY} />
                <Text style={styles.uploadButtonText}>Click to upload Business Card</Text>
              </Pressable>
              <Text style={styles.uploadHint}>PDF, JPG, PNG (Max 5MB)</Text>
            </View>
          </SectionCard>

          <ContactAndSocialMedia contactIndex={7} socialIndex={8} fadeIn={fadeIn} />

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
      {datePickerVisible && (
        <DateTimePicker
          value={tempDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
}


