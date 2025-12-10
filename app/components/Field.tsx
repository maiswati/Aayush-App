import { TextInput, View } from "react-native";
import { Label } from "./Label";

export type FieldProps = {
  label: string;
  placeholder: string;
  required?: boolean;
  value?: string;
  keyboardType?: 'default' | 'numeric' | 'decimal-pad';
  maxLength?: number;
  onChangeText?: (text: string) => void;
  placeholderTextColor?: string;
};

export function Field({ 
  label, 
  placeholder, 
  required, 
  value, 
  keyboardType, 
  maxLength, 
  onChangeText,
  placeholderTextColor = "#7CA28F"
}: FieldProps) {
  return (
    <View style={fieldStyles.fieldBlock}>
      <Label text={label} required={required} />
      <TextInput
        style={fieldStyles.input}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        maxLength={maxLength}
      />
    </View>
  );
}

const fieldStyles = {
  fieldBlock: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: '#FAFAFA',
  },
};
