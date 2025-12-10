import { Text, View } from "react-native";

export type BadgeProps = {
  text: string;
};

export function Badge({ text }: BadgeProps) {
  return (
    <View style={badgeStyles.badge}>
      <Text style={badgeStyles.badgeText}>{text}</Text>
    </View>
  );
}

const badgeStyles = {
  badge: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  badgeText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500' as const,
  },
};
