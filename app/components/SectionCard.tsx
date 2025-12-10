import type { ViewStyle } from "react-native";
import { Animated, Text, TouchableOpacity, View } from "react-native";

export type SectionCardProps = {
  title: string;
  subtitle: string;
  actionLabel?: string;
  children: React.ReactNode;
  index: number;
  onAction?: () => void;
  fadeIn: (index: number) => ViewStyle;
};

export function SectionCard({ title, subtitle, actionLabel, children, index, onAction, fadeIn }: SectionCardProps) {
  return (
    <Animated.View style={[sectionStyles.section, fadeIn(index)]}>
      <View style={sectionStyles.sectionHeader}>
        <View>
          <Text style={sectionStyles.sectionTitle}>{title}</Text>
          <Text style={sectionStyles.sectionSubtitle} numberOfLines={2}>{subtitle}</Text>
        </View>
        {actionLabel && (
          <TouchableOpacity style={sectionStyles.actionButton} onPress={onAction}>
            <Text style={sectionStyles.actionButtonText}>{actionLabel}</Text>
          </TouchableOpacity>
        )}
      </View>
      {children}
    </Animated.View>
  );
}

const sectionStyles = {
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'flex-start' as const,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: '#333',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  actionButton: {
    backgroundColor: '#00AA5D',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    marginLeft: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    minWidth: 120,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600' as const,
    textAlign: 'center' as const,
  },
};
