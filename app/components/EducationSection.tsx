import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View, ViewStyle } from "react-native";
import { Badge, DropdownField, Field, SectionCard } from "./";

interface DocumentEntry {
  id: string;
  type: string;
  fileName?: string;
}

interface EducationEntry {
  id: string;
  qualification: string;
  institution: string;
  year: string;
  documents: DocumentEntry[];
}

interface EducationSectionProps {
  educationEntries: EducationEntry[];
  selectedEducationDoc: string;
  activeDropdown: string | null;
  qualificationOptions: string[];
  educationDocumentOptions: string[];
  educationIndex?: number;
  fadeIn?: (index: number) => ViewStyle;
  onAddEducationEntry: () => void;
  onRemoveEducationEntry: (id: string) => void;
  onUpdateEducationEntry: (id: string, field: keyof EducationEntry, value: string | DocumentEntry[]) => void;
  onDropdownChange: (dropdownId: string | null) => void;
  onSelectEducationDoc: (value: string) => void;
  onAddEducationDocument: (entryId: string) => void;
  qualificationLabel?: string;
  qualificationPlaceholder?: string;
  institutionLabel?: string;
  institutionPlaceholder?: string;
  yearLabel?: string;
  yearPlaceholder?: string;
  useQualificationDropdown?: boolean;
  styles?: any; // Pass styles from parent component
}

export default function EducationSection({
  educationEntries,
  selectedEducationDoc,
  activeDropdown,
  qualificationOptions,
  educationDocumentOptions,
  educationIndex = 5,
  fadeIn,
  onAddEducationEntry,
  onRemoveEducationEntry,
  onUpdateEducationEntry,
  onDropdownChange,
  onSelectEducationDoc,
  onAddEducationDocument,
  qualificationLabel = "Degree/Qualification",
  qualificationPlaceholder = "Select qualification",
  institutionLabel = "Institution",
  institutionPlaceholder = "Institution",
  yearLabel = "Year",
  yearPlaceholder = "Year",
  useQualificationDropdown = true,
  styles: parentStyles = {},
}: EducationSectionProps) {
  const defaultFadeIn = (index: number): ViewStyle => ({});
  const fadeInFn = fadeIn || defaultFadeIn;

  return (
    <SectionCard 
      index={educationIndex} 
      title="Education" 
      subtitle="Add your qualifications" 
      actionLabel="+ Add Education" 
      onAction={onAddEducationEntry} 
      fadeIn={fadeInFn}
    >
      {educationEntries.map((entry, index) => (
        <React.Fragment key={entry.id}>
          <View style={styles.entryCard || parentStyles.entryCard}>
            <View style={styles.entryHeader || parentStyles.entryHeader}>
              <Badge text={`Education #${index + 1}`} />
              {educationEntries.length > 1 && (
                <Pressable style={parentStyles.deleteButton || styles.deleteButton} onPress={() => onRemoveEducationEntry(entry.id)}>
                  <Ionicons name="remove-circle-outline" size={20} color="#FF5A5F" />
                </Pressable>
              )}
            </View>
            
            {useQualificationDropdown ? (
              <DropdownField
                label={qualificationLabel}
                placeholder={qualificationPlaceholder}
                options={qualificationOptions}
                value={entry.qualification}
                dropdownId={`edu-qualification-${entry.id}`}
                activeDropdownId={activeDropdown}
                onDropdownChange={onDropdownChange}
                onSelect={(value) => onUpdateEducationEntry(entry.id, "qualification", value)}
              />
            ) : (
              <Field
                label={qualificationLabel}
                placeholder={qualificationPlaceholder}
                value={entry.qualification}
                onChangeText={(value) => onUpdateEducationEntry(entry.id, "qualification", value)}
              />
            )}
            
            <Field
              label={institutionLabel}
              placeholder={institutionPlaceholder}
              value={entry.institution}
              onChangeText={(value) => onUpdateEducationEntry(entry.id, "institution", value)}
            />
            <Field
              label={yearLabel}
              placeholder={yearPlaceholder}
              value={entry.year}
              keyboardType="numeric"
              maxLength={4}
              onChangeText={(value) => onUpdateEducationEntry(entry.id, "year", value)}
            />
            
            <DropdownField
              label="Educational Documents"
              placeholder="Select document type"
              options={educationDocumentOptions}
              value={selectedEducationDoc}
              dropdownId="edu-doc-dropdown"
              activeDropdownId={activeDropdown}
              onDropdownChange={onDropdownChange}
              onSelect={(value) => {
                onSelectEducationDoc(value);
                onDropdownChange(null);
              }}
            />
            <Pressable style={[parentStyles.docAddButton || styles.docAddButton, !selectedEducationDoc && (parentStyles.docAddButtonDisabled || styles.docAddButtonDisabled)]}
              disabled={!selectedEducationDoc}
              onPress={() => onAddEducationDocument(entry.id)}
            >
              <Ionicons name="add-circle-outline" size={18} color={selectedEducationDoc ? "#00AA5D" : "#8FB7A7"} />
              <Text
                style={[
                  parentStyles.addDocButtonText || styles.addDocButtonText,
                  !selectedEducationDoc && { color: "#8FB7A7" },
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
  docAddButton: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: '#F8F8F8',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  docAddButtonDisabled: {
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
