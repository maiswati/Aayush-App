import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { Label } from "./Label";

export type DateFieldProps = {
  label: string;
  placeholder: string;
  required?: boolean;
  value?: string;
  onPress: () => void;
};

export function DateField({ label, placeholder, required, value, onPress }: DateFieldProps) {
  return (
    <View style={dateFieldStyles.fieldBlock}>
      <Label text={label} required={required} />
      <Pressable style={dateFieldStyles.dateInput} onPress={onPress}>
        <Text style={value ? dateFieldStyles.dateValue : dateFieldStyles.datePlaceholder}>
          {value || placeholder}
        </Text>
        <Ionicons name="calendar-outline" size={20} color="#00AA5D" />
      </Pressable>
    </View>
  );
}

const dateFieldStyles = {
  fieldBlock: {
    marginBottom: 16,
  },
  dateInput: {
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    minHeight: 52,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dateValue: {
    fontSize: 16,
    color: '#0B2F1C',
    fontWeight: '500',
  },
  datePlaceholder: {
    fontSize: 16,
    color: '#999',
  },
};
