import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { Label } from "./Label";

export type DropdownFieldProps = {
  label: string;
  placeholder: string;
  options: string[];
  value: string;
  onSelect: (value: string) => void;
  dropdownId: string;
  activeDropdownId: string | null;
  onDropdownChange: (id: string | null) => void;
  raiseOnOpen?: boolean;
};

export function DropdownField({ 
  label, 
  placeholder, 
  options, 
  value, 
  onSelect, 
  dropdownId, 
  activeDropdownId, 
  onDropdownChange, 
  raiseOnOpen 
}: DropdownFieldProps) {
  const isOpen = activeDropdownId === dropdownId;
  
  return (
    <View style={dropdownStyles.fieldBlock}>
      <Label text={label} />
      <TouchableOpacity 
        style={[dropdownStyles.dropdown, isOpen && dropdownStyles.dropdownOpen]} 
        onPress={() => onDropdownChange(isOpen ? null : dropdownId)}
      >
        <Text style={[dropdownStyles.dropdownText, !value && dropdownStyles.dropdownPlaceholder]}>
          {value || placeholder}
        </Text>
        <Ionicons name="chevron-down" size={16} color="#7CA28F" />
      </TouchableOpacity>
      {isOpen && (
        <View style={[dropdownStyles.dropdownOptions, raiseOnOpen && dropdownStyles.dropdownRaised]}>
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              style={dropdownStyles.dropdownOption}
              onPress={() => {
                onSelect(option);
                onDropdownChange(null);
              }}
            >
              <Text style={dropdownStyles.dropdownOptionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const dropdownStyles = {
  fieldBlock: {
    marginBottom: 16,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#FAFAFA',
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
  },
  dropdownOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomWidth: 0,
  },
  dropdownText: {
    fontSize: 14,
    color: '#333',
  },
  dropdownPlaceholder: {
    color: '#999',
  },
  dropdownOptions: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderTopWidth: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: '#FAFAFA',
    zIndex: 1000,
  },
  dropdownRaised: {
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dropdownOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  dropdownOptionText: {
    fontSize: 14,
    color: '#333',
  },
};
