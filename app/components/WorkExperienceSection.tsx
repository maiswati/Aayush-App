import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View, ViewStyle } from "react-native";
import { Badge, DateField, DropdownField, Field, SectionCard } from "./";

interface DocumentEntry {
  id: string;
  type: string;
  fileName?: string;
}

interface WorkExperienceEntry {
  id: string;
  organization: string;
  role: string;
  employmentType?: string;
  startDate: string;
  endDate: string;
  current: boolean;
  documents: DocumentEntry[];
}

interface WorkExperienceSectionProps {
  workExperienceEntries: WorkExperienceEntry[];
  selectedExperienceDoc: string;
  activeDropdown: string | null;
  experienceDocumentOptions: string[];
  employmentTypeOptions?: string[];
  experienceIndex?: number;
  fadeIn?: (index: number) => ViewStyle;
  onAddWorkExperienceEntry: () => void;
  onRemoveWorkExperienceEntry: (id: string) => void;
  onUpdateWorkExperienceEntry: (id: string, field: keyof WorkExperienceEntry, value: string | boolean | DocumentEntry[]) => void;
  onDropdownChange: (dropdownId: string | null) => void;
  onSelectExperienceDoc: (value: string) => void;
  onAddExperienceDocument: (entryId: string) => void;
  onShowDatePicker?: (fieldId: string, currentValue: string) => void;
  organizationLabel?: string;
  organizationPlaceholder?: string;
  roleLabel?: string;
  rolePlaceholder?: string;
  useEmploymentType?: boolean;
  useDateFields?: boolean;
  styles?: any; // Pass styles from parent component
}

export default function WorkExperienceSection({
  workExperienceEntries,
  selectedExperienceDoc,
  activeDropdown,
  experienceDocumentOptions,
  employmentTypeOptions,
  experienceIndex = 6,
  fadeIn,
  onAddWorkExperienceEntry,
  onRemoveWorkExperienceEntry,
  onUpdateWorkExperienceEntry,
  onDropdownChange,
  onSelectExperienceDoc,
  onAddExperienceDocument,
  onShowDatePicker,
  organizationLabel = "Organization/Hospital",
  organizationPlaceholder = "Organization/Hospital",
  roleLabel = "Role/Position",
  rolePlaceholder = "Role/Position",
  useEmploymentType = true,
  useDateFields = false,
  styles: parentStyles = {},
}: WorkExperienceSectionProps) {
  const defaultFadeIn = (index: number): ViewStyle => ({});
  const fadeInFn = fadeIn || defaultFadeIn;

  return (
    <SectionCard 
      index={experienceIndex} 
      title="Work Experience" 
      subtitle="Add your work history" 
      actionLabel="+ Add Experience" 
      onAction={onAddWorkExperienceEntry} 
      fadeIn={fadeInFn}
    >
      {workExperienceEntries.map((entry, index) => (
        <React.Fragment key={entry.id}>
          <View style={parentStyles.entryCard || styles.entryCard}>
            <View style={parentStyles.entryHeader || styles.entryHeader}>
              <Badge text={`Experience #${index + 1}`} />
              {workExperienceEntries.length > 1 && (
                <Pressable style={parentStyles.deleteButton || styles.deleteButton} onPress={() => onRemoveWorkExperienceEntry(entry.id)}>
                  <Ionicons name="remove-circle-outline" size={20} color="#FF5A5F" />
                </Pressable>
              )}
            </View>
            
            <Field
              label={organizationLabel}
              placeholder={organizationPlaceholder}
              value={entry.organization}
              onChangeText={(value) => onUpdateWorkExperienceEntry(entry.id, "organization", value)}
            />
            <Field
              label={roleLabel}
              placeholder={rolePlaceholder}
              value={entry.role}
              onChangeText={(value) => onUpdateWorkExperienceEntry(entry.id, "role", value)}
            />
            
            {useEmploymentType && employmentTypeOptions && (
              <DropdownField
                label="Employment Type"
                placeholder="Select employment type"
                options={employmentTypeOptions}
                value={entry.employmentType || ""}
                dropdownId={`exp-type-${entry.id}`}
                activeDropdownId={activeDropdown}
                onDropdownChange={onDropdownChange}
                onSelect={(value) => onUpdateWorkExperienceEntry(entry.id, "employmentType", value)}
              />
            )}
            
            {useDateFields && onShowDatePicker ? (
              <>
                <DateField
                  placeholder="dd-mm-yyyy"
                  label="Start Date"
                  value={entry.startDate}
                  onPress={() => onShowDatePicker(`startDate-${entry.id}`, entry.startDate)}
                />
                <DateField
                  placeholder={entry.current ? "Currently working" : "dd-mm-yyyy"}
                  label="End Date"
                  value={entry.current ? "" : entry.endDate}
                  onPress={() => !entry.current && onShowDatePicker(`endDate-${entry.id}`, entry.endDate)}
                />
              </>
            ) : (
              <>
                <Field
                  label="Start Date"
                  placeholder="dd-mm-yyyy"
                  value={entry.startDate}
                  onChangeText={(value) => onUpdateWorkExperienceEntry(entry.id, "startDate", value)}
                />
                <Field
                  label="End Date"
                  placeholder={entry.current ? "Currently working" : "dd-mm-yyyy"}
                  value={entry.current ? "" : entry.endDate}
                  onChangeText={(value) => !entry.current && onUpdateWorkExperienceEntry(entry.id, "endDate", value)}
                />
              </>
            )}
            
            <View style={parentStyles.checkboxRow || styles.checkboxRow}>
              <Pressable
                style={[parentStyles.checkbox || styles.checkbox, entry.current && (parentStyles.checkboxChecked || styles.checkboxChecked)]}
                onPress={() => onUpdateWorkExperienceEntry(entry.id, "current", !entry.current)}
              >
                {entry.current && <Ionicons name="checkmark" size={12} color="#00AA5D" />}
              </Pressable>
              <Text style={parentStyles.checkboxLabel || styles.checkboxLabel}>Currently working here</Text>
            </View>
            
            <DropdownField
              label="Experience Documents"
              placeholder="Select document type"
              options={experienceDocumentOptions}
              value={selectedExperienceDoc}
              dropdownId="exp-doc-dropdown"
              activeDropdownId={activeDropdown}
              onDropdownChange={onDropdownChange}
              onSelect={(value) => {
                onSelectExperienceDoc(value);
                onDropdownChange(null);
              }}
            />
            <Pressable
              style={[parentStyles.addDocButton || styles.addDocButton, !selectedExperienceDoc && (parentStyles.addDocButtonDisabled || styles.addDocButtonDisabled)]}
              disabled={!selectedExperienceDoc}
              onPress={() => onAddExperienceDocument(entry.id)}
            >
              <Ionicons name="add-circle-outline" size={18} color={selectedExperienceDoc ? "#00AA5D" : "#8FB7A7"} />
              <Text
                style={[
                  parentStyles.addDocButtonText || styles.addDocButtonText,
                  !selectedExperienceDoc && { color: "#8FB7A7" },
                ]}
              >
                Add Document
              </Text>
            </Pressable>
            {entry.documents.length ? (
              <View style={parentStyles.docList || styles.docList}>
                {entry.documents.map((doc) => (
                  <View key={doc.id} style={parentStyles.docRow || styles.docRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={parentStyles.docType || styles.docType}>{doc.type}</Text>
                      <Text style={parentStyles.docHint || styles.docHint}>No file uploaded yet</Text>
                    </View>
                    <Pressable style={parentStyles.uploadButton || styles.uploadButton} onPress={() => {}}>
                      <Ionicons name="cloud-upload-outline" size={18} color="#00AA5D" />
                      <Text style={parentStyles.uploadButtonText || styles.uploadButtonText}>Upload</Text>
                    </Pressable>
                  </View>
                ))}
              </View>
            ) : (
              <Text style={parentStyles.sectionHint || styles.sectionHint}>No documents added</Text>
            )}
          </View>
        </React.Fragment>
      ))}
    </SectionCard>
  );
}

// Note: Styles should be imported from the respective registration styles
// This is a placeholder - actual styles will be passed as props or handled differently
const styles = {
  entryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  entryHeader: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: 16,
  },
  deleteButton: {
    padding: 4,
  },
  checkboxRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginTop: 8,
    marginBottom: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 4,
    marginRight: 8,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  checkboxChecked: {
    backgroundColor: '#00AA5D',
    borderColor: '#00AA5D',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
  },
  addDocButton: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: '#F8F8F8',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  addDocButtonDisabled: {
    opacity: 0.5,
  },
  addDocButtonText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },
  docList: {
    marginTop: 12,
  },
  docRow: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    padding: 12,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    marginBottom: 8,
  },
  docType: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  docHint: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  uploadButton: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: '#00AA5D',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  uploadButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  sectionHint: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 8,
  },
};
