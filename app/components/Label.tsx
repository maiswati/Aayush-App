import { Text } from "react-native";

export type LabelProps = {
  text: string;
  required?: boolean;
};

export function Label({ text, required }: LabelProps) {
  return (
    <Text style={labelStyles.label}>
      {text}
      {required && <Text style={labelStyles.required}> *</Text>}
    </Text>
  );
}

const labelStyles = {
  label: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#333',
    marginBottom: 6,
  },
  required: {
    color: '#FF4444',
  },
};
