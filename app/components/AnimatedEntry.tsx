import { Animated } from "react-native";

export type AnimatedEntryProps = {
  children: React.ReactNode;
};

export function AnimatedEntry({ children }: AnimatedEntryProps) {
  return (
    <Animated.View style={animatedEntryStyles.animatedEntry}>
      {children}
    </Animated.View>
  );
}

const animatedEntryStyles = {
  animatedEntry: {
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#7CA28F',
  },
};
