import { TextInput } from "react-native";

export type InputAreaProps = {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  placeholderTextColor?: string;
};

export function InputArea({ 
  placeholder, 
  value, 
  onChangeText,
  placeholderTextColor = "#7CA28F"
}: InputAreaProps) {
  return (
    <TextInput
      style={[inputAreaStyles.input, inputAreaStyles.textArea]}
      placeholder={placeholder}
      multiline
      placeholderTextColor={placeholderTextColor}
      value={value}
      onChangeText={onChangeText}
    />
  );
}

const inputAreaStyles = {
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: '#FAFAFA',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top' as const,
  },
};
